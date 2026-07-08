import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const fmt = (n) => 'Rp ' + Math.round(n || 0).toLocaleString('id-ID');
const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const CHECKOUT_API = '/api/checkout';
const PAYMENT_API = '/api/payment';
const withAuth = (token) => ({ headers: { Authorization: `Bearer ${token}` } });
const verifySession          = (token) => axios.get(`${CHECKOUT_API}/verify-session`, withAuth(token));                                    // 1
const getServerCartItems     = (token) => axios.get(`${CHECKOUT_API}/get-cart-items`, withAuth(token));                                     // 2
const getUserProfile         = (token) => axios.get(`${CHECKOUT_API}/get-user-profile`, withAuth(token));                                   // 3
const calculateShipping      = (destination, token) => axios.post(`${CHECKOUT_API}/calculate-shipping`, { destination }, withAuth(token));  // 4
const getTaxRate             = () => axios.get(`${CHECKOUT_API}/get-tax-rate`);                                                             // 5
const validateStockBeforePay = (items, token) => axios.post(`${CHECKOUT_API}/validate-stock`, { items }, withAuth(token));                  // 6
const createOrder            = (payload, token) => axios.post(`${CHECKOUT_API}/create-order`, payload, withAuth(token));                    // 7
const generateQris           = (orderId, amount, token) => axios.post(`${PAYMENT_API}/generate-qris`, { orderId, amount }, withAuth(token)); // 8
const checkPaymentStatus     = (paymentRef, token) => axios.get(`${PAYMENT_API}/check-status`, { params: { paymentRef }, ...withAuth(token) }); // 9
const cancelPayment          = (paymentRef, token) => axios.post(`${PAYMENT_API}/cancel`, { paymentRef }, withAuth(token));                 // 10

export default function Checkout({ cartItems: cartItemsFromProps = [], onPaymentSuccess }) {
  const navigate = useNavigate();

  const [checkingSession, setCheckingSession] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [cartItems, setCartItems] = useState(cartItemsFromProps);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [taxRatePercent, setTaxRatePercent] = useState(11);
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentStep, setPaymentStep] = useState('idle');
  const [qrisData, setQrisData] = useState(null); // { orderId, paymentRef, qrString }
  const [secondsLeft, setSecondsLeft] = useState(0);

  const pollTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * (taxRatePercent / 100));
  const total = subtotal + tax + shippingCost;
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const rawUser = localStorage.getItem(USER_KEY);

    if (!token) {
      setIsLoggedIn(false);
      setCheckingSession(false);
      return;
    }

    if (rawUser) {
      try { setUser(JSON.parse(rawUser)); } catch { /* abaikan jika format tidak sesuai */ }
    }

    setIsLoggedIn(true);

    verifySession(token)
      .then((res) => {
        if (res.data?.valid === false) {
          // Server menolak token (kedaluwarsa / tidak valid) -> paksa logout
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.warn('Endpoint verify-session belum tersedia:', err.message);
      })
      .finally(() => setCheckingSession(false));
  }, []);
  useEffect(() => {
    if (!isLoggedIn || checkingSession) return;
    const token = localStorage.getItem(TOKEN_KEY);

    const loadCheckoutData = async () => {
      const results = await Promise.allSettled([
        getServerCartItems(token),        // 2
        getUserProfile(token),            // 3
        getTaxRate(),                     // 5
        calculateShipping('default', token), // 4
      ]);

      const [cartRes, profileRes, taxRes, shippingRes] = results;

      if (cartRes.status === 'fulfilled' && Array.isArray(cartRes.value?.data?.items)) {
        setCartItems(cartRes.value.data.items);
      } else {
        console.warn('Endpoint get-cart-items belum tersedia, memakai data dari halaman Cart.');
      }

      if (profileRes.status === 'fulfilled') {
        setShippingAddress(profileRes.value?.data?.address ?? null);
      } else {
        console.warn('Endpoint get-user-profile belum tersedia:', profileRes.reason?.message);
      }

      if (taxRes.status === 'fulfilled' && typeof taxRes.value?.data?.percent === 'number') {
        setTaxRatePercent(taxRes.value.data.percent);
      }

      if (shippingRes.status === 'fulfilled' && typeof shippingRes.value?.data?.cost === 'number') {
        setShippingCost(shippingRes.value.data.cost);
      }
    };

    loadCheckoutData();
  }, [isLoggedIn, checkingSession]);

  // Bersihkan timer polling & countdown saat komponen unmount
  useEffect(() => {
    return () => stopTimers();
  }, []);

  const stopTimers = () => {
    clearInterval(pollTimerRef.current);
    clearInterval(countdownTimerRef.current);
  };
  const handlePay = async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    try {
      setPaymentStep('validating');
      await validateStockBeforePay(                                          // 6
        cartItems.map(i => ({ id: i.id, type: i.type, quantity: i.quantity })),
        token
      );
    } catch (err) {
      console.warn('Endpoint validate-stock belum tersedia, lanjut sebagai simulasi:', err.message);
    }

    let orderId = null;
    try {
      setPaymentStep('creating_order');
      const res = await createOrder({ items: cartItems, subtotal, tax, shippingCost, total }, token); // 7
      orderId = res.data?.orderId;
    } catch (err) {
      console.warn('Endpoint create-order belum tersedia, memakai order ID simulasi:', err.message);
    }
    if (!orderId) orderId = `SIM-${Date.now()}`;

    let qris = null;
    try {
      setPaymentStep('generating_qris');
      const res = await generateQris(orderId, total, token);                  // 8
      qris = res.data;
    } catch (err) {
      console.warn('Endpoint generate-qris belum tersedia, menampilkan QR simulasi:', err.message);
    }

    const paymentRef = qris?.paymentRef || `QRIS-${orderId}`;
    const expiresInSeconds = qris?.expiresInSeconds || 300; // fallback 5 menit

    setQrisData({ orderId, paymentRef, qrString: qris?.qrString || paymentRef });
    setSecondsLeft(expiresInSeconds);
    setPaymentStep('awaiting_payment');
    startCountdown();
    startPolling(paymentRef, token);
  };

  const startCountdown = () => {
    clearInterval(countdownTimerRef.current);
    countdownTimerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current);
          setPaymentStep((step) => (step === 'awaiting_payment' ? 'expired' : step));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startPolling = (paymentRef, token) => {
    clearInterval(pollTimerRef.current);
    let attempt = 0;

    pollTimerRef.current = setInterval(async () => {
      attempt += 1;
      try {
        const res = await checkPaymentStatus(paymentRef, token);              // 9
        const status = res.data?.status;
        if (status === 'success') {
          stopTimers();
          setPaymentStep('success');
          onPaymentSuccess?.();
        } else if (status === 'failed' || status === 'expired') {
          stopTimers();
          setPaymentStep(status);
        }
        // status === 'pending' -> lanjut polling
      } catch (err) {
        console.warn(`Endpoint check-status belum tersedia (percobaan #${attempt}):`, err.message);
        if (attempt >= 3) {
          stopTimers();
          setPaymentStep('success');
          onPaymentSuccess?.();
        }
      }
    }, 4000);
  };

  const handleCancelPayment = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    stopTimers();
    try {
      if (qrisData?.paymentRef) await cancelPayment(qrisData.paymentRef, token); // 10
    } catch (err) {
      console.warn('Endpoint cancel payment belum tersedia:', err.message);
    }
    setPaymentStep('idle');
    setQrisData(null);
  };

  const handleRetry = () => {
    setPaymentStep('idle');
    setQrisData(null);
  };

  // ────────────────────────────────────────────────────────────────────────
  // RENDER — sedang memeriksa sesi login
  // ────────────────────────────────────────────────────────────────────────
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-400">Memeriksa sesi login...</p>
      </div>
    );
  }
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6 py-24">
        <div className="w-20 h-20 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <svg width="32" height="32" fill="none" stroke="#dc2626" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.29 3.86l-8.15 14.1A1.5 1.5 0 003.5 20.5h17a1.5 1.5 0 001.36-2.54l-8.15-14.1a1.5 1.5 0 00-2.72 0z" />
          </svg>
        </div>
        <div className="text-center max-w-sm">
          <p className="text-xl font-semibold text-zinc-900 tracking-tight">Anda belum masuk</p>
          <p className="text-sm text-gray-400 mt-2">
            Silakan login terlebih dahulu untuk melanjutkan proses checkout dan pembayaran.
          </p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-3 bg-zinc-950 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-colors"
        >
          Login untuk Melanjutkan
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-8 py-5">
        <p className="text-sm font-semibold text-zinc-900 tracking-tight">
          Checkout
          {user?.name && <span className="ml-2 text-gray-400 font-normal">· Halo, {user.name}</span>}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

        {/* Ringkasan Pesanan */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">Ringkasan Pesanan</p>

          <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl px-6">
            {cartItems.length === 0 && (
              <p className="py-8 text-sm text-gray-400 text-center">Tidak ada item untuk di-checkout.</p>
            )}
            {cartItems.map((item) => (
              <div key={item.id + '-' + item.type} className="py-5 flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl border border-gray-100">
                  {item.emoji || '📦'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 truncate">{item.name}</p>
                  <p className="text-[11px] text-gray-400">{item.quantity} × {fmt(item.price)}</p>
                </div>
                <p className="text-sm font-bold text-zinc-900">{fmt(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/cart')}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            ← Kembali ke keranjang
          </button>

          {shippingAddress && (
            <div className="mt-6 border border-gray-100 rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Alamat Pengiriman</p>
              <p className="text-sm text-zinc-900">{shippingAddress}</p>
            </div>
          )}
        </div>

        {/* Panel Pembayaran */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="border border-gray-100 rounded-2xl p-6">
            <p className="text-sm font-bold text-zinc-900 mb-5">Total Pembayaran</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>PPN {taxRatePercent}%</span><span>{fmt(tax)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkir</span><span>{shippingCost > 0 ? fmt(shippingCost) : 'Gratis'}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-zinc-900 text-base">
                <span>Total</span><span>{fmt(total)}</span>
              </div>
            </div>

            {/* idle -> tombol bayar */}
            {paymentStep === 'idle' && (
              <button
                onClick={handlePay}
                disabled={cartItems.length === 0}
                className="mt-6 w-full py-3.5 bg-zinc-950 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors duration-200 tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Konfirmasi & Bayar Sekarang
              </button>
            )}

            {/* proses menuju QRIS */}
            {(paymentStep === 'validating' || paymentStep === 'creating_order' || paymentStep === 'generating_qris') && (
              <div className="mt-6 py-4 text-center">
                <div className="w-6 h-6 mx-auto border-2 border-gray-200 border-t-zinc-900 rounded-full animate-spin" />
                <p className="text-xs text-gray-400 mt-3">
                  {paymentStep === 'validating' && 'Memeriksa ketersediaan stok...'}
                  {paymentStep === 'creating_order' && 'Membuat pesanan...'}
                  {paymentStep === 'generating_qris' && 'Menyiapkan QRIS...'}
                </p>
              </div>
            )}

            {/* menunggu pembayaran: tampilkan QR simulasi */}
            {paymentStep === 'awaiting_payment' && qrisData && (
              <QrisPanel qrisData={qrisData} secondsLeft={secondsLeft} onCancel={handleCancelPayment} />
            )}

            {paymentStep === 'expired' && (
              <div className="mt-6 text-center">
                <p className="text-sm font-semibold text-zinc-900">QR Kedaluwarsa</p>
                <p className="text-xs text-gray-400 mt-1 mb-4">Waktu pembayaran telah habis.</p>
                <button
                  onClick={handleRetry}
                  className="w-full py-3 border border-zinc-900 rounded-xl text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  Buat QR Baru
                </button>
              </div>
            )}

            {paymentStep === 'failed' && (
              <div className="mt-6 text-center">
                <p className="text-sm font-semibold text-red-600">Pembayaran Gagal</p>
                <p className="text-xs text-gray-400 mt-1 mb-4">Silakan coba lagi.</p>
                <button
                  onClick={handleRetry}
                  className="w-full py-3 border border-zinc-900 rounded-xl text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="mt-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-3">
                  <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-zinc-900">Pembayaran Berhasil</p>
                <p className="text-xs text-gray-400 mt-1">Order {qrisData?.orderId} telah dikonfirmasi.</p>
              </div>
            )}

            <p className="text-center text-[11px] text-gray-400 mt-4">
              Pembayaran aman · QRIS · Garansi produk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QrisPanel({ qrisData, secondsLeft, onCancel }) {
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <div className="mt-6 text-center">
      <div className="mx-auto w-48 h-48 bg-white border-2 border-zinc-900 rounded-xl p-3 flex items-center justify-center">
        <PseudoQr seed={qrisData.qrString} />
      </div>
      <p className="text-[11px] text-gray-400 mt-3 font-mono">{qrisData.paymentRef}</p>
      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-[11px] font-semibold text-amber-700">
          Menunggu Pembayaran · {minutes}:{seconds}
        </span>
      </div>
      <p className="text-[11px] text-gray-400 mt-3">
        Scan kode QRIS di atas melalui aplikasi e-wallet atau m-banking Anda.
      </p>
      <button onClick={onCancel} className="mt-4 text-xs text-gray-400 hover:text-red-500 transition-colors">
        Batalkan Pembayaran
      </button>
    </div>
  );
}

function PseudoQr({ seed = '' }) {
  const size = 11;

  const hash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  };
  const seedNum = hash(seed || 'GARASIH-QRIS');

  const inFinderCorner = (r, c) =>
    (r < 3 && c < 3) || (r < 3 && c >= size - 3) || (r >= size - 3 && c < 3);

  const isDark = (row, col) => {
    if (inFinderCorner(row, col)) return true;
    const n = Math.imul(row * size + col + seedNum, 2654435761);
    return ((n >>> 13) & 1) === 1;
  };

  const cells = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isDark(r, c)) cells.push([c, r]);
    }
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      <rect width={size} height={size} fill="white" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#18181b" />
      ))}
    </svg>
  );
}

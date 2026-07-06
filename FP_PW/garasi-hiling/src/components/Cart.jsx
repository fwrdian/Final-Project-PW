import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

const categoryLabel = {
  merchandise: 'Merchandise',
  suku_cadang: 'Suku Cadang',
};

// ── Axios: 10 pemanggilan API endpoint berbeda untuk halaman Cart ──────────
// Base URL dummy — sesuaikan dengan backend asli saat sudah tersedia.
const CART_API = '/api/cart';

const fetchCartSummary       = () => axios.get(`${CART_API}/summary`);
const fetchShippingOptions   = () => axios.get(`${CART_API}/shipping-options`);
const fetchPaymentMethods    = () => axios.get(`${CART_API}/payment-methods`);
const fetchTaxRate           = () => axios.get(`${CART_API}/tax-rate`);
const fetchUserAddress       = () => axios.get(`${CART_API}/user-address`);
const fetchShippingCost      = (destination) => axios.get(`${CART_API}/shipping-cost`, { params: { destination } });
const validateStock          = (items) => axios.post(`${CART_API}/validate-stock`, { items });
const applyVoucher           = (code) => axios.post(`${CART_API}/apply-voucher`, { code });
const validatePromo          = (code) => axios.get(`${CART_API}/promo/validate`, { params: { code } });
const submitCheckout         = (payload) => axios.post(`${CART_API}/checkout`, payload);

export default function Cart({ cartItems = [], onUpdateQuantity, onRemove }) {
  const navigate = useNavigate();
  const [shippingOptions, setShippingOptions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherMessage, setVoucherMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const ppn = Math.round(subtotal * 0.11);
  const total = subtotal + ppn;

  // Jalankan beberapa pemanggilan Axios (GET) secara PARALEL saat halaman Cart dimuat
  useEffect(() => {
    if (cartItems.length === 0) return;

    const loadCartData = async () => {
      const results = await Promise.allSettled([
        fetchCartSummary(),        // 1
        fetchShippingOptions(),    // 2
        fetchPaymentMethods(),     // 3
        fetchTaxRate(),            // 4
        fetchUserAddress(),        // 5
        fetchShippingCost('default'), // 6
      ]);

      const [summaryRes, shippingRes, paymentRes] = results;

      if (shippingRes.status === 'fulfilled') {
        setShippingOptions(shippingRes.value?.data?.options ?? []);
      } else {
        console.warn('Endpoint shipping-options belum tersedia:', shippingRes.reason?.message);
      }

      if (paymentRes.status === 'fulfilled') {
        setPaymentMethods(paymentRes.value?.data?.methods ?? []);
      } else {
        console.warn('Endpoint payment-methods belum tersedia:', paymentRes.reason?.message);
      }

      if (summaryRes.status === 'rejected') {
        console.warn('Endpoint cart summary belum tersedia:', summaryRes.reason?.message);
      }
    };

    loadCartData();
  }, [cartItems.length]);

  // Terapkan kode voucher (pemanggilan Axios di dalam event handler)
  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;
    try {
      await validatePromo(voucherCode);          // 7
      const res = await applyVoucher(voucherCode); // 8
      setVoucherMessage(res.data?.message || 'Voucher berhasil diterapkan.');
    } catch (err) {
      setVoucherMessage('Kode voucher tidak valid atau layanan sedang tidak tersedia.');
      console.warn('Gagal menerapkan voucher:', err.message);
    }
  };

  // Proses checkout: validasi stok lalu submit checkout (2 pemanggilan Axios)
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError('');
    try {
      await validateStock(cartItems.map(i => ({ id: i.id, type: i.type, quantity: i.quantity }))); // 9
      await submitCheckout({ items: cartItems, subtotal, ppn, total }); // 10
      navigate('/checkout');
    } catch (err) {
      setCheckoutError('Gagal memproses pesanan. Silakan coba lagi.');
      console.warn('Checkout API belum tersedia / gagal:', err.message);
      // Tetap lanjutkan ke halaman checkout agar alur UI tidak terhenti oleh dummy endpoint
      navigate('/checkout');
    } finally {
      setIsCheckingOut(false);
    }
  };

  // ── Empty state ──
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="border-b border-gray-100 px-8 py-4">
          <p className="text-sm font-semibold text-zinc-900 tracking-tight">Keranjang</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24 px-6">
          <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
            <svg width="32" height="32" fill="none" stroke="#aaa" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold text-zinc-900 tracking-tight">Keranjang Anda kosong.</p>
            <p className="text-sm text-gray-400 mt-2">Belum ada produk yang ditambahkan.</p>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate('/promo')}
              className="px-8 py-3 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
            >
              Mulai Belanja
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-white text-zinc-900 text-sm font-semibold rounded border border-zinc-900 hover:bg-gray-50 transition-colors"
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Filled cart ──
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-8 py-5">
        <p className="text-sm font-semibold text-zinc-900 tracking-tight">
          Keranjang
          <span className="ml-2 text-gray-400 font-normal">({cartItems.length} item)</span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">

        {/* Item list */}
        <div>
          {['merchandise', 'suku_cadang'].map(type => {
            const group = cartItems.filter(i => i.type === type);
            if (!group.length) return null;
            return (
              <div key={type} className="mb-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                  {categoryLabel[type]}
                </p>
                <div className="divide-y divide-gray-100">
                  {group.map(item => (
                    <CartRow
                      key={item.id + '-' + item.type}
                      item={item}
                      onQty={(delta) => onUpdateQuantity(item.id, item.type, item.quantity + delta)}
                      onRemove={() => onRemove(item.id, item.type)}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <button
            onClick={() => navigate(-1)}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            ← Lanjut belanja
          </button>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="border border-gray-100 rounded-2xl p-6">
            <p className="text-sm font-bold text-zinc-900 mb-5">Ringkasan Pesanan</p>

            {/* Voucher */}
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Kode voucher"
                className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-zinc-900"
              />
              <button
                onClick={handleApplyVoucher}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-zinc-900 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Pakai
              </button>
            </div>
            {voucherMessage && (
              <p className="text-[11px] text-gray-500 mb-4 -mt-2">{voucherMessage}</p>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>PPN 11%</span>
                <span>{fmt(ppn)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkir</span>
                <span className="text-green-600 font-medium">
                  {shippingOptions.length > 0 ? shippingOptions[0]?.label ?? 'Gratis' : 'Gratis'}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-zinc-900 text-base">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            {paymentMethods.length > 0 && (
              <p className="text-[11px] text-gray-400 mt-3">
                Metode pembayaran tersedia: {paymentMethods.join(', ')}
              </p>
            )}

            {checkoutError && (
              <p className="text-[11px] text-red-500 mt-3">{checkoutError}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="mt-6 w-full py-3.5 bg-zinc-950 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors duration-200 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Memproses...' : 'Proses Pesanan'}
            </button>

            <p className="text-center text-[11px] text-gray-400 mt-3">
              Pembayaran aman · Garansi produk
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[['✓', 'Stok Tersedia'], ['🔒', 'Pembayaran Aman'], ['📦', 'Pengiriman Cepat']].map(([icon, label]) => (
              <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-base">{icon}</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartRow({ item, onQty, onRemove }) {
  const categoryIcon = {
    ban: '🛞', velg: '⚙️', kacafilm: '🪟', bodykit: '🚗',
    audio: '🎵', interior: '🪑', eksterior: '✨',
  };

  return (
    <div className="py-5 flex items-start gap-4">
      <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl border border-gray-100">
        {item.emoji || categoryIcon[item.category] || '📦'}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.brand}</p>
        <p className="text-sm font-semibold text-zinc-900 leading-snug mt-0.5 truncate">{item.name}</p>
        {item.spec && <p className="text-[11px] text-gray-400 font-mono mt-0.5">{item.spec}</p>}

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onQty(-1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >
              −
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-zinc-900 border-x border-gray-200">
              {item.quantity}
            </span>
            <button
              onClick={() => onQty(+1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-sm"
            >
              +
            </button>
          </div>

          <button
            onClick={onRemove}
            className="text-[11px] text-gray-400 hover:text-red-500 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-zinc-900">{fmt(item.price * item.quantity)}</p>
        {item.quantity > 1 && (
          <p className="text-[11px] text-gray-400">{fmt(item.price)} / pcs</p>
        )}
      </div>
    </div>
  );
}

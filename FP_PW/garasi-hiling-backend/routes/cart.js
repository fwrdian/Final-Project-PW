import express from 'express';
import {
  merchandiseStock, sukuCadangStock, shippingOptions,
  paymentMethods, vouchers, TAX_RATE_PERCENT,
} from '../data/inventory.js';
import { setLastSubmittedCart } from '../store/session.js';

const router = express.Router();

// Ambil angka stok sesuai tipe item ('merchandise' | 'suku_cadang')
const getStock = (id, type) => {
  const map = type === 'suku_cadang' ? sukuCadangStock : merchandiseStock;
  return map[id] ?? null;
};

// 🟢 ENDPOINT 1: GET /api/cart/summary
router.get('/summary', (req, res) => {
  res.json({
    success: true,
    message: 'Ringkasan keranjang tersedia.',
    updatedAt: new Date().toISOString(),
  });
});

// 🟢 ENDPOINT 2: GET /api/cart/shipping-options
router.get('/shipping-options', (req, res) => {
  res.json({ options: shippingOptions });
});

// 🟢 ENDPOINT 3: GET /api/cart/payment-methods
router.get('/payment-methods', (req, res) => {
  res.json({ methods: paymentMethods });
});

// 🟢 ENDPOINT 4: GET /api/cart/tax-rate
router.get('/tax-rate', (req, res) => {
  res.json({ percent: TAX_RATE_PERCENT });
});

// 🟢 ENDPOINT 5: GET /api/cart/user-address
router.get('/user-address', (req, res) => {
  // TODO: ganti dengan alamat asli dari tabel user begitu kolom alamat ada
  res.json({ address: 'Jl. Merdeka No. 10, Jakarta Selatan' });
});

// 🟢 ENDPOINT 6: GET /api/cart/shipping-cost?destination=default
router.get('/shipping-cost', (req, res) => {
  const dest = req.query.destination || 'default';
  const opt = shippingOptions.find(o => o.id === dest) || shippingOptions[0];
  res.json({ cost: opt.cost, label: opt.label });
});

// 🟢 ENDPOINT 7: POST /api/cart/validate-stock  body: { items: [{id, type, quantity}] }
router.post('/validate-stock', (req, res) => {
  const items = req.body?.items || [];
  const unavailable = items.filter((i) => {
    const stock = getStock(i.id, i.type);
    return stock === null || stock < i.quantity;
  });

  if (unavailable.length > 0) {
    return res.status(409).json({
      valid: false,
      message: 'Ada item yang stoknya tidak mencukupi.',
      unavailable,
    });
  }
  res.json({ valid: true, message: 'Semua item tersedia.' });
});

// 🟢 ENDPOINT 8: POST /api/cart/apply-voucher  body: { code }
router.post('/apply-voucher', (req, res) => {
  const code = (req.body?.code || '').trim().toUpperCase();
  const voucher = vouchers.find((v) => v.code === code);

  if (!voucher) {
    return res.status(404).json({ message: 'Kode voucher tidak ditemukan atau sudah kedaluwarsa.' });
  }
  res.json({
    message: voucher.message,
    discount: { type: voucher.type, value: voucher.value },
  });
});

// 🟢 ENDPOINT 9: GET /api/cart/promo/validate?code=...
router.get('/promo/validate', (req, res) => {
  const code = (req.query.code || '').trim().toUpperCase();
  const voucher = vouchers.find((v) => v.code === code);
  res.json({ valid: Boolean(voucher) });
});

// 🟢 ENDPOINT 10: POST /api/cart/checkout  body: { items, subtotal, ppn, total }
// Menyimpan snapshot keranjang sementara supaya bisa dibaca lagi oleh
// GET /api/checkout/get-cart-items di halaman Checkout.
router.post('/checkout', (req, res) => {
  const { items = [], subtotal = 0, ppn = 0, total = 0 } = req.body || {};
  setLastSubmittedCart({ items, subtotal, ppn, total, submittedAt: new Date().toISOString() });
  res.json({ success: true, message: 'Data keranjang diterima, lanjut ke checkout.' });
});

export default router;

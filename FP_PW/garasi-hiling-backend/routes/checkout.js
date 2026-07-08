import express from 'express';
import {
  merchandiseStock, sukuCadangStock, shippingOptions, TAX_RATE_PERCENT,
} from '../data/inventory.js';
import { getLastSubmittedCart, orders, nextOrderId } from '../store/session.js';

const router = express.Router();

const getStock = (id, type) => {
  const map = type === 'suku_cadang' ? sukuCadangStock : merchandiseStock;
  return map[id] ?? null;
};

// ============================================================================
// Catatan integrasi Auth: endpoint di bawah ini mengharapkan header
//   Authorization: Bearer <token>
// yang di-generate dari hasil login tim Auth. routes/auth.js SAAT INI belum
// menerbitkan token (login cuma balikin objek user dari MySQL), jadi untuk
// sementara verifySession() di sini hanya mengecek header ADA/TIDAK, bukan
// validasi tanda tangan JWT. Begitu tim Auth menambahkan penerbitan JWT,
// tinggal ganti isi getToken/verify di bawah ini dengan jwt.verify(...) —
// tidak perlu ubah kontrak endpoint atau kode Checkout.jsx di frontend.
// ============================================================================
const getToken = (req) => (req.headers.authorization || '').replace('Bearer ', '').trim();

// 🟢 ENDPOINT 1: GET /api/checkout/verify-session
router.get('/verify-session', (req, res) => {
  const token = getToken(req);
  res.json({ valid: Boolean(token) });
});

// 🟢 ENDPOINT 2: GET /api/checkout/get-cart-items
router.get('/get-cart-items', (req, res) => {
  const lastCart = getLastSubmittedCart();
  if (!lastCart) {
    // Belum ada submit dari halaman Cart -> biarkan frontend pakai data lokal
    return res.json({ success: true, source: 'local-fallback' });
  }
  res.json({ success: true, items: lastCart.items });
});

// 🟢 ENDPOINT 3: GET /api/checkout/get-user-profile
router.get('/get-user-profile', (req, res) => {
  // TODO: ganti dengan SELECT ke tabel user begitu kolom alamat tersedia
  res.json({ address: 'Jl. Merdeka No. 10, Jakarta Selatan' });
});

// 🟢 ENDPOINT 4: POST /api/checkout/calculate-shipping  body: { destination }
router.post('/calculate-shipping', (req, res) => {
  const dest = req.body?.destination || 'default';
  const opt = shippingOptions.find((o) => o.id === dest) || shippingOptions[0];
  res.json({ cost: opt.cost, label: opt.label });
});

// 🟢 ENDPOINT 5: GET /api/checkout/get-tax-rate
router.get('/get-tax-rate', (req, res) => {
  res.json({ percent: TAX_RATE_PERCENT });
});

// 🟢 ENDPOINT 6: POST /api/checkout/validate-stock  body: { items }
router.post('/validate-stock', (req, res) => {
  const items = req.body?.items || [];
  const unavailable = items.filter((i) => {
    const stock = getStock(i.id, i.type);
    return stock === null || stock < i.quantity;
  });

  if (unavailable.length > 0) {
    return res.status(409).json({ valid: false, message: 'Stok tidak mencukupi.', unavailable });
  }
  res.json({ valid: true });
});

// 🟢 ENDPOINT 7: POST /api/checkout/create-order
// body: { items, subtotal, tax, shippingCost, total }
router.post('/create-order', (req, res) => {
  const { items = [], subtotal = 0, tax = 0, shippingCost = 0, total = 0 } = req.body || {};
  const orderId = nextOrderId();

  // Kurangi stok begitu order dibuat (simulasi reservasi)
  items.forEach((i) => {
    const map = i.type === 'suku_cadang' ? sukuCadangStock : merchandiseStock;
    if (map[i.id] !== undefined) map[i.id] = Math.max(0, map[i.id] - i.quantity);
  });

  orders.set(orderId, {
    orderId, items, subtotal, tax, shippingCost, total,
    status: 'menunggu_pembayaran', createdAt: Date.now(),
  });

  res.status(201).json({ success: true, orderId });
});

export default router;

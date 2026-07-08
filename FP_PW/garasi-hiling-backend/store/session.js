// ============================================================================
// Penyimpanan sementara (in-memory) yang menjembatani Cart -> Checkout ->
// Payment tanpa perlu tabel database baru dulu.
// ----------------------------------------------------------------------------
// Cocok untuk demo (single session). Kalau butuh multi-user / production,
// ganti Map di bawah ini dengan tabel `pesanan_produk` & `pembayaran` di
// MySQL, lalu query berdasarkan id_user dari token JWT.
// ============================================================================

// Cart terakhir yang disubmit dari halaman Cart (POST /api/cart/checkout).
// Dipakai supaya GET /api/checkout/get-cart-items punya sesuatu untuk
// dikembalikan ke halaman Checkout.
let lastSubmittedCart = null;
export const setLastSubmittedCart = (payload) => { lastSubmittedCart = payload; };
export const getLastSubmittedCart = () => lastSubmittedCart;

// Order & pembayaran yang sedang berjalan, key = orderId / paymentRef
export const orders = new Map();
export const payments = new Map();

let orderCounter = 1000;
export const nextOrderId = () => `GH-${Date.now().toString().slice(-6)}-${orderCounter++}`;

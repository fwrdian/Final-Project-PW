// ============================================================================
// Data referensi & stok untuk modul Cart, Checkout, Merchandise, Suku Cadang.
// ----------------------------------------------------------------------------
// CATATAN PENTING: data di file ini disimpan IN-MEMORY (di variabel biasa),
// BUKAN di tabel MySQL — karena skema tabel merchandise/suku_cadang/pesanan
// belum dibuat di database (lihat config/db.js & phpMyAdmin). Supaya frontend
// tetap bisa didemokan end-to-end sekarang, angka stok di sini dibuat meniru
// data yang sudah ada di src/components/Merchandise.jsx & SukuCadang.jsx.
//
// Kalau nanti tabelnya sudah dibuat di MySQL, migrasinya tinggal:
//   1. Buat tabel `merchandise` & `suku_cadang` dengan kolom id, stok, dst.
//   2. Ganti isi objek di bawah ini dengan query `db.query(...)`, contoh
//      pola query-nya bisa dicontoh dari routes/mobil.js atau routes/promo.js.
//   3. Struktur endpoint di routes/*.js TIDAK perlu diubah sama sekali,
//      karena mereka cuma import merchandiseStock / sukuCadangStock dari sini.
// ============================================================================

// Stok merchandise (id 1-11, sesuai katalog di Merchandise.jsx)
export const merchandiseStock = {
  1: 40, 2: 25, 3: 55, 4: 30, 5: 12,
  6: 34, 7: 80, 8: 45, 9: 18, 10: 23, 11: 9,
};

// Stok suku cadang (id 1-28, sesuai katalog di SukuCadang.jsx)
export const sukuCadangStock = {
  1: 48, 2: 12, 3: 60, 4: 30, 5: 5, 6: 8, 7: 7, 8: 15, 9: 22, 10: 10,
  11: 3, 12: 4, 13: 35, 14: 9, 15: 6, 16: 18, 17: 24, 18: 16, 19: 20,
  20: 8, 21: 4, 22: 3, 23: 10, 24: 14, 25: 8, 26: 6, 27: 12, 28: 3,
};

// Opsi pengiriman yang ditawarkan di Cart & Checkout
export const shippingOptions = [
  { id: 'reguler', label: 'Reguler (JNE/J&T) · 2-4 hari', cost: 15000 },
  { id: 'express', label: 'Express (Gojek/Grab Same Day)', cost: 35000 },
  { id: 'default', label: 'Ambil di Bengkel + Instalasi Gratis', cost: 0 },
];

// Metode pembayaran yang ditampilkan di ringkasan Cart
export const paymentMethods = ['QRIS', 'Transfer Bank', 'Kartu Kredit/Debit'];

// Daftar kode voucher yang valid untuk apply-voucher & promo/validate
export const vouchers = [
  { code: 'GARASI10', type: 'percent', value: 10, message: 'Diskon 10% berhasil diterapkan.' },
  { code: 'HILING50K', type: 'flat', value: 50000, message: 'Potongan Rp50.000 berhasil diterapkan.' },
  { code: 'GRFAN', type: 'percent', value: 5, message: 'Diskon fan GR 5% berhasil diterapkan.' },
];

export const TAX_RATE_PERCENT = 11;

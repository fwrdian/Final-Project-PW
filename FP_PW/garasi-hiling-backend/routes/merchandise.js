import express from 'express';
import { merchandiseStock } from '../data/inventory.js';

const router = express.Router();

// 🟢 ENDPOINT 1-10: GET /api/merchandise/:id
// Dipanggil paralel oleh frontend untuk id 1..10 saat halaman Merchandise dimuat.
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const stock = merchandiseStock[id];

  if (stock === undefined) {
    return res.status(404).json({ message: 'Produk tidak ditemukan.' });
  }
  res.json({ id, stock });
});

// Dipanggil saat tombol "Tambah ke Keranjang" / "+ Beli" ditekan
router.post('/:id/add-to-cart', (req, res) => {
  const id = Number(req.params.id);
  const quantity = Number(req.body?.quantity) || 1;

  if (merchandiseStock[id] === undefined) {
    return res.status(404).json({ message: 'Produk tidak ditemukan.' });
  }
  if (merchandiseStock[id] < quantity) {
    return res.status(409).json({ success: false, message: 'Stok tidak mencukupi.' });
  }

  merchandiseStock[id] -= quantity;
  res.json({ success: true, remainingStock: merchandiseStock[id] });
});

export default router;

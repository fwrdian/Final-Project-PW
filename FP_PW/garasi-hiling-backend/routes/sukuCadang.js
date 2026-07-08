import express from 'express';
import { sukuCadangStock } from '../data/inventory.js';

const router = express.Router();

// 🟢 ENDPOINT 1-10: GET /api/sukucadang/:id
// Dipanggil paralel oleh frontend untuk id 1..10 saat halaman SukuCadang dimuat.
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const stock = sukuCadangStock[id];

  if (stock === undefined) {
    return res.status(404).json({ message: 'Produk tidak ditemukan.' });
  }
  res.json({ id, stock });
});

// Dipanggil saat tombol "Tambah ke Keranjang" ditekan
router.post('/:id/reserve', (req, res) => {
  const id = Number(req.params.id);
  const quantity = Number(req.body?.quantity) || 1;

  if (sukuCadangStock[id] === undefined) {
    return res.status(404).json({ message: 'Produk tidak ditemukan.' });
  }
  if (sukuCadangStock[id] < quantity) {
    return res.status(409).json({ success: false, message: 'Stok tidak mencukupi.' });
  }

  sukuCadangStock[id] -= quantity;
  res.json({ success: true, remainingStock: sukuCadangStock[id] });
});

export default router;

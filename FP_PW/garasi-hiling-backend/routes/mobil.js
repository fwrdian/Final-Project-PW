import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Endpoint untuk mengambil data mobil
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM mobil');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data mobil', error });
    }
});

// 🔴 TAMBAHKAN BARIS INI DI PALING BAWAH 🔴
export default router;
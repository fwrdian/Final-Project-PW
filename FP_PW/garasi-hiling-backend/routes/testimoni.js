import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Endpoint untuk mengambil data testimoni
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM testimoni');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data testimoni', error });
    }
});

// 🔴 TAMBAHKAN BARIS INI DI PALING BAWAH 🔴
export default router;
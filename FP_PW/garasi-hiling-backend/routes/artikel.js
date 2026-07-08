import express from 'express';
// ⚠️ Sesuaikan path '../config/db.js' ini dengan lokasi file koneksi database MySQL Anda
import db from '../config/db.js'; 

const router = express.Router();

// Endpoint: GET /api/artikel
router.get('/', async (req, res) => {
    try {
        // Jika file db Anda menggunakan promise wrapper (mysql2/promise)
        const [rows] = await db.query('SELECT * FROM artikel ORDER BY date DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error saat mengambil data artikel:', error);
        res.status(500).json({ message: 'Gagal mengambil data dari database' });
    }
});

// Endpoint Opsional: GET /api/artikel/:id (Untuk membaca detail 1 artikel)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM artikel WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Artikel tidak ditemukan' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error saat mengambil detail artikel:', error);
        res.status(500).json({ message: 'Gagal mengambil detail artikel' });
    }
});

export default router;
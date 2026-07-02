import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Endpoint: GET http://localhost:5000/api/testimoni
router.get('/', async (req, res) => {
    try {
        const querySelect = `
            SELECT t.*, u.nama 
            FROM testimoni t
            JOIN user u ON t.id_user = u.id_user
        `;
        const [rows] = await db.query(querySelect);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data testimoni', error });
    }
});

// Endpoint: POST http://localhost:5000/api/testimoni
router.post('/', async (req, res) => {
    const { id_user, role_pekerjaan, review, avatar } = req.body;

    if (!id_user || !review) {
        return res.status(400).json({ message: 'User ID dan isi review wajib diisi!' });
    }

    try {
        const queryInsert = `
            INSERT INTO testimoni (id_user, role_pekerjaan, review, avatar) 
            VALUES (?, ?, ?, ?)
        `;
        await db.query(queryInsert, [id_user, role_pekerjaan || 'Pelanggan', review, avatar || 'foto/supra.jpg']);
        res.status(201).json({ message: 'Terima kasih! Testimoni Anda berhasil disimpan.' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menyimpan testimoni', error });
    }
});

export default router;
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Endpoint: POST http://localhost:5000/api/pemesanan
router.post('/', async (req, res) => {
    const { id_user, id_mobil, id_promo, initialMessage } = req.body;

    if (!id_user || !initialMessage) {
        return res.status(400).json({ message: 'ID User dan pesan wajib diisi!' });
    }

    try {
        const queryInsert = `
            INSERT INTO pemesanan (id_user, id_mobil, id_promo, initialMessage, status_proses) 
            VALUES (?, ?, ?, ?, 'pending')
        `;
        const [result] = await db.query(queryInsert, [id_user, id_mobil || null, id_promo || null, initialMessage]);

        res.status(201).json({
            message: 'Pemesanan berhasil diajukan! Sales GarasiHiling akan segera menghubungi Anda.',
            idPemesanan: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memproses pemesanan', error });
    }
});

export default router;
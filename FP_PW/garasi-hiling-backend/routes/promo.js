import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Endpoint: GET http://localhost:5000/api/promo
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM promo');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data promo', error });
    }
});

export default router;
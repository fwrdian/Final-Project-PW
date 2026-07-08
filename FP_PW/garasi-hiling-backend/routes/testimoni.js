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
export default router;
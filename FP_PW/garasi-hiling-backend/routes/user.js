import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Endpoint: GET http://localhost:5000/api/user
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id_user, nama, email, role_user FROM user');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data user', error });
    }
});

export default router;
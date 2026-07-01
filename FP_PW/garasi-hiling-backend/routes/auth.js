import express from 'express';
import db from '../config/db.js'; // Pastikan jalur koneksi database-mu sudah benar

const router = express.Router();

// 🟢 ENDPOINT 1: REGISTER
router.post('/register', async (req, res) => {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
        return res.status(400).json({ success: false, message: 'Semua kolom wajib diisi!' });
    }

    try {
        const [existingUser] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'Email sudah terdaftar!' });
        }

        const queryInsert = `INSERT INTO user (nama, email, password, role_user) VALUES (?, ?, ?, 'pelanggan')`;
        await db.query(queryInsert, [nama, email, password]);

        return res.status(201).json({ success: true, message: 'Registrasi berhasil! Silakan login.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
    }
});

// 🟢 ENDPOINT 2: LOGIN (Pastikan bagian ini terpasang dengan benar)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validasi input kosong
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email dan password wajib diisi!' });
    }

    try {
        // Cari user berdasarkan email dan password langsung
        const [users] = await db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
        
        // JIKA TIDAK DITEMUKAN (Salah password atau email belum terdaftar)
        if (users.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email atau password yang Anda masukkan salah. Silakan coba lagi!' 
            });
        }

        const user = users[0];

        // JIKA COCOK (Kirim status sukses dan data user)
        return res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            user: {
                id: user.id_user,
                nama: user.nama,
                email: user.email,
                role: user.role_user // Mengantisipasi hak akses admin/pelanggan
            }
        });

    } catch (error) {
        console.error('Login database error:', error);
        return res.status(500).json({ success: false, message: 'Gagal terhubung ke database server.' });
    }
});

export default router;
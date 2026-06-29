import mysql from 'mysql2/promise'; // Menggunakan versi promise agar bisa pakai async/await
import dotenv from 'dotenv';

// Membaca file konfigurasi .env
dotenv.config();

// Membuat koneksi database pool (lebih stabil untuk banyak request)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Tes Koneksi saat backend pertama kali dinyalakan
try {
    const connection = await db.getConnection();
    console.log('✅ Berhasil terhubung ke database MySQL phpMyAdmin!');
    connection.release(); // Kembalikan koneksi ke pool setelah dites
} catch (error) {
    console.error('❌ Gagal konek ke database phpMyAdmin. Cek apakah XAMPP sudah menyala!');
    console.error(error.message);
}

export default db;
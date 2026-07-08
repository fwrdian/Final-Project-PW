import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mobilRoutes from './routes/mobil.js';
import promoRoutes from './routes/promo.js';       
import pemesananRoutes from './routes/pemesanan.js'; 
import testimoniRoutes from './routes/testimoni.js'; 
import userRoutes from './routes/user.js';     
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';
import paymentRoutes from './routes/payment.js';
import merchandiseRoutes from './routes/merchandise.js';
import sukuCadangRoutes from './routes/sukuCadang.js';
import artikelRoutes from './routes/artikel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/mobil', mobilRoutes);
app.use('/api/promo', promoRoutes);
app.use('/api/pemesanan', pemesananRoutes);
app.use('/api/testimoni', testimoniRoutes); 
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/artikel', artikelRoutes);

// ── Modul: Cart, Checkout, Merchandise, Suku Cadang ───────────────────
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/merchandise', merchandiseRoutes);
app.use('/api/sukucadang', sukuCadangRoutes);

app.get('/', (req, res) => {
    res.send('Server GarasiHiling Backend Running...');
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
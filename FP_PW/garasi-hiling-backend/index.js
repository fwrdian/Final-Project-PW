import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mobilRoutes from './routes/mobil.js';
import promoRoutes from './routes/promo.js';       
import pemesananRoutes from './routes/pemesanan.js'; 
import testimoniRoutes from './routes/testimoni.js'; 
import userRoutes from './routes/user.js';        

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

app.get('/', (req, res) => {
    res.send('Server GarasiHiling Backend Running...');
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
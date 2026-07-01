import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Katalog from './components/Katalog';
import Promo from './components/Promo';
import KatalogDetail from './components/Katalog_detail';
import Lokasi from './pages/Lokasi';
import Testimoni from './pages/Testimoni';
import ContactUs from './pages/ContactUs';
import Tentang from './components/Tentang';
import Servis from './components/Servis';
import Profile from './components/Profile';
import FAQ from './components/Faq';
import ScrollToTop from './components/ScrollToTop';
import Login from "./components/Login";
import Register from "./components/Register"; 

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState(null);

  // State untuk menampung pesan promo otomatis
  const [promoMessage, setPromoMessage] = useState('');

  // Hook untuk pindah halaman secara programmatik
  const navigate = useNavigate();

  // 🟢 SINKRONISASI API UTAMA: Mengambil lineup mobil langsung dari database MySQL via Express
  useEffect(() => {
    const fetchGlobalVehicles = async () => {
      try {
        setLoading(true);
        // Diarahkan ke server localhost Express port 5000 kamu
        const response = await axios.get('http://localhost:5000/api/mobil');
        setCars(response.data);
      } catch (error) {
        console.error("Gagal sinkronisasi API Utama Showroom dari backend Express:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalVehicles();
  }, []);

  // Fungsi untuk menangani klik "Ambil Promo"
  const handleTakePromo = (promoTitle) => {
    setPromoMessage(`Halo GarasiHiling, saya tertarik dengan promo: ${promoTitle}. Mohon info selengkapnya.`);
    navigate('/contact'); 
  };

  // 🟢 PERBAIKAN: Mengubah car.title menjadi car.name sesuai kolom database MySQL kamu
  const filteredCars = cars.filter(car =>
    car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white font-sans text-slate-900 scroll-smooth">
      {/* 1. SCROLL MANAGEMENT TO TOP */}
      <ScrollToTop />

      {/* 2. NAVIGATION (Selalu muncul di atas) */}
      <Header setSearchTerm={setSearchTerm} />

      {/* 3. MAIN CONTENT AREA MENGGUNAKAN ROUTES */}
      <main className="min-h-screen">
        <Routes>
          {/* --- HALAMAN HOME --- */}
          <Route path="/" element={
            <>
              <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0">
                  <img
                    src="https://eternamotorworks.com/cdn/shop/files/supraa90collectioncover.jpg?v=1738037689&width=2000"
                    className="w-full h-full object-cover opacity-50"
                    alt="Hero Background"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
                </div>
                <div className="relative z-10 text-center text-white animate-in fade-in zoom-in duration-1000">
                  <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase italic">SUPRA G90</h1>
                  <p className="text-lg md:text-xl mt-4 font-light tracking-widest text-slate-300">FUTURE OF PERFORMANCE</p>
                  <div className="mt-10 flex gap-4 justify-center">
                    <button
                      onClick={() => navigate('/katalog-detail')}
                      className="px-10 py-3 bg-white text-black font-bold uppercase text-xs hover:bg-red-600 hover:text-white transition-all"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </section>

              <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
                <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
                  <div>
                    <h2 className="text-4xl font-bold tracking-tight uppercase italic">Highlight <span className="text-red-600">Unit</span></h2>
                    <p className="text-gray-500 mt-2">Pilih unit masa depan Anda hari ini.</p>
                  </div>
                </div>
                {/* 🟢 Menyertakan filteredCars dan searchTerm agar sinkronisasi filter di Katalog berjalan mulus */}
                <Katalog cars={filteredCars} loading={loading} isLoggedIn={isLoggedIn} searchTerm={searchTerm} />
              </div>
            </>
          } />

          {/* --- ROUTE LAINNYA --- */}
          <Route path="/katalog-detail" element={<KatalogDetail isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
          
          {/* Halaman Otentikasi */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserAccount={setUserAccount} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/promo" element={
            <div className="py-12">
              <Promo onTakePromo={handleTakePromo} />
            </div>
          } />

          <Route path="/tentang" element={<Tentang />} />
          <Route path="/lokasi" element={<Lokasi />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/servis" element={<Servis />} />
          
          {/* Halaman Profile */}
          <Route 
            path="/profile" 
            element={
              <Profile 
                isLoggedIn={isLoggedIn} 
                userAccount={userAccount} 
                setIsLoggedIn={setIsLoggedIn} 
                setUserAccount={setUserAccount} 
              />
            } 
          />
          
          <Route path="/faq" element={<FAQ />} />

          <Route path="/contact" element={
            <div className="max-w-7xl mx-auto px-6 py-24">
              <ContactUs initialMessage={promoMessage} />
            </div>
          } />
        </Routes>
      </main>

      {/* 4. FOOTER (Selalu muncul di bawah) */}
      <Footer />
    </div>
  );
}
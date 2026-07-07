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
import Merchandise from './components/Merchandise';
import SukuCadang from './components/SukuCadang';
import Cart from './components/Cart';

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState(null);
  const [promoMessage, setPromoMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  // Tambah ke cart. Jika id+type sama, increment quantity
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id && i.type === product.type);
      if (exists) return prev.map(i =>
        i.id === product.id && i.type === product.type
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Hapus item dari cart berdasarkan id dan type
  const removeFromCart = (id, type) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.type === type)));
  };

  // Update quantity, jika qty <= 0 hapus item
  const updateQuantity = (id, type, qty) => {
    if (qty <= 0) return removeFromCart(id, type);
    setCartItems(prev => prev.map(i =>
      i.id === id && i.type === type ? { ...i, quantity: qty } : i
    ));
  };

  useEffect(() => {
    const fetchGlobalVehicles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/mobil');
        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          setCars([]);
        }
      } catch (error) {
        console.error("Gagal sinkronisasi API Utama Showroom dari backend Express:", error);
        setCars([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalVehicles();
  }, []);

  const handleTakePromo = (promoTitle) => {
    setPromoMessage(`Halo GarasiHiling, saya tertarik dengan promo: ${promoTitle}. Mohon info selengkapnya.`);
    navigate('/contact'); 
  };

  // Filter sinkron Live Search menggunakan kolom data real database (.name)
  const filteredCars = cars.filter(car =>
    car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
      {/* 1. SCROLL TO TOP */}
      <ScrollToTop />

      {/* 2. NAVIGATION */}
      <Header setSearchTerm={setSearchTerm} cartItems={cartItems} />

      {/* 3. MAIN CONTENT */}
      <main className="pt-20">
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
                <Katalog cars={filteredCars} loading={loading} searchTerm={searchTerm} isLoggedIn={isLoggedIn} />
              </div>
            </>
          } />

          <Route path="/katalog-detail" element={<KatalogDetail isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserAccount={setUserAccount} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/promo" element={<div className="py-12"><Promo onTakePromo={handleTakePromo} /></div>} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/lokasi" element={<Lokasi />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/servis" element={<Servis />} />
          <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} userAccount={userAccount} setIsLoggedIn={setIsLoggedIn} setUserAccount={setUserAccount} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<div className="max-w-7xl mx-auto px-6 py-24"><ContactUs initialMessage={promoMessage} /></div>} />
          
          {/* --- ROUTES BELANJA --- */}
          <Route path="/belanja/merchandise" element={<Merchandise addToCart={addToCart} />} />
          <Route path="/belanja/suku-cadang" element={<SukuCadang addToCart={addToCart} />} />
          <Route path="/cart" element={
            <Cart
              cartItems={cartItems}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          } />
        </Routes>
      </main>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}
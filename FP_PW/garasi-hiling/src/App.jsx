import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Tambahkan ini
import Header from './components/Header';
import Footer from './components/Footer';
import Katalog from './components/Katalog';
import Promo from './components/Promo';
import KatalogDetail from './components/Katalog_detail';
import Lokasi from './components/Lokasi';
import Testimoni from './components/Testimoni';
import ContactUs from './components/ContactUs';
import Tentang from './components/Tentang';
import Merchandise from './components/Merchandise';
import SukuCadang from './components/SukuCadang';
import AksesoriGR from './components/AksesoriGR';
import Cart from './components/Cart';

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // State untuk menampung pesan promo otomatis
  const [promoMessage, setPromoMessage] = useState('');

  // State cart
  const [cartItems, setCartItems] = useState([]);

  // Hook untuk pindah halaman secara programmatik
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
    axios.get('https://fakestoreapi.com/products?limit=12')
      .then(res => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  // Fungsi untuk menangani klik "Ambil Promo"
  const handleTakePromo = (promoTitle) => {
    setPromoMessage(`Halo GarasiHiling, saya tertarik dengan promo: ${promoTitle}. Mohon info selengkapnya.`);
    navigate('/contact'); // Pindah ke route /contact
  };

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="size-full h-screen overflow-y-auto bg-white font-sans text-slate-900 scroll-smooth">

      {/* 1. NAVIGATION */}
      <Header setSearchTerm={setSearchTerm} cartItems={cartItems} />

      {/* 2. MAIN CONTENT AREA MENGGUNAKAN ROUTES */}
      <main className="min-h-screen">
        <Routes>
          {/* --- HALAMAN HOME --- */}
          <Route path="/" element={
            <>
              <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2940"
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
                    <button className="px-10 py-3 border border-white text-white font-bold uppercase text-xs hover:bg-white/10 transition-all">
                      Demo Drive
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
                  <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <button onClick={() => setSelectedCategory('all')}>All Models</button>
                    <button onClick={() => setSelectedCategory('sedan')}>Sedan</button>
                    <button onClick={() => setSelectedCategory('suv')}>SUV</button>
                  </div>
                </div>
                <Katalog cars={filteredCars} loading={loading} />
              </div>
            </>
          } />

          {/* --- ROUTE LAINNYA --- */}
          <Route path="/katalog-detail" element={<KatalogDetail />} />

          <Route path="/promo" element={
            <div className="py-12">
              <Promo onTakePromo={handleTakePromo} />
            </div>
          } />

          <Route path="/tentang" element={<Tentang />} />
          <Route path="/lokasi" element={<Lokasi />} />
          <Route path="/testimoni" element={<Testimoni />} />

          <Route path="/contact" element={
            <div className="max-w-7xl mx-auto px-6 py-24">
              <ContactUs initialMessage={promoMessage} />
            </div>
          } />

          {/* --- ROUTES BELANJA --- */}
          <Route path="/belanja/merchandise" element={<Merchandise addToCart={addToCart} />} />
          <Route path="/belanja/suku-cadang" element={<SukuCadang addToCart={addToCart} />} />
          <Route path="/belanja/aksesoris" element={<AksesoriGR addToCart={addToCart} />} />
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

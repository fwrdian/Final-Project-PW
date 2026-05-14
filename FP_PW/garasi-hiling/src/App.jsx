import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Katalog from './components/Katalog';
import Promo from './components/Promo';
import KatalogDetail from './components/Katalog_detail';
<<<<<<< Updated upstream
=======
import Lokasi from './components/Lokasi';
import Testimoni from './components/Testimoni';
import ContactUs from './components/ContactUs';
import Tentang from './components/Tentang'; // Import komponen baru
>>>>>>> Stashed changes

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // State untuk menampung pesan promo otomatis
  const [promoMessage, setPromoMessage] = useState('');

  // Fetch data produk (simulasi data mobil)
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

  // Fungsi untuk menangani klik "Ambil Promo" di halaman Promo
  const handleTakePromo = (promoTitle) => {
    setPromoMessage(`Halo GarasiHiling, saya tertarik dengan promo: ${promoTitle}. Mohon info selengkapnya.`);
    setActivePage('contact'); // Pindah otomatis ke halaman kontak
  };

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="size-full h-screen overflow-y-auto bg-white font-sans text-slate-900 scroll-smooth">
      
      {/* 1. NAVIGATION */}
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        setSearchTerm={setSearchTerm} 
      />

      {/* 2. HERO SECTION (Hanya muncul di Home) */}
      {activePage === 'home' && (
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
                onClick={() => setActivePage('katalog_detail')} 
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
      )}

      {/* 3. MAIN CONTENT AREA */}
      <main className={`${activePage === 'home' ? 'max-w-7xl mx-auto px-6 md:px-8 py-24' : ''} min-h-screen`}>
        
        {/* HALAMAN HOME */}
        {activePage === 'home' && (
          <>
            <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
              <div>
                <h2 className="text-4xl font-bold tracking-tight uppercase italic">Highlight <span className="text-red-600">Unit</span></h2>
                <p className="text-gray-500 mt-2">Pilih unit masa depan Anda hari ini.</p>
              </div>
              
              <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
                <button onClick={() => setSelectedCategory('all')} className={selectedCategory === 'all' ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-400'}>All Models</button>
                <button onClick={() => setSelectedCategory('sedan')} className={selectedCategory === 'sedan' ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-400'}>Sedan</button>
                <button onClick={() => setSelectedCategory('suv')} className={selectedCategory === 'suv' ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-400'}>SUV</button>
              </div>
            </div>

            <Katalog cars={filteredCars} loading={loading} />
          </>
        )}

        {/* HALAMAN KATALOG DETAIL */}
        {activePage === 'katalog_detail' && <KatalogDetail />}

<<<<<<< Updated upstream
        {/* LOGIKA HALAMAN PROMO */}
        {activePage === 'promo' && <Promo />}
=======
        {/* HALAMAN PROMO (Mengirim handleTakePromo) */}
        {activePage === 'promo' && (
          <Promo 
            onTakePromo={handleTakePromo} 
            setActivePage={setActivePage} 
          />
        )}

        {/* HALAMAN TENTANG KAMI */}
        {activePage === 'tentang' && <Tentang />}

        {/* HALAMAN LOKASI */}
        {activePage === 'lokasi' && <Lokasi />}

        {/* HALAMAN TESTIMONI */}
        {activePage === 'testimoni' && <Testimoni />}

        {/* HALAMAN CONTACT US (Mengirim promoMessage) */}
        {activePage === 'contact' && (
          <div className="max-w-7xl mx-auto px-6 py-24">
            <ContactUs initialMessage={promoMessage} />
          </div>
        )}
>>>>>>> Stashed changes
      </main>

      {/* 4. FOOTER */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
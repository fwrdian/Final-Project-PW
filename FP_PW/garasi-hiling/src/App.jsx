import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Katalog from './components/Katalog';
import Promo from './components/Promo';

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=12')
      .then(res => {
        setCars(res.data);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="size-full overflow-y-auto bg-white font-sans text-slate-900">
      {/* 1. NAVIGATION (Style Electro) */}
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        setSearchTerm={setSearchTerm} 
      />

      {/* 2. HERO SECTION (Style Tesla) */}
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
              <button className="px-10 py-3 bg-white text-black font-bold uppercase text-xs hover:bg-gray-200 transition-all">Order Now</button>
              <button className="px-10 py-3 border border-white text-white font-bold uppercase text-xs hover:bg-white/10 transition-all">Demo Drive</button>
            </div>
          </div>
        </section>
      )}

      {/* 3. MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        {activePage === 'home' && (
          <>
            <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
              <div>
                <h2 className="text-4xl font-bold tracking-tight">Katalog Unit</h2>
                <p className="text-gray-500 mt-2">Pilih unit masa depan Anda hari ini.</p>
              </div>
              
              {/* Filter Category Style Electro */}
              <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
                <button onClick={() => setSelectedCategory('all')} className={selectedCategory === 'all' ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-400'}>All Models</button>
                <button onClick={() => setSelectedCategory('sedan')} className={selectedCategory === 'sedan' ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-400'}>Sedan</button>
                <button onClick={() => setSelectedCategory('suv')} className={selectedCategory === 'suv' ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-400'}>SUV</button>
              </div>
            </div>

            <Katalog cars={filteredCars} loading={loading} />
          </>
        )}

        {activePage === 'promo' && <Promo />}
      </main>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}
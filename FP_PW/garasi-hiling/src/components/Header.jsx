import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const activePage = location.pathname.substring(1) || 'home'; // simple way to match paths like 'promo' or 'home'

  const menuVehicles = [
    { name: 'Supra G90', desc: 'Legendary Sport Coupe' },
    { name: 'Century SUV', desc: 'Ultra Luxury Edition' },
    { name: 'Crown Sedan', desc: 'Premium Hybrid Executive' },
    { name: 'GR Yaris', desc: 'High Performance Hatchback' },
  ];

  const menuShop = [
    { name: 'Suku Cadang', desc: 'Original Toyota Parts' },
    { name: 'Aksesoris GR', desc: 'Gazoo Racing Upgrades' },
    { name: 'Merchandise', desc: 'Exclusive Apparel' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans">
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        
        <Link to="/">
          <h1 
            className="text-xl tracking-[0.1em] font-black italic cursor-pointer select-none text-black" 
          >
            GARASI<span className="text-red-600">H</span>
          </h1>
        </Link>

        <div className="hidden lg:flex items-center gap-1 text-[14px] font-bold uppercase tracking-widest text-zinc-800">
          
          {/* TOMBOL KATALOG (SEKARANG JADI TOMBOL BIASA) */}
          <Link 
            to="/katalog"
            className={`px-4 py-2 rounded-md transition-colors ${
              activePage === 'katalog' 
              ? 'text-red-600 bg-gray-50' 
              : 'hover:bg-gray-100 hover:text-red-600'
            }`}
          >
            Katalog
          </Link>
          
          {/* DROPDOWN SHOP (TETAP ADA KARENA BIASANYA BANYAK ITEM) */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('shop')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1 ${openDropdown === 'shop' ? 'bg-gray-100 text-red-600' : ''}`}>
              Belanja
              <svg className={`w-3 h-3 mt-0.5 transition-transform ${openDropdown === 'shop' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === 'shop' && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-100 py-3 mt-1 rounded-xl animate-in fade-in slide-in-from-top-2">
                {menuShop.map((item) => (
                  <Link key={item.name} to="/katalog" className="block w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors group">
                    <div className="font-black text-xs group-hover:text-red-600 uppercase tracking-widest">{item.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium normal-case">{item.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/promo" className={`px-4 py-2 rounded-md transition-colors ${activePage === 'promo' ? 'text-red-600 bg-gray-50' : 'hover:bg-gray-100 hover:text-red-600'}`}>Promo Mei</Link>
          <Link to="/lokasi" className={`px-4 py-2 rounded-md transition-colors ${activePage === 'lokasi' ? 'text-red-600 bg-gray-50' : 'hover:bg-gray-100 hover:text-red-600'}`}>Lokasi</Link>
          <Link to="/testimoni" className={`px-4 py-2 rounded-md transition-colors ${activePage === 'testimoni' ? 'text-red-600 bg-gray-50' : 'hover:bg-gray-100 hover:text-red-600'}`}>Testimoni</Link>
          <Link to="/contact" className={`px-4 py-2 rounded-md transition-colors ${activePage === 'contact' ? 'text-red-600 bg-gray-50' : 'hover:bg-gray-100 hover:text-red-600'}`}>Contact</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-md transition-all text-zinc-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-md transition-all text-zinc-700 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
          </button>

          <button className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-zinc-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-widest">Akun</span>
          </button>

          <button 
            onClick={() => navigate('/katalog')}
            className="bg-black text-white px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-zinc-800 transition-all active:scale-95 ml-2 shadow-lg shadow-black/10"
          >
            Order
          </button>
        </div>
      </div>
    </nav>
  );
}
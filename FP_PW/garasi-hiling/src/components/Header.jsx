import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuShop = [
    { name: 'Suku Cadang', desc: 'Original Toyota Parts' },
    { name: 'Aksesoris GR', desc: 'Gazoo Racing Upgrades' },
    { name: 'Merchandise', desc: 'Exclusive Apparel' },
  ];

  // Fungsi styling menu aktif yang sudah diperbaiki
  const navStyle = ({ isActive }) => 
    `px-4 py-2 rounded-md transition-colors ${
      isActive 
        ? 'text-red-600 bg-gray-50 font-bold' 
        : 'hover:bg-gray-100 hover:text-red-600'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans">
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-xl tracking-[0.1em] font-black italic select-none text-black">
          GARASI<span className="text-red-600">H</span>
        </Link>

        {/* MENU TENGAH */}
        <div className="hidden lg:flex items-center gap-1 text-[14px] font-bold uppercase tracking-widest text-zinc-800">
          <NavLink to="/" className={navStyle}>Home</NavLink>
          <NavLink to="/katalog-detail" className={navStyle}>Katalog</NavLink>
          
          {/* ... (Dropdown Belanja tetap sama) ... */}

          <NavLink to="/promo" className={navStyle}>Promo Mei</NavLink>
          <NavLink to="/lokasi" className={navStyle}>Lokasi</NavLink>
          <NavLink to="/testimoni" className={navStyle}>Testimoni</NavLink>
          <NavLink to="/contact" className={navStyle}>Contact</NavLink>
        </div>

        {/* --- BAGIAN KANAN YANG TADI HILANG (DI SINI) --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Icon Search */}
          <button className="p-2 hover:bg-gray-100 rounded-md transition-all text-zinc-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Icon Keranjang dengan Notif Merah */}
          <button className="p-2 hover:bg-gray-100 rounded-md transition-all text-zinc-700 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
          </button>

          {/* Icon Akun */}
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-zinc-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-widest">Akun</span>
          </button>

          {/* Tombol ORDER Hitam */}
          <Link 
            to="/katalog-detail"
            className="bg-black text-white px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-zinc-800 transition-all active:scale-95 ml-2 shadow-lg shadow-black/10"
          >
            Order
          </Link>

        </div>
      </div>
    </nav>
  );
}
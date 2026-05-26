import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Promo = () => {
  const navigate = useNavigate();

  // State untuk menampung data promo, loading, dan error
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        // GANTI URL INI dengan URL endpoint MockAPI milikmu yang asli
        const response = await axios.get('https://6a11f1ef3e35d0f37ee3d6d8.mockapi.io/api/v1/promo');
        
        // Membatasi data yang diambil hanya 10 item pertama
        const limitedData = response.data.slice(0, 10);
        
        setPromoList(limitedData);
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data promo:", err);
        setError("Gagal memuat data penawaran spesial. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  const handleTakePromo = (promoTitle) => {
    // Navigasi ke halaman contact sambil membawa data message
    navigate('/contact', { 
      state: { message: `Halo GarasiHiling, saya tertarik dengan promo: ${promoTitle}. Mohon info selengkapnya.` } 
    });
  };

  // UI saat data sedang dimuat (Loading Spinner)
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // UI saat API mengalami error/gagal dipanggil
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gray-600 font-medium mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-black text-white px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-red-600 transition-all"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // UI Utama setelah data berhasil didapatkan
  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-black overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Hero Banner" 
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            Special <span className="text-red-600">Offers</span>
          </h1>
          <p className="text-gray-300 mt-4 tracking-[0.3em] font-bold uppercase text-xs">
            Penawaran Terbaik Bulan Ini
          </p>
        </div>
      </div>

      {/* Grid List Promo */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 gap-12">
        {/* Validasi jika data dari API kosong */}
        {promoList.length === 0 && (
          <p className="text-center text-gray-500 py-10">Saat ini tidak ada promo yang tersedia.</p>
        )}

        {promoList.map((promo) => (
          <div 
            key={promo.id} 
            className="flex flex-col lg:flex-row bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group hover:shadow-2xl transition-all"
          >
            {/* Bagian Gambar */}
            <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden relative">
              <img 
                src={promo.bgImage} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt={promo.title} 
              />
              <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1 text-[10px] font-black uppercase italic tracking-widest">
                {promo.tag}
              </div>
            </div>

            {/* Bagian Konten/Teks */}
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[2px] w-12 bg-red-600"></span>
                <span className="text-xs font-black uppercase text-red-600">{promo.highlight}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-6">
                {promo.title}
              </h2>
              <p className="text-gray-500 mb-10">{promo.desc}</p>
              
              {/* Bagian Footer Card */}
              <div className="flex flex-wrap items-center justify-between gap-6 border-t pt-8">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Berlaku Hingga</p>
                  <p className="text-sm font-black text-slate-800">{promo.validUntil}</p>
                </div>
                <button 
                  onClick={() => handleTakePromo(promo.title)} 
                  className="bg-black text-white px-10 py-4 rounded-full font-bold text-[10px] uppercase hover:bg-red-600 transition-all"
                >
                  Ambil Promo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
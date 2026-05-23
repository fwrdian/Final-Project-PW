import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Katalog = ({ cars }) => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeCar, setActiveCar] = useState(null);
  const navigate = useNavigate();

  // Fetch data dari API yang sama dengan KatalogDetail
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://6a11f1ef3e35d0f37ee3d6d8.mockapi.io/api/v1/katalog');
        setAllVehicles(response.data);
      } catch (error) {
        console.error("Gagal mengambil data katalog home:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Sinkronisasi dengan fitur Live Search dari Navbar
  // Jika ada pencarian dari navbar (cars memiliki filter), kita pakai data dari props.
  // Jika tidak ada pencarian, kita tampilkan 4 unit pertama saja dari API untuk halaman Home.
  const displayVehicles = cars && cars.length < 12 
    ? cars 
    : allVehicles.slice(0, 4); // Hanya menampilkan setengah/sebagian saja (4 unit pertama)

  // Fungsi saat tombol "Order Unit" atau "Pesan" diklik lari ke halaman kontak
  const handleOrder = (car) => {
    navigate('/contact', { 
      state: { message: `Halo GarasiHiling, saya tertarik untuk memesan unit ${car.name}. Mohon info prosedur dan ketersediaan stoknya.` } 
    });
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600 mx-auto"></div>
        <span className="block mt-4 font-bold uppercase tracking-widest text-xs text-slate-400">Menghubungkan ke Showroom...</span>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* --- HEADER KATALOG DI HOME --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
          <h3 className="text-4xl font-black italic uppercase tracking-tight">
            Highlight <span className="text-red-600 underline">Unit</span>
          </h3>
          <p className="text-slate-500 text-sm mt-2">Pilihan unit premium terbaik untuk perjalanan Anda.</p>
        </div>
        <button 
          onClick={() => navigate('/katalog-detail')} 
          className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-900 px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
        >
          Lihat Semua Unit ({allVehicles.length}) →
        </button>
      </div>

      {/* --- GRID KATALOG (STRUKTUR SAMA DENGAN KATALOG DETAIL) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {displayVehicles.map((unit) => (
          <div 
            key={unit.id} 
            className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
          >
            {/* Foto Unit */}
            <div 
              className="relative h-72 overflow-hidden cursor-pointer"
              onClick={() => { setActiveCar(unit); setShowModal(true); }}
            >
              <img 
                src={unit.img} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt={unit.name} 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {unit.category}
                </span>
              </div>
            </div>

            {/* Info Unit */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-black italic uppercase text-slate-900 leading-tight mb-1">
                    {unit.name}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {unit.engine ? unit.engine.split(' ')[0] : 'Premium'} Engine
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-black text-xl italic tracking-tighter">{unit.price}</p>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="mt-6 pt-6 border-t border-slate-50 flex gap-4">
                <button 
                  onClick={() => handleOrder(unit)}
                  className="flex-1 bg-black text-white py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
                >
                  Pesan Sekarang
                </button>
                <button 
                  onClick={() => { setActiveCar(unit); setShowModal(true); }}
                  className="px-6 py-3 border-2 border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all text-slate-500"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL POP-UP (STRUKTUR SAMA DENGAN KATALOG DETAIL) --- */}
      {showModal && activeCar && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="bg-white w-full max-w-5xl relative z-10 flex flex-col md:flex-row shadow-2xl rounded-[40px] overflow-hidden">
            <div className="w-full md:w-3/5 h-[300px] md:h-auto">
              <img src={activeCar.img} alt={activeCar.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-12 w-full md:w-2/5 flex flex-col justify-center">
              <h2 className="text-4xl font-black italic uppercase mb-2 leading-none">{activeCar.name}</h2>
              <p className="text-red-600 font-bold text-2xl mb-8 tracking-tighter">{activeCar.price}</p>
              <div className="space-y-3 mb-10 text-xs font-bold uppercase tracking-widest text-slate-500">
                <div className="flex justify-between border-b pb-2"><span>Category</span><span className="text-black">{activeCar.category}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Power</span><span className="text-black">{activeCar.power || '300+ HP'}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Engine</span><span className="text-black">{activeCar.engine || 'V6 Turbo'}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Capacity</span><span className="text-black">{activeCar.seat || '5-Seater'}</span></div>
              </div>
              <button 
                onClick={() => handleOrder(activeCar)} 
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-red-600 transition-all"
              >
                Order Unit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Katalog;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // 1. Import Axios

const KatalogDetail = () => {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [activeCar, setActiveCar] = useState(null);
  
  // 2. Tambahkan state untuk menampung data dari API & loading
  const [allVehicles, setAllVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  // 3. Fungsi untuk mengambil data (Fetch Data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://6a11f1ef3e35d0f37ee3d6d8.mockapi.io/api/v1/katalog');
        setAllVehicles(response.data);
      } catch (error) {
        console.error("Gagal mengambil data mobil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // --- RENDER LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <span className="ml-4 font-bold uppercase tracking-widest text-slate-400">Loading Lineup...</span>
      </div>
    );
  }

  // --- (Fungsi renderAllCategory, renderSportCategory, dll tetap sama) ---
  // Pastikan nama property di API (engine, power, seat, dll) sama dengan yang ada di kodingan.
  
  // ... (Sisa kodingan render kamu di bawah tetap sama)

  // --- 0. RENDER ALL CATEGORY (CLEAN 3-COLUMN GRID) ---
  const renderAllCategory = () => {
    return (
      <div className="mb-24">
        <h2 className="text-xl font-black uppercase tracking-[0.4em] mb-10 text-slate-300 border-b pb-4 italic">/ All Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allVehicles.map(unit => (
            <div key={unit.id} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={unit.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={unit.name} />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {unit.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black italic uppercase text-slate-900 mb-1 leading-tight">{unit.name}</h3>
                <p className="text-red-600 font-bold text-lg mb-6">{unit.price}</p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{unit.engine.split(' ')[0]} Engine</span>
                   <button 
                    onClick={() => { setActiveCar(unit); setShowModal(true); }}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
                   >
                     Details
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- 1. RENDER KATEGORI SPORT ---
  const renderSportCategory = () => {
    const sports = allVehicles.filter(v => v.category === 'sport');
    return (
      <div className="mb-24">
        <h2 className="text-xl font-black uppercase tracking-[0.4em] mb-10 text-slate-300 border-b pb-4">/ Sport Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sports.map(unit => (
            <div key={unit.id} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="relative h-60 overflow-hidden">
                <img src={unit.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={unit.name} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black italic uppercase mb-1">{unit.name}</h3>
                <p className="text-red-600 font-bold mb-6">{unit.price}</p>
                <button onClick={() => { setActiveCar(unit); setShowModal(true); }} className="w-full bg-black text-white py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all">Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- 2. RENDER KATEGORI SUV (ZIG-ZAG) ---
  const renderSUVCategory = () => {
    const suvs = allVehicles.filter(v => v.category === 'suv');
    return (
      <div className="mb-24 space-y-24">
        <h2 className="text-xl font-black uppercase tracking-[0.4em] text-slate-300 border-b pb-4">/ Premium SUV Series</h2>
        {suvs.map((unit, index) => (
          <div key={unit.id} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl group">
                <img src={unit.img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={unit.name} />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h3 className="text-5xl font-black italic uppercase text-slate-900 leading-none tracking-tighter">{unit.name}</h3>
              <p className="text-red-600 text-2xl font-bold">{unit.price}</p>
              <p className="text-slate-500 font-medium">Kombinasi sempurna antara ketangguhan off-road dan kemewahan eksklusif.</p>
              <button onClick={() => { setActiveCar(unit); setShowModal(true); }} className="bg-black text-white px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl">DETAILS</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --- 3. RENDER KATEGORI MPV (WIDE LUXURY) ---
  const renderMPVCategory = () => {
    const mpvs = allVehicles.filter(v => v.category === 'mpv');
    return (
      <div className="mb-24">
        <h2 className="text-xl font-black uppercase tracking-[0.4em] mb-10 text-slate-300 border-b pb-4">/ Elite MPV</h2>
        <div className="grid grid-cols-1 gap-10">
          {mpvs.map(unit => (
            <div key={unit.id} className="flex flex-col md:flex-row bg-black rounded-[32px] overflow-hidden border border-white hover:border-red-600/50 transition-all duration-500">
              <div className="w-full md:w-1/2 h-120">
                <img src={unit.img} className="w-full h-full object-cover opacity-80" alt={unit.name} />
              </div>
              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center text-white">
                <span className="text-white font-black text-[10px] tracking-[0.3em] uppercase mb-4">First Class Travel</span>
                <h3 className="text-4xl font-black italic uppercase mb-2">{unit.name}</h3>
                <p className="text-white font-bold text-xl mb-8">{unit.price}</p>
                <button onClick={() => { setActiveCar(unit); setShowModal(true); }} className="w-fit bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">DETAILS</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans pt-20">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900">
          THE <span className="text-red-600">LINEUP</span>
        </h1>
        <div className="w-24 h-2 bg-red-600 mx-auto mt-4 mb-8"></div>
      </div>

      {/* FILTER TABS */}
      <div className="max-w-7xl mx-auto px-8 mb-20 flex justify-center">
        <div className="flex flex-wrap gap-4 bg-slate-100 p-2 rounded-full font-black text-[10px] uppercase tracking-widest">
          {['all', 'sport', 'suv', 'mpv'].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-10 py-3 rounded-full transition-all ${filter === cat ? 'bg-black text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}
            >
              {cat === 'all' ? 'Show All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-8">
        {filter === 'all' && renderAllCategory()}
        {filter === 'sport' && renderSportCategory()}
        {filter === 'suv' && renderSUVCategory()}
        {filter === 'mpv' && renderMPVCategory()}
      </div>

      {/* MODAL */}
      {showModal && activeCar && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="bg-white w-full max-w-5xl relative z-10 flex flex-col md:flex-row shadow-2xl rounded-[40px] overflow-hidden">
            <div className="w-full md:w-3/5 h-[400px] md:h-auto">
              <img src={activeCar.img} alt={activeCar.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-12 w-full md:w-2/5 flex flex-col justify-center">
              <h2 className="text-4xl font-black italic uppercase mb-2 leading-none">{activeCar.name}</h2>
              <p className="text-red-600 font-bold text-2xl mb-8 tracking-tighter">{activeCar.price}</p>
              <div className="space-y-4 mb-10 text-xs font-bold uppercase tracking-widest text-slate-500">
                <div className="flex justify-between border-b pb-2"><span>Category</span><span className="text-black">{activeCar.category}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Power</span><span className="text-black">{activeCar.power}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Engine</span><span className="text-black">{activeCar.engine}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Seat</span><span className="text-black">{activeCar.seat}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Stock</span><span className="text-black">{activeCar.stock}</span></div>
              </div>
              <button onClick={() => setShowModal(false)} className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-red-600 transition-all">Order Unit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KatalogDetail;
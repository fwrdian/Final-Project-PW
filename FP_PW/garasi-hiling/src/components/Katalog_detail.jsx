import React, { useState } from 'react';

const KatalogDetail = () => {
  const [filter, setFilter] = useState('all');

  // Data Mobil Showroom GarasiH
  const allVehicles = [
    { id: 1, name: "GR Supra RT", category: "sport", price: "Rp 1.649.250.000", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000", engine: "3.0L B58 Inline-6", power: "382 HP", seat: "2-Seater" },
    { id: 2, name: "Land Cruiser 300", category: "suv", price: "Rp 2.583.100.000", img: "https://images.unsplash.com/photo-1621932953986-15fcf084da0f?q=80&w=1000", engine: "3.3L V6 Diesel", power: "305 HP", seat: "7-Seater" },
    { id: 3, name: "Crown Sport", category: "suv", price: "Rp 1.250.000.000", img: "https://images.unsplash.com/photo-1706157303031-61099ec05a5a?q=80&w=1000", engine: "2.5L Hybrid PHEV", power: "302 HP", seat: "5-Seater" },
    { id: 4, name: "GR Yaris Facelift", category: "sport", price: "Rp 1.150.000.000", img: "https://images.unsplash.com/photo-1621243750570-5f6534571871?q=80&w=1000", engine: "1.6L G16E-GTS Turbo", power: "304 HP", seat: "4-Seater" },
    { id: 5, name: "Alphard HEV", category: "mpv", price: "Rp 1.710.000.000", img: "https://images.unsplash.com/photo-1619193100630-999391061922?q=80&w=1000", engine: "2.5L A25A-FXS Hybrid", power: "247 HP", seat: "7-Seater" },
    { id: 6, name: "Century SUV", category: "suv", price: "Rp 3.500.000.000", img: "https://images.unsplash.com/photo-1632245889029-e406fbdd24ec?q=80&w=1000", engine: "3.5L V6 Plug-in Hybrid", power: "406 HP", seat: "4-Seater" },
  ];

  const filteredVehicles = filter === 'all' 
    ? allVehicles 
    : allVehicles.filter(v => v.category === filter);

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* --- HEADER KATALOG --- */}
      <div className="bg-slate-50 py-16 px-8 mb-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="border-l-8 border-red-600 pl-6">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">
              Toyota G-Series <span className="text-red-600">Collection</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2 max-w-xl text-sm md:text-base">
              Eksplorasi lini kendaraan premium kami. Dari performa sirkuit hingga kemewahan SUV masa depan.
            </p>
          </div>
        </div>
      </div>

      {/* --- FILTER TABS --- */}
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-[0.2em]">
          {['all', 'sport', 'suv', 'mpv'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full border-2 transition-all ${
                filter === cat 
                ? 'bg-black text-white border-black shadow-xl shadow-black/20' 
                : 'border-slate-100 text-slate-400 hover:border-red-600 hover:text-red-600'
              }`}
            >
              {cat === 'all' ? 'Semua Unit' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID KATALOG --- */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredVehicles.map((unit) => (
          <div key={unit.id} className="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
            {/* Foto Unit */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={unit.img} 
                alt={unit.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">
                {unit.category}
              </div>
            </div>

            {/* Info Unit */}
            <div className="p-8 flex-grow flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-black italic uppercase text-slate-900 leading-tight mb-1">
                  {unit.name}
                </h3>
                <p className="text-red-600 font-bold text-lg">{unit.price}</p>
              </div>

              {/* Spek Mini */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-slate-50 pt-6 mb-8">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Engine</p>
                  <p className="text-[11px] font-bold text-slate-700">{unit.engine}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Max Power</p>
                  <p className="text-[11px] font-bold text-slate-700">{unit.power}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Capacity</p>
                  <p className="text-[11px] font-bold text-slate-700">{unit.seat}</p>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="mt-auto pt-4 flex gap-2">
                <button className="flex-1 bg-black text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-black/5">
                  Check Stock
                </button>
                <button className="px-6 py-4 border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KatalogDetail;
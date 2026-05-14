import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KatalogDetail = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const allVehicles = [
    { id: 1, name: "GR Supra RT", category: "sport", price: "Rp 1.649.250.000", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000", engine: "3.0L B58 Inline-6", power: "382 HP", seat: "2-Seater" },
    { id: 2, name: "Land Cruiser 300", category: "suv", price: "Rp 2.583.100.000", img: "https://images.unsplash.com/photo-1621932953986-15fcf084da0f?q=80&w=1000", engine: "3.3L V6 Diesel", power: "305 HP", seat: "7-Seater" },
    { id: 3, name: "Crown Sport", category: "suv", price: "Rp 1.250.000.000", img: "https://images.unsplash.com/photo-1706157303031-61099ec05a5a?q=80&w=1000", engine: "2.5L Hybrid PHEV", power: "302 HP", seat: "5-Seater" },
    { id: 4, name: "GR Yaris Facelift", category: "sport", price: "Rp 1.150.000.000", img: "https://images.unsplash.com/photo-1621243750570-5f6534571871?q=80&w=1000", engine: "1.6L G16E-GTS Turbo", power: "304 HP", seat: "4-Seater" },
    { id: 5, name: "Alphard HEV", category: "mpv", price: "Rp 1.710.000.000", img: "https://images.unsplash.com/photo-1619193100630-999391061922?q=80&w=1000", engine: "2.5L A25A-FXS Hybrid", power: "247 HP", seat: "7-Seater" },
    { id: 6, name: "Century SUV", category: "suv", price: "Rp 3.500.000.000", img: "https://images.unsplash.com/photo-1632245889029-e406fbdd24ec?q=80&w=1000", engine: "3.5L V6 Plug-in Hybrid", power: "406 HP", seat: "4-Seater" },
  ];

  const filteredVehicles = filter === 'all' ? allVehicles : allVehicles.filter(v => v.category === filter);

  return (
    <div className="bg-white min-h-screen pb-20 animate-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-50 py-16 px-8 mb-12 border-b">
        <div className="max-w-7xl mx-auto border-l-8 border-red-600 pl-6">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">
            Toyota G-Series <span className="text-red-600">Collection</span>
          </h1>
          <p className="text-slate-500 mt-2">Lini kendaraan premium Yogyakarta.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mb-12 flex gap-4 overflow-x-auto pb-4">
        {['all', 'sport', 'suv', 'mpv'].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-3 rounded-full border-2 text-xs font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-black text-white border-black shadow-lg' : 'border-slate-100 text-slate-400 hover:border-red-600'}`}>{cat}</button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredVehicles.map((unit) => (
          <div key={unit.id} className="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="h-64 overflow-hidden relative">
              <img src={unit.img} alt={unit.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-white/90 px-4 py-1 rounded-full text-[10px] font-black uppercase text-slate-900">{unit.category}</div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black italic uppercase mb-1">{unit.name}</h3>
              <p className="text-red-600 font-bold text-lg mb-6">{unit.price}</p>
              <div className="grid grid-cols-2 gap-4 border-t pt-6 text-[11px] font-bold text-slate-700 mb-8">
                <div><p className="text-slate-400 uppercase text-[9px]">Engine</p>{unit.engine}</div>
                <div><p className="text-slate-400 uppercase text-[9px]">Power</p>{unit.power}</div>
              </div>
              <button 
                onClick={() => navigate('/contact', { state: { message: `Halo, saya ingin cek stok unit ${unit.name}` } })}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all"
              >
                Check Stock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KatalogDetail;
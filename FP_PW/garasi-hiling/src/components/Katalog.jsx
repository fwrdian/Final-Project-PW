import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Katalog = ({ cars, loading }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeCar, setActiveCar] = useState(null);
  const navigate = useNavigate();

  const toyotaModels = [
    { name: "Toyota Supra G90", type: "Sport", engine: "3.0L Turbo", transmission: "8-Speed AT", fuel: "Bensin", img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000' },
    { name: "Toyota Century SUV", type: "Luxury SUV", engine: "3.5L V6 Hybrid", transmission: "e-CVT", fuel: "Hybrid", img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000' },
    { name: "Toyota Crown Sedan", type: "Premium Sedan", engine: "2.5L Hybrid", transmission: "AWD", fuel: "Hybrid", img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000' },
    { name: "Toyota GR Yaris", type: "Hatchback", engine: "1.6L Turbo", transmission: "6-Speed MT", fuel: "Bensin", img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000' },
  ];

  const handleOrder = (car) => {
    navigate('/contact', { state: { message: `Halo, saya ingin memesan unit ${car.name}. Mohon info prosedurnya.` } });
    setShowModal(false);
  };

  if (loading) return <div className="py-20 text-center tracking-widest text-gray-400 animate-pulse">SINKRONISASI DATA DEALER...</div>;

  return (
    <div className="font-sans">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <h3 className="text-4xl font-medium tracking-tight italic uppercase">Katalog <span className="font-black text-red-600 underline">G-Series</span></h3>
        <button onClick={() => navigate('/katalog-detail')} className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all">Lihat Semua Unit →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        {toyotaModels.map((model, index) => {
          const priceOTR = "Rp " + (Math.floor(Math.random() * (2000 - 500) + 500)) + ".000.000"; // Simulasi harga
          return (
            <article key={index} className="group">
              <div 
                className="aspect-[16/9] overflow-hidden bg-gray-100 mb-8 rounded-2xl cursor-pointer" 
                onClick={() => { setActiveCar({...model, priceOTR}); setShowModal(true); }}
              >
                <img src={model.img} alt={model.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-black italic uppercase tracking-tighter">{model.name}</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">{model.type} • {model.fuel}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-black text-xl italic">{priceOTR}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => handleOrder(model)} className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all">Pesan</button>
                <button onClick={() => { setActiveCar({...model, priceOTR}); setShowModal(true); }} className="px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* MODAL */}
      {showModal && activeCar && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white w-full max-w-4xl relative z-10 flex flex-col md:flex-row overflow-hidden rounded-3xl">
            <div className="md:w-1/2 h-64 md:h-auto"><img src={activeCar.img} className="w-full h-full object-cover" alt="" /></div>
            <div className="p-10 md:w-1/2 flex flex-col justify-center">
               <h2 className="text-3xl font-black italic uppercase mb-6">{activeCar.name}</h2>
               <div className="space-y-3 mb-10 text-sm">
                  <div className="flex justify-between border-b pb-2"><span>Tipe</span><span className="font-bold">{activeCar.type}</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Mesin</span><span className="font-bold">{activeCar.engine}</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Harga OTR</span><span className="font-bold text-red-600">{activeCar.priceOTR}</span></div>
               </div>
               <button onClick={() => handleOrder(activeCar)} className="w-full bg-black text-white py-4 font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-red-600">Lanjutkan Pemesanan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Katalog;
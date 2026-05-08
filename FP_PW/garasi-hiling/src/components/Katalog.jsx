import React, { useState } from 'react';

const Katalog = ({ cars, loading }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeCar, setActiveCar] = useState(null);

  const toyotaModels = [
    { name: "Toyota Supra G90", type: "Sport", engine: "3.0L Turbo", transmission: "8-Speed AT", fuel: "Bensin" },
    { name: "Toyota Century SUV", type: "Luxury SUV", engine: "3.5L V6 Hybrid", transmission: "e-CVT", fuel: "Hybrid" },
    { name: "Toyota Crown Sedan", type: "Premium Sedan", engine: "2.5L Hybrid", transmission: "AWD", fuel: "Hybrid" },
    { name: "Toyota GR Yaris", type: "Hatchback", engine: "1.6L Turbo", transmission: "6-Speed MT", fuel: "Bensin" },
  ];

  const carImages = [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000', // Supra
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000', // Luxury SUV
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000', // Sedan
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000', // Hatchback
  ];

  const handleOrder = (car) => {
    alert(`Unit ${car.name} telah masuk ke antrean pemesanan. Dealer kami di Yogyakarta akan segera menghubungi Anda.`);
    setShowModal(false);
  };

  if (loading) return <div className="py-20 text-center tracking-widest text-gray-400">SINKRONISASI DATA DEALER...</div>;

  return (
    <div className="font-sans px-4">
      <div className="flex justify-between items-end mb-16">
        <h3 className="text-4xl font-medium tracking-tight">Katalog <span className="font-bold">Toyota G-Series</span></h3>
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest">
          <button className="text-black border-b-2 border-black pb-1">Ready Stock</button>
          <button className="text-gray-400 hover:text-black transition-colors">Indent</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        {cars.slice(0, 4).map((car, index) => {
          const model = toyotaModels[index % toyotaModels.length];
          const img = carImages[index % carImages.length];
          // Simulasi Harga OTR Yogyakarta
          const priceOTR = (car.price * 15000000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

          return (
            <article key={car.id} className="group cursor-pointer">
              <div className="aspect-[16/9] overflow-hidden bg-gray-100 mb-8 rounded-sm shadow-sm" onClick={() => { setActiveCar({...model, img, priceOTR}); setShowModal(true); }}>
                <img src={img} alt={model.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-bold uppercase italic tracking-tighter">{model.name}</h4>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">{model.type} • {model.fuel}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Mulai Dari</p>
                  <p className="text-xl font-bold text-red-600">{priceOTR}</p>
                </div>
              </div>

              <div className="flex gap-8 mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 pt-6">
                <span>{model.engine}</span>
                <span>{model.transmission}</span>
                <span className="text-green-600">● Tersedia di Amikom Dealer</span>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => handleOrder(model)}
                  className="px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all rounded-full"
                >
                  Pesan Sekarang
                </button>
                <button 
                  onClick={() => { setActiveCar({...model, img, priceOTR}); setShowModal(true); }}
                  className="px-8 py-3 border border-gray-200 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all rounded-full"
                >
                  Detail Spesifikasi
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* --- MODAL POP-UP JUAL BELI --- */}
      {showModal && activeCar && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="bg-white w-full max-w-5xl relative z-10 flex flex-col md:flex-row shadow-2xl animate-in zoom-in duration-300">
            <div className="w-full md:w-3/5 bg-gray-100">
              <img src={activeCar.img} alt={activeCar.nama} className="w-full h-full object-cover" />
            </div>
            <div className="p-10 md:p-14 w-full md:w-2/5 flex flex-col justify-center">
               <span className="text-red-600 font-bold text-[10px] tracking-widest uppercase mb-2">Penawaran Terbatas</span>
               <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">{activeCar.name}</h2>
               <div className="space-y-3 mb-10">
                  <div className="flex justify-between text-xs border-b pb-2"><span className="text-gray-400">Tipe</span><span className="font-bold">{activeCar.type}</span></div>
                  <div className="flex justify-between text-xs border-b pb-2"><span className="text-gray-400">Mesin</span><span className="font-bold">{activeCar.engine}</span></div>
                  <div className="flex justify-between text-xs border-b pb-2"><span className="text-gray-400">Wilayah</span><span className="font-bold text-blue-600 underline">Yogyakarta</span></div>
               </div>
               <div className="mb-10">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Harga OTR Estimasi</p>
                 <div className="text-3xl font-black text-slate-900 tracking-tighter">{activeCar.priceOTR}</div>
               </div>
               <button 
                onClick={() => handleOrder(activeCar)}
                className="bg-black text-white py-5 font-bold uppercase tracking-[0.3em] text-xs hover:bg-zinc-800 transition-all rounded-full shadow-lg active:scale-95"
               >
                 Lanjutkan Pemesanan
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Katalog;
import React, { useState, useEffect } from 'react';

const Servis = ({ setActivePage }) => {
  // 1. State Management untuk Kalkulator
  const [tipeMobil, setTipeMobil] = useState('sedan');
  const [layananTerpilih, setLayananTerpilih] = useState([]);
  const [totalEstimasi, setTotalEstimasi] = useState(0);

  // 2. Data Master Layanan & Harga
  const pricelist = {
    tipe: {
      sedan: 1.0,
      suv: 1.2,
      mpv: 1.1,
      luxury: 1.8
    },
    layanan: [
      { 
        id: 'sb', 
        nama: 'Servis Berkala', 
        harga: 500000, 
        icon: '🛠️',
        detail: 'Perawatan rutin (oli, filter, rem) setiap 10.000km agar mesin tetap awet.'
      },
      { 
        id: 'gc', 
        nama: 'General Check-up', 
        harga: 250000, 
        icon: '🔍',
        detail: 'Pemeriksaan menyeluruh pada 21 titik utama kendaraan termasuk aki dan mesin.'
      },
      { 
        id: 'sp', 
        nama: 'Spooring & Balancing', 
        harga: 350000, 
        icon: '🛞',
        detail: 'Penyelarasan sudut roda agar setir stabil dan ban tidak cepat aus.'
      },
      { 
        id: 'et', 
        nama: 'Emergency Towing', 
        harga: 400000, 
        icon: '🚛',
        detail: 'Layanan jemput mobil mogok ke bengkel terdekat (Radius 15km).'
      },
      { 
        id: 'bd', 
        nama: 'Body Detailing', 
        harga: 850000, 
        icon: '✨',
        detail: 'Pembersihan interior & eksterior mendalam untuk mengembalikan kilau mobil.'
      }
    ]
  };

  // 3. Logika Penghitungan Otomatis
  useEffect(() => {
    const subtotal = layananTerpilih.reduce((acc, curr) => acc + curr.harga, 0);
    const multiplier = pricelist.tipe[tipeMobil];
    setTotalEstimasi(subtotal * multiplier);
  }, [tipeMobil, layananTerpilih]);

  const toggleLayanan = (item) => {
    if (layananTerpilih.find(l => l.id === item.id)) {
      setLayananTerpilih(layananTerpilih.filter(l => l.id !== item.id));
    } else {
      setLayananTerpilih([...layananTerpilih, item]);
    }
  };

  return (
    <section className="py-20 bg-white min-h-screen font-sans">
      <div className="container mx-auto px-4">
        
        {/* SECTION 1: KATALOG EDUKASI (5 KOLOM) */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Layanan Servis Garasi Hiling</h2>
          <p className="text-gray-500">Solusi lengkap untuk perawatan dan bantuan darurat kendaraan Anda</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {pricelist.layanan.map((info) => (
            <div key={info.id} className={`bg-white p-5 rounded-2xl shadow-sm border-t-4 transition-transform hover:-translate-y-1 ${info.id === 'et' ? 'border-red-600' : 'border-gray-800'}`}>
              <span className="text-3xl mb-3 block">{info.icon}</span>
              <h4 className="font-bold text-gray-800 text-sm mb-2">{info.nama}</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed">{info.detail}</p>
            </div>
          ))}
        </div>

        {/* SECTION 2: ESTIMATOR BIAYA */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          
          {/* KOLOM KIRI: INPUT USER */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">1. Pilih Tipe Kendaraan</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(pricelist.tipe).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipeMobil(t)}
                    className={`py-3 rounded-xl border-2 transition-all font-bold uppercase text-xs ${
                      tipeMobil === t ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4">2. Pilih Jenis Layanan (Bisa Lebih dari Satu)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {pricelist.layanan.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleLayanan(item)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                      layananTerpilih.find(l => l.id === item.id) ? 'border-red-600 bg-red-50 shadow-inner' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{item.nama}</p>
                        <p className="text-[10px] text-gray-400 font-mono">Rp {item.harga.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      layananTerpilih.find(l => l.id === item.id) ? 'bg-red-600 border-red-600 text-white' : 'border-gray-200'
                    }`}>
                      {layananTerpilih.find(l => l.id === item.id) && ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: RINGKASAN BIAYA */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-24 border border-gray-800">
              <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4 tracking-tighter">ESTIMASI BIAYA</h3>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500">
                  <span>Tipe</span>
                  <span className="text-red-500 font-bold">{tipeMobil}</span>
                </div>
                <div className="space-y-2">
                  {layananTerpilih.length === 0 && <p className="text-xs italic text-gray-600 py-2">Silakan pilih layanan...</p>}
                  {layananTerpilih.map(l => (
                    <div key={l.id} className="flex justify-between text-xs bg-gray-800/50 p-3 rounded-xl border border-gray-800">
                      <span>{l.nama}</span>
                      <span className="font-bold">Rp {(l.harga * pricelist.tipe[tipeMobil]).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mb-8 border-t border-gray-800">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Bayar (Est):</p>
                <p className="text-4xl font-black text-white">
                  Rp {totalEstimasi.toLocaleString()}
                </p>
              </div>

              <button 
                onClick={() => window.open('https://wa.me/628123456789', '_blank')}
                disabled={layananTerpilih.length === 0}
                className={`w-full py-4 rounded-2xl font-black transition-all text-sm uppercase tracking-widest ${
                  layananTerpilih.length > 0 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20' 
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                Booking Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: BANNER DARURAT */}
        <div className="bg-gradient-to-r from-red-600 to-red-900 rounded-[3rem] p-10 text-white shadow-2xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
          <div className="z-10 text-center md:text-left">
            <h2 className="text-3xl font-black mb-2 italic tracking-tighter">Emergency Pick-up 24/7</h2>
            <p className="text-red-100 max-w-md">Mobil mogok? Tim towing kami siap meluncur ke lokasi Anda sekarang juga.</p>
          </div>
          <button 
            onClick={() => window.open('https://wa.me/628123456789', '_blank')}
            className="mt-8 md:mt-0 z-10 bg-white text-red-600 px-12 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl"
          >
            PANGGIL DEREK
          </button>
          {/* Dekorasi Bulatan */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-black opacity-10 rounded-full"></div>
        </div>

      </div>
    </section>
  );
};

export default Servis;
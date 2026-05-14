import React from 'react';

const Promo = ({ onTakePromo, setActivePage }) => {
  const promoList = [
    {
      id: 1,
      title: "MEI GELEDEK: BUNGA 0%",
      desc: "Khusus pemesanan unit Toyota Alphard & Vellfire HEV selama bulan Mei.",
      validUntil: "31 Mei 2026",
      highlight: "Cicilan Ringan",
      bgImage: "https://www.toyota.com.sg/-/media/c79a885783e548fea7118a8183cc695a.jpg",
      tag: "Limited Offer"
    },
    {
      id: 2,
      title: "GAZOO RACING PACKAGE",
      desc: "Gratis upgrade aksesoris GR Sport senilai 25 Juta untuk pembelian Raize & Fortuner.",
      validUntil: "15 Juni 2026",
      highlight: "Free Accessories",
      bgImage: "https://down-id.img.susercontent.com/file/sg-11134201-22100-g6wz1h6m63ivb3",
      tag: "GR Special"
    },
    {
      id: 3,
      title: "TRADE-IN SUPRA G90",
      desc: "Tukar mobil lama Anda merk apapun dan dapatkan tambahan subsidi 50 Juta untuk unit Supra.",
      validUntil: "30 Mei 2026",
      highlight: "Subsidi 50JT",
      bgImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000",
      tag: "Trade-In"
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* --- HERO PROMO --- */}
      <div className="relative h-[400px] flex items-center justify-center bg-black overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Promo Banner" 
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            Special <span className="text-red-600">Offers</span>
          </h1>
          <p className="text-gray-300 mt-4 tracking-[0.3em] font-bold uppercase text-xs">
            Wujudkan Mobil Impian Dengan Penawaran Terbaik
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* --- PROMO GRID --- */}
        <div className="grid grid-cols-1 gap-12">
          {promoList.map((promo) => (
            <div key={promo.id} className="flex flex-col lg:flex-row bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group transition-all hover:shadow-2xl">
              
              {/* Image Section */}
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

              {/* Content Section */}
              <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-[2px] w-12 bg-red-600"></span>
                  <span className="text-xs font-black uppercase tracking-widest text-red-600">{promo.highlight}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black italic uppercase leading-tight mb-6">
                  {promo.title}
                </h2>
                
                <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                  {promo.desc}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-6 border-t border-slate-200 pt-8">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Berlaku Hingga</p>
                    <p className="text-sm font-black text-slate-800">{promo.validUntil}</p>
                  </div>
                  
                  {/* Tombol Ambil Promo mengirim data judul promo ke App.jsx */}
                  <button 
                    onClick={() => onTakePromo(promo.title)}
                    className="bg-black text-white px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
                  >
                    Ambil Promo
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- BAGIAN HUBUNGI MARKETING (PENUTUP) --- */}
        <div className="mt-20 p-12 bg-zinc-900 rounded-[40px] text-center text-white relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase italic mb-4">Butuh Penawaran Khusus?</h3>
                <p className="text-zinc-400 text-sm mb-8 max-w-lg mx-auto">Konsultasikan kebutuhan armada perusahaan atau kendaraan pribadi Anda dengan tim konsultan kami.</p>
                
                {/* Tombol Hubungi Marketing lari ke halaman Contact */}
                <button 
                  onClick={() => onTakePromo("KONSULTASI UMUM")}
                  className="border-2 border-white/20 hover:border-red-600 hover:bg-red-600 px-12 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl"
                >
                    Hubungi Marketing
                </button>
            </div>
            {/* Dekorasi Background Bulatan */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Promo;
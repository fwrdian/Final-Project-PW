import React from 'react';

const Tentang = () => {
  const stats = [
    { label: 'Tahun Berdiri', value: '2026' },
    { label: 'Unit Terjual', value: '10K+' },
    { label: 'Kepuasan Pelanggan', value: '99%' },
    { label: 'Tenaga Ahli', value: '150+' },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[500px] flex items-center justify-center bg-black overflow-hidden mb-24">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Office Building" 
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-red-600 text-xs font-black uppercase tracking-[0.4em] mb-4">The Legacy</p>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            Driven by <span className="text-red-600">Passion</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* --- CERITA KAMI --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <div className="border-l-8 border-red-600 pl-6">
              <h2 className="text-4xl font-black italic uppercase text-slate-900 leading-tight">
                Membangun Standar Baru <br /> Di Yogyakarta
              </h2>
            </div>
            <p className="text-gray-500 leading-loose text-sm md:text-base">
              Berawal dari sebuah showroom kecil di Sleman, **GarasiHiling** tumbuh menjadi dealer resmi Toyota paling progresif di Yogyakarta. Kami percaya bahwa membeli mobil bukan sekadar transaksi, melainkan awal dari sebuah perjalanan panjang.
            </p>
            <p className="text-gray-500 leading-loose text-sm md:text-base">
              Dibawah naungan Hiling Semata Group, kami berkomitmen menghadirkan unit-unit eksklusif mulai dari kategori Sport hingga Hybrid masa depan, didukung oleh fasilitas servis kelas dunia.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000" 
              className="rounded-[40px] shadow-2xl relative z-10" 
              alt="Luxury Car" 
            />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* --- STATS COUNTER --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-y border-gray-100 mb-32">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-black italic text-red-600 mb-2">{stat.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- VISI MISI --- */}
        <div className="bg-[#1a1a1a] rounded-[50px] p-12 md:p-20 text-white grid grid-cols-1 md:grid-cols-2 gap-16 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-red-600 font-black uppercase text-xs tracking-widest mb-4">Visi Kami</h4>
            <p className="text-2xl font-bold italic leading-relaxed">
              "Menjadi destinasi otomotif utama di Indonesia yang mengedepankan inovasi teknologi dan pelayanan personal."
            </p>
          </div>
          <div className="relative z-10">
            <h4 className="text-red-600 font-black uppercase text-xs tracking-widest mb-4">Misi Kami</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex gap-4">
                <span className="text-red-600 font-bold">01.</span>
                Menyediakan lini kendaraan Toyota terbaru dengan proses transparan.
              </li>
              <li className="flex gap-4">
                <span className="text-red-600 font-bold">02.</span>
                Memberikan layanan purna jual yang cepat, tepat, dan profesional.
              </li>
              <li className="flex gap-4">
                <span className="text-red-600 font-bold">03.</span>
                Membangun komunitas otomotif yang solid melalui event eksklusif.
              </li>
            </ul>
          </div>
          {/* Dekorasi Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Tentang;
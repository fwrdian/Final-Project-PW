import React from 'react';

const Tentang = () => {
  const stats = [
    { label: 'Tahun Berdiri', value: '2026' },
    { label: 'Unit Terjual', value: '10K+' },
    { label: 'Kepuasan', value: '99%' },
    { label: 'Tenaga Ahli', value: '150+' },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 animate-in slide-in-from-bottom-6 duration-1000">
      <div className="relative h-[500px] flex items-center justify-center bg-black overflow-hidden mb-24">
        <div className="absolute inset-0 opacity-50">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-red-600 text-xs font-black uppercase tracking-[0.4em] mb-4">The Legacy</p>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white">Driven by <span className="text-red-600">Passion</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <h2 className="text-4xl font-black italic uppercase text-slate-900 border-l-8 border-red-600 pl-6">Membangun Standar Baru <br /> Di Yogyakarta</h2>
            <p className="text-gray-500 leading-loose">Dealer resmi Toyota paling progresif di Yogyakarta. Kami percaya membeli mobil adalah awal dari sebuah perjalanan panjang.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000" className="rounded-[40px] shadow-2xl" alt="" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-y border-gray-100 mb-32">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl md:text-5xl font-black italic text-red-600 mb-2">{s.value}</p>
              <p className="text-[10px] font-black uppercase text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tentang;
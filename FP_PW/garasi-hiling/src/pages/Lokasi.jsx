import React from 'react';

const Lokasi = () => {
  return (
    <div className="py-20 animate-in zoom-in duration-700 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">Kunjungi Kami</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">Lokasi & <span className="text-red-600">Showroom</span></h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Temukan dealer resmi Garasi Hiling terdekat. Kami siap melayani Anda dengan fasilitas terbaik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[450px] border">
          <iframe title="Map" src="https://maps.google.com/maps?q=-7.75995,110.406939&z=16&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </div>
        <div className="bg-zinc-900 text-white rounded-3xl p-12 flex flex-col justify-center">
          <h3 className="text-3xl font-black italic uppercase mb-6">Garasi<span className="text-red-600">H</span>iling Jogja</h3>
          <p className="text-gray-400 text-sm mb-8 leading-loose">Jl. Ring Road Utara, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</p>
          <div className="space-y-4 border-t border-white/10 pt-8">
            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs font-bold">Senin - Jumat</span><span className="font-bold">08:00 - 17:00</span></div>
            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs font-bold">Sabtu</span><span className="font-bold">08:00 - 15:00</span></div>
            <div className="flex justify-between"><span className="text-red-600 uppercase text-xs font-bold">Minggu</span><span className="font-bold text-red-600">Tutup</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lokasi;
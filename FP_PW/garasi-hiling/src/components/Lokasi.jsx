import React from 'react';

const Lokasi = () => {
  return (
    <div className="py-20 animate-in zoom-in duration-700 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">Kunjungi Kami</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">Lokasi & <span className="text-red-600">Showroom</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[450px] border">
          <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2811417078335!2d110.406939!3d-7.75995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bd1aa1%3A0xf99a647bc5729728!2sUniversitas%20Amikom%20Yogyakarta!5e0!3m2!1sid!2sid!4v1700000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
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
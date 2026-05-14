import React from 'react';

const Lokasi = () => {
  const facilities = [
    { title: 'Showroom Premium', desc: 'Display unit terlengkap se-Yogyakarta dengan interior yang nyaman' },
    { title: 'Bengkel Resmi', desc: 'Peralatan modern dan teknisi bersertifikat Toyota' },
    { title: 'Lounge VIP', desc: 'Ruang tunggu eksklusif dengan WiFi & refreshment gratis' },
    { title: 'Parkir Luas', desc: 'Area parkir gratis untuk lebih dari 100 kendaraan' },
  ];

  const hours = [
    { day: 'Senin - Jumat', time: '08:00 - 17:00' },
    { day: 'Sabtu', time: '08:00 - 15:00' },
    { day: 'Minggu & Hari Libur', time: 'Tutup' },
  ];

  return (
    <div className="py-10">
      {/* Page Header */}
      <div className="text-center mb-16">
        <p className="text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">Kunjungi Kami</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">
          Lokasi & <span className="text-red-600">Showroom</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Temukan dealer resmi Garasi Hiling di Yogyakarta. Kami siap melayani Anda dengan fasilitas terbaik.
        </p>
      </div>

      {/* Map + Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Google Maps Embed */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[400px]">
          <iframe
            title="Lokasi Garasi Hiling"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0965!2d110.3945!3d-7.7520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDUnMDcuMiJTIDExMMKwMjMnNDAuMiJF!5e0!3m2!1sid!2sid!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info Card */}
        <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight mb-1">
              Garasi<span className="text-red-600">H</span>iling
            </h3>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 mb-6">Dealer Resmi Yogyakarta</p>

            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-sm mt-0.5">Alamat:</span>
                <p>Jl. Ring Road Utara, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-sm mt-0.5">Telp:</span>
                <p>+62 87756563631</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-sm mt-0.5">Email:</span>
                <p>perdiansyah6797@students.amikom.ac.id</p>
              </div>
            </div>
          </div>

          {/* Jam Operasional */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-red-600">Jam Operasional</h4>
            <div className="space-y-2">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span className="text-gray-400">{h.day}</span>
                  <span className={`font-bold ${h.time === 'Tutup' ? 'text-red-500' : 'text-white'}`}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">Fasilitas <span className="text-red-600">Showroom</span></h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-xl p-6"
            >
              <h4 className="font-bold text-sm uppercase tracking-wider mb-2">{f.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lokasi;

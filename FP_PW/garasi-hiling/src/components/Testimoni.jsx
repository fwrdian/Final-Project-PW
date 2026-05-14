import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Pengusaha',
    avatar: 'BS',
    car: 'Toyota Supra G90',
    rating: 5,
    text: 'Pelayanan luar biasa dari tim Garasi Hiling! Proses pembelian sangat cepat dan transparan. Mobil impian saya akhirnya terwujud berkat bantuan sales yang sangat profesional.',
    date: 'Maret 2026',
    color: 'bg-red-600',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    role: 'Dokter',
    avatar: 'SN',
    car: 'Toyota Crown Hybrid',
    rating: 5,
    text: 'Sangat puas dengan kualitas mobil dan layanan purna jualnya. Bengkel resmi di sini punya peralatan lengkap. Recommended banget untuk keluarga!',
    date: 'Februari 2026',
    color: 'bg-blue-600',
  },
  {
    id: 3,
    name: 'Andi Pratama',
    role: 'Dosen AMIKOM',
    avatar: 'AP',
    car: 'Toyota GR Yaris',
    rating: 4,
    text: 'Showroom-nya keren banget, nyaman dan modern. Test drive-nya juga bisa langsung di track khusus. Pengalaman beli mobil yang sangat menyenangkan.',
    date: 'Januari 2026',
    color: 'bg-emerald-600',
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    role: 'Ibu Rumah Tangga',
    avatar: 'DL',
    car: 'Toyota All New Avanza',
    rating: 5,
    text: 'Avanza baru kami nyaman sekali untuk keluarga. Fitur keselamatan lengkap, konsumsi BBM irit. Terima kasih Garasi Hiling atas pelayanannya!',
    date: 'April 2026',
    color: 'bg-amber-600',
  },
  {
    id: 5,
    name: 'Reza Mahendra',
    role: 'Content Creator',
    avatar: 'RM',
    car: 'Toyota Land Cruiser',
    rating: 5,
    text: 'Land Cruiser ini beast banget buat touring! Tim Garasi Hiling sangat membantu proses kredit dan asuransinya. Top service!',
    date: 'Mei 2026',
    color: 'bg-violet-600',
  },
  {
    id: 6,
    name: 'Fajar Nugroho',
    role: 'PNS',
    avatar: 'FN',
    car: 'Toyota Crown Sedan',
    rating: 4,
    text: 'Prosedur pembelian yang mudah dan tidak ribet. Tim sales sangat sabar menjelaskan semua fitur. Sangat terbantu dengan program tukar tambah mereka.',
    date: 'Maret 2026',
    color: 'bg-pink-600',
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimoni = () => {
  const avgRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <div className="py-10">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">Apa Kata Mereka</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">
          Testimoni <span className="text-red-600">Pelanggan</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Kepuasan pelanggan adalah prioritas utama kami. Simak pengalaman mereka bersama Garasi Hiling.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: 'Total Review', value: `${testimonials.length}+` },
          { label: 'Rating Rata-rata', value: avgRating },
          { label: 'Pelanggan Puas', value: '98%' },
          { label: 'Repeat Customer', value: '45%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1a1a1a] text-white rounded-xl p-6 text-center">
            <div className="text-2xl font-black text-red-500">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col"
          >
            {/* Top: Avatar + Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 ${t.color} rounded-full flex items-center justify-center text-white text-sm font-black`}>
                {t.avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{t.name}</h4>
                <p className="text-[11px] text-gray-400">{t.role}</p>
              </div>
              <StarRating rating={t.rating} />
            </div>

            {/* Car Badge */}
            <div className="mb-3">
              <span className="inline-block bg-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-600 px-3 py-1 rounded-full">
                {t.car}
              </span>
            </div>

            {/* Testimonial Text */}
            <p className="text-sm text-gray-600 leading-relaxed flex-1">"{t.text}"</p>

            {/* Date */}
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-4 pt-4 border-t border-gray-50">
              {t.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimoni;

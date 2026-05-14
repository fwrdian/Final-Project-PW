import { useState, useEffect } from 'react';
import axios from 'axios';

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

const carModels = ['Toyota Supra G90', 'Toyota Crown Hybrid', 'Toyota GR Yaris', 'Toyota All New Avanza', 'Toyota Land Cruiser', 'Toyota Alphard HEV'];
const colors = ['bg-red-600', 'bg-blue-600', 'bg-emerald-600', 'bg-amber-600', 'bg-violet-600', 'bg-pink-600'];

const Testimoni = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Implementasi useEffect untuk memuat data dari API
  useEffect(() => {
    // Ambil data minimal 10 item dari Public API (mengambil 12 agar pas untuk grid)
    axios.get('https://jsonplaceholder.typicode.com/comments?_limit=12')
      .then((res) => {
        const formattedData = res.data.map((item, index) => ({
          id: item.id,
          name: item.email.split('@')[0], // Gunakan bagian depan email sebagai nama
          role: 'Pelanggan GarasiH',
          avatar: item.email.substring(0, 2).toUpperCase(),
          car: carModels[index % carModels.length],
          rating: Math.floor(Math.random() * 2) + 4, // Rating acak antara 4-5
          text: item.body.substring(0, 100) + '...', // Potong text komentar
          date: 'Mei 2026',
          color: colors[index % colors.length],
        }));
        setTestimonials(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data testimoni:", err);
        setLoading(false);
      });
  }, []); // Kosong array dependency memastikan effect ini hanya jalan saat mount pertama kali

  const avgRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1) 
    : "0.0";

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

      {/* Conditional Rendering: Tampilkan loading atau data */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-6 shadow-xl"></div>
          <p className="text-slate-500 font-bold tracking-[0.2em] uppercase text-sm animate-pulse">Memuat Data Testimoni...</p>
        </div>
      ) : (
        <>
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: 'Total Review', value: `${testimonials.length}+` },
              { label: 'Rating Rata-rata', value: avgRating },
              { label: 'Pelanggan Puas', value: '98%' },
              { label: 'Repeat Customer', value: '45%' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1a1a1a] text-white rounded-xl p-6 text-center shadow-lg transition-transform hover:-translate-y-1">
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
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col hover:shadow-xl transition-all duration-300"
              >
                {/* Top: Avatar + Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${t.color} rounded-full flex items-center justify-center text-white text-sm font-black shadow-md`}>
                    {t.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm capitalize">{t.name}</h4>
                    <p className="text-[11px] text-gray-400">{t.role}</p>
                  </div>
                  <StarRating rating={t.rating} />
                </div>

                {/* Car Badge */}
                <div className="mb-3">
                  <span className="inline-block bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-600 px-3 py-1.5 rounded-full border border-slate-100">
                    {t.car}
                  </span>
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-gray-600 leading-relaxed flex-1 italic">"{t.text}"</p>

                {/* Date */}
                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span>{t.date}</span>
                  <span className="text-green-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Terverifikasi
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Testimoni;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ContactUs = () => {
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // LOGIKA ROUTER: Mengambil pesan otomatis jika datang dari halaman Promo
  useEffect(() => {
    if (location.state?.message) {
      setForm(prev => ({ ...prev, message: location.state.message }));
    }
  }, [location.state]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    { title: 'WhatsApp', detail: '+62 87756563631', desc: 'Chat langsung dengan sales' },
    { title: 'Email', detail: 'perdiansyah6797@students.amikom.ac.id', desc: 'Kirim pertanyaan via email' },
    { title: 'Alamat', detail: 'Jl. Ring Road Utara, Sleman, DIY', desc: 'Kunjungi showroom kami' },
  ];

  return (
    <div className="py-10 animate-in fade-in duration-700 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">Hubungi Kami</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">Contact <span className="text-red-600">Us</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {contactInfo.map((c) => (
          <div key={c.title} className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm">
            <h4 className="font-bold text-sm uppercase mb-1">{c.title}</h4>
            <p className="text-sm font-semibold text-gray-800 mb-1">{c.detail}</p>
            <p className="text-xs text-gray-400">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-xl">
          <h3 className="text-xl font-bold mb-6 italic">Kirim <span className="text-red-600">Pesan</span></h3>
          {submitted && <div className="mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">Pesan terkirim! Tim kami akan segera menghubungi Anda.</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Nama Lengkap" className="w-full px-4 py-3 border rounded-lg text-sm focus:border-red-600 outline-none" />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full px-4 py-3 border rounded-lg text-sm focus:border-red-600 outline-none" />
            </div>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="No. Telepon / WA" className="w-full px-4 py-3 border rounded-lg text-sm focus:border-red-600 outline-none" />
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tulis pesan Anda..." className="w-full px-4 py-3 border rounded-lg text-sm focus:border-red-600 outline-none resize-none" />
            <button type="submit" className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-600 transition-all">Kirim Sekarang</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#1a1a1a] text-white rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black italic uppercase mb-4">Kenapa Garasi<span className="text-red-600">H</span>iling?</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3"><span className="text-red-600 font-bold">—</span> Dealer resmi Toyota Yogyakarta</li>
              <li className="flex items-center gap-3"><span className="text-red-600 font-bold">—</span> Harga transparan OTR DIY</li>
              <li className="flex items-center gap-3"><span className="text-red-600 font-bold">—</span> Layanan purna jual terjamin</li>
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-[10px] text-gray-600 uppercase tracking-widest font-bold">© 2026 Garasi Hiling Yogyakarta</div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
import React, { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi submit
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      title: 'WhatsApp',
      detail: '+62 87756563631',
      desc: 'Chat langsung dengan sales kami',
    },
    {
      title: 'Email',
      detail: 'perdiansyah6797@students.amikom.ac.id',
      desc: 'Kirim pertanyaan via email',
    },
    {
      title: 'Alamat',
      detail: 'Jl. Ring Road Utara, Condongcatur, Sleman, DIY',
      desc: 'Kunjungi showroom kami',
    },
  ];

  return (
    <div className="py-10">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">Hubungi Kami</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic">
          Contact <span className="text-red-600">Us</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Punya pertanyaan atau ingin konsultasi? Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {contactInfo.map((c) => (
          <div
            key={c.title}
            className="bg-white border border-gray-100 rounded-xl p-6 text-center"
          >
            <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{c.title}</h4>
            <p className="text-sm font-semibold text-gray-800 mb-1">{c.detail}</p>
            <p className="text-xs text-gray-400">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Form + Side Info */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-8 md:p-10">
          <h3 className="text-xl font-bold mb-6">Kirim <span className="text-red-600">Pesan</span></h3>

          {submitted && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
              Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="email@contoh.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">No. Telepon / WhatsApp</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+62 8xx xxxx xxxx"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Pesan</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-black/10"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* Side Info */}
        <div className="lg:col-span-2 bg-[#1a1a1a] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black italic uppercase tracking-tight mb-1">
              Kenapa Garasi<span className="text-red-600">H</span>iling?
            </h3>
            <div className="w-12 h-1 bg-red-600 rounded-full mb-6"></div>

            <ul className="space-y-5">
              {[
                { text: 'Dealer resmi Toyota terpercaya di Yogyakarta' },
                { text: 'Harga transparan tanpa biaya tersembunyi' },
                { text: 'Garansi resmi dan layanan purna jual terjamin' },
                { text: 'Test drive gratis untuk semua unit' },
                { text: 'Proses kredit mudah dan cepat' },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="text-red-600 font-bold">—</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 italic">
              "Kualitas Mobil, Kenyamanan Keluarga Indonesia."
            </p>
            <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest font-bold">
              © 2026 Garasi Hiling Yogyakarta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

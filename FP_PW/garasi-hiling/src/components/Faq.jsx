import React, { useState } from 'react';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('teknis');
  const [openIndex, setOpenIndex] = useState(null);

  // 1. Data Top FAQ
  const topFaqs = [
    { tanya: "Berapa biaya servis di Garasi Hiling?", jawab: "Biaya sangat transparan! Anda bisa cek langsung di Kalkulator Estimasi pada halaman Servis kami." },
    { tanya: "Apakah bisa booking hari ini untuk hari ini?", jawab: "Tergantung ketersediaan slot. Kami menyarankan booking minimal H-1 via web atau WhatsApp." }
  ];

  // 2. Data FAQ Berdasarkan Kategori
  const faqData = {
    teknis: [
      { tanya: "Apakah suku cadang yang digunakan asli?", jawab: "Kami menjamin 100% keaslian suku cadang (Genuine Parts) demi keamanan kendaraan Anda." },
      { tanya: "Berapa lama waktu pengerjaan servis berkala?", jawab: "Estimasi pengerjaan adalah 60-90 menit untuk servis rutin tanpa kendala berat." },
      { tanya: "Apakah ada pengecekan gratis?", jawab: "Ya, setiap servis berkala sudah termasuk General Check-up 21 titik secara gratis." },
      { tanya: "Apakah teknisi di Garasi Hiling bersertifikat?", jawab: "Seluruh teknisi kami telah melewati sertifikasi standar industri otomotif nasional." },
      { tanya: "Bisa melayani servis untuk mobil listrik (EV)?", jawab: "Saat ini kami melayani pengecekan umum dan kaki-kaki untuk EV, namun untuk sistem baterai masih dalam pengembangan." },
      { tanya: "Apakah saya bisa membawa oli sendiri dari luar?", jawab: "Demi menjaga kualitas garansi mesin, kami menyarankan menggunakan stok oli resmi yang tersedia di bengkel kami." }
    ],
    pembayaran: [
      { tanya: "Metode pembayaran apa saja yang tersedia?", jawab: "Kami menerima Tunai, Debit, Kartu Kredit, dan berbagai QRIS (Gopay, OVO, Dana, ShopeePay)." },
      { tanya: "Apakah harga di kalkulator sudah termasuk pajak?", jawab: "Harga di kalkulator adalah estimasi dasar. Total final akan menyertakan PPN sesuai ketentuan berlaku." },
      { tanya: "Apakah ada sistem cicilan untuk servis besar?", jawab: "Ya, kami menyediakan opsi cicilan 0% hingga 12 bulan menggunakan kartu kredit bank tertentu." },
      { tanya: "Apakah bisa bayar menggunakan asuransi?", jawab: "Kami bekerja sama dengan beberapa provider asuransi terkemuka. Silakan tunjukkan kartu asuransi Anda saat pendaftaran." },
      { tanya: "Bagaimana jika ada biaya tambahan mendadak?", jawab: "Teknisi akan menghubungi Anda untuk meminta persetujuan sebelum melakukan tindakan tambahan di luar estimasi awal." },
      { tanya: "Kapan saya harus melunasi pembayaran servis?", jawab: "Pembayaran dilakukan di kasir setelah pengerjaan selesai dan Anda melakukan test drive singkat." }
    ],
    booking: [
      { tanya: "Bagaimana jika saya telat datang dari jadwal booking?", jawab: "Kami memberikan toleransi waktu 15 menit. Jika lebih, jadwal akan disesuaikan dengan antrean berikutnya." },
      { tanya: "Berapa lama garansi setelah servis selesai?", jawab: "Kami memberikan garansi purna jual selama 30 hari atau 1.000 KM untuk jasa pengerjaan." },
      { tanya: "Dapatkah saya mengganti jadwal (Reschedule)?", jawab: "Bisa, silakan klik link di email konfirmasi atau hubungi WhatsApp kami maksimal 3 jam sebelumnya." },
      { tanya: "Apakah ada biaya pembatalan booking?", jawab: "Tidak ada biaya pembatalan. Namun kami sangat menghargai jika Anda menginfokan pembatalan lebih awal." },
      { tanya: "Bagaimana cara melacak status servis mobil saya?", jawab: "Tim kami akan mengirimkan update berkala melalui WhatsApp selama proses pengerjaan berlangsung." },
      { tanya: "Apakah ada layanan antar-jemput kendaraan?", jawab: "Ya, layanan ini tersedia untuk radius 10km dari bengkel dengan melakukan booking minimal H-2." }
    ]
  };

  const categories = [
    { id: 'teknis', nama: 'Layanan & Teknis', icon: '🔧' },
    { id: 'pembayaran', nama: 'Pembayaran', icon: '💳' },
    { id: 'booking', nama: 'Booking & Garansi', icon: '📅' }
  ];

  const steps = [
    { id: 1, judul: "Buka Menu Servis", teks: "Pilih layanan yang sesuai dengan kebutuhan mobil Anda." },
    { id: 2, judul: "Klik Booking", teks: "Tekan tombol booking pada layanan pilihan Anda." },
    { id: 3, judul: "Lengkapi Data", teks: "Isi identitas, tipe kendaraan, dan pilih jadwal." },
    { id: 4, judul: "Konfirmasi", teks: "Tunggu notifikasi validasi jadwal dari tim kami." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white font-sans animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* 1. HEADER PUSAT BANTUAN */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
            Pusat <span className="text-red-600">Bantuan</span>
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
            Temukan jawaban untuk kebutuhan otomotif Anda di Garasi Hiling
          </p>
        </div>

        {/* 2. TOP FAQ - IMPACT CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          <div className="lg:col-span-4 bg-zinc-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
            <h3 className="text-[10px] font-black opacity-50 uppercase tracking-[0.3em] mb-4">Butuh Respon Cepat?</h3>
            <p className="text-2xl font-black italic tracking-tighter uppercase leading-tight mb-6">Pertanyaan Paling Sering Diajukan</p>
            <div className="space-y-4">
              {topFaqs.map((faq, i) => (
                <div key={i} className="border-l-2 border-red-600 pl-4 py-1">
                  <p className="text-xs font-black uppercase text-red-500 mb-1">{faq.tanya}</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-bold italic">{faq.jawab}</p>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-600/40 transition-all duration-700"></div>
          </div>

          {/* FAQ ACCORDION SYSTEM */}
          <div className="lg:col-span-8">
            {/* Tab Menu */}
            <div className="flex flex-wrap gap-2 mb-8 bg-gray-50 p-2 rounded-full w-fit">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveTab(cat.id); setOpenIndex(null); }}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === cat.id ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {cat.nama}
                </button>
              ))}
            </div>

            {/* List Akordion */}
            <div className="space-y-4">
              {faqData[activeTab].map((item, index) => (
                <div key={index} className="group border-b border-gray-100 pb-4">
                  <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-4 text-left flex justify-between items-center transition-all group-hover:pl-2"
                  >
                    <span className={`font-black text-sm uppercase italic tracking-tight transition-colors ${openIndex === index ? 'text-red-600' : 'text-zinc-800'}`}>
                      {item.tanya}
                    </span>
                    <span className={`text-xl font-light transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-red-600' : 'text-gray-300'}`}>+</span>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose py-2">
                      {item.jawab}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. ALUR BOOKING - MINIMALIST */}
        <div className="mb-24 text-center">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-12">Panduan Booking Online</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.id} className="p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
                <div className="text-4xl font-black text-gray-200 group-hover:text-red-600 transition-colors mb-4 italic">0{step.id}</div>
                <h4 className="text-sm font-black uppercase italic mb-2 tracking-tighter">{step.judul}</h4>
                <p className="text-[10px] text-gray-400 font-bold leading-relaxed">{step.teks}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. KONTAK CS - RED SECTION */}
        <div className="bg-red-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-red-200">
          <div>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 leading-none">Belum Menemukan Jawaban?</h3>
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Tim ahli kami siap melayani konsultasi teknis Anda 24/7</p>
          </div>
          <button className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-zinc-900 hover:text-white transition-all active:scale-95 whitespace-nowrap shadow-xl">
            Hubungi Customer Service
          </button>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
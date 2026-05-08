import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white py-16 px-6 md:px-20 font-sans border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* --- BAGIAN LOGO & ALAMAT --- */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">
              GARASI<span className="text-red-600 underline">H</span>ILING
            </h2>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p className="font-bold text-white uppercase tracking-widest">Dealer Resmi Yogyakarta</p>
              <p>Jl. Ring Road Utara, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</p>
              <div className="pt-2">
                <p className="flex items-center gap-2"><span className="text-red-600 font-bold">WA:</span> +62 87756563631</p>
                <p className="flex items-center gap-2"><span className="text-red-600 font-bold">Email:</span> perdiansyah6797@students.amikom.ac.id</p>
              </div>
            </div>
          </div>

          {/* --- BAGIAN PRODUK --- */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-red-600 pb-2 inline-block">
              Produk Kami
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">GR Supra</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">Land Cruiser</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">Crown Hybrid</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">GR Yaris</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">All New Avanza</a></li>
            </ul>
          </div>

          {/* --- BAGIAN LAYANAN --- */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-red-600 pb-2 inline-block">
              Layanan Purna Jual
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">Booking Service</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">Suku Cadang Asli</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">Kalkulator Kredit</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">Tukar Tambah</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors uppercase">Test Drive</a></li>
            </ul>
          </div>

          {/* --- BAGIAN SOSIAL MEDIA --- */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-red-600 pb-2 inline-block">
              Ikuti Kami
            </h4>
            <div className="flex gap-4">
              {['Instagram', 'Youtube', 'Facebook', 'TikTok'].map((sosmed) => (
                <a 
                  key={sosmed} 
                  href="#" 
                  className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all group"
                  title={sosmed}
                >
                  <div className="text-[10px] font-black uppercase italic">
                    {sosmed.substring(0, 2)}
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-8 text-xs text-gray-500 italic">
              "Kualitas Mobil, Kenyamanan Keluarga Indonesia."
            </p>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            © 2026 TOYOTA GARASI YOGYAKARTA. MEMBER OF HILING SEMATA GROUP.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
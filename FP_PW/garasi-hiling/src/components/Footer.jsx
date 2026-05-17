import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialMedia = [
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/hilingsemata/', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    { 
      name: 'Youtube', 
      url: 'https://youtube.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'TikTok', 
      url: 'https://www.tiktok.com/@xionn_._', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
          <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-[#1a1a1a] text-white py-16 px-6 md:px-20 font-sans border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">
              GARASI<span className="text-red-600 underline">H</span>ILING
            </h2>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p className="font-bold text-white uppercase tracking-widest">Dealer Resmi Yogyakarta</p>
              <p>Jl. Ring Road Utara, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</p>
              <div className="pt-2">
                <p className="flex items-center gap-2 font-medium">
                  <span className="text-red-600 font-bold">WA:</span> +62 87756563631
                </p>
                <p className="flex items-center gap-2 text-xs md:text-sm truncate font-medium">
                  <span className="text-red-600 font-bold">Email:</span> perdiansyah6797@students.amikom.ac.id
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-red-600 pb-2 inline-block">Produk Kami</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-red-600 transition-colors uppercase">GR Supra</Link></li>
              <li><Link to="/" className="hover:text-red-600 transition-colors uppercase">Land Cruiser</Link></li>
              <li><Link to="/" className="hover:text-red-600 transition-colors uppercase">Crown Hybrid</Link></li>
              <li><Link to="/" className="hover:text-red-600 transition-colors uppercase">GR Yaris</Link></li>
              <li><Link to="/" className="hover:text-red-600 transition-colors uppercase">All New Avanza</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-red-600 pb-2 inline-block">Perusahaan</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link to="/tentang" className="hover:text-red-600 transition-colors uppercase text-left">Tentang Kami</Link></li>
              <li><Link to="/lokasi" className="hover:text-red-600 transition-colors uppercase text-left">Lokasi Dealer</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition-colors uppercase text-left">Booking Service</Link></li>
              <li><Link to="/testimoni" className="hover:text-red-600 transition-colors uppercase text-left">Testimoni</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-red-600 pb-2 inline-block">Ikuti Kami</h4>
            <div className="flex gap-4">
              {socialMedia.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/5 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all group"
                >
                  <div className="text-white group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-8 text-xs text-gray-500 italic">"Kualitas Mobil, Kenyamanan Keluarga Indonesia."</p>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center md:text-left">
            © 2026 TOYOTA GARASI YOGYAKARTA. MEMBER OF HILING SEMATA GROUP.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Link to="/faq" className="hover:text-white transition-colors"> FAQ </Link>
            <Link to="/tentang" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link to="/tentang" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
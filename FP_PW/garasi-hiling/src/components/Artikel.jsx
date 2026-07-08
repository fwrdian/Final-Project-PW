import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Artikel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk menyimpan artikel yang sedang dibaca secara full
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/artikel'); 
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data artikel:", err);
        setError("Gagal memuat artikel. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleOpenArticle = (article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. STATE LOADING (Minimalis & Estetis)
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
        <div className="animate-spin w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full mb-3"></div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Memuat Jurnal Otomotif...</p>
      </div>
    );
  }

  // 2. STATE ERROR
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans px-6">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{error}</p>
        </div>
      </div>
    );
  }

  // 3. TAMPILAN DETAIL ARTIKEL (BACA SELENGKAPNYA)
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 font-sans text-zinc-900 animate-in fade-in duration-500">
        <div className="max-w-[720px] mx-auto px-6">
          
          {/* Tombol Kembali */}
          <button 
            onClick={handleCloseArticle}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-400 hover:text-black transition-colors mb-8 group"
          >
            <svg className="w-3 h-3 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Jurnal
          </button>

          {/* Kategori & Tanggal */}
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.15em] text-red-600 mb-3">
            <span>{selectedArticle.category}</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-400">
              {new Date(selectedArticle.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* Judul Utama */}
          <h1 className="text-2xl md:text-4xl font-black uppercase italic tracking-tight leading-tight mb-8 text-black">
            {selectedArticle.title}
          </h1>

          {/* Foto Utama */}
          <div className="w-full aspect-[16/10] md:aspect-[16/9] bg-zinc-50 rounded-2xl overflow-hidden mb-10 border border-zinc-100/80 shadow-md">
            <img 
              src={selectedArticle.img.startsWith('foto/') ? `/${selectedArticle.img}` : selectedArticle.img} 
              alt={selectedArticle.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Isi Konten Lengkap */}
          <div className="text-zinc-800 text-sm md:text-base leading-relaxed text-justify whitespace-pre-line tracking-wide font-medium">
            {selectedArticle.content}
          </div>

          {/* Footer Artikel Minimalis */}
          <div className="border-t border-zinc-100 mt-16 pt-8 flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
            <span>GarasiHiling Journal</span>
            <span>© 2026</span>
          </div>

        </div>
      </div>
    );
  }

  // 4. TAMPILAN UTAMA: GRID LIST ARTIKEL
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12 font-sans animate-in fade-in duration-500">
      
      {/* Jurnal Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl tracking-tighter font-black italic select-none text-black">
          HILING <span className="text-red-600">JOURNAL</span>
        </h1>
        <div className="w-12 h-1 bg-red-600 mx-auto mt-3 mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
          Kumpulan Tips, Review unit, dan Informasi Otomotif Terkini
        </p>
      </div>

      {/* Grid List Artikel */}
      {articles.length === 0 ? (
        <div className="text-center text-xs font-bold text-zinc-400 py-20 uppercase tracking-widest">
          Belum ada jurnal yang diterbitkan.
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="group flex flex-col bg-white border border-gray-100/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 cursor-pointer"
              onClick={() => handleOpenArticle(article)}
            >
              {/* Gambar Cover */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-50 border-b border-gray-50">
                <img 
                  src={article.img.startsWith('foto/') ? `/${article.img}` : article.img} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black text-white text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-md shadow-sm">
                  {article.category}
                </span>
              </div>

              {/* Konten Utama */}
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                
                <h2 className="text-base md:text-lg font-black text-zinc-950 leading-snug group-hover:text-red-600 transition-colors uppercase tracking-tight mb-3 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-zinc-500 text-xs leading-relaxed font-medium mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                
                {/* Aksi Trigger Link */}
                <div className="mt-auto flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-black group-hover:text-red-600 transition-colors">
                  Baca Selengkapnya 
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
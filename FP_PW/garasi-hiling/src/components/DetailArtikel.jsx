import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DetailArtikel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        // Menembak endpoint detail berdasarkan ID yang diklik
        const response = await axios.get(`http://localhost:5000/api/artikel/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal memuat detail artikel:", err);
        setError("Artikel tidak ditemukan atau server bermasalah.");
        setLoading(false);
      }
    };

    fetchArticleDetail();
    // Scroll otomatis ke atas saat halaman dimuat
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
        <div className="animate-spin w-6 h-6 border-2 border-black border-t-transparent rounded-full mb-3"></div>
        <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Memuat Konten...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans px-6 text-center">
        <p className="text-sm font-bold text-red-600 uppercase tracking-wider mb-4">{error}</p>
        <button onClick={() => navigate('/artikel')} className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1">
          Kembali ke Jurnal
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-sans select-none">
      <div className="max-w-[720px] mx-auto px-6">
        
        {/* TOMBOL KEMBALI */}
        <button 
          onClick={() => navigate('/artikel')}
          className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors mb-8 group"
        >
          <svg className="w-3 h-3 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>

        {/* METADATA */}
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
          <span>{article.category}</span>
          <span>•</span>
          <span>{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        {/* JUDUL UTAMA */}
        <h1 className="text-2xl md:text-3xl font-black text-zinc-950 uppercase tracking-tight leading-tight mb-8">
          {article.title}
        </h1>

        {/* HERO IMAGE */}
        <div className="w-full aspect-[16/9] bg-zinc-100 rounded-2xl overflow-hidden mb-10 border border-zinc-100">
          <img 
            src={article.img.startsWith('foto/') ? `/${article.img}` : article.img} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* ISI KONTEN UTAMA */}
        <div className="text-zinc-800 text-sm md:text-base leading-relaxed font-medium space-y-6 whitespace-pre-line text-justify tracking-wide">
          {article.content}
        </div>

        {/* FOOTER MINIMALIS */}
        <div className="border-t border-zinc-100 mt-16 pt-8 flex items-center justify-between text-[11px] text-zinc-400 font-bold uppercase tracking-widest">
          <span>GarasiHiling Journal</span>
          <span>© 2026</span>
        </div>

      </div>
    </div>
  );
}
import React, { useState } from 'react';

const accCategories = [
  { id: 'all', label: 'Semua Aksesoris', icon: '★' },
  { id: 'ban', label: 'Ban', icon: '⬤' },
  { id: 'velg', label: 'Velg / Pelek', icon: '◎' },
  { id: 'kacafilm', label: 'Kaca Film', icon: '▣' },
  { id: 'bodykit', label: 'Body Kit', icon: '◈' },
  { id: 'audio', label: 'Audio & Multimedia', icon: '◉' },
  { id: 'interior', label: 'Interior', icon: '⬡' },
  { id: 'eksterior', label: 'Eksterior', icon: '◆' },
];

const accessories = [
  {
    id: 1, category: 'ban', name: 'Bridgestone Turanza T005A',
    spec: '205/65 R16', brand: 'Bridgestone', price: 1250000,
    badge: 'Best Seller', rating: 4.8, reviews: 234,
    desc: 'Ban touring premium dengan ketahanan superior di jalan basah maupun kering.',
    tag: 'TOURING',
  },
  {
    id: 2, category: 'ban', name: 'Michelin Pilot Sport 4',
    spec: '235/40 R18', brand: 'Michelin', price: 2750000,
    badge: 'Performance', rating: 4.9, reviews: 187,
    desc: 'Ban sport ultra-high performance untuk pengendara yang menuntut presisi.',
    tag: 'SPORT',
  },
  {
    id: 3, category: 'ban', name: 'Yokohama Geolandar A/T G015',
    spec: '265/65 R17', brand: 'Yokohama', price: 2100000,
    badge: 'Off-Road', rating: 4.7, reviews: 145,
    desc: 'Ban all-terrain tangguh untuk SUV dan pickup. Ideal untuk medan mix.',
    tag: 'ALL-TERRAIN',
  },
  {
    id: 4, category: 'velg', name: 'Enkei RPF1 Racing',
    spec: '18x9.5 +38 5x114.3', brand: 'Enkei', price: 4800000,
    badge: 'GR Sport', rating: 4.9, reviews: 92,
    desc: 'Velg racing ringan berbahan MAT Technology untuk performa optimal.',
    tag: 'FORGED',
  },
  {
    id: 5, category: 'velg', name: 'OZ Superturismo Aereo',
    spec: '17x7.5 +45 5x100', brand: 'OZ Racing', price: 5600000,
    badge: 'Premium', rating: 4.8, reviews: 76,
    desc: 'Desain motorsport Italia yang timeless. Pilihan kolektor sejati.',
    tag: 'RACING',
  },
  {
    id: 6, category: 'velg', name: 'Rays TE37 Ultra Large PCD',
    spec: '19x10 +30 6x139.7', brand: 'Rays Volk', price: 12500000,
    badge: 'JDM Iconic', rating: 5.0, reviews: 43,
    desc: 'Legenda otomotif Jepang. Konstruksi forged monoblock 6-spoke klasik.',
    tag: 'FORGED',
  },
  {
    id: 7, category: 'kacafilm', name: '3M Crystalline CR 90',
    spec: 'Windshield - Nano Ceramic', brand: '3M', price: 3800000,
    badge: 'Top Tier', rating: 4.9, reviews: 312,
    desc: 'Penolakan panas 60%, kejernihan 90%, tanpa interferensi sinyal. Film nano-ceramic terbaik.',
    tag: 'NANO CERAMIC',
  },
  {
    id: 8, category: 'kacafilm', name: 'V-Kool VK40 Nano',
    spec: 'Full Body - 5 kaca', brand: 'V-Kool', price: 5200000,
    badge: 'Elite', rating: 4.8, reviews: 198,
    desc: 'Teknologi multi-layer nano metalik. Garansi 10 tahun, penolakan UV 99%.',
    tag: 'NANO METALIC',
  },
  {
    id: 9, category: 'kacafilm', name: 'Llumar CTX 35',
    spec: 'Side & Rear Windows', brand: 'Llumar', price: 1650000,
    badge: 'Value Pick', rating: 4.6, reviews: 423,
    desc: 'Kaca film carbon berpenolakan panas baik tanpa mengganggu sinyal handphone.',
    tag: 'CARBON',
  },
  {
    id: 10, category: 'bodykit', name: 'TRD Aero Package Fortuner',
    spec: 'Front Lip + Side Skirt + Rear', brand: 'TRD', price: 7800000,
    badge: 'Motorsport', rating: 4.8, reviews: 67,
    desc: 'Paket aero body kit genuine TRD untuk Fortuner 2021+. Material PP-AT grade.',
    tag: 'MOTORSPORT',
  },
  {
    id: 11, category: 'audio', name: 'Pioneer DMH-Z5350BT 10"',
    spec: 'Multimedia Receiver 10"', brand: 'Pioneer', price: 3900000,
    badge: 'Popular', rating: 4.7, reviews: 156,
    desc: 'Head unit 10" Android dengan Carplay, warna vivid WVGA, koneksi Bluetooth 5.0.',
    tag: 'ANDROID AUTO',
  },
  {
    id: 12, category: 'interior', name: 'All-New 3D Floor Mat Luxury',
    spec: 'Full Set 5 Karpet TPE', brand: 'GarHiling OEM', price: 650000,
    badge: 'Best Value', rating: 4.6, reviews: 534,
    desc: 'Karpet 3D anti slip berbahan TPE food grade. Anti bau, waterproof, custom fit.',
    tag: 'WATERPROOF',
  },
];

export default function AksesoriGR({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [notification, setNotification] = useState('');

  const filtered = accessories
    .filter(a => selectedCategory === 'all' || a.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });

  const handleAddToCart = (item) => {
    addToCart?.({ ...item, quantity: 1, type: 'aksesoris' });
    setNotification(`${item.name} ditambahkan ke keranjang`);
    setTimeout(() => setNotification(''), 2500);
  };

  const badgeColor = (badge) => {
    if (badge === 'Best Seller' || badge === 'Popular' || badge === 'Best Value') return 'bg-emerald-600 text-white';
    if (badge === 'GR Sport' || badge === 'Motorsport' || badge === 'Performance' || badge === 'JDM Iconic') return 'bg-red-600 text-white';
    if (badge === 'Elite' || badge === 'Premium' || badge === 'Top Tier') return 'bg-zinc-900 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-red-600 opacity-10 mix-blend-multiply"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="150" cy="100" r="120" stroke="white" strokeWidth="1" fill="none"/>
            <circle cx="150" cy="100" r="80" stroke="white" strokeWidth="0.5" fill="none"/>
            <circle cx="150" cy="100" r="40" stroke="white" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 relative">
          <div className="flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-red-500"></span>
            Belanja · GR Division
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white">
            Aksesoris <span className="text-red-500">GR</span>
          </h1>
          <p className="text-zinc-400 mt-3 text-base max-w-2xl">
            Ban, velg, kaca film, body kit, dan lebih banyak lagi. Upgrade kendaraan Anda ke level berikutnya dengan pilihan aksesori premium kami.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {[['Ban', '12 Merek'], ['Velg', '30+ Desain'], ['Kaca Film', 'Nano Ceramic'], ['Body Kit', 'TRD Official']].map(([title, sub]) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                <p className="text-white font-bold text-sm">{title}</p>
                <p className="text-zinc-400 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-lg text-sm font-medium shadow-2xl">
          ✓ {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        {/* Category Pills */}
        <div className="flex gap-2.5 overflow-x-auto pb-3 mb-8">
          {accCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-zinc-950 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{filtered.length} produk</p>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none cursor-pointer"
          >
            <option value="default">Terpopuler</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="rating">Rating Terbaik</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item.id} className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-300 bg-white flex flex-col">
              {/* Image area */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                  {item.category === 'ban' ? '🔵' : item.category === 'velg' ? '⚙️' : item.category === 'kacafilm' ? '🪟' : item.category === 'bodykit' ? '🚗' : item.category === 'audio' ? '🎵' : '✨'}
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${badgeColor(item.badge)}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  {item.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs font-bold text-zinc-800">{item.rating}</span>
                  <span className="text-xs text-gray-400">({item.reviews} ulasan)</span>
                </div>
                <p className="text-[11px] text-red-600 font-bold uppercase tracking-widest mb-1">{item.brand}</p>
                <h3 className="font-black text-zinc-900 text-base leading-snug">{item.name}</h3>
                <p className="text-[11px] text-gray-500 mt-1 font-mono">{item.spec}</p>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed flex-1">{item.desc}</p>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-black text-zinc-900">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[10px] text-gray-400">termasuk PPN</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-shrink-0 px-5 py-2.5 bg-zinc-950 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors duration-200"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-bold">Tidak ada produk di kategori ini</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imgCircuitCap    from '../assets/id-11134207-7rash-m0y3pcts5dbz61.jpeg';
import imgSnapback      from '../assets/TRD.jpg';
import imgPiquePolo     from '../assets/piquepolo.jpeg';
import imgRacingShirt   from '../assets/24racingpolo.jpeg';
import imgBomberJacket  from '../assets/bomboerjacket.jpg';
import imgHeritageHoodie from '../assets/heritagehoodie.jpeg';
import imgKeychain      from '../assets/keychain.jpeg';
import imgEnamelPin     from '../assets/gazoo.jpeg';
import imgCardHolder    from '../assets/cardholder.jpeg';
import imgWrcLtdSet     from '../assets/wrc.jpeg';
import imgCollabCap     from '../assets/id-11134207-7rash-m0y3pcts5dbz61.jpeg';

const merchCategories = [
  { id: 'all', label: 'All Collection' },
  { id: 'headwear', label: 'Headwear' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'limited', label: '★ Limited Edition' },
];

const merchandise = [
  {
    id: 1, category: 'headwear', name: 'GR CIRCUIT CAP',
    subtitle: 'Structured Racing Cap',
    price: 380000, originalPrice: null,
    material: '100% Brushed Cotton Twill',
    sizes: ['S/M', 'M/L', 'L/XL'],
    colors: ['#1a1a1a', '#C8102E', '#FAFAFA'],
    badge: 'NEW ARRIVAL',
    limited: false,
    desc: 'Topi racing berstruktur dengan bordir GR logo presisi tinggi. Bahan premium cotton twill 6-panel. Adjuster strap brushed metal.',
    image: imgCircuitCap,
  },
  {
    id: 2, category: 'headwear', name: 'GAZOO RACING SNAPBACK',
    subtitle: 'Heritage Flat Brim Cap',
    price: 450000, originalPrice: 520000,
    material: 'Wool Blend + Leather Strapback',
    sizes: ['One Size'],
    colors: ['#1a1a1a', '#2D5A1B'],
    badge: null,
    limited: false,
    desc: 'Snapback heritage dengan desain retro motorsport. Wol premium blend dengan detail leather strapback.',
    image: imgSnapback,
  },
  {
    id: 3, category: 'apparel', name: 'GR PIQUE POLO SHIRT',
    subtitle: 'Technical Performance Polo',
    price: 750000, originalPrice: null,
    material: 'Japanese Piqué Fabric · DRY+ Technology',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FAFAFA', '#1a1a1a', '#C8102E'],
    badge: 'BESTSELLER',
    limited: false,
    desc: 'Polo shirt teknikal berbahan piqué Jepang dengan teknologi DRY+ moisture-wicking. Bordir chest logo GR. Cocok untuk acara premium maupun sehari-hari.',
    image: imgPiquePolo,
  },
  {
    id: 4, category: 'apparel', name: 'CIRCUIT 24 RACING SHIRT',
    subtitle: 'Full-Sublimation Team Jersey',
    price: 680000, originalPrice: null,
    material: 'Microfiber 140gsm · Full Sublimation',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#C8102E', '#1a1a1a'],
    badge: 'NEW ARRIVAL',
    limited: false,
    desc: 'Jersey racing full-sublimation dengan desain terinspirasi livery GR Corolla WRC 2024. Material microfiber ringan breathable.',
    image: imgRacingShirt,
  },
  {
    id: 5, category: 'apparel', name: 'GR TEAM BOMBER JACKET',
    subtitle: 'Premium Satin Varsity',
    price: 1850000, originalPrice: null,
    material: '100% Satin Polyester Shell · Ribbed Trim',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#1a1a1a'],
    badge: 'PREMIUM',
    limited: false,
    desc: 'Jaket bomber satin premium bergaya varsity dengan patch embroidery detail. Desain eksklusif koleksi Team GR Indonesia.',
    image: imgBomberJacket,
  },
  {
    id: 6, category: 'apparel', name: 'GR HERITAGE HOODIE',
    subtitle: 'Heavyweight Fleece Pullover',
    price: 890000, originalPrice: null,
    material: '420gsm Brushed Fleece · Kangaroo Pocket',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#2c2c2c', '#8B0000'],
    badge: null,
    limited: false,
    desc: 'Hoodie heavyweight fleece 420gsm dengan fit oversized. Print grafis "GR HERITAGE 1957" di bagian belakang.',
    image: imgHeritageHoodie,
  },
  {
    id: 7, category: 'accessories', name: 'GR DIECAST KEYCHAIN PREMIUM',
    subtitle: 'Zinc Alloy · Mirror Chrome',
    price: 225000, originalPrice: null,
    material: 'Die-cast Zinc Alloy · Heavy Chrome',
    sizes: ['—'],
    colors: ['#C0C0C0', '#FFD700'],
    badge: null,
    limited: false,
    desc: 'Gantungan kunci diecast presisi berat 48g. Detail mirror chrome 3D silhouette GR Supra. Dengan rantai stainless steel 30cm.',
    image: imgKeychain,
  },
  {
    id: 8, category: 'accessories', name: 'GR ENAMEL PIN BADGE SET',
    subtitle: 'Hard Enamel · Gold Plated',
    price: 175000, originalPrice: null,
    material: 'Hard Enamel · 18K Gold Plating',
    sizes: ['—'],
    colors: ['#FFD700'],
    badge: 'COLLECTIBLE',
    limited: false,
    desc: 'Set 3 pin enamel keras berlapis emas 18K. Koleksi logo GR, Gazoo Racing Racing Crest, dan Nürburgring Edition. Cocok untuk jaket atau tas.',
    image: imgEnamelPin,
  },
  {
    id: 9, category: 'accessories', name: 'GR CARBON FIBER CARD HOLDER',
    subtitle: 'Real Carbon Fiber · Minimal Wallet',
    price: 475000, originalPrice: null,
    material: '3K Twill Carbon Fiber · Aviation Grade',
    sizes: ['—'],
    colors: ['#1a1a1a'],
    badge: 'ELITE',
    limited: false,
    desc: 'Card holder tipis dari carbon fiber 3K twill asli. Kapasitas 6 kartu + slot hidden. Berat hanya 12 gram. Setipis kartu kredit.',
    image: imgCardHolder,
  },
  {
    id: 10, category: 'limited', name: 'GR YARIS WRC LTD EDITION SET',
    subtitle: 'Collectors Premium Box · #001/100',
    price: 4500000, originalPrice: null,
    material: 'Premium Gift Box · Full Merch Set',
    sizes: ['One Size'],
    colors: ['#C8102E', '#FAFAFA'],
    badge: 'LIMITED 100 PCS',
    limited: true,
    desc: 'Paket kolektor eksklusif berisi: Jersey racing fullprint, Cap GR, Keychain diecast, Pin enamel set, dan Poster signed. Nomor seri 001-100.',
    image: imgWrcLtdSet,
  },
  {
    id: 11, category: 'limited', name: 'GARASI HILING × GR COLLAB CAP',
    subtitle: 'Collaborative Edition · Embossed Leather',
    price: 890000, originalPrice: null,
    material: 'Leather Crown · Embossed Logo · Strapback',
    sizes: ['One Size'],
    colors: ['#1a1a1a', '#8B6914'],
    badge: 'COLLAB',
    limited: true,
    desc: 'Kolaborasi eksklusif Garasi Hiling × Gazoo Racing. Topi dengan panel kulit asli, logo timbul emas, dan label hologram otentisitas.',
    image: imgCollabCap,
  },
];

const API_BASE = '/api/merchandise';

const fetchMerchandiseById = (id) => axios.get(`${API_BASE}/${id}`);

const postAddToCartApi = (item) =>
  axios.post(`${API_BASE}/${item.id}/add-to-cart`, { quantity: item.quantity ?? 1 });

export default function Merchandise({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const [liveStock, setLiveStock] = useState({});
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const fetchAllStock = async () => {
      setApiLoading(true);
      try {
        const results = await Promise.allSettled(ids.map(fetchMerchandiseById));

        const stockMap = {};
        results.forEach((res, idx) => {
          const id = ids[idx];
          if (res.status === 'fulfilled') {
            stockMap[id] = res.value?.data?.stock ?? null;
          } else {
            stockMap[id] = null;
          }
        });
        setLiveStock(stockMap);
      } catch (err) {
        setApiError('Gagal memuat data stok terbaru dari server.');
        console.error('Gagal fetch stok merchandise:', err);
      } finally {
        setApiLoading(false);
      }
    };

    fetchAllStock();
  }, []);

  const filtered = merchandise.filter(m =>
    selectedCategory === 'all' ||
    (selectedCategory === 'limited' ? m.limited : m.category === selectedCategory)
  );

  const handleAddToCart = async (item) => {
    try {
      await postAddToCartApi(item);
    } catch (err) {
      console.warn('API add-to-cart belum tersedia, melanjutkan secara lokal:', err.message);
    }
    addToCart?.({ ...item, quantity: 1, type: 'merchandise' });
    setNotification(`${item.name} ditambahkan ke keranjang`);
    setTimeout(() => setNotification(''), 2500);
    setSelectedProduct(null);
  };

  const badgeStyle = (badge) => {
    if (!badge) return null;
    if (badge.includes('LIMITED')) return 'bg-red-600 text-white';
    if (badge === 'BESTSELLER') return 'bg-emerald-600 text-white';
    if (badge === 'PREMIUM' || badge === 'ELITE') return 'bg-zinc-900 text-white';
    if (badge === 'COLLAB' || badge === 'COLLECTIBLE') return 'bg-amber-500 text-white';
    return 'bg-gray-900 text-white';
  };

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-lg text-sm font-medium shadow-2xl border border-zinc-700 animate-in slide-in-from-right">
          ✓ {notification}
        </div>
      )}

      {/* Modal Detail */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-zinc-900 rounded-2xl max-w-lg w-full border border-zinc-800 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  {selectedProduct.badge && (
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${badgeStyle(selectedProduct.badge)}`}>
                      {selectedProduct.badge}
                    </span>
                  )}
                  <h2 className="text-2xl font-black text-white mt-3 uppercase tracking-tight">{selectedProduct.name}</h2>
                  <p className="text-zinc-400 text-sm mt-1">{selectedProduct.subtitle}</p>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-zinc-500 hover:text-white transition-colors text-xl">✕</button>
              </div>

              <div className="bg-zinc-800 rounded-xl aspect-video overflow-hidden mb-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{selectedProduct.desc}</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 uppercase tracking-wider text-xs">Material</span>
                  <span className="text-zinc-300 text-right text-xs">{selectedProduct.material}</span>
                </div>
                {selectedProduct.sizes[0] !== '—' && (
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-zinc-500 uppercase tracking-wider text-xs">Ukuran</span>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map(s => (
                        <span key={s} className="border border-zinc-700 text-zinc-300 text-xs px-2 py-1 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div>
                  <p className="text-2xl font-black text-white">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                  {selectedProduct.originalPrice && (
                    <p className="text-zinc-500 text-sm line-through">Rp {selectedProduct.originalPrice.toLocaleString('id-ID')}</p>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="px-7 py-3 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-colors"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status sinkronisasi stok dari API (10 endpoint /api/merchandise/1..10) */}
      {apiLoading && (
        <div className="bg-zinc-900 text-zinc-400 text-center text-[11px] py-2 tracking-widest uppercase">
          Menyinkronkan stok terbaru...
        </div>
      )}
      {apiError && (
        <div className="bg-red-950 text-red-300 text-center text-[11px] py-2 tracking-widest uppercase">
          {apiError}
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-[0.4em] mb-6">
            <span className="w-8 h-px bg-red-500"></span>
            Exclusive Collection
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight uppercase text-white leading-none">
            GARASI<br />
            <span className="text-red-600">MERCH</span>
          </h1>
          <p className="text-zinc-400 mt-6 text-lg max-w-lg leading-relaxed">
            Koleksi eksklusif Garasi Hiling × Gazoo Racing. Dibuat terbatas. Dirancang untuk para penggemar otomotif sejati.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10">
          {merchCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest flex-shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white'
                  : 'border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Large Row (first 2 items) + regular grid */}
        {selectedCategory === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {filtered.slice(0, 2).map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedProduct(item)}
                className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-zinc-600 transition-all"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {item.badge && (
                    <div className="absolute top-4 left-4">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${badgeStyle(item.badge)}`}>
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-1">{item.subtitle}</p>
                  <h3 className="text-white font-black text-lg uppercase">{item.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-white font-black text-xl">Rp {item.price.toLocaleString('id-ID')}</p>
                    <span className="text-zinc-500 text-xs uppercase tracking-wider group-hover:text-red-400 transition-colors">Lihat Detail →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(selectedCategory === 'all' ? filtered.slice(2) : filtered).map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-zinc-600 transition-all duration-200 flex flex-col"
            >
              <div className="aspect-square bg-zinc-800 relative overflow-hidden">
                {item.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${badgeStyle(item.badge)}`}>
                      {item.badge}
                    </span>
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                {liveStock[item.id] !== undefined && liveStock[item.id] !== null && (
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-bold px-2 py-1 rounded-full">
                    Stok API: {liveStock[item.id]}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <p className="text-red-500 text-[9px] font-black uppercase tracking-widest">{item.subtitle}</p>
                <h3 className="text-white font-black text-sm uppercase mt-1 leading-tight">{item.name}</h3>
                <p className="text-zinc-500 text-[11px] mt-2 leading-relaxed flex-1 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800">
                  <div>
                    <p className="text-white font-black">Rp {item.price.toLocaleString('id-ID')}</p>
                    {item.originalPrice && (
                      <p className="text-zinc-600 text-xs line-through">Rp {item.originalPrice.toLocaleString('id-ID')}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                    className="text-[10px] font-black uppercase tracking-wider text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                  >
                    + Beli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

// ── Suku Cadang Imports ────────────────────────────────────────────────────
import imgAki             from '../assets/AkiGS.jpg';
import imgAlternator      from '../assets/AlternatorAssy.jpeg';
import imgBallJoint       from '../assets/BallJointDepan.jpeg';
import imgBusi            from '../assets/BusiIridium.jpeg';
import imgFilterAC        from '../assets/FilterACCabin.jpeg';
import imgFilterOli       from '../assets/filteroli.jpeg';
import imgGasketSet       from '../assets/GasketSet.jpeg';
import imgKampasRem       from '../assets/KampasRemDepan.jpeg';
import imgKanvasKopling   from '../assets/KanvasKoplingAssy.jpg';
import imgKnalpot         from '../assets/KnalpotGasket.jpeg';
import imgMasterRem       from '../assets/MasterRem.jpg';
import imgMinyakTransmisi from '../assets/MinyakTransmisi.jpg';
import imgOliCastrol      from '../assets/olimesin.jpeg';
import imgShockAbsorber   from '../assets/ShockAbsorber.jpeg';
import imgTimingChain     from '../assets/TimingChainKit.jpg';
import imgWaterpump       from '../assets/waterpump.jpg';

// ── Aksesori & Upgrade Imports ─────────────────────────────────────────────
import imgBridgestone     from '../assets/BRIDGESTONEBridgestoneTuranza.jpg';
import imgMichelin        from '../assets/Michelin.jpeg';
import imgYokohama        from '../assets/Yokohama.jpg';
import imgEnkei           from '../assets/Enkei.jpeg';
import imgOZ              from '../assets/OZSuperturismoAereo.jpeg';
import imgRays            from '../assets/RaysTE37UltraLargePCD.jpg';
import img3M              from '../assets/3MCrystallineCR90.jpeg';
import imgLlumar          from '../assets/LlumarCTX35.jpeg';
import imgVKOOL           from '../assets/VKOOLVK40Nano.jpg';
import imgPioneer         from '../assets/PioneerDMHZ5350BT.jpg';
import imgFloorMat        from '../assets/FloorMatLuxury.jpeg';
import imgTRD             from '../assets/TRD.jpg';
// ──────────────────────────────────────────────────────────────────────────

const categories = [
  { id: 'all',         label: 'Semua' },
  { id: 'mesin',       label: 'Mesin' },
  { id: 'rem',         label: 'Sistem Rem' },
  { id: 'transmisi',   label: 'Transmisi' },
  { id: 'suspensi',    label: 'Suspensi' },
  { id: 'kelistrikan', label: 'Kelistrikan' },
  { id: 'filter',      label: 'Filter & Oli' },
  { id: 'pendingin',   label: 'Pendingin' },
  { id: 'ban',         label: 'Ban' },
  { id: 'velg',        label: 'Velg' },
  { id: 'kacafilm',    label: 'Kaca Film' },
  { id: 'audio',       label: 'Audio & Interior' },
];

const products = [
  // ── SUKU CADANG ──────────────────────────────────────────────────────────
  {
    id: 1,  category: 'filter',      badge: null,
    name: 'Filter Oli Toyota Genuine',   code: 'TO-90915-YZZD2',
    brand: 'Toyota Genuine',   price: 95000,   stock: 48,
    compatible: 'Avanza, Veloz, Rush',        unit: 'pcs', image: imgFilterOli,
  },
  {
    id: 2,  category: 'rem',         badge: null,
    name: 'Kampas Rem Depan Ceramic',    code: 'TN-04465-BZ050',
    brand: 'TRD Sportivo',     price: 380000,  stock: 12,
    compatible: 'Camry, Corolla, Altis',       unit: 'set', image: imgKampasRem,
  },
  {
    id: 3,  category: 'mesin',       badge: null,
    name: 'Busi Iridium Long-Life',      code: 'NG-IKR6G11',
    brand: 'NGK',              price: 125000,  stock: 60,
    compatible: 'Semua Varian 1NZ-FE',         unit: 'pcs', image: imgBusi,
  },
  {
    id: 4,  category: 'filter',      badge: 'PROMO',
    name: 'Oli Mesin Castrol GTX 5W-30', code: 'CS-5W30-4L',
    brand: 'Castrol',          price: 185000,  stock: 30,
    compatible: 'Universal',                   unit: '4L',  image: imgOliCastrol,
  },
  {
    id: 5,  category: 'mesin',       badge: 'STOK TERBATAS',
    name: 'Timing Chain Kit 2NR-FE',    code: 'TO-13506-21011',
    brand: 'Toyota Genuine',   price: 2100000, stock: 5,
    compatible: 'Agya, Calya, Sienta',         unit: 'set', image: imgTimingChain,
  },
  {
    id: 6,  category: 'transmisi',   badge: null,
    name: 'Kanvas Kopling Assy',         code: 'TO-31250-12330',
    brand: 'Toyota Genuine',   price: 1450000, stock: 8,
    compatible: 'Avanza Manual, Rush MT',       unit: 'set', image: imgKanvasKopling,
  },
  {
    id: 7,  category: 'pendingin',   badge: null,
    name: 'Pompa Air Pendingin',         code: 'TO-16100-29085',
    brand: 'Toyota Genuine',   price: 780000,  stock: 7,
    compatible: 'Kijang Innova 1TR',            unit: 'pcs', image: imgWaterpump,
  },
  {
    id: 8,  category: 'kelistrikan', badge: null,
    name: 'Aki GS VRLA MF 55B24L',      code: 'GS-55B24L-MF',
    brand: 'GS Battery',       price: 730000,  stock: 15,
    compatible: 'Yaris, Vios, Corolla',         unit: 'pcs', image: imgAki,
  },
  {
    id: 9,  category: 'mesin',       badge: null,
    name: 'Knalpot Gasket Manifold',    code: 'TO-17173-31060',
    brand: 'Toyota Genuine',   price: 95000,   stock: 22,
    compatible: '1GR-FE Fortuner, Hilux',       unit: 'pcs', image: imgKnalpot,
  },
  {
    id: 10, category: 'suspensi',    badge: null,
    name: 'Shock Absorber Depan KYB',   code: 'KY-334460',
    brand: 'KYB Excel-G',      price: 620000,  stock: 10,
    compatible: 'Innova Reborn 2016+',          unit: 'pcs', image: imgShockAbsorber,
  },
  {
    id: 11, category: 'kelistrikan', badge: 'STOK TERBATAS',
    name: 'Alternator Assy 80A',        code: 'TO-27060-0D010',
    brand: 'Toyota Genuine',   price: 3200000, stock: 3,
    compatible: 'Avanza 1.3 / 1.5',            unit: 'pcs', image: imgAlternator,
  },
  {
    id: 12, category: 'rem',         badge: 'STOK TERBATAS',
    name: 'Master Rem Assy',            code: 'TO-47201-60490',
    brand: 'Toyota Genuine',   price: 1850000, stock: 4,
    compatible: 'Land Cruiser 200',             unit: 'pcs', image: imgMasterRem,
  },
  {
    id: 13, category: 'filter',      badge: null,
    name: 'Filter AC Cabin PM2.5',      code: 'DEN-CF1011',
    brand: 'Denso',            price: 145000,  stock: 35,
    compatible: 'Alphard, Vellfire AH30',       unit: 'pcs', image: imgFilterAC,
  },
  {
    id: 14, category: 'suspensi',    badge: null,
    name: 'Ball Joint Depan Bawah',     code: 'TO-43340-29055',
    brand: 'Toyota Genuine',   price: 480000,  stock: 9,
    compatible: 'Rush, Terios, Daihatsu',       unit: 'pcs', image: imgBallJoint,
  },
  {
    id: 15, category: 'mesin',       badge: null,
    name: 'Gasket Set Mesin Komplit',   code: 'FE-MS96307',
    brand: 'Fel-Pro',          price: 1250000, stock: 6,
    compatible: '2KD-FTV Hilux/Innova',         unit: 'set', image: imgGasketSet,
  },
  {
    id: 16, category: 'transmisi',   badge: null,
    name: 'Minyak Transmisi ATF WS',    code: 'TO-ATFWS-4L',
    brand: 'Toyota Genuine',   price: 310000,  stock: 18,
    compatible: 'Semua AT Toyota',              unit: '4L',  image: imgMinyakTransmisi,
  },

  // ── BAN ──────────────────────────────────────────────────────────────────
  {
    id: 17, category: 'ban',         badge: 'TERLARIS',
    name: 'Bridgestone Turanza T005A',  code: 'BS-T005A-205-65R16',
    brand: 'Bridgestone',      price: 1250000, stock: 24,
    compatible: 'Innova, Fortuner, Rush',       unit: 'pcs', image: imgBridgestone,
  },
  {
    id: 18, category: 'ban',         badge: 'PREMIUM',
    name: 'Michelin Primacy 4+',        code: 'MC-P4-225-45R17',
    brand: 'Michelin',         price: 1850000, stock: 16,
    compatible: 'Camry, Corolla, Altis',        unit: 'pcs', image: imgMichelin,
  },
  {
    id: 19, category: 'ban',         badge: null,
    name: 'Yokohama Advan dB V553',     code: 'YK-V553-195-65R15',
    brand: 'Yokohama',         price: 1050000, stock: 20,
    compatible: 'Avanza, Yaris, Vios',          unit: 'pcs', image: imgYokohama,
  },

  // ── VELG ─────────────────────────────────────────────────────────────────
  {
    id: 20, category: 'velg',        badge: 'TERLARIS',
    name: 'Enkei RPF1 17"',            code: 'EK-RPF1-17-5H114',
    brand: 'Enkei',            price: 3200000, stock: 8,
    compatible: 'Universal 5x114.3 PCD',        unit: 'pcs', image: imgEnkei,
  },
  {
    id: 21, category: 'velg',        badge: 'PREMIUM',
    name: 'OZ Superturismo Aereo 18"', code: 'OZ-STA-18-5H114',
    brand: 'OZ Racing',        price: 5800000, stock: 4,
    compatible: 'Corolla GR Sport, GR Yaris',   unit: 'pcs', image: imgOZ,
  },
  {
    id: 22, category: 'velg',        badge: 'FORGED',
    name: 'Rays TE37 Ultra Large PCD', code: 'RY-TE37U-18-6H139',
    brand: 'Rays',             price: 8500000, stock: 3,
    compatible: 'Fortuner, Land Cruiser',       unit: 'pcs', image: imgRays,
  },

  // ── KACA FILM ────────────────────────────────────────────────────────────
  {
    id: 23, category: 'kacafilm',    badge: 'TERLARIS',
    name: '3M Crystalline CR90',       code: '3M-CR90-FULL',
    brand: '3M',               price: 4500000, stock: 10,
    compatible: 'Semua Jenis Mobil',            unit: 'set', image: img3M,
  },
  {
    id: 24, category: 'kacafilm',    badge: null,
    name: 'Llumar CTX 35 Series',      code: 'LM-CTX35-FULL',
    brand: 'Llumar',           price: 2800000, stock: 14,
    compatible: 'Semua Jenis Mobil',            unit: 'set', image: imgLlumar,
  },
  {
    id: 25, category: 'kacafilm',    badge: 'NANO CERAMIC',
    name: 'VKOOL VK40 Nano Ceramic',   code: 'VK-VK40-FULL',
    brand: 'VKOOL',            price: 3600000, stock: 8,
    compatible: 'Semua Jenis Mobil',            unit: 'set', image: imgVKOOL,
  },

  // ── AUDIO & INTERIOR ─────────────────────────────────────────────────────
  {
    id: 26, category: 'audio',       badge: 'NEW',
    name: 'Pioneer DMH-Z5350BT',       code: 'PN-DMHZ5350BT',
    brand: 'Pioneer',          price: 4200000, stock: 6,
    compatible: 'Universal DIN 2 (dengan bracket)',  unit: 'pcs', image: imgPioneer,
  },
  {
    id: 27, category: 'audio',       badge: null,
    name: 'Floor Mat Luxury 3D Custom',code: 'FM-LUX3D-INNOVA',
    brand: 'GarasiHiling',     price: 1800000, stock: 12,
    compatible: 'Innova Reborn / Zenix',        unit: 'set', image: imgFloorMat,
  },
  {
    id: 28, category: 'audio',       badge: 'GR PARTS',
    name: 'TRD Sportivo Interior Kit', code: 'TRD-INT-KIT-GR',
    brand: 'TRD',              price: 6500000, stock: 3,
    compatible: 'GR Yaris, GR Corolla',         unit: 'set', image: imgTRD,
  },
];

// Badge styling
const badgeColor = (badge) => {
  if (!badge) return '';
  if (badge === 'STOK TERBATAS') return 'bg-red-600 text-white';
  if (badge === 'PROMO')         return 'bg-emerald-600 text-white';
  if (badge === 'TERLARIS')      return 'bg-amber-500 text-white';
  if (badge === 'PREMIUM')       return 'bg-zinc-900 text-white';
  if (badge === 'FORGED')        return 'bg-blue-700 text-white';
  if (badge === 'NANO CERAMIC')  return 'bg-cyan-700 text-white';
  if (badge === 'GR PARTS')      return 'bg-red-700 text-white';
  return 'bg-gray-700 text-white';
};

function ProductImage({ src, alt }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-4xl select-none">⚙️</div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="w-full h-full object-contain p-2"
    />
  );
}

export default function SukuCadang({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState('');

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock')      return b.stock - a.stock;
      return a.id - b.id;
    });

  const handleAddToCart = (product) => {
    addToCart?.({ ...product, quantity: 1, type: 'suku_cadang' });
    setNotification(`${product.name} ditambahkan ke keranjang`);
    setTimeout(() => setNotification(''), 2500);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Banner */}
      <div className="bg-zinc-950 text-white py-16 px-6 md:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-red-500" />
            Belanja
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            Suku Cadang
            <span className="text-red-500"> & Aksesori</span>
          </h1>
          <p className="text-zinc-400 mt-3 text-base max-w-xl">
            Suku cadang original, ban, velg, kaca film, dan aksesori interior premium untuk seluruh lini Toyota.
            Garansi keaslian, pengiriman cepat.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Stok tersedia hari ini</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Garansi original</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full" />
              <span>Pemasangan tersedia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-lg text-sm font-medium shadow-2xl border border-zinc-700">
          ✓ {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama part, merek, atau kode produk..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-zinc-900 transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-zinc-900 cursor-pointer"
          >
            <option value="default">Urutan Default</option>
            <option value="price-asc">Harga: Terendah</option>
            <option value="price-desc">Harga: Tertinggi</option>
            <option value="stock">Stok Terbanyak</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-zinc-950 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} produk ditemukan
            {selectedCategory !== 'all' && (
              <span className="ml-2 text-red-500 font-bold">
                · {categories.find(c => c.id === selectedCategory)?.label}
              </span>
            )}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group border border-gray-100 rounded-2xl p-5 hover:border-zinc-900 hover:shadow-xl transition-all duration-300 bg-white flex flex-col"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-50 rounded-xl mb-4 relative overflow-hidden">
                <ProductImage src={product.image} alt={product.name} />
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor(product.badge)}`}>
                    {product.badge}
                  </span>
                )}
                {/* Stok terbatas jika stock <= 5 dan belum ada badge */}
                {product.stock <= 5 && !product.badge && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Stok Terbatas
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">
                  {categories.find(c => c.id === product.category)?.label}
                </span>
                <h3 className="font-bold text-sm text-zinc-900 mt-1 leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">{product.code}</p>
                <p className="text-[11px] text-gray-500 mt-1">✓ {product.compatible}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <p className="text-lg font-black text-zinc-900">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      per {product.unit} · {product.brand}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400">{product.stock} stok</span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2.5 bg-zinc-950 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors duration-200 group-hover:bg-red-600"
                >
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">🔧</div>
            <p className="font-bold">Produk tidak ditemukan</p>
            <p className="text-sm mt-2">Coba kata kunci atau kategori lain</p>
          </div>
        )}
      </div>
    </div>
  );
}

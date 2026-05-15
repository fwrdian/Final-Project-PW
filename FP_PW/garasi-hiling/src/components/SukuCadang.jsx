import React, { useState } from 'react';

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'mesin', label: 'Mesin' },
  { id: 'rem', label: 'Sistem Rem' },
  { id: 'transmisi', label: 'Transmisi' },
  { id: 'suspensi', label: 'Suspensi' },
  { id: 'kelistrikan', label: 'Kelistrikan' },
  { id: 'filter', label: 'Filter & Oli' },
  { id: 'pendingin', label: 'Pendingin' },
  { id: 'bodi', label: 'Bodi & Eksterior' },
];

const products = [
  { id: 1, category: 'filter', name: 'Filter Oli Toyota Genuine', code: 'TO-90915-YZZD2', brand: 'Toyota Genuine', price: 95000, stock: 48, compatible: 'Avanza, Veloz, Rush', unit: 'pcs' },
  { id: 2, category: 'rem', name: 'Kampas Rem Depan Ceramic', code: 'TN-04465-BZ050', brand: 'TRD Sportivo', price: 380000, stock: 12, compatible: 'Camry, Corolla, Altis', unit: 'set' },
  { id: 3, category: 'mesin', name: 'Busi Iridium Long-Life', code: 'NG-IKR6G11', brand: 'NGK', price: 125000, stock: 60, compatible: 'Semua Varian 1NZ-FE', unit: 'pcs' },
  { id: 4, category: 'filter', name: 'Oli Mesin Castrol GTX 5W-30', code: 'CS-5W30-4L', brand: 'Castrol', price: 185000, stock: 30, compatible: 'Universal', unit: '4L' },
  { id: 5, category: 'mesin', name: 'Timing Chain Kit 2NR-FE', code: 'TO-13506-21011', brand: 'Toyota Genuine', price: 2100000, stock: 5, compatible: 'Agya, Calya, Sienta', unit: 'set' },
  { id: 6, category: 'transmisi', name: 'Kanvas Kopling Assy', code: 'TO-31250-12330', brand: 'Toyota Genuine', price: 1450000, stock: 8, compatible: 'Avanza Manual, Rush MT', unit: 'set' },
  { id: 7, category: 'pendingin', name: 'Pompa Air Pendingin', code: 'TO-16100-29085', brand: 'Toyota Genuine', price: 780000, stock: 7, compatible: 'Kijang Innova 1TR', unit: 'pcs' },
  { id: 8, category: 'kelistrikan', name: 'Aki GS VRLA MF 55B24L', code: 'GS-55B24L-MF', brand: 'GS Battery', price: 730000, stock: 15, compatible: 'Yaris, Vios, Corolla', unit: 'pcs' },
  { id: 9, category: 'bodi', name: 'Knalpot Gasket Manifold', code: 'TO-17173-31060', brand: 'Toyota Genuine', price: 95000, stock: 22, compatible: '1GR-FE Fortuner, Hilux', unit: 'pcs' },
  { id: 10, category: 'suspensi', name: 'Shock Absorber Depan KYB', code: 'KY-334460', brand: 'KYB Excel-G', price: 620000, stock: 10, compatible: 'Innova Reborn 2016+', unit: 'pcs' },
  { id: 11, category: 'kelistrikan', name: 'Alternator Assy 80A', code: 'TO-27060-0D010', brand: 'Toyota Genuine', price: 3200000, stock: 3, compatible: 'Avanza 1.3 / 1.5', unit: 'pcs' },
  { id: 12, category: 'rem', name: 'Master Rem Assy', code: 'TO-47201-60490', brand: 'Toyota Genuine', price: 1850000, stock: 4, compatible: 'Land Cruiser 200', unit: 'pcs' },
  { id: 13, category: 'filter', name: 'Filter AC Cabin PM2.5', code: 'DEN-CF1011', brand: 'Denso', price: 145000, stock: 35, compatible: 'Alphard, Vellfire AH30', unit: 'pcs' },
  { id: 14, category: 'suspensi', name: 'Ball Joint Depan Bawah', code: 'TO-43340-29055', brand: 'Toyota Genuine', price: 480000, stock: 9, compatible: 'Rush, Terios, Daihatsu', unit: 'pcs' },
  { id: 15, category: 'mesin', name: 'Gasket Set Mesin Komplit', code: 'FE-MS96307', brand: 'Fel-Pro', price: 1250000, stock: 6, compatible: '2KD-FTV Hilux/Innova', unit: 'set' },
  { id: 16, category: 'transmisi', name: 'Minyak Transmisi ATF WS', code: 'TO-ATFWS-4L', brand: 'Toyota Genuine', price: 310000, stock: 18, compatible: 'Semua AT Toyota', unit: '4L' },
];

export default function SukuCadang({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState('');

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock') return b.stock - a.stock;
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
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px'}}></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-px bg-red-500"></span>
            Belanja
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Suku Cadang</h1>
          <p className="text-zinc-400 mt-3 text-base max-w-xl">Suku cadang original dan aftermarket berkualitas untuk seluruh lini Toyota. Garansi keaslian, pengiriman cepat.</p>
          <div className="flex gap-6 mt-8 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Stok tersedia hari ini</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Garansi original</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-lg text-sm font-medium shadow-2xl animate-in slide-in-from-right">
          ✓ {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama part atau kode produk..."
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

        {/* Category Tabs - Scrollable */}
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

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{filteredProducts.length} produk ditemukan</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <div key={product.id} className="group border border-gray-100 rounded-2xl p-5 hover:border-zinc-900 hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
              {/* Product Image Placeholder */}
              <div className="aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="text-4xl">⚙️</div>
                {product.stock <= 5 && (
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
                <h3 className="font-bold text-sm text-zinc-900 mt-1 leading-snug line-clamp-2">{product.name}</h3>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">{product.code}</p>
                <p className="text-[11px] text-gray-500 mt-1">✓ {product.compatible}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <p className="text-lg font-black text-zinc-900">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[10px] text-gray-400">per {product.unit} · {product.brand}</p>
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

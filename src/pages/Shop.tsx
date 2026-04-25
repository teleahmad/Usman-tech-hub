import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { fetchApi } from '../lib/api';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Covers', 'Glass', 'Chargers', 'Cables', 'AirPods Pro Case'];

  useEffect(() => {
    fetchApi<Product[]>('/api/products')
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Inventory catalog unreachable.');
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-100 pb-12 gap-8">
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 block">Digital Catalog</span>
          <h1 className="text-6xl font-serif font-light leading-tight">Flagship <br /><span className="font-bold underline decoration-indigo-600">Inventory</span></h1>
          <p className="text-slate-400 text-sm font-medium">Displaying {filteredProducts.length} filtered results</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search components..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-indigo-600 w-64 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {categories.slice(0, 3).map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-3 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200 hover:border-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-8 bg-red-50 border border-red-100 rounded-3xl text-center space-y-4 animate-in zoom-in-95">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 text-white rounded text-[10px] font-bold uppercase tracking-widest">Retry Connection</button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-slate-50 rounded-lg animate-pulse" />
          ))
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-3xl">
          <p className="text-slate-400 font-serif italic text-lg">No matches found in our current archives.</p>
        </div>
      )}
    </div>
  );
}

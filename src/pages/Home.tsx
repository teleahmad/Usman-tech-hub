import { ShoppingBag, Star, Zap, ShieldCheck, ChevronRight, Smartphone, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { fetchApi } from '../lib/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Product[]>('/api/products')
      .then(data => setFeaturedProducts(data.slice(0, 4)))
      .catch(err => {
        console.error('Failed to load products:', err);
        setError('Unable to load products. Retrying in background...');
      });
  }, []);

  return (
    <div className="space-y-12 py-12 px-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-12">
        <div className="space-y-4">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] block">Curated Selection</span>
          <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight">
            Premium <span className="italic font-bold text-slate-900 border-b-4 border-indigo-600">Accessories</span>
          </h2>
        </div>
        <div className="flex gap-4">
          <Link to="/shop" className="px-6 py-3 border border-slate-200 rounded text-[10px] font-bold uppercase tracking-widest hover:border-indigo-600 transition-colors">
            Filter Archive
          </Link>
          <Link to="/shop" className="px-6 py-3 bg-slate-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors">
             View Collections
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-[10px] font-bold uppercase tracking-widest animate-pulse">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {featuredProducts.length === 0 && !error && (
          [...Array(4)].map((_, i) => (
             <div key={i} className="aspect-[3/4] bg-slate-50 rounded-lg animate-pulse" />
          ))
        )}
      </div>

      {/* Promotion */}
      <section className="pt-12">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-6 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-5xl font-serif italic font-light">Join the <br /><span className="font-bold text-indigo-500">Tech Archive</span></h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Get exclusive first looks at flagship drops, premium accessories, and limited edition inventory updates.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input type="email" placeholder="Your flagship email..." className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-xs flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              <button className="bg-indigo-600 px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

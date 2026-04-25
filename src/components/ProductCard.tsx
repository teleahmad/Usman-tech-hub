import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="aspect-[3/4] bg-slate-100 rounded-lg mb-4 border border-slate-200 overflow-hidden relative transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-600/10">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter shadow-sm">
            New Arrival
          </div>
        )}

        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-indigo-600 text-white text-[10px] font-bold py-3 rounded-md uppercase tracking-[0.2em] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600/60 leading-none">#{product.category}</span>
        <h4 className="text-[11px] font-bold uppercase tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h4>
        <div className="flex justify-between items-center text-[10px] font-medium">
          <p className="text-slate-500 font-mono tracking-tighter">RS. {product.price}</p>
          <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
             <span className="text-[8px] text-slate-400 uppercase font-black">In Stock</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

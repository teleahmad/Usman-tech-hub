import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="h-12 bg-slate-900 text-white flex items-center justify-between px-8 shrink-0 z-50">
      <p className="text-[10px] uppercase tracking-widest text-slate-400">
        © {new Date().getFullYear()} Usman Tech Store. All Rights Reserved.
      </p>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Status:</span>
          <span className="text-[10px] font-mono text-green-400 animate-pulse">SYSTEMS OPERATIONAL</span>
        </div>
        <div className="hidden md:block h-3 w-px bg-slate-700"></div>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-tighter">
          <Link to="/shop" className="hover:text-indigo-400 transition-colors">Inventory</Link>
          <Link to="/admin" className="hover:text-indigo-400 transition-colors">Admin</Link>
          <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-24 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-50 sticky top-0">
      <div className="flex items-center gap-6">
        <Link to="/" className="shrink-0 flex items-center group">
          <div className="flex flex-col items-center leading-none">
            <div className="flex items-center gap-1">
              <div className="relative">
                <svg viewBox="0 0 100 40" className="h-12 w-auto">
                  {/* UTH Stylized */}
                  <path d="M10,5 v15 a10,10 0 0,0 20,0 v-15" fill="none" stroke="#2563eb" strokeWidth="6" />
                  <path d="M40,5 v25" fill="none" stroke="#0f172a" strokeWidth="6" />
                  <path d="M35,5 h10" fill="none" stroke="#0f172a" strokeWidth="6" />
                  <path d="M45,5 v25 h10 M45,15 h10" fill="none" stroke="#2563eb" strokeWidth="6" />
                  
                  {/* Phone Icon in U */}
                  <rect x="16" y="8" width="8" height="14" rx="1.5" fill="white" stroke="#2563eb" strokeWidth="1" />
                  <circle cx="20" cy="20" r="1" fill="#2563eb" />
                  
                  {/* Swoosh */}
                  <path d="M5,35 Q30,40 65,15" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                  
                  {/* Pixels */}
                  <rect x="70" y="5" width="3" height="3" fill="#3b82f6" />
                  <rect x="75" y="8" width="3" height="3" fill="#60a5fa" />
                  <rect x="80" y="5" width="2" height="2" fill="#93c5fd" />
                </svg>
              </div>
            </div>
            <div className="text-center -mt-1">
              <span className="text-lg font-black tracking-tighter text-slate-900 block leading-none">USMAN</span>
              <div className="flex items-center justify-center gap-1 -mt-0.5">
                <div className="h-[1px] w-2 bg-indigo-600"></div>
                <span className="text-[7px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Tech Hub</span>
                <div className="h-[1px] w-2 bg-indigo-600"></div>
              </div>
            </div>
          </div>
        </Link>
        <div className="hidden lg:block h-8 w-px bg-slate-200"></div>
        <nav className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="text-slate-900 hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        {user?.isAdmin && (
          <Link to="/admin" className="hidden md:flex items-center gap-2 text-[10px] font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full cursor-pointer hover:bg-indigo-100 transition-colors uppercase tracking-widest">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div> 
            <span>Console</span>
          </Link>
        )}
        
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-slate-700 hover:text-indigo-600 transition-colors">
            <ShoppingCart size={20} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full leading-none">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-700 hover:text-red-600 transition-colors flex items-center gap-2"
              title="Logout"
            >
              <LogOut size={20} />
              <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest">Logout</span>
            </button>
          ) : (
            <Link to="/login" className="p-2 text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-2">
              <User size={20} />
              <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest">Login</span>
            </Link>
          )}

          <button 
            className="lg:hidden p-2 text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top duration-300">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-slate-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-slate-900" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/contact" className="text-[10px] font-bold uppercase tracking-widest text-slate-900" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
          {user?.isAdmin && (
            <Link to="/admin" className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 pt-2 border-t border-slate-100" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
          )}
        </div>
      )}
    </header>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Contact from './pages/Contact';

import { AuthProvider } from './context/AuthContext';

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-50 border-r border-slate-200 p-6 hidden xl:flex flex-col gap-6 overflow-y-auto shrink-0">
      <section>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Store Location</h3>
        <div className="aspect-square bg-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 text-[10px] border border-slate-300 relative overflow-hidden text-center p-4">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
          <p className="font-bold text-slate-600">Usman Tech Hub</p>
          <p className="mt-1">Main Market, Area 51, PK</p>
          <a href="https://share.google/6aoGce92h4WxXn3Qc" target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-white rounded shadow-sm text-indigo-600 font-bold hover:bg-slate-50 transition-colors pointer-events-auto">
            Open in Maps
          </a>
        </div>
      </section>

      <section className="flex-1">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Customer Satisfaction</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
            <p className="text-[11px] italic leading-relaxed text-slate-600">"The best place for premium mobile accessories in the area!"</p>
            <p className="text-[9px] font-bold mt-2 uppercase text-slate-400">- Ahmad K.</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
            <p className="text-[11px] italic leading-relaxed text-slate-600">"Found exactly what I needed for my iPhone. 10/10 service."</p>
            <p className="text-[9px] font-bold mt-2 uppercase text-slate-400">- Sarah J.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 pt-4 space-y-4">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Connect</h3>
        <div className="space-y-2">
          <a href="https://wa.me/923211088723" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors group">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">W</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
              <span className="text-[9px] font-bold">03211088723</span>
            </div>
          </a>
          <a href="tel:03206882843" className="flex items-center gap-3 p-3 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors group">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white shrink-0">C</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest">Direct Call</span>
              <span className="text-[9px] font-bold">03206882843</span>
            </div>
          </a>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-2">
            <a href="https://www.facebook.com/share/1GjnRFGkzc/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-[10px] font-bold hover:bg-indigo-600 transition-colors">F</a>
            <a href="https://youtube.com/@hkwpro?si=W7dBXc1n0mWtSLn2&sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold hover:bg-red-700 transition-colors">Y</a>
          </div>
          <p className="text-[10px] text-slate-400 font-mono tracking-tight">@usman_tech</p>
        </div>
      </section>
    </aside>
  );
}

function Layout() {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/admin';
  const showSidebar = !isDashboardPage && ['/', '/shop'].includes(location.pathname);

  return (
    <div className="h-screen bg-white flex flex-col font-sans overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && <Sidebar />}
        
        <main className="flex-1 overflow-y-auto bg-white scroll-smooth relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}


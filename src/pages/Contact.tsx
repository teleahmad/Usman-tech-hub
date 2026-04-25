import { MapPin, Phone, Mail, Facebook, Youtube, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        {/* Info Side */}
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] block">Flagship Logistics</span>
            <h1 className="text-6xl font-serif font-light leading-tight">Direct <br /><span className="font-bold underline decoration-indigo-600 italic">Conversations</span></h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Seeking specific inventory or bulk orders? Our specialists manage high-volume technical fulfillment and individual drops.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6 p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 group">
               <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                 <MapPin size={24} />
               </div>
               <div className="space-y-2">
                 <h3 className="text-xl font-serif italic text-slate-900">Flagship Location</h3>
                 <p className="text-slate-500 text-sm font-medium">Usman Tech Hub, Main Market Square, Pakistan.</p>
               </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-6 p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 group">
                 <div className="p-4 bg-slate-50 text-slate-600 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
                   <Phone size={24} />
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-xl font-serif italic text-slate-900">Satellite Comms</h3>
                   <p className="text-slate-500 text-sm font-medium">03206882843</p>
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">Operational: 10:00 — 22:00</p>
                   <a href="tel:03206882843" className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors">Direct Call</a>
                 </div>
              </div>
              <div className="flex items-start space-x-6 p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 group">
                 <div className="p-4 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                   <Send size={24} />
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-xl font-serif italic text-slate-900">WhatsApp Channel</h3>
                   <p className="text-slate-500 text-sm font-medium">03211088723</p>
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-green-600">Secure Messaging Ready</p>
                   <a href="https://wa.me/923211088723" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-green-700 transition-colors">Open Chat</a>
                 </div>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 px-2 text-center md:text-left">Follow the Store</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/share/1GjnRFGkzc/" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-900 text-white rounded-2xl hover:bg-blue-600 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://youtube.com/@hkwpro?si=W7dBXc1n0mWtSLn2&sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-900 text-white rounded-2xl hover:bg-red-600 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Map Side */}
        <div className="space-y-12">
          <div className="aspect-video bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-200 relative group shadow-inner">
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108848.24340798207!2d74.19504629726562!3d31.50903330000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919036a43588f01%3A0x6bba8d98d2460699!2sMobile%20Accessories%20Shop!5e0!3m2!1sen!2s!4v1714018159234!5m2!1sen!2s" 
               className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 block leading-none">Live Status</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storefront Active</span>
                    </div>
                  </div>
                  <a href="https://share.google/6aoGce92h4WxXn3Qc" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Coordinate Vector</a>
               </div>
            </div>
          </div>

          <div className="bg-slate-50 p-12 rounded-[3rem] space-y-8 border border-slate-100">
            <div className="space-y-1">
              <h3 className="text-3xl font-serif italic text-slate-900">Direct <span className="font-bold">Transmission</span></h3>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Encrypted Satellite Relay</p>
            </div>
            <form className="space-y-4">
               <input placeholder="Identifier (Name)" className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" />
               <input type="email" placeholder="Return Address (Email)" className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" />
               <textarea placeholder="Your Message / Inventory Request..." rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" />
               <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center space-x-3 group hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-900/10">
                  <span>Initialize Broadcast</span>
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

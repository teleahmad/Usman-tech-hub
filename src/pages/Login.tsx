import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Key, Mail, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate(email === 'hkwpro@gmail.com' ? '/admin' : '/');
      } else {
        setError('Invalid credentials. Access Denied.');
      }
    } catch (err) {
      setError('System authentication failure.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    // Simulate Google Login popup
    setTimeout(async () => {
      // For demo/sim, we'll just log in as a generic user
      await login('user@gmail.com');
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-8 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
      >
        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield size={32} />
            </div>
            <h2 className="text-3xl font-serif italic text-slate-900">Secure <span className="font-bold">Access</span></h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  placeholder="Official Email"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all placeholder:text-slate-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  placeholder="Access Key"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all placeholder:text-slate-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-[9px] font-black uppercase text-red-600 bg-red-50 p-3 rounded-lg text-center tracking-widest animate-pulse">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isLoggingIn ? 'Verifying...' : 'Initialize Terminal'}
            </button>
          </form>

          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
             <div className="relative flex justify-center text-[8px] uppercase font-black text-slate-300 tracking-[0.2em]"><span className="bg-white px-4">Relay Systems</span></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}

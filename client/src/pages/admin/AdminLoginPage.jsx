import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@grandazure.com');
  const [password, setPassword] = useState('AzureAdmin2026!');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const adminBase = '/private-management';

  if (isAuthenticated) {
    return <Navigate to={adminBase} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      setLoading(true);
      await login(email, password);
      navigate(adminBase);
    } catch (err) {
      setErrorMsg(err.message || 'Authentication rejected. Verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      
      {/* Ambient background decoration */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80"
          alt="Hotel background"
          className="w-full h-full object-cover filter blur-sm"
        />
      </div>

      <div className="relative z-10 w-full max-w-md bg-navy-900/90 border border-gold-400/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl space-y-6 animate-fade-in">
        
        {/* Header Monogram */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full border border-gold-400/80 bg-navy-950 flex items-center justify-center mx-auto shadow-gold-glow">
            <span className="font-serif font-bold text-gold-400 text-xl tracking-widest">GA</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
            Management Portal
          </h2>
          <p className="text-xs text-slate-400">
            The Grand Azure Resort &bull; Restricted Staff Access
          </p>
        </div>

        {/* Security Warning Notice */}
        <div className="bg-navy-950/80 border border-navy-800 rounded-lg p-3 text-[11px] text-slate-400 flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <span>
            This is a private administrative terminal. All login events and operations are encrypted and audited.
          </span>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 rounded text-xs flex items-center space-x-2 animate-fade-in">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
              Authorized Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@grandazure.com"
                required
                className="w-full bg-navy-950 border border-navy-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-navy-950 border border-navy-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 text-xs uppercase tracking-[0.2em] font-bold rounded-lg transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <span>Access Private Dashboard</span>
            )}
          </button>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className="pt-4 border-t border-navy-800 text-[11px] text-slate-400 space-y-1">
          <div className="text-gold-400 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-gold-400" />
            <span>Default Provisioned Credentials:</span>
          </div>
          <div><strong>Super Admin:</strong> <code className="text-white">admin@grandazure.com</code> / <code className="text-white">AzureAdmin2026!</code></div>
          <div><strong>Manager:</strong> <code className="text-white">manager@grandazure.com</code> / <code className="text-white">AzureManager2026!</code></div>
        </div>

      </div>

    </div>
  );
}

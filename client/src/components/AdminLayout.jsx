import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Inbox, 
  BedDouble, 
  Tag, 
  FileEdit, 
  Users, 
  History, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const adminBase = '/private-management';

  const menuItems = [
    { name: 'Dashboard Overview', path: adminBase, icon: LayoutDashboard },
    { name: 'Booking Inquiries', path: `${adminBase}/inquiries`, icon: Inbox },
    { name: 'Suites & Villas', path: `${adminBase}/rooms`, icon: BedDouble },
    { name: 'Promotional Offers', path: `${adminBase}/offers`, icon: Tag },
    { name: 'Website Content', path: `${adminBase}/content`, icon: FileEdit },
    ...(user?.role === 'superadmin' || user?.role === 'manager' ? [
      { name: 'Staff Management', path: `${adminBase}/staff`, icon: Users },
    ] : []),
    { name: 'Activity Audit Log', path: `${adminBase}/logs`, icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate(`${adminBase}/login`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-navy-950 border-r border-navy-800 shrink-0">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-navy-800/80 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full border border-gold-400 flex items-center justify-center bg-navy-900">
            <span className="font-serif font-bold text-gold-400 text-sm tracking-widest">GA</span>
          </div>
          <div>
            <span className="block font-serif text-sm text-white uppercase tracking-wider font-bold">
              The Grand Azure
            </span>
            <span className="block text-[10px] tracking-widest text-gold-400 uppercase font-mono">
              Management Portal
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs tracking-wider transition-all ${
                  isActive
                    ? 'bg-gold-500/15 text-gold-300 font-semibold border border-gold-500/30'
                    : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Return to Public Site (Discreet) */}
        <div className="p-4 border-t border-navy-800 text-[11px] space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-slate-400 hover:text-gold-300 transition-colors py-1"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* User Profile Bar */}
          <div className="pt-3 border-t border-navy-800 flex items-center justify-between">
            <div className="truncate">
              <span className="block text-xs font-semibold text-white truncate">{user?.name}</span>
              <span className="block text-[10px] uppercase text-emerald-400 tracking-wider font-mono">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded hover:bg-navy-800 text-slate-400 hover:text-rose-400 transition-colors"
              title="Secure Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-navy-950/90 border-b border-navy-800 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden text-slate-300 p-1.5 focus:outline-none"
            >
              {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Authorized Session Active:</span>
              <span className="text-white font-mono">{user?.email}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-gold-400/80 font-mono hidden sm:inline">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-navy-900 hover:bg-rose-950/60 border border-navy-700 hover:border-rose-700/50 rounded text-xs text-slate-300 hover:text-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-navy-950 border-b border-navy-800 p-4 space-y-2 animate-fade-in">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded text-xs tracking-wider ${
                    isActive ? 'bg-gold-500/20 text-gold-300 font-semibold' : 'text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

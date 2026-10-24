import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { hotelInfo, openInquiryModal } = useHotel();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Suites & Villas', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Wellness & Spa', path: '/wellness' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Location & Contact', path: '/contact' },
  ];

  const phone = hotelInfo?.contact?.phone || '+1 (858) 555-0199';
  const phoneRaw = hotelInfo?.contact?.phoneRaw || '+18585550199';
  const whatsapp = hotelInfo?.contact?.whatsapp || '18585550199';

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-navy-950 text-ivory-300 text-xs py-2 px-4 border-b border-navy-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center tracking-wider font-light">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Condé Nast Traveler Gold List 2026 &bull; Forbes Travel Guide Verified Sanctuary</span>
          </div>
          <div className="flex items-center space-x-6 text-ivory-200">
            <a 
              href={`https://wa.me/${whatsapp}?text=Hello%20Concierge,%20I%20am%20inquiring%20about%20a%20stay%20at%20The%20Grand%20Azure.`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1.5 hover:text-gold-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp Concierge</span>
            </a>
            <a 
              href={`tel:${phoneRaw}`} 
              className="flex items-center space-x-1.5 hover:text-gold-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3.5 shadow-luxury-lg border-b border-navy-800/60' 
          : 'bg-navy-950/90 py-5 border-b border-navy-800/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full border border-gold-400/50 flex items-center justify-center bg-navy-900 group-hover:border-gold-400 transition-colors">
              <span className="font-serif font-bold text-gold-400 text-lg tracking-widest">GA</span>
            </div>
            <div>
              <span className="block font-serif text-lg md:text-xl text-white tracking-widest uppercase font-semibold leading-none">
                The Grand Azure
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-gold-400 uppercase mt-1">
                Resort &bull; Spa &bull; Sanctuary
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.18em] transition-all duration-200 relative py-1 ${
                    isActive 
                      ? 'text-gold-400 font-semibold' 
                      : 'text-ivory-200 hover:text-gold-300'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400 rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={() => openInquiryModal()}
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded hover:from-gold-200 hover:to-gold-400 transition-all duration-300 shadow-md hover:shadow-gold-glow active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 mr-2" />
              Reserve Your Stay
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-ivory-200 hover:text-gold-400 p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-navy-950/95 border-b border-navy-800 px-6 pt-4 pb-8 space-y-4 animate-fade-in">
            <div className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest py-2 border-b border-navy-800/50 ${
                    location.pathname === link.path ? 'text-gold-400 font-semibold' : 'text-ivory-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInquiryModal();
                }}
                className="w-full py-3 text-center text-xs uppercase tracking-[0.2em] font-medium text-navy-950 bg-gradient-to-r from-gold-300 to-gold-500 rounded shadow"
              >
                Reserve Your Stay
              </button>

              <a
                href={`tel:${phoneRaw}`}
                className="block text-center text-xs tracking-wider text-ivory-300 py-2"
              >
                Concierge Direct: {phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

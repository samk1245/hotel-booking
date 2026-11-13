import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openInquiryModal } = useHotel();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuLinks = [
    { label: 'Suites & Villas', path: '/rooms' },
    { label: 'Gastronomy & Cellars', path: '/dining' },
    { label: 'Wellness & Spa', path: '/wellness' },
    { label: 'Sanctuary Gallery', path: '/gallery' },
    { label: 'Location & Contact', path: '/contact' }
  ];

  // Exact Brand Logo SVG from architectural prompt with Champagne Gold accent
  const BrandLogo = ({ className = "w-7 h-7", fill = "#DFCCAA" }) => (
    <svg 
      viewBox="0 0 256 256" 
      className={className} 
      fill={fill}
      aria-hidden="true"
    >
      <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
    </svg>
  );

  return (
    <>
      {/* 1) NAVBAR — Fixed Top Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-5 transition-all duration-300 ${
          isScrolled 
            ? 'bg-navy-950/95 backdrop-blur-md border-b border-gold-400/20 shadow-luxury' 
            : 'bg-transparent'
        }`}
      >
        {/* LEFT — Exact Geometric Brand Logo SVG + Text */}
        <Link 
          to="/" 
          className="flex items-center space-x-2.5 z-10 group"
          aria-label="XYZ Hotel Home"
        >
          <div className="w-8 h-8 rounded-lg bg-navy-900 border border-gold-400/40 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <BrandLogo className="w-5 h-5" fill="#DFCCAA" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wider text-white uppercase font-sans leading-none">
              XYZ Hotel
            </span>
            <span className="text-[9px] tracking-[0.25em] text-gold-400 uppercase mt-0.5 font-sans font-light">
              Coastal Sanctuary
            </span>
          </div>
        </Link>

        {/* CENTER — Hamburger open button, absolutely centered (TWO horizontal lines only) */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-1/2 -translate-x-1/2 p-2 flex flex-col items-center justify-center gap-[5px] group focus:outline-none"
          aria-label="Open menu"
        >
          <span className="block w-6 h-[1.5px] bg-gold-300 group-hover:bg-gold-200 rounded-full group-hover:w-5 transition-all duration-300" />
          <span className="block w-6 h-[1.5px] bg-gold-300 group-hover:bg-gold-200 rounded-full group-hover:w-5 transition-all duration-300" />
        </button>

        {/* RIGHT — CTA link (hidden on mobile, visible sm+) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => openInquiryModal()}
            className="hidden sm:inline-flex items-center justify-center text-xs uppercase tracking-widest font-semibold text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded-full px-5 py-2.5 hover:from-gold-200 hover:to-gold-400 transition-all duration-200 shadow-md hover:shadow-gold-glow shimmer-button"
          >
            Reserve Stay
          </button>

          {/* On mobile only: spacer div w-7 to balance the logo */}
          <div className="w-7 sm:hidden" aria-hidden="true" />
        </div>
      </header>

      {/* OVERLAY: fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* DRAWER / FULL-SCREEN MENU */}
      <div
        className={`fixed z-[70] bg-[#071322] text-white flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 
          inset-0 sm:inset-auto sm:top-0 sm:right-0 sm:h-full sm:w-full sm:max-w-sm sm:shadow-2xl sm:border-l sm:border-gold-400/25
          ${
            isOpen
              ? 'opacity-100 translate-y-0 sm:translate-x-0'
              : 'opacity-0 translate-y-full sm:translate-y-0 sm:translate-x-full pointer-events-none'
          }
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-navy-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-900 border border-gold-400/40 flex items-center justify-center">
              <BrandLogo className="w-5 h-5" fill="#DFCCAA" />
            </div>
            <span className="font-semibold text-sm tracking-wider text-white uppercase font-sans">
              XYZ Hotel
            </span>
          </div>

          {/* Close button with two lines morphing into an X */}
          <button
            onClick={() => setIsOpen(false)}
            className="relative w-10 h-10 rounded-full hover:bg-navy-800/80 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <span
              className={`absolute w-5 h-[1.5px] bg-gold-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'rotate-45 translate-y-0' : 'rotate-0 -translate-y-[3px]'
              }`}
            />
            <span
              className={`absolute w-5 h-[1.5px] bg-gold-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? '-rotate-45 translate-y-0' : 'rotate-0 translate-y-[3px]'
              }`}
            />
          </button>
        </div>

        {/* Menu Links with Staggered Entrance (150ms + i*60ms) */}
        <nav className="flex flex-col py-6 space-y-1 my-auto">
          {menuLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                transitionDelay: isOpen ? `${150 + i * 60}ms` : '0ms'
              }}
              className={`text-3xl font-medium text-ivory-100 py-3 hover:text-gold-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA below links (pt-12) with 400ms delay */}
        <div 
          style={{
            transitionDelay: isOpen ? '400ms' : '0ms'
          }}
          className={`pt-12 border-t border-navy-800 flex flex-col space-y-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => {
              setIsOpen(false);
              openInquiryModal();
            }}
            className="w-full text-center text-xs uppercase tracking-widest font-semibold text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded-full px-6 py-3.5 hover:from-gold-200 hover:to-gold-400 transition-all shadow-md shimmer-button"
          >
            Reserve Your Sanctuary Stay
          </button>

          <p className="text-[11px] text-slate-400 text-center font-light">
            24/7 Dedicated Concierge &bull; Instant Confirmation
          </p>
        </div>

      </div>
    </>
  );
}

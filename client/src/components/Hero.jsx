import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export default function Hero() {
  const { openInquiryModal } = useHotel();
  const [loaded, setLoaded] = useState(false);

  // Quick bar defaults
  const today = new Date();
  const defaultIn = new Date(today);
  defaultIn.setDate(today.getDate() + 7);
  const defaultOut = new Date(today);
  defaultOut.setDate(today.getDate() + 11);

  const [checkIn, setCheckIn] = useState(defaultIn.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(defaultOut.toISOString().split('T')[0]);
  const [adults, setAdults] = useState('2');

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    openInquiryModal({
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: parseInt(adults, 10)
    });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy-950 text-white px-4 sm:px-6 pt-28 pb-16">
      
      {/* Background Image with Cinematic Slow Zoom & Atmospheric Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85"
          alt="XYZ Hotel Cliffside Infinity Pool & Ocean Grounds"
          className="w-full h-full object-cover object-center animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Eyebrow Accolade Pill */}
        <div 
          className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-navy-900/80 border border-gold-400/40 text-gold-300 text-[11px] font-medium tracking-[0.2em] uppercase mb-6 shadow-sm backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="flex text-gold-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-ivory-100">Forbes Verified Coastal Sanctuary &bull; Goa, India</span>
        </div>

        {/* H1 Headline */}
        <h1 
          style={{ transitionDelay: '100ms' }}
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight text-white leading-[1.06] max-w-3xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          Where Coastal Majesty<br />
          Meets <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 font-light">Timeless Serenity</span>
        </h1>

        {/* Subhead paragraph */}
        <p 
          style={{ transitionDelay: '200ms' }}
          className={`mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-ivory-200/90 max-w-xl mx-auto leading-relaxed font-light transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          Perched gracefully along pristine coastal shores, discover an intimate haven of bespoke suites, Michelin-caliber gastronomy, and deeply restorative wellness rituals at XYZ Hotel.
        </p>

        {/* Luxury Booking Search Bar */}
        <div 
          style={{ transitionDelay: '320ms' }}
          className={`mt-10 max-w-3xl w-full bg-navy-900/85 backdrop-blur-xl border border-gold-400/35 rounded-2xl p-5 sm:p-6 shadow-luxury-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end text-left">
            
            {/* Check In */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gold-400 font-semibold mb-1.5">
                Arrival Date
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400 transition-colors"
                required
              />
            </div>

            {/* Check Out */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gold-400 font-semibold mb-1.5">
                Departure Date
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400 transition-colors"
                required
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gold-400 font-semibold mb-1.5">
                Guests
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400 transition-colors"
              >
                <option value="1">1 Adult (Solo)</option>
                <option value="2">2 Adults (Couple)</option>
                <option value="3">3 Adults (Suite Extra)</option>
                <option value="4">4 Adults (Villa / Family)</option>
                <option value="5">5+ Guests (Penthouse)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full h-[38px] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 text-xs uppercase tracking-[0.2em] font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-md hover:shadow-gold-glow shimmer-button active:scale-98"
              >
                <span>Inquire Dates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="mt-3.5 pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-slate-400 font-light">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Reservations &bull; Verified Inventory &bull; Zero Upfront Fee</span>
            </div>
            <span className="hidden sm:inline text-gold-300/90 font-medium">Starting from ₹4,900 / night</span>
          </div>
        </div>

      </div>

    </section>
  );
}

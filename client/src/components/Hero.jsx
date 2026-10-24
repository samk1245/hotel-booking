import React, { useState } from 'react';
import { Calendar, Users, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export default function Hero() {
  const { openInquiryModal } = useHotel();
  
  // Quick bar defaults
  const today = new Date();
  const defaultIn = new Date(today);
  defaultIn.setDate(today.getDate() + 7);
  const defaultOut = new Date(today);
  defaultOut.setDate(today.getDate() + 11);

  const [checkIn, setCheckIn] = useState(defaultIn.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(defaultOut.toISOString().split('T')[0]);
  const [adults, setAdults] = useState('2');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    openInquiryModal({
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: parseInt(adults, 10)
    });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background Image with Ambient Luxury Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85"
          alt="The Grand Azure Resort & Spa Cliffside Infinity Pool"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center md:text-left flex flex-col justify-center min-h-[85vh]">
        
        {/* Accolade Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-900/80 border border-gold-400/40 backdrop-blur-md self-center md:self-start mb-6">
          <div className="flex text-gold-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-ivory-100 font-medium">
            Forbes Verified Coastal Sanctuary &bull; California
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal leading-[1.1] tracking-tight">
            Where Coastal Majesty Meets <span className="italic text-gold-300 font-light">Timeless Serenity</span>
          </h1>
          <p className="text-base sm:text-lg text-ivory-200/90 font-light leading-relaxed max-w-2xl">
            Perched gracefully along the Pacific cliffs, discover an intimate haven of bespoke ocean suites, Michelin-caliber gastronomy, and deeply restorative thalassotherapy rituals.
          </p>
        </div>

        {/* Quick Booking Inquiry Strip Card */}
        <div className="mt-10 max-w-4xl w-full bg-navy-900/90 backdrop-blur-md border border-gold-400/30 rounded-xl p-4 sm:p-6 shadow-luxury-lg self-center md:self-start">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* Check In Date */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1.5">
                Check-in Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-navy-950/80 border border-navy-700 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>
            </div>

            {/* Check Out Date */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1.5">
                Check-out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-navy-950/80 border border-navy-700 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1.5">
                Guests
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full bg-navy-950/80 border border-navy-700 rounded px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
              >
                <option value="1">1 Adult (Solo Retreat)</option>
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
                className="w-full h-[38px] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all duration-300 shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2"
              >
                <span>Inquire Dates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Verification Disclaimer */}
          <div className="mt-3.5 pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Booking Inquiry &bull; Zero Upfront Fee &bull; Personal Concierge Review</span>
            </div>
            <span className="hidden sm:inline italic">Rates confirmed within 2-4 hours</span>
          </div>
        </div>

      </div>
    </section>
  );
}

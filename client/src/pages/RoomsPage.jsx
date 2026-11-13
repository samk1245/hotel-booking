import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import RoomCard from '../components/RoomCard';
import ScrollReveal from '../components/ScrollReveal';
import { Sparkles, Filter, ShieldAlert } from 'lucide-react';

export default function RoomsPage() {
  const { rooms } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const safeRooms = Array.isArray(rooms) ? rooms : [];
  const categories = ['All', ...new Set(safeRooms.map(r => r.category))];

  const filteredRooms = selectedCategory === 'All'
    ? safeRooms
    : safeRooms.filter(r => r.category === selectedCategory);

  return (
    <div className="space-y-16 pb-24 overflow-hidden">
      
      {/* Header Banner with Ambient Zoom */}
      <div className="relative py-28 bg-navy-950 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80"
            alt="Suites & Villas"
            className="w-full h-full object-cover object-center animate-subtle-zoom"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40" />

        <ScrollReveal animation="fade-up" className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
            XYZ Hotel Sanctuary
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
            Suites, Penthouses & Private Villas
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            Each accommodation is oriented toward the horizon, balancing serene contemporary aesthetics with hand-selected natural materials and dedicated butler attention.
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Filter Bar & Disclaimer Strip */}
        <ScrollReveal animation="fade-up" className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-ivory-200 pb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gold-600" />
            <span className="text-xs uppercase tracking-wider text-navy-950 font-bold">Category:</span>
            <div className="flex flex-wrap gap-1.5 ml-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-navy-950 text-gold-300 font-semibold shadow-sm'
                      : 'bg-ivory-200 text-slate-700 hover:bg-ivory-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Rates require reservation confirmation</span>
          </div>
        </ScrollReveal>

        {/* Room Cards Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, idx) => (
            <ScrollReveal key={room._id} animation="fade-up" delay={idx * 100}>
              <RoomCard room={room} />
            </ScrollReveal>
          ))}
        </div>

        {/* Informative Note Box */}
        <ScrollReveal animation="fade-up">
          <div className="bg-ivory-100 rounded-2xl p-6 sm:p-8 border border-ivory-300 text-xs text-slate-600 space-y-2">
            <h4 className="font-serif text-sm font-semibold text-navy-950 uppercase tracking-wider">
              Guest Inclusions & Check-In Information
            </h4>
            <p className="leading-relaxed font-light">
              All suite stays include daily gourmet à la carte breakfast at The Terrace, welcome sommelier wine tasting, access to the heated thalassotherapy pools, and 24-hour butler assistance. Check-in commences at 15:00; check-out is at 11:00 (12:00 for Penthouse & Villa guests).
            </p>
          </div>
        </ScrollReveal>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import RoomCard from '../components/RoomCard';
import { Sparkles, Filter, ShieldAlert } from 'lucide-react';

export default function RoomsPage() {
  const { rooms } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(rooms.map(r => r.category))];

  const filteredRooms = selectedCategory === 'All'
    ? rooms
    : rooms.filter(r => r.category === selectedCategory);

  return (
    <div className="space-y-16 pb-24">
      
      {/* Header Banner */}
      <div className="relative py-24 bg-navy-950 text-white text-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80"
            alt="Suites & Villas"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
            The Grand Azure Sanctuary
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal">
            Suites, Penthouses & Private Villas
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            Each accommodation is oriented toward the Pacific horizon, balancing serene contemporary aesthetics with hand-selected natural materials and dedicated butler attention.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Filter Bar & Disclaimer Strip */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-ivory-200 pb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gold-600" />
            <span className="text-xs uppercase tracking-wider text-navy-950 font-bold">Category:</span>
            <div className="flex flex-wrap gap-1.5 ml-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? 'bg-navy-950 text-gold-300 font-semibold'
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
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map(room => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>

        {/* Informative Note Box */}
        <div className="bg-ivory-100 rounded-xl p-6 border border-ivory-300 text-xs text-slate-600 space-y-2">
          <h4 className="font-serif text-sm font-semibold text-navy-950 uppercase tracking-wider">
            Guest Inclusions & Check-In Information
          </h4>
          <p>
            All suite stays include daily gourmet à la carte breakfast at The Azure Terrace, welcome sommelier wine tasting, access to the heated thalassotherapy pools, and 24-hour butler assistance. Check-in commences at 15:00; check-out is at 11:00 (12:00 for Penthouse & Villa guests).
          </p>
        </div>

      </div>

    </div>
  );
}

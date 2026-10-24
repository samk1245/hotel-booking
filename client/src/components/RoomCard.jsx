import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize2, BedDouble, Eye, ArrowRight, Check } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export default function RoomCard({ room }) {
  const { openInquiryModal } = useHotel();

  const primaryImage = room.images?.find(img => img.isPrimary)?.url || room.images?.[0]?.url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80';

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-ivory-200 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex flex-col group">
      
      {/* Image with Category Badge */}
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
        <img
          src={primaryImage}
          alt={room.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-navy-900/85 backdrop-blur-md border border-gold-400/30 text-gold-300 text-[10px] font-semibold uppercase tracking-widest rounded-full">
            {room.category}
          </span>
        </div>

        {/* Base Price Note Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-ivory-300 block">Indicative Starting Rate</span>
            <span className="text-xl font-serif font-bold text-gold-300">
              ${room.basePrice}
            </span>
            <span className="text-xs text-ivory-300 ml-1">/ night</span>
          </div>

          <div className="text-[10px] bg-emerald-900/80 border border-emerald-700 text-emerald-300 px-2.5 py-1 rounded">
            Confirmation Required
          </div>
        </div>
      </div>

      {/* Room Details & Amenities */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif text-xl font-semibold text-navy-950 group-hover:text-gold-600 transition-colors">
            {room.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
            {room.headline || room.description}
          </p>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-4 my-3 border-y border-ivory-200 text-slate-600 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span>Up to {room.capacity?.totalMax || 3} Guests</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <BedDouble className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span className="truncate">{room.bedType || 'King Bed'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span className="truncate">{room.roomSize || '75 sq m'}</span>
            </div>
          </div>

          {/* Highlight Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                Signature Inclusions
              </span>
              <ul className="text-xs text-slate-700 space-y-1">
                {room.amenities.slice(0, 3).map((amenity, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center space-x-3">
          <Link
            to={`/rooms/${room.slug}`}
            className="flex-1 text-center py-2.5 px-3 border border-navy-800 text-navy-900 rounded text-xs uppercase tracking-wider font-medium hover:bg-navy-950 hover:text-white transition-colors"
          >
            Explore Suite
          </Link>
          <button
            onClick={() => openInquiryModal(room)}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 rounded text-xs uppercase tracking-wider font-semibold shadow-sm hover:shadow transition-all"
          >
            Inquire Now
          </button>
        </div>
      </div>

    </div>
  );
}

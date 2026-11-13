import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize2, BedDouble, Check, ArrowRight } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export default function RoomCard({ room }) {
  const { openInquiryModal } = useHotel();

  const primaryImage = room.images?.find(img => img.isPrimary)?.url || room.images?.[0]?.url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-400 flex flex-col group">
      
      {/* Image Container with Cinematic Zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
        <img
          src={primaryImage}
          alt={room.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-85" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-neutral-900/85 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-widest rounded-full">
            {room.category}
          </span>
        </div>

        {/* Base Price Note Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between text-white">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-300 block font-light">Starting Rate</span>
            <span className="text-2xl font-semibold text-white tracking-tight">
              ₹{room.basePrice?.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-neutral-300 ml-1 font-light">/ night</span>
          </div>

          <div className="text-[10px] bg-white/20 backdrop-blur-md border border-white/30 text-white px-2.5 py-1 rounded-full font-medium">
            Verified
          </div>
        </div>
      </div>

      {/* Room Details & Amenities */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-200">
            {room.name}
          </h3>
          <p className="text-xs text-neutral-500 line-clamp-2 mt-2 leading-relaxed font-light">
            {room.headline || room.description}
          </p>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3 border-y border-neutral-100 text-neutral-600 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
              <span>Up to {room.capacity?.totalMax || 3}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <BedDouble className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
              <span className="truncate">{room.bedType || 'King Bed'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
              <span className="truncate">{room.roomSize || '75 sq m'}</span>
            </div>
          </div>

          {/* Inclusions */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Signature Inclusions
              </span>
              <ul className="text-xs text-neutral-700 space-y-1">
                {room.amenities.slice(0, 3).map((amenity, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <Check className="w-3 h-3 text-neutral-800 shrink-0" />
                    <span className="truncate font-light">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center space-x-3">
          <Link
            to={`/rooms/${room.slug}`}
            className="flex-1 text-center py-2.5 px-3 border border-neutral-300 text-neutral-800 rounded-full text-xs uppercase tracking-wider font-medium hover:bg-neutral-100 transition-colors"
          >
            Explore
          </Link>
          <button
            onClick={() => openInquiryModal(room)}
            className="flex-1 py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs uppercase tracking-wider font-medium transition-colors shadow-sm"
          >
            Inquire
          </button>
        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import LightboxModal from '../components/LightboxModal';
import { Sparkles, Maximize2 } from 'lucide-react';

export default function GalleryPage() {
  const { gallery } = useHotel();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Resort', 'Rooms', 'Dining', 'Wellness'];

  const safeGallery = Array.isArray(gallery) ? gallery : [];

  const filtered = activeCategory === 'All'
    ? safeGallery
    : safeGallery.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-16 pb-24">
      
      {/* Header Banner */}
      <div className="relative py-24 bg-navy-950 text-white text-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80"
            alt="The Grand Azure Photography"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
            Visual Storytelling
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal">
            Hotel Photography & Sanctuaries
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            Take a visual tour through our private suites, cliffside infinity pools, candlelit terraces, and tranquil thalassotherapy gardens.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Category Selector Tabs */}
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-navy-950 text-gold-300 shadow-md'
                  : 'bg-ivory-200 text-slate-700 hover:bg-ivory-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-navy-950 shadow-luxury"
            >
              <img
                src={item.url}
                alt={item.title || 'Resort Photo'}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold px-2 py-0.5 rounded bg-navy-900/80 border border-gold-400/30">
                    {item.category}
                  </span>
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <LightboxModal
            images={filtered}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)}
            onNext={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
          />
        )}

      </div>

    </div>
  );
}

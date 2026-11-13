import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Utensils, Clock, Award, Sparkles, Wine, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function DiningPage() {
  const { dining, hotelInfo, openInquiryModal } = useHotel();

  return (
    <div className="space-y-20 pb-24 overflow-hidden">
      
      {/* Header Banner with Ambient Zoom */}
      <div className="relative py-28 bg-navy-950 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
            alt="Fine Dining"
            className="w-full h-full object-cover object-center animate-subtle-zoom"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40" />

        <ScrollReveal animation="fade-up" className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
            Epicurean Excellence
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
            Gastronomy, Cellars & Tide Bars
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            Savor the bounties of the coastline. Executive Chef Laurent Fournier blends Mediterranean finesse with fresh ocean catch and biodynamic estate vintages.
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Dining Venues Grid */}
        <div className="space-y-20">
          {(Array.isArray(dining) ? dining : []).map((item, idx) => (
            <ScrollReveal 
              key={idx}
              animation={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
              duration={900}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-luxury group bg-navy-950 border border-gold-400/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 bg-navy-900/85 backdrop-blur-md text-gold-300 text-[10px] font-semibold uppercase tracking-widest rounded-full border border-gold-400/30">
                      {item.cuisine}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
                  {item.chef || 'Executive Culinary Program'}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">
                  {item.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="p-5 bg-ivory-100/80 rounded-xl border border-ivory-200 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gold-600" />
                    <span><strong>Operating Hours:</strong> {item.hours}</span>
                  </div>
                  <div>
                    <span><strong>Dress Code:</strong> {item.dressCode}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`tel:${hotelInfo?.contact?.phoneRaw || '+919820123456'}`}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-navy-950 text-gold-300 hover:text-white rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-navy-900 transition-all duration-300 shadow-md group shimmer-button"
                  >
                    <span>Reserve a Table &bull; Front Desk</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Private Dining & Sommelier Section */}
        <ScrollReveal animation="fade-up">
          <div className="bg-navy-950 text-white p-8 sm:p-14 rounded-3xl border border-gold-400/30 grid grid-cols-1 md:grid-cols-2 gap-10 items-center shadow-luxury-lg overflow-hidden">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block">
                Bespoke Experiences
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-snug">
                Private Oceanfront Cabana Dining
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Celebrate your milestone with a bespoke five-course tasting menu served by your personal butler inside a secluded candlelit cabana positioned directly over the tide pools.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openInquiryModal()}
                  className="px-7 py-3.5 bg-gradient-to-r from-gold-300 to-gold-500 text-navy-950 text-xs uppercase tracking-wider font-bold rounded-lg shadow-md hover:from-gold-200 hover:to-gold-400 transition-all duration-300 shimmer-button"
                >
                  Inquire For Private Dining
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] group border border-gold-400/20">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                alt="Private Cabana Dining"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </ScrollReveal>

      </div>

    </div>
  );
}

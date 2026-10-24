import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Utensils, Clock, Award, Sparkles, Wine, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DiningPage() {
  const { dining, hotelInfo, openInquiryModal } = useHotel();

  return (
    <div className="space-y-20 pb-24">
      
      {/* Header Banner */}
      <div className="relative py-24 bg-navy-950 text-white text-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
            alt="Fine Dining"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
            Epicurean Excellence
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal">
            Gastronomy, Cellars & Tide Bars
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            Savor the bounties of the Pacific coastline. Executive Chef Laurent Fournier blends Mediterranean finesse with fresh California catch and biodynamic estate vintages.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Dining Venues Grid */}
        <div className="space-y-16">
          {(Array.isArray(dining) ? dining : []).map((item, idx) => (
            <div 
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-luxury">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-navy-900/80 backdrop-blur-md text-gold-300 text-[10px] font-semibold uppercase tracking-widest rounded-full border border-gold-400/30">
                      {item.cuisine}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
                  {item.chef || 'Executive Culinary Program'}
                </span>
                <h2 className="font-serif text-3xl font-semibold text-navy-950">
                  {item.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="p-4 bg-ivory-100 rounded-lg border border-ivory-200 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-gold-600" />
                    <span><strong>Operating Hours:</strong> {item.hours}</span>
                  </div>
                  <div>
                    <span><strong>Dress Code:</strong> {item.dressCode}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`tel:${hotelInfo?.contact?.phoneRaw || '+18585550199'}`}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-navy-950 text-gold-300 rounded text-xs uppercase tracking-wider font-semibold hover:bg-navy-900 transition-colors"
                  >
                    <span>Reserve a Table &bull; Front Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Dining & Sommelier Section */}
        <div className="bg-navy-950 text-white p-8 sm:p-12 rounded-2xl border border-gold-400/30 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-luxury-lg">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block">
              Bespoke Experiences
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
              Private Oceanfront Cabana Dining
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Celebrate your milestone with a bespoke five-course tasting menu served by your personal butler inside a secluded candlelit cabana positioned directly over the tide pools.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openInquiryModal()}
                className="px-6 py-3 bg-gradient-to-r from-gold-300 to-gold-500 text-navy-950 text-xs uppercase tracking-wider font-bold rounded shadow hover:from-gold-200 hover:to-gold-400 transition-all"
              >
                Inquire For Private Dining
              </button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
              alt="Private Cabana Dining"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

    </div>
  );
}

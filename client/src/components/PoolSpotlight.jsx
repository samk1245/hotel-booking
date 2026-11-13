import React from 'react';
import { Waves, Sparkles, Sun, Thermometer, ArrowRight, Clock } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import ScrollReveal from './ScrollReveal';

export default function PoolSpotlight() {
  const { openInquiryModal } = useHotel();

  return (
    <section className="relative py-24 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] uppercase tracking-[0.25em] font-medium mb-4">
            <Waves className="w-3.5 h-3.5" />
            <span>Aquatic Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
            The Cliffside Infinity Pool &amp; Sunken Ocean Deck
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed font-light">
            Engineered to dissolve effortlessly into the ocean horizon, our 40-meter heated saltwater infinity pool hovers above the pristine coastal surf. Immerse in tranquil waters curated with mineral-rich volcanic stone filtration.
          </p>
        </ScrollReveal>

        {/* Cinematic Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Pool Visual */}
          <ScrollReveal animation="fade-right" duration={900} className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
                alt="Cliffside Infinity Pool at Sunset"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

              {/* Live Spec Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 text-[11px] text-white">
                  <Thermometer className="w-3.5 h-3.5 text-neutral-300" />
                  <span>28°C / 82°F Heated Year-Round</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 text-[11px] text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Saltwater Volcanic Filtered</span>
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block">Exclusive to In-House Guests</span>
                  <p className="text-base sm:text-lg font-medium text-white">Daily 06:00 – 22:00 &bull; Private Twilight Cabana Access</p>
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Card */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 p-5 rounded-2xl shadow-2xl max-w-xs hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Sunset Cabana Service</h4>
                  <p className="text-[11px] text-neutral-400">Fresh cold-pressed botanical refreshments delivered to your sun lounger.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Experience Details & Cabana Action */}
          <ScrollReveal animation="fade-left" duration={900} delay={150} className="lg:col-span-5 space-y-6">
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">Vanishing Horizon Edge</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">
                      Designed with negative-edge stone gutters, creating the visual illusion of stepping directly into the coastal waves.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">Private Shaded Cabanas</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">
                      Ten private teak cabanas equipped with sheer curtains, audio, daybeds, and personal butler summoning service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">Twilight Hydrotherapy Sessions</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">
                      After sunset, underwater warm fiber-optic illumination sets an enchanting mood for evening stargazing and relaxation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cabana Reservation Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => openInquiryModal()}
                className="w-full sm:w-auto text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-full px-7 py-3 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Reserve Pool Cabana</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] text-neutral-400 italic font-light">
                Complimentary for Suite &amp; Villa Guests
              </span>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

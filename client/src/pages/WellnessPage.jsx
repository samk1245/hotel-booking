import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Sparkles, Waves, Heart, Clock, Check, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function WellnessPage() {
  const { wellness, hotelInfo, openInquiryModal } = useHotel();

  const spaTreatments = [
    {
      title: 'Coastal Thalassotherapy Mineral Soak & Wrap',
      duration: '90 Minutes',
      price: '₹12,500 (Indicative)',
      description: 'Heated sea water rich in trace minerals, followed by an organic mineral kelp and clay body mask to restore cellular vitality.'
    },
    {
      title: 'XYZ Signature Restorative Massage',
      duration: '75 Minutes',
      price: '₹9,500 (Indicative)',
      description: 'Long flowing strokes using warm botanical oils to melt muscular tension and soothe the nervous system.'
    },
    {
      title: 'Couples Sunset Ocean Pavilion Ritual',
      duration: '120 Minutes',
      price: '₹24,000 (Indicative)',
      description: 'Side-by-side aromatherapy massages on a private ocean deck, completed with vintage refreshments and fresh berries under the twilight sky.'
    },
    {
      title: 'Deep Cryo & Thermal Recovery Journey',
      duration: '60 Minutes',
      price: '₹8,000 (Indicative)',
      description: 'Alternating sessions between the Himalayan salt sauna (85°C) and the mineral cold plunge (10°C) for immune activation and lymphatic drainage.'
    }
  ];

  return (
    <div className="space-y-20 pb-24 overflow-hidden">
      
      {/* Header Banner with Ambient Zoom */}
      <div className="relative py-28 bg-navy-950 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=80"
            alt="Thalassotherapy & Ocean Spa"
            className="w-full h-full object-cover object-center animate-subtle-zoom"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40" />

        <ScrollReveal animation="fade-up" className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
            Holistic Restoration
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
            The Ocean Spa & Thalasso Sanctuary
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            Draw upon the elemental vitality of the coastline. Spanning 15,000 square feet, our sanctuary fuses ancient marine hydrotherapy with modern restorative science.
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Sanctuary Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal animation="fade-right" duration={850} className="lg:col-span-6 space-y-5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
              Marine Vitality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">
              Heated Mineral Hydrotherapy & Open-Air Pavilions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Water sourced directly from the clean outer shelf of Azure Cove is gently heated and filtered through volcanic stone to preserve revitalizing magnesium and trace elements. Guests enjoy unlimited access to thermal pools, Himalayan salt chambers, and coastal sound bath decks.
            </p>

            {wellness?.features && (
              <div className="space-y-2.5 pt-2">
                <span className="text-xs uppercase tracking-wider text-navy-950 font-bold block">
                  Sanctuary Inclusions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {wellness.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal animation="fade-left" duration={900} delay={150} className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury group bg-navy-950 border border-gold-400/20">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
              alt="Spa Pool"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
          </ScrollReveal>
        </div>

        {/* Treatment Menu Highlights */}
        <div className="space-y-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
              Bespoke Therapies
            </span>
            <h2 className="font-serif text-3xl font-semibold text-navy-950 mt-1">
              Signature Treatment Menu
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-light">
              All appointments are personally customized by our master wellness practitioners following an initial intake consultation.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaTreatments.map((treatment, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                <div className="bg-white p-7 rounded-2xl border border-ivory-200/90 shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 space-y-3.5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-lg font-semibold text-navy-950">
                        {treatment.title}
                      </h3>
                      <span className="text-xs font-semibold text-gold-700 bg-gold-100/70 px-3 py-1 rounded-full whitespace-nowrap">
                        {treatment.price}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 mt-2">
                      <Clock className="w-3.5 h-3.5 text-gold-600" />
                      <span>{treatment.duration}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-light mt-3">
                      {treatment.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Appointment Inquiries Banner */}
        <ScrollReveal animation="fade-up">
          <div className="bg-navy-950 text-white p-8 sm:p-14 rounded-3xl border border-gold-400/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-luxury-lg overflow-hidden">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold">Reserve Your Spa Sanctuary Experience</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg font-light leading-relaxed">
                Spa appointments may be scheduled in advance of your stay or curated during your arrival consultation.
              </p>
            </div>
            <button
              onClick={() => openInquiryModal()}
              className="px-8 py-3.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-navy-950 text-xs uppercase tracking-wider font-bold rounded-lg shadow-md hover:from-gold-200 hover:to-gold-400 transition-all duration-300 shimmer-button shrink-0"
            >
              Inquire For Spa Appointments
            </button>
          </div>
        </ScrollReveal>

      </div>

    </div>
  );
}

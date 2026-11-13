import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Utensils, 
  Waves, 
  ChevronDown, 
  ShieldCheck, 
  Star, 
  Quote, 
  Phone, 
  MessageCircle, 
  Clock,
  Car,
  Plane,
  Anchor,
  MapPin
} from 'lucide-react';

import Hero from '../components/Hero';
import InfiniteMarquee from '../components/InfiniteMarquee';
import PoolSpotlight from '../components/PoolSpotlight';
import ScrollReveal from '../components/ScrollReveal';
import RoomCard from '../components/RoomCard';
import InquiryForm from '../components/InquiryForm';
import InteractiveMap from '../components/InteractiveMap';
import LightboxModal from '../components/LightboxModal';
import { useHotel } from '../context/HotelContext';

export default function HomePage() {
  const { rooms, hotelInfo, dining, wellness, faqs, gallery, testimonials, openInquiryModal } = useHotel();
  
  // Gallery Lightbox State
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const safeGallery = Array.isArray(gallery) ? gallery : [];
  const safeRooms = Array.isArray(rooms) ? rooms : [];
  const safeDining = Array.isArray(dining) ? dining : [];
  const safeFaqs = Array.isArray(faqs) ? faqs : [];
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];

  const filteredGallery = selectedGalleryCategory === 'All'
    ? safeGallery
    : safeGallery.filter(item => item.category === selectedGalleryCategory);

  const galleryCategories = ['All', 'Resort', 'Rooms', 'Dining', 'Wellness'];

  // Curated Nearby Attractions
  const nearbyAttractions = [
    {
      title: 'Azure Cove & Secluded Shoreline',
      distance: 'Direct Access',
      time: '0 min walk',
      description: 'Private stone staircase leading directly down to pristine ocean tide pools and sunrise sands.',
      icon: Waves
    },
    {
      title: 'Private Yacht Marina & Charters',
      distance: '6 km',
      time: '12 mins transfer',
      description: 'Exclusive marina hosting our chartered sunset catamaran excursions and sport fishing.',
      icon: Anchor
    },
    {
      title: 'Historic Fort Aguada & Lighthouse',
      distance: '14 km',
      time: '25 mins drive',
      description: '17th-century coastal fortress offering panoramic open horizon vistas.',
      icon: Compass
    },
    {
      title: 'Goa International Airport (GOI / MOPA)',
      distance: '28 / 52 km',
      time: '45-65 mins',
      description: 'Complimentary luxury house car transfers arranged via concierge for suite guests.',
      icon: Plane
    }
  ];

  return (
    <div className="min-h-screen text-navy-950 space-y-20 sm:space-y-28 pb-24">
      
      {/* 1) Fixed Navbar is rendered globally in PublicLayout */}

      {/* 2) HERO CONTENT with Full-Screen Coastal Imagery & Smooth Entrance */}
      <Hero />

      {/* 3) IMAGE MARQUEE with Seamless Curved Ivory Masks & rAF Momentum Drag */}
      <InfiniteMarquee />

      {/* 4) BOTTOM SECTION — Architectural Editorial Copy & Underlined Text Links */}
      <section className="text-center px-4 sm:px-6 pt-4 pb-8 sm:pb-12 max-w-3xl mx-auto">
        <ScrollReveal animation="fade-up">
          <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-light">
            “We design private sanctuaries and coastal villas from a blank page. No templates, no repeated floorplans, no shortcuts.”
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <button
              onClick={() => openInquiryModal()}
              className="text-gold-600 hover:text-navy-950 font-medium underline underline-offset-4 decoration-gold-400/60 hover:decoration-gold-600 transition-colors"
            >
              Reserve Your Stay
            </button>

            <Link
              to="/rooms"
              className="text-gold-600 hover:text-navy-950 font-medium underline underline-offset-4 decoration-gold-400/60 hover:decoration-gold-600 transition-colors"
            >
              See All Accommodations
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 5) Accommodations: Featured Suites & Villas with Calibrated Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
              Curated Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1 tracking-tight">
              Signature Suites &amp; Standalone Villas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl font-light">
              Each sanctuary is oriented toward the horizon, curated with expansive terraces, spa bathrooms, and uninterrupted ocean vistas.
            </p>
          </div>

          <Link
            to="/rooms"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-600 font-semibold hover:text-navy-950 transition-colors group"
          >
            <span>Explore All 6 Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeRooms.slice(0, 3).map((room, idx) => (
            <ScrollReveal key={room._id} animation="fade-up" delay={idx * 120}>
              <RoomCard room={room} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6) Swimming Pool Spotlight Experience */}
      <PoolSpotlight />

      {/* 7) Curated Resort Facilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
            Exceptional Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1 tracking-tight">
            Curated Resort Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-light">
            From cliffside infinity swimming decks to chauffeured town cars and private yacht excursions, every element is elevated to perfection.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <ScrollReveal animation="fade-up" delay={0}>
            <div className="h-full bg-white p-8 rounded-2xl border border-ivory-200 shadow-luxury hover:border-gold-400/40 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Waves className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy-950 mb-2">
                Cliffside Infinity Pool
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Heated freshwater infinity pool seeming to spill directly into the ocean waves, accompanied by private shaded cabanas and artisan refreshments.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <div className="h-full bg-white p-8 rounded-2xl border border-ivory-200 shadow-luxury hover:border-gold-400/40 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy-950 mb-2">
                Thalassotherapy Spa
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                15,000 square feet of ocean mineral pools, Himalayan salt saunas, and organic botanical rituals inspired by ancient coastal healing.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <div className="h-full bg-white p-8 rounded-2xl border border-ivory-200 shadow-luxury hover:border-gold-400/40 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy-950 mb-2">
                Michelin-Caliber Dining
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Three distinctive oceanfront dining destinations overseen by Chef Laurent Fournier, celebrating local seafood and rare estate vintages.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <div className="h-full bg-white p-8 rounded-2xl border border-ivory-200 shadow-luxury hover:border-gold-400/40 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-terracotta-500 text-white border border-terracotta-400/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy-950 mb-2">
                Private Yacht &amp; House Car
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Complimentary house car transfers within 5 miles, and private chartered sunset sailing excursions departing directly from Azure Marina.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 8) Gastronomy Showcase (Striking Deep Navy Contrast Block) */}
      <section className="bg-navy-950 text-white py-24 relative overflow-hidden border-y border-gold-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <ScrollReveal animation="fade-up" className="max-w-3xl mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block">
              Epicurean Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1 tracking-tight">
              Coastal Gastronomy &amp; Sunset Cellars
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-light">
              Immerse yourself in fresh line-caught seafood, artisanal hand-crafted pasta, and rare biodynamic wines.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {safeDining.map((item, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                <div className="bg-navy-900 rounded-2xl overflow-hidden border border-gold-400/20 flex flex-col justify-between group hover:border-gold-400/50 hover:-translate-y-1.5 transition-all duration-400 h-full shadow-luxury">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80" />
                    </div>

                    <div className="p-6 sm:p-7 space-y-3">
                      <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                        {item.cuisine}
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 border-t border-navy-800 mt-4 space-y-2 text-[11px] text-slate-400 font-light">
                    <div className="flex items-center justify-between">
                      <span><strong>Hours:</strong> {item.hours}</span>
                    </div>
                    <div>
                      <span><strong>Dress:</strong> {item.dressCode}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/dining"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gold-300 font-semibold hover:text-white transition-colors group"
            >
              <span>Explore Menus &amp; Table Reservations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 9) Visual Photo Gallery with Lightbox */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
              Visual Chronicle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1 tracking-tight">
              Sanctuary Photo Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
              Browse authentic imagery of our suites, grounds, dining terraces, and ocean cliffs.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  selectedGalleryCategory === cat
                    ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-navy-950 shadow-md'
                    : 'bg-white text-slate-600 hover:text-navy-950 border border-ivory-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredGallery.map((item, idx) => (
            <ScrollReveal key={item.id || idx} animation="zoom-in" delay={idx * 60}>
              <div
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-ivory-100 shadow-luxury border border-ivory-200"
              >
                <img
                  src={item.url}
                  alt={item.title || 'Resort Photo'}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm font-semibold line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <LightboxModal
            images={filteredGallery}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length)}
            onNext={() => setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)}
          />
        )}
      </section>

      {/* 10) Verified Guest Testimonials */}
      <section className="bg-ivory-100/70 py-24 border-y border-ivory-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
              Authentic Guest Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1 tracking-tight">
              Words From Our Discerning Guests
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
              Read authentic feedback from travelers who have experienced the quiet magic of XYZ Hotel.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeTestimonials.map((t, idx) => (
              <ScrollReveal key={t.id} animation="fade-up" delay={idx * 150}>
                <div className="h-full bg-white p-8 rounded-2xl border border-ivory-200 shadow-luxury hover:border-gold-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 text-gold-500 mb-5">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium ml-2">
                        Verified Stay
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6 font-serif">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ivory-100 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-semibold text-navy-950">{t.guestName}</h4>
                      <span className="text-[11px] text-gold-600">{t.roomType} &bull; {t.stayDate}</span>
                    </div>
                    <Quote className="w-7 h-7 text-gold-400/40" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 11) Location & Nearby Attractions with Interactive Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
            Arrival &amp; Environs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1 tracking-tight">
            Location &amp; Nearby Attractions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
            Discreetly tucked along the serene coast of Goa. Seamlessly reached with personalized airport transfers and concierge house cars.
          </p>
        </ScrollReveal>

        {/* Nearby Attractions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearbyAttractions.map((attraction, idx) => {
            const Icon = attraction.icon;
            return (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-luxury hover:border-gold-400/40 hover:-translate-y-1 transition-all duration-300 space-y-3 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-navy-950 text-gold-400 border border-gold-400/30 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        {attraction.time}
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-semibold text-navy-950">
                      {attraction.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-light">
                      {attraction.description}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] text-slate-500 flex items-center space-x-1 border-t border-ivory-100">
                    <MapPin className="w-3 h-3 text-gold-600" />
                    <span>{attraction.distance} from Resort</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Interactive Map Component */}
        <ScrollReveal animation="fade-up" delay={200}>
          <InteractiveMap
            address={hotelInfo?.address}
            coordinates={hotelInfo?.coordinates}
          />
        </ScrollReveal>
      </section>

      {/* 12) Booking Inquiry Form Section */}
      <section id="inquiry-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <InquiryForm />
        </ScrollReveal>
      </section>

      {/* 13) Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
            Guest Assistance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
            Details regarding our booking inquiry procedure, check-in policies, and concierge services.
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {safeFaqs.map((faq, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 60}>
              <div 
                className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-navy-950 hover:text-gold-600 transition-colors"
                >
                  <span className="font-serif text-sm sm:text-base font-semibold pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gold-600 shrink-0 transition-transform duration-300 ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-ivory-100 pt-3 animate-fade-in font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 14) Direct Concierge Channels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-400/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-luxury-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                Direct Contact Channels
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold mt-1 tracking-tight">
                Speak with Our Reservations Concierge
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl font-light">
                Prefer speaking directly with a host? Our dedicated desk is available 24 hours daily to assist with customized itineraries, private dining, or suite selections.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto relative z-10">
              <a
                href={`https://wa.me/${hotelInfo?.contact?.whatsapp || '919820123456'}?text=Hello%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20stay.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-wider font-semibold rounded-full shadow-md flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>

              <a
                href={`tel:${hotelInfo?.contact?.phoneRaw || '+919820123456'}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-navy-900 hover:bg-navy-800 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-wider font-semibold rounded-full flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>Call: {hotelInfo?.contact?.phone || '+91 98201 23456'}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}

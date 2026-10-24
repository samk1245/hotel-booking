import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Utensils, 
  Waves, 
  HeartHandshake, 
  ChevronDown, 
  ShieldCheck, 
  Star,
  Quote,
  Phone,
  Mail,
  MessageCircle,
  Clock
} from 'lucide-react';
import Hero from '../components/Hero';
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

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Introductory Narrative & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-gold-600 text-xs uppercase tracking-[0.25em] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Timeless Coastal Sanctuary</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-950 font-normal leading-[1.15]">
              A Private Haven Where the Pacific Meets Refined Luxury
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              Resting atop the dramatic bluffs of Azure Cove, The Grand Azure Resort & Spa was conceived as an architectural tribute to the natural beauty of the California coastline. Here, handcrafted teak wood, Italian marble, and fragrant Mediterranean gardens frame panoramic ocean vistas.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              Whether relaxing in your private heated plunge pool, dining under the stars at The Azure Terrace, or experiencing the restorative benefits of thalassotherapy, our devoted concierges curate every moment with unhurried warmth and genuine discretion.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                to="/rooms"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-navy-950 text-gold-300 hover:text-white rounded text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
              >
                <span>View Suites & Villas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              
              <Link
                to="/wellness"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-navy-800 text-navy-900 rounded text-xs uppercase tracking-[0.18em] font-semibold hover:bg-ivory-100 transition-colors"
              >
                <span>Explore Thalasso Spa</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                  alt="Azure Suite Interior"
                  className="rounded-lg object-cover w-full h-64 sm:h-72 shadow-luxury"
                />
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Fine Dining at The Azure Terrace"
                  className="rounded-lg object-cover w-full h-44 sm:h-52 shadow-luxury"
                />
              </div>

              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
                  alt="Ocean Spa Hydrotherapy"
                  className="rounded-lg object-cover w-full h-44 sm:h-52 shadow-luxury"
                />
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Penthouse Lounge"
                  className="rounded-lg object-cover w-full h-64 sm:h-72 shadow-luxury"
                />
              </div>
            </div>

            {/* Floating Luxury Stamp */}
            <div className="absolute -bottom-6 -left-6 bg-navy-900/90 text-ivory-100 p-5 rounded-lg border border-gold-400/40 backdrop-blur-md shadow-2xl hidden sm:block max-w-xs">
              <div className="font-serif text-2xl text-gold-300 font-bold">100%</div>
              <p className="text-xs text-slate-300 mt-1 leading-snug">
                Private ocean suites & villas with tailored personal concierge service.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Suites & Villas */}
      <section className="bg-ivory-100/60 py-20 border-y border-ivory-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
                Accommodations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1">
                Signature Suites & Standalone Villas
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl">
                Each sanctuary is curated with expansive terraces, spa bathrooms, and uninterrupted vistas of the open ocean.
              </p>
            </div>

            <Link
              to="/rooms"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-navy-950 font-semibold hover:text-gold-600 transition-colors"
            >
              <span>Explore All 6 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeRooms.slice(0, 3).map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Signature Experiences & Amenities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
            Exceptional Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1">
            Curated Resort Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            From sunrise yoga on cliffside pavilions to chauffeured town cars and private yacht charters, every element is elevated to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center mb-6">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-navy-950 mb-2">
              Cliffside Infinity Pool
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Heated freshwater infinity pool seeming to spill directly into the Pacific waves, accompanied by private shaded cabanas and artisan refreshments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-emerald-900 text-emerald-300 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-navy-950 mb-2">
              Thalassotherapy Spa
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              15,000 square feet of ocean mineral pools, Himalayan salt saunas, and organic botanical rituals inspired by ancient Mediterranean healing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center mb-6">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-navy-950 mb-2">
              Michelin-Caliber Dining
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Three distinctive oceanfront dining destinations overseen by Chef Laurent Fournier, celebrating local seafood and rare estate vintages.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-terracotta-500 text-white flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-navy-950 mb-2">
              Private Yacht & House Car
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complimentary house car transfers within 5 miles, and private chartered sunset sailing excursions departing directly from Azure Marina.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Dining Destinations Showcase */}
      <section className="bg-navy-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block">
              Culinary Artistry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
              Coastal Gastronomy & Sunset Mixology
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Immerse yourself in fresh Pacific line-caught seafood, artisanal pasta, and rare biodynamic wines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {safeDining.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-navy-900 rounded-xl overflow-hidden border border-navy-800 flex flex-col justify-between group hover:border-gold-400/40 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                      {item.cuisine}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-navy-800/80 mt-4 space-y-2 text-[11px] text-slate-400">
                  <div className="flex items-center justify-between">
                    <span><strong>Hours:</strong> {item.hours}</span>
                  </div>
                  <div>
                    <span><strong>Dress:</strong> {item.dressCode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/dining"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gold-300 font-semibold hover:text-white transition-colors"
            >
              <span>Explore Menus & Table Reservations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Visual Photo Gallery with Lightbox */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
              Visual Chronicle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1">
              Sanctuary Photo Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Browse authentic imagery of our suites, grounds, dining terraces, and ocean cliffs.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  selectedGalleryCategory === cat
                    ? 'bg-navy-950 text-gold-300 shadow-sm'
                    : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-navy-950 shadow-luxury"
            >
              <img
                src={item.url}
                alt={item.title || 'Resort Photo'}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-semibold line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
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

      {/* 7. Authentic Verified Traveler Testimonials */}
      <section className="bg-ivory-100/70 py-20 border-y border-ivory-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
              Authentic Guest Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1">
              Words From Our Discerning Guests
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Read authentic feedback from travelers who have experienced the quiet magic of The Grand Azure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeTestimonials.map(t => (
              <div 
                key={t.id} 
                className="bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-gold-500 mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium ml-2">
                      Verified Stay
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6 font-serif">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-ivory-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-navy-950">{t.guestName}</h4>
                    <span className="text-[11px] text-slate-400">{t.roomType} &bull; {t.stayDate}</span>
                  </div>
                  <Quote className="w-6 h-6 text-gold-300/40" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Interactive Location, Map & Street View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
            Arrival & Environs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1">
            Location & Interactive Directions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Discreetly tucked along the Pacific coast of La Jolla. Easily accessible from regional international airports.
          </p>
        </div>

        <InteractiveMap
          address={hotelInfo?.address}
          coordinates={hotelInfo?.coordinates}
        />
      </section>

      {/* 9. Booking Inquiry Form Section */}
      <section id="inquiry-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <InquiryForm />
      </section>

      {/* 10. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
            Guest Assistance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Details regarding our booking inquiry procedure, check-in policies, and concierge services.
          </p>
        </div>

        <div className="space-y-3">
          {safeFaqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-lg border border-ivory-200 overflow-hidden shadow-sm transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                className="w-full text-left p-5 flex items-center justify-between text-navy-950 hover:text-gold-600 transition-colors"
              >
                <span className="font-serif text-sm sm:text-base font-semibold pr-4">
                  {faq.question}
                </span>
                <ChevronDown className={`w-4 h-4 text-gold-500 shrink-0 transition-transform duration-200 ${
                  openFaqIndex === idx ? 'rotate-180' : ''
                }`} />
              </button>
              
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-ivory-100 pt-3 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. Quick Concierge Call & WhatsApp Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white rounded-2xl p-8 sm:p-12 border border-gold-400/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-luxury-lg">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
              Direct Contact Channels
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold mt-1">
              Speak with Our Reservations Concierge
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              Prefer speaking directly with a host? Our dedicated desk is available 24 hours daily to assist with customized itineraries, private dining, or suite selections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href={`https://wa.me/${hotelInfo?.contact?.whatsapp || '18585550199'}?text=Hello%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20stay.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-wider font-semibold rounded shadow flex items-center justify-center space-x-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>

            <a
              href={`tel:${hotelInfo?.contact?.phoneRaw || '+18585550199'}`}
              className="w-full sm:w-auto px-6 py-3 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-gold-300 text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center space-x-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {hotelInfo?.contact?.phone || '+1 (858) 555-0199'}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

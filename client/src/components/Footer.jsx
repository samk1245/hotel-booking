import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, Clock, Award, ChevronRight } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export default function Footer() {
  const { hotelInfo } = useHotel();
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'privacy' | 'terms' | null

  const phone = hotelInfo?.contact?.phone || '+1 (858) 555-0199';
  const phoneRaw = hotelInfo?.contact?.phoneRaw || '+18585550199';
  const email = hotelInfo?.contact?.email || 'concierge@grandazureresort.com';
  const whatsapp = hotelInfo?.contact?.whatsapp || '18585550199';
  const address = hotelInfo?.address?.full || '420 Ocean Promenade, Azure Cove, CA 92037, USA';

  return (
    <footer className="bg-navy-950 text-ivory-200 border-t border-navy-800">
      {/* Upper Luxury Trust Strip */}
      <div className="border-b border-navy-800/80 py-8 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <Award className="w-8 h-8 text-gold-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-ivory-100">Forbes Verified Sanctuary</h4>
              <p className="text-xs text-navy-200/70 text-slate-400">Awarded for peerless hospitality standards & pristine ocean vistas</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <Clock className="w-8 h-8 text-gold-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-ivory-100">Bespoke 24/7 Concierge</h4>
              <p className="text-xs text-slate-400">Personalized arrival curation, private house cars & itinerary planning</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3.5">
            <ShieldCheck className="w-8 h-8 text-gold-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-ivory-100">Guaranteed Hospitality Notice</h4>
              <p className="text-xs text-slate-400">Inquiries prioritized & verified directly with our reservation managers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full border border-gold-400/60 flex items-center justify-center bg-navy-900">
              <span className="font-serif font-bold text-gold-400 text-sm tracking-wider">GA</span>
            </div>
            <span className="font-serif text-lg text-white tracking-widest uppercase font-semibold">
              The Grand Azure
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A Pacific sanctuary of timeless elegance, private suites, and restorative coastal wellness. Discreet bespoke service set against California’s ocean cliffs.
          </p>
          <div className="pt-2 flex items-center space-x-4">
            <a 
              href={`https://wa.me/${whatsapp}?text=Hello%20Concierge,%20I%20am%20inquiring%20about%20a%20stay.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs hover:bg-emerald-800/80 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
              WhatsApp Concierge
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="font-serif text-sm tracking-widest uppercase text-gold-400 mb-4 font-semibold">
            Explore Sanctuary
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <Link to="/rooms" className="hover:text-gold-300 transition-colors flex items-center">
                <ChevronRight className="w-3 h-3 mr-1 text-gold-500" /> Ocean Suites & Private Villas
              </Link>
            </li>
            <li>
              <Link to="/dining" className="hover:text-gold-300 transition-colors flex items-center">
                <ChevronRight className="w-3 h-3 mr-1 text-gold-500" /> Fine Dining & Tide Bar
              </Link>
            </li>
            <li>
              <Link to="/wellness" className="hover:text-gold-300 transition-colors flex items-center">
                <ChevronRight className="w-3 h-3 mr-1 text-gold-500" /> Thalassotherapy & Spa
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-gold-300 transition-colors flex items-center">
                <ChevronRight className="w-3 h-3 mr-1 text-gold-500" /> Visual Photography Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold-300 transition-colors flex items-center">
                <ChevronRight className="w-3 h-3 mr-1 text-gold-500" /> Location, Maps & Directions
              </Link>
            </li>
          </ul>
        </div>

        {/* Hotel Policies & Verification */}
        <div>
          <h4 className="font-serif text-sm tracking-widest uppercase text-gold-400 mb-4 font-semibold">
            Verified Information
          </h4>
          <div className="space-y-3 text-xs text-slate-400">
            <p>
              <strong className="text-ivory-200 block">Check-in:</strong> 15:00 (3:00 PM) &bull; <strong className="text-ivory-200">Check-out:</strong> 11:00 AM
            </p>
            <p>
              <strong className="text-ivory-200 block">Reservations Policy:</strong> Booking inquiries on this site do not charge your card. Room confirmation occurs once our reservation desk confirms availability with you.
            </p>
            <p>
              <strong className="text-ivory-200 block">Smoke-Free Sanctuary:</strong> All suites and indoor premises are strictly smoke-free.
            </p>
          </div>
        </div>

        {/* Contact & Location */}
        <div>
          <h4 className="font-serif text-sm tracking-widest uppercase text-gold-400 mb-4 font-semibold">
            Concierge & Location
          </h4>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>{address}</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <a href={`tel:${phoneRaw}`} className="hover:text-gold-300 transition-colors">
                {phone}
              </a>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-gold-300 transition-colors truncate">
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-navy-900 bg-navy-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} The Grand Azure Resort & Spa. All rights reserved. Authentic luxury hospitality.
          </p>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveLegalModal('privacy')} 
              className="hover:text-gold-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActiveLegalModal('terms')} 
              className="hover:text-gold-400 transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => setActiveLegalModal('rates')} 
              className="hover:text-gold-400 transition-colors"
            >
              Rate Notice
            </button>
          </div>
        </div>
      </div>

      {/* Legal Information Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-navy-950 rounded-lg max-w-lg w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-navy-950 mb-3 border-b border-ivory-200 pb-2">
              {activeLegalModal === 'privacy' && 'Privacy Notice & Guest Data Policy'}
              {activeLegalModal === 'terms' && 'Terms of Inquiry & Reservation Policy'}
              {activeLegalModal === 'rates' && 'Verified Rates & Availability Notice'}
            </h3>
            
            <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
              {activeLegalModal === 'privacy' && (
                <>
                  <p>The Grand Azure Resort & Spa is committed to safeguarding the privacy and personal information of our guests.</p>
                  <p>When you submit a booking inquiry through our website, we collect your name, contact information, desired dates, and stay requirements solely to process your booking request and facilitate correspondence.</p>
                  <p>We do not sell, rent, or trade guest personal information to third parties. All inquiries are securely handled in accordance with modern data protection regulations.</p>
                </>
              )}

              {activeLegalModal === 'terms' && (
                <>
                  <p>Submitting an inquiry through this website registers a reservation request with our front desk team. It does not constitute a guaranteed booking until our reservation team reviews room inventory and provides formal confirmation.</p>
                  <p>No credit card charges occur on this inquiry portal. Payment guarantees, deposits, and cancellation terms are settled directly with the hotel upon confirmation.</p>
                </>
              )}

              {activeLegalModal === 'rates' && (
                <>
                  <p>Prices listed on this website represent authorized starting baseline rates for standard seasonal periods.</p>
                  <p>Final total pricing, including local lodging taxes, resort inclusions, and custom enhancements, will be clearly presented in the formal quote sent by our reservation manager prior to confirmation.</p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 bg-navy-900 text-ivory-100 rounded text-xs uppercase tracking-wider hover:bg-navy-800"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

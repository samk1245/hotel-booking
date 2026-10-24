import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { api } from '../services/api';
import InteractiveMap from '../components/InteractiveMap';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Car,
  Plane,
  Anchor
} from 'lucide-react';

export default function ContactPage() {
  const { hotelInfo } = useHotel();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    honeypot: '' // spam trap
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      setLoading(true);
      const res = await api.submitContact(formData);
      setSuccessMsg(res.message || 'Your inquiry has been received with thanks.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
        honeypot: ''
      });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to transmit message. Please contact us via phone.');
    } finally {
      setLoading(false);
    }
  };

  const phone = hotelInfo?.contact?.phone || '+1 (858) 555-0199';
  const phoneRaw = hotelInfo?.contact?.phoneRaw || '+18585550199';
  const email = hotelInfo?.contact?.email || 'concierge@grandazureresort.com';
  const whatsapp = hotelInfo?.contact?.whatsapp || '18585550199';
  const address = hotelInfo?.address?.full || '420 Ocean Promenade, Azure Cove, CA 92037, USA';

  return (
    <div className="space-y-20 pb-24">
      
      {/* Header Banner */}
      <div className="relative py-24 bg-navy-950 text-white text-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
            alt="Coastline"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
            Discreet Communication
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal">
            Location, Directions & Concierge Desk
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            Our guest relations team is at your disposal 24 hours daily. Inquire regarding arrivals, private charter transfers, or custom event hosting.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phone Card */}
          <div className="bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-navy-950 text-gold-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy-950">Direct Telephony</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reach our front desk directly for reservations, arrival logistics, and immediate concierge requests.
              </p>
            </div>
            <a
              href={`tel:${phoneRaw}`}
              className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors pt-2 block border-t border-ivory-200"
            >
              {phone}
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-navy-950 text-gold-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy-950">Electronic Mail</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Send your itinerary questions or special requests. Our team responds within 2 to 4 business hours.
              </p>
            </div>
            <a
              href={`mailto:${email}`}
              className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors pt-2 block border-t border-ivory-200 truncate"
            >
              {email}
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-navy-950">WhatsApp Concierge</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant encrypted mobile messaging with our on-duty front desk host for quick answers.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsapp}?text=Hello%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20stay.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-600 transition-colors pt-2 block border-t border-ivory-200"
            >
              Start WhatsApp Conversation &rarr;
            </a>
          </div>

        </div>

        {/* Interactive Location Map Component */}
        <div className="space-y-4">
          <div className="text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
              Verified Map Coordinates
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy-950 mt-1">
              Interactive Navigation & Street View
            </h2>
          </div>
          <InteractiveMap
            address={hotelInfo?.address}
            coordinates={hotelInfo?.coordinates}
          />
        </div>

        {/* Driving Directions & Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Driving Directions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-ivory-200 shadow-luxury space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-600 font-semibold block">
                Transportation & Logistics
              </span>
              <h3 className="font-serif text-xl font-semibold text-navy-950">
                Directions to The Sanctuary
              </h3>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="border-l-2 border-gold-500 pl-3">
                  <strong className="text-navy-950 block">From San Diego Int’l Airport (SAN) — 22 min (14 miles):</strong>
                  Take I-5 North toward La Jolla. Take Exit 26B for La Jolla Parkway. Follow Torrey Pines Road onto Prospect Street, turning right onto Ocean Promenade. The private resort gates will be on your left.
                </div>

                <div className="border-l-2 border-gold-500 pl-3">
                  <strong className="text-navy-950 block">From Los Angeles (LAX) — 1h 45 min (110 miles):</strong>
                  Take I-405 South merging onto I-5 South toward San Diego. Take Exit 28 for La Jolla Village Drive, proceed west toward Torrey Pines Road and onto Ocean Promenade.
                </div>

                <div className="border-l-2 border-emerald-600 pl-3 bg-emerald-50/50 p-2 rounded-r">
                  <strong className="text-emerald-950 block">Valet & Chauffeur Services:</strong>
                  Complimentary valet parking is provided to all registered suite guests. Electric vehicle high-speed charging bays are available on premises.
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with Spam Honeypot */}
          <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-ivory-200 shadow-luxury space-y-5">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-600 font-semibold block">
                Direct Inquiry Form
              </span>
              <h3 className="font-serif text-2xl font-semibold text-navy-950 mt-1">
                Send a Message to the Concierge
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                For room reservations, please utilize the booking inquiry system; for general questions or dining requests, submit below.
              </p>
            </div>

            {successMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Spam Trap Honeypot field (hidden from real users) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Marcus Sterling"
                    required
                    className="w-full bg-ivory-50 border border-slate-300 rounded px-3 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. marcus@example.com"
                    required
                    className="w-full bg-ivory-50 border border-slate-300 rounded px-3 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (858) 555-0199"
                    className="w-full bg-ivory-50 border border-slate-300 rounded px-3 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-ivory-50 border border-slate-300 rounded px-3 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
                  >
                    <option value="General Inquiry">General Guest Inquiry</option>
                    <option value="Dining Reservation">Dining / Table Reservation</option>
                    <option value="Spa Appointment">Spa / Thalassotherapy Inquiry</option>
                    <option value="Airport Transfer">Private Chauffeur / Transfer</option>
                    <option value="Private Event">Bespoke Event / Wedding Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How may our concierge assist your upcoming visit?"
                  required
                  className="w-full bg-ivory-50 border border-slate-300 rounded px-3 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-navy-950 text-gold-300 hover:text-white rounded text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Transmitting...' : 'Send Message to Concierge'}</span>
              </button>

            </form>
          </div>

        </div>

      </div>

    </div>
  );
}

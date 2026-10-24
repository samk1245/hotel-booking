import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import InquiryForm from '../components/InquiryForm';
import { 
  Users, 
  BedDouble, 
  Maximize2, 
  Eye, 
  Layers, 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Phone
} from 'lucide-react';

export default function RoomDetailPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const data = await api.getRoomBySlug(slug);
        setRoom(data.room);
      } catch (err) {
        setError(err.message || 'Room not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl text-navy-950 font-bold">Suite Unavailable</h2>
        <p className="text-slate-500 text-sm">{error || 'The requested room could not be found.'}</p>
        <Link
          to="/rooms"
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-navy-950 text-gold-300 rounded text-xs uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Return to All Suites
        </Link>
      </div>
    );
  }

  const images = room.images || [];
  const primaryImage = images[activeImageIndex]?.url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="space-y-12 pb-24">
      
      {/* Breadcrumb / Top Return */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/rooms"
          className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-navy-950 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Suites & Villas</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Details & Photos, Right Booking Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (Photos, Specs, Description, Amenities, Policies) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Photo Showcase */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-navy-950 shadow-luxury">
                <img
                  src={primaryImage}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-navy-900/80 backdrop-blur-md text-gold-300 text-[10px] font-semibold uppercase tracking-widest rounded-full border border-gold-400/30">
                    {room.category}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-gold-500 ring-2 ring-gold-400/30' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.caption || room.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Title & Headline */}
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-semibold block">
                Sanctuary Suite Details
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950 mt-1">
                {room.name}
              </h1>
              <p className="text-sm text-gold-700 font-serif italic mt-1.5">
                {room.headline}
              </p>
            </div>

            {/* Key Specs Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-ivory-100/70 rounded-xl border border-ivory-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Occupancy</span>
                <span className="font-semibold text-navy-950 flex items-center mt-1">
                  <Users className="w-3.5 h-3.5 text-gold-600 mr-1.5" />
                  Max {room.capacity?.totalMax || 3} Guests
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Bed Setup</span>
                <span className="font-semibold text-navy-950 flex items-center mt-1">
                  <BedDouble className="w-3.5 h-3.5 text-gold-600 mr-1.5" />
                  {room.bedType || '1 King Bed'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Room Size</span>
                <span className="font-semibold text-navy-950 flex items-center mt-1">
                  <Maximize2 className="w-3.5 h-3.5 text-gold-600 mr-1.5" />
                  {room.roomSize || '75 sq m'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Orientation</span>
                <span className="font-semibold text-navy-950 flex items-center mt-1">
                  <Eye className="w-3.5 h-3.5 text-gold-600 mr-1.5" />
                  {room.view || 'Ocean View'}
                </span>
              </div>
            </div>

            {/* Room Story & Description */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold text-navy-950">
                About This Accommodation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-4 pt-4 border-t border-ivory-200">
              <h3 className="font-serif text-xl font-semibold text-navy-950">
                Amenities & Bespoke Inclusions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                {room.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-3 pt-4 border-t border-ivory-200 bg-ivory-50 p-5 rounded-lg border border-ivory-200 text-xs text-slate-600">
              <h4 className="font-serif text-sm font-semibold text-navy-950 uppercase tracking-wider">
                Suite Policies & Cancellation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                <div><strong>Official Check-in:</strong> {room.policies?.checkIn || '15:00'}</div>
                <div><strong>Official Check-out:</strong> {room.policies?.checkOut || '11:00'}</div>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                <strong>Cancellation Notice:</strong> {room.policies?.cancellation || 'Complimentary cancellation up to 48 hours prior to arrival.'}
              </p>
            </div>

          </div>

          {/* Right Column: Sticky Booking Inquiry Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              
              {/* Pricing Callout Card */}
              <div className="bg-navy-950 text-white p-6 rounded-xl border border-gold-400/40 shadow-luxury space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                      Indicative Starting Rate
                    </span>
                    <span className="font-serif text-3xl font-bold text-gold-300">
                      ₹{room.basePrice?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">/ night</span>
                  </div>
                  <span className="text-[10px] bg-emerald-900/80 border border-emerald-700 text-emerald-300 px-2.5 py-1 rounded">
                    Subject to Confirmation
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-navy-800 pt-3">
                  All published rates are verified baseline figures. Our reservations team will confirm live dates and any customized inclusions upon inquiry review.
                </p>
              </div>

              {/* Direct Booking Inquiry Form */}
              <InquiryForm initialRoom={room} />

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

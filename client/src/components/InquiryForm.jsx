import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, Users, Home, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../services/api';
import { useHotel } from '../context/HotelContext';

export default function InquiryForm({ initialRoom = null, onSuccess = null }) {
  const { rooms } = useHotel();

  // Tomorrow & 4 days later default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDefault = new Date(tomorrow);
  checkoutDefault.setDate(tomorrow.getDate() + 3);

  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkInDate: initialRoom?.checkInDate || tomorrow.toISOString().split('T')[0],
    checkOutDate: initialRoom?.checkOutDate || checkoutDefault.toISOString().split('T')[0],
    adults: initialRoom?.adults || 2,
    children: initialRoom?.children || 0,
    preferredRoomId: initialRoom?._id || '',
    preferredRoomName: initialRoom?.name || 'Any Available Suite',
    roomCount: 1,
    specialRequests: '',
    consentPrivacy: false
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Sync if initialRoom updates
  useEffect(() => {
    if (initialRoom) {
      setFormData(prev => ({
        ...prev,
        preferredRoomId: initialRoom._id || prev.preferredRoomId,
        preferredRoomName: initialRoom.name || prev.preferredRoomName,
        checkInDate: initialRoom.checkInDate || prev.checkInDate,
        checkOutDate: initialRoom.checkOutDate || prev.checkOutDate,
        adults: initialRoom.adults || prev.adults
      }));
    }
  }, [initialRoom]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // If preferred room select changed
    if (name === 'preferredRoomId') {
      const selected = rooms.find(r => r._id === value);
      setFormData(prev => ({
        ...prev,
        preferredRoomId: value,
        preferredRoomName: selected ? selected.name : 'Any Available Suite'
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setValidationErrors([]);

    // Client-side quick check
    if (!formData.consentPrivacy) {
      setErrorMsg('Please review and check the consent box for our privacy notice.');
      return;
    }

    if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
      setErrorMsg('Check-out date must be after your arrival date.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.submitInquiry(formData);
      setSubmissionSuccess({
        reference: res.inquiryReference,
        guestName: formData.guestName,
        email: formData.email,
        room: formData.preferredRoomName,
        checkIn: formData.checkInDate,
        checkOut: formData.checkOutDate
      });

      if (onSuccess) onSuccess(res.inquiryReference);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to transmit booking inquiry. Please check your network or phone our concierge.');
      if (err.errors) setValidationErrors(err.errors);
    } finally {
      setLoading(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gold-300 shadow-luxury text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-widest text-emerald-700 font-semibold bg-emerald-100/70 px-3 py-1 rounded-full">
            Inquiry Acknowledged
          </span>
          <h3 className="font-serif text-2xl font-bold text-navy-950 mt-3">
            Thank You, {submissionSuccess.guestName}
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            Your booking inquiry has been registered with our private reservations team. An acknowledgment receipt has been transmitted to <strong className="text-navy-950">{submissionSuccess.email}</strong>.
          </p>
        </div>

        {/* Reference Highlight Box */}
        <div className="bg-ivory-100 border border-gold-400/40 rounded-lg p-5 max-w-md mx-auto text-left space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-gold-600 font-semibold">
            Inquiry Reference Number
          </div>
          <div className="font-mono text-2xl font-bold text-navy-950 tracking-wider">
            {submissionSuccess.reference}
          </div>
          <div className="text-xs text-slate-500 pt-2 border-t border-ivory-200 space-y-1">
            <div><strong>Suite Requested:</strong> {submissionSuccess.room}</div>
            <div><strong>Stay Dates:</strong> {submissionSuccess.checkIn} &rarr; {submissionSuccess.checkOut}</div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200/80 rounded p-4 max-w-md mx-auto text-[11px] text-amber-800 flex items-start space-x-2 text-left">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Boutique Hospitality Note:</strong> This is an inventory inquiry. Accommodations and final confirmed rates are formally reserved once verified by our reservation manager within 2 to 4 hours.
          </span>
        </div>

        <button
          onClick={() => {
            setSubmissionSuccess(null);
            setFormData(prev => ({
              ...prev,
              guestName: '',
              email: '',
              phone: '',
              specialRequests: '',
              consentPrivacy: false
            }));
          }}
          className="px-6 py-2.5 bg-navy-950 text-gold-300 rounded text-xs uppercase tracking-widest hover:bg-navy-900 transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-ivory-200 shadow-luxury">
      
      {/* Title */}
      <div className="border-b border-ivory-200 pb-5 mb-6">
        <span className="text-[11px] uppercase tracking-[0.2em] text-gold-600 font-semibold block">
          Private Reservations Desk
        </span>
        <h3 className="font-serif text-2xl font-semibold text-navy-950 mt-1">
          Bespoke Booking Inquiry
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          Reserve your preferred dates. Our personal concierge team will verify suite inventory and contact you with a tailored reservation itinerary.
        </p>
      </div>

      {/* Errors */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">{errorMsg}</div>
            {validationErrors.length > 0 && (
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name, Email, Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
              Full Guest Name *
            </label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              placeholder="e.g. Eleanor Vance"
              required
              className="w-full bg-ivory-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. eleanor@example.com"
              required
              className="w-full bg-ivory-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
              Contact Phone / Mobile *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (858) 555-0199"
              required
              className="w-full bg-ivory-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        {/* Dates and Suite */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
              Arrival Date *
            </label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
              required
              className="w-full bg-ivory-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
              Departure Date *
            </label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              min={formData.checkInDate}
              onChange={handleChange}
              required
              className="w-full bg-ivory-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
              Adults & Children *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                className="w-full bg-ivory-50 border border-slate-300 rounded-md px-2.5 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
                <option value="5">5+ Adults</option>
              </select>
              <select
                name="children"
                value={formData.children}
                onChange={handleChange}
                className="w-full bg-ivory-50 border border-slate-300 rounded-md px-2.5 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
              >
                <option value="0">0 Children</option>
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
                <option value="3">3 Children</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
              Number of Suites
            </label>
            <select
              name="roomCount"
              value={formData.roomCount}
              onChange={handleChange}
              className="w-full bg-ivory-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
            >
              <option value="1">1 Suite / Villa</option>
              <option value="2">2 Suites</option>
              <option value="3">3 Suites</option>
              <option value="4">4+ Suites (Group Retreat)</option>
            </select>
          </div>
        </div>

        {/* Preferred Suite Selection */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
            Preferred Accommodation Tier
          </label>
          <select
            name="preferredRoomId"
            value={formData.preferredRoomId}
            onChange={handleChange}
            className="w-full bg-ivory-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
          >
            <option value="">Any Available Category (Concierge Recommended)</option>
            {rooms.map(room => (
              <option key={room._id} value={room._id}>
                {room.name} — ({room.category}, from ${room.basePrice}/night)
              </option>
            ))}
          </select>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-navy-900 font-medium mb-1.5">
            Special Requests, Dietary & Arrival Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            name="specialRequests"
            rows="3"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="e.g. Dietary preferences, celebratory anniversary champagne, high floor preference, airport chauffeur inquiry..."
            className="w-full bg-ivory-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-xs text-navy-950 focus:outline-none focus:border-gold-500 resize-none"
          />
        </div>

        {/* Important Hospitality Notice */}
        <div className="bg-amber-50/70 border border-amber-200 rounded p-4 text-[11px] text-amber-900 space-y-1">
          <div className="flex items-center space-x-1.5 font-semibold text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Important Luxury Hospitality Notice</span>
          </div>
          <p className="leading-relaxed">
            This is an official booking inquiry system. Submitting this request does not charge your card or guarantee room availability until our personal concierge team reviews actual live inventory and confirms your reservation.
          </p>
        </div>

        {/* Privacy Consent Checkbox */}
        <div className="flex items-start space-x-3 pt-1">
          <input
            type="checkbox"
            id="consentPrivacy"
            name="consentPrivacy"
            checked={formData.consentPrivacy}
            onChange={handleChange}
            required
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-gold-600 focus:ring-gold-500"
          />
          <label htmlFor="consentPrivacy" className="text-xs text-slate-600 leading-normal">
            I consent to The Grand Azure Resort & Spa processing my contact details to evaluate suite availability, dispatch my booking inquiry acknowledgment, and communicate directly regarding this stay in accordance with the hotel’s privacy notice. *
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-6 rounded text-xs uppercase tracking-[0.2em] font-semibold text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span>Transmitting Inquiry...</span>
            ) : (
              <span>Submit Booking Inquiry &bull; Priority Hold</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

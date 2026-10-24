import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Save, CheckCircle2, AlertCircle, Building, Phone, MapPin, Shield } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function AdminContentPage() {
  const { hotelInfo: contextInfo, refreshData } = useHotel();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    if (contextInfo) {
      setFormData(JSON.parse(JSON.stringify(contextInfo)));
    }
  }, [contextInfo]);

  if (!formData) {
    return (
      <div className="p-12 text-center text-gold-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-400 mx-auto"></div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setStatusMsg('');
      await api.adminUpdateContent('hotel_info', formData);
      await refreshData();
      setStatusMsg('Hotel content updated successfully. Changes are live immediately on the public website.');
    } catch (err) {
      alert(err.message || 'Failed to update website content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div>
        <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
          Website CMS
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
          Hotel Identity & Contact Information
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Modify hotel branding, contact numbers, address, and guest policies without writing code.
        </p>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-lg text-xs flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Brand Information Section */}
        <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-wider font-bold border-b border-navy-800 pb-2">
            <Building className="w-4 h-4" />
            <span>Hotel Brand & Headlines</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                Hotel Official Name
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
              Short Introductory Description
            </label>
            <textarea
              rows="3"
              value={formData.shortDescription || ''}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400 resize-none"
            />
          </div>
        </div>

        {/* Contact Numbers Section */}
        <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-wider font-bold border-b border-navy-800 pb-2">
            <Phone className="w-4 h-4" />
            <span>Contact Channels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                Display Phone
              </label>
              <input
                type="text"
                value={formData.contact?.phone || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value }
                })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                Reservations Email
              </label>
              <input
                type="email"
                value={formData.contact?.reservationsEmail || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, reservationsEmail: e.target.value }
                })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                WhatsApp Number (E.164, without +)
              </label>
              <input
                type="text"
                value={formData.contact?.whatsapp || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, whatsapp: e.target.value }
                })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-wider font-bold border-b border-navy-800 pb-2">
            <MapPin className="w-4 h-4" />
            <span>Physical Address & Coordinates</span>
          </div>

          <div className="text-xs">
            <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
              Full Formatted Address
            </label>
            <input
              type="text"
              value={formData.address?.full || ''}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address, full: e.target.value }
              })}
              className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                Latitude Coordinates
              </label>
              <input
                type="number"
                step="any"
                value={formData.coordinates?.lat || 32.8427}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: { ...formData.coordinates, lat: parseFloat(e.target.value) }
                })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400 font-mono"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                Longitude Coordinates
              </label>
              <input
                type="number"
                step="any"
                value={formData.coordinates?.lng || -117.2734}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: { ...formData.coordinates, lng: parseFloat(e.target.value) }
                })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Operating Policies Section */}
        <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-wider font-bold border-b border-navy-800 pb-2">
            <Shield className="w-4 h-4" />
            <span>Check-in & Cancellation Policies</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                Standard Check-In Time
              </label>
              <input
                type="text"
                value={formData.policies?.checkInTime || '15:00'}
                onChange={(e) => setFormData({
                  ...formData,
                  policies: { ...formData.policies, checkInTime: e.target.value }
                })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                Standard Check-Out Time
              </label>
              <input
                type="text"
                value={formData.policies?.checkOutTime || '11:00'}
                onChange={(e) => setFormData({
                  ...formData,
                  policies: { ...formData.policies, checkOutTime: e.target.value }
                })}
                className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
              Cancellation Policy Description
            </label>
            <textarea
              rows="2"
              value={formData.policies?.cancellationPolicy || ''}
              onChange={(e) => setFormData({
                ...formData,
                policies: { ...formData.policies, cancellationPolicy: e.target.value }
              })}
              className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400 resize-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 font-bold rounded text-xs uppercase tracking-wider shadow flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing Changes...' : 'Save & Publish Live'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}

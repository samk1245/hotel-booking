import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Tag, Plus, Edit3, Trash2, CheckCircle2, Eye, EyeOff, X } from 'lucide-react';

export default function AdminOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    tag: 'Seasonal Privilege',
    discountText: '',
    promoCode: '',
    validFrom: '',
    validTo: '',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    perks: ''
  });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetOffers();
      setOffers(res.offers || []);
    } catch (err) {
      console.error('Failed to load offers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const openCreateModal = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      tag: 'Seasonal Privilege',
      discountText: '',
      promoCode: '',
      validFrom: '',
      validTo: '',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      perks: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title || '',
      subtitle: offer.subtitle || '',
      description: offer.description || '',
      tag: offer.tag || 'Seasonal Privilege',
      discountText: offer.discountText || '',
      promoCode: offer.promoCode || '',
      validFrom: offer.validFrom || '',
      validTo: offer.validTo || '',
      image: offer.image || '',
      perks: Array.isArray(offer.perks) ? offer.perks.join('\n') : ''
    });
    setModalOpen(true);
  };

  const handleToggleActive = async (offer) => {
    try {
      const updated = !offer.isActive;
      await api.adminUpdateOffer(offer._id, { isActive: updated });
      setOffers(prev => prev.map(o => o._id === offer._id ? { ...o, isActive: updated } : o));
    } catch (err) {
      alert('Failed to toggle status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this promotional package?')) return;
    try {
      await api.adminDeleteOffer(id);
      setOffers(prev => prev.filter(o => o._id !== id));
    } catch (err) {
      alert('Failed to delete offer');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      perks: formData.perks.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingOffer) {
        const res = await api.adminUpdateOffer(editingOffer._id, payload);
        setOffers(prev => prev.map(o => o._id === editingOffer._id ? res.offer : o));
      } else {
        const res = await api.adminCreateOffer(payload);
        setOffers(prev => [...prev, res.offer]);
      }
      setModalOpen(false);
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
            Marketing & Packages
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Promotional Offers & Packages
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 font-bold rounded text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>New Promotional Offer</span>
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map(offer => (
          <div key={offer._id} className="bg-navy-950 rounded-xl border border-navy-800 overflow-hidden flex flex-col justify-between shadow-luxury">
            <div>
              <div className="relative aspect-[16/9] bg-navy-900">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-navy-900/80 backdrop-blur-md text-gold-300 text-[10px] uppercase font-bold rounded">
                    {offer.tag}
                  </span>
                </div>
                {offer.discountText && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 bg-emerald-900/90 text-emerald-300 text-xs font-bold rounded">
                      {offer.discountText}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  {offer.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {offer.description}
                </p>

                {offer.promoCode && (
                  <div className="pt-2 text-xs">
                    <span className="text-slate-400">Code:</span>{' '}
                    <code className="text-gold-300 font-mono font-bold">{offer.promoCode}</code>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-navy-800 mt-4 flex items-center justify-between">
              <button
                onClick={() => handleToggleActive(offer)}
                className={`text-xs px-2.5 py-1 rounded font-semibold ${
                  offer.isActive !== false ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {offer.isActive !== false ? 'Active' : 'Inactive'}
              </button>

              <div className="space-x-2">
                <button
                  onClick={() => openEditModal(offer)}
                  className="p-1.5 bg-navy-900 hover:bg-navy-800 text-slate-300 rounded"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(offer._id)}
                  className="p-1.5 bg-navy-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-navy-700 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingOffer ? 'Edit Offer' : 'Create Offer'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">Description *</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">Discount Badge</label>
                  <input
                    type="text"
                    value={formData.discountText}
                    onChange={(e) => setFormData({ ...formData, discountText: e.target.value })}
                    placeholder="e.g. Stay 4, Pay 3"
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">Promo Code</label>
                  <input
                    type="text"
                    value={formData.promoCode}
                    onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                    placeholder="e.g. AZURE4TH"
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">Inclusions / Perks (one per line)</label>
                <textarea
                  rows="3"
                  value={formData.perks}
                  onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
                  placeholder="Daily champagne breakfast for two&#10;Complimentary valet parking&#10;Guaranteed 14:00 late check-out"
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-navy-800 text-slate-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold-400 hover:bg-gold-300 text-navy-950 font-bold rounded shadow"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

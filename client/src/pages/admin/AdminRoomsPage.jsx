import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  BedDouble, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  Check, 
  X, 
  Image as ImageIcon,
  DollarSign
} from 'lucide-react';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit / Create Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Deluxe Ocean Suite',
    headline: '',
    description: '',
    basePrice: 500,
    priceDisplayNote: 'Rates subject to seasonal confirmation',
    bedType: '1 King Bed',
    roomSize: '75 sq m / 800 sq ft',
    view: 'Panoramic Ocean View',
    floor: 'Levels 3 - 6',
    adults: 2,
    children: 1,
    totalMax: 3,
    amenities: '',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    isFeatured: false
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetRooms();
      setRooms(res.rooms || []);
    } catch (err) {
      console.error('Failed to load rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const openCreateModal = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      category: 'Deluxe Ocean Suite',
      headline: '',
      description: '',
      basePrice: 550,
      priceDisplayNote: 'Rates subject to seasonal confirmation',
      bedType: '1 King Bed',
      roomSize: '80 sq m / 860 sq ft',
      view: 'Ocean View',
      floor: 'Upper Level',
      adults: 2,
      children: 1,
      totalMax: 3,
      amenities: 'Oceanfront Terrace, Deep Soaking Tub, Wi-Fi 6, 24h Butler Call, Espresso Machine',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      isPublished: true,
      isFeatured: false
    });
    setModalOpen(true);
  };

  const openEditModal = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name || '',
      category: room.category || 'Deluxe Ocean Suite',
      headline: room.headline || '',
      description: room.description || '',
      basePrice: room.basePrice || 500,
      priceDisplayNote: room.priceDisplayNote || 'Rates subject to seasonal confirmation',
      bedType: room.bedType || '1 King Bed',
      roomSize: room.roomSize || '75 sq m',
      view: room.view || 'Ocean View',
      floor: room.floor || 'Level 4',
      adults: room.capacity?.adults || 2,
      children: room.capacity?.children || 0,
      totalMax: room.capacity?.totalMax || 3,
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : '',
      imageUrl: room.images?.[0]?.url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      isPublished: room.isPublished !== false,
      isFeatured: Boolean(room.isFeatured)
    });
    setModalOpen(true);
  };

  const handleTogglePublish = async (room) => {
    try {
      const updatedStatus = !room.isPublished;
      await api.adminUpdateRoom(room._id, { isPublished: updatedStatus });
      setRooms(prev => prev.map(r => r._id === room._id ? { ...r, isPublished: updatedStatus } : r));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this suite category?')) return;
    try {
      await api.adminDeleteRoom(id);
      setRooms(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to remove room');
    }
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await api.uploadImage(file);
      setFormData(prev => ({ ...prev, imageUrl: res.url }));
    } catch (err) {
      alert(err.message || 'Failed to upload image file');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      category: formData.category,
      headline: formData.headline,
      description: formData.description,
      basePrice: Number(formData.basePrice),
      priceDisplayNote: formData.priceDisplayNote,
      bedType: formData.bedType,
      roomSize: formData.roomSize,
      view: formData.view,
      floor: formData.floor,
      capacity: {
        adults: Number(formData.adults),
        children: Number(formData.children),
        totalMax: Number(formData.totalMax)
      },
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
      images: [
        {
          url: formData.imageUrl,
          caption: formData.name,
          isPrimary: true,
          order: 1
        }
      ],
      isPublished: formData.isPublished,
      isFeatured: formData.isFeatured
    };

    try {
      if (editingRoom) {
        const res = await api.adminUpdateRoom(editingRoom._id, payload);
        setRooms(prev => prev.map(r => r._id === editingRoom._id ? res.room : r));
      } else {
        const res = await api.adminCreateRoom(payload);
        setRooms(prev => [...prev, res.room]);
      }
      setModalOpen(false);
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
            Inventory & Rates
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Suites & Villas Management
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 font-bold rounded text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Configure New Suite</span>
        </button>
      </div>

      {/* Rooms Table */}
      <div className="bg-navy-950 rounded-xl border border-navy-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gold-400">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-400 mx-auto"></div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No suites currently configured. Click "Configure New Suite" to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-navy-900/80 uppercase text-[10px] tracking-wider text-slate-400 border-b border-navy-800">
                <tr>
                  <th className="py-3.5 px-6">Image</th>
                  <th className="py-3.5 px-6">Suite Name & Category</th>
                  <th className="py-3.5 px-6">Base Rate</th>
                  <th className="py-3.5 px-6">Occupancy</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900">
                {rooms.map((room) => (
                  <tr key={room._id} className="hover:bg-navy-900/50 transition-colors">
                    <td className="py-3 px-6">
                      <div className="w-14 h-10 rounded overflow-hidden bg-navy-900">
                        <img
                          src={room.images?.[0]?.url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80'}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="text-white font-medium text-sm">{room.name}</div>
                      <div className="text-[11px] text-gold-400/80">{room.category} &bull; {room.roomSize}</div>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-emerald-300 font-bold">
                      ${room.basePrice} / night
                    </td>
                    <td className="py-3.5 px-6">
                      Max {room.capacity?.totalMax || 3} Guests
                    </td>
                    <td className="py-3.5 px-6">
                      <button
                        onClick={() => handleTogglePublish(room)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          room.isPublished !== false
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {room.isPublished !== false ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(room)}
                        className="p-1.5 bg-navy-900 hover:bg-navy-800 text-slate-300 hover:text-gold-300 rounded"
                        title="Edit Suite"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="p-1.5 bg-navy-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded"
                        title="Delete Suite"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Suite Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-navy-700 rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingRoom ? `Edit: ${editingRoom.name}` : 'Configure New Suite / Villa'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-navy-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Suite Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Royal Horizon Penthouse"
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Category Tier *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Deluxe Ocean Suite">Deluxe Ocean Suite</option>
                    <option value="Royal Penthouse">Royal Penthouse</option>
                    <option value="Azure Garden Villa">Azure Garden Villa</option>
                    <option value="Executive Suite">Executive Suite</option>
                    <option value="Presidential Villa">Presidential Villa</option>
                    <option value="Superior Room">Superior Room</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                  Headline Tagline *
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  required
                  placeholder="e.g. Sweeping Pacific Horizons & Private Sunset Terrace"
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                  Full Suite Description *
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Atmosphere, craftsmanship, bespoke furnishings, bathroom details..."
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400 resize-none"
                />
              </div>

              {/* Price & Occupancy */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Base Price ($) *
                  </label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Max Adults
                  </label>
                  <input
                    type="number"
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Max Children
                  </label>
                  <input
                    type="number"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Total Max Guests
                  </label>
                  <input
                    type="number"
                    value={formData.totalMax}
                    onChange={(e) => setFormData({ ...formData, totalMax: e.target.value })}
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Bed Type & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Bed Configuration
                  </label>
                  <input
                    type="text"
                    value={formData.bedType}
                    onChange={(e) => setFormData({ ...formData, bedType: e.target.value })}
                    placeholder="e.g. 1 California King"
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Room Size
                  </label>
                  <input
                    type="text"
                    value={formData.roomSize}
                    onChange={(e) => setFormData({ ...formData, roomSize: e.target.value })}
                    placeholder="e.g. 85 sq m / 915 sq ft"
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                    Orientation & View
                  </label>
                  <input
                    type="text"
                    value={formData.view}
                    onChange={(e) => setFormData({ ...formData, view: e.target.value })}
                    placeholder="e.g. Panoramic Ocean Sunset"
                    className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Amenities List */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1">
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  placeholder="Private Terrace, Soaking Tub, Rain Shower, Wi-Fi 6, 24h Butler, Diptyque Toiletries"
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Image URL & File Upload */}
              <div className="space-y-2 p-4 bg-navy-950 rounded-lg border border-navy-800">
                <label className="block text-xs uppercase tracking-wider text-gold-400 font-semibold">
                  Primary Suite Photograph
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-navy-900 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                  <label className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded text-xs cursor-pointer flex items-center space-x-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.imageUrl && (
                  <div className="w-32 h-20 rounded overflow-hidden mt-2 bg-navy-900">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Checkboxes for Published & Featured */}
              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-0"
                  />
                  <span>Published on public website</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-0"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-300 rounded text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gold-400 hover:bg-gold-300 text-navy-950 font-bold rounded text-xs uppercase tracking-wider shadow"
                >
                  {editingRoom ? 'Save Changes' : 'Create Suite'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

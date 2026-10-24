import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';
import { 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  MessageSquare, 
  User, 
  Calendar,
  X,
  Plus
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [inquiries, setInquiries] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState(initialRef);
  const [loading, setLoading] = useState(true);

  // Selected Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetInquiries({
        status: statusFilter,
        search: searchTerm,
        page,
        limit: 20
      });
      setInquiries(res.inquiries || []);
      setTotal(res.total || 0);

      // If initialRef was provided and matches an item, open it
      if (initialRef && res.inquiries) {
        const found = res.inquiries.find(i => i.inquiryReference === initialRef);
        if (found) setSelectedInquiry(found);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchInquiries();
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedInquiry) return;
    try {
      setUpdatingStatus(true);
      const res = await api.adminUpdateInquiryStatus(selectedInquiry._id, newStatus);
      setSelectedInquiry(res.inquiry);
      // update list state
      setInquiries(prev => prev.map(i => i._id === res.inquiry._id ? res.inquiry : i));
    } catch (err) {
      alert(err.message || 'Failed to update inquiry status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedInquiry) return;
    try {
      const res = await api.adminAddInquiryNote(selectedInquiry._id, newNoteText);
      setSelectedInquiry(res.inquiry);
      setInquiries(prev => prev.map(i => i._id === res.inquiry._id ? res.inquiry : i));
      setNewNoteText('');
    } catch (err) {
      alert(err.message || 'Failed to save note');
    }
  };

  const statuses = ['All', 'New', 'Contacted', 'Pending', 'Confirmed', 'Cancelled'];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
            Guest Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Booking Inquiry Management
          </h1>
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="text-white font-mono">{inquiries.length}</span> of <span className="text-white font-mono">{total}</span> inquiries
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => { setStatusFilter(st); setPage(1); }}
              className={`px-3 py-1.5 rounded text-xs tracking-wider font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-gold-400 text-navy-950 font-bold'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reference, guest, email..."
              className="w-full bg-navy-900 border border-navy-700 rounded pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold-400"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded text-xs font-semibold"
          >
            Search
          </button>
        </form>

      </div>

      {/* Inquiries Data Table */}
      <div className="bg-navy-950 rounded-xl border border-navy-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gold-400">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-400 mx-auto"></div>
            <span className="block text-xs mt-3 text-slate-400">Loading guest inquiries...</span>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No booking inquiries matched the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-navy-900/80 uppercase text-[10px] tracking-wider text-slate-400 border-b border-navy-800">
                <tr>
                  <th className="py-3.5 px-6">Reference</th>
                  <th className="py-3.5 px-6">Guest Name & Email</th>
                  <th className="py-3.5 px-6">Suite Category</th>
                  <th className="py-3.5 px-6">Stay Dates</th>
                  <th className="py-3.5 px-6">Party Size</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900">
                {inquiries.map((inq) => (
                  <tr 
                    key={inq._id} 
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-navy-900/50 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-gold-300 font-semibold">
                      {inq.inquiryReference}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-white font-medium">{inq.guestName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{inq.email}</div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-200">
                      {inq.preferredRoomName}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-400">
                      {inq.checkInDate} &rarr; {inq.checkOutDate}
                    </td>
                    <td className="py-4 px-6">
                      {inq.adults}A {inq.children > 0 ? `, ${inq.children}C` : ''} ({inq.roomCount || 1} room)
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        inq.status === 'New' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        inq.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        inq.status === 'Contacted' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                        inq.status === 'Pending' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedInquiry(inq); }}
                        className="px-3 py-1 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-200 rounded text-xs font-semibold transition-colors"
                      >
                        Inspect & Notes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail & Staff Notes Modal / Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-navy-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono">
                  Inquiry Reference
                </span>
                <h3 className="font-mono text-xl font-bold text-white">
                  {selectedInquiry.inquiryReference}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-full hover:bg-navy-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Change Selector Bar */}
            <div className="p-4 bg-navy-950 rounded-lg border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Update Inquiry Workflow Status:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['New', 'Contacted', 'Pending', 'Confirmed', 'Cancelled'].map(st => (
                  <button
                    key={st}
                    disabled={updatingStatus}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1 rounded text-xs uppercase tracking-wider font-semibold transition-all ${
                      selectedInquiry.status === st
                        ? 'bg-gold-400 text-navy-950 ring-2 ring-gold-400/50'
                        : 'bg-navy-900 hover:bg-navy-800 text-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest & Stay Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-navy-950 rounded-lg border border-navy-800 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                  Guest Information
                </span>
                <div className="font-semibold text-white text-sm">{selectedInquiry.guestName}</div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${selectedInquiry.email}`} className="hover:text-gold-300 font-mono underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`tel:${selectedInquiry.phone}`} className="hover:text-gold-300 font-mono underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 bg-navy-950 rounded-lg border border-navy-800 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                  Reservation Details
                </span>
                <div>
                  <strong className="text-slate-400">Suite:</strong> <span className="text-white">{selectedInquiry.preferredRoomName}</span>
                </div>
                <div>
                  <strong className="text-slate-400">Dates:</strong> <span className="font-mono text-white">{selectedInquiry.checkInDate} &rarr; {selectedInquiry.checkOutDate}</span>
                </div>
                <div>
                  <strong className="text-slate-400">Party:</strong> {selectedInquiry.adults} Adults, {selectedInquiry.children || 0} Children ({selectedInquiry.roomCount || 1} room)
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {selectedInquiry.specialRequests && (
              <div className="p-4 bg-navy-950 rounded-lg border border-navy-800 space-y-1 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                  Guest Special Requests & Notes:
                </span>
                <p className="text-slate-300 italic">
                  "{selectedInquiry.specialRequests}"
                </p>
              </div>
            )}

            {/* Internal Staff Notes & Timeline */}
            <div className="space-y-3 pt-2 border-t border-navy-800">
              <span className="text-xs uppercase tracking-wider text-gold-400 font-bold block flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>Internal Staff Notes & Action Timeline</span>
              </span>

              {/* Existing Notes Feed */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(!selectedInquiry.internalNotes || selectedInquiry.internalNotes.length === 0) ? (
                  <p className="text-xs text-slate-500 italic">No staff notes recorded yet.</p>
                ) : (
                  selectedInquiry.internalNotes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-navy-950 rounded border border-navy-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <strong className="text-gold-300">{note.authorName}</strong>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-200">{note.note}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record call outcome, deposit status, or guest preference..."
                  className="flex-1 bg-navy-950 border border-navy-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold-400 hover:bg-gold-300 text-navy-950 text-xs font-bold rounded flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Note</span>
                </button>
              </form>
            </div>

            <div className="flex justify-end pt-2 border-t border-navy-800">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-300 rounded text-xs uppercase tracking-wider"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

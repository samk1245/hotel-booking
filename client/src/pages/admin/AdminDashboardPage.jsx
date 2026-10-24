import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { 
  Inbox, 
  CheckCircle2, 
  Clock, 
  BedDouble, 
  TrendingUp, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const adminBase = '/private-management';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await api.adminGetStats();
        setStats(data.stats);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-400"></div>
      </div>
    );
  }

  const counts = stats?.statusCounts || {};
  const recent = stats?.recentInquiries || [];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
            Executive Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Hospitality Operations Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to={`${adminBase}/inquiries`}
            className="px-4 py-2 bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 rounded text-xs uppercase tracking-wider font-bold transition-all shadow"
          >
            Review New Inquiries ({counts.new || 0})
          </Link>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Inquiries */}
        <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 shadow-luxury space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider">
            <span>Total Inquiries</span>
            <Inbox className="w-4 h-4 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {counts.total || 0}
          </div>
          <p className="text-[11px] text-slate-400">All registered guest inquiries</p>
        </div>

        {/* New Action Required */}
        <div className="bg-navy-950 p-6 rounded-xl border border-amber-500/30 shadow-luxury space-y-2">
          <div className="flex items-center justify-between text-amber-400 text-xs uppercase tracking-wider font-semibold">
            <span>New (Pending Review)</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-amber-300">
            {counts.new || 0}
          </div>
          <p className="text-[11px] text-slate-400">Require concierge response</p>
        </div>

        {/* Confirmed Reservations */}
        <div className="bg-navy-950 p-6 rounded-xl border border-emerald-500/30 shadow-luxury space-y-2">
          <div className="flex items-center justify-between text-emerald-400 text-xs uppercase tracking-wider font-semibold">
            <span>Confirmed Stays</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-300">
            {counts.confirmed || 0}
          </div>
          <p className="text-[11px] text-slate-400">Conversion Rate: {stats?.conversionRate || 0}%</p>
        </div>

        {/* Suites Inventory */}
        <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 shadow-luxury space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider">
            <span>Published Suites</span>
            <BedDouble className="w-4 h-4 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {stats?.publishedRooms || 0}
          </div>
          <p className="text-[11px] text-slate-400">of {stats?.totalRooms || 0} configured suites</p>
        </div>

      </div>

      {/* Inquiry Status Distribution Bar */}
      <div className="bg-navy-950 p-6 rounded-xl border border-navy-800 space-y-4">
        <h3 className="font-serif text-base font-semibold text-white">
          Inquiry Pipeline Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
            <span className="block text-xl font-bold text-amber-400">{counts.new || 0}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">New</span>
          </div>
          <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
            <span className="block text-xl font-bold text-sky-400">{counts.contacted || 0}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Contacted</span>
          </div>
          <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
            <span className="block text-xl font-bold text-purple-400">{counts.pending || 0}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Pending Review</span>
          </div>
          <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
            <span className="block text-xl font-bold text-emerald-400">{counts.confirmed || 0}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Confirmed</span>
          </div>
          <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
            <span className="block text-xl font-bold text-slate-500">{counts.cancelled || 0}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Cancelled</span>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Quick Table */}
      <div className="bg-navy-950 rounded-xl border border-navy-800 overflow-hidden space-y-4">
        <div className="p-6 border-b border-navy-800 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Recent Booking Inquiries
            </h3>
            <p className="text-xs text-slate-400">Latest guest inquiries submitted via the public website</p>
          </div>
          <Link
            to={`${adminBase}/inquiries`}
            className="text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center font-semibold"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No inquiries recorded yet. Test submissions from the public website will appear here in real time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-navy-900/60 uppercase text-[10px] tracking-wider text-slate-400 border-b border-navy-800">
                <tr>
                  <th className="py-3 px-6">Reference</th>
                  <th className="py-3 px-6">Guest Name</th>
                  <th className="py-3 px-6">Suite Requested</th>
                  <th className="py-3 px-6">Stay Dates</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900">
                {recent.map((inq) => (
                  <tr key={inq._id} className="hover:bg-navy-900/40 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-gold-300 font-semibold">
                      {inq.inquiryReference}
                    </td>
                    <td className="py-3.5 px-6 text-white font-medium">
                      {inq.guestName}
                      <span className="block text-[11px] text-slate-500 font-mono">{inq.email}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      {inq.preferredRoomName}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-slate-400">
                      {inq.checkInDate} &rarr; {inq.checkOutDate}
                    </td>
                    <td className="py-3.5 px-6">
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
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        to={`${adminBase}/inquiries?ref=${inq.inquiryReference}`}
                        className="text-xs text-gold-400 hover:text-gold-300 font-semibold"
                      >
                        Manage &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

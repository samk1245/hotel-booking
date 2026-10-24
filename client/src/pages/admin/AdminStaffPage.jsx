import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Users, UserPlus, Shield, CheckCircle2, AlertCircle, X, Trash2, Power } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminStaffPage() {
  const { user: currentUser } = useAuth();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  // New staff modal
  const [modalOpen, setModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff'
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successBanner, setSuccessBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetStaff();
      setStaffList(res.users || []);
    } catch (err) {
      console.error('Failed to load staff list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleToggleStatus = async (staffMember) => {
    if (staffMember._id === currentUser.id) {
      alert('You cannot deactivate your own administrative account.');
      return;
    }

    try {
      const nextStatus = !staffMember.isActive;
      await api.adminToggleStaff(staffMember._id, nextStatus);
      setStaffList(prev => prev.map(s => s._id === staffMember._id ? { ...s, isActive: nextStatus } : s));
      setSuccessBanner(`Staff member ${staffMember.name} has been ${nextStatus ? 'activated' : 'deactivated'}.`);
    } catch (err) {
      alert(err.message || 'Failed to update account status');
    }
  };

  const handleDeleteStaff = async (staffMember) => {
    if (staffMember._id === currentUser.id) {
      alert('You cannot delete your own administrative account.');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to permanently remove ${staffMember.name} (${staffMember.email}) from staff records?`);
    if (!confirmDelete) return;

    try {
      await api.adminDeleteStaff(staffMember._id);
      setStaffList(prev => prev.filter(s => s._id !== staffMember._id));
      setSuccessBanner(`Staff member ${staffMember.name} removed successfully.`);
    } catch (err) {
      alert(err.message || 'Failed to delete staff member');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessBanner('');

    if (!newStaff.name.trim()) {
      setErrorMsg('Full name is required.');
      return;
    }
    if (!newStaff.email.trim()) {
      setErrorMsg('Email address is required.');
      return;
    }
    if (!newStaff.password || newStaff.password.length < 4) {
      setErrorMsg('Password must be at least 4 characters in length.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.adminCreateStaff(newStaff);
      setStaffList(prev => [...prev, res.user]);
      setModalOpen(false);
      setSuccessBanner(`Staff member ${res.user.name} provisioned successfully.`);
      setNewStaff({ name: '', email: '', password: '', role: 'staff' });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to provision staff account');
    } finally {
      setSubmitting(false);
    }
  };

  const canManage = currentUser?.role === 'superadmin' || currentUser?.role === 'manager';

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
            Access Control
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Authorized Staff & Personnel
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Provision, manage, or remove staff members authorized to access booking inquiries and resort content.
          </p>
        </div>

        {canManage && (
          <button
            onClick={() => { setModalOpen(true); setErrorMsg(''); setSuccessBanner(''); }}
            className="px-4 py-2 bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-navy-950 font-bold rounded text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Staff Member</span>
          </button>
        )}
      </div>

      {/* Success Banner */}
      {successBanner && (
        <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-lg text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner('')} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-navy-950 rounded-xl border border-navy-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gold-400">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-400 mx-auto"></div>
          </div>
        ) : staffList.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No staff accounts found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-navy-900/80 uppercase text-[10px] tracking-wider text-slate-400 border-b border-navy-800">
                <tr>
                  <th className="py-3.5 px-6">Staff Name</th>
                  <th className="py-3.5 px-6">Email Address</th>
                  <th className="py-3.5 px-6">Role Privilege</th>
                  <th className="py-3.5 px-6">Account Status</th>
                  <th className="py-3.5 px-6">Last Active</th>
                  {canManage && (
                    <th className="py-3.5 px-6 text-right">Staff Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900">
                {staffList.map((staff) => (
                  <tr key={staff._id} className="hover:bg-navy-900/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-white">
                      {staff.name} {staff._id === currentUser.id && <span className="text-[10px] text-gold-400 ml-1 font-mono">(You)</span>}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-slate-300">
                      {staff.email}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                        staff.role === 'superadmin' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                        staff.role === 'manager' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {staff.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[10px] font-semibold ${
                        staff.isActive !== false ? 'text-emerald-300 bg-emerald-950 border border-emerald-800' : 'text-rose-300 bg-rose-950 border border-rose-800'
                      }`}>
                        {staff.isActive !== false ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-slate-400 text-[11px]">
                      {staff.lastLogin ? new Date(staff.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    {canManage && (
                      <td className="py-3.5 px-6 text-right space-x-2">
                        {staff._id !== currentUser.id ? (
                          <>
                            <button
                              onClick={() => handleToggleStatus(staff)}
                              className={`px-2.5 py-1 rounded text-[10px] uppercase font-semibold transition-colors ${
                                staff.isActive !== false
                                  ? 'bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800'
                                  : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                              }`}
                              title={staff.isActive !== false ? 'Deactivate Account' : 'Activate Account'}
                            >
                              {staff.isActive !== false ? 'Deactivate' : 'Activate'}
                            </button>

                            <button
                              onClick={() => handleDeleteStaff(staff)}
                              className="px-2.5 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded text-[10px] uppercase font-semibold inline-flex items-center space-x-1 transition-colors"
                              title="Permanently Remove Staff Member"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-slate-500 text-[10px] italic">Active Session</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Provision Staff Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-navy-700 rounded-xl max-w-md w-full shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                Add New Staff Member
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-950 border border-rose-800 text-rose-300 rounded text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="e.g. Julian Ross"
                  required
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="julian@grandazure.com"
                  required
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                  Password (min 4 characters) *
                </label>
                <input
                  type="password"
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  placeholder="Enter password"
                  required
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-300 font-medium mb-1">
                  Role Privilege
                </label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                >
                  <option value="staff">Staff (Front Desk & Inquiries)</option>
                  <option value="manager">Manager (Manage Content, Rooms, Offers)</option>
                  {currentUser?.role === 'superadmin' && (
                    <option value="superadmin">Super Admin (Full Access)</option>
                  )}
                </select>
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
                  disabled={submitting}
                  className="px-5 py-2 bg-gold-400 hover:bg-gold-300 text-navy-950 font-bold rounded shadow transition-all"
                >
                  {submitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

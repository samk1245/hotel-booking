import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { History, Shield, RefreshCw } from 'lucide-react';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.adminGetLogs();
      setLogs(res.logs || []);
    } catch (err) {
      console.error('Failed to load logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
            Compliance & Security
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Administrative Activity Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable system audit log recording logins, inquiry updates, room edits, and content changes.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="px-3.5 py-1.5 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded text-xs font-semibold flex items-center space-x-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Audit</span>
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-navy-950 rounded-xl border border-navy-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gold-400">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-400 mx-auto"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No administrative actions recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-navy-900/80 uppercase text-[10px] tracking-wider text-slate-400 border-b border-navy-800">
                <tr>
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Action</th>
                  <th className="py-3.5 px-6">Operation Details</th>
                  <th className="py-3.5 px-6">Performed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-navy-900/40 transition-colors">
                    <td className="py-3.5 px-6 text-slate-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.category === 'AUTH' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                        log.category === 'INQUIRY' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        log.category === 'ROOM' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        log.category === 'CONTENT' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-white">
                      {log.action}
                    </td>
                    <td className="py-3.5 px-6 text-slate-300 font-sans max-w-xs truncate">
                      {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                    </td>
                    <td className="py-3.5 px-6 text-gold-300 font-sans">
                      {log.performedBy?.name || 'System'}
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

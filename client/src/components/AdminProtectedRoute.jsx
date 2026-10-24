import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminProtectedRoute({ allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth();
  const adminPath = '/private-management';

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-gold-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`${adminPath}/login`} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 text-white">
        <h2 className="font-serif text-2xl text-rose-400 font-bold">Access Restricted</h2>
        <p className="text-xs text-slate-400 mt-2">Your account role ({user.role}) does not have permission for this section.</p>
        <Navigate to={adminPath} replace />
      </div>
    );
  }

  return <Outlet />;
}

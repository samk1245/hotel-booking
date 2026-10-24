import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HotelProvider } from './context/HotelContext';
import { ErrorBoundary } from './components/ErrorBoundary';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';

import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import DiningPage from './pages/DiningPage';
import WellnessPage from './pages/WellnessPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/AdminLayout';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage';
import AdminRoomsPage from './pages/admin/AdminRoomsPage';
import AdminOffersPage from './pages/admin/AdminOffersPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminStaffPage from './pages/admin/AdminStaffPage';
import AdminLogsPage from './pages/admin/AdminLogsPage';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public layout wrapper with Navbar, Footer, and Inquiry Modal
function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <InquiryModal />
    </div>
  );
}

export default function App() {
  const adminBase = '/private-management';

  return (
    <ErrorBoundary>
      <AuthProvider>
        <HotelProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
            
            {/* Public Hotel Website Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/rooms" element={<PublicLayout><RoomsPage /></PublicLayout>} />
            <Route path="/rooms/:slug" element={<PublicLayout><RoomDetailPage /></PublicLayout>} />
            <Route path="/dining" element={<PublicLayout><DiningPage /></PublicLayout>} />
            <Route path="/wellness" element={<PublicLayout><WellnessPage /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

            {/* Private Admin Authentication & Dashboard (Hidden from public navigation) */}
            <Route path={`${adminBase}/login`} element={<AdminLoginPage />} />
            
            <Route path={adminBase} element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="inquiries" element={<AdminInquiriesPage />} />
                <Route path="rooms" element={<AdminRoomsPage />} />
                <Route path="offers" element={<AdminOffersPage />} />
                <Route path="content" element={<AdminContentPage />} />
                <Route path="staff" element={<AdminStaffPage />} />
                <Route path="logs" element={<AdminLogsPage />} />
              </Route>
            </Route>

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <PublicLayout>
                  <div className="py-32 text-center max-w-md mx-auto px-4 space-y-4">
                    <h2 className="font-serif text-4xl text-navy-950 font-bold">404</h2>
                    <p className="text-slate-500 text-sm">The sanctuary page you requested does not exist.</p>
                    <a
                      href="/"
                      className="inline-block px-6 py-2.5 bg-navy-950 text-gold-300 rounded text-xs uppercase tracking-wider font-semibold"
                    >
                      Return to Homepage
                    </a>
                  </div>
                </PublicLayout>
              }
            />

          </Routes>
        </BrowserRouter>
      </HotelProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
}

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import InquiryForm from './InquiryForm';
import { useHotel } from '../context/HotelContext';

export default function InquiryModal() {
  const { isInquiryModalOpen, selectedRoomForInquiry, closeInquiryModal } = useHotel();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeInquiryModal();
    };
    if (isInquiryModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isInquiryModalOpen, closeInquiryModal]);

  if (!isInquiryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-3xl my-8 bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={closeInquiryModal}
          className="absolute -top-12 right-0 sm:-right-4 text-white hover:text-gold-400 p-2 bg-navy-900/80 rounded-full border border-gold-400/30 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <InquiryForm initialRoom={selectedRoomForInquiry} onSuccess={() => {}} />
      </div>
    </div>
  );
}

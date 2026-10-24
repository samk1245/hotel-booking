import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const HotelContext = createContext(null);

export const HotelProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [offers, setOffers] = useState([]);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [dining, setDining] = useState([]);
  const [wellness, setWellness] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quick inquiry modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedRoomForInquiry, setSelectedRoomForInquiry] = useState(null);

  const fetchHotelData = async () => {
    try {
      setLoading(true);
      const [roomsRes, offersRes, contentRes] = await Promise.all([
        api.getRooms(),
        api.getOffers(),
        api.getContent()
      ]);

      setRooms(roomsRes.rooms || []);
      setOffers(offersRes.offers || []);

      const content = contentRes.content || {};
      setHotelInfo(content.hotel_info || null);
      setDining(content.dining || []);
      setWellness(content.wellness || null);
      setFaqs(content.faqs || []);
      setGallery(content.gallery || []);
      setTestimonials(content.testimonials || []);
    } catch (err) {
      console.error('Failed to load hotel context data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  const openInquiryModal = (room = null) => {
    setSelectedRoomForInquiry(room);
    setIsInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false);
    setSelectedRoomForInquiry(null);
  };

  return (
    <HotelContext.Provider value={{
      rooms,
      offers,
      hotelInfo,
      dining,
      wellness,
      faqs,
      gallery,
      testimonials,
      loading,
      refreshData: fetchHotelData,
      isInquiryModalOpen,
      selectedRoomForInquiry,
      openInquiryModal,
      closeInquiryModal
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

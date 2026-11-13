import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import fallbackData from '../data/fallbackData.json';

const HotelContext = createContext(null);

const ensureArray = (val) => {
  if (Array.isArray(val)) return val;
  if (val && typeof val === 'object') {
    return Object.keys(val)
      .filter(k => !isNaN(parseInt(k, 10)))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .map(k => val[k]);
  }
  return [];
};

export const HotelProvider = ({ children }) => {
  const [rooms, setRooms] = useState(() => fallbackData.rooms || []);
  const [offers, setOffers] = useState(() => fallbackData.offers || []);
  const [hotelInfo, setHotelInfo] = useState(() => fallbackData.content?.hotel_info || null);
  const [dining, setDining] = useState(() => fallbackData.content?.dining || []);
  const [wellness, setWellness] = useState(() => fallbackData.content?.wellness || null);
  const [faqs, setFaqs] = useState(() => fallbackData.content?.faqs || []);
  const [gallery, setGallery] = useState(() => fallbackData.content?.gallery || []);
  const [testimonials, setTestimonials] = useState(() => fallbackData.content?.testimonials || []);
  const [loading, setLoading] = useState(false);

  // Quick inquiry modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedRoomForInquiry, setSelectedRoomForInquiry] = useState(null);

  const fetchHotelData = async () => {
    try {
      const [roomsRes, offersRes, contentRes] = await Promise.all([
        api.getRooms(),
        api.getOffers(),
        api.getContent()
      ]);

      if (roomsRes?.rooms?.length) {
        setRooms(ensureArray(roomsRes.rooms));
      }
      if (offersRes?.offers?.length) {
        setOffers(ensureArray(offersRes.offers));
      }

      const content = contentRes?.content || {};
      if (content.hotel_info) setHotelInfo(content.hotel_info);
      if (content.dining?.length) setDining(ensureArray(content.dining));
      if (content.wellness) setWellness(content.wellness);
      if (content.faqs?.length) setFaqs(ensureArray(content.faqs));
      if (content.gallery?.length) setGallery(ensureArray(content.gallery));
      if (content.testimonials?.length) setTestimonials(ensureArray(content.testimonials));
    } catch (err) {
      console.warn('API error in HotelContext, retaining fallback data:', err);
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

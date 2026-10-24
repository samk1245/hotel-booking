import { dataStore } from '../models/dataStore.js';
import { sendInquiryEmails } from '../services/emailService.js';

// Helper to generate a distinguished reference number
const generateReference = () => {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AZR-${year}-${randomChars}`;
};

export const submitInquiry = async (req, res) => {
  try {
    const {
      guestName,
      email,
      phone,
      checkInDate,
      checkOutDate,
      adults,
      children,
      preferredRoomId,
      preferredRoomName,
      roomCount,
      specialRequests,
      consentPrivacy
    } = req.body;

    // Duplicate Prevention Check (within last 3 minutes from same email & dates)
    const recentInquiries = dataStore.getInquiries({ limit: 10 }).inquiries;
    const isDuplicate = recentInquiries.some(i => {
      const isSameGuest = i.email.toLowerCase() === email.toLowerCase();
      const isSameDates = i.checkInDate === checkInDate && i.checkOutDate === checkOutDate;
      const createdTime = new Date(i.createdAt).getTime();
      const diffMinutes = (Date.now() - createdTime) / (1000 * 60);
      return isSameGuest && isSameDates && diffMinutes < 3;
    });

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: 'An identical booking inquiry was submitted recently. Our reservations concierge is already reviewing your request.'
      });
    }

    // Determine Room Details
    let roomLabel = preferredRoomName || 'Any Available Suite';
    if (preferredRoomId && (!preferredRoomName || preferredRoomName === 'Any Available Suite')) {
      const matchedRoom = dataStore.getRoomById(preferredRoomId);
      if (matchedRoom) {
        roomLabel = matchedRoom.name;
      }
    }

    const inquiryReference = generateReference();

    const inquiry = dataStore.createInquiry({
      inquiryReference,
      guestName,
      email,
      phone,
      checkInDate,
      checkOutDate,
      adults: Number(adults),
      children: Number(children || 0),
      preferredRoomId: preferredRoomId || '',
      preferredRoomName: roomLabel,
      roomCount: Number(roomCount || 1),
      specialRequests: specialRequests || '',
      consentPrivacy: Boolean(consentPrivacy),
      status: 'New',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || ''
    });

    // Retrieve hotel info for email
    const hotelInfo = dataStore.getContent('hotel_info');

    // Asynchronously dispatch notification emails
    sendInquiryEmails({ inquiry, hotelInfo }).catch(err => {
      console.error('[InquiryController] Email dispatch warning:', err.message);
    });

    // Log Activity
    dataStore.logActivity({
      action: 'INQUIRY_RECEIVED',
      category: 'INQUIRY',
      details: `New booking inquiry ${inquiryReference} received from ${guestName} (${roomLabel})`,
      performedBy: { name: 'Guest Form', email },
      ipAddress: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Your booking inquiry has been received with thanks. A confirmation has been dispatched to your email.',
      inquiryReference,
      inquiry: {
        inquiryReference: inquiry.inquiryReference,
        guestName: inquiry.guestName,
        checkInDate: inquiry.checkInDate,
        checkOutDate: inquiry.checkOutDate,
        preferredRoomName: inquiry.preferredRoomName,
        status: inquiry.status
      }
    });
  } catch (err) {
    console.error('Submit Inquiry error:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while transmitting your booking inquiry. Please phone our concierge directly.'
    });
  }
};

// --- Private Admin Management Endpoints ---
export const adminGetInquiries = (req, res) => {
  try {
    const { status, search, page = 1, limit = 25 } = req.query;
    const result = dataStore.getInquiries({
      status,
      search,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    });

    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve inquiries.' });
  }
};

export const adminGetInquiryById = (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = dataStore.getInquiryById(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    return res.status(200).json({
      success: true,
      inquiry
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving inquiry.' });
  }
};

export const adminUpdateInquiryStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status, followUpDate } = req.body;

    const allowed = ['New', 'Contacted', 'Pending', 'Confirmed', 'Cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowed.join(', ')}`
      });
    }

    const updated = dataStore.updateInquiry(id, {
      status,
      ...(followUpDate !== undefined && { followUpDate })
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    dataStore.logActivity({
      action: 'INQUIRY_STATUS_UPDATED',
      category: 'INQUIRY',
      details: `Inquiry ${updated.inquiryReference} status updated to [${status}] by ${req.user.name}`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({
      success: true,
      message: `Inquiry status changed to ${status}`,
      inquiry: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
};

export const adminAddInternalNote = (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    if (!note || note.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Note text cannot be empty.' });
    }

    const updated = dataStore.addInquiryNote(id, {
      note: note.trim(),
      authorName: req.user.name,
      authorId: req.user.id
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    dataStore.logActivity({
      action: 'INQUIRY_NOTE_ADDED',
      category: 'INQUIRY',
      details: `Added note to inquiry ${updated.inquiryReference}`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({
      success: true,
      message: 'Internal note saved.',
      inquiry: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to record note.' });
  }
};

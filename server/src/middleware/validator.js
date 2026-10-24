import validator from 'validator';

// Sanitize string to prevent basic XSS
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
};

export const validateInquiry = (req, res, next) => {
  const {
    guestName,
    email,
    phone,
    checkInDate,
    checkOutDate,
    adults,
    children,
    consentPrivacy
  } = req.body;

  const errors = [];

  // Guest Name
  if (!guestName || typeof guestName !== 'string' || guestName.trim().length < 2) {
    errors.push('Full guest name is required (minimum 2 characters).');
  }

  // Email
  if (!email || !validator.isEmail(email.trim())) {
    errors.push('A valid email address is required for sending your confirmation reference.');
  }

  // Phone
  if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
    errors.push('A valid contact telephone or mobile number is required.');
  }

  // Dates
  if (!checkInDate || !validator.isDate(checkInDate)) {
    errors.push('A valid arrival check-in date is required.');
  }
  if (!checkOutDate || !validator.isDate(checkOutDate)) {
    errors.push('A valid departure check-out date is required.');
  }

  if (checkInDate && checkOutDate) {
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inDate < today) {
      errors.push('Check-in date cannot be in the past.');
    }
    if (outDate <= inDate) {
      errors.push('Check-out date must be at least one day after the check-in date.');
    }
  }

  // Adults
  const parsedAdults = parseInt(adults, 10);
  if (isNaN(parsedAdults) || parsedAdults < 1 || parsedAdults > 20) {
    errors.push('Number of adults must be at least 1.');
  }

  // Children
  const parsedChildren = parseInt(children || '0', 10);
  if (isNaN(parsedChildren) || parsedChildren < 0 || parsedChildren > 20) {
    errors.push('Children count cannot be negative.');
  }

  // Privacy consent
  if (consentPrivacy !== true && consentPrivacy !== 'true') {
    errors.push('Consent to the privacy policy is required to process your booking inquiry.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please verify the submitted information.',
      errors
    });
  }

  // Sanitize inputs
  req.body.guestName = sanitizeString(guestName);
  req.body.email = email.trim().toLowerCase();
  req.body.phone = sanitizeString(phone);
  req.body.specialRequests = sanitizeString(req.body.specialRequests || '');
  req.body.adults = parsedAdults;
  req.body.children = parsedChildren;
  req.body.roomCount = Math.max(1, parseInt(req.body.roomCount || '1', 10));

  next();
};

export const validateContact = (req, res, next) => {
  const { name, email, message, honeypot } = req.body;

  // Honeypot check for bots
  if (honeypot && honeypot.trim() !== '') {
    // Silent discard for bots
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  }

  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name is required.');
  if (!email || !validator.isEmail(email.trim())) errors.push('Valid email is required.');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  req.body.name = sanitizeString(name);
  req.body.email = email.trim().toLowerCase();
  req.body.subject = sanitizeString(req.body.subject || 'General Inquiry');
  req.body.message = sanitizeString(message);

  next();
};

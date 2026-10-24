import rateLimit from 'express-rate-limit';

// Rate limiting for admin login attempts (prevent brute force)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP address. Please wait 15 minutes before attempting again.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for public booking inquiries (prevent automated spam)
export const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 inquiries per hour per IP
  message: {
    success: false,
    message: 'We have received multiple booking inquiries from your network recently. Please wait or contact our concierge directly by phone.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// General public API limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: {
    success: false,
    message: 'Rate limit exceeded. Please try again shortly.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

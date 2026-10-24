import express from 'express';
import { getWebsiteContent, adminUpdateContent, submitContactMessage } from '../controllers/contentController.js';
import { validateContact } from '../middleware/validator.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getWebsiteContent);
router.get('/:key', getWebsiteContent);
router.post('/contact', inquiryLimiter, validateContact, submitContactMessage);

// Admin
router.put('/admin/:key', authenticate, authorize('superadmin', 'manager'), adminUpdateContent);

export default router;

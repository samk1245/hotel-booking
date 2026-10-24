import express from 'express';
import { 
  submitInquiry, 
  adminGetInquiries, 
  adminGetInquiryById, 
  adminUpdateInquiryStatus, 
  adminAddInternalNote 
} from '../controllers/inquiryController.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';
import { validateInquiry } from '../middleware/validator.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public inquiry submission (rate limited and validated)
router.post('/', inquiryLimiter, validateInquiry, submitInquiry);

// Privileged Admin inquiry management
router.get('/admin', authenticate, adminGetInquiries);
router.get('/admin/:id', authenticate, adminGetInquiryById);
router.patch('/admin/:id/status', authenticate, adminUpdateInquiryStatus);
router.post('/admin/:id/notes', authenticate, adminAddInternalNote);

export default router;

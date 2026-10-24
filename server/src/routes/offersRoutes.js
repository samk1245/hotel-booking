import express from 'express';
import { 
  getPublicOffers, 
  adminGetOffers, 
  adminCreateOffer, 
  adminUpdateOffer, 
  adminDeleteOffer 
} from '../controllers/offersController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getPublicOffers);

// Admin
router.get('/admin/all', authenticate, adminGetOffers);
router.post('/admin', authenticate, authorize('superadmin', 'manager'), adminCreateOffer);
router.put('/admin/:id', authenticate, authorize('superadmin', 'manager'), adminUpdateOffer);
router.delete('/admin/:id', authenticate, authorize('superadmin'), adminDeleteOffer);

export default router;

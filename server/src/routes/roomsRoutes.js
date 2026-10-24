import express from 'express';
import { 
  getPublicRooms, 
  getRoomBySlug, 
  adminGetRooms, 
  adminCreateRoom, 
  adminUpdateRoom, 
  adminDeleteRoom 
} from '../controllers/roomsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public endpoints
router.get('/', getPublicRooms);
router.get('/:slug', getRoomBySlug);

// Privileged Admin endpoints
router.get('/admin/all', authenticate, adminGetRooms);
router.post('/admin', authenticate, authorize('superadmin', 'manager'), adminCreateRoom);
router.put('/admin/:id', authenticate, authorize('superadmin', 'manager'), adminUpdateRoom);
router.delete('/admin/:id', authenticate, authorize('superadmin'), adminDeleteRoom);

export default router;

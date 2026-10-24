import express from 'express';
import { 
  getStaffList, 
  createStaffAccount, 
  toggleStaffStatus, 
  getDashboardStats, 
  getActivityLogs 
} from '../controllers/staffController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', authenticate, getDashboardStats);
router.get('/logs', authenticate, getActivityLogs);
router.get('/list', authenticate, authorize('superadmin', 'manager'), getStaffList);
router.post('/create', authenticate, authorize('superadmin'), createStaffAccount);
router.patch('/:id/toggle', authenticate, authorize('superadmin'), toggleStaffStatus);

export default router;

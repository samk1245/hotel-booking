import bcrypt from 'bcryptjs';
import { dataStore } from '../models/dataStore.js';

export const getStaffList = (req, res) => {
  try {
    const users = dataStore.getUsers();
    return res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Could not load staff accounts.' });
  }
};

export const createStaffAccount = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Staff member name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }
    if (!password || password.length < 4) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 4 characters.'
      });
    }

    const existing = dataStore.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = dataStore.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      role: role || 'staff',
      isActive: true,
      createdBy: req.user?.name || 'Administrator'
    });

    dataStore.logActivity({
      action: 'STAFF_ACCOUNT_CREATED',
      category: 'STAFF',
      details: `Created staff account for ${newUser.name} with role [${newUser.role}]`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    const { passwordHash: _, ...safeUser } = newUser;
    return res.status(201).json({ success: true, message: 'Staff account provisioned successfully.', user: safeUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create staff account.' });
  }
};

export const deleteStaffMember = (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own active administrator account.' });
    }

    const existing = dataStore.getUserById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Staff account not found.' });
    }

    dataStore.deleteUser(id);

    dataStore.logActivity({
      action: 'STAFF_ACCOUNT_DELETED',
      category: 'STAFF',
      details: `Deleted staff member: ${existing.name} (${existing.email})`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({ success: true, message: `Staff member ${existing.name} removed successfully.` });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete staff member.' });
  }
};

export const toggleStaffStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Disallow deactivating self
    if (id === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot deactivate your own administrative account.' });
    }

    const updated = dataStore.updateUser(id, { isActive: Boolean(isActive) });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Staff account not found.' });
    }

    dataStore.logActivity({
      action: 'STAFF_STATUS_TOGGLED',
      category: 'STAFF',
      details: `Toggled active status of staff ${updated.name} to ${isActive}`,
      performedBy: req.user,
      ipAddress: req.ip
    });

    return res.status(200).json({ success: true, message: 'Staff status updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update staff status.' });
  }
};

export const getDashboardStats = (req, res) => {
  try {
    const stats = dataStore.getStats();
    return res.status(200).json({ success: true, stats });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to compute dashboard stats.' });
  }
};

export const getActivityLogs = (req, res) => {
  try {
    const logs = dataStore.getActivityLogs(100);
    return res.status(200).json({ success: true, count: logs.length, logs });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve logs.' });
  }
};

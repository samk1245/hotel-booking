import bcrypt from 'bcryptjs';
import { dataStore } from '../models/dataStore.js';
import { generateToken } from '../middleware/auth.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const user = dataStore.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Access restricted to authorized personnel.'
      });
    }

    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: 'This staff account has been deactivated. Please contact the General Manager.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      dataStore.logActivity({
        action: 'FAILED_LOGIN_ATTEMPT',
        category: 'AUTH',
        details: `Failed login attempt for ${email}`,
        ipAddress: req.ip
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    // Update last login
    dataStore.updateUser(user._id, { lastLogin: new Date().toISOString() });

    const token = generateToken(user);

    dataStore.logActivity({
      action: 'USER_LOGIN',
      category: 'AUTH',
      details: `${user.name} (${user.role}) logged in successfully.`,
      performedBy: { id: user._id, name: user.name, email: user.email },
      ipAddress: req.ip
    });

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'An internal authentication error occurred.'
    });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters in length.'
      });
    }

    const user = dataStore.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    dataStore.updateUser(user._id, { passwordHash: newHash });

    dataStore.logActivity({
      action: 'PASSWORD_CHANGED',
      category: 'AUTH',
      details: `${user.name} updated their security password.`,
      performedBy: { id: user._id, name: user.name, email: user.email },
      ipAddress: req.ip
    });

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update password.' });
  }
};

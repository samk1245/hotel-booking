import jwt from 'jsonwebtoken';
import { dataStore } from '../models/dataStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'grand-azure-luxury-hotel-secret-key-2026';

export const authenticate = async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Access to private management is restricted to authorized personnel.'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = dataStore.getUserById(decoded.id);

    if (!user || user.isActive === false) {
      return res.status(401).json({
        success: false,
        message: 'Account not authorized or deactivated.'
      });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.'
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Privilege error: You do not have permission to execute this administrative operation.'
      });
    }
    next();
  };
};

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
};

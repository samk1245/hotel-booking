import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { seedData } from './utils/seed.js';

import authRoutes from './routes/authRoutes.js';
import roomsRoutes from './routes/roomsRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import offersRoutes from './routes/offersRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Dev flexible
  },
  credentials: true
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Serve uploaded static files
const uploadDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadDir));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    hotel: 'The Grand Azure Resort & Spa',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/upload', uploadRoutes);

// 404 handler for unmatched API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'Requested API endpoint does not exist.' });
});

// Serve frontend in production or if client/dist exists
const clientDistPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred.'
  });
});

// Bootstrap server
const startServer = async () => {
  try {
    await connectDB();
    await seedData();

    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`\n======================================================`);
        console.log(`✨ The Grand Azure Resort & Spa API is online on port ${PORT}`);
        console.log(`📡 Base API URL: http://localhost:${PORT}/api`);
        console.log(`🔐 Admin Route: ${process.env.ADMIN_PATH || '/private-management'} (Configurable)`);
        console.log(`======================================================\n`);
      });
    }
  } catch (error) {
    console.error('Fatal startup error:', error);
    process.exit(1);
  }
};

startServer();

export default app;

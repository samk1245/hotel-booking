import mongoose from 'mongoose';
import { dataStore } from '../models/dataStore.js';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('[Database] MONGODB_URI not provided. Running in high-reliability Embedded JSON DataStore mode.');
    dataStore.useMongoose = false;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    dataStore.useMongoose = true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection attempt failed (${error.message}). Falling back to Embedded JSON DataStore for zero-friction local development.`);
    dataStore.useMongoose = false;
  }
};

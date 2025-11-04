import mongoose from 'mongoose';
import { dbConfig } from '../config/db.config.js';

export const connectDB = async () => {
  try {
    console.log("db config: ", dbConfig);
    await mongoose.connect(dbConfig.uri, dbConfig.options);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

export default mongoose;

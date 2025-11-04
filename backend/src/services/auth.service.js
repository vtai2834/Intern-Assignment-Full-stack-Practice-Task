import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';
import { getRedisClient } from '../config/redis.js';

export class AuthService {
  static async signup(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      const error = new Error('Email already registered');
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({ name, email, password_hash });

    return { user };
  }

  static async login(credentials) {
    const { email, password } = credentials;

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Store refresh token in Redis
    const redisClient = getRedisClient();
    await redisClient.setEx(
      `refresh_token:${user.id}`,
      7 * 24 * 60 * 60, // 7 days
      refreshToken
    );

    // Remove password from user object
    delete user.password_hash;

    return { user, accessToken, refreshToken };
  }

  static async refreshToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Check if token exists in Redis
      const redisClient = getRedisClient();
      const storedToken = await redisClient.get(`refresh_token:${decoded.id}`);

      if (!storedToken || storedToken !== refreshToken) {
        const error = new Error('Invalid refresh token');
        error.statusCode = 401;
        throw error;
      }

      // Generate new access token
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      const accessToken = this.generateAccessToken(user);

      return { accessToken };
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        error.statusCode = 401;
        error.message = 'Invalid or expired refresh token';
      }
      throw error;
    }
  }

  static async logout(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Remove refresh token from Redis
      const redisClient = getRedisClient();
      await redisClient.del(`refresh_token:${decoded.id}`);
    } catch (error) {
      // If token is invalid, just ignore
      console.error('Error during logout:', error.message);
    }
  }

  static generateAccessToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
    );
  }

  static generateRefreshToken(user) {
    return jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
  }
}


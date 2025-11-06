import { AuthService } from '../services/auth.service.js';
import { validationResult } from 'express-validator';

export const AuthController = {
  // Sign up
  signup: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const { name, email, password } = req.body;
      const result = await AuthService.signup({ name, email, password });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  // Login
  login: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });

      // Set access token as httpOnly cookie (15 minutes)
      // Trong production, cần sameSite: 'none' và secure: true cho cross-origin
      const isProduction = process.env.NODE_ENV === 'production';
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: isProduction, // HTTPS only trong production
        sameSite: isProduction ? 'none' : 'lax', // 'none' cho cross-origin, 'lax' cho same-site
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/', // Set path để cookie available cho tất cả routes
      });

      // Set refresh token as httpOnly cookie (7 days)
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: isProduction, // HTTPS only trong production
        sameSite: isProduction ? 'none' : 'lax', // 'none' cho cross-origin, 'lax' cho same-site
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/', // Set path để cookie available cho tất cả routes
      });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Refresh token
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token not found'
        });
      }

      const result = await AuthService.refreshToken(refreshToken);

      // Set new access token as httpOnly cookie
      const isProduction = process.env.NODE_ENV === 'production';
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: isProduction, // HTTPS only trong production
        sameSite: isProduction ? 'none' : 'lax', // 'none' cho cross-origin, 'lax' cho same-site
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/', // Set path để cookie available cho tất cả routes
      });

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  // Logout
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      if (refreshToken) {
        await AuthService.logout(refreshToken);
      }

      // Clear both cookies - cần set cùng options như khi set cookie
      const isProduction = process.env.NODE_ENV === 'production';
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
      });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
      });
      
      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      next(error);
    }
  }
};


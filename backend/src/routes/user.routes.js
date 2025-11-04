import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET /api/users/me - Get current user profile (protected)
router.get('/me', authenticate, UserController.getProfile);

// PUT /api/users/me - Update current user profile (protected)
router.put('/me', authenticate, UserController.updateProfile);

export default router;


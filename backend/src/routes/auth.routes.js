import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { signupValidation, loginValidation } from '../middlewares/validation.middleware.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signupValidation, AuthController.signup);

// POST /api/auth/login
router.post('/login', loginValidation, AuthController.login);

// POST /api/auth/refresh
router.post('/refresh', AuthController.refreshToken);

// POST /api/auth/logout
router.post('/logout', AuthController.logout);

export default router;


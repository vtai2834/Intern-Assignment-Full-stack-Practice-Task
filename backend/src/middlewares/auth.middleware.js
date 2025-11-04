import jwt from 'jsonwebtoken';
import { getRedisClient } from '../config/redis.js';

export const authenticate = async (req, res, next) => {
  try {
    // Lấy accessToken từ cookie
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    // Kiểm tra token có tồn tại trong Redis không
    const redisClient = getRedisClient();
    const storedToken = await redisClient.get(`access_token:${decoded.id}`);

    if (!storedToken || storedToken !== accessToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        code: 'TOKEN_INVALID'
      });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        code: 'TOKEN_INVALID'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Load environment variables FIRST
import './env.js';

import { createClient } from 'redis';

let redisClient = null;

export const connectRedis = async () => {
  try {
    // Ưu tiên dùng REDIS_URL nếu có (Render, Heroku, etc. thường cung cấp URL này)
    if (process.env.REDIS_URL) {
      const url = process.env.REDIS_URL;
      const useTLS = url.startsWith('rediss://');
      
      console.log(`🔗 Connecting to Redis via URL (TLS: ${useTLS})`);
      
      redisClient = createClient({
        url,
        socket: useTLS
          ? { 
              tls: true,
              rejectUnauthorized: false // Bỏ verify cert cho cloud services
            }
          : {},
      });
    } else {
      // Fallback: dùng REDIS_HOST, REDIS_PORT nếu không có REDIS_URL
      // Dùng object config trực tiếp như Redis Cloud recommend
      const host = process.env.REDIS_HOST || 'localhost';
      const port = parseInt(process.env.REDIS_PORT || '6379', 10);
      const username = process.env.REDIS_USERNAME || 'default';
      const password = process.env.REDIS_PASSWORD;
      
      // Kiểm tra REDIS_TLS env variable để force enable/disable TLS
      // Mặc định không dùng TLS (Redis Cloud thường không cần TLS)
      const useTLS = process.env.REDIS_TLS === 'true';

      console.log(`🔗 Connecting to Redis: ${host}:${port} (TLS: ${useTLS})`);

      redisClient = createClient({
        username: username,
        password: password,
        socket: {
          host: host,
          port: port,
          ...(useTLS ? { 
            tls: true,
            rejectUnauthorized: false // Bỏ verify cert cho cloud services
          } : {})
        }
      });
    }

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
    throw error;
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
};

export const disconnectRedis = async () => {
  if (redisClient) {
    await redisClient.quit();
  }
};


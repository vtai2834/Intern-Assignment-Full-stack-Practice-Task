import { createClient } from 'redis';

let redisClient = null;

export const connectRedis = async () => {
  try {
    const isCloud = !!process.env.REDIS_HOST && process.env.REDIS_HOST.includes('redns.redis-cloud.com');

    // Nếu là Redis Cloud → dùng rediss:// (TLS)
    const url = isCloud
      ? `rediss://${process.env.REDIS_USERNAME || 'default'}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
      : `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`;

    redisClient = createClient({
      url,
      socket: isCloud
        ? { rejectUnauthorized: false } // Bỏ verify cert nếu là Redis Cloud
        : {}, // Local thì không cần TLS
    });

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


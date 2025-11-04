import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from './db.js';
import User from '../models/user.model.js';

dotenv.config();

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      {
        name: 'Test User',
        email: 'test@example.com',
        password_hash: hashedPassword
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password_hash: hashedPassword
      },
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password_hash: hashedPassword
      }
    ];

    await User.insertMany(users);
    console.log('✅ Users seeded successfully');
    console.log('\n📋 Test accounts:');
    users.forEach(user => {
      console.log(`   - ${user.email} / password123`);
    });
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

const runSeed = async () => {
  try {
    await connectDB();
    console.log('🌱 Seeding database...\n');
    
    await seedUsers();
    
    console.log('\n✅ Database seeded successfully');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await disconnectDB();
    process.exit(1);
  }
};

runSeed();

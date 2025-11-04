import { UserModel } from '../models/user.model.js';

export class UserService {
  static async getUserById(userId) {
    const user = await UserModel.findById(userId);
    return user;
  }

  static async updateUser(userId, userData) {
    const { name, email } = userData;

    // Check if email is being changed and if it's already taken
    if (email) {
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        const error = new Error('Email already in use');
        error.statusCode = 400;
        throw error;
      }
    }

    const updatedUser = await UserModel.update(userId, { name, email });

    if (!updatedUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    return updatedUser;
  }
}


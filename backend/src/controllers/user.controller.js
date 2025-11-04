import { UserService } from '../services/user.service.js';

export const UserController = {
  // Get current user profile
  getProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  // Update user profile
  updateProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { name, email } = req.body;

      const updatedUser = await UserService.updateUser(userId, { name, email });

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: { user: updatedUser }
      });
    } catch (error) {
      next(error);
    }
  }
};


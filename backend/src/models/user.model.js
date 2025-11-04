import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must not exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password_hash: {
      type: String,
      required: [true, 'Password is required'],
      select: false // Don't include password in queries by default
    }
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
    collection: 'users'
  }
);

// Index for faster email lookups
userSchema.index({ email: 1 });

// Virtual field to rename _id to id
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password_hash;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;

// Model methods for backward compatibility
export const UserModel = {
  // Create new user
  create: async (userData) => {
    const user = new User(userData);
    await user.save();
    return user.toJSON();
  },

  // Find user by email (with password)
  findByEmail: async (email) => {
    return await User.findOne({ email }).select('+password_hash').lean();
  },

  // Find user by ID
  findById: async (id) => {
    const user = await User.findById(id).lean();
    if (!user) return null;
    
    // Transform _id to id
    const { _id, __v, ...rest } = user;
    return { id: _id.toString(), ...rest };
  },

  // Update user
  update: async (id, userData) => {
    const user = await User.findByIdAndUpdate(
      id,
      { ...userData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();
    
    if (!user) return null;
    
    const { _id, __v, password_hash, ...rest } = user;
    return { id: _id.toString(), ...rest };
  },

  // Delete user
  delete: async (id) => {
    await User.findByIdAndDelete(id);
  }
};

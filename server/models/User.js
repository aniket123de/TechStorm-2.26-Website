const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define user roles with their permissions
const ROLES = {
  CORE: 'core',
  COORDINATOR: 'coordinator', 
  VOLUNTEER: 'volunteer'
};

const PERMISSIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
};

// Role-permission mapping
const ROLE_PERMISSIONS = {
  [ROLES.CORE]: [PERMISSIONS.CREATE, PERMISSIONS.READ, PERMISSIONS.UPDATE, PERMISSIONS.DELETE],
  [ROLES.COORDINATOR]: [PERMISSIONS.READ, PERMISSIONS.UPDATE],
  [ROLES.VOLUNTEER]: [PERMISSIONS.READ]
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.VOLUNTEER,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0,
    max: 5
  },
  lockUntil: {
    type: Date
  },
  // Additional profile fields
  phone: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  studentId: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Method to get user permissions based on role
userSchema.methods.getPermissions = function() {
  return ROLE_PERMISSIONS[this.role] || [];
};

// Method to check if user has specific permission
userSchema.methods.hasPermission = function(permission) {
  const userPermissions = this.getPermissions();
  return userPermissions.includes(permission);
};

// Method to check if user can perform CRUD operations
userSchema.methods.canCreate = function() {
  return this.hasPermission(PERMISSIONS.CREATE);
};

userSchema.methods.canRead = function() {
  return this.hasPermission(PERMISSIONS.READ);
};

userSchema.methods.canUpdate = function() {
  return this.hasPermission(PERMISSIONS.UPDATE);
};

userSchema.methods.canDelete = function() {
  return this.hasPermission(PERMISSIONS.DELETE);
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to handle login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: {
        loginAttempts: 1
      },
      $unset: {
        lockUntil: 1
      }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock the account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: {
      loginAttempts: 1,
      lockUntil: 1
    },
    $set: {
      lastLogin: new Date()
    }
  });
};

// Index for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS
};

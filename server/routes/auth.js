const express = require('express');
const jwt = require('jsonwebtoken');
const { User, ROLES } = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { 
  validate, 
  registerSchema, 
  loginSchema, 
  changePasswordSchema 
} = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const { securityLogger } = require('../middleware/logger');

const router = express.Router();

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

/**
 * Register new user
 * POST /api/auth/register
 */
router.post('/register', 
  securityLogger('USER_REGISTRATION'),
  validate(registerSchema), 
  asyncHandler(async (req, res) => {
    const { name, email, password, role, phone, department, studentId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'Registration failed',
        message: 'A user with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || ROLES.VOLUNTEER, // Default to volunteer if not specified
      phone,
      department,
      studentId
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      department: user.department,
      studentId: user.studentId,
      isActive: user.isActive,
      createdAt: user.createdAt,
      permissions: user.getPermissions()
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  })
);

/**
 * Login user
 * POST /api/auth/login
 */
router.post('/login',
  securityLogger('USER_LOGIN'),
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email or password'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        error: 'Account locked',
        message: 'Account is temporarily locked due to multiple failed login attempts'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account deactivated',
        message: 'Your account has been deactivated'
      });
    }

    // Compare password
    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      // Increment login attempts
      await user.incLoginAttempts();
      
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email or password'
      });
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    // Generate token
    const token = generateToken(user._id);

    // Prepare response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      department: user.department,
      studentId: user.studentId,
      isActive: user.isActive,
      lastLogin: new Date(),
      permissions: user.getPermissions()
    };

    res.json({
      message: 'Login successful',
      user: userResponse,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  })
);

/**
 * Get current user profile
 * GET /api/auth/profile
 */
router.get('/profile',
  authenticate,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile not found'
      });
    }

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      department: user.department,
      studentId: user.studentId,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      permissions: user.getPermissions()
    };

    res.json({
      message: 'Profile retrieved successfully',
      user: userResponse
    });
  })
);

/**
 * Change password
 * POST /api/auth/change-password
 */
router.post('/change-password',
  authenticate,
  securityLogger('PASSWORD_CHANGE'),
  validate(changePasswordSchema),
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      message: 'Password changed successfully'
    });
  })
);

/**
 * Logout user (if using token blacklisting)
 * POST /api/auth/logout
 */
router.post('/logout',
  authenticate,
  securityLogger('USER_LOGOUT'),
  asyncHandler(async (req, res) => {
    // In a JWT-based system, logout is typically handled client-side
    // by removing the token. For additional security, you could implement
    // token blacklisting here.

    res.json({
      message: 'Logout successful'
    });
  })
);

/**
 * Refresh token
 * POST /api/auth/refresh
 */
router.post('/refresh',
  authenticate,
  asyncHandler(async (req, res) => {
    // Generate new token
    const token = generateToken(req.user._id);

    res.json({
      message: 'Token refreshed successfully',
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  })
);

/**
 * Check authentication status
 * GET /api/auth/check
 */
router.get('/check',
  authenticate,
  asyncHandler(async (req, res) => {
    res.json({
      authenticated: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        permissions: req.user.getPermissions()
      }
    });
  })
);

module.exports = router;

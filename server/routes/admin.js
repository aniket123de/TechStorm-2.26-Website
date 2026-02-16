const express = require('express');
const { User, ROLES } = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { requireCore } = require('../middleware/rbac');
const { asyncHandler } = require('../middleware/errorHandler');
const { securityLogger } = require('../middleware/logger');

const router = express.Router();

/**
 * All admin routes require Core role
 */
router.use(authenticate);
router.use(requireCore);

/**
 * Get system dashboard statistics
 * GET /api/admin/dashboard
 * Permissions: Core only
 */
router.get('/dashboard',
  asyncHandler(async (req, res) => {
    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      lockedUsers,
      roleStats,
      recentUsers,
      recentLogins
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: false }),
      User.countDocuments({ lockUntil: { $gt: new Date() } }),
      User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 }
          }
        }
      ]),
      User.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('name email role createdAt'),
      User.find({ lastLogin: { $exists: true } })
        .sort({ lastLogin: -1 })
        .limit(10)
        .select('name email role lastLogin')
    ]);

    const roleDistribution = Object.values(ROLES).reduce((acc, role) => {
      const stat = roleStats.find(s => s._id === role);
      acc[role] = stat ? stat.count : 0;
      return acc;
    }, {});

    res.json({
      message: 'Dashboard statistics retrieved successfully',
      stats: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: inactiveUsers,
          locked: lockedUsers
        },
        roleDistribution,
        recentUsers: recentUsers.map(user => ({
          ...user.toJSON(),
          permissions: user.getPermissions()
        })),
        recentLogins: recentLogins.map(user => ({
          ...user.toJSON(),
          permissions: user.getPermissions()
        }))
      },
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * Get system health status
 * GET /api/admin/health
 * Permissions: Core only
 */
router.get('/health',
  asyncHandler(async (req, res) => {
    const mongoose = require('mongoose');
    
    const health = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: {
        status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        name: mongoose.connection.name,
        host: mongoose.connection.host,
        port: mongoose.connection.port
      },
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0'
    };

    res.json({
      message: 'System health check completed',
      health
    });
  })
);

/**
 * Bulk update user roles
 * POST /api/admin/bulk-role-update
 * Permissions: Core only
 */
router.post('/bulk-role-update',
  securityLogger('BULK_ROLE_UPDATE'),
  asyncHandler(async (req, res) => {
    const { userIds, newRole, reason } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'userIds must be a non-empty array'
      });
    }

    if (!Object.values(ROLES).includes(newRole)) {
      return res.status(400).json({
        error: 'Invalid role',
        message: `Role must be one of: ${Object.values(ROLES).join(', ')}`
      });
    }

    // Prevent changing own role
    if (userIds.includes(req.user._id.toString())) {
      return res.status(403).json({
        error: 'Operation not allowed',
        message: 'You cannot change your own role'
      });
    }

    const users = await User.find({ 
      _id: { $in: userIds } 
    }).select('name email role');

    if (users.length !== userIds.length) {
      return res.status(404).json({
        error: 'Some users not found',
        message: 'One or more user IDs are invalid'
      });
    }

    // Update roles
    await User.updateMany(
      { _id: { $in: userIds } },
      { role: newRole }
    );

    // Log the changes
    const changes = users.map(user => ({
      userId: user._id,
      email: user.email,
      oldRole: user.role,
      newRole
    }));

    console.log(`Bulk role update by ${req.user.email}:`, changes);

    res.json({
      message: 'Bulk role update completed successfully',
      updatedCount: users.length,
      changes,
      updatedBy: req.user.email,
      reason: reason || 'Not provided',
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * Bulk activate/deactivate users
 * POST /api/admin/bulk-status-update
 * Permissions: Core only
 */
router.post('/bulk-status-update',
  securityLogger('BULK_STATUS_UPDATE'),
  asyncHandler(async (req, res) => {
    const { userIds, isActive, reason } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'userIds must be a non-empty array'
      });
    }

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'isActive must be a boolean value'
      });
    }

    // Prevent changing own status
    if (userIds.includes(req.user._id.toString())) {
      return res.status(403).json({
        error: 'Operation not allowed',
        message: 'You cannot change your own account status'
      });
    }

    const users = await User.find({ 
      _id: { $in: userIds } 
    }).select('name email isActive');

    if (users.length !== userIds.length) {
      return res.status(404).json({
        error: 'Some users not found',
        message: 'One or more user IDs are invalid'
      });
    }

    // Update status
    await User.updateMany(
      { _id: { $in: userIds } },
      { isActive }
    );

    // Log the changes
    const changes = users.map(user => ({
      userId: user._id,
      email: user.email,
      oldStatus: user.isActive,
      newStatus: isActive
    }));

    console.log(`Bulk status update by ${req.user.email}:`, changes);

    res.json({
      message: 'Bulk status update completed successfully',
      updatedCount: users.length,
      changes,
      updatedBy: req.user.email,
      reason: reason || 'Not provided',
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * Create initial core user (for setup)
 * POST /api/admin/create-core-user
 * Permissions: Core only OR first user (when no core users exist)
 */
router.post('/create-core-user',
  securityLogger('CORE_USER_CREATION'),
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'name, email, and password are required'
      });
    }

    // Check if this is the first core user setup
    const existingCoreUsers = await User.countDocuments({ role: ROLES.CORE });
    
    // If core users exist and current user is not core, deny access
    if (existingCoreUsers > 0 && req.user.role !== ROLES.CORE) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Only existing core users can create new core users'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'User creation failed',
        message: 'A user with this email already exists'
      });
    }

    // Create core user
    const coreUser = new User({
      name,
      email,
      password,
      role: ROLES.CORE
    });

    await coreUser.save();

    const userResponse = {
      _id: coreUser._id,
      name: coreUser.name,
      email: coreUser.email,
      role: coreUser.role,
      isActive: coreUser.isActive,
      createdAt: coreUser.createdAt,
      permissions: coreUser.getPermissions()
    };

    res.status(201).json({
      message: 'Core user created successfully',
      user: userResponse,
      createdBy: req.user ? req.user.email : 'System Setup',
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * Get user activity logs (simplified version)
 * GET /api/admin/user-activity
 * Permissions: Core only
 */
router.get('/user-activity',
  asyncHandler(async (req, res) => {
    const { userId, limit = 50 } = req.query;

    const filter = {};
    if (userId) {
      filter._id = userId;
    }

    // In a real application, you'd have an activity log collection
    // For now, we'll return user login information
    const users = await User.find(filter)
      .select('name email role lastLogin loginAttempts isActive createdAt')
      .sort({ lastLogin: -1 })
      .limit(parseInt(limit));

    const activity = users.map(user => ({
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
      loginAttempts: user.loginAttempts,
      isActive: user.isActive,
      accountAge: Math.floor((new Date() - user.createdAt) / (1000 * 60 * 60 * 24)) // days
    }));

    res.json({
      message: 'User activity retrieved successfully',
      activity,
      totalRecords: activity.length,
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * Reset user password (emergency function)
 * POST /api/admin/reset-password/:userId
 * Permissions: Core only
 */
router.post('/reset-password/:userId',
  securityLogger('ADMIN_PASSWORD_RESET'),
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { newPassword, reason } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        error: 'Invalid password',
        message: 'New password must be at least 6 characters long'
      });
    }

    // Prevent resetting own password through admin route
    if (userId === req.user._id.toString()) {
      return res.status(403).json({
        error: 'Operation not allowed',
        message: 'Use the change password endpoint for your own password'
      });
    }

    const user = await User.findById(userId).select('+password');
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      });
    }

    // Update password
    user.password = newPassword;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Log the password reset
    console.log(`Password reset: ${user.email} by ${req.user.email}. Reason: ${reason || 'Not provided'}`);

    res.json({
      message: 'Password reset successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      resetBy: req.user.email,
      reason: reason || 'Not provided',
      timestamp: new Date().toISOString()
    });
  })
);

module.exports = router;

const express = require('express');
const { User, ROLES } = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { 
  requireRead, 
  requireUpdate, 
  requireDelete,
  requireCore,
  requireResourceAccess 
} = require('../middleware/rbac');
const { 
  validate, 
  updateUserSchema,
  updateRoleSchema,
  validateObjectId,
  validatePagination 
} = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const { securityLogger } = require('../middleware/logger');

const router = express.Router();

/**
 * Get all users (with pagination and filtering)
 * GET /api/users
 * Permissions: READ
 */
router.get('/',
  authenticate,
  requireRead,
  validatePagination,
  asyncHandler(async (req, res) => {
    const { page, limit, sortBy, sortOrder } = req.pagination;
    const { role, isActive, search } = req.query;

    // Build filter
    const filter = {};
    
    if (role && Object.values(ROLES).includes(role)) {
      filter.role = role;
    }
    
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort = { createdAt: -1 };
    }

    // Execute query with pagination
    const users = await User.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password');

    const total = await User.countDocuments(filter);

    // Add permissions to each user
    const usersWithPermissions = users.map(user => ({
      ...user.toJSON(),
      permissions: user.getPermissions()
    }));

    res.json({
      message: 'Users retrieved successfully',
      data: usersWithPermissions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  })
);

/**
 * Get user by ID
 * GET /api/users/:id
 * Permissions: READ (own profile) or Core role
 */
router.get('/:id',
  authenticate,
  validateObjectId('id'),
  requireResourceAccess(),
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      });
    }

    const userResponse = {
      ...user.toJSON(),
      permissions: user.getPermissions()
    };

    res.json({
      message: 'User retrieved successfully',
      user: userResponse
    });
  })
);

/**
 * Update user profile
 * PUT /api/users/:id
 * Permissions: UPDATE (own profile) or Core role
 */
router.put('/:id',
  authenticate,
  validateObjectId('id'),
  validate(updateUserSchema),
  requireResourceAccess(),
  asyncHandler(async (req, res) => {
    const { name, email, phone, department, studentId } = req.body;

    // Check if email is being changed and if it's already taken
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.params.id } 
      });
      
      if (existingUser) {
        return res.status(409).json({
          error: 'Update failed',
          message: 'Email is already in use by another user'
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(department !== undefined && { department }),
        ...(studentId !== undefined && { studentId })
      },
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      });
    }

    const userResponse = {
      ...user.toJSON(),
      permissions: user.getPermissions()
    };

    res.json({
      message: 'User updated successfully',
      user: userResponse
    });
  })
);

/**
 * Update user role (Core only)
 * PATCH /api/users/:id/role
 * Permissions: Core only
 */
router.patch('/:id/role',
  authenticate,
  requireCore,
  validateObjectId('id'),
  validate(updateRoleSchema),
  securityLogger('ROLE_CHANGE'),
  asyncHandler(async (req, res) => {
    const { role, reason } = req.body;

    // Prevent self-role modification
    if (req.params.id === req.user._id.toString()) {
      return res.status(403).json({
        error: 'Operation not allowed',
        message: 'You cannot change your own role'
      });
    }

    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      });
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    // Log role change for audit
    console.log(`Role change: ${user.email} from ${oldRole} to ${role} by ${req.user.email}. Reason: ${reason || 'Not provided'}`);

    const userResponse = {
      ...user.toJSON(),
      permissions: user.getPermissions()
    };

    res.json({
      message: 'User role updated successfully',
      user: userResponse,
      change: {
        from: oldRole,
        to: role,
        changedBy: req.user.email,
        reason: reason || 'Not provided',
        timestamp: new Date().toISOString()
      }
    });
  })
);

/**
 * Deactivate/Activate user (Core only)
 * PATCH /api/users/:id/status
 * Permissions: Core only
 */
router.patch('/:id/status',
  authenticate,
  requireCore,
  validateObjectId('id'),
  securityLogger('USER_STATUS_CHANGE'),
  asyncHandler(async (req, res) => {
    const { isActive, reason } = req.body;

    // Prevent self-status modification
    if (req.params.id === req.user._id.toString()) {
      return res.status(403).json({
        error: 'Operation not allowed',
        message: 'You cannot change your own account status'
      });
    }

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'isActive must be a boolean value'
      });
    }

    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      });
    }

    const oldStatus = user.isActive;
    user.isActive = isActive;
    await user.save();

    // Log status change for audit
    console.log(`Status change: ${user.email} from ${oldStatus ? 'active' : 'inactive'} to ${isActive ? 'active' : 'inactive'} by ${req.user.email}. Reason: ${reason || 'Not provided'}`);

    const userResponse = {
      ...user.toJSON(),
      permissions: user.getPermissions()
    };

    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: userResponse,
      change: {
        from: oldStatus,
        to: isActive,
        changedBy: req.user.email,
        reason: reason || 'Not provided',
        timestamp: new Date().toISOString()
      }
    });
  })
);

/**
 * Delete user (Core only)
 * DELETE /api/users/:id
 * Permissions: Core only
 */
router.delete('/:id',
  authenticate,
  requireCore,
  requireDelete,
  validateObjectId('id'),
  securityLogger('USER_DELETION'),
  asyncHandler(async (req, res) => {
    // Prevent self-deletion
    if (req.params.id === req.user._id.toString()) {
      return res.status(403).json({
        error: 'Operation not allowed',
        message: 'You cannot delete your own account'
      });
    }

    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User with the specified ID does not exist'
      });
    }

    // Log deletion for audit
    console.log(`User deletion: ${user.email} deleted by ${req.user.email}`);

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: 'User deleted successfully',
      deletedUser: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      deletedBy: req.user.email,
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * Get user statistics (Core only)
 * GET /api/users/stats
 * Permissions: Core only
 */
router.get('/admin/stats',
  authenticate,
  requireCore,
  asyncHandler(async (req, res) => {
    const [
      totalUsers,
      activeUsers,
      roleStats,
      recentUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
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
        .limit(5)
        .select('name email role createdAt')
    ]);

    const roleDistribution = roleStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.json({
      message: 'User statistics retrieved successfully',
      stats: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        roleDistribution,
        recentUsers: recentUsers.map(user => ({
          ...user.toJSON(),
          permissions: user.getPermissions()
        }))
      }
    });
  })
);

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const { User, ROLES } = require('../models/User');
const roleCredentials = require('../config/roleCredentials.json');
const { asyncHandler } = require('../middleware/errorHandler');
const { securityLogger } = require('../middleware/logger');

const router = express.Router();

/**
 * Generate JWT token
 */
const generateToken = (userId, role, eventAbbr) => {
  return jwt.sign(
    { 
      userId,
      role,
      eventAbbr: eventAbbr || null
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

/**
 * Get all events with credentials info (for debugging/admin)
 * GET /api/admin-auth/events
 */
router.get('/events',
  asyncHandler(async (req, res) => {
    const coordinators = roleCredentials.coordinator.map(coord => ({
      name: coord.event,
      email: coord.email,
      role: 'coordinator'
    }));

    const volunteers = roleCredentials.volunteer.map(vol => ({
      name: vol.event,
      email: vol.email,
      role: 'volunteer'
    }));

    res.json({
      message: 'Events retrieved successfully',
      coordinators,
      volunteers,
      core: {
        email: roleCredentials.core[0].email
      },
      total: coordinators.length
    });
  })
);

/**
 * Admin login endpoint
 * POST /api/admin-auth/login
 * Body: { email, password }
 */
router.post('/login',
  securityLogger('ADMIN_LOGIN_ATTEMPT'),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', { email, passwordLength: password?.length });

    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Email and password are required'
      });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Find matching credentials
    let credentialMatch = null;
    let role = null;
    let eventInfo = null;

    // Check core
    if (normalizedEmail === roleCredentials.core[0].email.toLowerCase()) {
      if (password === roleCredentials.core[0].password) {
        credentialMatch = roleCredentials.core[0];
        role = 'core';
      }
    }

    // Check coordinators
    if (!credentialMatch) {
      const coordinator = roleCredentials.coordinator.find(
        c => c.email.toLowerCase() === normalizedEmail
      );
      if (coordinator && password === coordinator.password) {
        credentialMatch = coordinator;
        role = 'coordinator';
        eventInfo = {
          name: coordinator.event,
          abbr: coordinator.eventAbbr
        };
      }
    }

    // Check volunteers
    if (!credentialMatch) {
      const volunteer = roleCredentials.volunteer.find(
        v => v.email.toLowerCase() === normalizedEmail
      );
      if (volunteer && password === volunteer.password) {
        credentialMatch = volunteer;
        role = 'volunteer';
        eventInfo = {
          name: volunteer.event,
          abbr: volunteer.eventAbbr
        };
      }
    }

    console.log('📧 Credential match:', credentialMatch ? 'Found' : 'Not found');
    console.log('👤 Role:', role);
    
    if (!credentialMatch) {
      console.log('❌ Invalid credentials');
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials'
      });
    }

    // Find or create user in database
    let user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      // Create new admin user
      user = new User({
        name: credentialMatch.name,
        email: normalizedEmail,
        password: password,
        role: role,
        eventAbbr: eventInfo ? eventInfo.abbr : null,
        eventName: eventInfo ? eventInfo.name : null,
        department: 'Admin',
        isActive: true
      });

      await user.save();
      console.log(`✅ New admin user created: ${normalizedEmail} (${role})`);
    } else {
      // Verify user is not locked
      if (user.isLocked) {
        return res.status(423).json({
          error: 'Account locked',
          message: 'Account is temporarily locked due to multiple failed login attempts'
        });
      }

      // Verify user is active
      if (!user.isActive) {
        return res.status(401).json({
          error: 'Account deactivated',
          message: 'Your account has been deactivated'
        });
      }

      // Reset login attempts on successful login
      await user.resetLoginAttempts();
    }

    // Generate token
    const token = generateToken(user._id, user.role, user.eventAbbr);

    // Prepare response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      eventAbbr: user.eventAbbr,
      eventName: user.eventName,
      isActive: user.isActive,
      lastLogin: new Date(),
      permissions: user.getPermissions()
    };

    console.log(`✅ Admin login successful: ${normalizedEmail} (${user.role})`);

    res.json({
      message: 'Login successful',
      user: userResponse,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  })
);

/**
 * Verify admin token and get current admin info
 * GET /api/admin-auth/verify
 * Headers: Authorization: Bearer <token>
 */
router.get('/verify',
  asyncHandler(async (req, res) => {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Authentication token is required'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({
          error: 'Invalid token',
          message: 'User not found'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          error: 'Account deactivated',
          message: 'Your account has been deactivated'
        });
      }

      res.json({
        valid: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          eventAbbr: user.eventAbbr,
          eventName: user.eventName,
          permissions: user.getPermissions()
        }
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Token expired',
          message: 'Your session has expired. Please login again.'
        });
      }
      
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Authentication token is invalid'
      });
    }
  })
);

/**
 * Admin logout
 * POST /api/admin-auth/logout
 */
router.post('/logout',
  securityLogger('ADMIN_LOGOUT'),
  asyncHandler(async (req, res) => {
    // JWT logout is handled client-side by removing the token
    // This endpoint is for logging purposes
    res.json({
      message: 'Logout successful'
    });
  })
);

/**
 * Helper function to extract token from request
 */
function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  if (req.cookies && req.cookies.adminToken) {
    return req.cookies.adminToken;
  }
  
  return null;
}

module.exports = router;

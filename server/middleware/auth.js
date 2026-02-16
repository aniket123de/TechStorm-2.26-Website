const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

/**
 * Middleware to authenticate JWT tokens
 */
const authenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No authentication token provided'
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user
    const user = await User.findById(decoded.userId).select('+password');
    
    if (!user) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token - user not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Account is deactivated'
      });
    }

    if (user.isLocked) {
      return res.status(401).json({
        error: 'Account locked',
        message: 'Account is temporarily locked due to multiple failed login attempts'
      });
    }

    // Add user to request object (without password)
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      getPermissions: user.getPermissions.bind(user),
      hasPermission: user.hasPermission.bind(user),
      canCreate: user.canCreate.bind(user),
      canRead: user.canRead.bind(user),
      canUpdate: user.canUpdate.bind(user),
      canDelete: user.canDelete.bind(user)
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Token has expired'
      });
    }
    
    return res.status(500).json({
      error: 'Authentication failed',
      message: 'Internal server error during authentication'
    });
  }
};

/**
 * Extract token from request headers
 */
const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check for token in cookies (if you're using them)
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  
  return null;
};

/**
 * Middleware to check if user is authenticated (optional authentication)
 * Won't fail if no token is provided, but will set req.user if valid token exists
 */
const optionalAuthenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (user && user.isActive && !user.isLocked) {
      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        getPermissions: user.getPermissions.bind(user),
        hasPermission: user.hasPermission.bind(user),
        canCreate: user.canCreate.bind(user),
        canRead: user.canRead.bind(user),
        canUpdate: user.canUpdate.bind(user),
        canDelete: user.canDelete.bind(user)
      };
    }
    
    next();
  } catch (error) {
    // In optional auth, we don't fail on invalid tokens
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuthenticate
};

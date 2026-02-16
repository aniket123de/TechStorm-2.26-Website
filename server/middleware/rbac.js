const { ROLES, PERMISSIONS } = require('../models/User');

/**
 * Middleware factory to check if user has required permission
 * @param {string} requiredPermission - The permission required to access the route
 * @returns {Function} Express middleware function
 */
const requirePermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to access this resource'
      });
    }

    if (!req.user.hasPermission(requiredPermission)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: `You don't have permission to ${requiredPermission} this resource`,
        required: requiredPermission,
        userRole: req.user.role,
        userPermissions: req.user.getPermissions()
      });
    }

    next();
  };
};

/**
 * Middleware factory to check if user has one of the required roles
 * @param {...string} allowedRoles - The roles allowed to access the route
 * @returns {Function} Express middleware function
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to access this resource'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient privileges',
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`,
        userRole: req.user.role,
        requiredRoles: allowedRoles
      });
    }

    next();
  };
};

/**
 * Middleware to check CREATE permission
 */
const requireCreate = requirePermission(PERMISSIONS.CREATE);

/**
 * Middleware to check READ permission
 */
const requireRead = requirePermission(PERMISSIONS.READ);

/**
 * Middleware to check UPDATE permission
 */
const requireUpdate = requirePermission(PERMISSIONS.UPDATE);

/**
 * Middleware to check DELETE permission
 */
const requireDelete = requirePermission(PERMISSIONS.DELETE);

/**
 * Middleware to check if user is CORE (full admin access)
 */
const requireCore = requireRole(ROLES.CORE);

/**
 * Middleware to check if user is CORE or COORDINATOR
 */
const requireCoreOrCoordinator = requireRole(ROLES.CORE, ROLES.COORDINATOR);

/**
 * Middleware to allow access to all authenticated users (any role)
 */
const requireAnyRole = requireRole(ROLES.CORE, ROLES.COORDINATOR, ROLES.VOLUNTEER);

/**
 * Resource-specific authorization middleware
 * Checks if user can access/modify a specific resource based on ownership or role
 */
const requireResourceAccess = (resourceField = '_id') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to access this resource'
      });
    }

    // Core users have access to all resources
    if (req.user.role === ROLES.CORE) {
      return next();
    }

    // For other roles, check resource ownership
    const resourceId = req.params.id || req.params[resourceField];
    
    if (!resourceId) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Resource identifier not provided'
      });
    }

    // Allow access to own resources or if user has required permissions
    if (req.user._id.toString() === resourceId || req.user.hasPermission(PERMISSIONS.UPDATE)) {
      return next();
    }

    return res.status(403).json({
      error: 'Access denied',
      message: 'You can only access your own resources or need appropriate permissions',
      userRole: req.user.role
    });
  };
};

/**
 * Conditional permission middleware
 * Applies different permission checks based on HTTP method
 */
const requireCRUDPermissions = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'You must be logged in to access this resource'
    });
  }

  const method = req.method.toLowerCase();
  let requiredPermission;

  switch (method) {
    case 'post':
      requiredPermission = PERMISSIONS.CREATE;
      break;
    case 'get':
      requiredPermission = PERMISSIONS.READ;
      break;
    case 'put':
    case 'patch':
      requiredPermission = PERMISSIONS.UPDATE;
      break;
    case 'delete':
      requiredPermission = PERMISSIONS.DELETE;
      break;
    default:
      return res.status(405).json({
        error: 'Method not allowed',
        message: `HTTP method ${req.method} is not supported`
      });
  }

  if (!req.user.hasPermission(requiredPermission)) {
    return res.status(403).json({
      error: 'Insufficient permissions',
      message: `You don't have permission to ${requiredPermission} this resource`,
      required: requiredPermission,
      userRole: req.user.role,
      userPermissions: req.user.getPermissions()
    });
  }

  next();
};

/**
 * Middleware to log permission checks (for debugging)
 */
const logPermissionCheck = (req, res, next) => {
  if (req.user) {
    console.log(`Permission check: User ${req.user.email} (${req.user.role}) accessing ${req.method} ${req.path}`);
    console.log(`User permissions: ${req.user.getPermissions().join(', ')}`);
  }
  next();
};

module.exports = {
  requirePermission,
  requireRole,
  requireCreate,
  requireRead,
  requireUpdate,
  requireDelete,
  requireCore,
  requireCoreOrCoordinator,
  requireAnyRole,
  requireResourceAccess,
  requireCRUDPermissions,
  logPermissionCheck
};

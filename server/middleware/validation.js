const Joi = require('joi');
const { ROLES } = require('../models/User');

/**
 * Validation middleware factory
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });

    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors,
        timestamp: new Date().toISOString()
      });
    }

    // Replace req.body with sanitized data
    req.body = value;
    next();
  };
};

/**
 * User registration validation schema
 */
const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    }),
  
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'any.required': 'Password is required'
    }),
  
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .default(ROLES.VOLUNTEER)
    .messages({
      'any.only': `Role must be one of: ${Object.values(ROLES).join(', ')}`
    }),
  
  phone: Joi.string()
    .trim()
    .pattern(/^[\+]?[\d\s\-\(\)]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number'
    }),
  
  department: Joi.string()
    .trim()
    .max(100)
    .optional(),
  
  studentId: Joi.string()
    .trim()
    .max(50)
    .optional()
});

/**
 * User login validation schema
 */
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

/**
 * User update validation schema
 */
const updateUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  
  email: Joi.string()
    .email()
    .lowercase()
    .optional()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
  
  phone: Joi.string()
    .trim()
    .pattern(/^[\+]?[\d\s\-\(\)]+$/)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Please provide a valid phone number'
    }),
  
  department: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow(''),
  
  studentId: Joi.string()
    .trim()
    .max(50)
    .optional()
    .allow('')
});

/**
 * Password change validation schema
 */
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'Current password is required'
    }),
  
  newPassword: Joi.string()
    .min(6)
    .max(128)
    .required()
    .invalid(Joi.ref('currentPassword'))
    .messages({
      'string.min': 'New password must be at least 6 characters long',
      'string.max': 'New password cannot exceed 128 characters',
      'any.required': 'New password is required',
      'any.invalid': 'New password must be different from current password'
    }),
  
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Password confirmation does not match new password',
      'any.required': 'Password confirmation is required'
    })
});

/**
 * Role update validation schema (for admin use)
 */
const updateRoleSchema = Joi.object({
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .required()
    .messages({
      'any.only': `Role must be one of: ${Object.values(ROLES).join(', ')}`,
      'any.required': 'Role is required'
    }),
  
  reason: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .optional()
    .messages({
      'string.min': 'Reason must be at least 10 characters long',
      'string.max': 'Reason cannot exceed 500 characters'
    })
});

/**
 * MongoDB ObjectId validation
 */
const objectIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    'string.pattern.base': 'Invalid ID format',
    'any.required': 'ID is required'
  });

/**
 * Middleware to validate MongoDB ObjectId in URL params
 */
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const { error } = objectIdSchema.validate(req.params[paramName]);
    
    if (error) {
      return res.status(400).json({
        error: 'Invalid parameter',
        message: `Invalid ${paramName} format`,
        timestamp: new Date().toISOString()
      });
    }
    
    next();
  };
};

/**
 * Query parameter validation schemas
 */
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

const validatePagination = (req, res, next) => {
  const { error, value } = paginationSchema.validate(req.query, {
    allowUnknown: true,
    stripUnknown: false
  });

  if (error) {
    return res.status(400).json({
      error: 'Invalid query parameters',
      details: error.details.map(detail => detail.message),
      timestamp: new Date().toISOString()
    });
  }

  // Add validated pagination params to req
  req.pagination = {
    page: value.page,
    limit: value.limit,
    sortBy: value.sortBy,
    sortOrder: value.sortOrder
  };

  next();
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  updateUserSchema,
  changePasswordSchema,
  updateRoleSchema,
  validateObjectId,
  validatePagination
};

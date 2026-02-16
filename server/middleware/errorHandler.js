/**
 * Global error handling middleware
 */
const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // Log the error
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Mongoose validation errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    const validationErrors = Object.values(error.errors).map(err => err.message);
    message = 'Validation Error';
    
    return res.status(statusCode).json({
      error: message,
      details: validationErrors,
      timestamp: new Date().toISOString()
    });
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyValue)[0];
    message = `${field} already exists`;
    
    return res.status(statusCode).json({
      error: 'Duplicate entry',
      message,
      field,
      timestamp: new Date().toISOString()
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource identifier';
    
    return res.status(statusCode).json({
      error: 'Invalid ID',
      message,
      timestamp: new Date().toISOString()
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired';
  }

  // Default error response
  const response = {
    error: statusCode >= 500 ? 'Internal Server Error' : message,
    timestamp: new Date().toISOString()
  };

  // In development, include stack trace
  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
    response.details = error.message;
  }

  res.status(statusCode).json(response);
};

/**
 * Async error wrapper - wraps async route handlers to catch errors
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Handle 404 errors for API routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  asyncHandler,
  notFound
};

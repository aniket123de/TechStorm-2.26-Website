/**
 * Request logging middleware
 */
const logger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(`📥 ${req.method} ${req.originalUrl} - ${req.ip} - ${new Date().toISOString()}`);
  
  // Log user info if authenticated
  if (req.user) {
    console.log(`👤 User: ${req.user.email} (${req.user.role})`);
  }
  
  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '🔴' : res.statusCode >= 300 ? '🟡' : '🟢';
    
    console.log(`📤 ${statusColor} ${res.statusCode} ${req.method} ${req.originalUrl} - ${duration}ms`);
    
    // Log error responses
    if (res.statusCode >= 400 && data && data.error) {
      console.log(`❌ Error: ${data.error} - ${data.message || ''}`);
    }
    
    return originalJson.call(this, data);
  };
  
  next();
};

/**
 * Security logging middleware for sensitive operations
 */
const securityLogger = (operation) => {
  return (req, res, next) => {
    const logData = {
      operation,
      user: req.user ? `${req.user.email} (${req.user.role})` : 'Anonymous',
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString(),
      url: req.originalUrl,
      method: req.method
    };
    
    console.log(`🔐 Security Log: ${operation}`, logData);
    
    // You can extend this to log to a file or external service
    // Example: Winston, Elasticsearch, etc.
    
    next();
  };
};

module.exports = {
  logger,
  securityLogger
};

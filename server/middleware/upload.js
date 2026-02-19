const multer = require('multer');
const path = require('path');

// Configure multer for memory storage (files stored in memory as Buffer)
const storage = multer.memoryStorage();

// File filter to accept only images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (JPEG, PNG, GIF, WebP) and PDF files are allowed!'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter
});

// Middleware to handle multiple file uploads for event registration
// Using upload.any() to accept any file field dynamically (not just predefined names)
// This allows for event-specific file fields like 'collegeIdProof', 'teamIdCard', etc.
const uploadRegistrationFiles = upload.any();

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File Too Large',
        message: 'File size cannot exceed 5MB'
      });
    }
    return res.status(400).json({
      error: 'File Upload Error',
      message: err.message
    });
  } else if (err) {
    return res.status(400).json({
      error: 'Upload Error',
      message: err.message
    });
  }
  next();
};

module.exports = {
  upload,
  uploadRegistrationFiles,
  handleMulterError
};

const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

/**
 * Cloudinary Configuration
 * All uploads will be stored in the 'techstorm' folder
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Upload image to Cloudinary in techstorm folder
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {string} fileName - Original filename
 * @param {string} subfolder - Optional subfolder within techstorm (e.g., 'registrations', 'receipts')
 * @param {object} options - Additional Cloudinary options
 * @returns {Promise<object>} Upload result with secure_url and public_id
 */
const uploadToCloudinary = (fileBuffer, fileName, subfolder = 'registrations', options = {}) => {
  return new Promise((resolve, reject) => {
    // Generate unique public_id
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const publicId = `${subfolder}/${timestamp}_${sanitizedFileName}`;

    const uploadOptions = {
      folder: 'techstorm', // Main folder
      public_id: publicId,
      resource_type: 'auto', // Automatically detect file type
      overwrite: false,
      unique_filename: true,
      use_filename: true,
      ...options
    };

    // Upload stream
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('✅ Cloudinary upload success:', result.secure_url);
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            created_at: result.created_at
          });
        }
      }
    );

    // Write buffer to stream
    uploadStream.end(fileBuffer);
  });
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array} files - Array of {buffer, originalname} objects from multer
 * @param {string} subfolder - Subfolder within techstorm
 * @returns {Promise<Array>} Array of upload results
 */
const uploadMultipleToCloudinary = async (files, subfolder = 'registrations') => {
  const uploadPromises = files.map(file => 
    uploadToCloudinary(file.buffer, file.originalname, subfolder)
  );
  
  try {
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('❌ Multiple upload error:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<object>} Deletion result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('🗑️ Deleted from Cloudinary:', publicId);
    return result;
  } catch (error) {
    console.error('❌ Cloudinary deletion error:', error);
    throw error;
  }
};

/**
 * Get Cloudinary image URL with transformations
 * @param {string} publicId - Public ID of the image
 * @param {object} transformations - Cloudinary transformation options
 * @returns {string} Transformed image URL
 */
const getTransformedUrl = (publicId, transformations = {}) => {
  return cloudinary.url(publicId, {
    secure: true,
    ...transformations
  });
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  getTransformedUrl
};

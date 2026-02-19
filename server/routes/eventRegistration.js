const express = require('express');
const router = express.Router();
const EventRegistrationFactory = require('../models/EventRegistration');
const { asyncHandler } = require('../middleware/errorHandler');
const { optionalAuthenticate } = require('../middleware/auth');
const { uploadRegistrationFiles, handleMulterError } = require('../middleware/upload');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

/**
 * Register for an event
 * POST /api/event-registration/:eventName
 * Public endpoint - no authentication required
 * Handles file uploads to Cloudinary
 */
router.post('/:eventName',
  uploadRegistrationFiles,
  handleMulterError,
  asyncHandler(async (req, res) => {
    const { eventName } = req.params;
    let registrationData = { ...req.body };

    console.log('📥 Received registration for:', eventName);
    console.log('📝 Body data:', req.body);
    console.log('📎 Files:', req.files && Array.isArray(req.files) ? req.files.map(f => f.fieldname).join(', ') : 'No files');

    // Validate event name
    if (!eventName || eventName.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid event name',
        message: 'Event name is required',
        timestamp: new Date().toISOString()
      });
    }

    // Parse JSON strings back to objects/arrays
    if (registrationData.participants && typeof registrationData.participants === 'string') {
      try {
        registrationData.participants = JSON.parse(registrationData.participants);
        
        // Clean up empty idFile objects in participants array
        if (Array.isArray(registrationData.participants)) {
          registrationData.participants = registrationData.participants.map((participant, index) => {
            // Remove empty or null participants
            if (!participant.name || !participant.name.trim()) {
              return null;
            }
            
            // Remove empty idFile objects
            if (participant.idFile && typeof participant.idFile === 'object' && Object.keys(participant.idFile).length === 0) {
              delete participant.idFile;
            }
            
            return participant;
          }).filter(p => p !== null); // Remove null entries
        }
      } catch (e) {
        console.error('Error parsing participants:', e);
      }
    }

    // Handle file uploads based on type
    // Note: upload.any() provides req.files as an array, not an object
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      console.log('📁 Processing uploaded files...');
      console.log(`📎 Total files: ${req.files.length}`);
      
      try {
        const uploadPromises = req.files.map(async (file) => {
          const fieldName = file.fieldname; // Get field name from file object
          const fileExtension = file.originalname.split('.').pop().toLowerCase();
          const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
          const isPDF = fileExtension === 'pdf';
          
          console.log(`📄 Processing file: ${fieldName} (${file.originalname})`);
          
          if (isImage) {
            // Upload images to Cloudinary
            console.log(`☁️ Uploading image to Cloudinary: ${fieldName}`);
            
            // Determine subfolder based on field type
            let subfolder = 'registrations';
            if (fieldName.includes('payment') || fieldName.includes('receipt') || fieldName.includes('cash')) {
              subfolder = 'payments';
            } else if (fieldName.includes('id') || fieldName.includes('Id') || fieldName.toLowerCase().includes('proof')) {
              subfolder = 'id-proofs';
            }
            
            // Upload to Cloudinary in techstorm folder
            const uploadResult = await uploadToCloudinary(
              file.buffer,
              file.originalname,
              `techstorm/${subfolder}/${eventName}`,
              {
                tags: [eventName, fieldName, 'registration', 'techstorm'],
                context: `event=${eventName}|field=${fieldName}|type=image`
              }
            );
            
            // Store Cloudinary data in registration
            registrationData[fieldName] = file.originalname;
            registrationData[`${fieldName}Url`] = uploadResult.secure_url;
            registrationData[`${fieldName}CloudinaryId`] = uploadResult.public_id;
            
            console.log(`✅ Image uploaded to Cloudinary: ${uploadResult.secure_url}`);
            
          } else if (isPDF) {
            // Store PDFs directly in MongoDB as base64
            console.log(`💾 Storing PDF in MongoDB: ${fieldName}`);
            
            registrationData[fieldName] = file.originalname;
            registrationData[`${fieldName}Data`] = file.buffer.toString('base64');
            registrationData[`${fieldName}MimeType`] = file.mimetype;
            registrationData[`${fieldName}Size`] = file.size;
            
            console.log(`✅ PDF stored in MongoDB: ${file.originalname} (${(file.size / 1024).toFixed(2)}KB)`);
            
          } else {
            // Unknown file type - store in MongoDB
            console.log(`⚠️ Unknown file type, storing in MongoDB: ${fieldName}`);
            registrationData[fieldName] = file.originalname;
            registrationData[`${fieldName}Data`] = file.buffer.toString('base64');
            registrationData[`${fieldName}MimeType`] = file.mimetype;
          }
          
          return { fieldName, type: isImage ? 'cloudinary' : 'mongodb' };
        });
        
        await Promise.all(uploadPromises);
        console.log('✅ All files processed successfully');
        
      } catch (uploadError) {
        console.error('❌ File processing failed:', uploadError);
        return res.status(500).json({
          error: 'File Upload Failed',
          message: 'Failed to process uploaded files. Please try again.',
          details: uploadError.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Add eventName to registration data
    registrationData.eventName = eventName;

    // Get or create model for this event
    const RegistrationModel = EventRegistrationFactory.getModel(eventName);

    // Check for duplicate registration based on email or phone
    const duplicateQuery = [];
    
    // Handle email from different sources
    const email = registrationData.email || registrationData.emailAddress;
    // Handle phone from different sources
    const phone = registrationData.phone || registrationData.contactNumber || registrationData.contact;
    
    // Check participants array for email/phone
    if (registrationData.participants && Array.isArray(registrationData.participants)) {
      const firstParticipant = registrationData.participants[0];
      if (firstParticipant) {
        if (!email && firstParticipant.email) {
          registrationData.email = firstParticipant.email;
        }
        if (!phone && firstParticipant.contact) {
          registrationData.phone = firstParticipant.contact;
        }
      }
    }
    
    if (email) {
      duplicateQuery.push({ email: email.toLowerCase().trim() });
    }
    if (phone) {
      duplicateQuery.push({ phone: phone.trim() });
    }

    if (duplicateQuery.length > 0) {
      const existingRegistration = await RegistrationModel.findOne({
        $or: duplicateQuery
      });

      if (existingRegistration) {
        return res.status(409).json({
          error: 'Duplicate registration',
          message: 'A registration with this email or phone number already exists for this event',
          existingRegistration: {
            email: existingRegistration.email,
            phone: existingRegistration.phone,
            registeredAt: existingRegistration.submittedAt
          },
          timestamp: new Date().toISOString()
        });
      }
    }

    // Create new registration
    const registration = new RegistrationModel({
      ...registrationData,
      registrationStatus: 'confirmed',
      submittedAt: new Date()
    });

    // Save to database
    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        registrationId: registration._id,
        eventName: eventName,
        email: registration.email,
        phone: registration.phone,
        registrationStatus: registration.registrationStatus,
        submittedAt: registration.submittedAt
      }
    });
  })
);

/**
 * Get all registrations for an event
 * GET /api/event-registration/:eventName
 * Optional authentication - returns limited data for public access
 */
router.get('/:eventName',
  optionalAuthenticate,
  asyncHandler(async (req, res) => {
    const { eventName } = req.params;
    const { page = 1, limit = 50, status } = req.query;

    // Validate event name
    if (!eventName || eventName.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid event name',
        message: 'Event name is required'
      });
    }

    // Get model for this event
    const RegistrationModel = EventRegistrationFactory.getModel(eventName);

    // Build filter
    const filter = {};
    if (status) {
      filter.registrationStatus = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const registrations = await RegistrationModel
      .find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await RegistrationModel.countDocuments(filter);

    // Filter sensitive data if not authenticated or no READ permission
    let responseData = registrations;
    if (!req.user || !req.user.canRead()) {
      // Return only count for public access
      return res.json({
        message: 'Registration count retrieved',
        eventName: eventName,
        totalRegistrations: total,
        note: 'Full registration details require authentication'
      });
    }

    res.json({
      success: true,
      message: 'Registrations retrieved successfully',
      eventName: eventName,
      data: responseData,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalRegistrations: total,
        limit: parseInt(limit)
      }
    });
  })
);

/**
 * Get a specific registration by ID
 * GET /api/event-registration/:eventName/:registrationId
 * Requires authentication with READ permission
 */
router.get('/:eventName/:registrationId',
  optionalAuthenticate,
  asyncHandler(async (req, res) => {
    const { eventName, registrationId } = req.params;

    // Validate event name
    if (!eventName || eventName.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid event name',
        message: 'Event name is required'
      });
    }

    // Check authentication for detailed view
    if (!req.user || !req.user.canRead()) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Authentication with READ permission required to view registration details'
      });
    }

    // Get model for this event
    const RegistrationModel = EventRegistrationFactory.getModel(eventName);

    // Find registration
    const registration = await RegistrationModel.findById(registrationId).lean();

    if (!registration) {
      return res.status(404).json({
        error: 'Registration not found',
        message: 'No registration found with the specified ID for this event'
      });
    }

    res.json({
      success: true,
      message: 'Registration retrieved successfully',
      eventName: eventName,
      data: registration
    });
  })
);

/**
 * Update registration status
 * PATCH /api/event-registration/:eventName/:registrationId
 * Requires authentication with UPDATE permission
 */
router.patch('/:eventName/:registrationId',
  optionalAuthenticate,
  asyncHandler(async (req, res) => {
    const { eventName, registrationId } = req.params;
    const { registrationStatus } = req.body;

    // Check authentication
    if (!req.user || !req.user.canUpdate()) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Authentication with UPDATE permission required'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'waitlist'];
    if (registrationStatus && !validStatuses.includes(registrationStatus)) {
      return res.status(400).json({
        error: 'Invalid status',
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Get model for this event
    const RegistrationModel = EventRegistrationFactory.getModel(eventName);

    // Update registration
    const registration = await RegistrationModel.findByIdAndUpdate(
      registrationId,
      { 
        registrationStatus,
        updatedAt: new Date()
      },
      { new: true }
    ).lean();

    if (!registration) {
      return res.status(404).json({
        error: 'Registration not found',
        message: 'No registration found with the specified ID for this event'
      });
    }

    res.json({
      success: true,
      message: 'Registration updated successfully',
      data: registration
    });
  })
);

/**
 * Delete a registration
 * DELETE /api/event-registration/:eventName/:registrationId
 * Requires authentication with DELETE permission
 */
router.delete('/:eventName/:registrationId',
  optionalAuthenticate,
  asyncHandler(async (req, res) => {
    const { eventName, registrationId } = req.params;

    // Check authentication
    if (!req.user || !req.user.canDelete()) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Authentication with DELETE permission required'
      });
    }

    // Get model for this event
    const RegistrationModel = EventRegistrationFactory.getModel(eventName);

    // Delete registration
    const registration = await RegistrationModel.findByIdAndDelete(registrationId);

    if (!registration) {
      return res.status(404).json({
        error: 'Registration not found',
        message: 'No registration found with the specified ID for this event'
      });
    }

    res.json({
      success: true,
      message: 'Registration deleted successfully',
      deletedRegistration: {
        _id: registration._id,
        email: registration.email,
        eventName: eventName
      }
    });
  })
);

/**
 * Get registration statistics for an event
 * GET /api/event-registration/:eventName/stats
 * Public endpoint
 */
router.get('/:eventName/stats/summary',
  asyncHandler(async (req, res) => {
    const { eventName } = req.params;

    // Get model for this event
    const RegistrationModel = EventRegistrationFactory.getModel(eventName);

    // Get statistics
    const total = await RegistrationModel.countDocuments();
    const confirmed = await RegistrationModel.countDocuments({ registrationStatus: 'confirmed' });
    const pending = await RegistrationModel.countDocuments({ registrationStatus: 'pending' });
    const cancelled = await RegistrationModel.countDocuments({ registrationStatus: 'cancelled' });
    const waitlist = await RegistrationModel.countDocuments({ registrationStatus: 'waitlist' });

    res.json({
      success: true,
      eventName: eventName,
      statistics: {
        total,
        confirmed,
        pending,
        cancelled,
        waitlist
      }
    });
  })
);

module.exports = router;

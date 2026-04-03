const express = require('express');
const router = express.Router();
const EventRegistrationFactory = require('../models/EventRegistration');
const { asyncHandler } = require('../middleware/errorHandler');
const { optionalAuthenticate } = require('../middleware/auth');
const { uploadRegistrationFiles, handleMulterError } = require('../middleware/upload');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');
const { appendToSheet } = require('../config/googleSheets');

const getUploadSubfolder = (fieldName = '') => {
  if (fieldName.includes('payment') || fieldName.includes('receipt') || fieldName.includes('cash')) {
    return 'payments';
  }
  if (fieldName.includes('id') || fieldName.includes('Id') || fieldName.toLowerCase().includes('proof')) {
    return 'id-proofs';
  }
  return 'registrations';
};

const normalizeEventName = (value = '') => String(value).trim().toLowerCase().replace(/\s+/g, ' ');

const isTechHuntEvent = (eventName = '') => normalizeEventName(eventName) === 'tech hunt';

const hasUploadedFileValue = (value) => typeof value === 'string' && value.trim().length > 0;

const validateTechHuntRegistration = (registrationData = {}) => {
  const details = [];
  const participantCount = Number(registrationData.numberOfParticipants);
  const participants = Array.isArray(registrationData.participants) ? registrationData.participants : [];

  if (!registrationData.teamName || !String(registrationData.teamName).trim()) {
    details.push('Team name is required for Tech Hunt registrations');
  }

  if (!Number.isInteger(participantCount) || participantCount < 3 || participantCount > 5) {
    details.push('Number of participants must be an integer between 3 and 5 for Tech Hunt');
  }

  if (participants.length < 3) {
    details.push('At least 3 participant records are required for Tech Hunt');
  }

  for (let i = 0; i < Math.min(Math.max(participantCount, 0), participants.length); i += 1) {
    const participant = participants[i] || {};
    const prefix = `Participant ${i + 1}`;

    if (!participant.name || !String(participant.name).trim()) details.push(`${prefix}: name is required`);
    if (!participant.contact || !String(participant.contact).trim()) details.push(`${prefix}: contact is required`);
    if (!participant.email || !String(participant.email).trim()) details.push(`${prefix}: email is required`);
    if (!participant.year || !String(participant.year).trim()) details.push(`${prefix}: year is required`);
    if (!participant.college || !String(participant.college).trim()) details.push(`${prefix}: college is required`);

    const hasIdFile =
      hasUploadedFileValue(participant.idFile) ||
      hasUploadedFileValue(participant.idFileUrl) ||
      hasUploadedFileValue(participant.idFileData);
    if (!hasIdFile) details.push(`${prefix}: ID card file is required`);
  }

  if (!registrationData.paymentMode || !String(registrationData.paymentMode).trim()) {
    details.push('Payment mode is required for Tech Hunt');
  }

  if (String(registrationData.paymentMode || '').toLowerCase() === 'online') {
    if (!registrationData.transactionId || !String(registrationData.transactionId).trim()) {
      details.push('Transaction ID is required for online payment');
    }

    const hasPaymentProof =
      hasUploadedFileValue(registrationData.paymentReceipt) ||
      hasUploadedFileValue(registrationData.paymentReceiptUrl) ||
      hasUploadedFileValue(registrationData.paymentReceiptData);
    if (!hasPaymentProof) {
      details.push('Payment receipt is required for online payment');
    }
  }

  if (registrationData.whatsappConfirmed !== true) {
    details.push('WhatsApp confirmation is required');
  }

  if (registrationData.declarationRulesRead !== true) {
    details.push('Declaration for rules and regulations is required');
  }

  if (registrationData.declarationFairPlay !== true) {
    details.push('Declaration for fair play is required');
  }

  if (registrationData.declarationLogistics !== true) {
    details.push('Declaration for logistics understanding is required');
  }

  return details;
};

router.post('/upload-file',
  uploadRegistrationFiles,
  handleMulterError,
  asyncHandler(async (req, res) => {
    const file = Array.isArray(req.files) && req.files.length > 0 ? req.files[0] : null;
    const eventName = (req.body?.eventName || '').trim();
    const fieldName = (req.body?.fieldName || file?.fieldname || '').trim();

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file received for upload'
      });
    }

    if (!eventName) {
      return res.status(400).json({
        success: false,
        message: 'eventName is required for file upload'
      });
    }

    if (!fieldName) {
      return res.status(400).json({
        success: false,
        message: 'fieldName is required for file upload'
      });
    }

    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);

    if (!isImage) {
      return res.status(400).json({
        success: false,
        message: 'Only image files can be pre-uploaded. Please upload JPG/PNG/WebP/GIF images.'
      });
    }

    const normalizedEventName = eventName.toLowerCase() === 'ea fc mobile' ? 'FIFA Mobile' : eventName;
    const subfolder = getUploadSubfolder(fieldName);
    const uploadResult = await uploadToCloudinary(
      file.buffer,
      file.originalname,
      `techstorm/${subfolder}/${normalizedEventName}`,
      {
        tags: [normalizedEventName, fieldName, 'registration', 'techstorm', 'pre-upload'],
        context: `event=${normalizedEventName}|field=${fieldName}|type=image|mode=pre-upload`,
        timeout: 30000
      }
    );

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        fieldName,
        originalName: file.originalname,
        secureUrl: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
        bytes: file.size
      }
    });
  })
);

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
    const startTime = Date.now();
    console.log('⏱️ Registration started at:', new Date().toISOString());
    
    try {
      const { eventName } = req.params;
      let registrationData = { ...req.body };
      const normalizedEventName = eventName ? eventName.trim() : '';
      const canonicalEventName = normalizedEventName.toLowerCase() === 'ea fc mobile'
        ? 'FIFA Mobile'
        : normalizedEventName;

      console.log('📥 Received registration for:', canonicalEventName);
      console.log('📝 Body data keys:', Object.keys(req.body).join(', '));
      console.log('📎 Files:', req.files && Array.isArray(req.files) ? req.files.map(f => `${f.fieldname}(${(f.size/1024).toFixed(1)}KB)`).join(', ') : 'No files');
      console.log('📊 Total files:', req.files?.length || 0);

    // Validate event name
    if (!canonicalEventName || canonicalEventName.length === 0) {
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
        return res.status(400).json({
          error: 'Validation Error',
          message: 'participants payload must be valid JSON',
          details: ['Unable to parse participants array from request payload'],
          timestamp: new Date().toISOString()
        });
      }
    }

    // Handle file uploads based on type
    // Note: upload.any() provides req.files as an array, not an object
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadStartTime = Date.now();
      console.log('📁 Processing uploaded files...');
      console.log(`📎 Total files: ${req.files.length}`);
      
      try {
        const fileUploadConcurrency = Number(process.env.REGISTRATION_FILE_UPLOAD_CONCURRENCY || 2);

        const processUploadedFile = async (file) => {
          const fileStartTime = Date.now();
          const fieldName = file.fieldname;
          const fileExtension = file.originalname.split('.').pop().toLowerCase();
          const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
          const isPDF = fileExtension === 'pdf';
          
          console.log(`📄 Processing file: ${fieldName} (${file.originalname}) - ${(file.size/1024).toFixed(1)}KB`);
          
          // Check if this is a participant ID file (format: participants[0].idFile)
          const participantMatch = fieldName.match(/participants\[(\d+)\]\.idFile/);
          
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
                tags: [canonicalEventName, fieldName, 'registration', 'techstorm'],
                context: `event=${canonicalEventName}|field=${fieldName}|type=image`,
                timeout: 30000 // 30 second timeout per file
              }
            );
            
            // Handle participant ID files specially
            if (participantMatch) {
              const participantIndex = parseInt(participantMatch[1]);
              console.log(`👤 Storing participant ${participantIndex} ID file in Cloudinary`);
              
              // Ensure participants array exists and has the right structure
              if (!Array.isArray(registrationData.participants)) {
                registrationData.participants = [];
              }
              
              // Ensure participant object exists at this index
              if (!registrationData.participants[participantIndex]) {
                registrationData.participants[participantIndex] = {};
              }
              
              // Store file data in participant object
              registrationData.participants[participantIndex].idFile = file.originalname;
              registrationData.participants[participantIndex].idFileUrl = uploadResult.secure_url;
              registrationData.participants[participantIndex].idFileCloudinaryId = uploadResult.public_id;
              
              console.log(`✅ Participant ${participantIndex} ID uploaded: ${uploadResult.secure_url} (${Date.now() - fileStartTime}ms)`);
            } else {
              // Store Cloudinary data in registration (top-level fields)
              registrationData[fieldName] = file.originalname;
              registrationData[`${fieldName}Url`] = uploadResult.secure_url;
              registrationData[`${fieldName}CloudinaryId`] = uploadResult.public_id;
              
              console.log(`✅ Image uploaded to Cloudinary: ${uploadResult.secure_url} (${Date.now() - fileStartTime}ms)`);
            }
            
          } else if (isPDF) {
            // Store PDFs directly in MongoDB as base64
            console.log(`💾 Storing PDF in MongoDB: ${fieldName}`);
            
            // Handle participant ID files specially
            if (participantMatch) {
              const participantIndex = parseInt(participantMatch[1]);
              console.log(`👤 Storing participant ${participantIndex} ID file (PDF) in MongoDB`);
              
              // Ensure participants array exists
              if (!Array.isArray(registrationData.participants)) {
                registrationData.participants = [];
              }
              
              // Ensure participant object exists
              if (!registrationData.participants[participantIndex]) {
                registrationData.participants[participantIndex] = {};
              }
              
              // Store PDF data in participant object
              registrationData.participants[participantIndex].idFile = file.originalname;
              registrationData.participants[participantIndex].idFileData = file.buffer.toString('base64');
              registrationData.participants[participantIndex].idFileMimeType = file.mimetype;
              registrationData.participants[participantIndex].idFileSize = file.size;
              
              console.log(`✅ Participant ${participantIndex} ID (PDF) stored: ${file.originalname} (${Date.now() - fileStartTime}ms)`);
            } else {
              // Top-level PDF fields
              registrationData[fieldName] = file.originalname;
              registrationData[`${fieldName}Data`] = file.buffer.toString('base64');
              registrationData[`${fieldName}MimeType`] = file.mimetype;
              registrationData[`${fieldName}Size`] = file.size;
              
              console.log(`✅ PDF stored in MongoDB: ${file.originalname} (${(file.size / 1024).toFixed(2)}KB) (${Date.now() - fileStartTime}ms)`);
            }
            
          } else {
            // Unknown file type - store in MongoDB
            console.log(`⚠️ Unknown file type, storing in MongoDB: ${fieldName}`);
            registrationData[fieldName] = file.originalname;
            registrationData[`${fieldName}Data`] = file.buffer.toString('base64');
            registrationData[`${fieldName}MimeType`] = file.mimetype;
          }
        };

        // Process in small batches to reduce total wall-clock time on mobile uploads
        // while keeping memory and Cloudinary pressure controlled.
        for (let i = 0; i < req.files.length; i += fileUploadConcurrency) {
          const batch = req.files.slice(i, i + fileUploadConcurrency);
          await Promise.all(batch.map(processUploadedFile));
          console.log(`✅ Processed upload batch ${Math.floor(i / fileUploadConcurrency) + 1}`);
        }
        
        const uploadDuration = Date.now() - uploadStartTime;
        console.log(`✅ All files processed successfully in ${uploadDuration}ms`);
        
      } catch (uploadError) {
        console.error('❌ File processing failed:', uploadError);
        console.error('❌ Error stack:', uploadError.stack);
        return res.status(500).json({
          error: 'File Upload Failed',
          message: 'Failed to process uploaded files. Please try again.',
          details: uploadError.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Handle college name logic
    // If collegeName is "Others", use the collegeOther field value
    if (registrationData.collegeName === 'Others' && registrationData.collegeOther) {
      registrationData.collegeName = registrationData.collegeOther.trim();
      // Keep collegeOther for reference but store the actual name in collegeName
    }
    
    // Also handle the 'college' field for backward compatibility
    if (registrationData.college === 'Others' && registrationData.collegeOther) {
      registrationData.college = registrationData.collegeOther.trim();
    }

    // Handle college name logic in participants array
    if (registrationData.participants && Array.isArray(registrationData.participants)) {
      registrationData.participants = registrationData.participants.map(participant => {
        if (participant.college === 'Others' && participant.collegeOther) {
          // Store the actual college name in the college field
          participant.college = participant.collegeOther.trim();
          // Keep collegeOther for reference
        }
        return participant;
      });
    }

    if (isTechHuntEvent(canonicalEventName)) {
      const validationErrors = validateTechHuntRegistration(registrationData);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Invalid registration data for Tech Hunt',
          details: validationErrors,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Add eventName to registration data
    registrationData.eventName = canonicalEventName;

    // Get or create model for this event
    const RegistrationModel = EventRegistrationFactory.getModel(canonicalEventName);

    // Check for duplicate registration based on email or phone
    const duplicateQuery = [];
    const emailCandidates = new Set();
    const phoneCandidates = new Set();

    const topLevelEmail = registrationData.email || registrationData.emailAddress;
    const topLevelPhone = registrationData.phone || registrationData.contactNumber || registrationData.contact;

    if (topLevelEmail) {
      emailCandidates.add(String(topLevelEmail).toLowerCase().trim());
    }
    if (topLevelPhone) {
      phoneCandidates.add(String(topLevelPhone).trim());
    }

    if (Array.isArray(registrationData.participants)) {
      registrationData.participants.forEach((participant, index) => {
        const participantEmail = participant?.email ? String(participant.email).toLowerCase().trim() : '';
        const participantPhone = participant?.contact ? String(participant.contact).trim() : '';

        if (participantEmail) {
          emailCandidates.add(participantEmail);
          if (index === 0 && !registrationData.email) {
            registrationData.email = participantEmail;
          }
        }

        if (participantPhone) {
          phoneCandidates.add(participantPhone);
          if (index === 0 && !registrationData.phone) {
            registrationData.phone = participantPhone;
          }
        }
      });
    }

    emailCandidates.forEach((emailValue) => duplicateQuery.push({ email: emailValue }));
    phoneCandidates.forEach((phoneValue) => duplicateQuery.push({ phone: phoneValue }));

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

    // Append to Google Sheet (non-blocking)
    appendToSheet(registration).catch(err => {
      console.error('⚠️ Failed to sync to Google Sheet (non-critical):', err.message);
    });

    const totalDuration = Date.now() - startTime;
    console.log(`⏱️ Registration completed in ${totalDuration}ms`);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        registrationId: registration._id,
        registrationNumber: registration.registrationNumber,
        eventName: canonicalEventName,
        email: registration.email,
        phone: registration.phone,
        registrationStatus: registration.registrationStatus,
        submittedAt: registration.submittedAt
      }
    });
    
    } catch (error) {
      console.error('❌ Registration error:', error);
      console.error('❌ Error stack:', error.stack);
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      
      // Return proper JSON error
      return res.status(500).json({
        error: 'Registration Failed',
        message: error.message || 'An error occurred during registration',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });
    }
  })
);

/**
 * Verify registration by registration number
 * GET /api/event-registration/verify/:registrationNumber
 * Public endpoint - no authentication required
 * IMPORTANT: This route must come BEFORE /:eventName to avoid conflicts
 */
router.get('/verify/:registrationNumber',
  asyncHandler(async (req, res) => {
    const { registrationNumber } = req.params;

    console.log('🔍 Verifying registration number:', registrationNumber);

    if (!registrationNumber || registrationNumber.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Registration number is required'
      });
    }

    const rawInput = registrationNumber.trim();
    const normalizedInput = rawInput.toUpperCase();
    const compactInput = normalizedInput.replace(/\s*-\s*/g, '-');

    const registrationCandidates = new Set([
      rawInput,
      normalizedInput,
      compactInput
    ]);

    if (/^EA-/.test(compactInput)) {
      const suffix = compactInput.substring(3);
      registrationCandidates.add(`EA-${suffix}`);
      registrationCandidates.add(`EA -${suffix}`);
      registrationCandidates.add(`FIF-${suffix}`);
    }

    if (/^FIF-/.test(compactInput)) {
      const suffix = compactInput.substring(4);
      registrationCandidates.add(`FIF-${suffix}`);
      registrationCandidates.add(`EA-${suffix}`);
      registrationCandidates.add(`EA -${suffix}`);
    }

    const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    let legacyPattern = null;
    if (/^(EA|FIF)-/.test(compactInput)) {
      const suffix = compactInput.replace(/^(EA|FIF)-/, '');
      legacyPattern = new RegExp(`^(EA|FIF)\\s*-\\s*${escapeRegExp(suffix)}$`, 'i');
    }

    // Try to find the registration across all event models
    // We need to search through different event collections
    const eventNames = [
      'Technomania', 'Omegatrix', 'Khet', 'Tech Hunt',
      'Ro-Combat', 'Ro-Navigator', 'Ro-Soccer', 'Ro-Sumo', 'Ro-Terrance',
      'FIFA Mobile', 'EA FC MOBILE', 'Forza Horizon', 'Creative Canvas', 'Passion With Reels'
    ];

    for (const eventName of eventNames) {
      try {
        const RegistrationModel = EventRegistrationFactory.getModel(eventName);
        let registration = await RegistrationModel.findOne({
          registrationNumber: { $in: Array.from(registrationCandidates) }
        });

        if (!registration && legacyPattern) {
          registration = await RegistrationModel.findOne({
            registrationNumber: { $regex: legacyPattern }
          });
        }

        if (registration) {
          // Found the registration
          console.log('✅ Registration found in event:', eventName);
          
          // Extract participant name (handle different field structures)
          let participantName = registration.fullName || 
                               registration.name || 
                               registration.teamName ||
                               (registration.participants && registration.participants[0]?.name) ||
                               'N/A';

          return res.json({
            success: true,
            data: {
              registrationNumber: registration.registrationNumber,
              eventName: registration.eventName || eventName,
              participantName: participantName,
              paymentStatus: registration.paymentStatus || 'pending',
              registrationStatus: registration.registrationStatus || 'confirmed',
              submittedAt: registration.submittedAt
            }
          });
        }
      } catch (error) {
        console.error(`Error searching in ${eventName}:`, error.message);
        // Continue to next event
      }
    }

    // Registration not found
    console.log('❌ Registration not found');
    return res.status(404).json({
      success: false,
      message: 'Registration not found. Please check your registration number and try again.'
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

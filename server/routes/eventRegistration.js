const express = require('express');
const router = express.Router();
const EventRegistrationFactory = require('../models/EventRegistration');
const { asyncHandler } = require('../middleware/errorHandler');
const { optionalAuthenticate } = require('../middleware/auth');

/**
 * Register for an event
 * POST /api/event-registration/:eventName
 * Public endpoint - no authentication required
 */
router.post('/:eventName',
  asyncHandler(async (req, res) => {
    const { eventName } = req.params;
    const registrationData = req.body;

    // Validate event name
    if (!eventName || eventName.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid event name',
        message: 'Event name is required'
      });
    }

    // Get or create model for this event
    const RegistrationModel = EventRegistrationFactory.getModel(eventName);

    // Check for duplicate registration based on email or phone
    const duplicateQuery = [];
    if (registrationData.email) {
      duplicateQuery.push({ email: registrationData.email.toLowerCase().trim() });
    }
    if (registrationData.phone) {
      duplicateQuery.push({ phone: registrationData.phone.trim() });
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
          }
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

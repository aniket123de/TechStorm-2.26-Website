const express = require('express');
const mongoose = require('mongoose');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');
const { 
  requireCreate, 
  requireRead, 
  requireUpdate, 
  requireDelete,
  requireCRUDPermissions
} = require('../middleware/rbac');
const { 
  validateObjectId, 
  validatePagination 
} = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const { securityLogger } = require('../middleware/logger');

const router = express.Router();

// Event Schema (example model)
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  eventType: {
    type: String,
    enum: ['workshop', 'competition', 'seminar', 'hackathon', 'gaming'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    trim: true,
    maxlength: 200
  },
  maxParticipants: {
    type: Number,
    min: 1
  },
  registrationDeadline: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    url: String,
    alt: String
  }],
  requirements: [String],
  prizes: [{
    position: String,
    prize: String,
    amount: Number
  }],
  registrations: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for registration count
eventSchema.virtual('registrationCount').get(function() {
  return this.registrations ? this.registrations.length : 0;
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  if (!this.maxParticipants) return null;
  const confirmedRegistrations = this.registrations ? 
    this.registrations.filter(reg => reg.status === 'confirmed').length : 0;
  return this.maxParticipants - confirmedRegistrations;
});

const Event = mongoose.model('Event', eventSchema);

/**
 * Get all events (public access with optional auth for additional info)
 * GET /api/events
 * Permissions: Public (READ permission for full details)
 */
router.get('/',
  optionalAuthenticate,
  validatePagination,
  asyncHandler(async (req, res) => {
    const { page, limit, sortBy, sortOrder } = req.pagination;
    const { eventType, isActive, upcoming, search } = req.query;

    // Build filter
    const filter = {};
    
    if (eventType) {
      filter.eventType = eventType;
    }
    
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    if (upcoming === 'true') {
      filter.date = { $gte: new Date() };
    }
    
    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort
    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort = { date: 1 }; // Upcoming events first
    }

    // Execute query with pagination
    let query = Event.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    // If user has READ permission, populate creator info
    if (req.user && req.user.canRead()) {
      query = query.populate('createdBy', 'name email role');
    }

    const events = await query;
    const total = await Event.countDocuments(filter);

    // Filter sensitive data based on permissions
    const eventsResponse = events.map(event => {
      const eventObj = event.toJSON();
      
      // Public users get limited information
      if (!req.user || !req.user.canRead()) {
        delete eventObj.registrations;
        delete eventObj.createdBy;
        delete eventObj.updatedBy;
      }
      
      return eventObj;
    });

    res.json({
      message: 'Events retrieved successfully',
      data: eventsResponse,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalEvents: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  })
);

/**
 * Get event by ID
 * GET /api/events/:id
 * Permissions: Public (READ permission for full details)
 */
router.get('/:id',
  optionalAuthenticate,
  validateObjectId('id'),
  asyncHandler(async (req, res) => {
    let query = Event.findById(req.params.id);

    // If user has READ permission, populate additional info
    if (req.user && req.user.canRead()) {
      query = query
        .populate('createdBy', 'name email role')
        .populate('updatedBy', 'name email role')
        .populate('registrations.user', 'name email');
    }

    const event = await query;
    
    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
        message: 'Event with the specified ID does not exist'
      });
    }

    const eventResponse = event.toJSON();

    // Filter sensitive data based on permissions
    if (!req.user || !req.user.canRead()) {
      delete eventResponse.registrations;
      delete eventResponse.createdBy;
      delete eventResponse.updatedBy;
    }

    res.json({
      message: 'Event retrieved successfully',
      event: eventResponse
    });
  })
);

/**
 * Create new event
 * POST /api/events
 * Permissions: CREATE
 */
router.post('/',
  authenticate,
  requireCreate,
  securityLogger('EVENT_CREATION'),
  asyncHandler(async (req, res) => {
    const eventData = {
      ...req.body,
      createdBy: req.user._id
    };

    const event = new Event(eventData);
    await event.save();

    // Populate creator info for response
    await event.populate('createdBy', 'name email role');

    res.status(201).json({
      message: 'Event created successfully',
      event: event.toJSON()
    });
  })
);

/**
 * Update event
 * PUT /api/events/:id
 * Permissions: UPDATE
 */
router.put('/:id',
  authenticate,
  requireUpdate,
  validateObjectId('id'),
  securityLogger('EVENT_UPDATE'),
  asyncHandler(async (req, res) => {
    const updateData = {
      ...req.body,
      updatedBy: req.user._id
    };

    // Remove fields that shouldn't be updated directly
    delete updateData.createdBy;
    delete updateData.registrations;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('createdBy updatedBy', 'name email role');

    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
        message: 'Event with the specified ID does not exist'
      });
    }

    res.json({
      message: 'Event updated successfully',
      event: event.toJSON()
    });
  })
);

/**
 * Delete event
 * DELETE /api/events/:id
 * Permissions: DELETE
 */
router.delete('/:id',
  authenticate,
  requireDelete,
  validateObjectId('id'),
  securityLogger('EVENT_DELETION'),
  asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
        message: 'Event with the specified ID does not exist'
      });
    }

    // Check if there are active registrations
    const activeRegistrations = event.registrations.filter(
      reg => reg.status === 'confirmed'
    ).length;

    if (activeRegistrations > 0) {
      return res.status(400).json({
        error: 'Cannot delete event',
        message: `Event has ${activeRegistrations} confirmed registrations. Please handle them first.`
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Event deleted successfully',
      deletedEvent: {
        _id: event._id,
        title: event.title,
        eventType: event.eventType,
        date: event.date
      },
      deletedBy: req.user.email,
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * Register for event
 * POST /api/events/:id/register
 * Permissions: Authenticated user
 */
router.post('/:id/register',
  authenticate,
  validateObjectId('id'),
  asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
        message: 'Event with the specified ID does not exist'
      });
    }

    if (!event.isActive) {
      return res.status(400).json({
        error: 'Registration failed',
        message: 'Event is not active for registration'
      });
    }

    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({
        error: 'Registration failed',
        message: 'Registration deadline has passed'
      });
    }

    // Check if user is already registered
    const existingRegistration = event.registrations.find(
      reg => reg.user.toString() === req.user._id.toString()
    );

    if (existingRegistration) {
      return res.status(409).json({
        error: 'Registration failed',
        message: 'You are already registered for this event',
        status: existingRegistration.status
      });
    }

    // Check availability
    if (event.maxParticipants && event.availableSpots <= 0) {
      return res.status(400).json({
        error: 'Registration failed',
        message: 'Event is fully booked'
      });
    }

    // Add registration
    event.registrations.push({
      user: req.user._id,
      status: 'confirmed' // Auto-confirm for simplicity
    });

    await event.save();

    res.status(201).json({
      message: 'Registration successful',
      registration: {
        eventId: event._id,
        eventTitle: event.title,
        userId: req.user._id,
        userName: req.user.name,
        status: 'confirmed',
        registeredAt: new Date()
      }
    });
  })
);

/**
 * Get event registrations (READ permission required)
 * GET /api/events/:id/registrations
 * Permissions: READ
 */
router.get('/:id/registrations',
  authenticate,
  requireRead,
  validateObjectId('id'),
  asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
      .populate('registrations.user', 'name email role department studentId')
      .select('title eventType registrations maxParticipants');
    
    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
        message: 'Event with the specified ID does not exist'
      });
    }

    res.json({
      message: 'Event registrations retrieved successfully',
      event: {
        _id: event._id,
        title: event.title,
        eventType: event.eventType,
        maxParticipants: event.maxParticipants,
        registrationCount: event.registrationCount,
        availableSpots: event.availableSpots
      },
      registrations: event.registrations
    });
  })
);

module.exports = router;

const express = require('express');
const { authenticateAdmin } = require('../middleware/adminAuth');
const { asyncHandler } = require('../middleware/errorHandler');
const EventRegistrationFactory = require('../models/EventRegistration');
const roleCredentials = require('../config/loadCredentials');

const router = express.Router();

const EVENT_NAME_ALIASES = {
  'fifa mobile': ['FIFA Mobile', 'EA FC MOBILE'],
  'ea fc mobile': ['FIFA Mobile', 'EA FC MOBILE']
};

const normalizeEventName = (value = '') =>
  String(value).trim().toLowerCase().replace(/\s+/g, ' ');

const getEventAliases = (eventName) => {
  const normalized = normalizeEventName(eventName);
  if (EVENT_NAME_ALIASES[normalized]) {
    return [...new Set(EVENT_NAME_ALIASES[normalized])];
  }
  return [eventName];
};

const eventNamesMatch = (a, b) => {
  const aliasesA = getEventAliases(a).map(normalizeEventName);
  const aliasesB = getEventAliases(b).map(normalizeEventName);
  return aliasesA.some((name) => aliasesB.includes(name));
};

const isEventAccessibleForAdmin = (admin, targetEventName) => {
  if (admin.role === 'core') return true;

  if (admin.eventAbbr) {
    const hasMatchingAbbreviation = roleCredentials.coordinator.some((eventCfg) =>
      eventCfg.eventAbbr === admin.eventAbbr &&
      getEventAliases(eventCfg.event).map(normalizeEventName).includes(normalizeEventName(targetEventName))
    );
    if (hasMatchingAbbreviation) return true;
  }

  if (admin.eventName) {
    return eventNamesMatch(admin.eventName, targetEventName);
  }

  return false;
};

/**
 * All routes require admin authentication
 */
router.use(authenticateAdmin);

/**
 * Get dashboard statistics
 * GET /api/admin-dashboard/stats
 */
router.get('/stats',
  asyncHandler(async (req, res) => {
    const admin = req.admin;
    
    // Get all events from role credentials
    const allEvents = [
      ...roleCredentials.coordinator.map(c => ({ name: c.event, abbreviation: c.eventAbbr }))
    ];
    
    // Remove duplicates
    const uniqueEvents = allEvents.filter((event, index, self) =>
      index === self.findIndex((e) => e.name === event.name)
    );
    
    // Filter events based on role
    let eventsToQuery = uniqueEvents;
    if (admin.role !== 'core' && admin.eventName) {
      eventsToQuery = uniqueEvents.filter((e) =>
        e.abbreviation === admin.eventAbbr || eventNamesMatch(e.name, admin.eventName)
      );
    }
    
    // Fetch statistics for each event
    const eventStats = await Promise.all(
      eventsToQuery.map(async (event) => {
        try {
          const candidateEventNames = getEventAliases(event.name);
          const perCollectionStats = await Promise.all(
            candidateEventNames.map(async (candidateEventName) => {
              try {
                const model = EventRegistrationFactory.getModel(candidateEventName);
                const [
                  totalRegistrations,
                  confirmedRegistrations,
                  pendingRegistrations,
                  pendingPayments,
                  confirmedPayments,
                  cashPayments,
                  onlinePayments
                ] = await Promise.all([
                  model.countDocuments(),
                  model.countDocuments({ registrationStatus: 'confirmed' }),
                  model.countDocuments({ registrationStatus: 'pending' }),
                  model.countDocuments({ paymentStatus: 'pending' }),
                  model.countDocuments({ paymentStatus: 'verified' }),
                  model.countDocuments({ paymentMode: { $regex: /^(cash|offline)$/i } }),
                  model.countDocuments({ paymentMode: { $regex: /^online$/i } })
                ]);

                return {
                  totalRegistrations,
                  confirmedRegistrations,
                  pendingRegistrations,
                  pendingPayments,
                  confirmedPayments,
                  cashPayments,
                  onlinePayments
                };
              } catch (innerError) {
                console.error(`Error fetching stats for ${candidateEventName}:`, innerError);
                return {
                  totalRegistrations: 0,
                  confirmedRegistrations: 0,
                  pendingRegistrations: 0,
                  pendingPayments: 0,
                  confirmedPayments: 0,
                  cashPayments: 0,
                  onlinePayments: 0
                };
              }
            })
          );

          const mergedStats = perCollectionStats.reduce(
            (acc, item) => ({
              totalRegistrations: acc.totalRegistrations + item.totalRegistrations,
              confirmedRegistrations: acc.confirmedRegistrations + item.confirmedRegistrations,
              pendingRegistrations: acc.pendingRegistrations + item.pendingRegistrations,
              pendingPayments: acc.pendingPayments + item.pendingPayments,
              confirmedPayments: acc.confirmedPayments + item.confirmedPayments,
              cashPayments: acc.cashPayments + item.cashPayments,
              onlinePayments: acc.onlinePayments + item.onlinePayments
            }),
            {
              totalRegistrations: 0,
              confirmedRegistrations: 0,
              pendingRegistrations: 0,
              pendingPayments: 0,
              confirmedPayments: 0,
              cashPayments: 0,
              onlinePayments: 0
            }
          );
          
          return {
            eventName: event.name,
            eventAbbr: event.abbreviation,
            ...mergedStats
          };
        } catch (error) {
          console.error(`Error fetching stats for ${event.name}:`, error);
          return {
            eventName: event.name,
            eventAbbr: event.abbreviation,
            totalRegistrations: 0,
            confirmedRegistrations: 0,
            pendingRegistrations: 0,
            pendingPayments: 0,
            confirmedPayments: 0,
            cashPayments: 0,
            onlinePayments: 0
          };
        }
      })
    );
    
    // Calculate totals
    const totals = eventStats.reduce((acc, stat) => ({
      totalRegistrations: acc.totalRegistrations + stat.totalRegistrations,
      confirmedRegistrations: acc.confirmedRegistrations + stat.confirmedRegistrations,
      pendingRegistrations: acc.pendingRegistrations + stat.pendingRegistrations,
      pendingPayments: acc.pendingPayments + stat.pendingPayments,
      confirmedPayments: acc.confirmedPayments + stat.confirmedPayments,
      cashPayments: acc.cashPayments + stat.cashPayments,
      onlinePayments: acc.onlinePayments + stat.onlinePayments
    }), {
      totalRegistrations: 0,
      confirmedRegistrations: 0,
      pendingRegistrations: 0,
      pendingPayments: 0,
      confirmedPayments: 0,
      cashPayments: 0,
      onlinePayments: 0
    });
    
    res.json({
      message: 'Dashboard statistics retrieved successfully',
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        eventName: admin.eventName,
        eventAbbr: admin.eventAbbr
      },
      totals,
      eventStats,
      totalEvents: eventsToQuery.length
    });
  })
);

/**
 * Get all registrations with filters
 * GET /api/admin-dashboard/registrations
 */
router.get('/registrations',
  asyncHandler(async (req, res) => {
    const admin = req.admin;
    const { 
      eventName, 
      search, 
      paymentStatus, 
      paymentMode,  // NEW: Add payment mode filter
      registrationStatus,
      page = 1,
      limit = 1000 // Increased default limit
    } = req.query;
    
    console.log(`📊 [REGISTRATIONS] Request from admin: ${admin.email} (${admin.role})`);
    console.log(`📊 [REGISTRATIONS] Query params:`, { eventName, search, paymentStatus, paymentMode, registrationStatus, page, limit });
    
    // Get all events from role credentials
    const allEvents = [
      ...roleCredentials.coordinator.map(c => ({ name: c.event, abbreviation: c.eventAbbr }))
    ];
    
    // Remove duplicates
    const uniqueEvents = allEvents.filter((event, index, self) =>
      index === self.findIndex((e) => e.name === event.name)
    );
    
    // Filter events based on role
    let eventsToQuery = uniqueEvents;
    if (admin.role !== 'core' && admin.eventName) {
      eventsToQuery = uniqueEvents.filter((e) =>
        e.abbreviation === admin.eventAbbr || eventNamesMatch(e.name, admin.eventName)
      );
      console.log(`🔍 [COORDINATOR FILTER] Admin: ${admin.email}`);
      console.log(`🔍 [COORDINATOR FILTER] Admin Event Name: "${admin.eventName}"`);
      console.log(`🔍 [COORDINATOR FILTER] All Events:`, uniqueEvents.map(e => `"${e.name}"`));
      console.log(`🔍 [COORDINATOR FILTER] Filtered Events:`, eventsToQuery.map(e => `"${e.name}"`));
    }
    
    // Further filter by specific event if requested
    if (eventName && eventName !== 'all') {
      eventsToQuery = eventsToQuery.filter((e) => eventNamesMatch(e.name, eventName));
    }
    
    // Fetch registrations from all relevant events
    const allRegistrations = [];
    
    for (const event of eventsToQuery) {
      const candidateEventNames = getEventAliases(event.name);
      for (const candidateEventName of candidateEventNames) {
        try {
          console.log(`📊 [QUERY] Attempting to query event: "${candidateEventName}"`);
          const model = EventRegistrationFactory.getModel(candidateEventName);
          console.log(`📊 [QUERY] Model created for: "${candidateEventName}"`);

          // Build query
          const query = {};

          if (paymentStatus) {
            query.paymentStatus = paymentStatus;
          }

          if (paymentMode) {
            // Filter by payment mode (case-insensitive)
            // "cash" filter includes both "cash" and "offline" payments
            if (paymentMode.toLowerCase() === 'cash') {
              query.paymentMode = { $regex: /^(cash|offline)$/i };
            } else {
              query.paymentMode = { $regex: new RegExp(`^${paymentMode}$`, 'i') };
            }
          }

          if (registrationStatus) {
            query.registrationStatus = registrationStatus;
          }

          if (search) {
            query.$or = [
              { fullName: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              { emailAddress: { $regex: search, $options: 'i' } },
              { phone: { $regex: search, $options: 'i' } },
              { contactNumber: { $regex: search, $options: 'i' } },
              { registrationNumber: { $regex: search, $options: 'i' } }
            ];
          }

          const registrations = await model
            .find(query)
            .sort({ submittedAt: -1 })
            .select('-paymentReceiptData -paymentScreenshotData -cashReceiptData -idProofData -idFileData')
            .lean();

          console.log(`📊 [QUERY] Found ${registrations.length} registrations for "${candidateEventName}"`);
          if (registrations.length > 0) {
            console.log(`📊 [QUERY] Sample registration eventName: "${registrations[0].eventName}"`);
          }

          // Keep source collection event name so edit/delete update the correct collection.
          registrations.forEach(reg => {
            reg.eventName = reg.eventName || candidateEventName;
            reg.eventAbbr = event.abbreviation;
          });

          allRegistrations.push(...registrations);
        } catch (error) {
          console.error(`Error fetching registrations for ${candidateEventName}:`, error);
        }
      }
    }
    
    // Sort all registrations by date
    allRegistrations.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    console.log(`📊 [REGISTRATIONS] Total registrations found: ${allRegistrations.length}`);
    console.log(`📊 [REGISTRATIONS] Events queried: ${eventsToQuery.map(e => e.name).join(', ')}`);
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedRegistrations = allRegistrations.slice(skip, skip + parseInt(limit));
    
    console.log(`📊 [REGISTRATIONS] Returning ${paginatedRegistrations.length} registrations (page ${page}, limit ${limit})`);
    
    res.json({
      message: 'Registrations retrieved successfully',
      registrations: paginatedRegistrations,
      pagination: {
        total: allRegistrations.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(allRegistrations.length / parseInt(limit))
      }
    });
  })
);

/**
 * Get single registration details
 * GET /api/admin-dashboard/registrations/:id
 */
router.get('/registrations/:eventName/:id',
  asyncHandler(async (req, res) => {
    const { eventName, id } = req.params;
    const admin = req.admin;
    
    // Check if admin has access to this event
    if (!isEventAccessibleForAdmin(admin, eventName)) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'You do not have access to this event'
      });
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    const registration = await model.findById(id).lean();
    
    if (!registration) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Registration not found'
      });
    }
    
    res.json({
      message: 'Registration retrieved successfully',
      registration
    });
  })
);

/**
 * Update registration (full update)
 * PUT /api/admin-dashboard/registrations/:eventName/:id
 */
router.put('/registrations/:eventName/:id',
  asyncHandler(async (req, res) => {
    const { eventName, id } = req.params;
    const admin = req.admin;
    
    // Check permissions
    if (!admin.canUpdate()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to update registrations'
      });
    }
    
    // Check if admin has access to this event
    if (!isEventAccessibleForAdmin(admin, eventName)) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'You do not have access to this event'
      });
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    
    // Update with all provided fields
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };
    
    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.registrationNumber;
    delete updateData.submittedAt;
    delete updateData.createdAt;
    delete updateData.__v;
    
    const registration = await model.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    
    if (!registration) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Registration not found'
      });
    }
    
    console.log(`✅ [UPDATE] Registration ${id} updated in MongoDB for event: ${eventName}`);
    console.log(`📝 Updated fields:`, Object.keys(updateData).filter(k => k !== 'updatedAt').join(', '));
    
    res.json({
      message: 'Registration updated successfully',
      registration
    });
  })
);

/**
 * Update registration status (partial update)
 * PATCH /api/admin-dashboard/registrations/:eventName/:id
 */
router.patch('/registrations/:eventName/:id',
  asyncHandler(async (req, res) => {
    const { eventName, id } = req.params;
    const { paymentStatus, registrationStatus } = req.body;
    const admin = req.admin;
    
    // Check permissions
    if (!admin.canUpdate()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to update registrations'
      });
    }
    
    // Check if admin has access to this event
    if (!isEventAccessibleForAdmin(admin, eventName)) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'You do not have access to this event'
      });
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    
    const updateData = {};
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (registrationStatus) updateData.registrationStatus = registrationStatus;
    updateData.updatedAt = new Date();
    
    const registration = await model.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).lean();
    
    if (!registration) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Registration not found'
      });
    }
    
    console.log(`✅ [PATCH] Registration ${id} status updated in MongoDB for event: ${eventName}`);
    console.log(`📝 Updated:`, updateData);
    
    res.json({
      message: 'Registration updated successfully',
      registration
    });
  })
);

/**
 * Delete registration
 * DELETE /api/admin-dashboard/registrations/:eventName/:id
 */
router.delete('/registrations/:eventName/:id',
  asyncHandler(async (req, res) => {
    const { eventName, id } = req.params;
    const admin = req.admin;
    
    // Check permissions
    if (!admin.canDelete()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to delete registrations'
      });
    }
    
    // Check if admin has access to this event
    if (!isEventAccessibleForAdmin(admin, eventName)) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'You do not have access to this event'
      });
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    const registration = await model.findByIdAndDelete(id);
    
    if (!registration) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Registration not found'
      });
    }
    
    console.log(`🗑️ [DELETE] Registration ${id} permanently deleted from MongoDB for event: ${eventName}`);
    console.log(`📧 Deleted registration email: ${registration.email || registration.emailAddress}`);
    
    res.json({
      message: 'Registration deleted successfully',
      deletedId: id
    });
  })
);

/**
 * Create new registration (Core only)
 * POST /api/admin-dashboard/registrations/:eventName
 */
router.post('/registrations/:eventName',
  asyncHandler(async (req, res) => {
    const { eventName } = req.params;
    const admin = req.admin;
    
    // Check permissions
    if (!admin.canCreate()) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to create registrations'
      });
    }
    
    // Check if admin has access to this event
    if (!isEventAccessibleForAdmin(admin, eventName)) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'You do not have access to this event'
      });
    }
    
    const model = EventRegistrationFactory.getModel(eventName);
    
    // Add metadata
    const registrationData = {
      ...req.body,
      eventName,
      source: 'admin',
      submittedAt: new Date()
    };
    
    const registration = new model(registrationData);
    await registration.save();
    
    console.log(`➕ [CREATE] New registration ${registration._id} created in MongoDB for event: ${eventName}`);
    console.log(`📧 Email: ${registration.email || registration.emailAddress}`);
    
    res.status(201).json({
      message: 'Registration created successfully',
      registration
    });
  })
);

/**
 * Debug endpoint - Get all collection names
 * GET /api/admin-dashboard/debug/collections
 */
router.get('/debug/collections',
  asyncHandler(async (req, res) => {
    const mongoose = require('mongoose');
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    res.json({
      collections: collections.map(c => c.name),
      registrationCollections: collections
        .map(c => c.name)
        .filter(n => n.startsWith('registrations_'))
    });
  })
);

/**
 * Debug endpoint - Check event name in registration
 * GET /api/admin-dashboard/debug/check-event/:collectionName
 */
router.get('/debug/check-event/:collectionName',
  asyncHandler(async (req, res) => {
    const { collectionName } = req.params;
    const mongoose = require('mongoose');
    
    const collection = mongoose.connection.db.collection(collectionName);
    const sample = await collection.findOne({});
    
    res.json({
      collectionName,
      sampleEventName: sample ? sample.eventName : null,
      sampleData: sample ? {
        _id: sample._id,
        eventName: sample.eventName,
        email: sample.email || sample.emailAddress,
        registrationNumber: sample.registrationNumber
      } : null
    });
  })
);

/**
 * Debug endpoint - Check payment modes in registrations
 * GET /api/admin-dashboard/debug/payment-modes/:eventName
 */
router.get('/debug/payment-modes/:eventName',
  asyncHandler(async (req, res) => {
    const { eventName } = req.params;
    const model = EventRegistrationFactory.getModel(eventName);
    
    // Get all unique payment modes
    const paymentModes = await model.distinct('paymentMode');
    
    // Count each payment mode
    const counts = {};
    for (const mode of paymentModes) {
      counts[mode || 'null/empty'] = await model.countDocuments({ paymentMode: mode });
    }
    
    // Count registrations without paymentMode field
    const noPaymentMode = await model.countDocuments({ paymentMode: { $exists: false } });
    if (noPaymentMode > 0) {
      counts['field_not_exists'] = noPaymentMode;
    }
    
    // Count null/undefined
    const nullPaymentMode = await model.countDocuments({ 
      $or: [
        { paymentMode: null },
        { paymentMode: '' },
        { paymentMode: { $exists: false } }
      ]
    });
    
    res.json({
      eventName,
      uniquePaymentModes: paymentModes,
      counts,
      nullOrEmptyCount: nullPaymentMode,
      total: await model.countDocuments()
    });
  })
);

/**
 * Get events list
 * GET /api/admin-dashboard/events
 */
router.get('/events',
  asyncHandler(async (req, res) => {
    const admin = req.admin;
    
    // Get all events from role credentials
    let events = [
      ...roleCredentials.coordinator.map(c => ({ 
        name: c.event, 
        abbreviation: c.eventAbbr 
      }))
    ];
    
    // Remove duplicates
    events = events.filter((event, index, self) =>
      index === self.findIndex((e) => e.name === event.name)
    );
    
    // Filter for event-specific admins
    if (admin.role !== 'core' && admin.eventName) {
      events = events.filter((e) =>
        e.abbreviation === admin.eventAbbr || eventNamesMatch(e.name, admin.eventName)
      );
    }
    
    res.json({
      message: 'Events retrieved successfully',
      events: events.map(e => ({
        name: e.name,
        abbreviation: e.abbreviation
      }))
    });
  })
);

module.exports = router;

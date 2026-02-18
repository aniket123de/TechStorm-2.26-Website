const mongoose = require('mongoose');

/**
 * Dynamic Event Registration Model Factory
 * Creates or retrieves a model for a specific event based on eventName
 */
class EventRegistrationFactory {
  constructor() {
    this.models = new Map();
  }

  /**
   * Get or create a model for a specific event
   * @param {string} eventName - The name of the event (used as collection name)
   * @returns {mongoose.Model}
   */
  getModel(eventName) {
    if (!eventName || typeof eventName !== 'string') {
      throw new Error('Event name must be a non-empty string');
    }

    // Normalize event name for collection (remove special chars, lowercase)
    const collectionName = eventName.trim();

    // Return existing model if already created
    if (this.models.has(collectionName)) {
      return this.models.get(collectionName);
    }

    // Check if model already exists in mongoose
    if (mongoose.models[collectionName]) {
      this.models.set(collectionName, mongoose.models[collectionName]);
      return mongoose.models[collectionName];
    }

    // Create new schema for this event
    const schema = this.createDynamicSchema();
    
    // Create and cache the model
    const model = mongoose.model(collectionName, schema, collectionName);
    this.models.set(collectionName, model);

    return model;
  }

  /**
   * Create a flexible schema that can accommodate various event registration forms
   * @returns {mongoose.Schema}
   */
  createDynamicSchema() {
    const schema = new mongoose.Schema({
      // Personal Information (Common fields)
      fullName: {
        type: String,
        trim: true
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true
      },
      phone: {
        type: String,
        trim: true,
        index: true
      },
      college: {
        type: String,
        trim: true
      },
      year: {
        type: String,
        trim: true
      },
      department: {
        type: String,
        trim: true
      },

      // Team Information
      teamName: {
        type: String,
        trim: true
      },
      teamSize: {
        type: String,
        trim: true
      },
      numberOfParticipants: {
        type: String,
        trim: true
      },

      // Team Members (for team events)
      teamMember2Name: String,
      teamMember2Email: String,
      teamMember2Phone: String,
      teamMember3Name: String,
      teamMember3Email: String,
      teamMember3Phone: String,
      teamMember4Name: String,
      teamMember4Email: String,
      teamMember4Phone: String,

      // Participants array (for events with multiple participants)
      participants: [{
        name: String,
        contact: String,
        email: String,
        college: String,
        year: String,
        idFile: String
      }],

      // Payment Information
      paymentMode: {
        type: String,
        trim: true
      },
      paymentDate: {
        type: String,
        trim: true
      },
      transactionId: {
        type: String,
        trim: true
      },
      paymentReceipt: String,
      paymentScreenshot: String,
      cashReceipt: String,

      // Event Specific
      experienceLevel: String,
      dietaryRestrictions: String,
      specialRequirements: String,
      howDidYouHear: String,

      // Files
      idProof: String,

      // Custom fields (flexible for event-specific data)
      customField1: String,
      customField2: String,
      customField3: String,
      customField4: String,
      customField5: String,

      // Confirmations
      whatsappConfirmed: {
        type: Boolean,
        default: false
      },
      agreeToTerms: {
        type: Boolean,
        default: false
      },
      agreeToRules: {
        type: Boolean,
        default: false
      },

      // Registration metadata
      registrationStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'waitlist'],
        default: 'pending'
      },
      submittedAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }, {
      strict: false, // Allow additional fields not defined in schema
      timestamps: true
    });

    // Create compound index for duplicate prevention
    schema.index({ email: 1, phone: 1 });

    // Pre-save middleware to update timestamp
    schema.pre('save', function(next) {
      this.updatedAt = new Date();
      next();
    });

    return schema;
  }

  /**
   * Clear all cached models (useful for testing)
   */
  clearCache() {
    this.models.clear();
  }
}

// Export singleton instance
module.exports = new EventRegistrationFactory();

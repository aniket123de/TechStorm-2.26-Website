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
        lowercase: true
        // Index removed - using compound index below
      },
      emailAddress: {
        type: String,
        trim: true,
        lowercase: true
      },
      phone: {
        type: String,
        trim: true
        // Index removed - using compound index below
      },
      contactNumber: {
        type: String,
        trim: true
      },
      college: {
        type: String,
        trim: true
      },
      collegeName: {
        type: String,
        trim: true
      },
      year: {
        type: String,
        trim: true
      },
      yearOfStudy: {
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
        department: String,
        idFile: String,
        idFileUrl: String,
        idFileCloudinaryId: String,
        role: String,
        order: Number
      }],

      // Game-Specific Fields (FIFA Mobile, Forza Horizon, etc.)
      fifaUsername: String,
      teamOvr: String,
      deviceModel: String,
      gameUsername: String,
      playerRating: String,
      gamingPlatform: String,

      // Payment Information
      paymentMode: {
        type: String,
        trim: true,
        index: true
      },
      paymentMethod: {
        type: String,
        trim: true
      },
      paymentDate: {
        type: String,
        trim: true
      },
      transactionId: {
        type: String,
        trim: true,
        index: true
      },
      // Payment Receipt (Image -> Cloudinary, PDF -> MongoDB)
      paymentReceipt: String,
      paymentReceiptUrl: String,
      paymentReceiptCloudinaryId: String,
      paymentReceiptData: String, // Base64 for PDFs
      paymentReceiptMimeType: String,
      paymentReceiptSize: Number,
      // Payment Screenshot (Image -> Cloudinary, PDF -> MongoDB)
      paymentScreenshot: String,
      paymentScreenshotUrl: String,
      paymentScreenshotCloudinaryId: String,
      paymentScreenshotData: String,
      paymentScreenshotMimeType: String,
      paymentScreenshotSize: Number,
      // Cash Receipt (Image -> Cloudinary, PDF -> MongoDB)
      cashReceipt: String,
      cashReceiptUrl: String,
      cashReceiptCloudinaryId: String,
      cashReceiptData: String,
      cashReceiptMimeType: String,
      cashReceiptSize: Number,
      paymentStatus: {
        type: String,
        enum: ['pending', 'verified', 'failed', 'not-required'],
        default: 'pending',
        index: true
      },

      // Event Specific
      experienceLevel: String,
      dietaryRestrictions: String,
      specialRequirements: String,
      howDidYouHear: String,

      // Files (Image -> Cloudinary, PDF -> MongoDB)
      idProof: String,
      idProofUrl: String,
      idProofCloudinaryId: String,
      idProofData: String,
      idProofMimeType: String,
      idProofSize: Number,
      idFile: String,
      idFileUrl: String,
      idFileCloudinaryId: String,
      idFileData: String,
      idFileMimeType: String,
      idFileSize: Number,

      // Custom fields (flexible for event-specific data)
      customField1: mongoose.Schema.Types.Mixed,
      customField2: mongoose.Schema.Types.Mixed,
      customField3: mongoose.Schema.Types.Mixed,
      customField4: mongoose.Schema.Types.Mixed,
      customField5: mongoose.Schema.Types.Mixed,
      customField6: mongoose.Schema.Types.Mixed,
      customField7: mongoose.Schema.Types.Mixed,
      customField8: mongoose.Schema.Types.Mixed,
      customField9: mongoose.Schema.Types.Mixed,
      customField10: mongoose.Schema.Types.Mixed,

      // Form Responses (structured answers with metadata)
      formResponses: [{
        fieldName: String,
        fieldLabel: String,
        fieldType: String,
        value: mongoose.Schema.Types.Mixed,
        order: Number
      }],

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
      eventName: {
        type: String,
        index: true
      },
      registrationStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'waitlist', 'rejected', 'checked-in'],
        default: 'pending',
        index: true
      },
      registrationNumber: {
        type: String,
        unique: true,
        sparse: true,
        index: true
      },
      submittedAt: {
        type: Date,
        default: Date.now,
        index: true
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      source: {
        type: String,
        enum: ['web', 'mobile', 'admin'],
        default: 'web'
      }
    }, {
      strict: false, // Allow additional fields not defined in schema
      timestamps: true
    });

    // Create compound index for duplicate prevention
    schema.index({ email: 1, phone: 1 });

    // Pre-save middleware to update timestamp and generate registration number
    schema.pre('save', function(next) {
      this.updatedAt = new Date();
      
      // Generate registration number if not exists
      if (!this.registrationNumber && this.eventName) {
        const eventPrefix = this.eventName.substring(0, 3).toUpperCase();
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        this.registrationNumber = `${eventPrefix}-${timestamp}-${random}`;
      }
      
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

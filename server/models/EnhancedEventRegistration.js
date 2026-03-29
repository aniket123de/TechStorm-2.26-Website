const mongoose = require('mongoose');

/**
 * Enhanced Event Registration Model Factory
 * Stores EVERY field from registration forms with complete metadata
 */
class EnhancedEventRegistrationFactory {
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

    // Normalize event name for collection
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
    const schema = this.createComprehensiveSchema();
    
    // Create and cache the model
    const model = mongoose.model(collectionName, schema, collectionName);
    this.models.set(collectionName, model);

    return model;
  }

  /**
   * Create a comprehensive schema that captures ALL possible registration fields
   * @returns {mongoose.Schema}
   */
  createComprehensiveSchema() {
    const schema = new mongoose.Schema({
      // ==================== PERSONAL INFORMATION ====================
      // Support multiple naming conventions
      fullName: {
        type: String,
        trim: true,
        index: true
      },
      full_name: String, // Alternative naming
      
      email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        sparse: true
      },
      emailAddress: String, // FIFA Mobile, gaming events
      
      phone: {
        type: String,
        trim: true,
        index: true,
        sparse: true
      },
      contactNumber: String, // FIFA Mobile naming
      contact: String, // Participant array naming
      alternatePhone: {
        type: String,
        trim: true
      },
      
      college: {
        type: String,
        trim: true,
        index: true
      },
      collegeName: String, // FIFA Mobile naming
      
      year: {
        type: String,
        trim: true
      },
      yearOfStudy: String, // FIFA Mobile naming
      
      department: {
        type: String,
        trim: true
      },
      rollNumber: {
        type: String,
        trim: true
      },
      studentId: {
        type: String,
        trim: true
      },

      // ==================== TEAM INFORMATION ====================
      teamName: {
        type: String,
        trim: true,
        index: true
      },
      teamSize: {
        type: String,
        trim: true
      },
      numberOfParticipants: {
        type: String,
        trim: true
      },
      isTeamLeader: {
        type: Boolean,
        default: true
      },
      teamLeaderName: {
        type: String,
        trim: true
      },
      teamLeaderEmail: {
        type: String,
        trim: true
      },
      teamLeaderPhone: {
        type: String,
        trim: true
      },

      // ==================== TEAM MEMBERS (Flat Structure) ====================
      teamMember2Name: String,
      teamMember2Email: String,
      teamMember2Phone: String,
      teamMember2College: String,
      teamMember2Year: String,
      teamMember2Department: String,
      
      teamMember3Name: String,
      teamMember3Email: String,
      teamMember3Phone: String,
      teamMember3College: String,
      teamMember3Year: String,
      teamMember3Department: String,
      
      teamMember4Name: String,
      teamMember4Email: String,
      teamMember4Phone: String,
      teamMember4College: String,
      teamMember4Year: String,
      teamMember4Department: String,

      teamMember5Name: String,
      teamMember5Email: String,
      teamMember5Phone: String,
      teamMember5College: String,
      teamMember5Year: String,
      teamMember5Department: String,

      // ==================== PARTICIPANTS ARRAY (For Complex Events) ====================
      participants: [{
        name: String,
        contact: String,
        email: String,
        college: String,
        year: String,
        department: String,
        rollNumber: String,
        idFile: String,
        idFileUrl: String,
        idFileCloudinaryId: String,
        remark: String,
        remarkUpdatedAt: Date,
        role: String, // e.g., 'leader', 'member'
        order: Number
      }],

      // ==================== PAYMENT INFORMATION ====================
      paymentMode: {
        type: String,
        trim: true,
        index: true
      },
      paymentMethod: {
        type: String,
        enum: ['online', 'offline', 'cash', 'upi', 'card', 'netbanking', 'none'],
        index: true
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
      paymentAmount: {
        type: Number
      },
      paymentCurrency: {
        type: String,
        default: 'INR'
      },
      paymentReceipt: String,
      paymentReceiptUrl: String,
      paymentReceiptCloudinaryId: String,
      paymentScreenshot: String,
      paymentScreenshotUrl: String,
      paymentScreenshotCloudinaryId: String,
      cashReceipt: String,
      cashReceiptUrl: String,
      cashReceiptCloudinaryId: String,
      paymentStatus: {
        type: String,
        enum: ['pending', 'verified', 'failed', 'refunded', 'not-required'],
        default: 'pending',
        index: true
      },
      paymentVerifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      paymentVerifiedAt: {
        type: Date
      },

      // ==================== GAME-SPECIFIC FIELDS ====================
      // FIFA Mobile Event Fields
      fifaUsername: {
        type: String,
        trim: true
      },
      teamOvr: {
        type: String,
        trim: true
      },
      deviceModel: {
        type: String,
        trim: true
      },
      
      // General Gaming Fields
      gameUsername: {
        type: String,
        trim: true
      },
      gamertag: {
        type: String,
        trim: true
      },
      playerRating: {
        type: String,
        trim: true
      },
      platformPreference: {
        type: String,
        trim: true
      },

      // ==================== EVENT SPECIFIC FIELDS ====================
      experienceLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert', '']
      },
      skillLevel: String,
      dietaryRestrictions: String,
      specialRequirements: String,
      accessibility: String,
      tshirtSize: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '']
      },
      howDidYouHear: {
        type: String,
        enum: ['social-media', 'friend', 'college', 'website', 'poster', 'email', 'other', '']
      },
      previousParticipation: {
        type: Boolean,
        default: false
      },
      expectations: String,
      additionalComments: String,

      // ==================== CUSTOM FIELDS (Event-Specific Questions) ====================
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

      // ==================== CUSTOM RESPONSES (Structured Form Answers) ====================
      // Stores all form field responses with metadata
      formResponses: [{
        fieldName: String,        // e.g., 'favoriteLanguage'
        fieldLabel: String,       // e.g., 'What is your favorite programming language?'
        fieldType: String,        // e.g., 'select', 'radio', 'text'
        value: mongoose.Schema.Types.Mixed, // The actual answer
        order: Number             // Order in form
      }],

      // ==================== FILE UPLOADS ====================
      idProof: String,
      idProofUrl: String,
      idProofCloudinaryId: String,
      
      resume: String,
      resumeUrl: String,
      resumeCloudinaryId: String,
      
      portfolio: String,
      portfolioUrl: String,
      
      otherDocument1: String,
      otherDocument1Url: String,
      otherDocument1CloudinaryId: String,
      
      otherDocument2: String,
      otherDocument2Url: String,
      otherDocument2CloudinaryId: String,

      // ==================== CONFIRMATIONS & AGREEMENTS ====================
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
      consentToPhotography: {
        type: Boolean,
        default: false
      },
      consentToDataProcessing: {
        type: Boolean,
        default: false
      },
      agreeToCodeOfConduct: {
        type: Boolean,
        default: false
      },

      // ==================== REGISTRATION STATUS & WORKFLOW ====================
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
      qrCode: String, // For check-in
      
      // ==================== ATTENDANCE & CHECK-IN ====================
      checkedIn: {
        type: Boolean,
        default: false,
        index: true
      },
      checkInTime: Date,
      checkInBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      attended: {
        type: Boolean,
        default: false
      },
      attendanceMarkedAt: Date,

      // ==================== COMMUNICATION ====================
      emailConfirmationSent: {
        type: Boolean,
        default: false
      },
      emailConfirmationSentAt: Date,
      reminderEmailSent: {
        type: Boolean,
        default: false
      },
      reminderEmailSentAt: Date,
      smsNotificationSent: {
        type: Boolean,
        default: false
      },
      whatsappNotificationSent: {
        type: Boolean,
        default: false
      },

      // ==================== ADMIN NOTES & REVIEW ====================
      adminNotes: String,
      internalComments: [{
        comment: String,
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }],
      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      reviewedAt: Date,
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      approvedAt: Date,

      // ==================== METADATA ====================
      eventName: {
        type: String,
        required: true,
        index: true
      },
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
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
      submittedFrom: {
        ipAddress: String,
        userAgent: String,
        device: String,
        browser: String,
        os: String
      },
      source: {
        type: String,
        enum: ['web', 'mobile', 'admin', 'import'],
        default: 'web'
      },

      // ==================== SCORE & RESULTS (For Competitions) ====================
      score: {
        type: Number,
        default: 0
      },
      rank: Number,
      result: String,
      certificateIssued: {
        type: Boolean,
        default: false
      },
      certificateUrl: String,
      certificateIssuedAt: Date,

      // ==================== TAGS & CATEGORIZATION ====================
      tags: [String],
      category: String,
      priority: {
        type: String,
        enum: ['low', 'normal', 'high'],
        default: 'normal'
      },

    }, {
      strict: false, // Allow additional fields not defined in schema
      timestamps: true,
      minimize: false // Don't remove empty objects
    });

    // ==================== INDEXES ====================
    schema.index({ email: 1, phone: 1 });
    schema.index({ registrationStatus: 1, submittedAt: -1 });
    schema.index({ eventName: 1, submittedAt: -1 });
    schema.index({ teamName: 1 }, { sparse: true });
    schema.index({ registrationNumber: 1 }, { unique: true, sparse: true });
    schema.index({ paymentStatus: 1 });
    schema.index({ checkedIn: 1 });

    // ==================== PRE-SAVE MIDDLEWARE ====================
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

    // ==================== METHODS ====================
    // Method to mark as checked in
    schema.methods.markCheckedIn = async function(userId) {
      this.checkedIn = true;
      this.checkInTime = new Date();
      this.checkInBy = userId;
      this.registrationStatus = 'checked-in';
      await this.save();
    };

    // Method to approve registration
    schema.methods.approve = async function(userId) {
      this.registrationStatus = 'confirmed';
      this.approvedBy = userId;
      this.approvedAt = new Date();
      await this.save();
    };

    // Method to verify payment
    schema.methods.verifyPayment = async function(userId) {
      this.paymentStatus = 'verified';
      this.paymentVerifiedBy = userId;
      this.paymentVerifiedAt = new Date();
      await this.save();
    };

    return schema;
  }

  /**
   * Clear all cached models (useful for testing)
   */
  clearCache() {
    this.models.clear();
  }

  /**
   * Get all registered event models
   */
  getAllModels() {
    return Array.from(this.models.entries());
  }
}

// Export singleton instance
module.exports = new EnhancedEventRegistrationFactory();

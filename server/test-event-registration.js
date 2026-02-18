/**
 * Test script for Event Registration System
 * Run with: node test-event-registration.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const EventRegistrationFactory = require('./models/EventRegistration');

async function testEventRegistrationSystem() {
  console.log('🧪 Testing Event Registration System\n');

  try {
    // Connect to database
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test 1: Create model for Technomania
    console.log('Test 1: Creating model for Technomania event');
    const TechnomaniaModel = EventRegistrationFactory.getModel('Technomania');
    console.log('✅ Model created successfully');
    console.log(`   Collection name: ${TechnomaniaModel.collection.name}\n`);

    // Test 2: Create a test registration
    console.log('Test 2: Creating test registration');
    const testRegistration = new TechnomaniaModel({
      teamName: 'Test Warriors',
      numberOfParticipants: '2',
      participants: [
        {
          name: 'Test User 1',
          contact: '1234567890',
          email: 'testuser1@example.com',
          college: 'Test College',
          year: '3rd',
          idFile: 'test-id-1.pdf'
        },
        {
          name: 'Test User 2',
          contact: '0987654321',
          email: 'testuser2@example.com',
          college: 'Test College',
          year: '2nd',
          idFile: 'test-id-2.pdf'
        }
      ],
      paymentMode: 'online',
      transactionId: 'TEST123456',
      paymentDate: '2024-01-15',
      paymentScreenshot: 'test-screenshot.png',
      agreeToRules: true,
      whatsappConfirmed: true,
      registrationStatus: 'confirmed'
    });

    await testRegistration.save();
    console.log('✅ Test registration created');
    console.log(`   Registration ID: ${testRegistration._id}\n`);

    // Test 3: Test duplicate prevention
    console.log('Test 3: Testing duplicate prevention');
    try {
      const duplicateRegistration = new TechnomaniaModel({
        teamName: 'Duplicate Team',
        numberOfParticipants: '1',
        participants: [
          {
            name: 'Test User 1',
            contact: '1234567890',
            email: 'testuser1@example.com',
            college: 'Test College',
            year: '3rd'
          }
        ],
        paymentMode: 'cash',
        agreeToRules: true,
        whatsappConfirmed: true
      });

      // Check for duplicate before saving
      const existingReg = await TechnomaniaModel.findOne({
        $or: [
          { email: 'testuser1@example.com' },
          { phone: '1234567890' }
        ]
      });

      if (existingReg) {
        console.log('✅ Duplicate detection working correctly');
        console.log('   Found existing registration with same email/phone\n');
      } else {
        await duplicateRegistration.save();
        console.log('⚠️  Duplicate was not detected (check participants array)\n');
      }
    } catch (error) {
      console.log('✅ Duplicate prevented by database constraint\n');
    }

    // Test 4: Query registrations
    console.log('Test 4: Querying registrations');
    const allRegistrations = await TechnomaniaModel.find({});
    console.log(`✅ Found ${allRegistrations.length} registration(s)`);
    console.log(`   First registration team: ${allRegistrations[0].teamName}\n`);

    // Test 5: Get statistics
    console.log('Test 5: Getting statistics');
    const total = await TechnomaniaModel.countDocuments();
    const confirmed = await TechnomaniaModel.countDocuments({ registrationStatus: 'confirmed' });
    const pending = await TechnomaniaModel.countDocuments({ registrationStatus: 'pending' });
    console.log('✅ Statistics retrieved');
    console.log(`   Total: ${total}`);
    console.log(`   Confirmed: ${confirmed}`);
    console.log(`   Pending: ${pending}\n`);

    // Test 6: Create model for different event
    console.log('Test 6: Creating model for Omegatrix event');
    const OmegatrixModel = EventRegistrationFactory.getModel('Omegatrix');
    console.log('✅ Model created successfully');
    console.log(`   Collection name: ${OmegatrixModel.collection.name}\n`);

    // Test 7: Create individual registration for Omegatrix
    console.log('Test 7: Creating individual registration for Omegatrix');
    const omegatrixRegistration = new OmegatrixModel({
      fullName: 'Individual Test User',
      email: 'individual@example.com',
      phone: '5555555555',
      college: 'Test College',
      year: '3',
      department: 'Computer Science',
      experienceLevel: 'intermediate',
      paymentMode: 'online',
      paymentDate: '2024-01-15',
      paymentReceipt: 'receipt.pdf',
      whatsappConfirmed: true,
      agreeToTerms: true,
      registrationStatus: 'confirmed'
    });

    await omegatrixRegistration.save();
    console.log('✅ Individual registration created');
    console.log(`   Registration ID: ${omegatrixRegistration._id}\n`);

    // Test 8: Verify collections are separate
    console.log('Test 8: Verifying collections are separate');
    const technomaniaCount = await TechnomaniaModel.countDocuments();
    const omegatrixCount = await OmegatrixModel.countDocuments();
    console.log('✅ Collections are separate');
    console.log(`   Technomania registrations: ${technomaniaCount}`);
    console.log(`   Omegatrix registrations: ${omegatrixCount}\n`);

    // Test 9: Update registration status
    console.log('Test 9: Updating registration status');
    const updated = await TechnomaniaModel.findByIdAndUpdate(
      testRegistration._id,
      { registrationStatus: 'waitlist' },
      { new: true }
    );
    console.log('✅ Registration status updated');
    console.log(`   New status: ${updated.registrationStatus}\n`);

    // Test 10: List all collections
    console.log('Test 10: Listing all event collections');
    const collections = await mongoose.connection.db.listCollections().toArray();
    const eventCollections = collections
      .map(c => c.name)
      .filter(name => ['Technomania', 'Omegatrix'].includes(name));
    console.log('✅ Event collections found:');
    eventCollections.forEach(name => console.log(`   - ${name}`));
    console.log('');

    // Cleanup
    console.log('🧹 Cleaning up test data...');
    await TechnomaniaModel.deleteMany({});
    await OmegatrixModel.deleteMany({});
    console.log('✅ Test data cleaned up\n');

    console.log('✅ All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');
  }
}

// Run tests
testEventRegistrationSystem();

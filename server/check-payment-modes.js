/**
 * Check payment modes in all events
 * Run with: node check-payment-modes.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const EventRegistrationFactory = require('./models/EventRegistration');

const ALL_EVENTS = [
  'Technomania',
  'Omegatrix',
  'Khet',
  'Tech Hunt',
  'Ro-Combat',
  'Ro-Navigator',
  'Ro-Soccer',
  'Ro-Sumo',
  'Ro-Terrance',
  'FIFA Mobile',
  'Forza Horizon',
  'Creative Canvas',
  'Passion With Reels',
  'Code-Bee',
  'Hack Storm'
];

async function checkPaymentModes() {
  try {
    console.log('🔍 Checking payment modes across all events...\n');

    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    for (const eventName of ALL_EVENTS) {
      try {
        const model = EventRegistrationFactory.getModel(eventName);
        const total = await model.countDocuments();
        
        if (total === 0) continue;

        console.log(`📊 ${eventName}: ${total} registrations`);

        // Get all unique payment modes
        const paymentModes = await model.distinct('paymentMode');
        console.log(`   Unique values: ${JSON.stringify(paymentModes)}`);

        // Count each
        for (const mode of paymentModes) {
          const count = await model.countDocuments({ paymentMode: mode });
          console.log(`   - "${mode}": ${count}`);
        }

        // Count null/empty
        const nullCount = await model.countDocuments({ 
          $or: [
            { paymentMode: null },
            { paymentMode: '' },
            { paymentMode: { $exists: false } }
          ]
        });
        if (nullCount > 0) {
          console.log(`   - null/empty/missing: ${nullCount}`);
        }

        // Case-insensitive counts (with offline counted as cash)
        const cashCount = await model.countDocuments({ paymentMode: { $regex: /^(cash|offline)$/i } });
        const onlineCount = await model.countDocuments({ paymentMode: { $regex: /^online$/i } });
        console.log(`   Case-insensitive (offline=cash): Cash=${cashCount}, Online=${onlineCount}`);
        console.log(`   Total check: ${cashCount + onlineCount + nullCount} (should equal ${total})`);
        console.log('');

      } catch (error) {
        console.error(`❌ Error checking ${eventName}:`, error.message);
      }
    }

    await mongoose.connection.close();
    console.log('✅ Done!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

checkPaymentModes();

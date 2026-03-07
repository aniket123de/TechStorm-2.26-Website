/**
 * Sync existing registrations to Google Sheets
 * This script helps you backfill data if you already have registrations in MongoDB
 * 
 * Usage: node sync-existing-registrations.js [eventName]
 * Example: node sync-existing-registrations.js "FIFA Mobile"
 * 
 * If no event name is provided, it will sync all events
 */

require('dotenv').config();
const mongoose = require('mongoose');
const EventRegistrationFactory = require('./models/EventRegistration');
const { appendToSheet, initializeSheetHeaders } = require('./config/googleSheets');

// List of all events
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

async function syncEventRegistrations(eventName) {
  console.log(`\n📊 Syncing registrations for: ${eventName}`);
  
  try {
    const RegistrationModel = EventRegistrationFactory.getModel(eventName);
    const registrations = await RegistrationModel.find({}).sort({ submittedAt: 1 });
    
    console.log(`Found ${registrations.length} registrations`);
    
    if (registrations.length === 0) {
      console.log('⚠️ No registrations found for this event');
      return { success: 0, failed: 0 };
    }
    
    let successCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < registrations.length; i++) {
      const registration = registrations[i];
      process.stdout.write(`\rSyncing ${i + 1}/${registrations.length}...`);
      
      try {
        const success = await appendToSheet(registration.toObject());
        if (success) {
          successCount++;
        } else {
          failedCount++;
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`\n❌ Failed to sync registration ${registration._id}:`, error.message);
        failedCount++;
      }
    }
    
    console.log(`\n✅ Synced ${successCount} registrations`);
    if (failedCount > 0) {
      console.log(`⚠️ Failed to sync ${failedCount} registrations`);
    }
    
    return { success: successCount, failed: failedCount };
    
  } catch (error) {
    console.error(`❌ Error syncing ${eventName}:`, error.message);
    return { success: 0, failed: 0 };
  }
}

async function main() {
  console.log('🚀 Starting registration sync to Google Sheets...\n');
  
  // Connect to MongoDB
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/techstorm';
  console.log('📡 Connecting to MongoDB...');
  
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
  
  // Initialize sheet headers
  console.log('📋 Initializing sheet headers...');
  await initializeSheetHeaders();
  
  // Get event name from command line argument
  const eventName = process.argv[2];
  
  let totalSuccess = 0;
  let totalFailed = 0;
  
  if (eventName) {
    // Sync specific event
    const result = await syncEventRegistrations(eventName);
    totalSuccess = result.success;
    totalFailed = result.failed;
  } else {
    // Sync all events
    console.log('📚 No event specified, syncing all events...\n');
    
    for (const event of ALL_EVENTS) {
      const result = await syncEventRegistrations(event);
      totalSuccess += result.success;
      totalFailed += result.failed;
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Sync Summary:');
  console.log(`✅ Successfully synced: ${totalSuccess} registrations`);
  if (totalFailed > 0) {
    console.log(`⚠️ Failed to sync: ${totalFailed} registrations`);
  }
  console.log('='.repeat(50));
  console.log('\n🔗 View your sheet: https://docs.google.com/spreadsheets/d/1Wt3a0SuLG3Z1XDfc7XWkmxEfmQ3t06A5VAdW_Mw8UsY/edit');
  
  // Close MongoDB connection
  await mongoose.connection.close();
  console.log('\n✅ Done!');
  process.exit(0);
}

// Run the script
main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});

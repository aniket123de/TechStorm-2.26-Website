/**
 * Test script for Google Sheets integration
 * Run with: node test-google-sheets.js
 */

require('dotenv').config();
const { appendToSheet, getSheetNameForEvent } = require('./config/googleSheets');

async function testGoogleSheets() {
  console.log('🧪 Testing Google Sheets Integration (Dual Write Mode)...\n');

  // Test data append for different events
  console.log('Testing data append to BOTH event sheet AND master sheet...\n');
  
  const testEvents = ['FIFA Mobile', 'Technomania', 'Khet'];
  let successCount = 0;
  
  for (const eventName of testEvents) {
    const testRegistration = {
      registrationNumber: `TEST-${eventName.replace(/\s+/g, '')}-${Date.now()}`,
      eventName: eventName,
      submittedAt: new Date(),
      registrationStatus: 'confirmed',
      fullName: `Test User for ${eventName}`,
      email: `test.${eventName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: '1234567890',
      college: 'Test College',
      collegeOther: '',
      year: '2nd Year',
      department: 'Computer Science'
    };

    const eventSheetName = getSheetNameForEvent(eventName);
    console.log(`Testing ${eventName} → ${eventSheetName} + Sheet2`);
    
    const appendSuccess = await appendToSheet(testRegistration);
    
    if (appendSuccess) {
      console.log(`✅ ${eventName} test data added to BOTH sheets\n`);
      successCount++;
    } else {
      console.log(`❌ Failed to append ${eventName} test data\n`);
    }
  }

  // Summary
  console.log('📋 Test Summary:');
  console.log(`- Data Append: ${successCount}/${testEvents.length} events successful`);
  console.log('- Dual Write: Each registration written to event sheet + Sheet2');
  
  if (successCount === testEvents.length) {
    console.log('\n🎉 Google Sheets integration is working correctly!');
    console.log('📊 Each event writes to:');
    console.log('   1. Its own event sheet (for event-specific tracking)');
    console.log('   2. Sheet2 (master sheet for total participant count)');
    console.log('🔗 View your sheet: https://docs.google.com/spreadsheets/d/1Wt3a0SuLG3Z1XDfc7XWkmxEfmQ3t06A5VAdW_Mw8UsY/edit');
  } else {
    console.log('\n⚠️ Some tests failed. Please check:');
    console.log('1. Google Service Account credentials are configured');
    console.log('2. Sheet is shared with the service account email');
    console.log('3. Google Sheets API is enabled in your project');
    console.log('\nSee GOOGLE_SHEETS_SETUP.md for detailed instructions');
  }
}

// Run the test
testGoogleSheets().catch(error => {
  console.error('❌ Test failed with error:', error);
  process.exit(1);
});

/**
 * Test team registration with Google Sheets integration
 * Run with: node test-team-registration.js
 */

require('dotenv').config();
const { appendToSheet } = require('./config/googleSheets');

async function testTeamRegistration() {
  console.log('🧪 Testing Team Registration with Google Sheets...\n');

  // Test registration with team members (using participants array)
  const testTeamRegistration = {
    registrationNumber: `TEST-TEAM-${Date.now()}`,
    eventName: 'Technomania',
    submittedAt: new Date(),
    registrationStatus: 'confirmed',
    fullName: 'Team Leader Name',
    email: 'leader@example.com',
    phone: '9876543210',
    college: 'Test College',
    collegeOther: '',
    year: '3rd Year',
    department: 'Computer Science',
    // Team information
    teamName: 'Code Warriors',
    teamSize: '4',
    // Participants array with complete details
    participants: [
      {
        name: 'Team Leader Name',
        email: 'leader@example.com',
        contact: '9876543210',
        college: 'Test College',
        year: '3rd Year',
        department: 'Computer Science',
        order: 0
      },
      {
        name: 'Member Two',
        email: 'member2@example.com',
        contact: '9876543211',
        college: 'ABC Engineering College',
        year: '2nd Year',
        department: 'Electronics',
        order: 1
      },
      {
        name: 'Member Three',
        email: 'member3@example.com',
        contact: '9876543212',
        college: 'XYZ Institute',
        year: '3rd Year',
        department: 'Information Technology',
        order: 2
      },
      {
        name: 'Member Four',
        email: 'member4@example.com',
        contact: '9876543213',
        college: 'PQR University',
        year: '4th Year',
        department: 'Computer Science',
        order: 3
      }
    ]
  };

  console.log('📝 Test Team Registration Data:');
  console.log(`   Team Name: ${testTeamRegistration.teamName}`);
  console.log(`   Team Size: ${testTeamRegistration.teamSize}`);
  console.log(`   Leader: ${testTeamRegistration.fullName} (${testTeamRegistration.department})`);
  console.log(`   Member 2: ${testTeamRegistration.participants[1].name} (${testTeamRegistration.participants[1].department})`);
  console.log(`   Member 3: ${testTeamRegistration.participants[2].name} (${testTeamRegistration.participants[2].department})`);
  console.log(`   Member 4: ${testTeamRegistration.participants[3].name} (${testTeamRegistration.participants[3].department})`);
  console.log('');

  const success = await appendToSheet(testTeamRegistration);

  if (success) {
    console.log('\n✅ Team registration added successfully!');
    console.log('📊 Check your Google Sheet to verify:');
    console.log('   - Team Name & Team Size columns');
    console.log('   - Member 2: Name, Email, Phone, College, Year, Department');
    console.log('   - Member 3: Name, Email, Phone, College, Year, Department');
    console.log('   - Member 4: Name, Email, Phone, College, Year, Department');
    console.log('\n🔗 View your sheet: https://docs.google.com/spreadsheets/d/1Wt3a0SuLG3Z1XDfc7XWkmxEfmQ3t06A5VAdW_Mw8UsY/edit');
  } else {
    console.log('\n❌ Failed to add team registration');
  }
}

// Run the test
testTeamRegistration().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});

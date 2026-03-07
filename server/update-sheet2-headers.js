/**
 * Update Sheet2 headers to include team member columns
 * Run with: node update-sheet2-headers.js
 */

require('dotenv').config();
const { google } = require('googleapis');
const path = require('path');

const SPREADSHEET_ID = '1Wt3a0SuLG3Z1XDfc7XWkmxEfmQ3t06A5VAdW_Mw8UsY';
const MASTER_SHEET_NAME = 'Sheet2';

async function updateSheet2Headers() {
  try {
    console.log('📋 Updating Sheet2 headers to include team member columns...\n');

    // Load credentials
    let credentials;
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      const credPath = path.resolve(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS.replace('./', ''));
      credentials = require(credPath);
    } else {
      console.error('❌ Google credentials not configured');
      return false;
    }

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // New headers with team member columns (including college, year, department)
    const headers = [
      'S.No',
      'Registration Number',
      'Event Name',
      'Registration Date',
      'Registration Status',
      'Full Name',
      'Email',
      'Contact',
      'College',
      'College Other',
      'Year',
      'Department',
      'Team Name',
      'Team Size',
      'Member 2 Name',
      'Member 2 Email',
      'Member 2 Phone',
      'Member 2 College',
      'Member 2 Year',
      'Member 2 Department',
      'Member 3 Name',
      'Member 3 Email',
      'Member 3 Phone',
      'Member 3 College',
      'Member 3 Year',
      'Member 3 Department',
      'Member 4 Name',
      'Member 4 Email',
      'Member 4 Phone',
      'Member 4 College',
      'Member 4 Year',
      'Member 4 Department'
    ];

    // Update the headers in Sheet2
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${MASTER_SHEET_NAME}!A1:AF1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers],
      },
    });

    console.log('✅ Sheet2 headers updated successfully!');
    console.log('📊 New columns added:');
    console.log('   - Team Name');
    console.log('   - Team Size');
    console.log('   - Member 2: Name, Email, Phone, College, Year, Department');
    console.log('   - Member 3: Name, Email, Phone, College, Year, Department');
    console.log('   - Member 4: Name, Email, Phone, College, Year, Department');
    console.log('\n🔗 View your sheet: https://docs.google.com/spreadsheets/d/1Wt3a0SuLG3Z1XDfc7XWkmxEfmQ3t06A5VAdW_Mw8UsY/edit');

    return true;
  } catch (error) {
    console.error('❌ Failed to update headers:', error.message);
    return false;
  }
}

// Run the update
updateSheet2Headers().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});

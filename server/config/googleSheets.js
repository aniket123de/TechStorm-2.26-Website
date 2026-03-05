const { google } = require('googleapis');
const path = require('path');

/**
 * Google Sheets Configuration
 * Handles authentication and sheet operations
 */

// Your Google Sheet ID (extracted from the URL)
const SPREADSHEET_ID = '1Wt3a0SuLG3Z1XDfc7XWkmxEfmQ3t06A5VAdW_Mw8UsY';

// Master sheet that contains ALL events (for tracking total participants)
const MASTER_SHEET_NAME = 'Sheet2';

// Event to Sheet Name mapping
// Each event gets its own sheet tab for better organization
const EVENT_SHEET_MAPPING = {
  'FIFA Mobile': 'FIFA Mobile',
  'Forza Horizon': 'Forza Horizon',
  'Khet': 'Khet',
  'Technomania': 'Technomania',
  'Omegatrix': 'Omegatrix',
  'Tech Hunt': 'Tech Hunt',
  'Ro-Combat': 'Ro-Combat',
  'Ro-Navigator': 'Ro-Navigator',
  'Ro-Soccer': 'Ro-Soccer',
  'Ro-Sumo': 'Ro-Sumo',
  'Ro-Terrance': 'Ro-Terrance',
  'Creative Canvas': 'Creative Canvas',
  'Passion With Reels': 'Passion With Reels',
  'Code-Bee': 'Code-Bee',
  'Hack Storm': 'Hack Storm'
};

// Default sheet name for events not in mapping
const DEFAULT_SHEET_NAME = 'Other Events';

/**
 * Initialize Google Sheets API client
 */
function getGoogleSheetsClient() {
  try {
    // Load credentials from environment variable or file
    let credentials;
    
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      // Parse from environment variable (for production/Vercel)
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Load from file path (resolve relative to project root)
      const credPath = path.resolve(__dirname, '..', process.env.GOOGLE_APPLICATION_CREDENTIALS.replace('./', ''));
      credentials = require(credPath);
    } else {
      console.warn('⚠️ Google Sheets credentials not configured');
      return null;
    }

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Create sheets client
    const sheets = google.sheets({ version: 'v4', auth });
    
    return sheets;
  } catch (error) {
    console.error('❌ Failed to initialize Google Sheets client:', error.message);
    return null;
  }
}

/**
 * Get sheet name for an event
 * @param {string} eventName - Event name from registration
 * @returns {string} - Sheet name to use
 */
function getSheetNameForEvent(eventName) {
  return EVENT_SHEET_MAPPING[eventName] || DEFAULT_SHEET_NAME;
}

/**
 * Ensure sheet tab exists, create if it doesn't
 * @param {Object} sheets - Google Sheets client
 * @param {string} sheetName - Name of the sheet tab
 * @returns {Promise<boolean>} - Success status
 */
async function ensureSheetExists(sheets, sheetName) {
  try {
    // Get all sheets in the spreadsheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetExists = spreadsheet.data.sheets.some(
      sheet => sheet.properties.title === sheetName
    );

    if (!sheetExists) {
      console.log(`📄 Creating new sheet tab: ${sheetName}`);
      
      // Create the new sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName,
              }
            }
          }]
        }
      });

      // Add headers to the new sheet (including team member columns)
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

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1:AF1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });

      console.log(`✅ Sheet created with headers: ${sheetName}`);
    }

    return true;
  } catch (error) {
    console.error(`❌ Failed to ensure sheet exists: ${error.message}`);
    return false;
  }
}

/**
 * Append registration data to Google Sheet
 * Writes to BOTH the event-specific sheet AND the master sheet (Sheet2)
 * @param {Object} registration - Registration data from MongoDB
 * @returns {Promise<boolean>} - Success status
 */
async function appendToSheet(registration) {
  try {
    const sheets = getGoogleSheetsClient();
    
    if (!sheets) {
      console.warn('⚠️ Google Sheets client not available, skipping sheet update');
      return false;
    }

    // Determine which sheet to use based on event name
    const eventName = registration.eventName || 'Unknown Event';
    const eventSheetName = getSheetNameForEvent(eventName);

    console.log(`📊 Routing ${eventName} → Event Sheet: ${eventSheetName} + Master Sheet: ${MASTER_SHEET_NAME}`);

    // Ensure the event-specific sheet tab exists
    await ensureSheetExists(sheets, eventSheetName);

    // Prepare the row data (including team member details)
    const prepareRowData = (serialNumber) => {
      // Helper function to get team member data from participants array or teamMember fields
      const getTeamMember = (index) => {
        const participant = registration.participants && registration.participants[index];
        const memberNum = index + 1;
        
        return {
          name: registration[`teamMember${memberNum}Name`] || participant?.name || '',
          email: registration[`teamMember${memberNum}Email`] || participant?.email || '',
          phone: registration[`teamMember${memberNum}Phone`] || participant?.contact || '',
          college: participant?.college || '',
          year: participant?.year || '',
          department: participant?.department || ''
        };
      };

      const member2 = getTeamMember(1);
      const member3 = getTeamMember(2);
      const member4 = getTeamMember(3);

      return [
        serialNumber,
        registration.registrationNumber || 'N/A',
        registration.eventName || 'N/A',
        registration.submittedAt ? new Date(registration.submittedAt).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN'),
        registration.registrationStatus || 'confirmed',
        registration.fullName || registration.name || (registration.participants && registration.participants[0]?.name) || 'N/A',
        registration.email || registration.emailAddress || (registration.participants && registration.participants[0]?.email) || 'N/A',
        registration.phone || registration.contactNumber || registration.contact || (registration.participants && registration.participants[0]?.contact) || 'N/A',
        registration.college || registration.collegeName || (registration.participants && registration.participants[0]?.college) || 'N/A',
        registration.collegeOther || (registration.participants && registration.participants[0]?.collegeOther) || '',
        registration.year || registration.yearOfStudy || (registration.participants && registration.participants[0]?.year) || 'N/A',
        registration.department || (registration.participants && registration.participants[0]?.department) || 'N/A',
        // Team information
        registration.teamName || '',
        registration.teamSize || registration.numberOfParticipants || '',
        // Team Member 2
        member2.name,
        member2.email,
        member2.phone,
        member2.college,
        member2.year,
        member2.department,
        // Team Member 3
        member3.name,
        member3.email,
        member3.phone,
        member3.college,
        member3.year,
        member3.department,
        // Team Member 4
        member4.name,
        member4.email,
        member4.phone,
        member4.college,
        member4.year,
        member4.department
      ];
    };

    // 1. Append to EVENT-SPECIFIC sheet
    const eventResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${eventSheetName}!A:A`,
    });
    const eventRows = eventResponse.data.values || [];
    const eventSerialNumber = eventRows.length;
    const eventRowData = prepareRowData(eventSerialNumber);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${eventSheetName}!A:AF`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [eventRowData],
      },
    });

    console.log(`✅ Added to event sheet [${eventSheetName}]: ${registration.registrationNumber}`);

    // 2. Append to MASTER sheet (Sheet2) - for tracking all participants
    const masterResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${MASTER_SHEET_NAME}!A:A`,
    });
    const masterRows = masterResponse.data.values || [];
    const masterSerialNumber = masterRows.length;
    const masterRowData = prepareRowData(masterSerialNumber);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${MASTER_SHEET_NAME}!A:AF`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [masterRowData],
      },
    });

    console.log(`✅ Added to master sheet [${MASTER_SHEET_NAME}]: ${registration.registrationNumber}`);

    return true;
    
  } catch (error) {
    console.error('❌ Failed to append to Google Sheet:', error.message);
    console.error('Error details:', error);
    return false;
  }
}

/**
 * Initialize sheet with headers if empty
 * Creates all event sheets with headers
 */
async function initializeSheetHeaders() {
  try {
    const sheets = getGoogleSheetsClient();
    
    if (!sheets) {
      return false;
    }

    console.log('📋 Initializing sheet headers for all events...');

    // Get all unique event names from mapping
    const eventNames = Object.keys(EVENT_SHEET_MAPPING);
    
    let successCount = 0;
    
    for (const eventName of eventNames) {
      const sheetName = EVENT_SHEET_MAPPING[eventName];
      
      try {
        await ensureSheetExists(sheets, sheetName);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to initialize ${sheetName}:`, error.message);
      }
    }

    console.log(`✅ Initialized ${successCount}/${eventNames.length} event sheets`);
    return true;
    
  } catch (error) {
    console.error('❌ Failed to initialize sheet headers:', error.message);
    return false;
  }
}

module.exports = {
  appendToSheet,
  initializeSheetHeaders,
  getSheetNameForEvent,
  ensureSheetExists,
  SPREADSHEET_ID,
  MASTER_SHEET_NAME,
  EVENT_SHEET_MAPPING,
  DEFAULT_SHEET_NAME
};

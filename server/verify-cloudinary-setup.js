/**
 * Cloudinary Setup Verification Script
 * Run this script to verify your Cloudinary configuration is working correctly
 * 
 * Usage: node verify-cloudinary-setup.js
 */

require('dotenv').config();
const { uploadToCloudinary, cloudinary } = require('./config/cloudinary');

console.log('═══════════════════════════════════════════════════════');
console.log('🌩️  CLOUDINARY SETUP VERIFICATION');
console.log('═══════════════════════════════════════════════════════\n');

async function verifySetup() {
  const checks = {
    credentials: false,
    connection: false,
    upload: false,
    folderStructure: false
  };

  // ============================================
  // CHECK 1: Environment Variables
  // ============================================
  console.log('📋 Step 1: Checking Environment Variables...');
  console.log('─────────────────────────────────────────────────────');
  
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  if (cloudName) {
    console.log('✅ Cloud Name: Set (' + cloudName + ')');
  } else {
    console.log('❌ Cloud Name: Missing');
  }
  
  if (apiKey) {
    console.log('✅ API Key: Set (' + apiKey.substring(0, 5) + '...' + apiKey.substring(apiKey.length - 3) + ')');
  } else {
    console.log('❌ API Key: Missing');
  }
  
  if (apiSecret) {
    console.log('✅ API Secret: Set (' + '*'.repeat(apiSecret.length) + ')');
  } else {
    console.log('❌ API Secret: Missing');
  }
  
  checks.credentials = !!(cloudName && apiKey && apiSecret);
  
  if (!checks.credentials) {
    console.log('\n❌ FAILED: Missing Cloudinary credentials in .env file');
    console.log('📝 Action Required:');
    console.log('   1. Open server/.env file');
    console.log('   2. Add the following variables:');
    console.log('      CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.log('      CLOUDINARY_API_KEY=your_api_key');
    console.log('      CLOUDINARY_API_SECRET=your_api_secret');
    return checks;
  }
  
  console.log('✅ All credentials are set!\n');

  // ============================================
  // CHECK 2: API Connection
  // ============================================
  console.log('🔌 Step 2: Testing API Connection...');
  console.log('─────────────────────────────────────────────────────');
  
  try {
    const result = await cloudinary.api.ping();
    console.log('✅ Successfully connected to Cloudinary!');
    console.log('📊 Status:', result.status);
    checks.connection = true;
  } catch (error) {
    console.log('❌ Connection Failed:', error.message);
    console.log('📝 Common Issues:');
    console.log('   - Check if credentials are correct in Cloudinary Dashboard');
    console.log('   - Verify internet connection');
    console.log('   - Check firewall settings');
    return checks;
  }
  console.log('');

  // ============================================
  // CHECK 3: Test Upload
  // ============================================
  console.log('📤 Step 3: Testing File Upload...');
  console.log('─────────────────────────────────────────────────────');
  
  // Create a 1x1 pixel test image (base64 PNG)
  const testImageBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  
  try {
    const uploadResult = await uploadToCloudinary(
      testImageBuffer,
      'verification-test.png',
      'test',
      { tags: ['verification', 'automated-test'] }
    );
    
    console.log('✅ Upload Successful!');
    console.log('📸 Secure URL:', uploadResult.secure_url);
    console.log('🆔 Public ID:', uploadResult.public_id);
    console.log('📁 Expected Path: techstorm/test/...');
    checks.upload = true;
    
    // Verify folder structure
    if (uploadResult.public_id.startsWith('techstorm/')) {
      console.log('✅ File uploaded to correct folder (techstorm)');
      checks.folderStructure = true;
    } else {
      console.log('⚠️  File NOT in techstorm folder. Check config/cloudinary.js');
      checks.folderStructure = false;
    }
    
  } catch (error) {
    console.log('❌ Upload Failed:', error.message);
    console.log('📝 Possible Issues:');
    console.log('   - Check file size limits');
    console.log('   - Verify upload permissions in Cloudinary');
    console.log('   - Review error details above');
    return checks;
  }
  console.log('');

  // ============================================
  // CHECK 4: Folder Structure
  // ============================================
  console.log('📂 Step 4: Verifying Folder Structure...');
  console.log('─────────────────────────────────────────────────────');
  
  try {
    const folders = await cloudinary.api.root_folders();
    const techstormExists = folders.folders.some(f => f.name === 'techstorm');
    
    if (techstormExists) {
      console.log('✅ "techstorm" folder exists in Cloudinary');
      
      // Try to get subfolders
      try {
        const subfolders = await cloudinary.api.sub_folders('techstorm');
        console.log('📁 Subfolders found:', subfolders.folders.map(f => f.name).join(', ') || 'None yet (will be created on first upload)');
      } catch (subError) {
        console.log('ℹ️  No subfolders yet (they will be created automatically on registration)');
      }
    } else {
      console.log('ℹ️  "techstorm" folder will be created on first upload');
    }
  } catch (error) {
    console.log('⚠️  Could not verify folder structure:', error.message);
    console.log('ℹ️  This is OK - folders will be created automatically');
  }
  console.log('');

  return checks;
}

// ============================================
// FINAL REPORT
// ============================================
async function generateReport(checks) {
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 VERIFICATION REPORT');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const results = [
    { name: 'Credentials', status: checks.credentials },
    { name: 'API Connection', status: checks.connection },
    { name: 'File Upload', status: checks.upload },
    { name: 'Folder Structure', status: checks.folderStructure }
  ];
  
  results.forEach(result => {
    const icon = result.status ? '✅' : '❌';
    console.log(`${icon} ${result.name}: ${result.status ? 'PASSED' : 'FAILED'}`);
  });
  
  const allPassed = Object.values(checks).every(check => check === true);
  
  console.log('\n═══════════════════════════════════════════════════════');
  if (allPassed) {
    console.log('🎉 SUCCESS! Cloudinary is fully configured and ready!');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('✅ Next Steps:');
    console.log('   1. Start your server: npm start');
    console.log('   2. Test event registration with file upload');
    console.log('   3. Check Cloudinary Media Library for uploaded files');
    console.log('   4. Verify MongoDB stores the Cloudinary URLs');
    console.log('\n📚 Folder Structure in Cloudinary:');
    console.log('   techstorm/');
    console.log('   ├── registrations/{eventName}/ - General files');
    console.log('   ├── payments/{eventName}/      - Payment receipts');
    console.log('   └── id-proofs/{eventName}/     - ID verification docs');
  } else {
    console.log('❌ SETUP INCOMPLETE');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📝 Action Required:');
    console.log('   1. Review the failed checks above');
    console.log('   2. Fix the issues mentioned');
    console.log('   3. Run this script again: node verify-cloudinary-setup.js');
    console.log('\n📖 For detailed help, see: CLOUDINARY_MIGRATION_GUIDE.md');
  }
  console.log('');
}

// Run verification
verifySetup()
  .then(generateReport)
  .catch(error => {
    console.error('\n💥 Unexpected Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  });

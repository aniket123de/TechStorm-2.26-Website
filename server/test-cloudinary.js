require('dotenv').config();
const { cloudinary } = require('./config/cloudinary');

/**
 * Test Cloudinary Connection and Configuration
 */
async function testCloudinarySetup() {
  console.log('🧪 Testing Cloudinary Setup...\n');

  // Test 1: Check environment variables
  console.log('📋 Step 1: Checking Environment Variables');
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('❌ Missing Cloudinary credentials in .env file!');
    console.log('\n📝 Please add these to server/.env:');
    console.log('CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.log('CLOUDINARY_API_KEY=your_api_key');
    console.log('CLOUDINARY_API_SECRET=your_api_secret\n');
    process.exit(1);
  }

  console.log(`✅ Cloud Name: ${cloudName}`);
  console.log(`✅ API Key: ${apiKey.substring(0, 6)}...`);
  console.log(`✅ API Secret: ${apiSecret.substring(0, 6)}...\n`);

  // Test 2: Ping Cloudinary API
  console.log('📋 Step 2: Testing API Connection');
  try {
    const pingResult = await cloudinary.api.ping();
    console.log('✅ Cloudinary API connection successful!');
    console.log('   Response:', pingResult);
  } catch (error) {
    console.error('❌ Cloudinary API connection failed!');
    console.error('   Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify credentials at: https://cloudinary.com/console');
    console.log('2. Check internet connection');
    console.log('3. Ensure no typos in .env file\n');
    process.exit(1);
  }

  // Test 3: Check folder structure
  console.log('\n📋 Step 3: Checking techstorm Folder');
  try {
    const folders = await cloudinary.api.sub_folders('');
    const techstormExists = folders.folders.some(f => f.name === 'techstorm');
    
    if (techstormExists) {
      console.log('✅ techstorm folder already exists');
      
      // Check subfolders
      try {
        const subfolders = await cloudinary.api.sub_folders('techstorm');
        console.log(`   Found ${subfolders.folders.length} subfolders:`);
        subfolders.folders.forEach(folder => {
          console.log(`   - ${folder.name} (${folder.path})`);
        });
      } catch (e) {
        console.log('   ℹ️  No subfolders yet (will be created on first upload)');
      }
    } else {
      console.log('ℹ️  techstorm folder will be created automatically on first upload');
    }
  } catch (error) {
    console.log('ℹ️  Could not check folders (will be created automatically)');
  }

  // Test 4: Check storage usage
  console.log('\n📋 Step 4: Checking Storage Usage');
  try {
    const usage = await cloudinary.api.usage();
    console.log(`✅ Storage Used: ${(usage.storage.usage / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Credits Used: ${usage.credits.usage} / ${usage.credits.limit}`);
    console.log(`   Bandwidth: ${(usage.bandwidth.usage / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.log('ℹ️  Could not fetch usage stats');
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('🎉 CLOUDINARY SETUP TEST PASSED!');
  console.log('='.repeat(60));
  console.log('\n✅ Ready to upload registration images to Cloudinary');
  console.log('📁 All uploads will be stored in: techstorm/[subfolder]/[eventName]/');
  console.log('🔗 URLs will be saved to MongoDB automatically');
  console.log('\n💡 Next: Start the server and test a registration form\n');
}

// Run tests
testCloudinarySetup()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });

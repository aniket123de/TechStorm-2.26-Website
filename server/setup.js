const mongoose = require('mongoose');
const { User, ROLES } = require('./models/User');
require('dotenv').config();

async function setupInitialUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if any core users exist
    const existingCoreUsers = await User.countDocuments({ role: ROLES.CORE });
    
    if (existingCoreUsers > 0) {
      console.log('ℹ️  Core users already exist. Skipping initial setup.');
      process.exit(0);
    }

    // Create initial core user
    const initialUser = new User({
      name: 'TechStorm Admin',
      email: 'admin@techstorm.com',
      password: 'TechStorm2024!', // Change this password after first login
      role: ROLES.CORE,
      department: 'Administration',
      phone: '+1234567890'
    });

    await initialUser.save();

    console.log('✅ Initial core user created successfully!');
    console.log('📧 Email: admin@techstorm.com');
    console.log('🔑 Password: TechStorm2024!');
    console.log('⚠️  IMPORTANT: Please change this password after first login!');
    
    // Create sample users for testing
    const sampleUsers = [
      {
        name: 'Event Coordinator',
        email: 'coordinator@techstorm.com',
        password: 'coordinator123',
        role: ROLES.COORDINATOR,
        department: 'Event Management',
        phone: '+1234567891'
      },
      {
        name: 'Volunteer User',
        email: 'volunteer@techstorm.com',
        password: 'volunteer123',
        role: ROLES.VOLUNTEER,
        department: 'Computer Science',
        studentId: 'CS2024001',
        phone: '+1234567892'
      }
    ];

    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Sample user created: ${user.email} (${user.role})`);
    }

    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('Core User: admin@techstorm.com / TechStorm2024!');
    console.log('Coordinator: coordinator@techstorm.com / coordinator123');
    console.log('Volunteer: volunteer@techstorm.com / volunteer123');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('📡 Database connection closed');
    process.exit(0);
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupInitialUser();
}

module.exports = { setupInitialUser };

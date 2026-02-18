const fs = require('fs');
const path = require('path');

const registrationFiles = [
  'TechnomaniaRegistration.js',
  'RoSumoRegistration.js',
  'RoTerranceRegistration.js',
  'RoCombatRegistration.js',
  'RoSoccerRegistration.js',
  'TechHuntRegistration.js',
  'KhetRegistration.js',
  'OmegatrixRegistration.js',
  'PassionWithReelsRegistration.js',
  'ForzaHorizonRegistration.js',
  'FifaMobileRegistration.js'
];

const basePath = 'src/components/Pages/Registration';

const errorDisplayCode = `
          {errors.submit && (
            <div className="error-message" style={{ 
              marginBottom: '20px', 
              padding: '15px', 
              backgroundColor: '#ff4444', 
              color: 'white',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              {errors.submit}
            </div>
          )}
`;

registrationFiles.forEach((file) => {
  const filePath = path.join(basePath, file);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if error display already exists
    if (content.includes('errors.submit')) {
      console.log(`⊘ ${file} already has error display`);
      return;
    }
    
    // Add error display after success message
    content = content.replace(
      /(\{submitSuccess && \([\s\S]*?\)\})\s*(<form className="registration-form")/,
      `$1${errorDisplayCode}\n          $2`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Added error display to ${file}`);
  } catch (error) {
    console.error(`✗ Failed to update ${file}:`, error.message);
  }
});

console.log('\nAll registration forms updated with error display!');

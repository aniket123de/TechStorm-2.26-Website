const fs = require('fs');
const path = require('path');

const registrationFiles = [
  { file: 'RoSumoRegistration.js', eventName: 'Ro-Sumo' },
  { file: 'RoTerranceRegistration.js', eventName: 'Ro-Terrance' },
  { file: 'RoCombatRegistration.js', eventName: 'Ro-Combat' },
  { file: 'RoSoccerRegistration.js', eventName: 'Ro-Soccer' },
  { file: 'TechHuntRegistration.js', eventName: 'Tech Hunt' },
  { file: 'KhetRegistration.js', eventName: 'Khet' },
  { file: 'OmegatrixRegistration.js', eventName: 'Omegatrix' },
  { file: 'PassionWithReelsRegistration.js', eventName: 'Passion With Reels' },
  { file: 'ForzaHorizonRegistration.js', eventName: 'Forza Horizon' },
  { file: 'FifaMobileRegistration.js', eventName: 'FIFA Mobile' }
];

const basePath = 'src/components/Pages/Registration';

registrationFiles.forEach(({ file, eventName }) => {
  const filePath = path.join(basePath, file);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if not present
    if (!content.includes('submitEventRegistration')) {
      content = content.replace(
        /import { useHistory } from 'react-router-dom';/,
        `import { useHistory } from 'react-router-dom';\nimport { submitEventRegistration } from '../../../utils/eventRegistrationAPI';`
      );
    }
    
    // Replace handleSubmit function
    const oldPattern = /const handleSubmit = \(e\) => \{[\s\S]*?setTimeout\(\(\) => \{[\s\S]*?history\.push\('\/events'\);[\s\S]*?\}, \d+\);[\s\S]*?\};/;
    
    const newSubmit = `const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitEventRegistration('${eventName}', formData);
      console.log('${eventName} registration successful:', result);
      setSubmitSuccess(true);

      setTimeout(() => {
        history.push('/events');
      }, 2500);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message.includes('duplicate')) {
        setErrors({ submit: 'You have already registered for this event with this email or phone number.' });
      } else {
        setErrors({ submit: error.message || 'Registration failed. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };`;
    
    content = content.replace(oldPattern, newSubmit);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${file}`);
  } catch (error) {
    console.error(`✗ Failed to update ${file}:`, error.message);
  }
});

console.log('\nAll registration forms updated!');

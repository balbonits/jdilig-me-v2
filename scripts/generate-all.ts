#!/usr/bin/env ts-node

import { generateExercisesJSON } from './generate-exercises';
import { generateUtilitiesJSON } from './generate-utilities';
import ProjectGenerator from './generate-projects';

async function generateAll() {
  console.log('🔄 Generating all code data...\n');
  
  try {
    console.log('📚 Generating exercises...');
    await generateExercisesJSON();
    
    console.log('\n🛠️ Generating utilities...');
    await generateUtilitiesJSON();
    
    console.log('\n📁 Generating projects...');
    const projectGenerator = new ProjectGenerator();
    projectGenerator.run();
    
    console.log('\n✅ All code data generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate code data:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateAll()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Generation failed:', error);
      process.exit(1);
    });
}

export { generateAll };
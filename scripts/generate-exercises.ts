#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { ExerciseData } from '../src/interfaces/exercises';

const EXERCISES_DIR = path.join(__dirname, '../src/exercises');
const OUTPUT_DIR = path.join(__dirname, '../public');

async function generateExercisesJSON() {
  // Ensure public directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all exercise files
  const exerciseFiles = fs.readdirSync(EXERCISES_DIR)
    .filter(file => file.endsWith('.ts'))
    .sort();

  const exercises: ExerciseData[] = [];

  for (const file of exerciseFiles) {
    const filePath = path.join(EXERCISES_DIR, file);
    const fileName = path.basename(file, '.ts');
    
    try {
      console.log(`Processing ${fileName}...`);
      
      // Read the file content
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      // Import the module dynamically
      const modulePath = path.resolve(filePath);
      delete require.cache[modulePath]; // Clear cache for re-imports
      const exerciseModule = require(modulePath);
      
      // Extract metadata and examples
      const { metadata, examples } = exerciseModule;
      
      if (!metadata || !examples) {
        console.warn(`Skipping ${fileName}: missing metadata or examples`);
        continue;
      }
      
      // Extract function names from exports
      const functions = Object.keys(exerciseModule)
        .filter(key => typeof exerciseModule[key] === 'function')
        .filter(key => !['default'].includes(key));
      
      // Create slug from filename
      const slug = fileName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      
      const exerciseData: ExerciseData = {
        name: fileName,
        slug,
        metadata,
        examples,
        code: fileContent,
        functions
      };
      
      exercises.push(exerciseData);
      console.log(`✓ Processed ${fileName}`);
      
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
    }
  }

  // Write exercises.json
  const outputPath = path.join(OUTPUT_DIR, 'exercises.json');
  fs.writeFileSync(outputPath, JSON.stringify(exercises, null, 2));
  
  console.log(`\n✅ Generated exercises.json with ${exercises.length} exercises`);
  console.log(`📄 Output: ${outputPath}`);
  
  return exercises;
}

// Run if called directly
if (require.main === module) {
  generateExercisesJSON()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Failed to generate exercises JSON:', error);
      process.exit(1);
    });
}

export { generateExercisesJSON };
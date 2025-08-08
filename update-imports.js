#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const exercisesDir = path.join(__dirname, 'src/exercises');

// Get all exercise files
const files = fs.readdirSync(exercisesDir).filter(file => 
  file.endsWith('.ts')
);

console.log(`Updating import statements in ${files.length} exercise files...`);

files.forEach(file => {
  const filePath = path.join(exercisesDir, file);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old import with new one
    const oldImportRegex = /import\s*{\s*ExerciseMetadata,\s*ExampleCase,\s*SolutionMetadata\s*}\s*from\s*'@\/interfaces\/exercises';/;
    const newImport = "import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/shared';";
    
    if (oldImportRegex.test(content)) {
      content = content.replace(oldImportRegex, newImport);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${file}`);
    } else {
      console.log(`- Skipped: ${file} (import already correct or not found)`);
    }
    
  } catch (error) {
    console.error(`✗ Error updating ${file}:`, error.message);
  }
});

console.log('Import update complete!');

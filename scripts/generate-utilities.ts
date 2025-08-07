#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { UtilityData } from '../src/interfaces/utilities';

const UTILITIES_DIR = path.join(__dirname, '../src/utilities');
const OUTPUT_DIR = path.join(__dirname, '../public');

async function generateUtilitiesJSON() {
  // Ensure public directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all utility files
  const utilityFiles = fs.readdirSync(UTILITIES_DIR)
    .filter(file => file.endsWith('.ts'))
    .sort();

  const utilities: UtilityData[] = [];

  for (const file of utilityFiles) {
    const filePath = path.join(UTILITIES_DIR, file);
    const fileName = path.basename(file, '.ts');
    
    try {
      console.log(`Processing ${fileName}...`);
      
      // Read the file content
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      // Import the module dynamically
      const modulePath = path.resolve(filePath);
      delete require.cache[modulePath]; // Clear cache for re-imports
      const utilityModule = require(modulePath);
      
      // Extract metadata and examples
      const { metadata, examples } = utilityModule;
      
      if (!metadata || !examples) {
        console.warn(`Skipping ${fileName}: missing metadata or examples`);
        continue;
      }
      
      // Extract function names from exports
      const functions = Object.keys(utilityModule)
        .filter(key => typeof utilityModule[key] === 'function')
        .filter(key => !['default'].includes(key));
      
      // Use filename directly as slug  
      const slug = fileName;
      
      const utilityData: UtilityData = {
        name: fileName,
        slug,
        metadata,
        examples,
        code: fileContent,
        functions
      };
      
      utilities.push(utilityData);
      console.log(`✓ Processed ${fileName}`);
      
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
    }
  }

  // Write utilities.json
  const outputPath = path.join(OUTPUT_DIR, 'utilities.json');
  fs.writeFileSync(outputPath, JSON.stringify(utilities, null, 2));
  
  console.log(`\n✅ Generated utilities.json with ${utilities.length} utilities`);
  console.log(`📄 Output: ${outputPath}`);
  
  return utilities;
}

// Run if called directly
if (require.main === module) {
  generateUtilitiesJSON()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Failed to generate utilities JSON:', error);
      process.exit(1);
    });
}

export { generateUtilitiesJSON };
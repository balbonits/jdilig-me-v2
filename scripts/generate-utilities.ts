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
      
      // Extract metadata, examples, and solutions
      const { metadata, examples, solutions } = utilityModule;
      
      if (!metadata || !examples) {
        console.warn(`Skipping ${fileName}: missing metadata or examples`);
        continue;
      }
      
      // Extract function names from exports
      const functions = Object.keys(utilityModule)
        .filter(key => typeof utilityModule[key] === 'function')
        .filter(key => !['default'].includes(key));
      
      // Use solution metadata if provided, otherwise fall back to function extraction
      let solutionData: any[] = [];
      
      if (solutions && Array.isArray(solutions)) {
        // Use the explicitly defined solution metadata
        solutionData = solutions.map(solutionMeta => {
          // Extract function code using regex
          const funcRegex = new RegExp(`export (?:function|const) ${solutionMeta.name}[\\s\\S]*?(?=export|$)`, 'g');
          const match = fileContent.match(funcRegex);
          const funcCode = match ? match[0].trim() : '';
          
          return {
            name: solutionMeta.name,
            tabName: solutionMeta.tabName,
            code: funcCode,
            approach: solutionMeta.tabName, // Use tabName as the approach for display
            timeComplexity: solutionMeta.timeComplexity,
            spaceComplexity: solutionMeta.spaceComplexity,
            isOptimal: solutionMeta.isOptimal,
            type: solutionMeta.type
          };
        });
      } else {
        // Fall back to the old method for utilities not yet updated
        solutionData = functions.map((funcName, index) => {
          // Extract function code using regex
          const funcRegex = new RegExp(`export function ${funcName}[\\s\\S]*?(?=export|$)`, 'g');
          const match = fileContent.match(funcRegex);
          const funcCode = match ? match[0].trim() : '';
          
          return {
            name: funcName,
            tabName: funcName, // Use function name as tab name for backwards compatibility
            code: funcCode,
            approach: funcName,
            timeComplexity: 'O(1)',
            spaceComplexity: 'O(1)',
            isOptimal: true,
            type: 'utility' as const // Default to utility type
          };
        });
      }
      
      // Use filename directly as slug  
      const slug = fileName;
      
      const utilityData: UtilityData = {
        name: fileName,
        slug,
        metadata,
        examples,
        code: fileContent,
        functions,
        solutions: solutionData
      };
      
      utilities.push(utilityData);
      console.log(`✓ Processed ${fileName}`);
      
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
    }
  }

  // Write utilities.json (minified for production)
  const outputPath = path.join(OUTPUT_DIR, 'utilities.json');
  const minifiedJSON = JSON.stringify(utilities);
  fs.writeFileSync(outputPath, minifiedJSON);
  
  const fileSizeKB = (Buffer.byteLength(minifiedJSON, 'utf8') / 1024).toFixed(1);
  console.log(`\n✅ Generated utilities.json with ${utilities.length} utilities`);
  console.log(`📄 Output: ${outputPath} (${fileSizeKB} KB minified)`);
  
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
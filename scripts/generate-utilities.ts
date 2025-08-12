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
      
      // Extract JSDoc comments for rich description
      const jsdocMatch = fileContent.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
      let enrichedMetadata = {};
      
      if (jsdocMatch) {
        const jsdocContent = jsdocMatch[1];
        
        // Parse different sections from JSDoc
        const descriptionMatch = jsdocContent.match(/\* DESCRIPTION:\s*\n\s*\*\s*(.*?)(?:\n\s*\*\s*\n|\n\s*\*\s*[A-Z]+:)/);
        const exampleMatch = jsdocContent.match(/\* EXAMPLE:\s*\n([\s\S]*?)(?:\n\s*\*\s*\n|\n\s*\*\s*[A-Z]+:)/);
        const conceptsMatch = jsdocContent.match(/\* CONCEPTS:\s*\n([\s\S]*?)(?:\n\s*\*\s*\n|\n\s*\*\s*[A-Z]+:)/);
        const performanceMatch = jsdocContent.match(/\* PERFORMANCE:\s*\n([\s\S]*?)(?:\n\s*\*\s*\n|\n\s*\*\s*[A-Z]+:)/);
        const constraintsMatch = jsdocContent.match(/\* CONSTRAINTS:\s*\n([\s\S]*?)(?:\n\s*\*\s*\n|\n\s*\*\s*[A-Z]+:)/);
        const approachesMatch = jsdocContent.match(/\* APPROACHES:\s*\n([\s\S]*?)(?:\n\s*\*\s*\n|\n\s*\*\s*[A-Z]+:)/);
        const usageMatch = jsdocContent.match(/\* USAGE:\s*\n([\s\S]*?)(?:\n\s*\*\s*\n|\n\s*\*\s*[A-Z]+:)/);
        
        enrichedMetadata = {
          detailedDescription: descriptionMatch ? descriptionMatch[1].trim() : undefined,
          examples: exampleMatch ? [exampleMatch[1].replace(/\*\s*/g, '').trim()] : undefined,
          performanceNotes: performanceMatch ? performanceMatch[1].replace(/\*\s*/g, '').trim() : undefined,
          constraints: constraintsMatch ? constraintsMatch[1].replace(/\*\s*/g, '').split('\n').filter(line => line.trim()).map(line => line.trim()) : undefined,
          approaches: approachesMatch ? approachesMatch[1].replace(/\*\s*/g, '').split('\n').filter(line => line.trim()).map(line => line.trim()) : undefined,
          usage: usageMatch ? usageMatch[1].replace(/\*\s*/g, '').trim() : undefined,
        };
      }
      
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
        metadata: { ...metadata, ...enrichedMetadata },
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

  // Write utilities-index.json (summary list)
  const indexSummaries = utilities.map(u => ({
    name: u.name,
    slug: u.slug,
    description: u.metadata?.description || u.metadata?.detailedDescription || '',
    category: u.metadata?.category || '',
    difficulty: u.metadata?.difficulty || '',
  }));
  const indexPath = path.join(OUTPUT_DIR, 'utilities-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(indexSummaries));
  console.log(`\n✅ Generated utilities-index.json (${indexSummaries.length} summaries)`);
  // Write per-utility JSON files
  const perUtilityDir = path.join(OUTPUT_DIR, 'utilities');
  if (!fs.existsSync(perUtilityDir)) {
    fs.mkdirSync(perUtilityDir, { recursive: true });
  }
  for (const u of utilities) {
    const utilPath = path.join(perUtilityDir, `${u.slug}.json`);
    fs.writeFileSync(utilPath, JSON.stringify(u));
  }
  console.log(`✅ Generated per-utility JSON files in /public/utilities/`);
  // Write utilities.json (full, for backward compatibility)
  const outputPath = path.join(OUTPUT_DIR, 'utilities.json');
  const minifiedJSON = JSON.stringify(utilities);
  fs.writeFileSync(outputPath, minifiedJSON);
  const fileSizeKB = (Buffer.byteLength(minifiedJSON, 'utf8') / 1024).toFixed(1);
  console.log(`✅ Generated utilities.json with ${utilities.length} utilities`);
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
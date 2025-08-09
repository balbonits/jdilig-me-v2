#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { ExerciseData } from '../src/interfaces/exercises';
import { Solution, SolutionMetadata } from '../src/interfaces/shared';

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
        
        enrichedMetadata = {
          detailedDescription: descriptionMatch ? descriptionMatch[1].trim() : undefined,
          examples: exampleMatch ? [exampleMatch[1].replace(/\*\s*/g, '').trim()] : undefined,
          performanceNotes: performanceMatch ? performanceMatch[1].replace(/\*\s*/g, '').trim() : undefined,
          constraints: constraintsMatch ? constraintsMatch[1].replace(/\*\s*/g, '').split('\n').filter(line => line.trim()).map(line => line.trim()) : undefined,
          approaches: approachesMatch ? approachesMatch[1].replace(/\*\s*/g, '').split('\n').filter(line => line.trim()).map(line => line.trim()) : undefined,
        };
      }
      
      // Import the module dynamically
      const modulePath = path.resolve(filePath);
      delete require.cache[modulePath]; // Clear cache for re-imports
      const exerciseModule = require(modulePath);
      
      // Extract metadata, examples, and solutions
      const { metadata, examples, solutions } = exerciseModule;
      
      if (!metadata || !examples) {
        console.warn(`Skipping ${fileName}: missing metadata or examples`);
        continue;
      }
      
      // Extract function names from exports
      const functions = Object.keys(exerciseModule)
        .filter(key => typeof exerciseModule[key] === 'function')
        .filter(key => !['default'].includes(key));
      
      // Use solution metadata if provided, otherwise fall back to function extraction
      let solutionData: Solution[] = [];
      
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
        // Fall back to the old method for exercises not yet updated
        solutionData = functions.map((funcName, index) => {
          // Extract function code using regex
          const funcRegex = new RegExp(`export function ${funcName}[\\s\\S]*?(?=export|$)`, 'g');
          const match = fileContent.match(funcRegex);
          const funcCode = match ? match[0].trim() : '';
          
          // Use function name as approach for backwards compatibility
          let approach = funcName;
          let timeComplexity = 'O(n)';
          let spaceComplexity = 'O(1)';
          let isOptimal = false;
          
          // Basic complexity inference (keep minimal for backwards compatibility)
          if (funcName.toLowerCase().includes('bruteforce') || funcName.toLowerCase().includes('brute')) {
            timeComplexity = 'O(n²)';
          } else if (funcName.toLowerCase().includes('recursive')) {
            spaceComplexity = 'O(n)';
          }
          
          return {
            name: funcName,
            tabName: funcName, // Use function name as tab name for backwards compatibility
            code: funcCode,
            approach,
            timeComplexity,
            spaceComplexity,
            isOptimal,
            type: 'function' as const // Default to function type
          };
        });
      }
      
      // Determine optimal solution(s) based on time complexity analysis (only for legacy exercises)
      if (!solutions || !Array.isArray(solutions)) {
        // Priority: O(1) > O(log n) > O(n) > O(n log n) > O(n²) > O(n³) > O(2^n)
        const complexityOrder = {
          'O(1)': 1,
          'O(log n)': 2, 
          'O(n)': 3,
          'O(n log n)': 4,
          'O(n²)': 5,
          'O(n³)': 6,
          'O(2^n)': 7
        };
        
        // Find the best time complexity
        let bestComplexityScore = Infinity;
        solutionData.forEach((solution: Solution) => {
          const complexity = solution.timeComplexity?.split(' ')[0] || 'O(n)'; // Take first part if multiple
          const score = complexityOrder[complexity as keyof typeof complexityOrder] || 99;
          if (score < bestComplexityScore) {
            bestComplexityScore = score;
          }
        });
        
        // Mark solutions with the best time complexity as optimal
        solutionData.forEach((solution: Solution) => {
          const complexity = solution.timeComplexity?.split(' ')[0] || 'O(n)';
          const score = complexityOrder[complexity as keyof typeof complexityOrder] || 99;
          solution.isOptimal = score === bestComplexityScore;
        });
      }
      
      // Use filename directly as slug
      const slug = fileName;
      
      const exerciseData: ExerciseData = {
        name: fileName,
        slug,
        metadata: { ...metadata, ...enrichedMetadata },
        examples,
        code: fileContent,
        functions,
        solutions: solutionData
      };
      
      exercises.push(exerciseData);
      console.log(`✓ Processed ${fileName}`);
      
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
    }
  }

  // Write exercises.json (minified for production)
  const outputPath = path.join(OUTPUT_DIR, 'exercises.json');
  const minifiedJSON = JSON.stringify(exercises);
  fs.writeFileSync(outputPath, minifiedJSON);
  
  const fileSizeKB = (Buffer.byteLength(minifiedJSON, 'utf8') / 1024).toFixed(1);
  console.log(`\n✅ Generated exercises.json with ${exercises.length} exercises`);
  console.log(`📄 Output: ${outputPath} (${fileSizeKB} KB minified)`);
  
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
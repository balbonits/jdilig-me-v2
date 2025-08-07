#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { ExerciseData, Solution } from '../src/interfaces/exercises';

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
      
      // Extract individual solutions by parsing the file content
      const solutions = functions.map((funcName, index) => {
        // Extract function code using regex
        const funcRegex = new RegExp(`export function ${funcName}[\\s\\S]*?(?=export|$)`, 'g');
        const match = fileContent.match(funcRegex);
        const funcCode = match ? match[0].trim() : '';
        
        // Determine approach and complexity based on function name
        let approach = 'Standard';
        let timeComplexity = 'O(n)'; // Default for standard approach
        let spaceComplexity = 'O(1)'; // Default for standard approach
        let isOptimal = false; // Will be determined by algorithm analysis
        
        // Parse approach from function name and set complexity
        if (funcName.toLowerCase().includes('hashmap') || funcName.toLowerCase().includes('hash')) {
          approach = 'Hash Map';
          timeComplexity = 'O(n)';
          spaceComplexity = 'O(n)';
        } else if (funcName.toLowerCase().includes('bruteforce') || funcName.toLowerCase().includes('brute')) {
          approach = 'Brute Force';
          timeComplexity = 'O(n²)';
          spaceComplexity = 'O(1)';
        } else if (funcName.toLowerCase().includes('sort')) {
          approach = 'Sorting';
          timeComplexity = 'O(n log n)';
          spaceComplexity = 'O(n)';
        } else if (funcName.toLowerCase().includes('recursive')) {
          approach = 'Recursive';
          timeComplexity = 'O(n)';
          spaceComplexity = 'O(n)';
        } else if (funcName.toLowerCase().includes('iterative')) {
          approach = 'Iterative';
          timeComplexity = 'O(n)';
          spaceComplexity = 'O(1)';
        } else {
          // For standard/base functions, try to infer from context
          // For anagram functions, sorting approach is typical for the base function
          if (funcName.toLowerCase().includes('anagram')) {
            approach = 'Sorting';
            timeComplexity = 'O(n log n)';
            spaceComplexity = 'O(n)';
          }
        }
        
        return {
          name: funcName,
          code: funcCode,
          approach,
          timeComplexity,
          spaceComplexity,
          isOptimal // Will be set after analyzing all solutions
        };
      });
      
      // Determine optimal solution(s) based on time complexity analysis
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
      solutions.forEach(solution => {
        const complexity = solution.timeComplexity?.split(' ')[0] || 'O(n)'; // Take first part if multiple
        const score = complexityOrder[complexity as keyof typeof complexityOrder] || 99;
        if (score < bestComplexityScore) {
          bestComplexityScore = score;
        }
      });
      
      // Mark solutions with the best time complexity as optimal
      solutions.forEach(solution => {
        const complexity = solution.timeComplexity?.split(' ')[0] || 'O(n)';
        const score = complexityOrder[complexity as keyof typeof complexityOrder] || 99;
        solution.isOptimal = score === bestComplexityScore;
      });
      
      // Use filename directly as slug
      const slug = fileName;
      
      const exerciseData: ExerciseData = {
        name: fileName,
        slug,
        metadata,
        examples,
        code: fileContent,
        functions,
        solutions
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
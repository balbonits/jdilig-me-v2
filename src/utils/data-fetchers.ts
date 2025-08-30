/**
 * Data fetching utilities for exercises and utilities JSON files
 * Can be used for both client-side fetching and future data operations
 */

import { ExerciseData } from '@/interfaces/exercises';
import { UtilityData } from '@/interfaces/utilities';
import { PatternData } from '@/interfaces/patterns';
import { Solution } from '@/interfaces/shared';

/**
 * Fetch exercises data from the public JSON file
 * @returns Promise<ExerciseData[]> Array of exercise data
 * @throws Error if fetch fails or response is not ok
 */
export async function fetchExercises(): Promise<ExerciseData[]> {
  const response = await fetch('/exercises.json');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch exercises: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch utilities data from the public JSON file
 * @returns Promise<UtilityData[]> Array of utility data
 * @throws Error if fetch fails or response is not ok
 */
export async function fetchUtilities(): Promise<UtilityData[]> {
  const response = await fetch('/utilities.json');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch utilities: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch both exercises and utilities data concurrently
 * @returns Promise<{exercises: ExerciseData[], utilities: UtilityData[]}> 
 * @throws Error if either fetch fails
 */
export async function fetchAllCodeData(): Promise<{
  exercises: ExerciseData[];
  utilities: UtilityData[];
}> {
  const [exercises, utilities] = await Promise.all([
    fetchExercises(),
    fetchUtilities()
  ]);
  
  return { exercises, utilities };
}

/**
 * Find a specific exercise by slug
 * @param slug The exercise slug to find
 * @returns Promise<ExerciseData | undefined> The exercise if found
 */
export async function fetchExerciseBySlug(slug: string): Promise<ExerciseData | undefined> {
  const exercises = await fetchExercises();
  return exercises.find(exercise => exercise.slug === slug);
}

/**
 * Find a specific utility by slug  
 * @param slug The utility slug to find
 * @returns Promise<UtilityData | undefined> The utility if found
 */
export async function fetchUtilityBySlug(slug: string): Promise<UtilityData | undefined> {
  const utilities = await fetchUtilities();
  return utilities.find(utility => utility.slug === slug);
}

/**
 * Load exercises data from the file system (for SSG/SSR)
 * @returns Promise<ExerciseData[]> Array of exercise data
 */
export async function loadExercisesData(): Promise<ExerciseData[]> {
  if (typeof window !== 'undefined') {
    // Client-side fallback to fetch
    return fetchExercises();
  }
  
  // Server-side: load from file system
  try {
    const fs = await import('fs');
    const path = await import('path');
    const exercisesPath = path.join(process.cwd(), 'public', 'exercises.json');
    const exercisesJson = fs.readFileSync(exercisesPath, 'utf-8');
    return JSON.parse(exercisesJson);
  } catch (error) {
    console.warn('Could not load exercises.json:', error);
    return [];
  }
}

/**
 * Load utilities data from the file system (for SSG/SSR)
 * @returns Promise<UtilityData[]> Array of utility data
 */
export async function loadUtilitiesData(): Promise<UtilityData[]> {
  if (typeof window !== 'undefined') {
    // Client-side fallback to fetch
    return fetchUtilities();
  }
  
  // Server-side: load from file system
  try {
    const fs = await import('fs');
    const path = await import('path');
    const utilitiesPath = path.join(process.cwd(), 'public', 'utilities.json');
    const utilitiesJson = fs.readFileSync(utilitiesPath, 'utf-8');
    return JSON.parse(utilitiesJson);
  } catch (error) {
    console.warn('Could not load utilities.json:', error);
    return [];
  }
}

/**
 * Load exercise by slug from the file system (for SSG/SSR)
 * @param slug The exercise slug to find
 * @returns Promise<ExerciseData | undefined> The exercise if found
 */
export async function loadExerciseBySlug(slug: string): Promise<ExerciseData | undefined> {
  const exercises = await loadExercisesData();
  return exercises.find(exercise => exercise.slug === slug);
}

/**
 * Load utility by slug from the file system (for SSG/SSR)
 * @param slug The utility slug to find  
 * @returns Promise<UtilityData | undefined> The utility if found
 */
export async function loadUtilityBySlug(slug: string): Promise<UtilityData | undefined> {
  const utilities = await loadUtilitiesData();
  return utilities.find(utility => utility.slug === slug);
}

// =============================================================================
// PATTERNS DATA FETCHERS
// =============================================================================

/**
 * Fetch patterns data from the public JSON file
 * @returns Promise<PatternData[]> Array of pattern data
 * @throws Error if fetch fails or response is not ok
 */
export async function fetchPatterns(): Promise<PatternData[]> {
  const response = await fetch('/patterns.json');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch patterns: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Find a specific pattern by slug
 * @param slug The pattern slug to find
 * @returns Promise<PatternData | undefined> The pattern if found
 */
export async function fetchPatternBySlug(slug: string): Promise<PatternData | undefined> {
  const patterns = await fetchPatterns();
  return patterns.find(pattern => pattern.slug === slug);
}

/**
 * Load patterns data from the file system (for SSG/SSR)
 * @returns Promise<PatternData[]> Array of pattern data
 */
export async function loadPatternsData(): Promise<PatternData[]> {
  if (typeof window !== 'undefined') {
    // Client-side fallback to fetch
    return fetchPatterns();
  }
  
  // Server-side: load from file system
  try {
    const fs = await import('fs');
    const path = await import('path');
    const patternsPath = path.join(process.cwd(), 'public', 'patterns.json');
    const patternsJson = fs.readFileSync(patternsPath, 'utf-8');
    return JSON.parse(patternsJson);
  } catch (error) {
    console.warn('Could not load patterns.json:', error);
    return [];
  }
}

/**
 * Load pattern by slug from the file system (for SSG/SSR)
 * @param slug The pattern slug to find
 * @returns Promise<PatternData | undefined> The pattern if found
 */
export async function loadPatternBySlug(slug: string): Promise<PatternData | undefined> {
  const patterns = await loadPatternsData();
  return patterns.find(pattern => pattern.slug === slug);
}

/**
 * Get all pattern slugs for static generation
 * @returns string[] Array of pattern slugs
 */
export function getAllPatternSlugs(): string[] {
  // Return all implemented design pattern slugs
  return [
    'abstractfactory',
    'adapter', 
    'asynciterator',
    'bridge',
    'builder',
    'chainofresponsibility',
    'command',
    'composite',
    'decorator',
    'facade',
    'factory',
    'flyweight',
    'iterator',
    'mediator',
    'memento',
    'mixin',
    'module',
    'observer',
    'prototype',
    'proxy',
    'proxyobservables',
    'revealingmodule',
    'singleton',
    'state',
    'strategy',
    'templatemethod',
    'visitor'
  ];
}

/**
 * Extract code from pattern module functions
 */
async function extractPatternCode(slug: string): Promise<{ [key: string]: string }> {
  // Read the pattern file directly to extract code
  const fs = await import('fs');
  const path = await import('path');
  
  const patternPath = path.join(process.cwd(), 'src', 'patterns', `${slug.charAt(0).toUpperCase() + slug.slice(1)}.ts`);
  const sourceCode = fs.readFileSync(patternPath, 'utf-8');
  
  const codeExtracts: { [key: string]: string } = {};
  
  // Split by export statements and extract code blocks
  const lines = sourceCode.split('\n');
  let currentExport = '';
  let braceCount = 0;
  let inExport = false;
  let exportName = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for export statement
    const exportMatch = line.match(/^export (?:(?:class|function|const)\s+(\w+)|(?:const\s+(\w+)\s*=))/);
    if (exportMatch) {
      // Save previous export if exists
      if (inExport && exportName && currentExport) {
        codeExtracts[exportName] = currentExport.trim();
      }
      
      // Start new export
      exportName = exportMatch[1] || exportMatch[2];
      currentExport = line;
      inExport = true;
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      
      // Handle single-line exports
      if (line.includes(';') && braceCount === 0) {
        codeExtracts[exportName] = line;
        inExport = false;
        exportName = '';
        currentExport = '';
      }
    } else if (inExport) {
      // Continue building current export
      currentExport += '\n' + line;
      braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      
      // Check if export is complete
      if (braceCount === 0 && (line.includes('}') || line.includes(';'))) {
        if (exportName && currentExport) {
          codeExtracts[exportName] = currentExport.trim();
        }
        inExport = false;
        exportName = '';
        currentExport = '';
      }
    }
  }
  
  // Handle last export if file doesn't end with newline
  if (inExport && exportName && currentExport) {
    codeExtracts[exportName] = currentExport.trim();
  }
  
  return codeExtracts;
}

/**
 * Get pattern by slug synchronously (for static generation)
 * @param slug The pattern slug to find
 * @returns PatternData The pattern data
 * @throws Error if pattern not found
 */
export async function getPatternBySlug(slug: string): Promise<PatternData> {
  // Import pattern modules dynamically for static generation
  let patternModule;
  
  switch (slug) {
    case 'singleton':
      patternModule = await import('@/patterns/Singleton');
      break;
    case 'observer':
      patternModule = await import('@/patterns/Observer');
      break;
    case 'factory':
      patternModule = await import('@/patterns/Factory');
      break;
    case 'strategy':
      patternModule = await import('@/patterns/Strategy');
      break;
    case 'decorator':
      patternModule = await import('@/patterns/Decorator');
      break;
    default:
      throw new Error(`Pattern not found: ${slug}`);
  }

  const moduleDefault = patternModule.default;
  if (!moduleDefault) {
    throw new Error(`Pattern module not found: ${slug}`);
  }

  // Extract code examples
  const codeExtracts = await extractPatternCode(slug);

  // Create solutions with actual code
  const solutionsWithCode = moduleDefault.solutions.map((sol): Solution => {
    const code = codeExtracts[sol.name] || `// ${sol.name} implementation\n// See pattern module for full code`;
    return { ...sol, code };
  });

  return {
    name: moduleDefault.metadata.title.replace(' Pattern', ''),
    slug: slug,
    metadata: moduleDefault.metadata,
    examples: moduleDefault.examples,
    code: Object.values(codeExtracts).join('\n\n'), // All code combined
    functions: Object.keys(moduleDefault).filter(key => 
      key !== 'metadata' && key !== 'solutions' && key !== 'examples' && key !== 'default'
    ),
    solutions: solutionsWithCode,
    solutionMetadata: moduleDefault.solutions
  };
}

/**
 * Fetch all code data including patterns
 * @returns Promise with exercises, utilities, and patterns
 */
export async function fetchAllCodeDataWithPatterns(): Promise<{
  exercises: ExerciseData[];
  utilities: UtilityData[];
  patterns: PatternData[];
}> {
  const [exercises, utilities, patterns] = await Promise.all([
    fetchExercises(),
    fetchUtilities(),
    fetchPatterns()
  ]);
  
  return { exercises, utilities, patterns };
}

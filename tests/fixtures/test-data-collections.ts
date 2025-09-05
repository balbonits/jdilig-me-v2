/**
 * Centralized test data collections for E2E testing
 * Source of truth for expected counts and content validation
 * 
 * Uses actual data sources to automatically reflect changes when new items are added
 * to showcase (projects/exercises/utilities/patterns)
 */

// Import actual data sources to get real counts
import personalWebsiteV2 from '../../projects/personal-website-v2/personal-website-v2';
import geminiCliDemo from '../../projects/gemini-cli-demo/gemini-cli-demo';
import horseRacingTextGame from '../../projects/horse-racing-text-game/horse-racing-text-game';

// Centralized data collections (single source of truth)
export const ALL_PROJECTS = [
  personalWebsiteV2,    // Featured project first
  geminiCliDemo,        // Featured project second
  horseRacingTextGame   // Featured project third
] as const;

// Expected counts (verified from generated JSON files - auto-update these when data changes)
export const EXPECTED_COUNTS = {
  projects: ALL_PROJECTS.length,      // Dynamically calculated: 3
  exercises: 15,                      // From exercises.json (verified 2025-01-27) 
  utilities: 14,                      // From utilities.json (verified 2025-01-27)
  patterns: 27,                       // From patterns.json (verified 2025-01-27)
} as const;

/**
 * Dynamic count verification for runtime testing
 * Use this in tests when you need to verify against actual JSON data
 */
export async function getActualCounts() {
  if (typeof window !== 'undefined') {
    // Browser environment - fetch from public API
    const [exercises, utilities, patterns] = await Promise.all([
      fetch('/exercises.json').then(r => r.json()),
      fetch('/utilities.json').then(r => r.json()),
      fetch('/patterns.json').then(r => r.json()),
    ]);
    
    return {
      projects: ALL_PROJECTS.length,
      exercises: exercises.length,
      utilities: utilities.length,
      patterns: patterns.length,
    };
  } else {
    // Node.js environment - read from file system
    const fs = await import('fs');
    const path = await import('path');
    
    const readJsonFile = (filename: string) => {
      const filePath = path.join(process.cwd(), 'public', filename);
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    };
    
    const exercises = readJsonFile('exercises.json');
    const utilities = readJsonFile('utilities.json');
    const patterns = readJsonFile('patterns.json');
    
    return {
      projects: ALL_PROJECTS.length,
      exercises: exercises.length,
      utilities: utilities.length,
      patterns: patterns.length,
    };
  }
}

// Project data for validation (derived from actual data)
export const EXPECTED_PROJECTS = ALL_PROJECTS.map(project => ({
  title: project.metadata.title,
  description: project.metadata.description,
  category: project.metadata.category,
  featured: project.metadata.featured,
  slug: project.slug
}));

// Sample exercises for validation (subset)
export const SAMPLE_EXERCISES = [
  'Binary Search',
  'Quick Sort', 
  'Merge Sort',
  'Two Sum',
  'Valid Parentheses',
  'Fibonacci Sequence'
] as const;

// Sample utilities for validation (subset)  
export const SAMPLE_UTILITIES = [
  'Debounce',
  'Throttle', 
  'Memoize',
  'DeepClone',
  'IsValidEmail',
  'Slugify'
] as const;

// Page sections and navigation
export const PAGE_SECTIONS = {
  code: {
    exercises: 'Algorithm Exercises',
    utilities: 'Utility Functions'
  },
  projects: {
    title: 'Projects',
    allProjects: 'All Projects'
  }
} as const;

// Common CSS selectors and data attributes
export const SELECTORS = {
  projectCard: '[data-testid*="project"], .card, [class*="card"]',
  exerciseCard: '[data-testid*="exercise"], .card, [class*="card"]', 
  utilityCard: '[data-testid*="utility"], .card, [class*="card"]',
  cardLink: 'a[href*="/code/"], a[href*="/projects/"]',
  navigationLink: 'nav a, header a, [role="navigation"] a'
} as const;
/**
 * Centralized test data collections for E2E testing
 * Source of truth for expected counts and content validation
 * 
 * FUTURE: When new items are added to showcase (projects/exercises/utilities),
 * this central collection automatically reflects the changes for all tests
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

// Dynamically calculated expected counts (auto-updates when data changes)
export const EXPECTED_COUNTS = {
  projects: ALL_PROJECTS.length,      // Dynamically calculated: 3
  exercises: 15,                      // TODO: Import from exercises collection
  utilities: 14,                      // TODO: Import from utilities collection
} as const;

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
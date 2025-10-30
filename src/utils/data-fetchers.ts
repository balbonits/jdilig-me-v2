/**
 * Data fetching utilities for exercises and utilities JSON files
 * Can be used for both client-side fetching and future data operations
 */

import { ExerciseData } from '@/interfaces/exercises';
import { UtilityData } from '@/interfaces/utilities';
import { PatternData } from '@/interfaces/patterns';
import { NoteData } from '@/interfaces/notes';

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
  // Return all implemented design pattern slugs in kebab-case
  return [
    'abstract-factory',
    'adapter', 
    'async-iterator',
    'bridge',
    'builder',
    'chain-of-responsibility',
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
    'proxy-observables',
    'revealing-module',
    'singleton',
    'state',
    'strategy',
    'template-method',
    'visitor'
  ];
}


// =============================================================================
// NOTES DATA FETCHERS
// =============================================================================

/**
 * Fetch notes data from the public JSON file
 * @returns Promise<NoteData[]> Array of note data
 * @throws Error if fetch fails or response is not ok
 */
export async function fetchNotes(): Promise<NoteData[]> {
  const response = await fetch('/notes.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch code notes data from the public JSON file
 * @returns Promise<NoteData[]> Array of code note data
 * @throws Error if fetch fails or response is not ok
 */
export async function fetchCodeNotes(): Promise<NoteData[]> {
  const response = await fetch('/code-notes.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch code notes: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch UI notes data from the public JSON file
 * @returns Promise<NoteData[]> Array of UI note data
 * @throws Error if fetch fails or response is not ok
 */
export async function fetchUINotes(): Promise<NoteData[]> {
  const response = await fetch('/ui-notes.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch UI notes: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Find a specific note by slug
 * @param slug The note slug to find
 * @returns Promise<NoteData | undefined> The note if found
 */
export async function fetchNoteBySlug(slug: string): Promise<NoteData | undefined> {
  const notes = await fetchNotes();
  return notes.find(note => note.slug === slug);
}

/**
 * Load notes data from the file system (for SSG/SSR)
 * @returns Promise<NoteData[]> Array of note data
 */
export async function loadNotesData(): Promise<NoteData[]> {
  if (typeof window !== 'undefined') {
    // Client-side fallback to fetch
    return fetchNotes();
  }

  // Server-side: load from file system
  try {
    const fs = await import('fs');
    const path = await import('path');
    const notesPath = path.join(process.cwd(), 'public', 'notes.json');
    const notesJson = fs.readFileSync(notesPath, 'utf-8');
    return JSON.parse(notesJson);
  } catch (error) {
    console.warn('Could not load notes.json:', error);
    return [];
  }
}

/**
 * Load code notes data from the file system (for SSG/SSR)
 * @returns Promise<NoteData[]> Array of code note data
 */
export async function loadCodeNotesData(): Promise<NoteData[]> {
  if (typeof window !== 'undefined') {
    // Client-side fallback to fetch
    return fetchCodeNotes();
  }

  // Server-side: load from file system
  try {
    const fs = await import('fs');
    const path = await import('path');
    const notesPath = path.join(process.cwd(), 'public', 'code-notes.json');
    const notesJson = fs.readFileSync(notesPath, 'utf-8');
    return JSON.parse(notesJson);
  } catch (error) {
    console.warn('Could not load code-notes.json:', error);
    return [];
  }
}

/**
 * Load UI notes data from the file system (for SSG/SSR)
 * @returns Promise<NoteData[]> Array of UI note data
 */
export async function loadUINotesData(): Promise<NoteData[]> {
  if (typeof window !== 'undefined') {
    // Client-side fallback to fetch
    return fetchUINotes();
  }

  // Server-side: load from file system
  try {
    const fs = await import('fs');
    const path = await import('path');
    const notesPath = path.join(process.cwd(), 'public', 'ui-notes.json');
    const notesJson = fs.readFileSync(notesPath, 'utf-8');
    return JSON.parse(notesJson);
  } catch (error) {
    console.warn('Could not load ui-notes.json:', error);
    return [];
  }
}

/**
 * Load note by slug from the file system (for SSG/SSR)
 * @param slug The note slug to find
 * @returns Promise<NoteData | undefined> The note if found
 */
export async function loadNoteBySlug(slug: string): Promise<NoteData | undefined> {
  const notes = await loadNotesData();
  return notes.find(note => note.slug === slug);
}

/**
 * Get all note slugs for static generation
 * @returns string[] Array of note slugs
 */
export function getAllNoteSlugs(): string[] {
  // Return all implemented note slugs in kebab-case
  return [
    // Code notes
    'css-interview-cheat-sheet',
    'javascript-interview-cheat-sheet',
    'react-interview-cheat-sheet',
    'state-management-cheat-sheet',
    'git-cheat-sheet',
    'agile-methodologies-cheat-sheet',
    // UI notes (CSS fundamentals)
    'css-box-model',
    'css-methodologies',
    'css-display-position',
    'css-background',
    'css-animations-transitions',
    'css-variables-mixins',
    // UI component notes
    'button',
    'card',
    'modal',
    'toggle-switch'
  ];
}

/**
 * Get code note slugs for static generation
 * @returns string[] Array of code note slugs
 */
export function getCodeNoteSlugs(): string[] {
  return [
    'css-interview-cheat-sheet',
    'javascript-interview-cheat-sheet',
    'react-interview-cheat-sheet',
    'state-management-cheat-sheet',
    'git-cheat-sheet',
    'agile-methodologies-cheat-sheet'
  ];
}

/**
 * Get UI note slugs for static generation
 * @returns string[] Array of UI note slugs
 */
export function getUINoteSlugs(): string[] {
  return [
    // CSS fundamentals
    'css-box-model',
    'css-methodologies',
    'css-display-position',
    'css-background',
    'css-animations-transitions',
    'css-variables-mixins',
    // UI components
    'button',
    'card',
    'modal',
    'toggle-switch'
  ];
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

/**
 * Fetch all code data including notes
 * @returns Promise with exercises, utilities, patterns, and notes
 */
export async function fetchAllCodeDataWithNotes(): Promise<{
  exercises: ExerciseData[];
  utilities: UtilityData[];
  patterns: PatternData[];
  notes: NoteData[];
}> {
  const [exercises, utilities, patterns, notes] = await Promise.all([
    fetchExercises(),
    fetchUtilities(),
    fetchPatterns(),
    fetchNotes()
  ]);
  
  return { exercises, utilities, patterns, notes };
}

/**
 * Data fetching utilities for exercises and utilities JSON files
 * Can be used for both client-side fetching and future data operations
 */

import { ExerciseData } from '@/interfaces/exercises';
import { UtilityData } from '@/interfaces/utilities';

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

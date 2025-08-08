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

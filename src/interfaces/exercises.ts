// Exercise-specific types and interfaces
// This file imports shared types and defines exercise-specific structures

import type { 
  BaseMetadata, 
  SolutionMetadata, 
  Solution, 
  ExerciseInput, 
  ExerciseOutput 
} from './shared';

// =============================================================================
// EXERCISE-SPECIFIC INTERFACES
// =============================================================================

// Exercise example interface - specific input/output structure
export interface ExampleCase {
  input: ExerciseInput;
  output: ExerciseOutput;
  description: string;
}

// Exercise-specific metadata (currently identical to BaseMetadata)
export type ExerciseMetadata = BaseMetadata;

// Exercise data container
export interface ExerciseData {
  name: string;
  slug: string;
  metadata: ExerciseMetadata;
  examples: ExampleCase[];
  code: string;
  functions: string[];
  solutions: Solution[];
  solutionMetadata?: SolutionMetadata[];
}

// Re-export shared types that exercises commonly use
export type { 
  DifficultyLevel, 
  SolutionType, 
  SolutionMetadata,
  Solution,
  ExerciseInput,
  ExerciseOutput 
} from './shared';

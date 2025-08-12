// Exercise-specific types and interfaces
// This file imports shared types and defines exercise-specific structures

import type { 
  BaseMetadata, 
  Showcase,
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

// Exercise data container extends showcase interface
export type ExerciseData = Showcase<ExerciseMetadata, ExampleCase>;

// Re-export shared types that exercises commonly use
export type { 
  DifficultyLevel, 
  SolutionType, 
  SolutionMetadata,
  Solution,
  Showcase,
  ExerciseInput,
  ExerciseOutput 
} from './shared';

// Common input/output types for exercises
export type ExerciseInput = 
  | string 
  | number 
  | boolean 
  | string[] 
  | number[] 
  | (string | number)[] // Mixed arrays for deduplication exercises
  | [string, string] 
  | [number[], number]
  | [number[] | null, number] // Support null arrays in tuple inputs
  | { operations: (string | number)[][] } // For complex data structures with mixed types
  | null;

export type ExerciseOutput = 
  | string 
  | number 
  | boolean 
  | number[] 
  | string[] 
  | (string | number)[] // Mixed output arrays
  | (number | null)[] // Arrays with null values (for LRU cache outputs)
  | Error
  | Record<string, unknown> // For Error objects serialized as plain objects
  | null;

export interface ExampleCase {
  input: ExerciseInput;
  output: ExerciseOutput;
  description: string;
}

export interface ExerciseMetadata {
  title: string;
  description: string;
  concepts: string[];
  timeComplexity: string;
  spaceComplexity: string;
}

export interface Solution {
  name: string;
  code: string;
  approach: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  isOptimal?: boolean;
}

export interface ExerciseData {
  name: string;
  slug: string;
  metadata: ExerciseMetadata;
  examples: ExampleCase[];
  code: string;
  functions: string[];
  solutions: Solution[];
}
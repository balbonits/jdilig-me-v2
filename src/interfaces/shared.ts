// Shared types and interfaces used across exercises and utilities
// This file serves as the single source of truth for common data structures

// =============================================================================
// CORE DATA TYPES
// =============================================================================

// Unified input/output type system for exercises and utilities
// This consolidates all possible data types used across the codebase
export type DataValue = 
  | string 
  | number 
  | boolean 
  | null
  | Error
  | Record<string, unknown>; // For serialized Error objects

export type DataArray = 
  | string[] 
  | number[] 
  | boolean[]
  | (string | number)[]     // Mixed arrays for deduplication exercises
  | (number | null)[];      // Arrays with null values (for LRU cache outputs)

export type DataTuple = 
  | [string, string] 
  | [number[], number]
  | [number[] | null, number]; // Support null arrays in tuple inputs

export type DataStructure = 
  | { operations: (string | number)[][] }; // For complex data structures with mixed types

// =============================================================================
// INPUT/OUTPUT TYPES
// =============================================================================

// Common input types for exercises and utilities
export type ExerciseInput = 
  | DataValue
  | DataArray 
  | DataTuple
  | DataStructure;

export type ExerciseOutput = 
  | DataValue
  | DataArray;

// Utility types extend exercise types with function and event support
export type UtilityInput = 
  | ExerciseInput
  | ((...args: unknown[]) => unknown)    // Function type for utilities like debounce
  | Event;      // Utilities can handle DOM events

export type UtilityOutput = 
  | ExerciseOutput
  | ((...args: unknown[]) => unknown)    // Function type for returned functions
  | void;

// =============================================================================
// CLASSIFICATION ENUMS
// =============================================================================

export type DifficultyLevel = 
  | 'Beginner'    // Basic programming concepts, simple algorithms
  | 'Easy'        // Common patterns, straightforward implementation
  | 'Medium'      // Requires some algorithmic thinking, multiple approaches
  | 'Hard'        // Complex algorithms, optimization challenges
  | 'Expert';     // Advanced data structures, sophisticated algorithms

export type SolutionType = 
  | 'function'    // Regular function implementation
  | 'class'       // Class-based solution (LRUCache, Trie, etc.)
  | 'method'      // Method within a class
  | 'constant'    // Arrow function or const declaration
  | 'utility';    // Utility function or helper

// Additional shared literal types
export type APIVersion = 'v1' | 'v2' | 'v3';

// =============================================================================
// CORE SHARED INTERFACES
// =============================================================================

// Base metadata interface with common fields
export interface BaseMetadata {
  title: string;
  description: string;
  concepts: string[];
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: DifficultyLevel;
}

// Solution metadata interface for both exercises and utilities
export interface SolutionMetadata {
  name: string;
  tabName: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  isOptimal: boolean;
  type: SolutionType;
}

// Solution interface with code
export interface Solution {
  name: string;
  tabName: string;
  code: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  isOptimal: boolean;
  type: SolutionType;
}

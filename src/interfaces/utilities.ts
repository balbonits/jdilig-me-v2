// Utility-specific types and interfaces
// This file imports shared types and defines utility-specific structures

import type { 
  BaseMetadata, 
  SolutionMetadata, 
  Solution, 
  UtilityInput, 
  UtilityOutput 
} from './shared';

// =============================================================================
// UTILITY-SPECIFIC INTERFACES
// =============================================================================

// Utility-specific metadata extends base metadata  
export interface UtilityMetadata extends BaseMetadata {
  category: string; // Additional field for utilities
}

// Utility example extends the base pattern but with optional input/output
export interface UtilityExample {
  input?: UtilityInput;
  output?: UtilityOutput;
  description: string;
  code: string;
}

// Utility data container
export interface UtilityData {
  name: string;
  slug: string;
  metadata: UtilityMetadata;
  examples: UtilityExample[];
  code: string;
  functions: string[];
  solutions: Solution[];
  solutionMetadata?: SolutionMetadata[];
}

// Re-export shared types that utilities commonly use
export type { 
  DifficultyLevel, 
  SolutionType, 
  SolutionMetadata,
  Solution,
  UtilityInput,
  UtilityOutput 
} from './shared';
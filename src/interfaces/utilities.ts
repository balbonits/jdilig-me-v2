// Utility-specific types and interfaces
// This file imports shared types and defines utility-specific structures

import type { 
  BaseMetadata, 
  Showcase,
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

// Utility data container extends showcase interface
export type UtilityData = Showcase<UtilityMetadata, UtilityExample>;

// Re-export shared types that utilities commonly use
export type { 
  DifficultyLevel, 
  SolutionType, 
  SolutionMetadata,
  Solution,
  Showcase,
  UtilityInput,
  UtilityOutput 
} from './shared';
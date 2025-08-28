// Design Pattern-specific types and interfaces
// This file imports shared types and defines pattern-specific structures

import type { 
  BaseMetadata, 
  Showcase,
  ExerciseInput, 
  ExerciseOutput 
} from './shared';

// =============================================================================
// DESIGN PATTERN-SPECIFIC TYPES
// =============================================================================

// Design pattern categories following Gang of Four classification
export type PatternCategory = 
  | 'Creational'    // Object creation patterns
  | 'Structural'    // Object composition patterns
  | 'Behavioral'    // Object interaction patterns
  | 'Modern';       // Modern JavaScript/TypeScript patterns

// Use case types for pattern applications
export enum PatternUseCase {
  // Core Development
  STATE_MANAGEMENT = 'State Management',
  CODE_ORGANIZATION = 'Code Organization', 
  API_DESIGN = 'API Design',
  DATA_PROCESSING = 'Data Processing',
  
  // Architecture & Design
  UI_ARCHITECTURE = 'UI Architecture',
  SYSTEM_INTEGRATION = 'System Integration',
  FRAMEWORK_DEVELOPMENT = 'Framework Development',
  LIBRARY_DEVELOPMENT = 'Library Development',
  
  // Performance & Optimization
  PERFORMANCE_OPTIMIZATION = 'Performance Optimization',
  MEMORY_MANAGEMENT = 'Memory Management',
  STREAM_PROCESSING = 'Stream Processing',
  
  // Specialized Applications
  GAME_DEVELOPMENT = 'Game Development',
  COMPILER_DESIGN = 'Compiler Design',
  ERROR_HANDLING = 'Error Handling',
  EVENT_HANDLING = 'Event Handling',
  
  // Modern Development
  CROSS_PLATFORM_SUPPORT = 'Cross-Platform Support',
  REACTIVE_SYSTEMS = 'Reactive Systems',
  DATA_BINDING = 'Data Binding',
  COLLECTION_TRAVERSAL = 'Collection Traversal',
  
  // Enterprise Patterns
  REQUEST_PROCESSING = 'Request Processing',
  MIDDLEWARE_SYSTEMS = 'Middleware Systems',
  TRANSACTION_PROCESSING = 'Transaction Processing',
  DATA_BACKUP = 'Data Backup',
  
  // Advanced Concepts
  CROSS_CUTTING_CONCERNS = 'Cross-Cutting Concerns',
  ALGORITHM_IMPLEMENTATION = 'Algorithm Implementation',
  CODE_ANALYSIS = 'Code Analysis',
  API_INTEGRATION = 'API Integration'
}

// =============================================================================
// PATTERN-SPECIFIC INTERFACES
// =============================================================================

// Pattern example interface - demonstrates practical usage
export interface PatternExample {
  input: ExerciseInput;
  output: ExerciseOutput;
  description: string;
  scenario: string;          // Real-world scenario where this pattern applies
}

// Pattern metadata extends base with pattern-specific fields
export interface PatternMetadata extends BaseMetadata {
  category: PatternCategory;
  useCases: PatternUseCase[];
  realWorldApplications: string[];    // Practical applications in modern development
  relatedPatterns?: string[];         // Other patterns commonly used together
  modernAlternatives?: string[];      // Modern alternatives (e.g., React hooks vs Observer)
  frameworkSupport?: string[];        // Frameworks that implement this pattern
}

// Pattern data container extends showcase interface
export type PatternData = Showcase<PatternMetadata, PatternExample>;

// Re-export shared types that patterns commonly use
export type { 
  DifficultyLevel, 
  SolutionType, 
  SolutionMetadata,
  Solution,
  Showcase,
  ExerciseInput,
  ExerciseOutput 
} from './shared';
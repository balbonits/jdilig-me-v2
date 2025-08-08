// TypeScript Advanced Types Examples
// This file demonstrates various TypeScript type constructs for educational purposes

import type { BaseMetadata, ExerciseInput, APIVersion } from './shared';

// =============================================================================
// TYPESCRIPT ADVANCED TYPE EXAMPLES
// =============================================================================

// 1. ENUMS - Named constants (can be string or numeric)
export enum ExerciseCategory {
  ALGORITHMS = 'algorithms',
  DATA_STRUCTURES = 'data-structures', 
  STRING_MANIPULATION = 'string-manipulation',
  ARRAY_OPERATIONS = 'array-operations',
  DYNAMIC_PROGRAMMING = 'dynamic-programming'
}

export enum ComplexityRating {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  EXTREME = 4
}

// 2. TUPLES - Fixed-length arrays with specific types at each position
export type CodePosition = [number, number]; // [line, column]
export type TestResult = [boolean, string, number]; // [passed, message, executionTime]
export type BenchmarkData = [string, number, number]; // [testName, timeMs, memoryMB]

// 3. INTERSECTION TYPES - Combine multiple types with &
export type TimestampedData = ExerciseInput & { timestamp: number };
export type AuditableMetadata = BaseMetadata & { 
  createdAt: Date;
  updatedAt: Date;
  version: string;
};

// 4. LITERAL TYPES - Specific string/number values
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

// 5. TEMPLATE LITERAL TYPES - String manipulation at type level
export type ExerciseSlug<T extends string> = `exercise-${T}`;
export type APIEndpoint<T extends string> = `/api/${APIVersion}/${T}`;
export type EventName<T extends string> = `on${Capitalize<T>}`;

// 6. MAPPED TYPES - Transform existing object types
export type ReadonlyMetadata = {
  readonly [K in keyof BaseMetadata]: BaseMetadata[K];
};

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 7. CONDITIONAL TYPES - Types based on conditions
export type NonNullable<T> = T extends null | undefined ? never : T;
export type ArrayElement<T> = T extends (infer U)[] ? U : never;
export type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : unknown;

// 8. UTILITY TYPES - Built-in TypeScript utilities
export type PickRequired<T, K extends keyof T> = Pick<T, K> & Required<Pick<T, K>>;

// 9. DISCRIMINATED UNIONS - Union types with a common discriminator field
export type APIResponse<T = unknown> = 
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: string };

export type ExerciseResult = 
  | { type: 'success'; output: ExerciseInput; executionTime: number }
  | { type: 'error'; message: string; line?: number }
  | { type: 'timeout'; duration: number };

// 10. RECURSIVE TYPES - Types that reference themselves
export type NestedArray<T> = T | NestedArray<T>[];
export type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

// 11. BRANDED TYPES - Add nominal typing to primitives
export type ExerciseId = string & { __brand: 'ExerciseId' };
export type UserId = string & { __brand: 'UserId' };
export type Score = number & { __brand: 'Score'; __min: 0; __max: 100 };

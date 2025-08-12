import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * Curry Utility Implementation
 * 
 * DESCRIPTION:
 * Transforms a function to enable partial application by converting a function
 * that takes multiple arguments into a sequence of functions that each take a single argument.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Medium (functional programming concepts)
 * - Solution Type: function (higher-order function implementation)
 * - Time Complexity: O(1) per curried call
 * - Space Complexity: O(n) where n is the number of arguments
 * - Concepts: Closures, Higher-order functions, Functional programming, Partial application
 * - Category: Functional programming utility
 * 
 * EXAMPLE:
 * curry(add)(1)(2) → 3 (where add = (a, b) => a + b)
 * 
 * CONCEPTS:
 * - Closures and lexical scoping
 * - Higher-order functions
 * - Functional programming paradigms
 * - Partial application
 * - Function composition
 * 
 * PERFORMANCE:
 * - Time: O(1) per curried call
 * - Space: O(n) where n is the number of arguments accumulated
 * 
 * Multiple implementations included to show different approaches.
 */

// Basic curry implementation
export function curry<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const arity = fn.length;
  
  function curried(...args: unknown[]): unknown {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...nextArgs: unknown[]) => curried(...args, ...nextArgs);
  }
  
  return curried as T;
}

// Auto-curry with flexible arity
export function autoCurry<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const arity = fn.length;
  
  function curried(...args: unknown[]): unknown {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...nextArgs: unknown[]) => curried(...args, ...nextArgs);
  }
  
  return curried as T;
}

// Simple curry for binary functions
export function curry2<A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R {
  return (a: A) => (b: B) => fn(a, b);
}

// Simple curry for ternary functions
export function curry3<A, B, C, R>(fn: (a: A, b: B, c: C) => R): (a: A) => (b: B) => (c: C) => R {
  return (a: A) => (b: B) => (c: C) => fn(a, b, c);
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "Curry Function",
  description: "Transforms functions to enable partial application, converting multi-argument functions into sequences of single-argument functions",
  category: "Functional Programming",
  concepts: ["closures", "higher-order functions", "functional programming", "partial application"],
  timeComplexity: "O(1) per curried call",
  spaceComplexity: "O(n) where n is argument count",
  difficulty: "Medium"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "curry",
    tabName: "Basic",
    approach: "TypeScript-safe curry with automatic arity detection",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "autoCurry",
    tabName: "Auto",
    approach: "Flexible curry that handles any arity automatically",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "curry2",
    tabName: "Binary",
    approach: "Simple curry for two-argument functions",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "curry3",
    tabName: "Ternary",
    approach: "Simple curry for three-argument functions",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "add(1, 2)",
    output: "3",
    description: "Basic function currying",
    code: `const add = (a: number, b: number) => a + b;
const curriedAdd = curry(add);

// All equivalent calls:
curriedAdd(1)(2);        // 3
curriedAdd(1, 2);        // 3

// Partial application:
const addOne = curriedAdd(1);
addOne(2);               // 3`
  },
  {
    input: "multiply(2, 3, 4)",
    output: "24",
    description: "Multi-argument function currying",
    code: `const multiply = (a: number, b: number, c: number) => a * b * c;
const curriedMultiply = autoCurry(multiply);

// Flexible partial application:
const double = curriedMultiply(2);
const doubleTriple = double(3);
doubleTriple(4);         // 24

// Or all at once:
curriedMultiply(2)(3)(4); // 24`
  },
  {
    input: "map(double, [1,2,3])",
    output: "[2,4,6]",
    description: "Functional programming patterns",
    code: `const map = <T, U>(fn: (item: T) => U, array: T[]) => array.map(fn);
const curriedMap = curry2(map);

const double = (x: number) => x * 2;
const mapDouble = curriedMap(double);

mapDouble([1, 2, 3]);    // [2, 4, 6]
mapDouble([4, 5, 6]);    // [8, 10, 12]

// Compose with other functions:
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(x => x % 2 === 0)
  .map(double);            // Uses curried function`
  }
];

// Default export for easy importing
const utilityModule = {
  curry,
  autoCurry,
  curry2,
  curry3,
  metadata,
  solutions,
  examples
};

export default utilityModule;
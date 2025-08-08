import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * Factorial Calculator Exercise Implementation
 * 
 * DESCRIPTION:
 * Computes factorial of a non-negative integer.
 * 
 * EXAMPLE:
 * 5 → 120
 * 
 * CONCEPTS:
 * - Recursion or iteration
 * - Validation
 * 
 * PERFORMANCE:
 * - Time: O(n)
 * - Space: O(n) recursive, O(1) iterative
 * 
 * Multiple implementations included to show different approaches.
 */

export function factorial(n: number): number {
  if (!Number.isInteger(n)) throw new Error("Input must be an integer");
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

export function factorialIterative(n: number): number {
  if (!Number.isInteger(n)) throw new Error("Input must be an integer");
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export const metadata: ExerciseMetadata = {
  title: "Factorial Calculator",
  description: "Computes the factorial of a non-negative integer",
  concepts: ["recursion", "iteration", "input validation", "mathematics"],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n) for recursive, O(1) for iterative",
  difficulty: "Beginner"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "factorial",
    tabName: "Recursive",
    approach: "Recursive factorial calculation",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "factorialIterative",
    tabName: "Iterative",
    approach: "Iterative factorial calculation",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: 5, output: 120, description: "Factorial of 5" },
  { input: 0, output: 1, description: "Factorial of 0" },
  { input: 1, output: 1, description: "Factorial of 1" },
  { input: 3, output: 6, description: "Factorial of 3" },
  { input: -1, output: new Error("Factorial is not defined for negative numbers"), description: "Negative error" },
  { input: 2.5, output: new Error("Input must be an integer"), description: "Non-integer error" }
];

const exerciseModule = { factorial, factorialIterative, metadata, solutions, examples };
export default exerciseModule;
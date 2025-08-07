import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Fibonacci Sequence Exercise Implementation
 * 
 * DESCRIPTION:
 * Generates the first n numbers in the Fibonacci sequence.
 * 
 * EXAMPLE:
 * 7 → [0, 1, 1, 2, 3, 5, 8]
 * 
 * CONCEPTS:
 * - Iteration or recursion
 * - Memoization
 * 
 * PERFORMANCE:
 * - Time: O(n)
 * - Space: O(n)
 * 
 * Multiple implementations included to show different approaches.
 */

export function FibonacciSeq(count: number): number[] {
  if (!Number.isInteger(count)) throw new Error("Input must be an integer");
  if (count < 0) throw new Error("Input must be non-negative");
  if (count === 0) return [];
  if (count === 1) return [0];
  if (count === 2) return [0, 1];

  const fibSeq: number[] = [0, 1];
  for (let i = 2; i < count; i++) fibSeq[i] = fibSeq[i - 1] + fibSeq[i - 2];
  return fibSeq;
}

export function FibonacciSeqMemoized(count: number): number[] {
  if (!Number.isInteger(count)) throw new Error("Input must be an integer");
  if (count < 0) throw new Error("Input must be non-negative");
  if (count === 0) return [];

  const memo: { [key: number]: number } = { 0: 0, 1: 1 };
  const fib = (n: number): number => {
    if (n in memo) return memo[n];
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
  };
  
  const result: number[] = [];
  for (let i = 0; i < count; i++) result.push(fib(i));
  return result;
}

export const metadata: ExerciseMetadata = {
  title: "Fibonacci Sequence",
  description: "Generates the first n numbers in the Fibonacci sequence",
  concepts: ["iteration", "recursion", "memoization", "array manipulation"],
  timeComplexity: "O(n) for iterative/memoized",
  spaceComplexity: "O(n)"
};

export const examples: ExampleCase[] = [
  { input: 7, output: [0, 1, 1, 2, 3, 5, 8], description: "n=7" },
  { input: 0, output: [], description: "n=0" },
  { input: 1, output: [0], description: "n=1" },
  { input: 2, output: [0, 1], description: "n=2" },
  { input: -1, output: new Error("Input must be non-negative"), description: "Negative error" },
  { input: 3.5, output: new Error("Input must be an integer"), description: "Non-integer error" }
];

export default { FibonacciSeq, FibonacciSeqMemoized, metadata, examples };
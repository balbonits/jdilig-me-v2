import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🌀 Fibonacci Sequence - Nature's Mathematical Pattern
 * 
 * DESCRIPTION:
 * 🔢 **The Golden Sequence**
 * The Fibonacci sequence is one of nature's most beautiful mathematical patterns! Starting with 0 and 1, each subsequent number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13...
 * 
 * 🌿 **Found Everywhere in Nature:**
 * • Spiral patterns in sunflower seeds and pinecones
 * • Branch arrangements in trees and leaf patterns
 * • Shell spirals and galaxy formations
 * • Proportions in art and architecture (Golden Ratio)
 * 
 * 🧮 **How the Generation Works:**
 * • Start with base cases: F(0) = 0, F(1) = 1
 * • For n ≥ 2: F(n) = F(n-1) + F(n-2)
 * • Build sequence iteratively for optimal performance
 * • Use memoization to optimize recursive approaches
 * 
 * ⚡ **Two Efficient Approaches:**
 * • **Iterative Method:** Linear time with simple loop construction
 * • **Memoized Recursive:** Elegant recursion with caching optimization
 * 
 * 💡 **Learning & Interview Value:**
 * • Classic dynamic programming introduction
 * • Demonstrates iteration vs recursion trade-offs
 * • Foundation for understanding optimization techniques
 * • Common technical interview warm-up question
 * 
 * 🚀 **Real-World Applications:**
 * • Computer graphics and spiral generation
 * • Financial modeling and market analysis
 * • Algorithm optimization and performance testing
 * • Mathematical research and golden ratio calculations
 * 
 * PERFORMANCE:
 * - Time: O(n) - linear sequence generation
 * - Space: O(n) - storing the complete sequence
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
  detailedDescription: "🌀 **Nature's Mathematical Pattern**\nThe Fibonacci sequence is one of nature's most beautiful mathematical patterns! Starting with 0 and 1, each subsequent number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13...\n\n🌿 **Found Everywhere in Nature:**\n• Spiral patterns in sunflower seeds and pinecones\n• Branch arrangements in trees and leaf patterns\n• Shell spirals and galaxy formations\n• Proportions in art and architecture (Golden Ratio)\n\n🧮 **How the Generation Works:**\n• Start with base cases: F(0) = 0, F(1) = 1\n• For n ≥ 2: F(n) = F(n-1) + F(n-2)\n• Build sequence iteratively for optimal performance\n• Use memoization to optimize recursive approaches\n\n⚡ **Two Efficient Approaches:**\n• **Iterative Method:** Linear time with simple loop construction\n• **Memoized Recursive:** Elegant recursion with caching optimization\n\n💡 **Learning & Interview Value:**\n• Classic dynamic programming introduction\n• Demonstrates iteration vs recursion trade-offs\n• Foundation for understanding optimization techniques\n• Common technical interview warm-up question\n\n🚀 **Real-World Applications:**\n• Computer graphics and spiral generation\n• Financial modeling and market analysis\n• Algorithm optimization and performance testing\n• Mathematical research and golden ratio calculations",
  concepts: ["iteration", "recursion", "memoization", "array manipulation"],
  timeComplexity: "O(n) for iterative/memoized",
  spaceComplexity: "O(n)",
  difficulty: "Easy"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "FibonacciSeq",
    tabName: "Iterative",
    approach: "Iterative sequence generation",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "FibonacciSeqMemoized",
    tabName: "Memoized",
    approach: "Recursive with memoization",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: 7, output: [0, 1, 1, 2, 3, 5, 8], description: "n=7" },
  { input: 0, output: [], description: "n=0" },
  { input: 1, output: [0], description: "n=1" },
  { input: 2, output: [0, 1], description: "n=2" },
  { input: -1, output: new Error("Input must be non-negative"), description: "Negative error" },
  { input: 3.5, output: new Error("Input must be an integer"), description: "Non-integer error" }
];

const exerciseModule = { FibonacciSeq, FibonacciSeqMemoized, metadata, solutions, examples };
export default exerciseModule;
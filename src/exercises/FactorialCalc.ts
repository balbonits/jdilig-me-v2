import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🧮 Factorial Calculator - Mathematical Foundation Building
 * 
 * DESCRIPTION:
 * 📐 **The Mathematical Building Block**
 * Factorial computation is a cornerstone of combinatorics, probability, and algorithmic thinking! Calculate n! (n factorial) which represents the number of ways to arrange n distinct objects.
 * 
 * 🔢 **The Mathematical Concept:**
 * • **Definition:** n! = n × (n-1) × (n-2) × ... × 1
 * • **Base Cases:** 0! = 1, 1! = 1 (mathematical convention)
 * • **Growth Rate:** Extremely fast - 10! = 3.6 million, 20! = 2.4 quintillion!
 * • **Edge Cases:** Only defined for non-negative integers
 * 
 * ⚡ **Two Classic Approaches:**
 * • **Recursive:** Elegant mathematical definition, n × factorial(n-1)
 * • **Iterative:** Space-efficient loop, better for large values
 * 
 * 🚀 **Real-World Applications:**
 * • **Combinatorics:** Permutations, arrangements, and ordering problems
 * • **Probability:** Calculating possible outcomes in statistics
 * • **Algorithms:** Dynamic programming and memoization examples
 * • **Cryptography:** Key generation and mathematical security proofs
 * 
 * 💡 **Learning Value:**
 * • Recursion vs iteration trade-offs (space vs readability)
 * • Input validation and edge case handling
 * • Mathematical algorithm implementation
 * • Stack overflow risks with deep recursion
 * 
 * PERFORMANCE:
 * - Time: O(n) - must multiply n numbers
 * - Space: O(n) recursive call stack, O(1) iterative approach
 * 
 * Multiple implementations included to show recursion vs iteration trade-offs.
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
  detailedDescription: "📐 **The Mathematical Building Block**\nFactorial computation is a cornerstone of combinatorics, probability, and algorithmic thinking! Calculate n! (n factorial) which represents the number of ways to arrange n distinct objects.\n\n🔢 **The Mathematical Concept:**\n• **Definition:** n! = n × (n-1) × (n-2) × ... × 1\n• **Base Cases:** 0! = 1, 1! = 1 (mathematical convention)\n• **Growth Rate:** Extremely fast - 10! = 3.6 million, 20! = 2.4 quintillion!\n• **Edge Cases:** Only defined for non-negative integers\n\n⚡ **Two Classic Approaches:**\n• **Recursive:** Elegant mathematical definition, n × factorial(n-1)\n• **Iterative:** Space-efficient loop, better for large values\n\n🚀 **Real-World Applications:**\n• **Combinatorics:** Permutations, arrangements, and ordering problems\n• **Probability:** Calculating possible outcomes in statistics\n• **Algorithms:** Dynamic programming and memoization examples\n• **Cryptography:** Key generation and mathematical security proofs\n\n💡 **Learning Value:**\n• Recursion vs iteration trade-offs (space vs readability)\n• Input validation and edge case handling\n• Mathematical algorithm implementation\n• Stack overflow risks with deep recursion",
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
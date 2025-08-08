import type { 
  ExerciseMetadata, 
  ExampleCase, 
  SolutionMetadata
} from "@/interfaces/exercises";

/**
 * FizzBuzz Exercise Implementation
 * 
 * DESCRIPTION:
 * Count from 1 to n, replacing multiples of 3 with "Fizz", 5 with "Buzz", both with "FizzBuzz".
 * 
 * EXAMPLE (n=15):
 * ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]
 * 
 * CONCEPTS:
 * - Loops and conditionals
 * - Modulo operator
 * 
 * PERFORMANCE:
 * - Time: O(n)
 * - Space: O(n)
 * 
 * Multiple implementations included to show different approaches.
 */

export function fizzBuzz(n: number): string[] {
  if (!Number.isInteger(n) || n < 1) throw new Error("Input must be a positive integer");
  const result: string[] = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i.toString());
  }
  return result;
}

export function fizzBuzzConcat(n: number): string[] {
  if (!Number.isInteger(n) || n < 1) throw new Error("Input must be a positive integer");
  const result: string[] = [];
  for (let i = 1; i <= n; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    result.push(output || i.toString());
  }
  return result;
}

export const fizzBuzzOneLiner = (n: number): string[] => {
  if (!Number.isInteger(n) || n < 1) throw new Error("Input must be a positive integer");
  return Array.from({ length: n }, (_, i) => {
    const num = i + 1;
    return (num % 3 === 0 ? "Fizz" : "") + (num % 5 === 0 ? "Buzz" : "") || num.toString();
  });
};

export const metadata: ExerciseMetadata = {
  title: "FizzBuzz",
  description: "Print numbers 1 to n, replacing multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both with 'FizzBuzz'.",
  concepts: ["Loops", "Conditionals", "Modular Arithmetic"],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  difficulty: "Beginner"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "fizzBuzz",
    tabName: "Standard",
    approach: "If-else chain with modulo",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "fizzBuzzConcat",
    tabName: "Concat",
    approach: "String concatenation",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "fizzBuzzOneLiner",
    tabName: "One-liner",
    approach: "Array.from with ternary",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "constant"
  }
];

export const examples: ExampleCase[] = [
  { input: 15, output: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], description: "Classic FizzBuzz up to 15" },
  { input: 5, output: ["1", "2", "Fizz", "4", "Buzz"], description: "Small example" },
  { input: 0, output: new Error("Input must be a positive integer"), description: "Invalid input" }
];

const exerciseModule = { fizzBuzz, fizzBuzzConcat, fizzBuzzOneLiner, metadata, solutions, examples };
export default exerciseModule;
import type { 
  ExerciseMetadata, 
  ExampleCase, 
  SolutionMetadata
} from "@/interfaces/exercises";

/**
 * 🎲 FizzBuzz - The Classic Programming Interview Challenge
 * 
 * DESCRIPTION:
 * 🎯 **The Ultimate Pattern Recognition Test**
 * FizzBuzz is the quintessential programming interview question that tests your ability to handle multiple conditions elegantly. Count from 1 to n, but with a twist - numbers divisible by specific values get replaced with words!
 * 
 * 🧠 **The Logic Challenge:**
 * • **Divisible by 3:** Replace with "Fizz" 
 * • **Divisible by 5:** Replace with "Buzz"
 * • **Divisible by both:** Replace with "FizzBuzz" (order matters!)
 * • **Everything else:** Keep the original number as string
 * 
 * ⚡ **Three Implementation Strategies:**
 * • **Standard If-Else:** Clear, readable, checks 15 first for efficiency
 * • **String Concatenation:** Elegant approach that builds the result dynamically
 * • **Functional One-Liner:** Array.from + ternary operators for concise code
 * 
 * 🚀 **Real-World Applications:**
 * • **Rule Engines:** Business logic with multiple conditional branches
 * • **Data Transformation:** Converting numeric data based on business rules
 * • **Game Logic:** Implementing scoring systems with special conditions
 * • **Report Generation:** Formatting data with conditional text replacement
 * 
 * 💡 **Learning Value:**
 * • Conditional logic and operator precedence
 * • Modulo arithmetic for divisibility testing
 * • String vs numeric data handling
 * • Code clarity vs cleverness trade-offs
 * 
 * PERFORMANCE:
 * - Time: O(n) - must process each number once
 * - Space: O(n) - output array grows with input size
 * 
 * Multiple implementations included to show different approaches and trade-offs.
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
  detailedDescription: "🎯 **The Ultimate Pattern Recognition Test**\nFizzBuzz is the quintessential programming interview question that tests your ability to handle multiple conditions elegantly. Count from 1 to n, but with a twist - numbers divisible by specific values get replaced with words!\n\n🧠 **The Logic Challenge:**\n• **Divisible by 3:** Replace with \"Fizz\"\n• **Divisible by 5:** Replace with \"Buzz\"\n• **Divisible by both:** Replace with \"FizzBuzz\" (order matters!)\n• **Everything else:** Keep the original number as string\n\n⚡ **Three Implementation Strategies:**\n• **Standard If-Else:** Clear, readable, checks 15 first for efficiency\n• **String Concatenation:** Elegant approach that builds the result dynamically\n• **Functional One-Liner:** Array.from + ternary operators for concise code\n\n🚀 **Real-World Applications:**\n• **Rule Engines:** Business logic with multiple conditional branches\n• **Data Transformation:** Converting numeric data based on business rules\n• **Game Logic:** Implementing scoring systems with special conditions\n• **Report Generation:** Formatting data with conditional text replacement\n\n💡 **Learning Value:**\n• Conditional logic and operator precedence\n• Modulo arithmetic for divisibility testing\n• String vs numeric data handling\n• Code clarity vs cleverness trade-offs",
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
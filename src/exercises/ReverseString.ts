import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Reverse a String Exercise Implementation
 * 
 * DESCRIPTION:
 * Reverses a string.
 * 
 * EXAMPLE:
 * "hello" → "olleh"
 * 
 * CONCEPTS:
 * - String manipulation
 * - Iteration
 * 
 * PERFORMANCE:
 * - Time: O(n)
 * - Space: O(n)
 * 
 * Multiple implementations included to show different approaches.
 */

export function reverseString(str: string): string {
  if (typeof str !== 'string') throw new Error("Input must be a string");
  return str.split('').reverse().join('');
}

export function reverseStringManual(str: string): string {
  if (typeof str !== 'string') throw new Error("Input must be a string");
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
}

export const metadata: ExerciseMetadata = {
  title: "Reverse a String",
  description: "Reverses a string, returning the characters in opposite order",
  concepts: ["string manipulation", "array iteration", "built-in methods"],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)"
};

export const examples: ExampleCase[] = [
  { input: "hello", output: "olleh", description: "Basic reversal" },
  { input: "", output: "", description: "Empty string" },
  { input: "a", output: "a", description: "Single character" },
  { input: "12345", output: "54321", description: "Numeric string" },
  { input: "!@#", output: "#@!", description: "Special characters" },
  { input: "Hello World", output: "dlroW olleH", description: "With spaces" }
];

export default { reverseString, reverseStringManual, metadata, examples };
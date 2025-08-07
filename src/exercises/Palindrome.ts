import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Palindrome Checker Exercise Implementation
 * 
 * DESCRIPTION:
 * Checks if a string is a palindrome, ignoring case, spaces, and non-alphanumeric characters.
 * 
 * EXAMPLE:
 * "A man, a plan, a canal: Panama" → true
 * 
 * CONCEPTS:
 * - String manipulation
 * - Regular expressions
 * 
 * PERFORMANCE:
 * - Time: O(n)
 * - Space: O(n)
 * 
 * Multiple implementations included to show different approaches.
 */

export function isPalindrome(str: string): boolean {
  if (typeof str !== 'string') throw new Error("Input must be a string");
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

export function isPalindromeTwoPointer(str: string): boolean {
  if (typeof str !== 'string') throw new Error("Input must be a string");
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}

export const metadata: ExerciseMetadata = {
  title: "Palindrome Checker",
  description: "Checks if a string is a palindrome, ignoring case, spaces, and non-alphanumeric characters",
  concepts: ["string manipulation", "regular expressions", "comparison"],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)"
};

export const examples: ExampleCase[] = [
  { input: "A man, a plan, a canal: Panama", output: true, description: "Classic palindrome with spaces and punctuation" },
  { input: "race a car", output: false, description: "Non-palindrome with spaces" },
  { input: "Was it a car or a cat I saw?", output: true, description: "Palindrome with spaces, punctuation, and mixed case" },
  { input: "", output: true, description: "Empty string" },
  { input: "a", output: true, description: "Single character" },
  { input: ".,", output: true, description: "Only punctuation" }
];

export default { isPalindrome, isPalindromeTwoPointer, metadata, examples };
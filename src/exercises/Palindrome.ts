import type { 
  ExerciseMetadata, 
  ExampleCase, 
  SolutionMetadata
} from "@/interfaces/exercises";

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
  title: "Palindrome Check",
  description: "Check if a string reads the same forwards and backwards, ignoring spaces and case.",
  concepts: ["String Manipulation", "Two Pointers", "Regular Expressions"],
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "isPalidrome",
    tabName: "Two Pointers",
    approach: "Two pointers from ends to center",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "isPalindromeReverse",
    tabName: "Reverse",
    approach: "Compare string with its reverse",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "isPalindromeRecursive",
    tabName: "Recursive",
    approach: "Recursive two-pointer check",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: "A man, a plan, a canal: Panama", output: true, description: "Classic palindrome with spaces and punctuation" },
  { input: "race a car", output: false, description: "Non-palindrome with spaces" },
  { input: "Was it a car or a cat I saw?", output: true, description: "Palindrome with spaces, punctuation, and mixed case" },
  { input: "", output: true, description: "Empty string" },
  { input: "a", output: true, description: "Single character" },
  { input: ".,", output: true, description: "Only punctuation" }
];

const exerciseModule = { isPalindrome, isPalindromeTwoPointer, metadata, solutions, examples };
export default exerciseModule;
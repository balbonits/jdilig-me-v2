import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Anagram Checker Exercise Implementation
 * 
 * DESCRIPTION:
 * Checks if two strings are anagrams, ignoring case, spaces, non-alphanumeric.
 * 
 * EXAMPLE:
 * "listen", "silent" → true
 * 
 * CONCEPTS:
 * - String manipulation
 * - Sorting or frequency counting
 * 
 * PERFORMANCE:
 * - Time: O(n log n) sorting, O(n) hash map
 * - Space: O(n)
 * 
 * Multiple implementations included to show different approaches.
 */

export function areAnagrams(str1: string, str2: string): boolean {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') throw new Error("Inputs must be strings");
  const anagramPreparer = (str: string): string => str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
  return anagramPreparer(str1) === anagramPreparer(str2);
}

export function areAnagramsHashMap(str1: string, str2: string): boolean {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') throw new Error("Inputs must be strings");
  const cleanStr = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const s1 = cleanStr(str1);
  const s2 = cleanStr(str2);
  if (s1.length !== s2.length) return false;
  const charCount: { [key: string]: number } = {};
  for (const char of s1) charCount[char] = (charCount[char] || 0) + 1;
  for (const char of s2) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }
  return Object.values(charCount).every(count => count === 0);
}

export const metadata: ExerciseMetadata = {
  title: "Anagram Checker",
  description: "Checks if two strings are anagrams, ignoring case, spaces, and non-alphanumeric characters",
  concepts: ["string manipulation", "sorting", "hash maps", "regular expressions"],
  timeComplexity: "O(n log n) for sorting, O(n) for hash map",
  spaceComplexity: "O(n)"
};

export const examples: ExampleCase[] = [
  { input: ["listen", "silent"], output: true, description: "Classic pair" },
  { input: ["hello", "world"], output: false, description: "Non-anagram" },
  { input: ["Tea!", "eat"], output: true, description: "With punctuation" },
  { input: ["", ""], output: true, description: "Empty strings" },
  { input: ["rat1", "tar1"], output: true, description: "With numbers" },
  { input: ["a b c", "cba!"], output: true, description: "With spaces" }
];

const anagramModule = { areAnagrams, areAnagramsHashMap, metadata, examples };
export default anagramModule;
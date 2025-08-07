import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Longest Common Substring Exercise Implementation
 * 
 * DESCRIPTION:
 * Finds the longest substring common to two strings.
 * 
 * EXAMPLE:
 * "ABCD", "ACDF" → "CD"
 * 
 * CONCEPTS:
 * - Dynamic programming
 * - String manipulation
 * 
 * PERFORMANCE:
 * - Time: O(m*n) DP, O(m*n*min(m,n)) brute
 * - Space: O(m*n) DP, O(1) brute
 * 
 * Multiple implementations included to show different approaches.
 */

export function longestCommonSubstring(str1: string, str2: string): string {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') throw new Error("Inputs must be strings");
  const m = str1.length;
  const n = str2.length;
  let maxLength = 0;
  let endIndex = 0;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j];
          endIndex = i;
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return str1.substring(endIndex - maxLength, endIndex);
}

export function longestCommonSubstringBrute(str1: string, str2: string): string {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') throw new Error("Inputs must be strings");
  let maxLength = 0;
  let longest = '';
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      let k = 0;
      while (i + k < str1.length && j + k < str2.length && str1[i + k] === str2[j + k]) k++;
      if (k > maxLength) {
        maxLength = k;
        longest = str1.substring(i, i + k);
      }
    }
  }
  return longest;
}

export const metadata: ExerciseMetadata = {
  title: "Longest Common Substring",
  description: "Finds the longest substring common to two strings",
  concepts: ["dynamic programming", "string manipulation"],
  timeComplexity: "O(m*n) for DP, O(m*n*min(m,n)) for brute force",
  spaceComplexity: "O(m*n) for DP, O(1) for brute force"
};

export const examples: ExampleCase[] = [
  { input: ["ABCD", "ACDF"], output: "CD", description: "Basic" },
  { input: ["hello", "world"], output: "l", description: "Single char" },
  { input: ["abcde", "fghij"], output: "", description: "No common" },
  { input: ["", ""], output: "", description: "Empty" },
  { input: ["a", "a"], output: "a", description: "Identical single" },
  { input: ["banana", "anana"], output: "anana", description: "Overlapping" }
];

const exerciseModule = { longestCommonSubstring, longestCommonSubstringBrute, metadata, examples };
export default exerciseModule;
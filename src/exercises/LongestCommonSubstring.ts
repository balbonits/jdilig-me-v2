import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

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
  detailedDescription: "🧩 **The String Analysis Master**\nLongest Common Substring finds the longest contiguous sequence of characters that appears in both input strings. Essential for text comparison, plagiarism detection, and DNA sequence analysis!\n\n🧠 **The Substring Challenge:**\n• **Contiguous Sequence:** Must be consecutive characters, not scattered\n• **Maximum Length:** Find the single longest match, not all matches\n• **Two-String Comparison:** Compare exactly two input strings\n• **Case Sensitivity:** Typically case-sensitive comparison\n\n⚡ **Two Strategic Approaches:**\n• **Dynamic Programming:** O(m*n) time with systematic bottom-up table building\n• **Brute Force:** O(m*n*min(m,n)) time checking all possible substrings\n\n🚀 **Real-World Applications:**\n• **Plagiarism Detection:** Find common text passages between documents\n• **Version Control:** Git diff algorithms for finding common code blocks\n• **Bioinformatics:** DNA/RNA sequence alignment and comparison\n• **File Synchronization:** Rsync algorithms for efficient file updates\n• **Text Editors:** Find common blocks for merge conflict resolution\n• **Search Engines:** Document similarity and duplicate detection\n\n💡 **Learning Value:**\n• Dynamic programming table construction and optimization\n• String processing and character-by-character comparison\n• Space-time complexity trade-offs in algorithm design\n• Two-dimensional problem reduction techniques",
  concepts: ["dynamic programming", "string manipulation"],
  timeComplexity: "O(m*n) for DP, O(m*n*min(m,n)) for brute force",
  spaceComplexity: "O(m*n) for DP, O(1) for brute force",
  difficulty: "Hard"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "longestCommonSubstring",
    tabName: "Dynamic Programming",
    approach: "2D DP table approach",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "longestCommonSubstringBrute",
    tabName: "Brute Force",
    approach: "Nested loop comparison",
    timeComplexity: "O(m*n*min(m,n))",
    spaceComplexity: "O(1)",
    isOptimal: false,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: ["ABCD", "ACDF"], output: "CD", description: "Basic" },
  { input: ["hello", "world"], output: "l", description: "Single char" },
  { input: ["abcde", "fghij"], output: "", description: "No common" },
  { input: ["", ""], output: "", description: "Empty" },
  { input: ["a", "a"], output: "a", description: "Identical single" },
  { input: ["banana", "anana"], output: "anana", description: "Overlapping" }
];

const exerciseModule = { longestCommonSubstring, longestCommonSubstringBrute, metadata, solutions, examples };
export default exerciseModule;
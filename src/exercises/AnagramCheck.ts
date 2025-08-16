import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🔤 Anagram Checker Exercise Implementation
 * 
 * DESCRIPTION:
 * Anagrams are words/phrases formed by rearranging letters of another word.
 * This implementation handles case-insensitive matching, whitespace/punctuation
 * removal, and provides both sorting and hash map solutions.
 * 
 * EXAMPLES:
 * • "listen", "silent" → true
 * • "The Morse Code", "Here come dots" → true  
 * • "Tea!", "eat" → true (ignores punctuation)
 * 
 * ALGORITHMIC APPROACHES:
 * • Sorting Method: Sort characters and compare strings
 * • Hash Map Method: Count character frequencies (optimal)
 * 
 * REAL-WORLD APPLICATIONS:
 * • Word games and puzzles
 * • Cryptography and code-breaking
 * • Data deduplication algorithms
 * 
 * PERFORMANCE:
 * - Time: O(n log n) sorting, O(n) hash map
 * - Space: O(n) for both approaches
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
  detailedDescription: "🔤 **What are Anagrams?**\nAnagrams are words or phrases formed by rearranging letters of another word, using all original letters exactly once. Think \"listen\" → \"silent\" or \"The Morse Code\" → \"Here come dots\"!\n\n🛠️ **This Implementation Handles:**\n• Case-insensitive matching (\"Listen\" = \"SILENT\")\n• Whitespace and punctuation removal (\"Tea!\" = \"eat\")\n• Mixed alphanumeric characters (\"a1b2\" = \"2b1a\")\n• Input validation and error handling\n\n⚡ **Two Algorithmic Approaches:**\n• **Sorting Method:** Sort both strings and compare (simple but slower)\n• **Hash Map Method:** Count character frequencies (optimal for large inputs)\n\n💡 **Real-World Applications:**\n• Word games and puzzles\n• Cryptography and code-breaking\n• Data deduplication algorithms\n• String similarity detection",
  concepts: ["string manipulation", "sorting", "hash maps", "regular expressions"],
  timeComplexity: "O(n log n) for sorting, O(n) for hash map",
  spaceComplexity: "O(n)",
  difficulty: "Easy"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "areAnagrams",
    tabName: "Sorting",
    approach: "Sort characters and compare",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "areAnagramsHashMap",
    tabName: "Hash Map", 
    approach: "Character frequency counting",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: ["listen", "silent"], output: true, description: "Classic pair" },
  { input: ["hello", "world"], output: false, description: "Non-anagram" },
  { input: ["Tea!", "eat"], output: true, description: "With punctuation" },
  { input: ["", ""], output: true, description: "Empty strings" },
  { input: ["rat1", "tar1"], output: true, description: "With numbers" },
  { input: ["a b c", "cba!"], output: true, description: "With spaces" }
];

const anagramModule = { areAnagrams, areAnagramsHashMap, metadata, solutions, examples };
export default anagramModule;
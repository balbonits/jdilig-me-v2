import type { 
  ExerciseMetadata, 
  ExampleCase, 
  SolutionMetadata
} from "@/interfaces/exercises";

/**
 * 🔄 Palindrome Check - Mirror String Validation
 * 
 * DESCRIPTION:
 * 🪞 **Words That Read the Same Backwards**
 * Palindromes are fascinating linguistic puzzles that read identically forwards and backwards! From simple words like "racecar" to complex phrases like "A man, a plan, a canal: Panama", these mirror-like strings challenge our string manipulation skills.
 * 
 * 🧿 **Smart Text Processing:**
 * • Normalize case differences ("Aa" = "aa")
 * • Remove spaces and punctuation ("A, a" = "Aa")
 * • Filter to alphanumeric characters only
 * • Compare cleaned string with its reverse
 * 
 * ⚡ **Three Algorithmic Approaches:**
 * • **Two Pointers:** Compare characters from both ends moving inward (O(1) space)
 * • **String Reversal:** Create reversed copy and compare (simple but O(n) space)
 * • **Recursive:** Elegant recursive approach with function call overhead
 * 
 * 🎯 **Real-World String Challenges:**
 * • **Data Validation:** Verify symmetric codes and identifiers
 * • **Text Processing:** Clean and normalize user input
 * • **Algorithm Practice:** Foundation for more complex string problems
 * • **Pattern Recognition:** Identify symmetric structures in data
 * 
 * 📚 **Educational Value:**
 * • String manipulation techniques
 * • Regular expression usage for text cleaning
 * • Two-pointer algorithm pattern
 * • Time vs space complexity trade-offs
 * • Input validation and edge case handling
 * 
 * 🚀 **Beyond Basic Checking:**
 * • Unicode and international character support
 * • Custom normalization rules
 * • Performance optimization for large texts
 * • Longest palindromic substring algorithms
 * 
 * PERFORMANCE:
 * - Time: O(n) - linear scan of string characters
 * - Space: O(1) for two-pointer, O(n) for reversal method
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
  detailedDescription: "🪞 **Words That Read the Same Backwards**\nPalindromes are fascinating linguistic puzzles that read identically forwards and backwards! From simple words like 'racecar' to complex phrases like 'A man, a plan, a canal: Panama', these mirror-like strings challenge our string manipulation skills.\n\n🧿 **Smart Text Processing:**\n• Normalize case differences ('Aa' = 'aa')\n• Remove spaces and punctuation ('A, a' = 'Aa')\n• Filter to alphanumeric characters only\n• Compare cleaned string with its reverse\n\n⚡ **Three Algorithmic Approaches:**\n• **Two Pointers:** Compare characters from both ends moving inward (O(1) space)\n• **String Reversal:** Create reversed copy and compare (simple but O(n) space)\n• **Recursive:** Elegant recursive approach with function call overhead\n\n🎯 **Real-World String Challenges:**\n• **Data Validation:** Verify symmetric codes and identifiers\n• **Text Processing:** Clean and normalize user input\n• **Algorithm Practice:** Foundation for more complex string problems\n• **Pattern Recognition:** Identify symmetric structures in data\n\n📚 **Educational Value:**\n• String manipulation techniques\n• Regular expression usage for text cleaning\n• Two-pointer algorithm pattern\n• Time vs space complexity trade-offs\n• Input validation and edge case handling\n\n🚀 **Beyond Basic Checking:**\n• Unicode and international character support\n• Custom normalization rules\n• Performance optimization for large texts\n• Longest palindromic substring algorithms",
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
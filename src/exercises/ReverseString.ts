import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🔄 String Reversal - The Foundation of Text Manipulation
 * 
 * DESCRIPTION:
 * 📝 **The Text Processing Building Block**
 * String reversal is a fundamental text manipulation operation that appears in countless programming scenarios! From palindrome checking to cryptography, this simple operation forms the foundation for more complex string algorithms.
 * 
 * 🧠 **The Reversal Challenge:**
 * • **Character Order:** Transform "abc" → "cba" by reversing character sequence
 * • **Preserve Content:** All characters remain, only order changes
 * • **Handle Edge Cases:** Empty strings, single characters, special symbols
 * • **Memory Consideration:** Balance between simplicity and efficiency
 * 
 * ⚡ **Two Classic Approaches:**
 * • **Built-in Methods:** Leverage JavaScript's split/reverse/join - concise and readable
 * • **Manual Loop:** Character-by-character reversal - educational and explicit
 * 
 * 🚀 **Real-World Applications:**
 * • **Palindrome Detection:** Check if text reads the same forwards and backwards
 * • **Cryptography:** Simple text obfuscation and encoding schemes
 * • **Data Processing:** Reversing sequences in data transformation pipelines
 * • **Algorithm Building:** Foundation for more complex string manipulation
 * • **Text Effects:** Creating mirror text for UI animations and effects
 * 
 * 💡 **Learning Value:**
 * • String immutability concepts in JavaScript
 * • Array manipulation and method chaining
 * • Loop design and index management
 * • Trade-offs between readability and performance
 * 
 * PERFORMANCE:
 * - Time: O(n) - must process every character once
 * - Space: O(n) - creating new string with same length
 * 
 * Two implementations show built-in methods vs manual character manipulation.
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
  detailedDescription: "📝 **The Text Processing Building Block**\nString reversal is a fundamental text manipulation operation that appears in countless programming scenarios! From palindrome checking to cryptography, this simple operation forms the foundation for more complex string algorithms.\n\n🧠 **The Reversal Challenge:**\n• **Character Order:** Transform \"abc\" → \"cba\" by reversing character sequence\n• **Preserve Content:** All characters remain, only order changes\n• **Handle Edge Cases:** Empty strings, single characters, special symbols\n• **Memory Consideration:** Balance between simplicity and efficiency\n\n⚡ **Two Classic Approaches:**\n• **Built-in Methods:** Leverage JavaScript's split/reverse/join - concise and readable\n• **Manual Loop:** Character-by-character reversal - educational and explicit\n\n🚀 **Real-World Applications:**\n• **Palindrome Detection:** Check if text reads the same forwards and backwards\n• **Cryptography:** Simple text obfuscation and encoding schemes\n• **Data Processing:** Reversing sequences in data transformation pipelines\n• **Algorithm Building:** Foundation for more complex string manipulation\n• **Text Effects:** Creating mirror text for UI animations and effects\n\n💡 **Learning Value:**\n• String immutability concepts in JavaScript\n• Array manipulation and method chaining\n• Loop design and index management\n• Trade-offs between readability and performance",
  concepts: ["string manipulation", "array iteration", "built-in methods"],
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  difficulty: "Beginner"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "reverseString",
    tabName: "Built-in Methods",
    approach: "Split, reverse, join",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "reverseStringManual",
    tabName: "Manual Loop",
    approach: "Manual character-by-character reversal",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: "hello", output: "olleh", description: "Basic reversal" },
  { input: "", output: "", description: "Empty string" },
  { input: "a", output: "a", description: "Single character" },
  { input: "12345", output: "54321", description: "Numeric string" },
  { input: "!@#", output: "#@!", description: "Special characters" },
  { input: "Hello World", output: "dlroW olleH", description: "With spaces" }
];

const exerciseModule = { reverseString, reverseStringManual, metadata, solutions, examples };
export default exerciseModule;
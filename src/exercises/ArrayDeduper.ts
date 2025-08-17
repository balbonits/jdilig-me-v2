import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🧹 Array Deduplication - Clean Data Processing
 * 
 * DESCRIPTION:
 * 🔄 **Remove the Noise, Keep the Signal**
 * Array deduplication is a fundamental data cleaning operation that removes duplicate values while preserving the original order. Essential for data processing pipelines!
 * 
 * 🎯 **Why Order Matters:**
 * • Preserves chronological sequence in time-series data
 * • Maintains user input order in form processing
 * • Keeps first occurrence, discards subsequent duplicates
 * • Critical for data integrity in processing workflows
 * 
 * ⚡ **Three Deduplication Strategies:**
 * • **Set-Based:** Uses Set for O(1) lookups - fastest approach
 * • **Filter + indexOf:** Simple but O(n²) - good for learning
 * • **Reduce + includes:** Functional approach - readable but slower
 * 
 * 🚀 **Real-World Applications:**
 * • **User Input:** Remove duplicate tags, categories, or selections
 * • **Data Processing:** Clean imported datasets and APIs
 * • **Search Results:** Eliminate duplicate entries from multiple sources
 * • **Analytics:** Unique visitor tracking and event deduplication
 * 
 * 💡 **Learning Value:**
 * • Set vs Array performance characteristics
 * • Time complexity analysis and optimization
 * • Functional vs imperative programming styles
 * • Data structure selection for specific use cases
 * 
 * PERFORMANCE:
 * - Time: O(n) Set-based, O(n²) filter/reduce approaches
 * - Space: O(n) for storing unique values
 */

export function ArrayDeduplicate(arr: (number | string)[]): (number | string)[] {
  if (!Array.isArray(arr)) throw new Error("Input must be an array");
  const seen = new Set();
  const dedupedArray: (number | string)[] = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      dedupedArray.push(item);
    }
  }
  return dedupedArray;
}

export function ArrayFilterDeduplicate(arr: (number | string)[]): (number | string)[] {
  if (!Array.isArray(arr)) throw new Error("Input must be an array");
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export function ArrayReduceDeduplicate(arr: (number | string)[]): (number | string)[] {
  if (!Array.isArray(arr)) throw new Error("Input must be an array");
  return arr.reduce((deduped: (number | string)[], item) => {
    if (!deduped.includes(item)) deduped.push(item);
    return deduped;
  }, []);
}

export const metadata: ExerciseMetadata = {
  title: "Array Deduplication",
  description: "Removes duplicates from an array of numbers or strings",
  detailedDescription: "🔄 **Remove the Noise, Keep the Signal**\nArray deduplication is a fundamental data cleaning operation that removes duplicate values while preserving the original order. Essential for data processing pipelines!\n\n🎯 **Why Order Matters:**\n• Preserves chronological sequence in time-series data\n• Maintains user input order in form processing\n• Keeps first occurrence, discards subsequent duplicates\n• Critical for data integrity in processing workflows\n\n⚡ **Three Deduplication Strategies:**\n• **Set-Based:** Uses Set for O(1) lookups - fastest approach\n• **Filter + indexOf:** Simple but O(n²) - good for learning\n• **Reduce + includes:** Functional approach - readable but slower\n\n🚀 **Real-World Applications:**\n• **User Input:** Remove duplicate tags, categories, or selections\n• **Data Processing:** Clean imported datasets and APIs\n• **Search Results:** Eliminate duplicate entries from multiple sources\n• **Analytics:** Unique visitor tracking and event deduplication\n\n💡 **Learning Value:**\n• Set vs Array performance characteristics\n• Time complexity analysis and optimization\n• Functional vs imperative programming styles\n• Data structure selection for specific use cases",
  concepts: ["array manipulation", "hash sets", "filtering", "reducing"],
  timeComplexity: "O(n) for Set-based, O(n²) for filter/reduce-based",
  spaceComplexity: "O(n)",
  difficulty: "Easy"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "ArrayDeduplicate",
    tabName: "Set-based",
    approach: "Set-based deduplication",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "ArrayFilterDeduplicate", 
    tabName: "Filter",
    approach: "Array.filter with indexOf",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "ArrayReduceDeduplicate",
    tabName: "Reduce", 
    approach: "Array.reduce with includes",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: [1, 2, 2, 3, 1], output: [1, 2, 3], description: "Duplicate numbers" },
  { input: ["a", "b", "a", "c", "b"], output: ["a", "b", "c"], description: "Duplicate strings" },
  { input: [], output: [], description: "Empty array" },
  { input: [1], output: [1], description: "Single element" },
  { input: [1, "a", 1, "a", 2], output: [1, "a", 2], description: "Mixed types" },
  { input: null, output: new Error("Input must be an array"), description: "Invalid input" }
];

const arrayDeduperModule = { ArrayDeduplicate, ArrayFilterDeduplicate, ArrayReduceDeduplicate, metadata, solutions, examples };
export default arrayDeduperModule;
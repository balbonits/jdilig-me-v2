import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * Array Deduplication Exercise Implementation
 * 
 * DESCRIPTION:
 * Removes duplicates from an array of numbers or strings, preserving order.
 * 
 * EXAMPLE:
 * [1, 2, 2, 3, 1] → [1, 2, 3]
 * 
 * CONCEPTS:
 * - Array manipulation
 * - Sets
 * 
 * PERFORMANCE:
 * - Time: O(n) Set, O(n²) filter/reduce
 * - Space: O(n)
 * 
 * Multiple implementations included to show different approaches.
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
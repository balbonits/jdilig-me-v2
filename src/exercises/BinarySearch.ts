import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * Binary Search Exercise Implementation
 * 
 * DESCRIPTION:
 * Finds target index in sorted array (-1 if not found).
 * 
 * EXAMPLE:
 * [1, 3, 5, 7, 9], 5 → 2
 * 
 * CONCEPTS:
 * - Divide-and-conquer
 * - Logarithmic search
 * 
 * PERFORMANCE:
 * - Time: O(log n)
 * - Space: O(1) iterative, O(log n) recursive
 * 
 * Multiple implementations included to show different approaches.
 */

export function binarySearch(arr: number[], target: number): number {
  if (!Array.isArray(arr) || !arr.every(Number.isFinite)) throw new Error("Input must be a sorted array of numbers");
  if (typeof target !== 'number' || !Number.isFinite(target)) throw new Error("Target must be a finite number");
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

export function binarySearchRecursive(arr: number[], target: number, low = 0, high = arr.length - 1): number {
  if (!Array.isArray(arr) || !arr.every(Number.isFinite)) throw new Error("Input must be a sorted array of numbers");
  if (typeof target !== 'number' || !Number.isFinite(target)) throw new Error("Target must be a finite number");
  if (low > high) return -1;
  const mid = low + Math.floor((high - low) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, high);
  return binarySearchRecursive(arr, target, low, mid - 1);
}

export const metadata: ExerciseMetadata = {
  title: "Binary Search",
  description: "Finds the index of a target in a sorted array",
  concepts: ["divide-and-conquer", "logarithmic search"],
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1) for iterative, O(log n) for recursive",
  difficulty: "Medium"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "binarySearch",
    tabName: "Iterative",
    approach: "Iterative binary search",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "binarySearchRecursive",
    tabName: "Recursive",
    approach: "Recursive binary search",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(log n)",
    isOptimal: false,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: [[1, 3, 5, 7, 9], 5], output: 2, description: "Middle" },
  { input: [[1, 2, 3], 4], output: -1, description: "Not found" },
  { input: [[], 5], output: -1, description: "Empty" },
  { input: [[1], 1], output: 0, description: "Single found" },
  { input: [[1], 2], output: -1, description: "Single not found" },
  { input: [[1, 2, 2, 3], 2], output: 1, description: "Duplicates" }
];

const binarySearchModule = { binarySearch, binarySearchRecursive, metadata, solutions, examples };
export default binarySearchModule;
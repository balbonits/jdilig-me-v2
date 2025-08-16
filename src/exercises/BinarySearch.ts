import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🔍 Binary Search - Logarithmic Search Algorithm
 * 
 * DESCRIPTION:
 * 🎯 **The Foundation of Efficient Searching**
 * Binary search is the gold standard for searching sorted arrays, cutting the search space in half with each comparison. This divide-and-conquer masterpiece achieves O(log n) performance!
 * 
 * 🧠 **How Binary Search Works:**
 * • Start with the middle element of the sorted array
 * • Compare target with middle: equal (found!), less (search left half), greater (search right half)
 * • Repeat on the selected half until found or exhausted
 * • Return index if found, -1 if not found
 * 
 * ⚡ **Two Implementation Approaches:**
 * • **Iterative Method:** Uses loops with O(1) space complexity (optimal)
 * • **Recursive Method:** Clean recursive calls with O(log n) space overhead
 * 
 * 🎓 **Interview & Learning Value:**
 * • Essential algorithm for technical interviews
 * • Demonstrates divide-and-conquer strategy
 * • Foundation for more complex search algorithms
 * • Real-world applications in databases and file systems
 * 
 * 🚀 **Real-World Applications:**
 * • Database indexing and query optimization
 * • Git bisect for finding buggy commits
 * • Memory allocation in operating systems
 * • Search suggestions and autocomplete systems
 * 
 * PERFORMANCE:
 * - Time: O(log n) - logarithmic search efficiency
 * - Space: O(1) iterative, O(log n) recursive stack
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
  detailedDescription: "🔍 **The Foundation of Efficient Searching**\nBinary search is the gold standard for searching sorted arrays, cutting the search space in half with each comparison. This divide-and-conquer masterpiece achieves O(log n) performance!\n\n🧠 **How Binary Search Works:**\n• Start with the middle element of the sorted array\n• Compare target with middle: equal (found!), less (search left half), greater (search right half)\n• Repeat on the selected half until found or exhausted\n• Return index if found, -1 if not found\n\n⚡ **Two Implementation Approaches:**\n• **Iterative Method:** Uses loops with O(1) space complexity (optimal)\n• **Recursive Method:** Clean recursive calls with O(log n) space overhead\n\n🎓 **Interview & Learning Value:**\n• Essential algorithm for technical interviews\n• Demonstrates divide-and-conquer strategy\n• Foundation for more complex search algorithms\n• Real-world applications in databases and file systems\n\n🚀 **Real-World Applications:**\n• Database indexing and query optimization\n• Git bisect for finding buggy commits\n• Memory allocation in operating systems\n• Search suggestions and autocomplete systems",
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
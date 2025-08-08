import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * Quick Sort Exercise Implementation
 * 
 * DESCRIPTION:
 * Implement the quick sort algorithm using divide-and-conquer approach with pivot partitioning.
 * 
 * EXAMPLE:
 * [64, 34, 25, 12, 22, 11, 90] → [11, 12, 22, 25, 34, 64, 90]
 * 
 * CONCEPTS:
 * - Divide and Conquer
 * - Recursion
 * - In-place Sorting
 * - Partitioning
 * - Pivot Selection
 * 
 * PERFORMANCE:
 * - Time: O(n log n) average, O(n²) worst case
 * - Space: O(log n) average, O(n) worst case
 * 
 * Multiple implementations included to show different approaches.
 */

// Main function - in-place quick sort
export function quickSort(arr: number[]): number[] {
  const result = [...arr]; // Create a copy to avoid mutating input
  quickSortHelper(result, 0, result.length - 1);
  return result;
}

// Helper function for recursive sorting
function quickSortHelper(arr: number[], low: number, high: number): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSortHelper(arr, low, pivotIndex - 1);
    quickSortHelper(arr, pivotIndex + 1, high);
  }
}

// Partition function using Lomuto partition scheme
function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]; // Choose last element as pivot
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot in correct position
  return i + 1;
}

// Alternative implementation with random pivot for better average performance
export function quickSortRandomized(arr: number[]): number[] {
  const result = [...arr];
  quickSortRandomizedHelper(result, 0, result.length - 1);
  return result;
}

function quickSortRandomizedHelper(arr: number[], low: number, high: number): void {
  if (low < high) {
    // Randomize pivot selection
    const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
    
    const pivotIndex = partition(arr, low, high);
    quickSortRandomizedHelper(arr, low, pivotIndex - 1);
    quickSortRandomizedHelper(arr, pivotIndex + 1, high);
  }
}

// Iterative implementation to avoid recursion stack overflow
export function quickSortIterative(arr: number[]): number[] {
  const result = [...arr];
  const stack: [number, number][] = [];
  stack.push([0, result.length - 1]);
  
  while (stack.length > 0) {
    const [low, high] = stack.pop()!;
    
    if (low < high) {
      const pivotIndex = partition(result, low, high);
      stack.push([low, pivotIndex - 1]);
      stack.push([pivotIndex + 1, high]);
    }
  }
  
  return result;
}

export const metadata: ExerciseMetadata = {
  title: "Quick Sort",
  description: "Implement the quick sort algorithm using divide-and-conquer approach with pivot partitioning.",
  concepts: [
    "Divide and Conquer",
    "Recursion", 
    "In-place Sorting",
    "Partitioning",
    "Pivot Selection"
  ],
  difficulty: "Medium",
  timeComplexity: "O(n log n) average, O(n²) worst case",
  spaceComplexity: "O(log n) average, O(n) worst case"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "quickSort",
    tabName: "Classic",
    approach: "Uses Lomuto partition scheme with last element as pivot. Simple and easy to understand.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n) average, O(n) worst",
    isOptimal: false,
    type: "function"
  },
  {
    name: "quickSortRandomized", 
    tabName: "Randomized",
    approach: "Randomizes pivot selection to avoid worst-case performance on already sorted arrays.",
    timeComplexity: "O(n log n) expected",
    spaceComplexity: "O(log n) expected", 
    isOptimal: true,
    type: "function"
  },
  {
    name: "quickSortIterative",
    tabName: "Iterative", 
    approach: "Uses explicit stack instead of recursion to avoid stack overflow on large arrays.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n) auxiliary space",
    isOptimal: false,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  {
    input: [64, 34, 25, 12, 22, 11, 90],
    output: [11, 12, 22, 25, 34, 64, 90],
    description: "Sort an array of positive integers"
  },
  {
    input: [5, 2, 8, 1, 9],
    output: [1, 2, 5, 8, 9],
    description: "Sort a smaller array"
  },
  {
    input: [3, 3, 3, 3],
    output: [3, 3, 3, 3],
    description: "Handle duplicate elements"
  },
  {
    input: [-1, -5, 2, 0, 3],
    output: [-5, -1, 0, 2, 3],
    description: "Sort array with negative numbers"
  },
  {
    input: [1],
    output: [1],
    description: "Single element array"
  },
  {
    input: [],
    output: [],
    description: "Empty array"
  }
];

const exerciseModule = { quickSort, quickSortRandomized, quickSortIterative, metadata, solutions, examples };
export default exerciseModule;

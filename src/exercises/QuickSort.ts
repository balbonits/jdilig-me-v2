import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * ⚡ Quick Sort - The Speed Demon of Sorting Algorithms
 * 
 * DESCRIPTION:
 * 🚀 **The Performance Champion**
 * Quick Sort is the go-to sorting algorithm for speed! Despite its worst-case O(n²) complexity, its average O(n log n) performance and excellent cache locality make it the default choice for most practical applications.
 * 
 * 🧠 **The Pivot Strategy:**
 * • **Choose Pivot:** Select an element to partition around (strategy matters!)
 * • **Partition:** Rearrange so smaller elements are left, larger are right
 * • **Recursively Sort:** Apply same process to left and right partitions
 * • **In-Place:** Sorts with minimal extra memory usage
 * 
 * ⚡ **Three Strategic Approaches:**
 * • **Classic:** Simple last-element pivot - easy to understand
 * • **Randomized:** Random pivot selection - avoids worst-case scenarios  
 * • **Iterative:** Stack-based approach - prevents recursion overflow
 * 
 * 🚀 **Real-World Applications:**
 * • **System Libraries:** Default sort in many programming languages (C++, Java)
 * • **Database Engines:** Fast sorting for query optimization
 * • **Graphics Processing:** Sorting vertices and primitives efficiently
 * • **Search Algorithms:** Preprocessing data for faster searches
 * • **Competitive Programming:** Fast enough for tight time constraints
 * 
 * 💡 **Learning Value:**
 * • Partition-based divide-and-conquer algorithms
 * • Pivot selection strategies and their impact
 * • Average vs worst-case performance analysis
 * • In-place algorithm design principles
 * • Randomization for algorithmic improvement
 * 
 * PERFORMANCE:
 * - Time: O(n log n) average, O(n²) worst case (rare with good pivot)
 * - Space: O(log n) average, O(n) worst case (recursion stack)
 * 
 * Three implementations show classic, randomized, and iterative approaches.
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
  detailedDescription: "🚀 **The Performance Champion**\nQuick Sort is the go-to sorting algorithm for speed! Despite its worst-case O(n²) complexity, its average O(n log n) performance and excellent cache locality make it the default choice for most practical applications.\n\n🧠 **The Pivot Strategy:**\n• **Choose Pivot:** Select an element to partition around (strategy matters!)\n• **Partition:** Rearrange so smaller elements are left, larger are right\n• **Recursively Sort:** Apply same process to left and right partitions\n• **In-Place:** Sorts with minimal extra memory usage\n\n⚡ **Three Strategic Approaches:**\n• **Classic:** Simple last-element pivot - easy to understand\n• **Randomized:** Random pivot selection - avoids worst-case scenarios\n• **Iterative:** Stack-based approach - prevents recursion overflow\n\n🚀 **Real-World Applications:**\n• **System Libraries:** Default sort in many programming languages (C++, Java)\n• **Database Engines:** Fast sorting for query optimization\n• **Graphics Processing:** Sorting vertices and primitives efficiently\n• **Search Algorithms:** Preprocessing data for faster searches\n• **Competitive Programming:** Fast enough for tight time constraints\n\n💡 **Learning Value:**\n• Partition-based divide-and-conquer algorithms\n• Pivot selection strategies and their impact\n• Average vs worst-case performance analysis\n• In-place algorithm design principles\n• Randomization for algorithmic improvement",
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

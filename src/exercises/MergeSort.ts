import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🔀 Merge Sort - The Reliable Divide-and-Conquer Champion
 * 
 * DESCRIPTION:
 * 🎯 **The Stable Sorting Powerhouse**
 * Merge Sort is the gold standard for stable, predictable sorting! Using the elegant divide-and-conquer paradigm, it consistently delivers O(n log n) performance regardless of input data distribution.
 * 
 * 🧠 **The Divide-and-Conquer Strategy:**
 * • **Divide:** Split array into two halves recursively until single elements
 * • **Conquer:** Sort each half (base case: single elements are already sorted)
 * • **Combine:** Merge sorted halves back together in sorted order
 * • **Stability:** Equal elements maintain their relative order (crucial for complex data)
 * 
 * ⚡ **Two Implementation Approaches:**
 * • **Recursive:** Classic top-down approach, elegant and intuitive
 * • **Iterative:** Bottom-up approach, avoids recursion overhead
 * 
 * 🚀 **Real-World Applications:**
 * • **Database Systems:** Sorting large datasets with predictable performance
 * • **External Sorting:** Handling datasets larger than available memory
 * • **Stable Sort Requirements:** When maintaining order of equal elements matters
 * • **Parallel Computing:** Easy to parallelize due to divide-and-conquer nature
 * • **Library Implementations:** Foundation for many language standard libraries
 * 
 * 💡 **Learning Value:**
 * • Divide-and-conquer algorithm design paradigm
 * • Recursion tree analysis and complexity calculation
 * • Stable vs unstable sorting trade-offs
 * • Memory usage patterns in sorting algorithms
 * 
 * PERFORMANCE:
 * - Time: O(n log n) guaranteed - no worst-case degradation
 * - Space: O(n) for auxiliary arrays during merging
 * 
 * Two implementations show recursive vs iterative divide-and-conquer approaches.
 */

export function mergeSort(arr: number[]): number[] {
  if (!Array.isArray(arr) || !arr.every(Number.isFinite)) throw new Error("Input must be an array of finite numbers");
  if (arr.length <= 1) return arr.slice();

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const merged: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }

  return merged.concat(left.slice(i)).concat(right.slice(j));
}

export function mergeSortIterative(arr: number[]): number[] {
  if (!Array.isArray(arr) || !arr.every(Number.isFinite)) throw new Error("Input must be an array of finite numbers");
  if (arr.length <= 1) return arr.slice();

  const workArr = arr.slice();
  let width = 1;
  while (width < arr.length) {
    for (let i = 0; i < arr.length; i += 2 * width) {
      const left = workArr.slice(i, i + width);
      const right = workArr.slice(i + width, i + 2 * width);
      const merged = merge(left, right);
      workArr.splice(i, merged.length, ...merged);
    }
    width *= 2;
  }
  return workArr;
}

export const metadata: ExerciseMetadata = {
  title: "Merge Sort",
  description: "Sorts an array using merge sort",
  detailedDescription: "🎯 **The Stable Sorting Powerhouse**\nMerge Sort is the gold standard for stable, predictable sorting! Using the elegant divide-and-conquer paradigm, it consistently delivers O(n log n) performance regardless of input data distribution.\n\n🧠 **The Divide-and-Conquer Strategy:**\n• **Divide:** Split array into two halves recursively until single elements\n• **Conquer:** Sort each half (base case: single elements are already sorted)\n• **Combine:** Merge sorted halves back together in sorted order\n• **Stability:** Equal elements maintain their relative order (crucial for complex data)\n\n⚡ **Two Implementation Approaches:**\n• **Recursive:** Classic top-down approach, elegant and intuitive\n• **Iterative:** Bottom-up approach, avoids recursion overhead\n\n🚀 **Real-World Applications:**\n• **Database Systems:** Sorting large datasets with predictable performance\n• **External Sorting:** Handling datasets larger than available memory\n• **Stable Sort Requirements:** When maintaining order of equal elements matters\n• **Parallel Computing:** Easy to parallelize due to divide-and-conquer nature\n• **Library Implementations:** Foundation for many language standard libraries\n\n💡 **Learning Value:**\n• Divide-and-conquer algorithm design paradigm\n• Recursion tree analysis and complexity calculation\n• Stable vs unstable sorting trade-offs\n• Memory usage patterns in sorting algorithms",
  concepts: ["recursion", "divide-and-conquer"],
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  difficulty: "Medium"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "mergeSort",
    tabName: "Recursive",
    approach: "Recursive divide-and-conquer",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "mergeSortIterative",
    tabName: "Iterative",
    approach: "Bottom-up iterative approach",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: [5, 2, 8, 1], output: [1, 2, 5, 8], description: "Unsorted array" },
  { input: [], output: [], description: "Empty array" },
  { input: [1], output: [1], description: "Single element" },
  { input: [3, 1, 4, 1, 5, 9, 2, 6], output: [1, 1, 2, 3, 4, 5, 6, 9], description: "With duplicates" },
  { input: [1, 2, 3, 4], output: [1, 2, 3, 4], description: "Already sorted" },
  { input: [4, 3, 2, 1], output: [1, 2, 3, 4], description: "Reverse sorted" }
];

const exerciseModule = { mergeSort, mergeSortIterative, metadata, solutions, examples };
export default exerciseModule;
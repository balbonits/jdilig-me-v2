import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Merge Sort Exercise Implementation
 * 
 * DESCRIPTION:
 * Sorts an array using merge sort.
 * 
 * EXAMPLE:
 * [5, 2, 8, 1] → [1, 2, 5, 8]
 * 
 * CONCEPTS:
 * - Recursion
 * - Divide-and-conquer
 * 
 * PERFORMANCE:
 * - Time: O(n log n)
 * - Space: O(n)
 * 
 * Multiple implementations included to show different approaches.
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
  concepts: ["recursion", "divide-and-conquer"],
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)"
};

export const examples: ExampleCase[] = [
  { input: [5, 2, 8, 1], output: [1, 2, 5, 8], description: "Unsorted array" },
  { input: [], output: [], description: "Empty array" },
  { input: [1], output: [1], description: "Single element" },
  { input: [3, 1, 4, 1, 5, 9, 2, 6], output: [1, 1, 2, 3, 4, 5, 6, 9], description: "With duplicates" },
  { input: [1, 2, 3, 4], output: [1, 2, 3, 4], description: "Already sorted" },
  { input: [4, 3, 2, 1], output: [1, 2, 3, 4], description: "Reverse sorted" }
];

const exerciseModule = { mergeSort, mergeSortIterative, metadata, examples };
export default exerciseModule;
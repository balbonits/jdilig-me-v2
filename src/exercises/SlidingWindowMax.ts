import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Sliding Window Maximum Exercise Implementation
 * 
 * DESCRIPTION:
 * Finds the maximum in each k-sized sliding window of an array.
 * 
 * EXAMPLE:
 * [1, 3, -1, -3, 5, 3, 6, 7], 3 → [3, 3, 5, 5, 6, 7]
 * 
 * CONCEPTS:
 * - Sliding window
 * - Deque
 * 
 * PERFORMANCE:
 * - Time: O(n) for deque, O(n*k) for brute force
 * - Space: O(n)
 * 
 * Multiple implementations included to show different approaches.
 */

// Main function (deque-based)
export function slidingWindowMax(nums: number[], k: number): number[] {
  if (!Array.isArray(nums) || !nums.every(Number.isFinite)) throw new Error("Input must be an array of finite numbers");
  if (!Number.isInteger(k) || k <= 0) throw new Error("Window size must be a positive integer");
  if (nums.length === 0) return [];
  if (k > nums.length) k = nums.length;

  const result: number[] = [];
  const deque: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }

  return result;
}

// Alternative implementation (brute force)
export function slidingWindowMaxBrute(nums: number[], k: number): number[] {
  if (!Array.isArray(nums) || !nums.every(Number.isFinite)) throw new Error("Input must be an array of finite numbers");
  if (!Number.isInteger(k) || k <= 0) throw new Error("Window size must be a positive integer");
  if (nums.length === 0) return [];
  if (k > nums.length) k = nums.length;

  const result: number[] = [];
  for (let i = 0; i <= nums.length - k; i++) {
    let max = nums[i];
    for (let j = 1; j < k; j++) {
      if (nums[i + j] > max) max = nums[i + j];
    }
    result.push(max);
  }
  return result;
}

// Exercise metadata
export const metadata: ExerciseMetadata = {
  title: "Sliding Window Maximum",
  description: "Finds the maximum in each k-sized sliding window of an array",
  concepts: ["sliding window", "deque", "brute-force"],
  timeComplexity: "O(n) for deque, O(n*k) for brute force",
  spaceComplexity: "O(n)"
};

// Example test cases
export const examples: ExampleCase[] = [
  {
    input: [[1, 3, -1, -3, 5, 3, 6, 7], 3],
    output: [3, 3, 5, 5, 6, 7],
    description: "Standard sliding window"
  },
  {
    input: [[1], 1],
    output: [1],
    description: "Single element window"
  },
  {
    input: [[1, -1], 1],
    output: [1, -1],
    description: "Window size 1"
  },
  {
    input: [[], 3],
    output: [],
    description: "Empty array"
  },
  {
    input: [[9, 8, 7, 6], 2],
    output: [9, 8, 7],
    description: "Decreasing array"
  },
  {
    input: [[1, 2, 3, 4], 5],
    output: [4],
    description: "k > length (adjusted to max)"
  }
];

// Default export for easy importing
export default {
  slidingWindowMax,
  slidingWindowMaxBrute,
  metadata,
  examples
};
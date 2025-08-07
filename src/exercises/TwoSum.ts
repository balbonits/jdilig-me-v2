import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Two Sum Exercise Implementation
 * 
 * DESCRIPTION:
 * Finds two indices in an array summing to target.
 * 
 * EXAMPLE:
 * [2, 7, 11, 15], 9 → [0, 1]
 * 
 * CONCEPTS:
 * - Iteration
 * - Hash maps
 * 
 * PERFORMANCE:
 * - Time: O(n) hash, O(n²) brute
 * - Space: O(n) hash, O(1) brute
 * 
 * Multiple implementations included to show different approaches.
 */

export function twoSum(nums: number[], target: number): number[] {
  if (!Array.isArray(nums) || nums.length < 2) throw new Error("Input must be an array with at least two numbers");
  const numToIndex: { [key: number]: number } = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numToIndex[complement] !== undefined) return [numToIndex[complement], i];
    numToIndex[nums[i]] = i;
  }
  throw new Error("No two numbers sum to the target");
}

export function twoSumBruteForce(nums: number[], target: number): number[] {
  if (!Array.isArray(nums) || nums.length < 2) throw new Error("Input must be an array with at least two numbers");
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  throw new Error("No two numbers sum to the target");
}

export const metadata: ExerciseMetadata = {
  title: "Two Sum",
  description: "Finds two indices in an array whose values sum to a target",
  concepts: ["array iteration", "hash maps", "brute-force"],
  timeComplexity: "O(n) for hash map, O(n²) for brute-force",
  spaceComplexity: "O(n) for hash map, O(1) for brute-force"
};

export const examples: ExampleCase[] = [
  { input: [[2, 7, 11, 15], 9], output: [0, 1], description: "Basic" },
  { input: [[3, 2, 4], 6], output: [1, 2], description: "Not at start" },
  { input: [[3, 3], 6], output: [0, 1], description: "Duplicates" },
  { input: [[1, 2, 3], 10], output: new Error("No two numbers sum to the target"), description: "No solution" },
  { input: [[1], 2], output: new Error("Input must be an array with at least two numbers"), description: "Too short" },
  { input: [null, 5], output: new Error("Input must be an array with at least two numbers"), description: "Invalid" }
];

const twoSumModule = { twoSum, twoSumBruteForce, metadata, examples };
export default twoSumModule;
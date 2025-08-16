import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🎯 Two Sum Exercise Implementation - The Classic Interview Problem
 * 
 * DESCRIPTION:
 * Find two numbers in an array that add up to a target sum and return their indices.
 * This foundational problem appears in virtually every coding interview and demonstrates
 * the fundamental trade-off between time and space complexity optimization.
 * 
 * EXAMPLES:
 * • [2, 7, 11, 15], target 9 → [0, 1] (because 2 + 7 = 9)
 * • [3, 2, 4], target 6 → [1, 2] (because 2 + 4 = 6)
 * • [3, 3], target 6 → [0, 1] (handles duplicates)
 * 
 * ALGORITHMIC APPROACHES:
 * • Brute Force: Check every pair → O(n²) time, O(1) space
 * • Hash Map: Single pass with lookups → O(n) time, O(n) space
 * 
 * INTERVIEW IMPORTANCE:
 * • Foundation for 3Sum, 4Sum, and other sum problems
 * • Tests understanding of hash table optimization
 * • Demonstrates time vs space complexity trade-offs
 * • Common technical screening question
 * 
 * PERFORMANCE:
 * - Time: O(n) optimized, O(n²) brute force
 * - Space: O(n) optimized, O(1) brute force
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
  detailedDescription: "🎯 **The Classic Two Sum Challenge**\nFind two numbers in an array that add up to a target sum and return their indices. This foundational problem appears in virtually every coding interview!\n\n🔍 **Problem Breakdown:**\n• Given: `[2, 7, 11, 15]` and target `9`\n• Find: Indices where numbers sum to target\n• Return: `[0, 1]` (because `2 + 7 = 9`)\n\n⚡ **Two Solution Strategies:**\n• **Brute Force:** Check every pair → O(n²) time, O(1) space\n• **Hash Map:** Single pass with lookups → O(n) time, O(n) space\n\n🧠 **Key Learning Concepts:**\n• Time vs Space complexity trade-offs\n• Hash table optimization patterns\n• Array indexing and iteration strategies\n• Interview problem-solving methodology\n\n🚀 **Why This Matters:**\n• Foundation for more complex sum problems (3Sum, 4Sum)\n• Demonstrates hash map optimization techniques\n• Tests ability to recognize algorithmic improvements\n• Common technical interview screening question",
  concepts: ["array iteration", "hash maps", "brute-force"],
  timeComplexity: "O(n) for hash map, O(n²) for brute-force",
  spaceComplexity: "O(n) for hash map, O(1) for brute-force",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "twoSum",
    tabName: "Hash Map",
    approach: "Single-pass hash table",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "twoSumBruteForce",
    tabName: "Brute Force",
    approach: "Nested loop search",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    type: "function"
  }
];

export const examples: ExampleCase[] = [
  { input: [[2, 7, 11, 15], 9], output: [0, 1], description: "Basic" },
  { input: [[3, 2, 4], 6], output: [1, 2], description: "Not at start" },
  { input: [[3, 3], 6], output: [0, 1], description: "Duplicates" },
  { input: [[1, 2, 3], 10], output: new Error("No two numbers sum to the target"), description: "No solution" },
  { input: [[1], 2], output: new Error("Input must be an array with at least two numbers"), description: "Too short" },
  { input: [null, 5], output: new Error("Input must be an array with at least two numbers"), description: "Invalid" }
];

const twoSumModule = { twoSum, twoSumBruteForce, metadata, solutions, examples };
export default twoSumModule;
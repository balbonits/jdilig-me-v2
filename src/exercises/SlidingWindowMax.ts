import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🪟 Sliding Window Maximum - Advanced Data Stream Processing
 * 
 * DESCRIPTION:
 * 📊 **The Real-Time Analytics Champion**
 * Sliding Window Maximum efficiently finds the maximum value in every k-sized window as it slides through an array. This technique is essential for real-time data processing, streaming analytics, and time-series analysis!
 * 
 * 🧠 **The Window Strategy:**
 * • **Window Movement:** Fixed-size window slides one position at a time
 * • **Maximum Tracking:** Find peak value in current window efficiently  
 * • **Continuous Processing:** Handle streaming data without recomputation
 * • **Optimal Complexity:** Achieve O(n) time using clever data structures
 * 
 * ⚡ **Two Strategic Approaches:**
 * • **Monotonic Deque:** Advanced O(n) solution using double-ended queue
 * • **Brute Force:** Simple O(n*k) approach examining each window directly
 * 
 * 🚀 **Real-World Applications:**
 * • **Stock Trading:** Track maximum prices in sliding time windows
 * • **System Monitoring:** Find peak CPU/memory usage in time intervals
 * • **Signal Processing:** Detect maximum amplitude in audio/video streams
 * • **Gaming Analytics:** Track highest scores in rolling time periods
 * • **IoT Sensors:** Monitor maximum temperature/pressure readings
 * 
 * 💡 **Learning Value:**
 * • Advanced sliding window technique for optimization
 * • Monotonic deque data structure and its applications
 * • Amortized time complexity analysis
 * • Stream processing algorithm design patterns
 * 
 * PERFORMANCE:
 * - Time: O(n) with deque approach, O(n*k) brute force
 * - Space: O(k) for deque storage, O(1) for brute force
 * 
 * Two implementations show advanced deque optimization vs simple brute force.
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
  detailedDescription: "📊 **The Real-Time Analytics Champion**\nSliding Window Maximum efficiently finds the maximum value in every k-sized window as it slides through an array. This technique is essential for real-time data processing, streaming analytics, and time-series analysis!\n\n🧠 **The Window Strategy:**\n• **Window Movement:** Fixed-size window slides one position at a time\n• **Maximum Tracking:** Find peak value in current window efficiently\n• **Continuous Processing:** Handle streaming data without recomputation\n• **Optimal Complexity:** Achieve O(n) time using clever data structures\n\n⚡ **Two Strategic Approaches:**\n• **Monotonic Deque:** Advanced O(n) solution using double-ended queue\n• **Brute Force:** Simple O(n*k) approach examining each window directly\n\n🚀 **Real-World Applications:**\n• **Stock Trading:** Track maximum prices in sliding time windows\n• **System Monitoring:** Find peak CPU/memory usage in time intervals\n• **Signal Processing:** Detect maximum amplitude in audio/video streams\n• **Gaming Analytics:** Track highest scores in rolling time periods\n• **IoT Sensors:** Monitor maximum temperature/pressure readings\n\n💡 **Learning Value:**\n• Advanced sliding window technique for optimization\n• Monotonic deque data structure and its applications\n• Amortized time complexity analysis\n• Stream processing algorithm design patterns",
  concepts: ["sliding window", "deque", "brute-force"],
  timeComplexity: "O(n) for deque, O(n*k) for brute force",
  spaceComplexity: "O(n)",
  difficulty: "Hard"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "slidingWindowMax",
    tabName: "Deque",
    approach: "Monotonic deque approach",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "slidingWindowMaxBrute",
    tabName: "Brute Force",
    approach: "Nested loop for each window",
    timeComplexity: "O(n*k)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    type: "function"
  }
];

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
const exerciseModule = {
  slidingWindowMax,
  slidingWindowMaxBrute,
  metadata,
  solutions,
  examples
};

export default exerciseModule;
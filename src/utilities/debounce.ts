import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * ⏱️ Debounce Utility Implementation - Performance Optimization Essential
 * 
 * DESCRIPTION:
 * Debouncing prevents functions from firing too frequently by delaying execution until
 * a quiet period. This critical performance optimization technique is essential for
 * handling rapid user interactions without overwhelming the system.
 * 
 * HOW DEBOUNCING WORKS:
 * • User types → Timer starts
 * • User types again → Timer resets  
 * • User stops → Function executes after delay
 * • Result: Function runs once instead of dozens of times
 * 
 * IMPLEMENTATION VARIANTS:
 * • Standard Debounce: Waits for quiet period before execution
 * • Immediate Debounce: Executes immediately, then prevents subsequent calls
 * 
 * COMMON USE CASES:
 * • Search Input: debounce(searchAPI, 300) - Wait for user to stop typing
 * • Window Resize: debounce(handleResize, 100) - Avoid layout thrashing
 * • API Calls: debounce(saveData, 500) - Prevent duplicate requests
 * • Scroll Events: debounce(updateScrollPosition, 50) - Smooth performance
 * 
 * PERFORMANCE IMPACT:
 * • Reduces function calls by 90%+ in rapid-fire scenarios
 * • Prevents unnecessary API requests and DOM updates
 * • Improves perceived performance and user experience
 * • Essential for production-ready applications
 * 
 * PERFORMANCE:
 * - Time: O(1) per call
 * - Space: O(1) per debounced function
 */

// Function type that can be debounced
export type DebouncableFunction = (...args: (string | number | boolean | Event)[]) => void | Promise<void>;

export function debounce<T extends DebouncableFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  if (typeof func !== 'function') throw new Error("First argument must be a function");
  if (!Number.isInteger(wait) || wait < 0) throw new Error("Wait time must be a non-negative integer");
  
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Alternative implementation with immediate execution option
export function debounceImmediate<T extends DebouncableFunction>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  if (typeof func !== 'function') throw new Error("First argument must be a function");
  if (!Number.isInteger(wait) || wait < 0) throw new Error("Wait time must be a non-negative integer");
  
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func(...args);
    }, wait);
    
    if (callNow) func(...args);
  };
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "Debounce Function",
  description: "Delays function execution until a specified wait time has elapsed since the last call, optimizing performance for frequent events",
  detailedDescription: "⏱️ **Performance Optimization Essential**\nDebouncing prevents functions from firing too frequently by delaying execution until a quiet period. Perfect for handling rapid user interactions!\n\n🎯 **How Debouncing Works:**\n• User types → Timer starts\n• User types again → Timer resets\n• User stops → Function executes after delay\n• Result: Function runs once instead of dozens of times\n\n⚡ **Two Implementation Variants:**\n• **Standard Debounce:** Waits for quiet period before execution\n• **Immediate Debounce:** Executes immediately, then prevents subsequent calls\n\n🛠️ **Common Use Cases:**\n• **Search Input:** `debounce(searchAPI, 300)` - Wait for user to stop typing\n• **Window Resize:** `debounce(handleResize, 100)` - Avoid layout thrashing\n• **API Calls:** `debounce(saveData, 500)` - Prevent duplicate requests\n• **Scroll Events:** `debounce(updateScrollPosition, 50)` - Smooth performance\n\n🚀 **Performance Impact:**\n• Reduces function calls by 90%+ in rapid-fire scenarios\n• Prevents unnecessary API requests and DOM updates\n• Improves perceived performance and user experience\n• Essential for production-ready applications",
  category: "Performance",
  concepts: ["closures", "higher-order functions", "event optimization", "performance"],
  timeComplexity: "O(1) per call",
  spaceComplexity: "O(1) per debounced function",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "debounce",
    tabName: "Standard",
    approach: "Basic debounce with timeout clearing",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "debounceImmediate",
    tabName: "Immediate",
    approach: "Debounce with optional immediate execution",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "(function, 300)",
    output: "debounced function",
    description: "Basic debounce for search input",
    code: `const debouncedSearch = debounce(handleSearch, 300);
input.addEventListener('input', (e) => debouncedSearch(e.target.value));

// Function will only execute 300ms after the last input event`
  },
  {
    input: "(function, 200)",
    output: "debounced function",
    description: "Optimize window resize events",
    code: `const debouncedResize = debounce(updateLayout, 200);
window.addEventListener('resize', debouncedResize);

// Layout updates only after resize events stop for 200ms`
  },
  {
    input: "(function, 500, true)",
    output: "debounced function",
    description: "Immediate execution with debounce",
    code: `const debouncedSubmit = debounceImmediate(submitForm, 500, true);
button.addEventListener('click', debouncedSubmit);

// Executes immediately, then prevents subsequent calls for 500ms`
  },
  {
    input: "(function, 1000)",
    output: "debounced function", 
    description: "API rate limiting",
    code: `const debouncedApiCall = debounce(fetchData, 1000);
searchInput.addEventListener('input', () => debouncedApiCall(query));

// API calls limited to maximum once per second`
  }
];

// Default export for easy importing
const utilityModule = {
  debounce,
  debounceImmediate,
  metadata,
  solutions,
  examples
};

export default utilityModule;
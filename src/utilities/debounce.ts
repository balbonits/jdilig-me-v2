import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * Debounce Utility Implementation
 * 
 * DESCRIPTION:
 * Delays function execution until a specified wait time has elapsed since the last call.
 * Useful for rate-limiting event handlers like scroll, resize, or input events.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Easy (straightforward closure pattern)
 * - Solution Type: function (higher-order function implementation)
 * - Time Complexity: O(1) per call
 * - Space Complexity: O(1) per debounced function
 * - Concepts: Closures, Higher-order functions, Event optimization, Performance
 * - Category: Performance optimization utility
 * 
 * EXAMPLE:
 * debounce(handleSearch, 300) → Returns function that delays handleSearch by 300ms
 * 
 * CONCEPTS:
 * - Closures and lexical scoping
 * - Higher-order functions
 * - Event optimization
 * - Performance optimization
 * 
 * PERFORMANCE:
 * - Time: O(1) per call
 * - Space: O(1) per debounced function
 * 
 * Multiple implementations included to show different approaches.
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
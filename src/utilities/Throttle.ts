import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * Throttle Utility Implementation
 * 
 * DESCRIPTION:
 * Limits function execution to at most once per specified time period.
 * Unlike debounce, throttle ensures regular execution during continuous events.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Easy (closure pattern with timing control)
 * - Solution Type: function (higher-order function implementation)
 * - Time Complexity: O(1) per call
 * - Space Complexity: O(1) per throttled function
 * - Concepts: Closures, Higher-order functions, Rate limiting, Performance
 * - Category: Performance optimization utility
 * 
 * EXAMPLE:
 * throttle(handleScroll, 100) → Executes handleScroll max once per 100ms
 * 
 * CONCEPTS:
 * - Closures and lexical scoping
 * - Higher-order functions
 * - Rate limiting vs debouncing
 * - Performance optimization
 * 
 * PERFORMANCE:
 * - Time: O(1) per call
 * - Space: O(1) per throttled function
 * 
 * Multiple implementations included to show different approaches.
 */

// Function type that can be throttled
export type ThrottlableFunction = (...args: (string | number | boolean | Event)[]) => void | Promise<void>;

export function throttle<T extends ThrottlableFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  if (typeof func !== 'function') throw new Error("First argument must be a function");
  if (!Number.isInteger(wait) || wait < 0) throw new Error("Wait time must be a non-negative integer");
  
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      func(...args);
    }
  };
}

// Alternative implementation with leading and trailing options
export function throttleAdvanced<T extends ThrottlableFunction>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  if (typeof func !== 'function') throw new Error("First argument must be a function");
  if (!Number.isInteger(wait) || wait < 0) throw new Error("Wait time must be a non-negative integer");
  
  const { leading = true, trailing = true } = options;
  let timeout: NodeJS.Timeout | null = null;
  let lastCall = 0;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    lastArgs = args;

    if (!lastCall && leading === false) {
      lastCall = now;
    }

    const remaining = wait - (now - lastCall);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCall = now;
      func(...args);
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        lastCall = leading === false ? 0 : Date.now();
        timeout = null;
        if (lastArgs) func(...lastArgs);
      }, remaining);
    }
  };
}

// Simple throttle with immediate execution
export function throttleImmediate<T extends ThrottlableFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  if (typeof func !== 'function') throw new Error("First argument must be a function");
  if (!Number.isInteger(wait) || wait < 0) throw new Error("Wait time must be a non-negative integer");
  
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, wait);
    }
  };
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "Throttle Function",
  description: "Limits function execution to at most once per specified time period, ensuring regular execution during continuous events",
  category: "Performance",
  concepts: ["closures", "higher-order functions", "rate limiting", "performance"],
  timeComplexity: "O(1) per call",
  spaceComplexity: "O(1) per throttled function",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "throttle",
    tabName: "Standard",
    approach: "Basic throttle with timestamp checking",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "throttleAdvanced",
    tabName: "Advanced",
    approach: "Throttle with leading/trailing execution options",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "throttleImmediate",
    tabName: "Immediate",
    approach: "Simple throttle with immediate execution flag",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "(function, 100)",
    output: "throttled function",
    description: "Scroll event optimization",
    code: `const throttledScroll = throttle(handleScroll, 100);
window.addEventListener('scroll', throttledScroll);

// handleScroll executes maximum once per 100ms during scrolling`
  },
  {
    input: "(function, 250)",
    output: "throttled function",
    description: "Button click protection",
    code: `const throttledSubmit = throttle(submitForm, 250);
button.addEventListener('click', throttledSubmit);

// Prevents rapid-fire clicks, allows max 4 submissions per second`
  },
  {
    input: "(function, 500, options)",
    output: "throttled function",
    description: "Advanced throttle with options",
    code: `const throttledResize = throttleAdvanced(updateLayout, 500, {
  leading: true,
  trailing: false
});
window.addEventListener('resize', throttledResize);

// Executes immediately, then ignores calls for 500ms`
  },
  {
    input: "(function, 1000)",
    output: "throttled function",
    description: "API request rate limiting",
    code: `const throttledApi = throttleImmediate(fetchData, 1000);
searchInput.addEventListener('input', () => throttledApi(query));

// API calls limited to once per second maximum`
  }
];

// Default export for easy importing
const utilityModule = {
  throttle,
  throttleAdvanced,
  throttleImmediate,
  metadata,
  solutions,
  examples
};

export default utilityModule;
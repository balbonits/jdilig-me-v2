import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * ⏱️ Throttle - Smart Rate Limiting Control
 * 
 * DESCRIPTION:
 * 🎛️ **Steady Stream vs Delayed Burst**
 * Throttle ensures functions execute at regular intervals during continuous events, while debounce waits for silence. Think of throttle as a "heartbeat" that guarantees consistent execution!
 * 
 * 🔄 **Throttle vs Debounce:**
 * • **Throttle:** Executes every X milliseconds during activity (steady stream)
 * • **Debounce:** Waits for X milliseconds of inactivity before executing (delayed burst)
 * • **Use Throttle:** When you need regular updates (scroll position, resize events)
 * • **Use Debounce:** When you want to wait for user to finish (search input, button spam)
 * 
 * ⚡ **How Throttling Works:**
 * • Set a time window (e.g., 100ms)
 * • Execute function immediately on first call
 * • Ignore subsequent calls within the time window
 * • Reset timer after window expires
 * • Guarantees maximum execution frequency
 * 
 * 🛠️ **Three Implementation Strategies:**
 * • **Standard Throttle:** Simple timestamp-based rate limiting
 * • **Advanced Throttle:** Configurable leading/trailing execution options
 * • **Immediate Throttle:** Boolean flag approach for instant feedback
 * 
 * 🎯 **Perfect Use Cases:**
 * • **Scroll Events:** Update scroll position indicators smoothly
 * • **Resize Handlers:** Recalculate layouts without overwhelming the browser
 * • **Mouse Movement:** Track cursor position with controlled frequency
 * • **Button Clicks:** Prevent rapid-fire submissions while staying responsive
 * 
 * 🚀 **Performance Benefits:**
 * • Reduces CPU load from excessive function calls
 * • Maintains smooth user experience during interactions
 * • Prevents browser lag from overwhelming event handlers
 * • Optimizes API request frequency and bandwidth usage
 * 
 * PERFORMANCE:
 * - Time: O(1) per call - constant time rate limiting
 * - Space: O(1) per throttled function - minimal memory overhead
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
  detailedDescription: "⏱️ **Steady Stream vs Delayed Burst**\nThrottle ensures functions execute at regular intervals during continuous events, while debounce waits for silence. Think of throttle as a 'heartbeat' that guarantees consistent execution!\n\n🔄 **Throttle vs Debounce:**\n• **Throttle:** Executes every X milliseconds during activity (steady stream)\n• **Debounce:** Waits for X milliseconds of inactivity before executing (delayed burst)\n• **Use Throttle:** When you need regular updates (scroll position, resize events)\n• **Use Debounce:** When you want to wait for user to finish (search input, button spam)\n\n⚡ **How Throttling Works:**\n• Set a time window (e.g., 100ms)\n• Execute function immediately on first call\n• Ignore subsequent calls within the time window\n• Reset timer after window expires\n• Guarantees maximum execution frequency\n\n🛠️ **Three Implementation Strategies:**\n• **Standard Throttle:** Simple timestamp-based rate limiting\n• **Advanced Throttle:** Configurable leading/trailing execution options\n• **Immediate Throttle:** Boolean flag approach for instant feedback\n\n🎯 **Perfect Use Cases:**\n• **Scroll Events:** Update scroll position indicators smoothly\n• **Resize Handlers:** Recalculate layouts without overwhelming the browser\n• **Mouse Movement:** Track cursor position with controlled frequency\n• **Button Clicks:** Prevent rapid-fire submissions while staying responsive\n\n🚀 **Performance Benefits:**\n• Reduces CPU load from excessive function calls\n• Maintains smooth user experience during interactions\n• Prevents browser lag from overwhelming event handlers\n• Optimizes API request frequency and bandwidth usage",
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
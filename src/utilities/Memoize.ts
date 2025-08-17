import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * 🧠 Memoize - The Performance Memory Palace
 * 
 * DESCRIPTION:
 * ⚡ **The Speed Optimization Master**
 * Memoization transforms slow functions into lightning-fast cached versions by remembering previous results! Essential for optimizing expensive calculations, recursive algorithms, and API calls without changing function behavior.
 * 
 * 🧠 **The Caching Strategy:**
 * • **Result Storage:** Cache function outputs keyed by input parameters
 * • **Instant Retrieval:** O(1) lookups for previously computed results
 * • **Transparent Operation:** Memoized functions work exactly like originals
 * • **Memory Management:** Advanced strategies prevent cache bloat and memory leaks
 * 
 * ⚡ **Three Strategic Approaches:**
 * • **Basic Cache:** Simple Map-based caching with unlimited growth
 * • **LRU Cache:** Least-Recently-Used eviction prevents memory overflow
 * • **TTL Cache:** Time-based expiration for dynamic or time-sensitive data
 * 
 * 🚀 **Real-World Applications:**
 * • **Fibonacci/Factorial:** Transform O(2^n) recursive algorithms to O(n)
 * • **API Responses:** Cache expensive network requests and database queries
 * • **Complex Calculations:** Scientific computing, mathematical functions
 * • **React Optimization:** useMemo() hook for expensive component calculations
 * • **Image Processing:** Cache filtered/transformed image results
 * • **Search Results:** Cache query results for instant re-display
 * 
 * 💡 **Learning Value:**
 * • Higher-order functions and closures in JavaScript
 * • Cache management strategies and trade-offs
 * • Performance optimization without algorithm changes
 * • Memory management and garbage collection awareness
 * • Pure function requirements for safe memoization
 * 
 * PERFORMANCE:
 * - Time: O(1) for cache hits, O(f) for original function execution
 * - Space: O(n) where n is number of unique input combinations cached
 * 
 * Three implementations show basic caching, LRU eviction, and TTL expiration strategies.
 */

// Basic memoize implementation
export function memoize<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
  keyGenerator?: (...args: Args) => string
): (...args: Args) => Return {
  if (typeof fn !== 'function') throw new Error("First argument must be a function");
  
  const cache = new Map<string, Return>();
  
  const generateKey = keyGenerator || ((...args: Args) => JSON.stringify(args));
  
  return (...args: Args): Return => {
    const key = generateKey(...args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Memoize with LRU cache to prevent memory leaks
export function memoizeLRU<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
  maxSize: number = 100,
  keyGenerator?: (...args: Args) => string
): (...args: Args) => Return {
  if (typeof fn !== 'function') throw new Error("First argument must be a function");
  if (!Number.isInteger(maxSize) || maxSize <= 0) throw new Error("Max size must be a positive integer");
  
  const cache = new Map<string, Return>();
  const generateKey = keyGenerator || ((...args: Args) => JSON.stringify(args));
  
  return (...args: Args): Return => {
    const key = generateKey(...args);
    
    if (cache.has(key)) {
      // Move to end (most recently used)
      const value = cache.get(key)!;
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn(...args);
    
    // Remove oldest if at capacity
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }
    
    cache.set(key, result);
    return result;
  };
}

// Memoize with TTL (Time To Live)
export function memoizeTTL<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
  ttlMs: number = 60000,
  keyGenerator?: (...args: Args) => string
): (...args: Args) => Return {
  if (typeof fn !== 'function') throw new Error("First argument must be a function");
  if (!Number.isInteger(ttlMs) || ttlMs <= 0) throw new Error("TTL must be a positive integer");
  
  const cache = new Map<string, { value: Return; timestamp: number }>();
  const generateKey = keyGenerator || ((...args: Args) => JSON.stringify(args));
  
  return (...args: Args): Return => {
    const key = generateKey(...args);
    const now = Date.now();
    
    if (cache.has(key)) {
      const cached = cache.get(key);
      if (cached && now - cached.timestamp < ttlMs) {
        return cached.value;
      }
      cache.delete(key);
    }
    
    const result = fn(...args);
    cache.set(key, { value: result, timestamp: now });
    return result;
  };
}

// Simple memoize for single-argument functions
export function memoizeSimple<T, R>(fn: (arg: T) => R): (arg: T) => R {
  if (typeof fn !== 'function') throw new Error("Argument must be a function");
  
  const cache = new Map<T, R>();
  
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "Memoize Function",
  description: "Caches function results to avoid expensive recalculations, improving performance for pure functions with predictable inputs",
  detailedDescription: "⚡ **The Speed Optimization Master**\nMemoization transforms slow functions into lightning-fast cached versions by remembering previous results! Essential for optimizing expensive calculations, recursive algorithms, and API calls without changing function behavior.\n\n🧠 **The Caching Strategy:**\n• **Result Storage:** Cache function outputs keyed by input parameters\n• **Instant Retrieval:** O(1) lookups for previously computed results\n• **Transparent Operation:** Memoized functions work exactly like originals\n• **Memory Management:** Advanced strategies prevent cache bloat and memory leaks\n\n⚡ **Three Strategic Approaches:**\n• **Basic Cache:** Simple Map-based caching with unlimited growth\n• **LRU Cache:** Least-Recently-Used eviction prevents memory overflow\n• **TTL Cache:** Time-based expiration for dynamic or time-sensitive data\n\n🚀 **Real-World Applications:**\n• **Fibonacci/Factorial:** Transform O(2^n) recursive algorithms to O(n)\n• **API Responses:** Cache expensive network requests and database queries\n• **Complex Calculations:** Scientific computing, mathematical functions\n• **React Optimization:** useMemo() hook for expensive component calculations\n• **Image Processing:** Cache filtered/transformed image results\n• **Search Results:** Cache query results for instant re-display\n\n💡 **Learning Value:**\n• Higher-order functions and closures in JavaScript\n• Cache management strategies and trade-offs\n• Performance optimization without algorithm changes\n• Memory management and garbage collection awareness\n• Pure function requirements for safe memoization",
  category: "Performance",
  concepts: ["closures", "caching", "performance optimization", "pure functions"],
  timeComplexity: "O(1) for cache hits, O(f) for new calculations",
  spaceComplexity: "O(n) where n is unique argument combinations",
  difficulty: "Medium"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "memoize",
    tabName: "Basic",
    approach: "Simple memoization with Map-based cache",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "memoizeLRU",
    tabName: "LRU",
    approach: "LRU cache to prevent unlimited memory growth",
    timeComplexity: "O(1)",
    spaceComplexity: "O(k)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "memoizeTTL",
    tabName: "TTL",
    approach: "Time-based cache expiration for fresh data",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "memoizeSimple",
    tabName: "Simple",
    approach: "Optimized memoization for single-argument functions",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "fibonacci(40)",
    output: "102334155",
    description: "Recursive function optimization",
    code: `const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const memoizedFib = memoize(fibonacci);

// Without memoization: ~1.5 seconds
// With memoization: ~1 millisecond
console.time('memoized');
memoizedFib(40); // 102334155
console.timeEnd('memoized');`
  },
  {
    input: "apiCall('users')",
    output: "cached data",
    description: "API response caching with TTL",
    code: `const fetchUsers = async (endpoint: string) => {
  const response = await fetch(\`/api/\${endpoint}\`);
  return response.json();
};

const cachedFetch = memoizeTTL(fetchUsers, 60000); // 1 minute cache

// First call: makes HTTP request
await cachedFetch('users');

// Subsequent calls within 1 minute: returns cached data
await cachedFetch('users'); // No HTTP request made`
  },
  {
    input: "expensiveCalc(data)",
    output: "result",
    description: "LRU cache for memory management",
    code: `const processLargeDataset = (data: unknown[]) => {
  // Expensive computation
  return data.reduce((acc, item) => 
    acc + complexCalculation(item), 0);
};

const memoizedProcess = memoizeLRU(processLargeDataset, 50);

// Only keeps 50 most recent results in memory
for (let i = 0; i < 100; i++) {
  memoizedProcess(generateData(i));
}
// Memory usage stays constant`
  },
  {
    input: "hash('password')",
    output: "hashed value",
    description: "Simple memoization for single arguments",
    code: `const expensiveHash = (input: string) => {
  // Simulate expensive hashing operation
  let hash = 0;
  for (let i = 0; i < input.length * 1000; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i % input.length)) & 0xffffffff;
  }
  return hash.toString(16);
};

const memoizedHash = memoizeSimple(expensiveHash);

// First call: performs expensive calculation
memoizedHash('password123'); // Takes time

// Subsequent calls: instant return
memoizedHash('password123'); // Instant`
  }
];

// Default export for easy importing
const utilityModule = {
  memoize,
  memoizeLRU,
  memoizeTTL,
  memoizeSimple,
  metadata,
  solutions,
  examples
};

export default utilityModule;
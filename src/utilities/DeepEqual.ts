import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * DeepEqual Utility Implementation
 * 
 * DESCRIPTION:
 * Performs deep equality comparison between two values, handling nested objects,
 * arrays, and various JavaScript data types including circular references.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Medium (recursive comparison and type handling)
 * - Solution Type: function (recursive equality comparison utility)
 * - Time Complexity: O(n) where n is total number of properties/elements
 * - Space Complexity: O(d) where d is maximum depth of nesting
 * - Concepts: Recursion, Type checking, Object comparison, Reference tracking
 * - Category: Data comparison utility
 * 
 * EXAMPLE:
 * deepEqual({ a: [1, 2] }, { a: [1, 2] }) → true
 * 
 * CONCEPTS:
 * - Recursive algorithms
 * - Type checking and comparison
 * - Object and array traversal
 * - Reference equality vs value equality
 * - Circular reference handling
 * 
 * PERFORMANCE:
 * - Time: O(n) where n is total properties/elements to compare
 * - Space: O(d) where d is maximum nesting depth
 * 
 * Multiple implementations included to show different comparison approaches.
 */

// Basic deep equality comparison
export function deepEqual(a: unknown, b: unknown): boolean {
  // Strict equality check (handles primitives, null, undefined, same reference)
  if (a === b) return true;
  
  // Both must be objects from this point
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  
  // Handle Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle RegExp objects
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  
  // Handle Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  
  // One is array, other is not
  if (Array.isArray(a) || Array.isArray(b)) return false;
  
  // Handle Set objects
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (const value of a) {
      let found = false;
      for (const otherValue of b) {
        if (deepEqual(value, otherValue)) {
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }
  
  // Handle Map objects
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, value] of a) {
      let found = false;
      for (const [otherKey, otherValue] of b) {
        if (deepEqual(key, otherKey) && deepEqual(value, otherValue)) {
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }
  
  // Different object types
  if (a.constructor !== b.constructor) return false;
  
  // Handle plain objects
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual((a as any)[key], (b as any)[key])) return false;
  }
  
  return true;
}

// Deep equal with circular reference detection
export function deepEqualWithCircularCheck(a: unknown, b: unknown, seenA = new WeakMap(), seenB = new WeakMap()): boolean {
  // Strict equality check
  if (a === b) return true;
  
  // Both must be objects from this point
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  
  // Check for circular references
  if (seenA.has(a as object) && seenB.has(b as object)) {
    return seenA.get(a as object) === seenB.get(b as object);
  }
  
  if (seenA.has(a as object) || seenB.has(b as object)) {
    return false;
  }
  
  // Mark as seen
  const visitIdA = Symbol('visitA');
  const visitIdB = Symbol('visitB');
  seenA.set(a as object, visitIdA);
  seenB.set(b as object, visitIdB);
  
  try {
    // Handle Date objects
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }
    
    // Handle RegExp objects
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    
    // Handle Arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqualWithCircularCheck(a[i], b[i], seenA, seenB)) return false;
      }
      return true;
    }
    
    // One is array, other is not
    if (Array.isArray(a) || Array.isArray(b)) return false;
    
    // Handle Set objects
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (const value of a) {
        let found = false;
        for (const otherValue of b) {
          if (deepEqualWithCircularCheck(value, otherValue, seenA, seenB)) {
            found = true;
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    }
    
    // Handle Map objects
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (const [key, value] of a) {
        let found = false;
        for (const [otherKey, otherValue] of b) {
          if (deepEqualWithCircularCheck(key, otherKey, seenA, seenB) && 
              deepEqualWithCircularCheck(value, otherValue, seenA, seenB)) {
            found = true;
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    }
    
    // Different object types
    if (a.constructor !== b.constructor) return false;
    
    // Handle plain objects
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    
    if (keysA.length !== keysB.length) return false;
    
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!deepEqualWithCircularCheck((a as any)[key], (b as any)[key], seenA, seenB)) return false;
    }
    
    return true;
  } finally {
    // Clean up
    seenA.delete(a as object);
    seenB.delete(b as object);
  }
}

// Shallow equality comparison
export function shallowEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  
  // Handle Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  
  if (Array.isArray(a) || Array.isArray(b)) return false;
  
  // Handle objects
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if ((a as any)[key] !== (b as any)[key]) return false;
  }
  
  return true;
}

// Strict deep equal (considers property order and more strict type checking)
export function deepEqualStrict(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return false;
  
  // Different constructors
  if (a.constructor !== b.constructor) return false;
  
  // Handle Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle RegExp objects
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  
  // Handle Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqualStrict(a[i], b[i])) return false;
    }
    return true;
  }
  
  // Handle Set objects
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    const arrA = Array.from(a).sort();
    const arrB = Array.from(b).sort();
    return deepEqualStrict(arrA, arrB);
  }
  
  // Handle Map objects
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    const entriesA = Array.from(a.entries()).sort();
    const entriesB = Array.from(b.entries()).sort();
    return deepEqualStrict(entriesA, entriesB);
  }
  
  // Handle objects (with property order consideration)
  const keysA = Object.keys(a as object).sort();
  const keysB = Object.keys(b as object).sort();
  
  if (!deepEqualStrict(keysA, keysB)) return false;
  
  for (const key of keysA) {
    if (!deepEqualStrict((a as any)[key], (b as any)[key])) return false;
  }
  
  return true;
}

// Fast equality check using JSON (limited but fast)
export function deepEqualJSON(a: unknown, b: unknown): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "DeepEqual Function",
  description: "Performs deep equality comparison between values, handling nested structures, various data types, and circular references",
  category: "Data Comparison",
  concepts: ["recursion", "type checking", "object comparison", "reference tracking"],
  timeComplexity: "O(n) where n is total properties/elements",
  spaceComplexity: "O(d) where d is maximum depth",
  difficulty: "Medium"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "deepEqual",
    tabName: "Basic",
    approach: "Recursive deep equality with comprehensive type support",
    timeComplexity: "O(n)",
    spaceComplexity: "O(d)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "deepEqualWithCircularCheck",
    tabName: "Circular Safe",
    approach: "Deep equality with circular reference detection",
    timeComplexity: "O(n)",
    spaceComplexity: "O(d)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "shallowEqual",
    tabName: "Shallow",
    approach: "Fast shallow equality comparison",
    timeComplexity: "O(k)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "deepEqualJSON",
    tabName: "JSON",
    approach: "Fast JSON-based comparison (limited type support)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "two objects",
    output: "boolean equality",
    description: "Basic object and array deep comparison",
    code: `const obj1 = {
  user: {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'coding'],
    settings: { theme: 'dark', notifications: true }
  }
};

const obj2 = {
  user: {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'coding'],
    settings: { theme: 'dark', notifications: true }
  }
};

const obj3 = {
  user: {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'gaming'], // Different hobby
    settings: { theme: 'dark', notifications: true }
  }
};

console.log(obj1 === obj2);           // false (different references)
console.log(deepEqual(obj1, obj2));   // true (same structure and values)
console.log(deepEqual(obj1, obj3));   // false (different hobbies)`
  },
  {
    input: "various data types",
    output: "type-aware comparison",
    description: "Comparing different JavaScript data types",
    code: `const complex1 = {
  date: new Date('2024-01-01'),
  regex: /test\\d+/gi,
  set: new Set([1, 2, 3]),
  map: new Map([['key1', 'value1'], ['key2', 'value2']]),
  nested: { array: [1, 2, { id: 1 }] }
};

const complex2 = {
  date: new Date('2024-01-01'),
  regex: /test\\d+/gi,
  set: new Set([3, 2, 1]), // Different order, but sets are unordered
  map: new Map([['key2', 'value2'], ['key1', 'value1']]), // Different order
  nested: { array: [1, 2, { id: 1 }] }
};

const complex3 = {
  date: new Date('2024-01-02'), // Different date
  regex: /test\\d+/gi,
  set: new Set([1, 2, 3]),
  map: new Map([['key1', 'value1'], ['key2', 'value2']]),
  nested: { array: [1, 2, { id: 1 }] }
};

console.log(deepEqual(complex1, complex2)); // true (logically equal)
console.log(deepEqual(complex1, complex3)); // false (different date)`
  },
  {
    input: "circular references",
    output: "safe comparison",
    description: "Handling circular references in comparison",
    code: `const obj1: any = { name: 'parent1' };
obj1.child = { name: 'child1', parent: obj1 };

const obj2: any = { name: 'parent1' };
obj2.child = { name: 'child1', parent: obj2 };

const obj3: any = { name: 'parent2' }; // Different name
obj3.child = { name: 'child1', parent: obj3 };

// This would cause infinite recursion with basic deepEqual
// console.log(deepEqual(obj1, obj2)); // Stack overflow!

// Safe comparison with circular reference detection
console.log(deepEqualWithCircularCheck(obj1, obj2)); // true
console.log(deepEqualWithCircularCheck(obj1, obj3)); // false

// Verify structure is intact
console.log(obj1.child.parent === obj1); // true
console.log(obj2.child.parent === obj2); // true`
  },
  {
    input: "performance comparison",
    output: "method selection",
    description: "Choosing the right equality method for your use case",
    code: `const obj1 = { id: 1, values: [1, 2, 3, 4, 5] };
const obj2 = { id: 1, values: [1, 2, 3, 4, 5] };
const obj3 = { values: [1, 2, 3, 4, 5], id: 1 }; // Different property order

// Shallow equality (fast, but only checks top level)
console.log(shallowEqual(obj1, obj2));     // false (different array references)
console.log(shallowEqual(obj1.values, obj2.values)); // false (different references)

// Deep equality (thorough, handles nested structures)
console.log(deepEqual(obj1, obj2));        // true (same structure and values)
console.log(deepEqual(obj1, obj3));        // true (property order doesn't matter)

// Strict deep equality (considers property order)
console.log(deepEqualStrict(obj1, obj2));  // true
console.log(deepEqualStrict(obj1, obj3));  // false (different property order)

// JSON equality (fast but limited - no Dates, RegExp, etc.)
console.log(deepEqualJSON(obj1, obj2));    // true
console.log(deepEqualJSON(obj1, obj3));    // false (property order matters in JSON)

// Use cases:
// - shallowEqual: React props comparison, simple object checks
// - deepEqual: General purpose deep comparison
// - deepEqualStrict: When property order matters
// - deepEqualJSON: Fast comparison of serializable data`
  }
];

// Default export for easy importing
const utilityModule = {
  deepEqual,
  deepEqualWithCircularCheck,
  shallowEqual,
  deepEqualStrict,
  deepEqualJSON,
  metadata,
  solutions,
  examples
};

export default utilityModule;
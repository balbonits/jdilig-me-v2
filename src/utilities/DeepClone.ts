import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * DeepClone Utility Implementation
 * 
 * DESCRIPTION:
 * Creates deep copies of objects and arrays without external dependencies.
 * Handles nested structures, circular references, and various JavaScript types.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Medium (recursive patterns and type handling)
 * - Solution Type: function (recursive deep copying utility)
 * - Time Complexity: O(n) where n is total number of properties/elements
 * - Space Complexity: O(d) where d is maximum depth of nesting
 * - Concepts: Recursion, Object traversal, Type checking, Memory management
 * - Category: Data manipulation utility
 * 
 * EXAMPLE:
 * deepClone({ a: { b: [1, 2] } }) → Independent copy with same structure
 * 
 * CONCEPTS:
 * - Recursive algorithms
 * - Object and array traversal
 * - Type checking and handling
 * - Circular reference detection
 * - Memory management
 * 
 * PERFORMANCE:
 * - Time: O(n) where n is total properties/elements
 * - Space: O(d) where d is maximum nesting depth
 * 
 * Multiple implementations included to show different approaches.
 */

// Basic deep clone implementation
export function deepClone<T>(obj: T): T {
  // Handle primitive types and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    obj.forEach(value => clonedSet.add(deepClone(value)));
    return clonedSet as T;
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    obj.forEach((value, key) => clonedMap.set(deepClone(key), deepClone(value)));
    return clonedMap as T;
  }
  
  // Handle plain objects
  if (obj.constructor === Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (clonedObj as any)[key] = deepClone((obj as any)[key]);
      }
    }
    return clonedObj;
  }
  
  // For other objects, return as-is (functions, classes, etc.)
  return obj;
}

// Deep clone with circular reference detection
export function deepCloneWithCircularCheck<T>(obj: T, seen = new WeakMap()): T {
  // Handle primitive types and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Check for circular reference
  if (seen.has(obj as object)) {
    return seen.get(obj as object);
  }
  
  // Handle Date
  if (obj instanceof Date) {
    const cloned = new Date(obj.getTime()) as T;
    seen.set(obj as object, cloned);
    return cloned;
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    const cloned = new RegExp(obj.source, obj.flags) as T;
    seen.set(obj as object, cloned);
    return cloned;
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const clonedArray: unknown[] = [];
    seen.set(obj as object, clonedArray);
    obj.forEach((item, index) => {
      clonedArray[index] = deepCloneWithCircularCheck(item, seen);
    });
    return clonedArray as T;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    seen.set(obj as object, clonedSet);
    obj.forEach(value => clonedSet.add(deepCloneWithCircularCheck(value, seen)));
    return clonedSet as T;
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    seen.set(obj as object, clonedMap);
    obj.forEach((value, key) => {
      clonedMap.set(
        deepCloneWithCircularCheck(key, seen),
        deepCloneWithCircularCheck(value, seen)
      );
    });
    return clonedMap as T;
  }
  
  // Handle plain objects
  if (obj.constructor === Object) {
    const clonedObj = {} as T;
    seen.set(obj as object, clonedObj);
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (clonedObj as any)[key] = deepCloneWithCircularCheck((obj as any)[key], seen);
      }
    }
    return clonedObj;
  }
  
  // For other objects, return as-is
  seen.set(obj as object, obj);
  return obj;
}

// JSON-based deep clone (fast but limited)
export function deepCloneJSON<T>(obj: T): T {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    throw new Error(`JSON deep clone failed: ${(error as Error).message}`);
  }
}

// Structured clone API (modern browsers/Node.js)
export function deepCloneStructured<T>(obj: T): T {
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(obj);
    } catch (error) {
      throw new Error(`Structured clone failed: ${(error as Error).message}`);
    }
  }
  throw new Error('structuredClone is not available in this environment');
}

// Shallow clone for comparison
export function shallowClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return [...obj] as T;
  }
  
  if (obj instanceof Date) {
    return new Date(obj) as T;
  }
  
  if (obj instanceof Set) {
    return new Set(obj) as T;
  }
  
  if (obj instanceof Map) {
    return new Map(obj) as T;
  }
  
  return { ...obj } as T;
}

// Deep clone with custom options
export interface DeepCloneOptions {
  includeNonEnumerable?: boolean;
  includeSymbols?: boolean;
  maxDepth?: number;
  customCloners?: Map<any, (obj: any) => any>;
}

export function deepCloneCustom<T>(obj: T, options: DeepCloneOptions = {}, depth = 0): T {
  const { 
    includeNonEnumerable = false, 
    includeSymbols = false, 
    maxDepth = 100,
    customCloners = new Map()
  } = options;
  
  // Check max depth
  if (depth > maxDepth) {
    throw new Error(`Maximum cloning depth (${maxDepth}) exceeded`);
  }
  
  // Handle primitive types and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Check for custom cloner
  const constructor = obj.constructor;
  if (customCloners.has(constructor)) {
    return customCloners.get(constructor)(obj);
  }
  
  // Handle built-in types
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as T;
  
  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepCloneCustom(item, options, depth + 1)) as T;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    obj.forEach(value => clonedSet.add(deepCloneCustom(value, options, depth + 1)));
    return clonedSet as T;
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    obj.forEach((value, key) => {
      clonedMap.set(
        deepCloneCustom(key, options, depth + 1),
        deepCloneCustom(value, options, depth + 1)
      );
    });
    return clonedMap as T;
  }
  
  // Handle objects
  const clonedObj = {} as T;
  const keys = includeNonEnumerable 
    ? Object.getOwnPropertyNames(obj)
    : Object.keys(obj);
    
  keys.forEach(key => {
    (clonedObj as any)[key] = deepCloneCustom((obj as any)[key], options, depth + 1);
  });
  
  if (includeSymbols) {
    Object.getOwnPropertySymbols(obj).forEach(symbol => {
      (clonedObj as any)[symbol] = deepCloneCustom((obj as any)[symbol], options, depth + 1);
    });
  }
  
  return clonedObj;
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "DeepClone Function",
  description: "Creates deep copies of objects and arrays handling nested structures, circular references, and various JavaScript types",
  category: "Data Manipulation",
  concepts: ["recursion", "object traversal", "type checking", "memory management"],
  timeComplexity: "O(n) where n is total properties/elements",
  spaceComplexity: "O(d) where d is maximum depth",
  difficulty: "Medium"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "deepClone",
    tabName: "Basic",
    approach: "Recursive deep clone with type handling",
    timeComplexity: "O(n)",
    spaceComplexity: "O(d)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "deepCloneWithCircularCheck",
    tabName: "Circular Safe",
    approach: "Deep clone with circular reference detection",
    timeComplexity: "O(n)",
    spaceComplexity: "O(d)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "deepCloneJSON",
    tabName: "JSON",
    approach: "Fast JSON-based clone (limited type support)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "deepCloneStructured",
    tabName: "Structured",
    approach: "Native structured clone API (modern environments)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "{ a: { b: [1, 2] } }",
    output: "independent copy",
    description: "Basic object and array deep cloning",
    code: `const original = {
  user: {
    name: 'John',
    hobbies: ['reading', 'coding'],
    settings: {
      theme: 'dark',
      notifications: true
    }
  }
};

const cloned = deepClone(original);

// Modify cloned object
cloned.user.name = 'Jane';
cloned.user.hobbies.push('gaming');
cloned.user.settings.theme = 'light';

console.log(original.user.name);           // 'John' (unchanged)
console.log(original.user.hobbies);        // ['reading', 'coding'] (unchanged)
console.log(original.user.settings.theme); // 'dark' (unchanged)

console.log(cloned.user.name);             // 'Jane'
console.log(cloned.user.hobbies);          // ['reading', 'coding', 'gaming']
console.log(cloned.user.settings.theme);   // 'light'`
  },
  {
    input: "circular reference",
    output: "safe clone",
    description: "Handling circular references safely",
    code: `const obj: any = { name: 'parent' };
obj.child = { name: 'child', parent: obj };

// This would cause infinite recursion with basic deepClone
// const broken = deepClone(obj); // Stack overflow!

// Safe cloning with circular reference detection
const safeClone = deepCloneWithCircularCheck(obj);

console.log(safeClone.name);              // 'parent'
console.log(safeClone.child.name);        // 'child'
console.log(safeClone.child.parent === safeClone); // true (maintains reference)

// Modify without affecting original
safeClone.child.name = 'modified child';
console.log(obj.child.name);              // 'child' (unchanged)`
  },
  {
    input: "complex data types",
    output: "type-preserved clone",
    description: "Cloning various JavaScript data types",
    code: `const complexObj = {
  date: new Date('2024-01-01'),
  regex: /test\\d+/gi,
  set: new Set([1, 2, 3]),
  map: new Map([['key1', 'value1'], ['key2', 'value2']]),
  nested: {
    array: [{ id: 1 }, { id: 2 }],
    nullValue: null,
    undefinedValue: undefined
  }
};

const cloned = deepClone(complexObj);

// Verify types are preserved
console.log(cloned.date instanceof Date);     // true
console.log(cloned.regex instanceof RegExp);  // true
console.log(cloned.set instanceof Set);       // true
console.log(cloned.map instanceof Map);       // true

// Verify independence
cloned.set.add(4);
cloned.map.set('key3', 'value3');
cloned.nested.array.push({ id: 3 });

console.log(complexObj.set.size);             // 3 (unchanged)
console.log(complexObj.map.size);             // 2 (unchanged)
console.log(complexObj.nested.array.length);  // 2 (unchanged)`
  },
  {
    input: "performance comparison",
    output: "method selection",
    description: "Choosing the right cloning method for your use case",
    code: `const testData = {
  users: Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: \`User \${i}\`,
    active: i % 2 === 0
  }))
};

// JSON clone: Fastest but limited (no Dates, RegExp, etc.)
console.time('JSON clone');
const jsonCloned = deepCloneJSON(testData);
console.timeEnd('JSON clone');

// Basic deep clone: Good balance of features and performance
console.time('Deep clone');
const deepCloned = deepClone(testData);
console.timeEnd('Deep clone');

// Structured clone: Native browser/Node.js API (most robust)
if (typeof structuredClone === 'function') {
  console.time('Structured clone');
  const structuredCloned = deepCloneStructured(testData);
  console.timeEnd('Structured clone');
}

// Use JSON for simple objects without special types
// Use deepClone for most cases with mixed data types
// Use structuredClone for maximum robustness in modern environments`
  }
];

// Default export for easy importing
const utilityModule = {
  deepClone,
  deepCloneWithCircularCheck,
  deepCloneJSON,
  deepCloneStructured,
  shallowClone,
  deepCloneCustom,
  metadata,
  solutions,
  examples
};

export default utilityModule;
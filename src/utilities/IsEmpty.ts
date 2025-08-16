import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * 🗑️ IsEmpty - Universal Emptiness Detection
 * 
 * DESCRIPTION:
 * 🔍 **The Ultimate "Is It Empty?" Detective**
 * In JavaScript's wild world of types, determining emptiness isn't as simple as checking for falsy values! This utility handles every edge case across all data types, from whitespace-only strings to nested empty objects.
 * 
 * 🎯 **Handles Every JavaScript Type:**
 * • **Primitives:** null, undefined, empty strings, zero, NaN
 * • **Collections:** empty arrays, objects, Maps, Sets
 * • **Edge Cases:** whitespace-only strings, Date objects, functions
 * • **Custom Rules:** configurable strictness for different use cases
 * 
 * 🧮 **Smart Emptiness Rules:**
 * • `null` & `undefined` → empty
 * • `''` & `'   '` → empty (configurable whitespace handling)
 * • `0` & `NaN` → empty (but `false` is not empty!)
 * • `[]` & `{}` → empty
 * • `new Map()` & `new Set()` → empty
 * • Functions & Dates → never empty
 * 
 * ⚡ **Multiple Detection Strategies:**
 * • **Basic isEmpty:** Comprehensive with whitespace trimming
 * • **Strict Mode:** Whitespace-only strings considered non-empty
 * • **Deep Check:** Recursive validation for nested structures
 * • **Type-Specific:** Optimized functions for strings, arrays, objects
 * 
 * 🚀 **Essential for Modern Development:**
 * • **Form Validation:** Check required fields across complex forms
 * • **API Response Validation:** Ensure meaningful data before processing
 * • **Data Filtering:** Remove empty entries from collections
 * • **Conditional Rendering:** Show/hide UI elements based on content
 * • **Business Logic:** Make decisions based on data presence
 * 
 * 📚 **Why This Matters:**
 * • JavaScript's truthiness is confusing and inconsistent
 * • Different empty states require different handling strategies
 * • Type safety and runtime validation are critical
 * • Performance optimization for large-scale data processing
 * 
 * PERFORMANCE:
 * - Time: O(1) for primitives/collections, O(n) for object key counting
 * - Space: O(1) constant memory usage across all implementations
 */

// Basic isEmpty implementation
export function isEmpty(value: unknown): boolean {
  // Null and undefined
  if (value == null) return true;
  
  // Primitive types (boolean, number, symbol)
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return value === 0 || Number.isNaN(value);
  if (typeof value === 'symbol') return false;
  if (typeof value === 'bigint') return value === BigInt(0);
  
  // String
  if (typeof value === 'string') return value.length === 0 || value.trim().length === 0;
  
  // Array
  if (Array.isArray(value)) return value.length === 0;
  
  // Map and Set
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  
  // Date
  if (value instanceof Date) return false;
  
  // Object (including plain objects)
  if (typeof value === 'object') {
    // Check for own enumerable properties
    return Object.keys(value).length === 0;
  }
  
  // Function
  if (typeof value === 'function') return false;
  
  return true;
}

// Strict isEmpty that considers whitespace-only strings as non-empty
export function isEmptyStrict(value: unknown): boolean {
  // Null and undefined
  if (value == null) return true;
  
  // Primitive types
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return value === 0 || Number.isNaN(value);
  if (typeof value === 'symbol') return false;
  if (typeof value === 'bigint') return value === BigInt(0);
  
  // String (strict - only empty string is empty)
  if (typeof value === 'string') return value.length === 0;
  
  // Array
  if (Array.isArray(value)) return value.length === 0;
  
  // Map and Set
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  
  // Date
  if (value instanceof Date) return false;
  
  // Object
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  
  // Function
  if (typeof value === 'function') return false;
  
  return true;
}

// Deep isEmpty that checks nested structures
export function isEmptyDeep(value: unknown): boolean {
  // Basic empty check first
  if (isEmpty(value)) return true;
  
  // Deep check for arrays
  if (Array.isArray(value)) {
    return value.every(item => isEmptyDeep(item));
  }
  
  // Deep check for objects
  if (value && typeof value === 'object' && value.constructor === Object) {
    return Object.values(value).every(val => isEmptyDeep(val));
  }
  
  return false;
}

// Type-specific isEmpty functions
export function isEmptyString(value: string): boolean {
  return typeof value === 'string' && (value.length === 0 || value.trim().length === 0);
}

export function isEmptyArray<T>(value: T[]): boolean {
  return Array.isArray(value) && value.length === 0;
}

export function isEmptyObject(value: Record<string, unknown>): boolean {
  return value != null && 
         typeof value === 'object' && 
         !Array.isArray(value) &&
         Object.keys(value).length === 0;
}

// Collection isEmpty with size property
export function isEmptyCollection(value: { size: number } | { length: number }): boolean {
  if (value == null) return true;
  
  if ('size' in value) return value.size === 0;
  if ('length' in value) return value.length === 0;
  
  return false;
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "IsEmpty Function",
  description: "Comprehensive emptiness checking for all JavaScript data types including objects, arrays, strings, and collections",
  detailedDescription: "🔍 **The Ultimate 'Is It Empty?' Detective**\nIn JavaScript's wild world of types, determining emptiness isn't as simple as checking for falsy values! This utility handles every edge case across all data types, from whitespace-only strings to nested empty objects.\n\n🎯 **Handles Every JavaScript Type:**\n• **Primitives:** null, undefined, empty strings, zero, NaN\n• **Collections:** empty arrays, objects, Maps, Sets\n• **Edge Cases:** whitespace-only strings, Date objects, functions\n• **Custom Rules:** configurable strictness for different use cases\n\n🧮 **Smart Emptiness Rules:**\n• \`null\` & \`undefined\` → empty\n• \`''\` & \`'   '\` → empty (configurable whitespace handling)\n• \`0\` & \`NaN\` → empty (but \`false\` is not empty!)\n• \`[]\` & \`{}\` → empty\n• \`new Map()\` & \`new Set()\` → empty\n• Functions & Dates → never empty\n\n⚡ **Multiple Detection Strategies:**\n• **Basic isEmpty:** Comprehensive with whitespace trimming\n• **Strict Mode:** Whitespace-only strings considered non-empty\n• **Deep Check:** Recursive validation for nested structures\n• **Type-Specific:** Optimized functions for strings, arrays, objects\n\n🚀 **Essential for Modern Development:**\n• **Form Validation:** Check required fields across complex forms\n• **API Response Validation:** Ensure meaningful data before processing\n• **Data Filtering:** Remove empty entries from collections\n• **Conditional Rendering:** Show/hide UI elements based on content\n• **Business Logic:** Make decisions based on data presence\n\n📚 **Why This Matters:**\n• JavaScript's truthiness is confusing and inconsistent\n• Different empty states require different handling strategies\n• Type safety and runtime validation are critical\n• Performance optimization for large-scale data processing",
  category: "Validation",
  concepts: ["type guards", "type checking", "data validation", "truthiness"],
  timeComplexity: "O(1) for most types, O(n) for objects",
  spaceComplexity: "O(1) constant space",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "isEmpty",
    tabName: "Basic",
    approach: "Comprehensive emptiness check for all data types",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "isEmptyStrict",
    tabName: "Strict",
    approach: "Strict mode that treats whitespace strings as non-empty",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "isEmptyDeep",
    tabName: "Deep",
    approach: "Recursive emptiness check for nested structures",
    timeComplexity: "O(n)",
    spaceComplexity: "O(d)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "isEmptyString",
    tabName: "String",
    approach: "Optimized emptiness check specifically for strings",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "various types",
    output: "boolean",
    description: "Basic emptiness validation",
    code: `// Primitive types
isEmpty(null);           // true
isEmpty(undefined);      // true
isEmpty('');            // true
isEmpty('   ');         // true (whitespace)
isEmpty(0);             // true
isEmpty(NaN);           // true
isEmpty(false);         // false

// Collections
isEmpty([]);            // true
isEmpty({});            // true
isEmpty(new Map());     // true
isEmpty(new Set());     // true

// Non-empty values
isEmpty('hello');       // false
isEmpty([1, 2, 3]);     // false
isEmpty({ key: 'value' }); // false`
  },
  {
    input: "form validation",
    output: "validation result",
    description: "Form field validation",
    code: `interface FormData {
  username: string;
  email: string;
  preferences: string[];
}

function validateForm(data: FormData): string[] {
  const errors: string[] = [];
  
  if (isEmpty(data.username)) {
    errors.push('Username is required');
  }
  
  if (isEmpty(data.email)) {
    errors.push('Email is required');
  }
  
  if (isEmptyArray(data.preferences)) {
    errors.push('At least one preference must be selected');
  }
  
  return errors;
}

const formData = { username: '', email: 'user@example.com', preferences: [] };
const errors = validateForm(formData); // ['Username is required', 'At least one preference must be selected']`
  },
  {
    input: "nested structures",
    output: "deep emptiness check",
    description: "Deep emptiness validation for nested data",
    code: `const data = {
  user: {
    profile: {
      name: '',
      settings: {}
    },
    posts: []
  },
  metadata: {
    tags: [],
    categories: {}
  }
};

isEmpty(data);         // false (has keys)
isEmptyDeep(data);     // true (all nested values are empty)

// Practical use case
function hasContent(obj: unknown): boolean {
  return !isEmptyDeep(obj);
}

hasContent({ a: { b: { c: '' } } });  // false
hasContent({ a: { b: { c: 'value' } } }); // true`
  },
  {
    input: "API response validation",
    output: "response status",
    description: "API response content validation",
    code: `interface ApiResponse {
  data: unknown[];
  metadata: Record<string, unknown>;
  errors: string[];
}

function processApiResponse(response: ApiResponse) {
  if (isEmptyArray(response.data)) {
    return { status: 'no-data', message: 'No data available' };
  }
  
  if (!isEmptyArray(response.errors)) {
    return { status: 'error', errors: response.errors };
  }
  
  if (isEmptyObject(response.metadata)) {
    console.warn('Response missing metadata');
  }
  
  return { status: 'success', data: response.data };
}

const response = { data: [], metadata: {}, errors: [] };
processApiResponse(response); // { status: 'no-data', message: 'No data available' }`
  }
];

// Default export for easy importing
const utilityModule = {
  isEmpty,
  isEmptyStrict,
  isEmptyDeep,
  isEmptyString,
  isEmptyArray,
  isEmptyObject,
  isEmptyCollection,
  metadata,
  solutions,
  examples
};

export default utilityModule;
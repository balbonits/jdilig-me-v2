import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * Omit Utility Implementation
 * 
 * DESCRIPTION:
 * Creates a new object by excluding specified properties from the source object.
 * Essential for object manipulation, API response filtering, and data transformation.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Easy (object manipulation and filtering)
 * - Solution Type: function (object property filtering utility)
 * - Time Complexity: O(n) where n is number of properties in source object
 * - Space Complexity: O(k) where k is number of properties in result object
 * - Concepts: Object manipulation, Property filtering, Immutability, Type safety
 * - Category: Data manipulation utility
 * 
 * EXAMPLE:
 * omit({ a: 1, b: 2, c: 3 }, ['b']) → { a: 1, c: 3 }
 * 
 * CONCEPTS:
 * - Object property manipulation
 * - Immutable data transformations
 * - Array and object iteration
 * - TypeScript generics and type safety
 * 
 * PERFORMANCE:
 * - Time: O(n) where n is source object properties
 * - Space: O(k) where k is result object properties
 * 
 * Multiple implementations included to show different approaches.
 */

// Basic omit implementation
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  if (obj == null || typeof obj !== 'object') {
    throw new Error('First argument must be an object');
  }
  
  if (!Array.isArray(keys)) {
    throw new Error('Second argument must be an array of keys');
  }
  
  const result = {} as Omit<T, K>;
  const keysToOmit = new Set(keys);
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keysToOmit.has(key as unknown as K)) {
      (result as any)[key] = obj[key];
    }
  }
  
  return result;
}

// Omit with single key (convenience overload)
export function omitSingle<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  return omit(obj, [key]);
}

// Omit with nested path support
export function omitDeep<T extends Record<string, unknown>>(
  obj: T,
  paths: string[]
): Partial<T> {
  if (obj == null || typeof obj !== 'object') {
    throw new Error('First argument must be an object');
  }
  
  if (!Array.isArray(paths)) {
    throw new Error('Second argument must be an array of paths');
  }
  
  const result = { ...obj };
  
  for (const path of paths) {
    const keys = path.split('.');
    let current: any = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (current[key] && typeof current[key] === 'object') {
        current[key] = { ...current[key] };
        current = current[key];
      } else {
        break;
      }
    }
    
    const lastKey = keys[keys.length - 1];
    if (current && typeof current === 'object' && lastKey in current) {
      delete current[lastKey];
    }
  }
  
  return result;
}

// Omit with predicate function
export function omitBy<T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  if (obj == null || typeof obj !== 'object') {
    throw new Error('First argument must be an object');
  }
  
  if (typeof predicate !== 'function') {
    throw new Error('Second argument must be a function');
  }
  
  const result = {} as Partial<T>;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (!predicate(value, key)) {
        (result as any)[key] = value;
      }
    }
  }
  
  return result;
}

// Omit using rest parameters for convenience
export function omitKeys<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  return omit(obj, keys);
}

// Omit with type predicate for runtime type checking
export function omitByType<T extends Record<string, unknown>>(
  obj: T,
  types: string[]
): Partial<T> {
  if (obj == null || typeof obj !== 'object') {
    throw new Error('First argument must be an object');
  }
  
  if (!Array.isArray(types)) {
    throw new Error('Second argument must be an array of type strings');
  }
  
  const typesToOmit = new Set(types);
  const result = {} as Partial<T>;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const valueType = value === null ? 'null' : typeof value;
      
      if (!typesToOmit.has(valueType)) {
        (result as any)[key] = value;
      }
    }
  }
  
  return result;
}

// Omit with regex pattern matching
export function omitByPattern<T extends Record<string, unknown>>(
  obj: T,
  patterns: RegExp[]
): Partial<T> {
  if (obj == null || typeof obj !== 'object') {
    throw new Error('First argument must be an object');
  }
  
  if (!Array.isArray(patterns)) {
    throw new Error('Second argument must be an array of RegExp patterns');
  }
  
  const result = {} as Partial<T>;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const shouldOmit = patterns.some(pattern => pattern.test(String(key)));
      
      if (!shouldOmit) {
        (result as any)[key] = obj[key];
      }
    }
  }
  
  return result;
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "Omit Function",
  description: "Creates new objects by excluding specified properties, supporting various filtering strategies including nested paths and predicates",
  category: "Data Manipulation",
  concepts: ["object manipulation", "property filtering", "immutability", "type safety"],
  timeComplexity: "O(n) where n is source object properties",
  spaceComplexity: "O(k) where k is result object properties",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "omit",
    tabName: "Basic",
    approach: "Standard property omission with type safety",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "omitDeep",
    tabName: "Deep",
    approach: "Nested path omission with dot notation support",
    timeComplexity: "O(n×d)",
    spaceComplexity: "O(k)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "omitBy",
    tabName: "Predicate",
    approach: "Conditional omission using predicate function",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "omitByPattern",
    tabName: "Pattern",
    approach: "Regex pattern-based property omission",
    timeComplexity: "O(n×p)",
    spaceComplexity: "O(k)",
    isOptimal: false,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "{ a: 1, b: 2, c: 3 }, ['b']",
    output: "{ a: 1, c: 3 }",
    description: "Basic property omission",
    code: `const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret123',
  role: 'admin',
  createdAt: '2024-01-01'
};

// Remove sensitive information
const publicUser = omit(user, ['password']);
console.log(publicUser);
// { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: '2024-01-01' }

// Remove multiple properties
const basicUser = omit(user, ['password', 'role', 'createdAt']);
console.log(basicUser);
// { id: 1, name: 'John Doe', email: 'john@example.com' }

// Convenience method for single key
const withoutEmail = omitSingle(user, 'email');
console.log(withoutEmail);
// { id: 1, name: 'John Doe', password: 'secret123', role: 'admin', createdAt: '2024-01-01' }`
  },
  {
    input: "API response filtering",
    output: "cleaned response",
    description: "API response sanitization and filtering",
    code: `interface ApiResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      internalId: string;
      debug: any;
    };
    metadata: {
      requestId: string;
      timestamp: string;
      version: string;
      debug: any;
    };
  };
  debug: any;
  internalFields: any;
}

const apiResponse: ApiResponse = {
  success: true,
  data: {
    user: {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      internalId: 'internal-123',
      debug: { trace: 'xyz' }
    },
    metadata: {
      requestId: 'req-456',
      timestamp: '2024-01-01',
      version: '1.0',
      debug: { performance: '100ms' }
    }
  },
  debug: { sql: 'SELECT * FROM users' },
  internalFields: { cache: 'hit' }
};

// Remove debug and internal fields
const cleanResponse = omit(apiResponse, ['debug', 'internalFields']);

// Remove nested debug fields
const deepCleanResponse = omitDeep(cleanResponse, [
  'data.user.debug',
  'data.user.internalId',
  'data.metadata.debug'
]);

console.log(deepCleanResponse);
// Clean response without any debug or internal information`
  },
  {
    input: "conditional filtering",
    output: "filtered object",
    description: "Conditional property omission with predicates",
    code: `const formData = {
  name: 'John',
  email: 'john@example.com',
  age: 30,
  phone: '',
  address: null,
  newsletter: false,
  terms: true,
  comments: undefined,
  score: 0
};

// Remove empty/null/undefined values
const nonEmptyData = omitBy(formData, (value) => {
  return value === null || value === undefined || value === '';
});
console.log(nonEmptyData);
// { name: 'John', email: 'john@example.com', age: 30, newsletter: false, terms: true, score: 0 }

// Remove false boolean values only
const truthyBooleans = omitBy(formData, (value, key) => {
  return typeof value === 'boolean' && value === false;
});

// Remove by type
const noStrings = omitByType(formData, ['string']);
console.log(noStrings);
// { age: 30, address: null, newsletter: false, terms: true, score: 0 }

// Remove by pattern (fields ending with 'Id' or containing 'temp')
const config = {
  userId: 123,
  userName: 'john',
  tempData: 'cache',
  apiKey: 'secret',
  tempConfig: 'dev',
  sessionId: 'abc123'
};

const filtered = omitByPattern(config, [/Id$/, /temp/i]);
console.log(filtered);
// { userName: 'john', apiKey: 'secret' }`
  },
  {
    input: "form processing",
    output: "processed form",
    description: "Form data processing and validation preparation",
    code: `interface FormInput {
  // User fields
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // UI state (should not be sent to API)
  isLoading: boolean;
  showPassword: boolean;
  formTouched: boolean;
  
  // Validation fields (internal use)
  firstNameError?: string;
  lastNameError?: string;
  emailError?: string;
  
  // Meta fields
  timestamp: string;
  userAgent: string;
}

const formInput: FormInput = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  isLoading: false,
  showPassword: false,
  formTouched: true,
  firstNameError: undefined,
  emailError: 'Invalid format',
  timestamp: '2024-01-01T10:00:00Z',
  userAgent: 'Mozilla/5.0...'
};

// Prepare data for API submission (remove UI state and validation fields)
const apiData = omitByPattern(formInput, [
  /^is[A-Z]/,     // Remove isLoading, etc.
  /^show[A-Z]/,   // Remove showPassword, etc.
  /Error$/,       // Remove validation errors
  /^form[A-Z]/    // Remove formTouched, etc.
]);

// Further clean for specific endpoint
const userOnlyData = omit(apiData, ['timestamp', 'userAgent']);
console.log(userOnlyData);
// { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1234567890' }

// Create analytics data (keep only meta fields)
const analyticsData = omitBy(formInput, (value, key) => {
  const metaFields = ['timestamp', 'userAgent', 'formTouched'];
  return !metaFields.includes(String(key));
});`
  }
];

// Default export for easy importing
const utilityModule = {
  omit,
  omitSingle,
  omitDeep,
  omitBy,
  omitKeys,
  omitByType,
  omitByPattern,
  metadata,
  solutions,
  examples
};

export default utilityModule;
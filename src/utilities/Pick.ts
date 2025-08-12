import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  if (obj == null || typeof obj !== 'object') {
    throw new Error('First argument must be an object');
  }
  
  const result = {} as Pick<T, K>;
  
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result as any)[key] = obj[key];
    }
  }
  
  return result;
}

export function pickBy<T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (predicate(value, key)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result as any)[key] = value;
      }
    }
  }
  
  return result;
}

export const metadata: UtilityMetadata = {
  title: "Pick Function",
  description: "Creates new objects by selecting only specified properties from source objects",
  category: "Data Manipulation",
  concepts: ["object manipulation", "property selection", "immutability", "type safety"],
  timeComplexity: "O(k) where k is number of keys to pick",
  spaceComplexity: "O(k) where k is result object properties",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "pick",
    tabName: "Basic",
    approach: "Select specific properties by key names",
    timeComplexity: "O(k)",
    spaceComplexity: "O(k)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "pickBy",
    tabName: "Predicate",
    approach: "Select properties using predicate function",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: UtilityExample[] = [
  {
    input: "{ a: 1, b: 2, c: 3 }, ['a', 'c']",
    output: "{ a: 1, c: 3 }",
    description: "Basic property selection",
    code: `const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const publicUser = pick(user, ['id', 'name', 'email']);
// { id: 1, name: 'John', email: 'john@example.com' }`
  }
];

const utilityModule = { pick, pickBy, metadata, solutions, examples };
export default utilityModule;
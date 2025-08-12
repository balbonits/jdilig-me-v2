import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  if (!Array.isArray(array)) {
    throw new Error('First argument must be an array');
  }
  
  if (typeof keySelector !== 'function') {
    throw new Error('Second argument must be a function');
  }
  
  const result = {} as Record<K, T[]>;
  
  for (const item of array) {
    const key = keySelector(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  
  return result;
}

export function groupByProperty<T>(
  array: T[],
  property: keyof T
): Record<string, T[]> {
  return groupBy(array, (item) => String(item[property]));
}

export const metadata: UtilityMetadata = {
  title: "GroupBy Function",
  description: "Groups array items by a key selector function or property name",
  category: "Data Manipulation",
  concepts: ["array manipulation", "data grouping", "functional programming", "data transformation"],
  timeComplexity: "O(n) where n is array length",
  spaceComplexity: "O(n) for grouped result",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "groupBy",
    tabName: "Function",
    approach: "Group by key selector function",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "groupByProperty",
    tabName: "Property",
    approach: "Group by object property name",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: UtilityExample[] = [
  {
    input: "[{type: 'A'}, {type: 'B'}], 'type'",
    output: "{A: [...], B: [...]}",
    description: "Group objects by property",
    code: `const users = [
  { name: 'John', role: 'admin', age: 30 },
  { name: 'Jane', role: 'user', age: 25 },
  { name: 'Bob', role: 'admin', age: 35 }
];

const byRole = groupByProperty(users, 'role');
// { admin: [John, Bob], user: [Jane] }`
  }
];

const utilityModule = { groupBy, groupByProperty, metadata, solutions, examples };
export default utilityModule;
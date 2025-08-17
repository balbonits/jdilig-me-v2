import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * 📊 GroupBy - The Data Organization Powerhouse
 * 
 * DESCRIPTION:
 * 🗂️ **The Ultimate Data Sorter**
 * GroupBy transforms flat arrays into organized collections by grouping items with common characteristics. Essential for data analysis, report generation, and creating structured views from unstructured data!
 * 
 * 🧠 **The Grouping Strategy:**
 * • **Key Extraction:** Use function or property to determine group membership
 * • **Dynamic Buckets:** Automatically create groups as new keys are encountered
 * • **Preserve Order:** Items maintain their relative order within groups
 * • **Type Safety:** Full TypeScript support with proper key constraints
 * 
 * ⚡ **Two Flexible Approaches:**
 * • **Function-Based:** Maximum flexibility with custom key selector logic
 * • **Property-Based:** Simple grouping by object property names
 * 
 * 🚀 **Real-World Applications:**
 * • **Data Analytics:** Group sales by region, product, or time period
 * • **User Management:** Organize users by role, department, or status
 * • **E-commerce:** Group products by category, brand, or price range
 * • **Reporting Systems:** Create summary reports from transaction data
 * • **Content Management:** Organize articles by author, tag, or publication date
 * • **Financial Analysis:** Group transactions by type, account, or date
 * 
 * 💡 **Learning Value:**
 * • Functional programming patterns and higher-order functions
 * • TypeScript generics and type constraints
 * • Data transformation and aggregation techniques
 * • Object property access and dynamic key creation
 * 
 * PERFORMANCE:
 * - Time: O(n) single pass through array
 * - Space: O(n) for grouped result structure
 * 
 * Two implementations show function-based flexibility vs property-based simplicity.
 */

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
  detailedDescription: "🗂️ **The Ultimate Data Sorter**\nGroupBy transforms flat arrays into organized collections by grouping items with common characteristics. Essential for data analysis, report generation, and creating structured views from unstructured data!\n\n🧠 **The Grouping Strategy:**\n• **Key Extraction:** Use function or property to determine group membership\n• **Dynamic Buckets:** Automatically create groups as new keys are encountered\n• **Preserve Order:** Items maintain their relative order within groups\n• **Type Safety:** Full TypeScript support with proper key constraints\n\n⚡ **Two Flexible Approaches:**\n• **Function-Based:** Maximum flexibility with custom key selector logic\n• **Property-Based:** Simple grouping by object property names\n\n🚀 **Real-World Applications:**\n• **Data Analytics:** Group sales by region, product, or time period\n• **User Management:** Organize users by role, department, or status\n• **E-commerce:** Group products by category, brand, or price range\n• **Reporting Systems:** Create summary reports from transaction data\n• **Content Management:** Organize articles by author, tag, or publication date\n• **Financial Analysis:** Group transactions by type, account, or date\n\n💡 **Learning Value:**\n• Functional programming patterns and higher-order functions\n• TypeScript generics and type constraints\n• Data transformation and aggregation techniques\n• Object property access and dynamic key creation",
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
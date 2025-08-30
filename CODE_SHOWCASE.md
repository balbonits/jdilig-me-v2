# Code Showcase System Template

This document serves as the unified template and guide for implementing new items in the **Code Showcase System**, which includes:

- **📚 Code Exercises** - Algorithm problems and data structure challenges
- **🛠️ Utility Functions** - Reusable JavaScript/TypeScript utilities  
- **🏗️ Design Patterns** - Software design patterns and architectural concepts

Follow this exact structure to maintain consistency across all three showcase categories.

## 🎯 Design Pattern Implementation Template

### File Structure
```
src/patterns/
├── PatternName.ts          # Main pattern implementation
└── ...                     # Other patterns

src/pages/code/patterns/
├── [slug].tsx              # Dynamic showcase page (shared)
├── index.tsx               # Pattern listing page
└── pattern-showcase.module.css  # Shared showcase styles
```

### Pattern Implementation Template (`src/patterns/PatternName.ts`)

```typescript
import { PatternMetadata, PatternExample, SolutionMetadata } from '@/interfaces/patterns';

/**
 * 🏗️ Pattern Name Implementation - Brief Description
 * 
 * DESCRIPTION:
 * Detailed explanation of what the pattern does, when to use it, and why it's useful.
 * Should be 2-3 sentences explaining the core concept and main benefit.
 * 
 * EXAMPLES:
 * • Real-world example 1 - Brief explanation
 * • Real-world example 2 - Brief explanation
 * • Real-world example 3 - Brief explanation
 * 
 * IMPLEMENTATION APPROACHES:
 * • Approach 1: Description of first implementation style
 * • Approach 2: Description of second implementation style
 * • Approach 3: Description of third implementation style
 * 
 * REAL-WORLD USAGE:
 * • Framework/library usage example 1
 * • Framework/library usage example 2
 * • Framework/library usage example 3
 * • Framework/library usage example 4
 * 
 * PERFORMANCE:
 * - Time: O(complexity) explanation
 * - Space: O(complexity) explanation
 */

// Implementation 1 - Most common/optimal approach
export class PatternClassName {
  // Implementation code here
  // Include proper TypeScript types
  // Add comments for complex logic
  // Follow existing code style
}

// Implementation 2 - Alternative approach
export function alternativeImplementation() {
  // Alternative implementation
  // Usually functional approach if first was OOP
}

// Implementation 3 - Modern/advanced approach
export const modernApproach = {
  // Modern implementation using latest features
  // Could be using Proxy, WeakMap, etc.
};

// Example usage and utilities
export const exampleUsage = {
  // Demonstrate how to use the pattern
  // Include realistic scenarios
};

// Metadata export (REQUIRED)
export const metadata: PatternMetadata = {
  title: "Pattern Name",
  description: "One-line description for cards and headers",
  detailedDescription: `🏗️ **The Pattern Name - Brief Tagline**

Detailed explanation with proper formatting using markdown-like syntax.

🎯 **Core Problem Solved:**
• Problem 1 that this pattern addresses
• Problem 2 that this pattern addresses  
• Problem 3 that this pattern addresses
• Problem 4 that this pattern addresses

🔍 **Three Implementation Approaches:**
• **Approach 1:** Description with benefits
• **Approach 2:** Description with benefits
• **Approach 3:** Description with benefits

🚀 **Real-World Applications:**
• Application example 1 with context
• Application example 2 with context
• Application example 3 with context
• Application example 4 with context
• Application example 5 with context
• Application example 6 with context

⚡ **Modern Usage Examples:**
• Modern framework example 1
• Modern framework example 2  
• Modern framework example 3
• Modern framework example 4`,
  
  category: "Creational" | "Structural" | "Behavioral" | "Modern",
  difficulty: "Easy" | "Medium" | "Hard",
  timeComplexity: "O(1)" | "O(n)" | "O(log n)" | etc,
  spaceComplexity: "O(1)" | "O(n)" | etc,
  useCases: ["Use Case 1", "Use Case 2", "Use Case 3", "Use Case 4"],
  concepts: ["concept1", "concept2", "concept3", "concept4"],
  realWorldApplications: [
    "Real application 1",
    "Real application 2", 
    "Real application 3",
    "Real application 4",
    "Real application 5",
    "Real application 6"
  ],
  relatedPatterns: ["Related Pattern 1", "Related Pattern 2"],
  frameworkSupport: ["Framework 1", "Framework 2", "Framework 3"]
};

// Examples export (REQUIRED)
export const examples: PatternExample[] = [
  {
    scenario: "Descriptive scenario name",
    description: "What this example demonstrates",
    input: "example.input.method()",
    output: "Expected result or behavior description"
  },
  {
    scenario: "Second scenario name", 
    description: "What this second example demonstrates",
    input: "example2.differentMethod()",
    output: "Different expected result"
  },
  {
    scenario: "Third scenario name",
    description: "What this third example demonstrates", 
    input: "example3.anotherMethod()",
    output: "Another expected result"
  }
];

// Solutions export (REQUIRED)
export const solutions: SolutionMetadata[] = [
  {
    name: "implementation-1",
    tabName: "Class-Based",
    approach: "Traditional OOP Implementation", 
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    code: `class PatternExample {
  private property: string;

  constructor(value: string) {
    this.property = value;
  }

  public method(): string {
    return this.property;
  }
}

// Usage
const instance = new PatternExample('value');
console.log(instance.method()); // 'value'`
  },
  {
    name: "implementation-2", 
    tabName: "Functional",
    approach: "Functional Programming Approach",
    type: "function",
    timeComplexity: "O(1)", 
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `function createPattern(value: string) {
  return {
    getValue: () => value,
    method: () => value
  };
}

// Usage
const pattern = createPattern('value');
console.log(pattern.method()); // 'value'`
  },
  {
    name: "implementation-3",
    tabName: "Modern",
    approach: "Modern JavaScript/TypeScript Features", 
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `const PatternSymbol = Symbol('pattern');

class ModernPattern {
  private [PatternSymbol]: string;

  constructor(value: string) {
    this[PatternSymbol] = value;
  }

  get value(): string {
    return this[PatternSymbol];
  }
}

// Usage with modern features
const pattern = new ModernPattern('value');
console.log(pattern.value); // 'value'`
  }
];
```

## 📋 Implementation Checklist

### ✅ Required Elements
- [ ] File created in `src/patterns/PatternName.ts`
- [ ] JSDoc header with pattern description
- [ ] At least 2-3 different implementation approaches
- [ ] Exported `metadata` object with all required fields
- [ ] Exported `examples` array with 3 practical examples  
- [ ] Exported `solutions` array with 3 implementations
- [ ] One solution marked as `isOptimal: true`
- [ ] All code examples are functional and well-commented
- [ ] TypeScript types used throughout (no `any` types)

### ✅ Content Quality Standards
- [ ] `detailedDescription` follows the emoji-structured format
- [ ] Includes 4+ bullet points in each major section
- [ ] Real-world applications are specific and practical
- [ ] Code examples are production-ready quality
- [ ] Time/space complexity analysis is accurate
- [ ] Related patterns are relevant and exist in system

### ✅ Category-Specific Guidelines

Each showcase category has specific requirements and content patterns:

#### 📚 Code Exercises
- Focus on **algorithmic thinking** and **data structure usage**
- Include **complexity analysis** (time/space)
- Provide **multiple solution approaches** with trade-offs
- Use **examples with input/output** scenarios

#### 🛠️ Utility Functions  
- Emphasize **practical reusability** and **real-world usage**
- Include **comprehensive examples** and **edge cases**
- Focus on **TypeScript best practices** and **type safety**
- Provide **framework integration** examples

#### 🏗️ Design Patterns
- Explain **architectural concepts** and **design principles**
- Include **multiple implementation approaches** (OOP, functional, modern)
- Focus on **when to use** and **real-world applications**
- Provide **framework-specific examples** and **related patterns**

## 🎨 Style Guidelines

### Code Style
- Use TypeScript interfaces and types consistently
- Follow existing naming conventions (PascalCase for classes, camelCase for functions)
- Include JSDoc comments for complex methods
- Use modern ES6+ features appropriately
- Ensure all code is functional and testable

### Content Style  
- Use emoji headers (🎯, 🔍, 🚀, ⚡) in `detailedDescription`
- Keep bullet points concise but informative (5-10 words each)
- Include practical, real-world examples
- Explain "why" not just "what" and "how"
- Maintain consistent tone across all patterns

### Complexity Guidelines
- **Easy**: Simple concept, 1-2 classes/functions, basic usage
- **Medium**: Moderate complexity, multiple components, some edge cases  
- **Hard**: Complex interactions, multiple patterns combined, advanced concepts

## 🚀 Testing Your Implementation

1. **Build Test**: Run `npm run build` to ensure no TypeScript errors
2. **Data Generation**: Check that pattern appears in generated JSON
3. **Page Navigation**: Verify pattern shows in `/code/patterns` listing
4. **Showcase Page**: Test individual pattern page works correctly
5. **Code Copy**: Ensure copy button works for all solution tabs
6. **Responsive**: Test on mobile and desktop layouts

## 📝 Common Mistakes to Avoid

- ❌ Don't use `any` types - always provide specific TypeScript types
- ❌ Don't make `detailedDescription` too short - should be comprehensive
- ❌ Don't skip the `examples` array - it's required for the showcase
- ❌ Don't make all solutions `isOptimal: true` - only one should be optimal
- ❌ Don't use placeholder content - all examples should be realistic
- ❌ Don't forget to export `metadata`, `examples`, and `solutions`
- ❌ Don't skip JSDoc comments - they provide valuable context
- ❌ Don't use overly complex code - focus on clarity and education

## 🔄 Integration with Existing System

The pattern system integrates seamlessly with:
- **Data Generation**: Patterns auto-generate into `public/patterns.json`
- **Navigation**: Auto-appear in header dropdown and code page
- **Search**: Included in site-wide search functionality
- **Analytics**: Track user interactions and code copying
- **SEO**: Generate proper meta tags and structured data
- **Responsive**: Work on all device sizes with existing CSS system

---

Follow this template exactly to maintain consistency with the existing exercise and utility showcase systems. The goal is uniformity in implementation, presentation, and user experience across all code showcase categories.
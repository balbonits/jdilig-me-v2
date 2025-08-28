import { PatternMetadata, PatternExample, SolutionMetadata } from '@/interfaces/patterns';

/**
 * 🎭 Strategy Pattern Implementation - Interchangeable Algorithms
 * 
 * DESCRIPTION:
 * Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
 * This behavioral pattern lets the algorithm vary independently from clients that use it,
 * enabling runtime algorithm selection and easy extension.
 * 
 * EXAMPLES:
 * • Payment processing - different payment methods (credit card, PayPal, crypto)
 * • Sorting algorithms - quicksort, mergesort, heapsort based on data size
 * • Validation strategies - email, phone, password validation rules
 * 
 * IMPLEMENTATION APPROACHES:
 * • Interface-based: Traditional OOP with strategy interfaces
 * • Function-based: Modern functional approach with higher-order functions
 * • Class-based: Strategy classes with shared interface
 * 
 * REAL-WORLD USAGE:
 * • Form validation libraries
 * • Data processing pipelines
 * • Authentication systems
 * • Routing algorithms
 * 
 * PERFORMANCE:
 * - Time: Depends on chosen algorithm
 * - Space: O(1) strategy storage
 */

// Strategy interface for sorting
interface SortingStrategy {
  sort(data: number[]): number[];
  getName(): string;
  getComplexity(): string;
}

// Concrete sorting strategies
export class QuickSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    if (data.length <= 1) return [...data];
    
    const pivot = data[Math.floor(data.length / 2)];
    const less = data.filter(x => x < pivot);
    const equal = data.filter(x => x === pivot);
    const greater = data.filter(x => x > pivot);
    
    return [
      ...this.sort(less),
      ...equal,
      ...this.sort(greater)
    ];
  }

  getName(): string {
    return 'Quick Sort';
  }

  getComplexity(): string {
    return 'O(n log n) average, O(n²) worst';
  }
}

export class MergeSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    if (data.length <= 1) return [...data];
    
    const mid = Math.floor(data.length / 2);
    const left = this.sort(data.slice(0, mid));
    const right = this.sort(data.slice(mid));
    
    return this.merge(left, right);
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  getName(): string {
    return 'Merge Sort';
  }

  getComplexity(): string {
    return 'O(n log n)';
  }
}

export class BubbleSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    const result = [...data];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (result[j] > result[j + 1]) {
          [result[j], result[j + 1]] = [result[j + 1], result[j]];
        }
      }
    }
    
    return result;
  }

  getName(): string {
    return 'Bubble Sort';
  }

  getComplexity(): string {
    return 'O(n²)';
  }
}

// Context class that uses sorting strategies
export class DataSorter {
  constructor(private strategy: SortingStrategy) {}

  public setStrategy(strategy: SortingStrategy): void {
    this.strategy = strategy;
  }

  public sort(data: number[]): number[] {
    console.log(`Sorting with ${this.strategy.getName()}`);
    return this.strategy.sort(data);
  }

  public getStrategyInfo(): { name: string; complexity: string } {
    return {
      name: this.strategy.getName(),
      complexity: this.strategy.getComplexity()
    };
  }
}

// Validation strategies
interface ValidationStrategy {
  validate(value: string): { isValid: boolean; errors: string[] };
  getType(): string;
}

export class EmailValidationStrategy implements ValidationStrategy {
  validate(value: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!value || value.trim().length === 0) {
      errors.push('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push('Invalid email format');
      }
      if (value.length > 254) {
        errors.push('Email too long (max 254 characters)');
      }
    }
    
    return { isValid: errors.length === 0, errors };
  }

  getType(): string {
    return 'email';
  }
}

export class PasswordValidationStrategy implements ValidationStrategy {
  constructor(private minLength: number = 8) {}

  validate(value: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!value || value.length === 0) {
      errors.push('Password is required');
    } else {
      if (value.length < this.minLength) {
        errors.push(`Password must be at least ${this.minLength} characters`);
      }
      if (!/[A-Z]/.test(value)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(value)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/\d/.test(value)) {
        errors.push('Password must contain at least one number');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errors.push('Password must contain at least one special character');
      }
    }
    
    return { isValid: errors.length === 0, errors };
  }

  getType(): string {
    return 'password';
  }
}

export class PhoneValidationStrategy implements ValidationStrategy {
  validate(value: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!value || value.trim().length === 0) {
      errors.push('Phone number is required');
    } else {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, '');
      
      if (digits.length < 10) {
        errors.push('Phone number must have at least 10 digits');
      } else if (digits.length > 15) {
        errors.push('Phone number too long (max 15 digits)');
      }
      
      // Basic format validation (US format)
      const phoneRegex = /^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
      if (!phoneRegex.test(value)) {
        errors.push('Invalid phone number format');
      }
    }
    
    return { isValid: errors.length === 0, errors };
  }

  getType(): string {
    return 'phone';
  }
}

// Form validator using strategy pattern
export class FormValidator {
  private strategies: Map<string, ValidationStrategy> = new Map();

  public addValidationStrategy(field: string, strategy: ValidationStrategy): void {
    this.strategies.set(field, strategy);
  }

  public removeValidationStrategy(field: string): void {
    this.strategies.delete(field);
  }

  public validateField(field: string, value: string): { isValid: boolean; errors: string[] } {
    const strategy = this.strategies.get(field);
    if (!strategy) {
      return { isValid: true, errors: [] };
    }
    return strategy.validate(value);
  }

  public validateForm(formData: Record<string, string>): {
    isValid: boolean;
    fieldErrors: Record<string, string[]>;
  } {
    const fieldErrors: Record<string, string[]> = {};
    let isValid = true;

    for (const [field, strategy] of this.strategies.entries()) {
      const value = formData[field] || '';
      const result = strategy.validate(value);
      
      if (!result.isValid) {
        fieldErrors[field] = result.errors;
        isValid = false;
      }
    }

    return { isValid, fieldErrors };
  }

  public getRegisteredFields(): string[] {
    return Array.from(this.strategies.keys());
  }
}

export const paymentStrategies = {
  creditCard: async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
      success: amount > 0,
      transactionId: `cc_${Math.random().toString(36).substr(2, 9)}`,
      fee: amount * 0.029 // 2.9% fee
    };
  },

  paypal: async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return {
      success: amount > 0,
      transactionId: `pp_${Math.random().toString(36).substr(2, 9)}`,
      fee: amount * 0.034 + 0.30 // 3.4% + $0.30 fee
    };
  },

  bankTransfer: async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: amount > 0,
      transactionId: `bt_${Math.random().toString(36).substr(2, 9)}`,
      fee: amount > 1000 ? 0 : 5.00 // Free for amounts over $1000
    };
  }
} as const;

export class PaymentProcessor {
  public async processPayment(
    method: keyof typeof paymentStrategies,
    amount: number
  ) {
    const strategy = paymentStrategies[method];
    if (!strategy) {
      throw new Error(`Unknown payment method: ${method}`);
    }
    return await strategy(amount);
  }

  public getAvailableMethods(): string[] {
    return Object.keys(paymentStrategies);
  }

  public calculateFee(method: keyof typeof paymentStrategies, amount: number): number {
    switch (method) {
      case 'creditCard':
        return amount * 0.029;
      case 'paypal':
        return amount * 0.034 + 0.30;
      case 'bankTransfer':
        return amount > 1000 ? 0 : 5.00;
      default:
        return 0;
    }
  }
}

export const metadata: PatternMetadata = {
  title: "Strategy Pattern",
  description: "Encapsulate algorithms and make them interchangeable at runtime",
  detailedDescription: "🎭 **The Strategy Pattern - Interchangeable Algorithms**\n\nDefines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime!\n\n🎯 **Core Problem Solved:**\n• Switch between different algorithms dynamically\n• Eliminate complex conditional statements\n• Support easy algorithm extension\n• Decouple algorithm implementation from usage\n\n🔍 **Three Implementation Approaches:**\n• **Interface-based:** Traditional OOP with strategy interfaces\n• **Function-based:** Modern functional approach with higher-order functions\n• **Class-based:** Strategy classes with shared behavior\n\n🚀 **Real-World Applications:**\n• Payment processing systems (credit card, PayPal, crypto)\n• Sorting algorithms (quicksort, mergesort, heapsort)\n• Form validation rules and strategies\n• Data compression algorithms\n• Routing and pathfinding algorithms\n• Authentication mechanisms\n\n⚡ **Modern Usage Examples:**\n• React form validation libraries\n• Data processing pipelines\n• Microservice routing strategies\n• A/B testing algorithm selection",
  concepts: ["polymorphism", "algorithm selection", "runtime behavior", "decoupling"],
  timeComplexity: "Depends on chosen algorithm",
  spaceComplexity: "O(1) - strategy storage overhead",
  difficulty: "Medium",
  category: "Behavioral",
  useCases: ["State Management", "Code Organization", "Performance"],
  realWorldApplications: [
    "Payment processing systems with multiple providers",
    "Form validation with different rule sets",
    "Sorting algorithms selection based on data size",
    "Data compression strategy selection",
    "Authentication method switching",
    "A/B testing algorithm variations"
  ],
  relatedPatterns: ["State", "Command", "Template Method"],
  modernAlternatives: ["Higher-order functions", "React hooks patterns", "Functional composition"],
  frameworkSupport: ["React validation libraries", "Express.js middleware", "Redux middleware"]
};

export const solutions: SolutionMetadata[] = [
  {
    name: "DataSorter",
    tabName: "Interface-based",
    approach: "Traditional OOP with strategy interface",
    timeComplexity: "Varies by algorithm",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "FormValidator",
    tabName: "Validation Strategies",
    approach: "Map-based strategy registry",
    timeComplexity: "O(n) per validation",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "PaymentProcessor",
    tabName: "Function-based",
    approach: "Modern functional strategy pattern",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "class"
  }
];

export const examples: PatternExample[] = [
  {
    input: "sorter.setStrategy(new QuickSortStrategy())",
    output: "Strategy changed to QuickSort",
    description: "Change sorting algorithm",
    scenario: "Data processing - choose optimal sorting algorithm based on data size"
  },
  {
    input: "validator.validateField('email', 'user@example.com')",
    output: "{ isValid: true, errors: [] }",
    description: "Email validation",
    scenario: "Form validation - apply different validation rules per field type"
  },
  {
    input: "processor.processPayment('creditCard', 100)",
    output: "{ success: true, transactionId: 'cc_xyz', fee: 2.90 }",
    description: "Process credit card payment",
    scenario: "E-commerce - handle different payment methods with varying fees"
  },
  {
    input: "sorter.sort([3, 1, 4, 1, 5, 9, 2, 6])",
    output: "[1, 1, 2, 3, 4, 5, 6, 9]",
    description: "Sort array with current strategy",
    scenario: "Algorithm selection - same interface, different implementations"
  }
];

const strategyModule = {
  DataSorter,
  QuickSortStrategy,
  MergeSortStrategy,
  BubbleSortStrategy,
  FormValidator,
  EmailValidationStrategy,
  PasswordValidationStrategy,
  PhoneValidationStrategy,
  PaymentProcessor,
  paymentStrategies,
  metadata,
  solutions,
  examples
};

export default strategyModule;
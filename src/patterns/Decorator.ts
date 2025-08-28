import { PatternMetadata, PatternExample, SolutionMetadata } from '@/interfaces/patterns';

/**
 * 🔗 Decorator Pattern Implementation - Dynamic Behavior Enhancement
 * 
 * DESCRIPTION:
 * Attaches new behaviors to objects by placing them inside special wrapper objects
 * that contain the behaviors. This structural pattern provides a flexible alternative
 * to subclassing for extending functionality.
 * 
 * EXAMPLES:
 * • Coffee shop - add milk, sugar, whip to basic coffee
 * • Text formatting - add bold, italic, underline to text
 * • HTTP middleware - add logging, authentication, caching to requests
 * 
 * IMPLEMENTATION APPROACHES:
 * • Class-based: Traditional decorator with base component interface
 * • Function-based: Higher-order functions that enhance behavior
 * • Proxy-based: Using JavaScript Proxy for transparent decoration
 * 
 * REAL-WORLD USAGE:
 * • Express.js middleware system
 * • React Higher-Order Components (HOCs)
 * • Python decorators (@decorator syntax)
 * • Java Streams API
 * 
 * PERFORMANCE:
 * - Time: O(1) per decoration layer
 * - Space: O(n) for n decorator layers
 */

// Component interface
interface DataProcessor {
  process(data: string): string;
  getDescription(): string;
}

// Base component
export class BasicDataProcessor implements DataProcessor {
  process(data: string): string {
    return data;
  }

  getDescription(): string {
    return 'Basic data processor';
  }
}

// Base decorator class
abstract class DataProcessorDecorator implements DataProcessor {
  constructor(protected processor: DataProcessor) {}

  process(data: string): string {
    return this.processor.process(data);
  }

  getDescription(): string {
    return this.processor.getDescription();
  }
}

// Concrete decorators
export class EncryptionDecorator extends DataProcessorDecorator {
  process(data: string): string {
    const processed = super.process(data);
    // Simulate encryption (simple base64 for demo)
    return Buffer.from(processed).toString('base64');
  }

  getDescription(): string {
    return super.getDescription() + ' + Encryption';
  }
}

export class CompressionDecorator extends DataProcessorDecorator {
  process(data: string): string {
    const processed = super.process(data);
    // Simulate compression (just truncate for demo)
    return processed.length > 10 ? processed.substring(0, 10) + '...[compressed]' : processed;
  }

  getDescription(): string {
    return super.getDescription() + ' + Compression';
  }
}

export class LoggingDecorator extends DataProcessorDecorator {
  process(data: string): string {
    console.log(`[LOG] Processing: ${data.substring(0, 20)}...`);
    const result = super.process(data);
    console.log(`[LOG] Result: ${result.substring(0, 20)}...`);
    return result;
  }

  getDescription(): string {
    return super.getDescription() + ' + Logging';
  }
}

export class ValidationDecorator extends DataProcessorDecorator {
  process(data: string): string {
    if (!data || data.trim().length === 0) {
      throw new Error('Invalid input: data cannot be empty');
    }
    if (data.length > 1000) {
      throw new Error('Invalid input: data too large (max 1000 characters)');
    }
    return super.process(data);
  }

  getDescription(): string {
    return super.getDescription() + ' + Validation';
  }
}

// Coffee shop example (classic decorator pattern)
interface Coffee {
  cost(): number;
  description(): string;
}

export class BasicCoffee implements Coffee {
  cost(): number {
    return 2.00;
  }

  description(): string {
    return 'Basic coffee';
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

export class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 0.50;
  }

  description(): string {
    return super.description() + ', Milk';
  }
}

export class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 0.25;
  }

  description(): string {
    return super.description() + ', Sugar';
  }
}

export class WhipCreamDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 0.75;
  }

  description(): string {
    return super.description() + ', Whip Cream';
  }
}

export class VanillaDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 0.60;
  }

  description(): string {
    return super.description() + ', Vanilla';
  }
}

// Function-based decorator (Higher-Order Functions)
type AsyncFunction<T, R> = (input: T) => Promise<R>;

export function withRetry<T, R>(
  maxAttempts: number,
  delay: number = 1000
) {
  return function(fn: AsyncFunction<T, R>): AsyncFunction<T, R> {
    return async function(input: T): Promise<R> {
      let lastError: Error | undefined;
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await fn(input);
        } catch (error) {
          lastError = error as Error;
          console.log(`Attempt ${attempt} failed: ${error}`);
          
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      throw new Error(`All ${maxAttempts} attempts failed. Last error: ${lastError?.message || 'Unknown error'}`);
    };
  };
}

export function withTiming<T, R>(name: string) {
  return function(fn: AsyncFunction<T, R>): AsyncFunction<T, R> {
    return async function(input: T): Promise<R> {
      const start = performance.now();
      try {
        const result = await fn(input);
        const end = performance.now();
        console.log(`[TIMING] ${name}: ${(end - start).toFixed(2)}ms`);
        return result;
      } catch (error) {
        const end = performance.now();
        console.log(`[TIMING] ${name} failed after ${(end - start).toFixed(2)}ms`);
        throw error;
      }
    };
  };
}

export function withCaching<T, R>(ttl: number = 60000) {
  return function(fn: AsyncFunction<T, R>): AsyncFunction<T, R> {
    const cache = new Map<string, { result: R; timestamp: number }>();
    
    return async function(input: T): Promise<R> {
      const key = JSON.stringify(input);
      const cached = cache.get(key);
      
      if (cached && Date.now() - cached.timestamp < ttl) {
        console.log(`[CACHE] Hit for key: ${key.substring(0, 50)}...`);
        return cached.result;
      }
      
      console.log(`[CACHE] Miss for key: ${key.substring(0, 50)}...`);
      const result = await fn(input);
      cache.set(key, { result, timestamp: Date.now() });
      
      return result;
    };
  };
}

// Example usage with decorators
export async function fetchUserData(userId: string): Promise<{ id: string; name: string; email: string }> {
  // Simulate API call that might fail
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  
  if (Math.random() < 0.3) {
    throw new Error('Network error');
  }
  
  return {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`
  };
}

// Create decorated function
export const robustFetchUserData = withRetry<string, { id: string; name: string; email: string }>(3, 500)(
  withTiming<string, { id: string; name: string; email: string }>('fetchUserData')(
    withCaching<string, { id: string; name: string; email: string }>(30000)(fetchUserData)
  )
);

// Proxy-based decorator
export function createLoggingProxy<T extends object>(target: T, name: string): T {
  return new Proxy(target, {
    get(obj, prop) {
      const value = obj[prop as keyof T];
      
      if (typeof value === 'function') {
        return function(...args: unknown[]) {
          console.log(`[PROXY] Calling ${name}.${String(prop)} with args:`, args);
          const result = (value as (...args: unknown[]) => unknown).apply(obj, args);
          console.log(`[PROXY] ${name}.${String(prop)} returned:`, result);
          return result;
        };
      }
      
      return value;
    },
    
    set(obj, prop, value) {
      console.log(`[PROXY] Setting ${name}.${String(prop)} = ${value}`);
      obj[prop as keyof T] = value;
      return true;
    }
  });
}

// Example class to proxy
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

export const metadata: PatternMetadata = {
  title: "Decorator Pattern",
  description: "Add new behaviors to objects dynamically without altering structure",
  detailedDescription: "🔗 **The Decorator Pattern - Dynamic Behavior Enhancement**\n\nAttaches new behaviors to objects by placing them inside special wrapper objects. Perfect for extending functionality without inheritance!\n\n🎯 **Core Problem Solved:**\n• Add behavior to objects at runtime\n• Avoid rigid inheritance hierarchies\n• Combine multiple enhancements flexibly\n• Follow Single Responsibility Principle\n\n🔍 **Three Implementation Approaches:**\n• **Class-based:** Traditional decorator with component interfaces\n• **Function-based:** Higher-order functions (HOFs) for enhancement\n• **Proxy-based:** JavaScript Proxy for transparent decoration\n\n🚀 **Real-World Applications:**\n• Express.js middleware (logging, auth, compression)\n• React Higher-Order Components (HOCs)\n• Coffee shop ordering system (milk, sugar, extras)\n• HTTP request/response processing\n• Data processing pipelines\n• API endpoint enhancement\n\n⚡ **Modern Usage Examples:**\n• Function composition in functional programming\n• React hooks for component enhancement\n• Python @decorator syntax\n• JavaScript Proxy for method interception",
  concepts: ["composition over inheritance", "wrapper objects", "dynamic behavior", "aspect-oriented programming"],
  timeComplexity: "O(1) - per decoration layer",
  spaceComplexity: "O(n) - for n decorator layers",
  difficulty: "Medium",
  category: "Structural",
  useCases: ["Code Organization", "API Design", "Event Handling"],
  realWorldApplications: [
    "Express.js middleware system (logging, auth, CORS)",
    "React Higher-Order Components (HOCs)",
    "HTTP request/response processing chains",
    "Data processing and transformation pipelines",
    "Coffee shop ordering with customizations",
    "API endpoint enhancement and monitoring"
  ],
  relatedPatterns: ["Proxy", "Composite", "Strategy"],
  modernAlternatives: ["Higher-order functions", "React hooks", "JavaScript Proxy", "Function composition"],
  frameworkSupport: ["Express.js", "React", "Angular", "Python decorators", "Java annotations"]
};

export const solutions: SolutionMetadata[] = [
  {
    name: "DataProcessorDecorator",
    tabName: "Class-based",
    approach: "Traditional OOP decorator pattern",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "withRetry",
    tabName: "Function-based",
    approach: "Higher-order functions for decoration",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "createLoggingProxy",
    tabName: "Proxy-based",
    approach: "JavaScript Proxy for transparent decoration",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: PatternExample[] = [
  {
    input: "new EncryptionDecorator(new LoggingDecorator(processor))",
    output: "Enhanced processor with encryption and logging",
    description: "Chain multiple decorators",
    scenario: "Data processing - add encryption and logging to basic processor"
  },
  {
    input: "new WhipCreamDecorator(new MilkDecorator(basicCoffee))",
    output: "Coffee with milk and whip cream ($3.25)",
    description: "Coffee customization",
    scenario: "Coffee shop - customize basic coffee with various add-ons"
  },
  {
    input: "withRetry(3)(withTiming('api')(fetchData))",
    output: "Enhanced function with retry and timing",
    description: "Function decoration",
    scenario: "API client - add retry logic and performance timing to network calls"
  },
  {
    input: "createLoggingProxy(calculator, 'Calculator')",
    output: "Proxied calculator with automatic logging",
    description: "Transparent proxy decoration",
    scenario: "Development tools - add logging to existing objects without modification"
  }
];

const decoratorModule = {
  BasicDataProcessor,
  EncryptionDecorator,
  CompressionDecorator,
  LoggingDecorator,
  ValidationDecorator,
  BasicCoffee,
  MilkDecorator,
  SugarDecorator,
  WhipCreamDecorator,
  VanillaDecorator,
  withRetry,
  withTiming,
  withCaching,
  fetchUserData,
  robustFetchUserData,
  createLoggingProxy,
  Calculator,
  metadata,
  solutions,
  examples
};

export default decoratorModule;
import { PatternMetadata, PatternExample, Solution, PatternUseCase } from '@/interfaces/patterns';

/**
 * 🏗️ Factory Pattern Implementation - Object Creation Without Specification
 * 
 * DESCRIPTION:
 * Creates objects without specifying the exact class to create. This creational pattern
 * provides an interface for creating objects in a superclass, but allows subclasses
 * to alter the type of objects that will be created.
 * 
 * EXAMPLES:
 * • UI component factory - create buttons, inputs, modals based on type
 * • Database connection factory - create MySQL, PostgreSQL, MongoDB connections
 * • Payment processor factory - create PayPal, Stripe, Square handlers
 * 
 * IMPLEMENTATION APPROACHES:
 * • Simple Factory: Static method that returns objects based on input
 * • Factory Method: Virtual method that subclasses can override
 * • Abstract Factory: Create families of related objects
 * 
 * REAL-WORLD USAGE:
 * • React component libraries (Material-UI, Ant Design)
 * • Database ORM adapters
 * • API client generators
 * • Plugin systems and middleware
 * 
 * PERFORMANCE:
 * - Time: O(1) object creation
 * - Space: O(1) per created object
 */

// Product interfaces
interface Logger {
  log(message: string): void;
  getType(): string;
}

interface UIComponent {
  render(): string;
  getType(): string;
  onClick?(): void;
}

interface PaymentProcessor {
  processPayment(amount: number): Promise<{ success: boolean; transactionId: string }>;
  getProvider(): string;
}

// Concrete Products - Loggers
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[CONSOLE] ${new Date().toISOString()}: ${message}`);
  }

  getType(): string {
    return 'console';
  }
}

export class FileLogger implements Logger {
  constructor(private filename: string) {}

  log(message: string): void {
    const logEntry = `[FILE:${this.filename}] ${new Date().toISOString()}: ${message}`;
    console.log(`Writing to file: ${logEntry}`);
  }

  getType(): string {
    return 'file';
  }

  getFilename(): string {
    return this.filename;
  }
}

export class DatabaseLogger implements Logger {
  constructor(private tableName: string) {}

  log(message: string): void {
    const logEntry = `[DB:${this.tableName}] ${new Date().toISOString()}: ${message}`;
    console.log(`Inserting to database: ${logEntry}`);
  }

  getType(): string {
    return 'database';
  }

  getTableName(): string {
    return this.tableName;
  }
}

// Simple Factory - Logger Factory
export class LoggerFactory {
  public static createLogger(type: string, config?: string): Logger {
    switch (type.toLowerCase()) {
      case 'console':
        return new ConsoleLogger();
      case 'file':
        return new FileLogger(config || 'app.log');
      case 'database':
        return new DatabaseLogger(config || 'logs');
      default:
        throw new Error(`Unknown logger type: ${type}`);
    }
  }

  public static getAvailableTypes(): string[] {
    return ['console', 'file', 'database'];
  }
}

// Concrete Products - UI Components
export class Button implements UIComponent {
  constructor(private label: string, private variant: string = 'primary') {}

  render(): string {
    return `<button class="btn btn-${this.variant}">${this.label}</button>`;
  }

  getType(): string {
    return 'button';
  }

  onClick(): void {
    console.log(`Button "${this.label}" clicked`);
  }

  getLabel(): string {
    return this.label;
  }
}

export class Input implements UIComponent {
  constructor(private placeholder: string, private inputType: string = 'text') {}

  render(): string {
    return `<input type="${this.inputType}" placeholder="${this.placeholder}" class="form-input">`;
  }

  getType(): string {
    return 'input';
  }

  getPlaceholder(): string {
    return this.placeholder;
  }
}

export class Modal implements UIComponent {
  constructor(private title: string, private content: string) {}

  render(): string {
    return `
      <div class="modal">
        <div class="modal-header">${this.title}</div>
        <div class="modal-content">${this.content}</div>
      </div>
    `;
  }

  getType(): string {
    return 'modal';
  }

  getTitle(): string {
    return this.title;
  }
}

// Factory Method Pattern - UI Component Factory
export abstract class UIComponentFactory {
  public abstract createComponent(type: string, ...args: unknown[]): UIComponent;

  // Template method using factory method
  public createAndRender(type: string, ...args: unknown[]): string {
    const component = this.createComponent(type, ...args);
    return component.render();
  }
}

export class WebUIComponentFactory extends UIComponentFactory {
  public createComponent(type: string, ...args: unknown[]): UIComponent {
    switch (type.toLowerCase()) {
      case 'button':
        return new Button(args[0] as string, args[1] as string);
      case 'input':
        return new Input(args[0] as string, args[1] as string);
      case 'modal':
        return new Modal(args[0] as string, args[1] as string);
      default:
        throw new Error(`Unknown UI component type: ${type}`);
    }
  }
}

// Concrete Products - Payment Processors
export class PayPalProcessor implements PaymentProcessor {
  async processPayment(amount: number): Promise<{ success: boolean; transactionId: string }> {
    // Simulate PayPal API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
      success: amount > 0,
      transactionId: `PP_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  getProvider(): string {
    return 'PayPal';
  }
}

export class StripeProcessor implements PaymentProcessor {
  async processPayment(amount: number): Promise<{ success: boolean; transactionId: string }> {
    // Simulate Stripe API call
    await new Promise(resolve => setTimeout(resolve, 150));
    return {
      success: amount > 0,
      transactionId: `stripe_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  getProvider(): string {
    return 'Stripe';
  }
}

export class SquareProcessor implements PaymentProcessor {
  async processPayment(amount: number): Promise<{ success: boolean; transactionId: string }> {
    // Simulate Square API call
    await new Promise(resolve => setTimeout(resolve, 120));
    return {
      success: amount > 0,
      transactionId: `sq_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  getProvider(): string {
    return 'Square';
  }
}

// Factory with dependency injection
export class PaymentProcessorFactory {
  private static processors: Map<string, () => PaymentProcessor> = new Map([
    ['paypal', () => new PayPalProcessor()],
    ['stripe', () => new StripeProcessor()],
    ['square', () => new SquareProcessor()]
  ]);

  public static createProcessor(provider: string): PaymentProcessor {
    const factory = this.processors.get(provider.toLowerCase());
    if (!factory) {
      throw new Error(`Unknown payment provider: ${provider}`);
    }
    return factory();
  }

  public static registerProcessor(name: string, factory: () => PaymentProcessor): void {
    this.processors.set(name.toLowerCase(), factory);
  }

  public static getAvailableProviders(): string[] {
    return Array.from(this.processors.keys());
  }
}

export const metadata: PatternMetadata = {
  title: "Factory Pattern",
  description: "Creates objects without specifying their concrete classes",
  detailedDescription: "🏗️ **The Factory Pattern - Object Creation Made Simple**\n\nCreates objects without specifying the exact class to create. Perfect for when you need flexibility in object creation!\n\n🎯 **Core Problem Solved:**\n• Decouple object creation from usage\n• Support multiple product types\n• Enable runtime object type decisions\n• Centralize creation logic\n\n🔍 **Three Implementation Approaches:**\n• **Simple Factory:** Static method returns objects based on input\n• **Factory Method:** Virtual method subclasses can override\n• **Abstract Factory:** Create families of related objects\n\n🚀 **Real-World Applications:**\n• UI component libraries (buttons, inputs, modals)\n• Database connection managers\n• Payment processor selection\n• Plugin systems and middleware\n• API client generators\n• Configuration-based object creation\n\n⚡ **Modern Usage Examples:**\n• React component factories\n• Database ORM adapters\n• Microservice client factories\n• Cloud provider abstractions",
    timeComplexity: "O(1) - constant time creation",
  spaceComplexity: "O(1) - per created object",
  difficulty: "Easy",
  category: "Creational",
  concepts: ["Object Creation", "Class Abstraction", "Runtime Decisions", "Centralized Logic", "Type Flexibility"],
  useCases: [PatternUseCase.CODE_ORGANIZATION, PatternUseCase.API_DESIGN, PatternUseCase.FRAMEWORK_DEVELOPMENT],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    relatedPatterns: ["Abstract Factory", "Builder", "Prototype"],
  modernAlternatives: ["Dependency Injection", "Factory Functions", "Module Factories"],
  frameworkSupport: ["React", "Angular", "Spring Framework", "Express.js middleware"],
  advantages: [
    "Decouples object creation from usage",
    "Supports multiple product types",
    "Centralizes creation logic",
    "Easy to extend with new types"
  ],
  disadvantages: [
    "Can add unnecessary complexity",
    "May require many factory classes",
    "Runtime type decisions only"
  ]
};

export const solutions: Solution[] = [
  {
    name: "LoggerFactory",
    tabName: "Simple Factory",
    approach: "Static method with switch statement",
    code: `// Simple Factory Implementation
interface Logger {
  log(message: string): void;
  getType(): string;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(\`[CONSOLE] \${new Date().toISOString()}: \${message}\`);
  }

  getType(): string {
    return 'console';
  }
}

class FileLogger implements Logger {
  constructor(private filename: string) {}

  log(message: string): void {
    const logEntry = \`[FILE:\${this.filename}] \${new Date().toISOString()}: \${message}\`;
    console.log(\`Writing to file: \${logEntry}\`);
  }

  getType(): string {
    return 'file';
  }
}

class LoggerFactory {
  public static createLogger(type: string, config?: string): Logger {
    switch (type.toLowerCase()) {
      case 'console':
        return new ConsoleLogger();
      case 'file':
        return new FileLogger(config || 'app.log');
      default:
        throw new Error(\`Unknown logger type: \${type}\`);
    }
  }
}`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "UIComponentFactory",
    tabName: "Factory Method",
    approach: "Abstract factory with inheritance",
    code: `// Factory Method Implementation
interface UIComponent {
  render(): string;
  getType(): string;
}

class Button implements UIComponent {
  constructor(private text: string) {}

  render(): string {
    return \`<button>\${this.text}</button>\`;
  }

  getType(): string {
    return 'button';
  }
}

abstract class UIComponentFactory {
  abstract createComponent(type: string, config: string): UIComponent;
}

class WebUIComponentFactory extends UIComponentFactory {
  createComponent(type: string, config: string): UIComponent {
    switch (type.toLowerCase()) {
      case 'button':
        return new Button(config);
      default:
        throw new Error(\`Unknown component type: \${type}\`);
    }
  }
}`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "PaymentProcessorFactory",
    tabName: "Registry-based",
    approach: "Factory with registration system",
    code: `// Registry-based Factory Implementation
interface PaymentProcessor {
  processPayment(amount: number): Promise<{ success: boolean; transactionId: string }>;
  getProvider(): string;
}

class StripeProcessor implements PaymentProcessor {
  async processPayment(amount: number): Promise<{ success: boolean; transactionId: string }> {
    return {
      success: true,
      transactionId: \`stripe_\${Math.random().toString(36).substr(2, 9)}\`
    };
  }

  getProvider(): string {
    return 'stripe';
  }
}

class PaymentProcessorFactory {
  private static processors = new Map<string, () => PaymentProcessor>();

  static register(name: string, factory: () => PaymentProcessor): void {
    this.processors.set(name.toLowerCase(), factory);
  }

  static createProcessor(type: string): PaymentProcessor {
    const factory = this.processors.get(type.toLowerCase());
    if (!factory) {
      throw new Error(\`Unknown payment processor: \${type}\`);
    }
    return factory();
  }
}`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "class"
  }
];

export const examples: PatternExample[] = [
  {
    input: "LoggerFactory.createLogger('console')",
    output: "ConsoleLogger instance",
    description: "Create console logger",
    scenario: "Logging system - create appropriate logger based on configuration"
  },
  {
    input: "uiFactory.createComponent('button', 'Click me')",
    output: "Button component instance",
    description: "Create UI component",
    scenario: "Component library - generate UI elements based on type and props"
  },
  {
    input: "PaymentProcessorFactory.createProcessor('stripe')",
    output: "StripeProcessor instance",
    description: "Create payment processor",
    scenario: "E-commerce - select payment provider based on user preference"
  },
  {
    input: "factory.createAndRender('modal', 'Alert', 'Save changes?')",
    output: "Rendered modal HTML string",
    description: "Create and render component",
    scenario: "Dynamic UI - generate and display components programmatically"
  }
];

const factoryModule = {
  LoggerFactory,
  ConsoleLogger,
  FileLogger,
  DatabaseLogger,
  UIComponentFactory,
  WebUIComponentFactory,
  Button,
  Input,
  Modal,
  PaymentProcessorFactory,
  PayPalProcessor,
  StripeProcessor,
  SquareProcessor,
  metadata,
  solutions,
  examples
};

export default factoryModule;
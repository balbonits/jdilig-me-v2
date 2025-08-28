import { PatternMetadata, PatternExample, SolutionMetadata } from '@/interfaces/patterns';

/**
 * 🏗️ Singleton Pattern Implementation - Single Instance Control
 * 
 * DESCRIPTION:
 * Ensures a class has only one instance while providing global access to that instance.
 * This fundamental creational pattern is essential for managing shared resources like
 * database connections, logging systems, and configuration objects.
 * 
 * EXAMPLES:
 * • Database connection pool - Only one pool manages all connections
 * • Logger service - Single logging instance prevents file conflicts
 * • Application config - One source of truth for settings
 * 
 * IMPLEMENTATION APPROACHES:
 * • Class-based: Traditional OOP with private constructor
 * • Closure-based: Functional approach using JavaScript closures
 * • Module-based: ES6 modules are naturally singleton
 * 
 * REAL-WORLD USAGE:
 * • Redux stores in React applications
 * • Database ORM connection managers
 * • Cache managers and service registries
 * • Global state management systems
 * 
 * PERFORMANCE:
 * - Time: O(1) access after initialization
 * - Space: O(1) single instance storage
 */

// Class-based Singleton (Traditional)
export class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private connected: boolean = false;
  private connectionId: string;

  private constructor() {
    this.connectionId = Math.random().toString(36).substr(2, 9);
    this.connect();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  private connect(): void {
    this.connected = true;
    console.log(`Database connected with ID: ${this.connectionId}`);
  }

  public query(sql: string): string {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    return `Executing: ${sql} on connection ${this.connectionId}`;
  }

  public getConnectionId(): string {
    return this.connectionId;
  }

  public isConnected(): boolean {
    return this.connected;
  }
}

// Closure-based Singleton (Functional)
export const createLoggerSingleton = (() => {
  let instance: Logger | null = null;

  class Logger {
    private logs: string[] = [];
    private id: string;

    constructor() {
      this.id = `logger-${Date.now()}`;
    }

    public log(message: string): void {
      const timestamp = new Date().toISOString();
      const logEntry = `[${timestamp}] ${message}`;
      this.logs.push(logEntry);
      console.log(logEntry);
    }

    public getLogs(): string[] {
      return [...this.logs];
    }

    public getId(): string {
      return this.id;
    }

    public clear(): void {
      this.logs = [];
    }
  }

  return (): Logger => {
    if (!instance) {
      instance = new Logger();
    }
    return instance;
  };
})();

// Module-based Singleton (ES6 Modules)
class ConfigManager {
  private config: Record<string, unknown> = {};
  private readonly instanceId: string;

  constructor() {
    this.instanceId = `config-${Math.random().toString(36).substr(2, 9)}`;
    this.loadDefaultConfig();
  }

  private loadDefaultConfig(): void {
    this.config = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retryAttempts: 3,
      environment: 'development'
    };
  }

  public get<T>(key: string): T | undefined {
    return this.config[key] as T;
  }

  public set(key: string, value: unknown): void {
    this.config[key] = value;
  }

  public getAll(): Record<string, unknown> {
    return { ...this.config };
  }

  public getInstanceId(): string {
    return this.instanceId;
  }

  public update(newConfig: Record<string, unknown>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Export the singleton instance (ES6 module pattern)
export const appConfig = new ConfigManager();

export const metadata: PatternMetadata = {
  title: "Singleton Pattern",
  description: "Ensures a class has only one instance with global access point",
  detailedDescription: "🏗️ **The Singleton Pattern - Single Instance Control**\n\nEnsures a class has only one instance while providing global access to that instance. Essential for managing shared resources!\n\n🎯 **Core Problem Solved:**\n• Need exactly one instance of a class\n• Global access point required\n• Prevent multiple instantiation\n• Control resource allocation\n\n🔍 **Three Implementation Approaches:**\n• **Class-based:** Traditional OOP with private constructor\n• **Closure-based:** Functional approach using JavaScript closures\n• **Module-based:** ES6 modules are naturally singleton\n\n🚀 **Real-World Applications:**\n• Database connection pools\n• Logging systems and audit trails\n• Configuration managers\n• Cache systems and registries\n• Redux stores in React apps\n\n⚡ **Modern Considerations:**\n• Thread safety in Node.js\n• Module loading behavior\n• Memory management\n• Testing challenges and mocking",
  concepts: ["object creation", "global state", "instance control", "resource management"],
  timeComplexity: "O(1) - constant time access",
  spaceComplexity: "O(1) - single instance storage",
  difficulty: "Easy",
  category: "Creational",
  useCases: ["State Management", "Object Creation", "Performance"],
  realWorldApplications: [
    "Database connection pooling",
    "Logging and audit systems",
    "Application configuration management",
    "Cache managers and service registries",
    "Redux stores in React applications",
    "Global state management"
  ],
  relatedPatterns: ["Factory", "Builder", "Prototype"],
  modernAlternatives: ["ES6 Modules", "Dependency Injection", "React Context"],
  frameworkSupport: ["Redux", "Vuex", "Angular Services", "Node.js modules"]
};

export const solutions: SolutionMetadata[] = [
  {
    name: "DatabaseConnection",
    tabName: "Class-based",
    approach: "Traditional OOP with private constructor",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "createLoggerSingleton",
    tabName: "Closure-based",
    approach: "Functional approach using closures",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "appConfig",
    tabName: "Module-based",
    approach: "ES6 module natural singleton",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "constant"
  }
];

export const examples: PatternExample[] = [
  {
    input: "DatabaseConnection.getInstance()",
    output: "DatabaseConnection instance",
    description: "Get database connection",
    scenario: "Database connection pool - ensure only one connection manager exists"
  },
  {
    input: "createLoggerSingleton()",
    output: "Logger instance",
    description: "Get logger instance",
    scenario: "Application logging - single logger prevents file conflicts"
  },
  {
    input: "appConfig.get('apiUrl')",
    output: "'https://api.example.com'",
    description: "Access configuration",
    scenario: "App configuration - one source of truth for all settings"
  },
  {
    input: "Multiple getInstance() calls",
    output: "Same instance reference",
    description: "Instance consistency",
    scenario: "Verify singleton behavior - all calls return same instance"
  }
];

const singletonModule = {
  DatabaseConnection,
  createLoggerSingleton,
  appConfig,
  metadata,
  solutions,
  examples
};

export default singletonModule;
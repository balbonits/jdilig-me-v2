import { PatternMetadata, PatternExample, PatternUseCase } from '@/interfaces/patterns';
import { Solution } from '@/interfaces/shared';

/**
 * 🔗 Adapter Pattern Implementation - Interface Compatibility
 * 
 * DESCRIPTION:
 * Allows incompatible interfaces to work together by providing a wrapper
 * that translates one interface to another. Perfect for integrating third-party
 * libraries or legacy code with modern applications.
 * 
 * EXAMPLES:
 * • API wrappers - Adapt REST APIs to GraphQL interfaces
 * • Legacy code integration - Modern interfaces for old systems
 * • Third-party library wrappers - Consistent API across different libraries
 * 
 * IMPLEMENTATION APPROACHES:
 * • Object adapter - Composition-based adapter using existing objects
 * • Class adapter - Inheritance-based adapter (less common in JS/TS)
 * • Function adapter - Simple function-based interface translation
 * 
 * REAL-WORLD USAGE:
 * • jQuery to modern framework adapters
 * • Database ORM adapters for different databases  
 * • Payment gateway adapters
 * • File system adapters across different platforms
 * 
 * PERFORMANCE:
 * - Time: O(1) for interface translation
 * - Space: O(1) for adapter instance
 */

// Legacy API that we need to adapt
class LegacyPrinter {
  public printOldWay(text: string): void {
    console.log(`LEGACY PRINT: ${text.toUpperCase()}`);
  }

  public getStatus(): string {
    return "READY_TO_PRINT";
  }
}

// Modern interface that our application expects
interface ModernPrinter {
  print(document: string): void;
  isReady(): boolean;
  getJobCount(): number;
}

// Object Adapter - adapts legacy printer to modern interface
export class PrinterAdapter implements ModernPrinter {
  private jobCount: number = 0;

  constructor(private legacyPrinter: LegacyPrinter) {}

  public print(document: string): void {
    // Translate modern interface to legacy interface
    this.legacyPrinter.printOldWay(document);
    this.jobCount++;
  }

  public isReady(): boolean {
    // Translate legacy status to modern boolean
    return this.legacyPrinter.getStatus() === "READY_TO_PRINT";
  }

  public getJobCount(): number {
    return this.jobCount;
  }
}

// API Adapter Example - Different API formats
interface OldWeatherAPI {
  getCurrentWeather(): {
    temp: number;
    conditions: string;
    humidity: number;
  };
}

interface NewWeatherAPI {
  getWeatherData(): {
    temperature: number;
    description: string;
    humidity: number;
    timestamp: Date;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class OldWeatherService implements OldWeatherAPI {
  getCurrentWeather() {
    return {
      temp: 75,
      conditions: "sunny",
      humidity: 60
    };
  }
}

export class WeatherAPIAdapter implements NewWeatherAPI {
  constructor(private oldAPI: OldWeatherAPI) {}

  getWeatherData() {
    const oldData = this.oldAPI.getCurrentWeather();
    
    // Adapt old format to new format
    return {
      temperature: oldData.temp,
      description: oldData.conditions,
      humidity: oldData.humidity,
      timestamp: new Date()
    };
  }
}

// Database Adapter Example - Different database interfaces
interface SQLDatabase {
  query(sql: string): Promise<unknown[]>;
  close(): Promise<void>;
}

interface NoSQLDatabase {
  find(collection: string, filter: Record<string, unknown>): Promise<unknown[]>;
  disconnect(): Promise<void>;
}

// Unified database interface
interface UnifiedDatabase {
  findRecords(table: string, criteria: Record<string, unknown>): Promise<unknown[]>;
  closeConnection(): Promise<void>;
}

export class SQLDatabaseAdapter implements UnifiedDatabase {
  constructor(private sqlDB: SQLDatabase) {}

  async findRecords(table: string, criteria: Record<string, unknown>): Promise<unknown[]> {
    // Convert criteria to SQL WHERE clause
    const whereClause = Object.entries(criteria)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(' AND ');
    
    const sql = `SELECT * FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
    return await this.sqlDB.query(sql);
  }

  async closeConnection(): Promise<void> {
    return await this.sqlDB.close();
  }
}

export class NoSQLDatabaseAdapter implements UnifiedDatabase {
  constructor(private noSqlDB: NoSQLDatabase) {}

  async findRecords(table: string, criteria: Record<string, unknown>): Promise<unknown[]> {
    return await this.noSqlDB.find(table, criteria);
  }

  async closeConnection(): Promise<void> {
    return await this.noSqlDB.disconnect();
  }
}

// Function-based Adapter - Simpler approach
export function createArrayAdapter<T, R>(
  legacyArray: T[], 
  transformer: (item: T) => R
): R[] {
  return legacyArray.map(transformer);
}

// Payment Gateway Adapter Example
interface PayPalGateway {
  makePayment(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }>;
}

interface StripeGateway {
  charge(amountInCents: number, currency: string): Promise<{ paid: boolean; id: string }>;
}

interface UnifiedPaymentGateway {
  processPayment(amount: number, currency: string): Promise<{ 
    success: boolean; 
    transactionId: string; 
  }>;
}

export class PayPalAdapter implements UnifiedPaymentGateway {
  constructor(private paypal: PayPalGateway) {}

  async processPayment(amount: number, currency: string) {
    const result = await this.paypal.makePayment(amount, currency);
    return {
      success: result.success,
      transactionId: result.transactionId
    };
  }
}

export class StripeAdapter implements UnifiedPaymentGateway {
  constructor(private stripe: StripeGateway) {}

  async processPayment(amount: number, currency: string) {
    // Convert dollars to cents for Stripe
    const amountInCents = Math.round(amount * 100);
    const result = await this.stripe.charge(amountInCents, currency);
    
    return {
      success: result.paid,
      transactionId: result.id
    };
  }
}

// Media Player Adapter Example
interface AudioPlayer {
  play(audioType: string, fileName: string): void;
}

interface AdvancedMediaPlayer {
  playVlc(fileName: string): void;
  playMp4(fileName: string): void;
}

class VlcPlayer implements AdvancedMediaPlayer {
  playVlc(fileName: string): void {
    console.log(`Playing vlc file: ${fileName}`);
  }

  playMp4(fileName: string): void {
    console.log(`VLC cannot play mp4 file: ${fileName}`);
  }
}

class Mp4Player implements AdvancedMediaPlayer {
  playVlc(fileName: string): void {
    console.log(`MP4 player cannot play vlc file: ${fileName}`);
  }

  playMp4(fileName: string): void {
    console.log(`Playing mp4 file: ${fileName}`);
  }
}

export class MediaAdapter implements AudioPlayer {
  private advancedPlayer: AdvancedMediaPlayer;

  constructor(audioType: string) {
    if (audioType === "vlc") {
      this.advancedPlayer = new VlcPlayer();
    } else if (audioType === "mp4") {
      this.advancedPlayer = new Mp4Player();
    } else {
      throw new Error(`Unsupported audio type: ${audioType}`);
    }
  }

  play(audioType: string, fileName: string): void {
    if (audioType === "vlc") {
      this.advancedPlayer.playVlc(fileName);
    } else if (audioType === "mp4") {
      this.advancedPlayer.playMp4(fileName);
    }
  }
}

export class AudioPlayerWithAdapter implements AudioPlayer {
  private mediaAdapter: MediaAdapter | null = null;

  play(audioType: string, fileName: string): void {
    // Built-in support for mp3
    if (audioType === "mp3") {
      console.log(`Playing mp3 file: ${fileName}`);
    }
    // Use adapter for other formats
    else if (audioType === "vlc" || audioType === "mp4") {
      this.mediaAdapter = new MediaAdapter(audioType);
      this.mediaAdapter.play(audioType, fileName);
    } else {
      console.log(`${audioType} format not supported`);
    }
  }
}

export const metadata: PatternMetadata = {
  title: "Adapter Pattern",
  description: "Make incompatible interfaces work together through translation",
  detailedDescription: "🔗 **The Adapter Pattern - Interface Compatibility**\n\nAllows incompatible interfaces to work together by providing a wrapper that translates one interface to another. Perfect for integration!\n\n🎯 **Core Problem Solved:**\n• Integrate incompatible interfaces without modifying existing code\n• Wrap third-party libraries with consistent APIs\n• Bridge legacy systems with modern applications\n• Enable code reuse across different interface requirements\n\n🔍 **Three Implementation Approaches:**\n• **Object Adapter:** Composition-based adapter using existing objects\n• **Class Adapter:** Inheritance-based adapter (less common in JS/TS)\n• **Function Adapter:** Simple function-based interface translation\n\n🚀 **Real-World Applications:**\n• API wrappers and gateway adapters\n• Database ORM adapters for different databases\n• Payment gateway integration layers\n• Legacy code integration with modern systems\n• Third-party library wrapper implementations\n• File system adapters across platforms\n\n⚡ **Modern Usage Examples:**\n• React component wrappers for different UI libraries\n• GraphQL adapters for REST APIs\n• Node.js stream adapters\n• Cloud provider SDK adapters",
  category: "Structural",
  difficulty: "Medium",
  concepts: ['interface translation', 'wrapper pattern', 'compatibility layer'],
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",
  useCases: [PatternUseCase.API_DESIGN, PatternUseCase.SYSTEM_INTEGRATION, PatternUseCase.CODE_ORGANIZATION],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    relatedPatterns: ["Facade", "Bridge", "Decorator"],
  frameworkSupport: ["TypeScript interfaces", "Dependency injection", "Express.js middleware"]
};

export const examples: PatternExample[] = [
  {
    scenario: "Legacy printer integration",
    description: "Adapt old printer API to modern interface",
    input: "new PrinterAdapter(legacyPrinter).print('Hello World')",
    output: "LEGACY PRINT: HELLO WORLD (with job counting)"
  },
  {
    scenario: "Weather API adaptation",
    description: "Convert old weather API format to new standard",
    input: "weatherAdapter.getWeatherData()",
    output: "{ temperature: 75, description: 'sunny', humidity: 60, timestamp: Date }"
  },
  {
    scenario: "Payment gateway unification",
    description: "Unified interface for different payment providers",
    input: "stripeAdapter.processPayment(10.00, 'USD')",
    output: "{ success: true, transactionId: 'stripe_abc123' }"
  }
];

export const solutions: Solution[] = [
  {
    name: "object-adapter",
    tabName: "Object Adapter",
    approach: "Composition-Based Interface Translation",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    code: `// Target interface our application expects
interface ModernPrinter {
  print(document: string): void;
  isReady(): boolean;
  getJobCount(): number;
}

// Legacy class we need to adapt
class LegacyPrinter {
  public printOldWay(text: string): void {
    console.log(\`LEGACY PRINT: \${text.toUpperCase()}\`);
  }

  public getStatus(): string {
    return "READY_TO_PRINT";
  }
}

// Adapter that makes legacy printer work with modern interface
class PrinterAdapter implements ModernPrinter {
  private jobCount: number = 0;

  constructor(private legacyPrinter: LegacyPrinter) {}

  public print(document: string): void {
    // Translate modern call to legacy method
    this.legacyPrinter.printOldWay(document);
    this.jobCount++;
  }

  public isReady(): boolean {
    // Translate legacy status to boolean
    return this.legacyPrinter.getStatus() === "READY_TO_PRINT";
  }

  public getJobCount(): number {
    return this.jobCount;
  }
}

// Usage
const legacyPrinter = new LegacyPrinter();
const adapter = new PrinterAdapter(legacyPrinter);

adapter.print("Hello World"); // Works with modern interface
console.log(adapter.isReady()); // true
console.log(adapter.getJobCount()); // 1`
  },
  {
    name: "function-adapter",
    tabName: "Function Adapter",
    approach: "Functional Interface Translation",
    type: "function",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    code: `// Simple function-based adapter for data transformation
function createArrayAdapter<T, R>(
  legacyArray: T[], 
  transformer: (item: T) => R
): R[] {
  return legacyArray.map(transformer);
}

// Example: Adapting legacy user data format
interface LegacyUser {
  name: string;
  age: number;
}

interface ModernUser {
  fullName: string;
  yearOfBirth: number;
  id: string;
}

const legacyUsers: LegacyUser[] = [
  { name: "John Doe", age: 30 },
  { name: "Jane Smith", age: 25 }
];

// Adapter function transforms the data
const modernUsers = createArrayAdapter(legacyUsers, (user) => ({
  fullName: user.name,
  yearOfBirth: new Date().getFullYear() - user.age,
  id: Math.random().toString(36).substr(2, 9)
}));

console.log(modernUsers);
// [
//   { fullName: "John Doe", yearOfBirth: 1994, id: "abc123" },
//   { fullName: "Jane Smith", yearOfBirth: 1999, id: "def456" }
// ]`
  },
  {
    name: "api-adapter",
    tabName: "API Adapter",
    approach: "Service Interface Unification",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `// Different payment gateway interfaces
interface PayPalGateway {
  makePayment(amount: number, currency: string): Promise<{
    success: boolean;
    transactionId: string;
  }>;
}

interface StripeGateway {
  charge(amountInCents: number, currency: string): Promise<{
    paid: boolean;
    id: string;
  }>;
}

// Unified interface for our application
interface UnifiedPaymentGateway {
  processPayment(amount: number, currency: string): Promise<{
    success: boolean;
    transactionId: string;
  }>;
}

// Adapters for each payment provider
class PayPalAdapter implements UnifiedPaymentGateway {
  constructor(private paypal: PayPalGateway) {}

  async processPayment(amount: number, currency: string) {
    const result = await this.paypal.makePayment(amount, currency);
    return {
      success: result.success,
      transactionId: result.transactionId
    };
  }
}

class StripeAdapter implements UnifiedPaymentGateway {
  constructor(private stripe: StripeGateway) {}

  async processPayment(amount: number, currency: string) {
    // Convert dollars to cents for Stripe
    const amountInCents = Math.round(amount * 100);
    const result = await this.stripe.charge(amountInCents, currency);
    
    return {
      success: result.paid,
      transactionId: result.id
    };
  }
}

// Usage - same interface for different providers
const paypalAdapter = new PayPalAdapter(paypalService);
const stripeAdapter = new StripeAdapter(stripeService);

// Both work with the same interface
await paypalAdapter.processPayment(50.00, 'USD');
await stripeAdapter.processPayment(50.00, 'USD');`
  }
];
const adapterModule = {
  metadata,
  solutions, 
  examples
};

export default adapterModule;

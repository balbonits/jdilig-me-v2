/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PatternMetadata, PatternExample, Solution, PatternUseCase } from '@/interfaces/patterns';

/**
 * 🔗 Proxy Pattern Implementation - Access Control
 * 
 * DESCRIPTION:
 * Provides a placeholder or surrogate for another object to control access to it.
 * Acts as an intermediary that can add functionality like lazy loading, access control,
 * caching, or logging without changing the original object.
 * 
 * EXAMPLES:
 * • Virtual proxy - Lazy loading of expensive resources
 * • Protection proxy - Access control and authentication
 * • Caching proxy - Cache results to improve performance
 * 
 * IMPLEMENTATION APPROACHES:
 * • Virtual proxy - Defer expensive operations until needed
 * • Protection proxy - Control access based on permissions
 * • Smart proxy - Add extra functionality like reference counting
 * 
 * REAL-WORLD USAGE:
 * • CDN networks as proxy for web content
 * • ORM lazy loading for database relationships
 * • Image placeholders that load on demand
 * • API rate limiting and throttling proxies
 * 
 * PERFORMANCE:
 * - Time: O(1) for proxy operations, varies for underlying operations
 * - Space: O(1) for proxy overhead
 */

// Subject interface that both real object and proxy implement
interface Image {
  display(): void;
  getSize(): number;
}

// Real subject - expensive to create
class RealImage implements Image {
  private filename: string;
  private data: Buffer | null = null;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk(); // Expensive operation
  }

  private loadFromDisk(): void {
    console.log(`Loading image from disk: ${this.filename}`);
    // Simulate expensive file loading
    this.data = Buffer.from(`Image data for ${this.filename}`);
  }

  display(): void {
    console.log(`Displaying image: ${this.filename}`);
  }

  getSize(): number {
    return this.data?.length || 0;
  }
}

// Virtual Proxy - delays expensive creation until needed
export class ImageProxy implements Image {
  private realImage: RealImage | null = null;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    // Don't load the real image yet - lazy loading!
  }

  display(): void {
    // Load real image only when actually needed
    if (!this.realImage) {
      console.log('Proxy: Creating real image (lazy loading)');
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }

  getSize(): number {
    if (!this.realImage) {
      // Could return cached metadata without loading full image
      console.log('Proxy: Returning cached size without loading image');
      return 0; // or cached size
    }
    return this.realImage.getSize();
  }
}

// Protection Proxy - controls access based on permissions
interface BankAccount {
  withdraw(amount: number): boolean;
  deposit(amount: number): void;
  getBalance(): number;
}

class RealBankAccount implements BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  withdraw(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
      return true;
    }
    console.log(`Insufficient funds. Balance: $${this.balance}`);
    return false;
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }

  getBalance(): number {
    return this.balance;
  }
}

export class ProtectedBankAccountProxy implements BankAccount {
  private realAccount: RealBankAccount;
  private userRole: string;

  constructor(account: RealBankAccount, userRole: string) {
    this.realAccount = account;
    this.userRole = userRole;
  }

  withdraw(amount: number): boolean {
    if (this.userRole !== 'owner' && this.userRole !== 'authorized') {
      console.log('Access denied: Insufficient permissions for withdrawal');
      return false;
    }

    // Additional business rules
    if (amount > 1000 && this.userRole !== 'owner') {
      console.log('Access denied: Large withdrawals require owner permission');
      return false;
    }

    console.log(`Proxy: Authorizing withdrawal for ${this.userRole}`);
    return this.realAccount.withdraw(amount);
  }

  deposit(amount: number): void {
    if (this.userRole === 'guest') {
      console.log('Access denied: Guests cannot make deposits');
      return;
    }

    console.log(`Proxy: Authorizing deposit for ${this.userRole}`);
    this.realAccount.deposit(amount);
  }

  getBalance(): number {
    if (this.userRole === 'guest') {
      console.log('Access denied: Guests cannot view balance');
      return 0;
    }

    console.log(`Proxy: Authorizing balance check for ${this.userRole}`);
    return this.realAccount.getBalance();
  }
}

// Caching Proxy - caches expensive operations
interface DataService {
  getData(key: string): Promise<string>;
  setData(key: string, value: string): Promise<void>;
}

class ExpensiveDataService implements DataService {
  private data: Map<string, string> = new Map();

  async getData(key: string): Promise<string> {
    console.log(`ExpensiveDataService: Fetching data for key: ${key}`);
    // Simulate expensive database/API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return this.data.get(key) || `Data for ${key}`;
  }

  async setData(key: string, value: string): Promise<void> {
    console.log(`ExpensiveDataService: Setting data for key: ${key}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    this.data.set(key, value);
  }
}

export class CachingDataProxy implements DataService {
  private realService: ExpensiveDataService;
  private cache: Map<string, { value: string; timestamp: number }> = new Map();
  private cacheTTL: number = 5000; // 5 seconds

  constructor(realService: ExpensiveDataService) {
    this.realService = realService;
  }

  async getData(key: string): Promise<string> {
    const cached = this.cache.get(key);
    const now = Date.now();

    // Return cached data if valid
    if (cached && (now - cached.timestamp) < this.cacheTTL) {
      console.log(`Proxy: Returning cached data for key: ${key}`);
      return cached.value;
    }

    // Cache miss or expired - fetch from real service
    console.log(`Proxy: Cache miss for key: ${key}, fetching from real service`);
    const data = await this.realService.getData(key);
    
    // Cache the result
    this.cache.set(key, { value: data, timestamp: now });
    return data;
  }

  async setData(key: string, value: string): Promise<void> {
    // Update real service
    await this.realService.setData(key, value);
    
    // Update cache
    this.cache.set(key, { value, timestamp: Date.now() });
    console.log(`Proxy: Updated cache for key: ${key}`);
  }

  // Additional proxy method for cache management
  clearCache(): void {
    this.cache.clear();
    console.log('Proxy: Cache cleared');
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Modern JavaScript Proxy - using built-in Proxy
export class ValidationProxy {
  static create<T extends Record<string, any>>(target: T, validationRules: Record<string, (value: any) => boolean>): T {
    return new Proxy(target, {
      set(obj, prop, value) {
        const rule = validationRules[prop as string];
        
        if (rule && !rule(value)) {
          throw new Error(`Validation failed for property ${String(prop)}: ${value}`);
        }

        console.log(`Proxy: Setting ${String(prop)} = ${value}`);
        obj[prop as keyof T] = value;
        return true;
      },

      get(obj, prop) {
        console.log(`Proxy: Getting property ${String(prop)}`);
        return obj[prop as keyof T];
      }
    });
  }
}

// Smart Proxy - adds intelligence and monitoring
interface WebService {
  request(endpoint: string, data?: any): Promise<any>;
}

class RealWebService implements WebService {
  async request(endpoint: string, data?: any): Promise<any> {
    console.log(`Making request to: ${endpoint}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    return { status: 'success', data: `Response from ${endpoint}` };
  }
}

export class SmartWebServiceProxy implements WebService {
  private realService: RealWebService;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;
  private rateLimitDelay: number = 100; // ms between requests

  constructor(realService: RealWebService) {
    this.realService = realService;
  }

  async request(endpoint: string, data?: any): Promise<any> {
    // Rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.rateLimitDelay) {
      const delay = this.rateLimitDelay - timeSinceLastRequest;
      console.log(`Proxy: Rate limiting - waiting ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Request monitoring
    this.requestCount++;
    this.lastRequestTime = Date.now();
    
    console.log(`Proxy: Request #${this.requestCount} to ${endpoint}`);
    
    try {
      const result = await this.realService.request(endpoint, data);
      console.log(`Proxy: Request successful`);
      return result;
    } catch (error) {
      console.log(`Proxy: Request failed - ${error}`);
      throw error;
    }
  }

  getRequestCount(): number {
    return this.requestCount;
  }

  getLastRequestTime(): number {
    return this.lastRequestTime;
  }
}

export const metadata: PatternMetadata = {
  title: "Proxy Pattern",
  description: "Control access to objects through placeholder intermediaries",
  detailedDescription: "🔗 **The Proxy Pattern - Access Control**\n\nProvides a placeholder or surrogate for another object to control access to it. Perfect for adding functionality without changing the original!\n\n🎯 **Core Problem Solved:**\n• Control access to expensive or sensitive objects\n• Add functionality without modifying original objects\n• Implement lazy loading and resource management\n• Provide transparent access control and monitoring\n\n🔍 **Three Implementation Approaches:**\n• **Virtual Proxy:** Defer expensive operations until needed\n• **Protection Proxy:** Control access based on permissions\n• **Smart Proxy:** Add extra functionality like caching or monitoring\n\n🚀 **Real-World Applications:**\n• CDN networks as proxies for web content delivery\n• ORM lazy loading for database relationships\n• API rate limiting and throttling mechanisms\n• Image placeholders that load on demand\n• Security proxies for access control\n• Caching layers for expensive operations\n\n⚡ **Modern Usage Examples:**\n• JavaScript Proxy for object interception\n• React lazy loading components\n• Service workers as network proxies\n• Database connection pooling proxies",
  category: "Structural",
  difficulty: "Medium",
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",
  concepts: ["Access Control", "Lazy Loading", "Object Surrogates", "Transparent Intermediation", "Resource Management"],
  useCases: [PatternUseCase.PERFORMANCE_OPTIMIZATION, PatternUseCase.MEMORY_MANAGEMENT, PatternUseCase.API_DESIGN],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    relatedPatterns: ["Decorator", "Adapter", "Facade"],
  frameworkSupport: ["JavaScript Proxy", "React.lazy", "Service Workers", "HTTP Proxies"]
};

export const examples: PatternExample[] = [
  {
    scenario: "Image lazy loading",
    description: "Load expensive images only when needed",
    input: "imageProxy.display()",
    output: "Proxy: Creating real image (lazy loading) -> Displaying image: photo.jpg"
  },
  {
    scenario: "Bank account protection",
    description: "Control access based on user permissions",
    input: "protectedAccount.withdraw(1500) // guest user",
    output: "Access denied: Insufficient permissions for withdrawal"
  },
  {
    scenario: "Data service caching",
    description: "Cache expensive API calls automatically",
    input: "cachingProxy.getData('user:123')",
    output: "First call: fetches from API, subsequent calls: returns from cache"
  }
];

export const solutions: Solution[] = [
  {
    name: "virtual-proxy",
    tabName: "Virtual Proxy",
    approach: "Lazy Loading Implementation",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    code: `// Subject interface
interface Image {
  display(): void;
  getSize(): number;
}

// Expensive real subject
class RealImage implements Image {
  private filename: string;
  private data: Buffer | null = null;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk(); // Expensive operation!
  }

  private loadFromDisk(): void {
    console.log(\`Loading image from disk: \${this.filename}\`);
    this.data = Buffer.from(\`Image data for \${this.filename}\`);
  }

  display(): void {
    console.log(\`Displaying image: \${this.filename}\`);
  }

  getSize(): number {
    return this.data?.length || 0;
  }
}

// Virtual proxy delays creation until needed
class ImageProxy implements Image {
  private realImage: RealImage | null = null;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    // No expensive loading here!
  }

  display(): void {
    // Lazy loading - create real image only when needed
    if (!this.realImage) {
      console.log('Proxy: Creating real image (lazy loading)');
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }

  getSize(): number {
    if (!this.realImage) {
      console.log('Proxy: Returning cached size without loading');
      return 0; // Could return cached metadata
    }
    return this.realImage.getSize();
  }
}

// Usage
const image = new ImageProxy('large-photo.jpg');
// No loading happens here!

console.log(image.getSize()); // No image loaded
image.display(); // Now the real image is loaded and displayed`
  },
  {
    name: "protection-proxy",
    tabName: "Protection Proxy",
    approach: "Access Control Implementation",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `interface BankAccount {
  withdraw(amount: number): boolean;
  deposit(amount: number): void;
  getBalance(): number;
}

class RealBankAccount implements BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  withdraw(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(\`Withdrew $\${amount}. Balance: $\${this.balance}\`);
      return true;
    }
    return false;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

// Protection proxy controls access based on user role
class ProtectedBankAccountProxy implements BankAccount {
  private realAccount: RealBankAccount;
  private userRole: string;

  constructor(account: RealBankAccount, userRole: string) {
    this.realAccount = account;
    this.userRole = userRole;
  }

  withdraw(amount: number): boolean {
    // Check permissions
    if (this.userRole !== 'owner' && this.userRole !== 'authorized') {
      console.log('Access denied: Insufficient permissions');
      return false;
    }

    // Business rules
    if (amount > 1000 && this.userRole !== 'owner') {
      console.log('Access denied: Large withdrawals require owner');
      return false;
    }

    return this.realAccount.withdraw(amount);
  }

  deposit(amount: number): void {
    if (this.userRole === 'guest') {
      console.log('Access denied: Guests cannot deposit');
      return;
    }
    this.realAccount.deposit(amount);
  }

  getBalance(): number {
    if (this.userRole === 'guest') {
      console.log('Access denied: Guests cannot view balance');
      return 0;
    }
    return this.realAccount.getBalance();
  }
}

// Usage with different permissions
const account = new RealBankAccount(1000);
const guestProxy = new ProtectedBankAccountProxy(account, 'guest');
const ownerProxy = new ProtectedBankAccountProxy(account, 'owner');

guestProxy.withdraw(100); // Denied
ownerProxy.withdraw(100); // Allowed`
  },
  {
    name: "caching-proxy",
    tabName: "Caching Proxy",
    approach: "Performance Enhancement",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    code: `interface DataService {
  getData(key: string): Promise<string>;
  setData(key: string, value: string): Promise<void>;
}

class ExpensiveDataService implements DataService {
  private data: Map<string, string> = new Map();

  async getData(key: string): Promise<string> {
    console.log(\`Fetching from database: \${key}\`);
    // Simulate expensive database call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.data.get(key) || \`Data for \${key}\`;
  }

  async setData(key: string, value: string): Promise<void> {
    console.log(\`Saving to database: \${key}\`);
    await new Promise(resolve => setTimeout(resolve, 500));
    this.data.set(key, value);
  }
}

// Caching proxy improves performance
class CachingDataProxy implements DataService {
  private realService: ExpensiveDataService;
  private cache: Map<string, { value: string; timestamp: number }>;
  private cacheTTL: number = 5000; // 5 seconds

  constructor(realService: ExpensiveDataService) {
    this.realService = realService;
    this.cache = new Map();
  }

  async getData(key: string): Promise<string> {
    const cached = this.cache.get(key);
    const now = Date.now();

    // Return cached data if still valid
    if (cached && (now - cached.timestamp) < this.cacheTTL) {
      console.log(\`Returning cached data for: \${key}\`);
      return cached.value;
    }

    // Cache miss or expired - fetch from real service
    console.log(\`Cache miss for: \${key}, fetching...\`);
    const data = await this.realService.getData(key);
    
    // Store in cache
    this.cache.set(key, { value: data, timestamp: now });
    return data;
  }

  async setData(key: string, value: string): Promise<void> {
    await this.realService.setData(key, value);
    // Update cache
    this.cache.set(key, { value, timestamp: Date.now() });
  }
}

// Usage
const expensiveService = new ExpensiveDataService();
const proxy = new CachingDataProxy(expensiveService);

await proxy.getData('user:123'); // Slow: fetches from database
await proxy.getData('user:123'); // Fast: returns from cache`
  }
];
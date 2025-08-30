/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { PatternMetadata, PatternExample, PatternUseCase, Solution } from '../interfaces/patterns';

// Basic Mixin Type
type Constructor<T = {}> = new (...args: any[]) => T;

// Timestamped Mixin
interface Timestamped {
  timestamp: Date;
  getAge(): number;
  setTimestamp(date: Date): void;
}

function TimestampedMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Timestamped {
    timestamp: Date = new Date();

    getAge(): number {
      return Date.now() - this.timestamp.getTime();
    }

    setTimestamp(date: Date): void {
      this.timestamp = date;
    }

    getFormattedTimestamp(): string {
      return this.timestamp.toISOString();
    }
  };
}

// Serializable Mixin
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

function SerializableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Serializable {
    serialize(): string {
      const obj = { ...this };
      return JSON.stringify(obj);
    }

    deserialize(data: string): void {
      try {
        const parsed = JSON.parse(data);
        Object.assign(this, parsed);
      } catch (error) {
        throw new Error('Invalid serialization data');
      }
    }

    clone(): this {
      const serialized = this.serialize();
      const cloned = new (this.constructor as any)();
      cloned.deserialize(serialized);
      return cloned;
    }
  };
}

// Validatable Mixin
interface Validatable {
  errors: string[];
  isValid(): boolean;
  addError(error: string): void;
  clearErrors(): void;
  getErrors(): string[];
}

function ValidatableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Validatable {
    errors: string[] = [];

    isValid(): boolean {
      this.validate();
      return this.errors.length === 0;
    }

    addError(error: string): void {
      if (!this.errors.includes(error)) {
        this.errors.push(error);
      }
    }

    clearErrors(): void {
      this.errors = [];
    }

    getErrors(): string[] {
      return [...this.errors];
    }

    protected validate(): void {
      this.clearErrors();
      // Override in subclasses for specific validation
    }
  };
}

// Observable Mixin
interface Observable {
  observers: Array<(data: any) => void>;
  addObserver(observer: (data: any) => void): void;
  removeObserver(observer: (data: any) => void): void;
  notifyObservers(data?: any): void;
}

function ObservableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Observable {
    observers: Array<(data: any) => void> = [];

    addObserver(observer: (data: any) => void): void {
      if (!this.observers.includes(observer)) {
        this.observers.push(observer);
      }
    }

    removeObserver(observer: (data: any) => void): void {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }

    notifyObservers(data?: any): void {
      this.observers.forEach(observer => {
        try {
          observer(data);
        } catch (error) {
          console.error('Observer error:', error);
        }
      });
    }

    getObserverCount(): number {
      return this.observers.length;
    }
  };
}

// Base classes to demonstrate mixins
class User {
  constructor(public name: string, public email: string) {}

  getDisplayName(): string {
    return this.name;
  }
}

class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number
  ) {}

  getDisplayPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }
}

class BlogPost {
  constructor(
    public title: string,
    public content: string,
    public author: string
  ) {}

  getWordCount(): number {
    return this.content.split(/\s+/).filter(word => word.length > 0).length;
  }
}

// Create mixed classes
class TimestampedUser extends TimestampedMixin(User) {
  constructor(name: string, email: string) {
    super(name, email);
  }
}

class ValidatedUser extends ValidatableMixin(User) {
  constructor(name: string, email: string) {
    super(name, email);
  }

  protected validate(): void {
    super.validate();
    
    if (!this.name || this.name.trim().length === 0) {
      this.addError('Name is required');
    }
    
    if (!this.email || !this.email.includes('@')) {
      this.addError('Valid email is required');
    }
    
    if (this.name && this.name.length < 2) {
      this.addError('Name must be at least 2 characters');
    }
  }
}

// Multiple mixins composition
const SerializableTimestampedProduct = SerializableMixin(TimestampedMixin(Product));

class TrackedProduct extends SerializableTimestampedProduct {
  constructor(id: string, name: string, price: number) {
    super(id, name, price);
  }

  updatePrice(newPrice: number): void {
    this.price = newPrice;
    this.setTimestamp(new Date());
  }
}

// Complex mixin composition
const FullFeaturedBlogPost = ObservableMixin(
  ValidatableMixin(
    SerializableMixin(
      TimestampedMixin(BlogPost)
    )
  )
);

class EnhancedBlogPost extends FullFeaturedBlogPost {
  constructor(title: string, content: string, author: string) {
    super(title, content, author);
  }

  protected validate(): void {
    super.validate();
    
    if (!this.title || this.title.trim().length === 0) {
      this.addError('Title is required');
    }
    
    if (!this.content || this.content.trim().length < 10) {
      this.addError('Content must be at least 10 characters');
    }
    
    if (!this.author || this.author.trim().length === 0) {
      this.addError('Author is required');
    }
  }

  publish(): boolean {
    if (!this.isValid()) {
      console.log('Cannot publish: validation errors');
      return false;
    }
    
    this.notifyObservers({
      event: 'published',
      post: {
        title: this.title,
        author: this.author,
        timestamp: this.timestamp
      }
    });
    
    return true;
  }

  updateContent(content: string): void {
    this.content = content;
    this.setTimestamp(new Date());
    this.notifyObservers({
      event: 'updated',
      field: 'content',
      timestamp: this.timestamp
    });
  }
}

// Functional Mixins (alternative approach)
function createLoggingMixin(logPrefix: string = 'Log') {
  return function<T extends Constructor>(Base: T) {
    return class extends Base {
      log(message: string): void {
        console.log(`[${logPrefix}] ${new Date().toISOString()}: ${message}`);
      }

      logError(error: string): void {
        console.error(`[${logPrefix}] ERROR: ${error}`);
      }

      logInfo(info: string): void {
        console.info(`[${logPrefix}] INFO: ${info}`);
      }
    };
  };
}

// Cacheable Mixin
interface Cacheable {
  cache: Map<string, any>;
  getCached<T>(key: string): T | undefined;
  setCached<T>(key: string, value: T, ttl?: number): void;
  clearCache(): void;
  getCacheSize(): number;
}

function CacheableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Cacheable {
    cache: Map<string, any> = new Map();
    private cacheTimestamps: Map<string, number> = new Map();

    getCached<T>(key: string): T | undefined {
      const timestamp = this.cacheTimestamps.get(key);
      if (timestamp && Date.now() - timestamp > 300000) { // 5 minute TTL
        this.cache.delete(key);
        this.cacheTimestamps.delete(key);
        return undefined;
      }
      return this.cache.get(key);
    }

    setCached<T>(key: string, value: T, ttl: number = 300000): void {
      this.cache.set(key, value);
      this.cacheTimestamps.set(key, Date.now());
      
      // Auto-cleanup after TTL
      setTimeout(() => {
        this.cache.delete(key);
        this.cacheTimestamps.delete(key);
      }, ttl);
    }

    clearCache(): void {
      this.cache.clear();
      this.cacheTimestamps.clear();
    }

    getCacheSize(): number {
      return this.cache.size;
    }
  };
}

// Advanced mixed class with logging
class LoggedCachedUser extends createLoggingMixin('UserService')(CacheableMixin(ValidatedUser)) {
  constructor(name: string, email: string) {
    super(name, email);
    this.log(`Created user: ${name}`);
  }

  updateEmail(email: string): void {
    this.email = email;
    this.clearCache(); // Clear cache when data changes
    this.log(`Updated email for ${this.name}`);
    
    if (!this.isValid()) {
      this.logError('User validation failed after email update');
    }
  }
}

// Factory functions
export function createTimestampedUser(name: string, email: string) {
  return new TimestampedUser(name, email);
}

export function createValidatedUser(name: string, email: string) {
  return new ValidatedUser(name, email);
}

export function createTrackedProduct(id: string, name: string, price: number) {
  return new TrackedProduct(id, name, price);
}

export function createEnhancedBlogPost(title: string, content: string, author: string) {
  return new EnhancedBlogPost(title, content, author);
}

export function createLoggedCachedUser(name: string, email: string) {
  return new LoggedCachedUser(name, email);
}

export const metadata: PatternMetadata = {
  title: 'Mixin Pattern',
  category: 'Modern',
  difficulty: 'Hard',
  description: 'Compose objects from multiple sources to achieve multiple inheritance',
  concepts: ["design patterns","software architecture","code organization","object-oriented programming"],
  detailedDescription: `
    ## 🎯 Mixin Pattern

    The **Mixin Pattern** enables multiple inheritance-like behavior by composing objects from multiple sources. It allows sharing functionality across different class hierarchies without traditional inheritance limitations.

    ### Core Concepts

    🔹 **Mixins** - Small, focused units of functionality that can be combined  
    🔹 **Composition over Inheritance** - Build complex objects by mixing behaviors  
    🔹 **Multiple Inheritance** - JavaScript/TypeScript doesn't support it natively, mixins provide alternative  
    🔹 **Generic Mixins** - Type-safe mixins that work with any base class

    ### Real-World Applications

    **Frontend Frameworks** - Vue.js mixins, React Higher-Order Components (HOCs)  
    **Utility Libraries** - Lodash mixins, Observable patterns, Validation systems  
    **Enterprise Software** - Audit trails, caching, logging, serialization  
    **Game Development** - Entity component systems with mixed behaviors

    ### TypeScript Implementation

    **Constructor Types** - Generic constructor typing for type safety  
    **Interface Composition** - Multiple interfaces implemented through mixins  
    **Method Resolution** - Last mixin wins for conflicting methods  
    **Generic Constraints** - Ensure type compatibility across mixin chain

    ### Composition Strategies

    **Linear Composition** - A extends B extends C pattern  
    **Functional Mixins** - Functions that return mixin classes  
    **Factory Functions** - Create configured mixins with parameters  
    **Multiple Mixins** - Combine several mixins into single class

    ### Implementation Benefits

    ✅ **Code reuse** - Share functionality across unrelated class hierarchies  
    ✅ **Flexible composition** - Mix and match behaviors as needed  
    ✅ **Type safety** - TypeScript provides full type checking for mixins  
    ✅ **Runtime flexibility** - Can apply mixins conditionally
  `,
    useCases: [
    PatternUseCase.CODE_ORGANIZATION,
    PatternUseCase.FRAMEWORK_DEVELOPMENT,
    PatternUseCase.CROSS_CUTTING_CONCERNS
  ],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    timeComplexity: 'O(1) for mixin application, O(n) for method resolution',
  spaceComplexity: 'O(k) where k is the number of mixins',
  advantages: [
    'Enables multiple inheritance-like behavior',
    'Promotes code reuse across different hierarchies',
    'Flexible composition of behaviors',
    'Type-safe implementation in TypeScript'
  ],
  disadvantages: [
    'Can create complex inheritance chains',
    'Method resolution order can be confusing',
    'Debugging mixed classes can be difficult',
    'Performance overhead from multiple prototype chains'
  ],
  relatedPatterns: ['Decorator', 'Strategy', 'Template Method']
};

export const solutions: Solution[] = [
  {
    name: 'basic-mixins',
    tabName: 'Timestamp & Validation Mixins',
    approach: 'Simple mixins for timestamping and validation',
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'class',
    code: `// Timestamped Mixin
interface Timestamped {
  timestamp: Date;
  getAge(): number;
  setTimestamp(date: Date): void;
}

function TimestampedMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Timestamped {
    timestamp: Date = new Date();

    getAge(): number {
      return Date.now() - this.timestamp.getTime();
    }

    setTimestamp(date: Date): void {
      this.timestamp = date;
    }

    getFormattedTimestamp(): string {
      return this.timestamp.toISOString();
    }
  };
}

// Validatable Mixin
interface Validatable {
  errors: string[];
  isValid(): boolean;
  addError(error: string): void;
  clearErrors(): void;
}

function ValidatableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Validatable {
    errors: string[] = [];

    isValid(): boolean {
      this.validate();
      return this.errors.length === 0;
    }

    addError(error: string): void {
      if (!this.errors.includes(error)) {
        this.errors.push(error);
      }
    }

    clearErrors(): void {
      this.errors = [];
    }

    protected validate(): void {
      this.clearErrors();
      // Override in subclasses for specific validation
    }
  };
}

// Example usage
class User {
  constructor(public name: string, public email: string) {}
}

class TimestampedUser extends TimestampedMixin(User) {
  constructor(name: string, email: string) {
    super(name, email);
  }
}

class ValidatedUser extends ValidatableMixin(User) {
  constructor(name: string, email: string) {
    super(name, email);
  }

  protected validate(): void {
    super.validate();
    if (!this.name || this.name.trim().length === 0) {
      this.addError('Name is required');
    }
    if (!this.email || !this.email.includes('@')) {
      this.addError('Valid email is required');
    }
  }
}`
  },
  {
    name: 'serializable-product',
    tabName: 'Multi-Mixin Product Tracking',
    approach: 'Product with serialization and timestamp tracking',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    type: 'class',
    code: `// Serializable Mixin
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

function SerializableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Serializable {
    serialize(): string {
      const obj = { ...this };
      return JSON.stringify(obj);
    }

    deserialize(data: string): void {
      try {
        const parsed = JSON.parse(data);
        Object.assign(this, parsed);
      } catch (error) {
        throw new Error('Invalid serialization data');
      }
    }

    clone(): this {
      const serialized = this.serialize();
      const cloned = new (this.constructor as any)();
      cloned.deserialize(serialized);
      return cloned;
    }
  };
}

// Product with multiple mixins
class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number
  ) {}

  getDisplayPrice(): string {
    return \`$\${this.price.toFixed(2)}\`;
  }
}

// Multiple mixins composition
const SerializableTimestampedProduct = SerializableMixin(TimestampedMixin(Product));

class TrackedProduct extends SerializableTimestampedProduct {
  constructor(id: string, name: string, price: number) {
    super(id, name, price);
  }

  updatePrice(newPrice: number): void {
    this.price = newPrice;
    this.setTimestamp(new Date());
  }
}

// Usage
const product = new TrackedProduct('P001', 'Laptop', 999.99);
product.updatePrice(899.99);
const cloned = product.clone();`
  },
  {
    name: 'full-featured-blog',
    tabName: 'Complete Blog Post System',
    approach: 'Blog post with validation, serialization, timestamps, and observers',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    type: 'class',
    code: `// Observable Mixin
interface Observable {
  observers: Array<(data: any) => void>;
  addObserver(observer: (data: any) => void): void;
  removeObserver(observer: (data: any) => void): void;
  notifyObservers(data?: any): void;
}

function ObservableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Observable {
    observers: Array<(data: any) => void> = [];

    addObserver(observer: (data: any) => void): void {
      if (!this.observers.includes(observer)) {
        this.observers.push(observer);
      }
    }

    removeObserver(observer: (data: any) => void): void {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }

    notifyObservers(data?: any): void {
      this.observers.forEach(observer => {
        try {
          observer(data);
        } catch (error) {
          console.error('Observer error:', error);
        }
      });
    }
  };
}

// Complex mixin composition
class BlogPost {
  constructor(
    public title: string,
    public content: string,
    public author: string
  ) {}

  getWordCount(): number {
    return this.content.split(/\\s+/).filter(word => word.length > 0).length;
  }
}

const FullFeaturedBlogPost = ObservableMixin(
  ValidatableMixin(
    SerializableMixin(
      TimestampedMixin(BlogPost)
    )
  )
);

class EnhancedBlogPost extends FullFeaturedBlogPost {
  constructor(title: string, content: string, author: string) {
    super(title, content, author);
  }

  protected validate(): void {
    super.validate();
    if (!this.title || this.title.trim().length === 0) {
      this.addError('Title is required');
    }
    if (!this.content || this.content.trim().length < 10) {
      this.addError('Content must be at least 10 characters');
    }
  }

  publish(): boolean {
    if (!this.isValid()) {
      return false;
    }
    
    this.notifyObservers({
      event: 'published',
      post: { title: this.title, timestamp: this.timestamp }
    });
    
    return true;
  }
}`
  }
];

export const examples: PatternExample[] = [
  {
    input: `const user = createTimestampedUser('John Doe', 'john@example.com');

console.log('User:', user.getDisplayName());
console.log('Created:', user.getFormattedTimestamp());

// Wait a moment and check age
setTimeout(() => {
  console.log('Age (ms):', user.getAge());
}, 100);

user.setTimestamp(new Date('2023-01-01'));
console.log('Updated timestamp:', user.getFormattedTimestamp());`,
    output: `User: John Doe
Created: 2024-01-01T12:00:00.000Z
Age (ms): 102
Updated timestamp: 2023-01-01T00:00:00.000Z`,
    description: 'TimestampedUser inherits all User functionality plus timestamp capabilities through mixin composition. Original User class remains unchanged.',
    scenario: 'Add timestamp functionality to user class without modifying original class'
  },
  {
    input: `const product = createTrackedProduct('P001', 'Laptop', 999.99);

console.log('Product:', product.name, product.getDisplayPrice());
console.log('Created:', product.getFormattedTimestamp());

product.updatePrice(899.99);
console.log('Updated price:', product.getDisplayPrice());

const serialized = product.serialize();
console.log('Serialized length:', serialized.length);

const cloned = product.clone();
console.log('Clone price:', cloned.getDisplayPrice());`,
    output: `Product: Laptop $999.99
Created: 2024-01-01T12:00:00.000Z
Updated price: $899.99
Serialized length: 156
Clone price: $899.99`,
    description: 'TrackedProduct combines Product base class with TimestampedMixin and SerializableMixin, gaining automatic timestamping, serialization, and cloning capabilities.',
    scenario: 'Combine multiple mixins to create feature-rich product with serialization and timestamps'
  },
  {
    input: `const post = createEnhancedBlogPost('My Blog Post', 'This is the content of my blog post.', 'John Doe');

// Add observer
post.addObserver((data) => console.log('Event:', data.event, 'at', data.timestamp));

console.log('Valid:', post.isValid());
console.log('Word count:', post.getWordCount());

post.updateContent('This is the updated content of my blog post with more words.');
console.log('Valid after update:', post.isValid());

const published = post.publish();
console.log('Published:', published);`,
    output: `Valid: true
Word count: 9
Event: updated at 2024-01-01T12:00:01.000Z
Valid after update: true
Event: published at 2024-01-01T12:00:01.000Z
Published: true`,
    description: 'EnhancedBlogPost combines four mixins (Observable, Validatable, Serializable, Timestamped) with BlogPost base class, creating a rich object with multiple behaviors.',
    scenario: 'Complex object combining validation, serialization, timestamps, and observer pattern'
  }
];

export { 
  TimestampedMixin, SerializableMixin, ValidatableMixin, ObservableMixin, CacheableMixin,
  TimestampedUser, ValidatedUser, TrackedProduct, EnhancedBlogPost, LoggedCachedUser,
  createLoggingMixin
};

const mixinModule = {
  metadata,
  solutions, 
  examples
};

export default mixinModule;
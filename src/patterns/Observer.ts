import { PatternMetadata, PatternExample, SolutionMetadata } from '@/interfaces/patterns';

/**
 * 🎭 Observer Pattern Implementation - Event Notification System
 * 
 * DESCRIPTION:
 * Defines a one-to-many dependency between objects so that when one object changes
 * state, all its dependents are notified and updated automatically. This behavioral
 * pattern is fundamental to reactive programming and event-driven architectures.
 * 
 * EXAMPLES:
 * • Newsletter subscription - notify all subscribers of new articles
 * • Model-View updates - UI components react to data changes
 * • Event emitters - DOM events, Node.js EventEmitter
 * 
 * IMPLEMENTATION APPROACHES:
 * • Interface-based: Traditional OOP with observer interfaces
 * • Event-driven: Using JavaScript's EventTarget API
 * • Reactive: Modern observables with RxJS-style patterns
 * 
 * REAL-WORLD USAGE:
 * • React state management (useState, useEffect)
 * • Vue.js reactive data system
 * • Node.js EventEmitter pattern
 * • WebSocket real-time updates
 * 
 * PERFORMANCE:
 * - Time: O(n) to notify all observers
 * - Space: O(n) to store observer references
 */

// Observer and Subject interfaces
interface Observer<T> {
  update(data: T): void;
}

interface Subject<T> {
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notify(data: T): void;
}

// Traditional Interface-based Observer
export class NewsletterService implements Subject<string> {
  private subscribers: Observer<string>[] = [];
  private latestNews: string = '';

  public subscribe(observer: Observer<string>): void {
    if (!this.subscribers.includes(observer)) {
      this.subscribers.push(observer);
    }
  }

  public unsubscribe(observer: Observer<string>): void {
    const index = this.subscribers.indexOf(observer);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  public notify(data: string): void {
    this.latestNews = data;
    this.subscribers.forEach(observer => observer.update(data));
  }

  public publishNews(news: string): void {
    this.notify(news);
  }

  public getSubscriberCount(): number {
    return this.subscribers.length;
  }

  public getLatestNews(): string {
    return this.latestNews;
  }
}

export class EmailSubscriber implements Observer<string> {
  constructor(private email: string) {}

  update(news: string): void {
    console.log(`📧 Email sent to ${this.email}: ${news}`);
  }

  getEmail(): string {
    return this.email;
  }
}

export class SMSSubscriber implements Observer<string> {
  constructor(private phone: string) {}

  update(news: string): void {
    console.log(`📱 SMS sent to ${this.phone}: ${news}`);
  }

  getPhone(): string {
    return this.phone;
  }
}

// Event-driven Observer using JavaScript's EventTarget
export class StockPriceTracker extends EventTarget {
  private prices: Map<string, number> = new Map();

  public setPrice(symbol: string, price: number): void {
    const oldPrice = this.prices.get(symbol);
    this.prices.set(symbol, price);
    
    this.dispatchEvent(new CustomEvent('priceChange', {
      detail: { symbol, price, oldPrice }
    }));
  }

  public getPrice(symbol: string): number | undefined {
    return this.prices.get(symbol);
  }

  public getAllPrices(): Map<string, number> {
    return new Map(this.prices);
  }
}

// Modern Reactive Observer
export class ReactiveObservable<T> {
  private observers: Array<(value: T) => void> = [];
  private currentValue: T | undefined;

  public subscribe(callback: (value: T) => void): () => void {
    this.observers.push(callback);
    
    // Immediately call with current value if available
    if (this.currentValue !== undefined) {
      callback(this.currentValue);
    }

    // Return unsubscribe function
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  public next(value: T): void {
    this.currentValue = value;
    this.observers.forEach(callback => callback(value));
  }

  public getValue(): T | undefined {
    return this.currentValue;
  }

  public getObserverCount(): number {
    return this.observers.length;
  }

  // Operators for chaining
  public map<U>(transform: (value: T) => U): ReactiveObservable<U> {
    const mapped = new ReactiveObservable<U>();
    this.subscribe(value => mapped.next(transform(value)));
    return mapped;
  }

  public filter(predicate: (value: T) => boolean): ReactiveObservable<T> {
    const filtered = new ReactiveObservable<T>();
    this.subscribe(value => {
      if (predicate(value)) {
        filtered.next(value);
      }
    });
    return filtered;
  }
}

// Factory function for creating observables
export function createObservable<T>(initialValue?: T): ReactiveObservable<T> {
  const observable = new ReactiveObservable<T>();
  if (initialValue !== undefined) {
    observable.next(initialValue);
  }
  return observable;
}

export const metadata: PatternMetadata = {
  title: "Observer Pattern",
  description: "Notify multiple objects about state changes automatically",
  detailedDescription: "🎭 **The Observer Pattern - Event Notification System**\n\nDefines a one-to-many dependency between objects so that when one object changes state, all dependents are notified automatically!\n\n🎯 **Core Problem Solved:**\n• Decouple objects that need to communicate\n• Notify multiple objects of state changes\n• Support dynamic subscription/unsubscription\n• Enable reactive programming patterns\n\n🔍 **Three Implementation Approaches:**\n• **Interface-based:** Traditional OOP with observer interfaces\n• **Event-driven:** Using JavaScript's EventTarget API\n• **Reactive:** Modern observables with functional operators\n\n🚀 **Real-World Applications:**\n• Newsletter and notification systems\n• Model-View-Controller architectures\n• Real-time data feeds (stocks, chat)\n• DOM event handling\n• React state management\n• WebSocket communication\n\n⚡ **Modern Framework Usage:**\n• React hooks (useState, useEffect)\n• Vue.js reactive data system\n• Angular observables (RxJS)\n• Node.js EventEmitter pattern",
  concepts: ["event handling", "state management", "reactive programming", "decoupling"],
  timeComplexity: "O(n) - notify all observers",
  spaceComplexity: "O(n) - store observer references",
  difficulty: "Medium",
  category: "Behavioral",
  useCases: ["State Management", "Event Handling", "Data Flow"],
  realWorldApplications: [
    "Newsletter and notification systems",
    "Real-time stock price updates",
    "Model-View-Controller architectures",
    "React component state management",
    "WebSocket real-time communication",
    "DOM event handling systems"
  ],
  relatedPatterns: ["Mediator", "Command", "State"],
  modernAlternatives: ["React hooks", "Vue reactivity", "RxJS Observables", "EventTarget API"],
  frameworkSupport: ["React", "Vue.js", "Angular", "RxJS", "Node.js EventEmitter"]
};

export const solutions: SolutionMetadata[] = [
  {
    name: "NewsletterService",
    tabName: "Interface-based",
    approach: "Traditional OOP with observer interfaces",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "StockPriceTracker",
    tabName: "Event-driven",
    approach: "Using JavaScript's EventTarget API",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "ReactiveObservable",
    tabName: "Reactive",
    approach: "Modern observables with operators",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "class"
  }
];

export const examples: PatternExample[] = [
  {
    input: "newsletter.subscribe(emailSubscriber)",
    output: "Subscriber added to newsletter",
    description: "Newsletter subscription",
    scenario: "Email newsletter - notify all subscribers when new article is published"
  },
  {
    input: "stockTracker.setPrice('AAPL', 150)",
    output: "Price change event fired",
    description: "Stock price update",
    scenario: "Stock trading app - update all UI components when price changes"
  },
  {
    input: "observable.subscribe(value => console.log(value))",
    output: "Observer function registered",
    description: "Reactive subscription",
    scenario: "Real-time data - react to streaming updates with functional approach"
  },
  {
    input: "observable.map(x => x * 2).filter(x => x > 10)",
    output: "Transformed observable chain",
    description: "Reactive operators",
    scenario: "Data transformation - chain operations on streaming data"
  }
];

const observerModule = {
  NewsletterService,
  EmailSubscriber,
  SMSSubscriber,
  StockPriceTracker,
  ReactiveObservable,
  createObservable,
  metadata,
  solutions,
  examples
};

export default observerModule;
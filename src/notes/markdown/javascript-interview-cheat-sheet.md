---
id: javascript-interview-cheat-sheet
slug: javascript-interview-cheat-sheet
title: JavaScript Interview Cheat Sheet
description: Complete JavaScript reference covering ES2015+ features, async patterns, and common interview topics.
detailedDescription: Comprehensive JavaScript interview guide covering modern ES features, async/await, closures, prototypes, performance optimization, and common interview scenarios with practical examples.
category: interview-prep
tags: [JavaScript, Interview, ES6+, Async/Await, Closures, Promises, Modern JS]
difficulty: intermediate
lastUpdated: 2025-01-10
searchKeywords: [javascript, es6, async, promises, closures, prototype, interview, modern]
---

# JavaScript Interview Cheat Sheet

## 📚 Core Concepts

### Modern ECMAScript Features (ES2015+)

### ES2015 (ES6) Core Features
```javascript
// Destructuring Assignment
const [first, second, ...rest] = [1, 2, 3, 4, 5];
const { name, age, city = 'Unknown' } = person;

// Template Literals
const message = `Hello ${name}, you are ${age} years old!`;
const multiline = `
  Line 1
  Line 2
  Line 3
`;

// Arrow Functions
const add = (a, b) => a + b;
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// Default Parameters
function greet(name = 'World', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

// Rest/Spread Operator
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
```

### ES2017+ Modern Features
```javascript
// Async/Await (ES2017)
async function fetchUserData(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Object.entries/values/keys (ES2017)
const obj = { a: 1, b: 2, c: 3 };
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]
Object.values(obj);  // [1, 2, 3]
Object.keys(obj);    // ['a', 'b', 'c']

// Optional Chaining (ES2020)
const user = {
  profile: {
    social: {
      twitter: '@johndoe'
    }
  }
};
const twitter = user?.profile?.social?.twitter; // Safe navigation

// Nullish Coalescing (ES2020)
const username = user.name ?? 'Anonymous'; // Only null/undefined, not falsy
const port = process.env.PORT ?? 3000;

// Dynamic Imports (ES2020)
const module = await import('./feature-module.js');
const { heavyFunction } = await import('./heavy-module.js');
```

### ES2021+ Latest Features
```javascript
// Logical Assignment Operators (ES2021)
let config = {};
config.debug ??= false;        // config.debug = config.debug ?? false
config.retries ||= 3;          // config.retries = config.retries || 3
config.attempts &&= 5;         // config.attempts = config.attempts && 5

// Private Fields (ES2022)
class User {
  #privateField = 'secret';
  #privateMethod() {
    return this.#privateField;
  }
  
  getSecret() {
    return this.#privateMethod();
  }
}

// Top-level await (ES2022)
const config = await import('./config.json');
const data = await fetch('/api/data');

// Array.at() (ES2022) - Negative indexing
const arr = [1, 2, 3, 4, 5];
arr.at(-1); // 5 (last element)
arr.at(-2); // 4 (second to last)
```

## Asynchronous JavaScript

### Promises Deep Dive
```javascript
// Promise states visualization:
// Pending → Fulfilled (resolved)
//        → Rejected

// Creating promises
const promise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  
  setTimeout(() => {
    if (success) {
      resolve('Success data');
    } else {
      reject(new Error('Something went wrong'));
    }
  }, 1000);
});

// Promise methods
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // All must resolve - fails fast on any rejection
  });

Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    // All settle regardless of outcome
    // results: [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]
  });

Promise.race([promise1, promise2, promise3])
  .then(winner => {
    // First to settle (resolve OR reject) wins
  });

Promise.any([promise1, promise2, promise3])
  .then(winner => {
    // First to RESOLVE wins (ignores rejections)
  })
  .catch(error => {
    // Only if ALL reject (AggregateError)
  });
```

### Async/Await Patterns
```javascript
// Sequential vs Parallel execution
async function sequentialExample() {
  const result1 = await operation1(); // Wait for 1
  const result2 = await operation2(); // Then wait for 2
  const result3 = await operation3(); // Then wait for 3
  
  return [result1, result2, result3];
  // Total time: time1 + time2 + time3
}

async function parallelExample() {
  // Start all operations immediately
  const promise1 = operation1();
  const promise2 = operation2();
  const promise3 = operation3();
  
  // Wait for all to complete
  const results = await Promise.all([promise1, promise2, promise3]);
  return results;
  // Total time: max(time1, time2, time3)
}

// Error handling patterns
async function robustAsyncFunction() {
  try {
    const data = await riskyOperation();
    return { success: true, data };
  } catch (error) {
    console.error('Operation failed:', error);
    return { success: false, error: error.message };
  } finally {
    // Cleanup - always runs
    cleanup();
  }
}
```

### Event Loop & Concurrency

#### JavaScript Event Loop & Task Processing

```
SYNCHRONOUS vs ASYNCHRONOUS EXECUTION:

Synchronous (Blocking):              Asynchronous (Non-blocking):
┌─────────────┐                     ┌─────────────┐
│   Task 1    │ ──► Wait            │   Task 1    │ ──► Continue
│   Task 2    │     │               │   Task 2    │     │
│   Task 3    │ ◄───┘               │   Task 3    │     │
│    ...      │                     │    ...      │     │
└─────────────┘                     └─────────────┘     │
                                                         ▼
                                               ┌─────────────────┐
                                               │ Background APIs │
                                               │ handle async    │
                                               │ operations      │
                                               └─────────────────┘
```

#### Event Loop Architecture
```
                     JAVASCRIPT RUNTIME
     ┌─────────────────────────────────────────────────────────┐
     │                                                         │
     │  ┌─────────────┐    4. Execute    ┌─────────────────────┐ │
     │  │             │ ◄──────────────── │                     │ │
     │  │ Call Stack  │                  │    Event Loop       │ │
     │  │             │                  │                     │ │
     │  │ [function]  │                  │ 1. Check Call Stack │ │
     │  │ [function]  │                  │ 2. Process ALL      │ │
     │  │ [function]  │                  │    Microtasks       │ │
     │  └─────────────┘                  │ 3. Process ONE      │ │
     │                                   │    Macrotask        │ │
     │  ┌─────────────────────────────────┴─────────────────────┐ │
     │  │              TASK QUEUES                               │ │
     │  │                                                        │ │
     │  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │ │
     │  │ │ Microtasks  │ │ Macrotasks  │ │    Web APIs         │ │ │
     │  │ │ (PRIORITY)  │ │ (STANDARD)  │ │   (Background)      │ │ │
     │  │ │             │ │             │ │                     │ │ │
     │  │ │ .then()     │ │ setTimeout  │ │ ┌─ setTimeout ────┐ │ │ │
     │  │ │ .catch()    │ │ setInterval │ │ │ ┌─ fetch ──────┐ │ │ │
     │  │ │ .finally()  │ │ I/O events  │ │ │ │ ┌─ DOM ────┐ │ │ │ │
     │  │ │ async/await │ │ UI events   │ │ │ │ │          │ │ │ │ │
     │  │ │queueMicro.. │ │             │ │ └─┼─┼──────────┼─┘ │ │ │
     │  │ └─────────────┘ └─────────────┘ │   └─┼──────────┼───┘ │ │ │
     │  │       ▲                ▲        │     └──────────┘     │ │ │
     │  │       │                │        └─────────────────────┘ │ │
     │  └───────┼────────────────┼──────────────────────────────────┘ │
     │          │                │                                    │
     └──────────┼────────────────┼────────────────────────────────────┘
                │                │
           ┌────────┐        ┌────────┐
           │Promise │        │Timer   │
           │.then() │        │Events  │
           └────────┘        └────────┘
```

#### How the Event Loop Works:

**Step-by-Step Execution:**
1. **Call Stack**: Execute all synchronous code first
2. **Microtask Queue**: Process ALL microtasks (Promises, queueMicrotask)  
3. **Macrotask Queue**: Process ONE macrotask (setTimeout, I/O)
4. **Repeat**: Back to step 1

**Key Rules:**
- 🔄 **Microtasks have priority** - ALL microtasks run before ANY macrotask
- ⚡ **Promises are microtasks** - `.then()`, `.catch()`, `.finally()` 
- ⏰ **Timers are macrotasks** - `setTimeout()`, `setInterval()`
- 🎯 **Only ONE macrotask per cycle** - Event loop batches microtasks

```javascript
console.log('1'); // Call stack
setTimeout(() => console.log('2'), 0); // Macrotask queue
Promise.resolve().then(() => console.log('3')); // Microtask queue
queueMicrotask(() => console.log('4')); // Microtask queue
console.log('5'); // Call stack

// Output: 1, 5, 3, 4, 2
// Key insight: ALL microtasks run before ANY macrotask
```

## Closures & Scope

### Understanding Closures
```javascript
// Closure: Inner function has access to outer function's variables
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable
  
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getValue() { return count; },
    reset() { count = initialValue; return count; }
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.getValue());  // 11
// count is not accessible directly - true encapsulation

// Module pattern with closures
const UserModule = (function() {
  const users = []; // Private
  
  return {
    addUser(user) {
      users.push(user);
      return this; // Chainable
    },
    
    getUsers() {
      return [...users]; // Return copy, not reference
    },
    
    findUser(id) {
      return users.find(user => user.id === id);
    }
  };
})();
```

### Scope Chain & Lexical Environment
```javascript
const globalVar = 'global';

function outerFunction(outerParam) {
  const outerVar = 'outer';
  
  function innerFunction(innerParam) {
    const innerVar = 'inner';
    
    // Has access to all variables in scope chain:
    console.log(innerVar);   // inner
    console.log(innerParam); // inner parameter
    console.log(outerVar);   // outer
    console.log(outerParam); // outer parameter
    console.log(globalVar);  // global
  }
  
  return innerFunction;
}

// Scope chain: inner → outer → global
```

## Prototypes & Inheritance

### Prototype Chain
```javascript
// Every object has a prototype
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (end of chain)

// Function constructor pattern
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

Person.prototype.getAge = function() {
  return this.age;
};

const john = new Person('John', 30);
console.log(john.greet()); // "Hello, I'm John"

// Prototype chain visualization:
//
// john ──→ Person.prototype ──→ Object.prototype ──→ null
//   ↑            ↑                       ↑
// instance   constructor's         global object
//           prototype              prototype
```

### Modern Class Syntax
```javascript
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
  
  static compare(animal1, animal2) {
    return animal1.species === animal2.species;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'Canine'); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks!`; // Override parent method
  }
  
  wagTail() {
    return `${this.name} wags tail`;
  }
}

const buddy = new Dog('Buddy', 'Golden Retriever');
console.log(buddy.speak()); // "Buddy barks!"
console.log(buddy instanceof Dog);    // true
console.log(buddy instanceof Animal); // true
```

### Prototype Methods
```javascript
// Object.create() for prototype delegation
const personPrototype = {
  greet() {
    return `Hello, I'm ${this.name}`;
  },
  
  setAge(age) {
    this.age = age;
    return this;
  }
};

const person = Object.create(personPrototype);
person.name = 'Alice';
person.age = 25;

// Object.setPrototypeOf() and Object.getPrototypeOf()
const parent = { parentProp: 'inherited' };
const child = { childProp: 'own' };

Object.setPrototypeOf(child, parent);
console.log(child.parentProp); // 'inherited'
console.log(Object.getPrototypeOf(child) === parent); // true
```

## Advanced Patterns

### Function Composition
```javascript
// Functional composition
const compose = (f, g) => x => f(g(x));
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// Example functions
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

// Composition
const addOneAndDouble = compose(double, addOne);
console.log(addOneAndDouble(3)); // 8: (3 + 1) * 2

// Pipe (left to right)
const transform = pipe(addOne, double, square);
console.log(transform(3)); // 64: ((3 + 1) * 2)²
```

### Currying & Partial Application
```javascript
// Currying
const curry = fn => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
};

const multiply = (a, b, c) => a * b * c;
const curriedMultiply = curry(multiply);

const multiplyBy2 = curriedMultiply(2);
const multiplyBy2And3 = multiplyBy2(3);
console.log(multiplyBy2And3(4)); // 24

// Partial application
const partial = (fn, ...args1) => {
  return (...args2) => fn(...args1, ...args2);
};

const add = (a, b, c) => a + b + c;
const addFiveAndTen = partial(add, 5, 10);
console.log(addFiveAndTen(3)); // 18
```

### Memoization
```javascript
const memoize = fn => {
  const cache = new Map();
  
  return function memoized(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    
    console.log('Computing...');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

// Example: Expensive Fibonacci
const fibonacci = memoize(n => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Fast with memoization
```

## Performance & Optimization

### Memory Management
```javascript
// Avoiding memory leaks
class DataManager {
  constructor() {
    this.listeners = new Set();
    this.timers = new Set();
    this.abortController = new AbortController();
  }
  
  addListener(element, event, handler) {
    element.addEventListener(event, handler, {
      signal: this.abortController.signal
    });
    this.listeners.add({ element, event, handler });
  }
  
  setTimeout(callback, delay) {
    const timeoutId = setTimeout(callback, delay);
    this.timers.add(timeoutId);
    return timeoutId;
  }
  
  cleanup() {
    // Cancel all event listeners
    this.abortController.abort();
    
    // Clear all timers
    this.timers.forEach(clearTimeout);
    this.timers.clear();
    
    // Clear references
    this.listeners.clear();
  }
}

// WeakMap/WeakSet for garbage collection friendly storage
const metadata = new WeakMap();
const processedItems = new WeakSet();

class ObjectProcessor {
  process(obj) {
    if (processedItems.has(obj)) return;
    
    metadata.set(obj, { processed: Date.now() });
    processedItems.add(obj);
    
    // When obj is garbage collected, entries are automatically removed
  }
}
```

### Efficient Array/Object Operations
```javascript
// Efficient array operations
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// Use for...of for simple iteration (fastest)
for (const item of largeArray) {
  // process item
}

// Use Array methods for transformations
const doubled = largeArray.map(x => x * 2);
const filtered = largeArray.filter(x => x % 2 === 0);
const sum = largeArray.reduce((acc, x) => acc + x, 0);

// Efficient object operations
const obj = { a: 1, b: 2, c: 3, d: 4 };

// Object.entries() is efficient for key-value pairs
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}

// Object.hasOwnProperty() vs 'in' operator
obj.hasOwnProperty('a'); // Only own properties
'a' in obj;              // Includes inherited properties

// Efficient property access
const key = 'dynamicKey';
const value1 = obj[key];        // Bracket notation
const value2 = obj.dynamicKey;  // Dot notation (when key is known)
```

## Error Handling

### Modern Error Handling
```javascript
// Custom error classes
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

// Comprehensive error handling
async function robustApiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      timeout: 5000,
      ...options
    });
    
    if (!response.ok) {
      throw new NetworkError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }
    
    const data = await response.json();
    
    // Validate data
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid response format', 'response');
    }
    
    return data;
    
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Network issue:', error.message);
      // Maybe retry logic here
    } else if (error instanceof ValidationError) {
      console.error('Data validation failed:', error.message);
    } else if (error.name === 'AbortError') {
      console.log('Request was aborted');
    } else {
      console.error('Unexpected error:', error);
    }
    
    throw error; // Re-throw for caller to handle
  }
}
```

## Testing & Debugging

### Console API & Debugging
```javascript
// Advanced console methods
console.table([
  { name: 'John', age: 30, city: 'NYC' },
  { name: 'Jane', age: 25, city: 'LA' }
]);

console.group('API Calls');
console.log('Fetching users...');
console.groupCollapsed('Response details');
console.log('Status: 200');
console.log('Headers:', headers);
console.groupEnd();
console.groupEnd();

console.time('Performance Test');
performExpensiveOperation();
console.timeEnd('Performance Test');

console.assert(x > 0, 'x must be positive');

// Performance monitoring
const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});

observer.observe({ entryTypes: ['measure', 'navigation'] });

performance.mark('start-operation');
await performOperation();
performance.mark('end-operation');
performance.measure('operation-time', 'start-operation', 'end-operation');
```

## Quick Interview Questions

### Q1: What's the output?
```javascript
// Hoisting
console.log(a); // undefined (not ReferenceError)
var a = 5;

console.log(b); // ReferenceError
let b = 10;

// Closure in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // 0, 1, 2
}
```

### Q2: Event Loop Order
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

### Q3: This Context
```javascript
const obj = {
  name: 'Object',
  regular: function() {
    console.log(this.name); // 'Object'
  },
  arrow: () => {
    console.log(this.name); // undefined (global context)
  }
};
```

## JavaScript Shorthand & Modern Techniques

### Object & Array Shortcuts
```javascript
// Object property shorthand
const name = 'John', age = 30;
const user = { name, age }; // Instead of { name: name, age: age }

// Method shorthand
const obj = {
  // Old way
  getName: function() { return this.name; },
  
  // New way
  getName() { return this.name; },
  
  // Async method
  async fetchData() { return await api.get('/data'); }
};

// Computed property names
const prop = 'dynamicKey';
const obj = {
  [prop]: 'value',
  [`${prop}Count`]: 42
};

// Array/Object destructuring shortcuts
const { name, age, ...rest } = user;
const [first, , third] = array; // Skip second element
const { name: userName = 'Anonymous' } = user; // Rename + default
```

### Function Shortcuts
```javascript
// Arrow functions
const add = (a, b) => a + b;
const square = x => x * x; // Single param, no parens needed
const log = () => console.log('Hello'); // No params

// Implicit return with objects (wrap in parens)
const createUser = (name, age) => ({ name, age });

// Default parameters with destructuring
const greet = ({ name = 'World', greeting = 'Hello' } = {}) => 
  `${greeting}, ${name}!`;

// Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);

// Function as object property
const utils = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};
```

### Conditional & Logic Shortcuts
```javascript
// Short-circuit evaluation
const username = user.name || 'Guest';
const isValid = user && user.isActive && user.hasPermission;

// Nullish coalescing (only null/undefined, not falsy)
const port = process.env.PORT ?? 3000;
const config = userConfig ?? defaultConfig;

// Optional chaining
const street = user?.address?.street;
const result = api.getData?.();
const item = array?.[index];

// Ternary operators
const status = isOnline ? 'Online' : 'Offline';
const message = error ? `Error: ${error.message}` : 'Success';

// Multiple ternary (avoid if complex)
const level = score > 90 ? 'A' : score > 80 ? 'B' : score > 70 ? 'C' : 'F';
```

### Array Method Chaining
```javascript
const users = [
  { name: 'John', age: 30, active: true },
  { name: 'Jane', age: 25, active: false },
  { name: 'Bob', age: 35, active: true }
];

// Chain multiple operations
const activeAdultNames = users
  .filter(user => user.active)
  .filter(user => user.age >= 18)
  .map(user => user.name.toUpperCase())
  .sort();

// Reduce for complex transformations
const userStats = users.reduce((acc, user) => ({
  ...acc,
  total: acc.total + 1,
  averageAge: (acc.totalAge + user.age) / (acc.total + 1),
  totalAge: acc.totalAge + user.age,
  activeCount: acc.activeCount + (user.active ? 1 : 0)
}), { total: 0, totalAge: 0, activeCount: 0 });
```

### Modern Syntax Shortcuts
```javascript
// Template literals with expressions
const html = `
  <div class="${isActive ? 'active' : 'inactive'}">
    <h1>Welcome, ${user?.name || 'Guest'}!</h1>
    <p>You have ${notifications.length} notification${notifications.length !== 1 ? 's' : ''}.</p>
  </div>
`;

// Dynamic imports
const module = await import('./heavy-module.js');
const { specificFunction } = await import('./utils.js');

// Object.entries/fromEntries for transformations
const doubled = Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [key, value * 2])
);

// Array.from with mapper
const range = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
const randomNumbers = Array.from({ length: 3 }, () => Math.random());
```

## JavaScript Gotchas & Things to Avoid

### Type Coercion Surprises
```javascript
// Weird equality comparisons
console.log('' == false);        // true
console.log(0 == false);         // true
console.log([] == false);        // true
console.log([] == 0);           // true
console.log('' == 0);           // true
console.log('0' == false);      // true

// But these are different
console.log('' === false);      // false
console.log(0 === false);       // false

// Array/Object to string coercion
console.log([1, 2, 3] + [4, 5, 6]); // "1,2,34,5,6"
console.log({} + []);               // "[object Object]"
console.log([] + {});               // "[object Object]"

// Math with non-numbers
console.log('3' * '2');          // 6 (strings coerced to numbers)
console.log('3' + 2);           // "32" (number coerced to string)
console.log('3' - 2);           // 1 (string coerced to number)
```

### Function & Scope Gotchas
```javascript
// Variable hoisting confusion
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Function hoisting vs function expressions
console.log(hoisted()); // "I work!"
console.log(notHoisted()); // TypeError: notHoisted is not a function

function hoisted() { return "I work!"; }
var notHoisted = function() { return "I don't work yet"; };

// Loop variable closure problem
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 3, 3, 3
}

// Solution: Use let or closure
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 0, 1, 2
}

// Arrow functions don't have their own 'this'
const obj = {
  name: 'Object',
  regularFunction: function() {
    return this.name; // 'Object'
  },
  arrowFunction: () => {
    return this.name; // undefined (global this)
  }
};
```

### Array & Object Gotchas
```javascript
// Array type checking
console.log(typeof []);          // "object" (not "array")
console.log(Array.isArray([])); // true (correct way)

// Array holes and sparse arrays
const sparse = [1, , , 4]; // holes at index 1, 2
console.log(sparse.length); // 4
console.log(sparse[1]);     // undefined
sparse.forEach(x => console.log(x)); // Only prints 1, 4

// Object property access
const obj = { '123': 'numeric string key' };
console.log(obj.123);    // SyntaxError
console.log(obj['123']); // 'numeric string key'

// Deleting array elements
const arr = [1, 2, 3, 4];
delete arr[1];
console.log(arr);        // [1, empty, 3, 4]
console.log(arr.length); // 4 (length unchanged!)
```

### Number & Math Gotchas
```javascript
// Floating point precision
console.log(0.1 + 0.2);         // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// Fix with rounding or epsilon comparison
console.log(+(0.1 + 0.2).toFixed(1)); // 0.3
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true

// parseInt gotchas
console.log(parseInt('08'));     // 8 (modern browsers)
console.log(parseInt('08', 10)); // 8 (always specify radix)
console.log(parseInt('10', 2));  // 2 (binary)
console.log(parseInt('hello'));  // NaN

// NaN comparisons
console.log(NaN === NaN);        // false
console.log(Number.isNaN(NaN));  // true (correct way)
console.log(isNaN('hello'));     // true (coerces to number first)
console.log(Number.isNaN('hello')); // false (no coercion)
```

### Reference vs Value Gotchas
```javascript
// Objects and arrays are passed by reference
const original = { name: 'John' };
const copy = original;
copy.name = 'Jane';
console.log(original.name); // 'Jane' (original was modified!)

// Shallow copy solutions
const shallowCopy = { ...original };
const shallowCopy2 = Object.assign({}, original);

// Deep copy needed for nested objects
const nested = { user: { name: 'John' } };
const shallowCopy = { ...nested };
shallowCopy.user.name = 'Jane';
console.log(nested.user.name); // 'Jane' (still modified!)

// Deep copy solutions
const deepCopy = JSON.parse(JSON.stringify(nested)); // Simple but limited
const deepCopy2 = structuredClone(nested); // Modern browsers
```

### Async/Promise Gotchas
```javascript
// Promise constructor anti-pattern
const promise = new Promise((resolve, reject) => {
  return someAsyncFunction(); // Wrong! This doesn't work
});

// Correct way
const promise = someAsyncFunction();

// Async/await error handling
async function badExample() {
  const result = await riskyFunction(); // If this throws, function crashes
  return result.data;
}

async function goodExample() {
  try {
    const result = await riskyFunction();
    return result.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Parallel vs sequential async calls
// Sequential (slow)
const result1 = await fetch('/api/1');
const result2 = await fetch('/api/2');

// Parallel (fast)
const [result1, result2] = await Promise.all([
  fetch('/api/1'),
  fetch('/api/2')
]);
```

### Modern JavaScript Pitfalls
```javascript
// Destructuring with same names
const user = { name: 'John' };
const { name } = user; // Creates variable 'name'
const { name } = user; // SyntaxError: 'name' already declared

// Solution: rename or use different scope
const { name: userName } = user;

// Template literal gotcha
const message = `Hello ${name}
                 How are you?`;
console.log(message); // Includes actual whitespace/newlines!

// Fix with proper formatting or line continuation
const message = `Hello ${name}
How are you?`.replace(/\n\s+/g, '\n');

// Module import gotcha
import { nonExistentFunction } from './module.js'; // No error until used!
nonExistentFunction(); // TypeError at runtime
```

### Best Practices to Avoid Problems

#### Type Safety
- ✅ Use `===` instead of `==`
- ✅ Use `typeof` and `Array.isArray()` for type checking
- ✅ Use TypeScript for large projects
- ✅ Validate data at boundaries (API responses, user input)

#### Function & Scope
- ✅ Use `const` and `let`, avoid `var`
- ✅ Be explicit about `this` context
- ✅ Use arrow functions for callbacks, regular functions for methods
- ✅ Always bind event handlers properly

#### Objects & Arrays
- ✅ Use spread operator for shallow copies
- ✅ Use proper deep copy methods for nested structures
- ✅ Be aware of reference vs value semantics
- ✅ Use `Object.hasOwnProperty()` or `in` operator safely

#### Numbers & Math
- ✅ Always specify radix for `parseInt()`
- ✅ Use `Number.isNaN()` instead of global `isNaN()`
- ✅ Handle floating-point precision explicitly
- ✅ Validate numeric inputs

#### Async Code
- ✅ Always handle Promise rejections
- ✅ Use `try/catch` with `async/await`
- ✅ Prefer `Promise.all()` for parallel operations
- ✅ Clean up timers and event listeners

## Performance Tips

### Optimization Checklist
- ✅ Use `const`/`let` instead of `var`
- ✅ Prefer `for...of` for simple iteration
- ✅ Use array methods (`map`, `filter`, `reduce`) for transformations
- ✅ Implement proper error boundaries
- ✅ Use WeakMap/WeakSet for memory-efficient storage
- ✅ Minimize DOM manipulation
- ✅ Use event delegation for multiple similar elements
- ✅ Implement lazy loading for heavy resources
- ✅ Use Web Workers for CPU-intensive tasks
- ✅ Optimize bundle size with tree shaking
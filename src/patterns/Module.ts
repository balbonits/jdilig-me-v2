import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

// Classic Module Pattern using IIFE (Immediately Invoked Function Expression)
const CounterModule = (function() {
  // Private variables
  let count = 0;
  let history: number[] = [];
  
  // Private functions
  function logOperation(operation: string, value: number): void {
    console.log(`[Counter] ${operation}: ${value}`);
  }
  
  // Public API
  return {
    increment(): number {
      count++;
      history.push(count);
      logOperation('increment', count);
      return count;
    },
    
    decrement(): number {
      count--;
      history.push(count);
      logOperation('decrement', count);
      return count;
    },
    
    getCurrentValue(): number {
      return count;
    },
    
    reset(): void {
      count = 0;
      history = [];
      logOperation('reset', count);
    },
    
    getHistory(): number[] {
      return [...history]; // Return copy to prevent external modification
    }
  };
})();

// Shopping Cart Module
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCartModule = (function() {
  // Private state
  let items: Map<string, CartItem> = new Map();
  let discountRate = 0;
  
  // Private functions
  function calculateItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }
  
  function applyDiscount(total: number): number {
    return total * (1 - discountRate);
  }
  
  function validateItem(item: Partial<CartItem>): CartItem {
    if (!item.id || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
      throw new Error('Invalid item properties');
    }
    
    if (item.price <= 0 || item.quantity <= 0) {
      throw new Error('Price and quantity must be positive');
    }
    
    return item as CartItem;
  }
  
  // Public API
  return {
    addItem(item: Partial<CartItem>): void {
      const validatedItem = validateItem(item);
      
      if (items.has(validatedItem.id)) {
        const existingItem = items.get(validatedItem.id)!;
        existingItem.quantity += validatedItem.quantity;
      } else {
        items.set(validatedItem.id, { ...validatedItem });
      }
    },
    
    removeItem(id: string): boolean {
      return items.delete(id);
    },
    
    updateQuantity(id: string, quantity: number): boolean {
      if (quantity <= 0) {
        return this.removeItem(id);
      }
      
      const item = items.get(id);
      if (item) {
        item.quantity = quantity;
        return true;
      }
      return false;
    },
    
    getItems(): CartItem[] {
      return Array.from(items.values()).map(item => ({ ...item }));
    },
    
    getTotal(): number {
      let total = 0;
      for (const item of items.values()) {
        total += calculateItemTotal(item);
      }
      return applyDiscount(total);
    },
    
    getItemCount(): number {
      return items.size;
    },
    
    getTotalQuantity(): number {
      let total = 0;
      for (const item of items.values()) {
        total += item.quantity;
      }
      return total;
    },
    
    setDiscountRate(rate: number): void {
      if (rate >= 0 && rate <= 1) {
        discountRate = rate;
      }
    },
    
    clear(): void {
      items.clear();
      discountRate = 0;
    }
  };
})();

// User Authentication Module
interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

const AuthModule = (function() {
  // Private state
  let currentUser: User | null = null;
  let sessionToken: string | null = null;
  let loginAttempts: Map<string, { count: number; lastAttempt: Date }> = new Map();
  const MAX_LOGIN_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  
  // Private functions
  function generateToken(): string {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  }
  
  function isAccountLocked(username: string): boolean {
    const attempts = loginAttempts.get(username);
    if (!attempts || attempts.count < MAX_LOGIN_ATTEMPTS) {
      return false;
    }
    
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
    return timeSinceLastAttempt < LOCKOUT_DURATION;
  }
  
  function recordLoginAttempt(username: string, success: boolean): void {
    if (success) {
      loginAttempts.delete(username);
      return;
    }
    
    const attempts = loginAttempts.get(username) || { count: 0, lastAttempt: new Date() };
    attempts.count++;
    attempts.lastAttempt = new Date();
    loginAttempts.set(username, attempts);
  }
  
  function validateCredentials(username: string, password: string): User | null {
    // Simulate user database lookup
    const users: Record<string, { password: string; user: User }> = {
      'admin': {
        password: 'admin123',
        user: { id: '1', username: 'admin', email: 'admin@example.com', role: 'admin' }
      },
      'john': {
        password: 'john123',
        user: { id: '2', username: 'john', email: 'john@example.com', role: 'user' }
      }
    };
    
    const userRecord = users[username];
    return userRecord && userRecord.password === password ? userRecord.user : null;
  }
  
  // Public API
  return {
    login(username: string, password: string): { success: boolean; message: string; token?: string } {
      if (isAccountLocked(username)) {
        return { success: false, message: 'Account temporarily locked due to too many failed attempts' };
      }
      
      const user = validateCredentials(username, password);
      
      if (user) {
        currentUser = user;
        sessionToken = generateToken();
        recordLoginAttempt(username, true);
        return { 
          success: true, 
          message: 'Login successful', 
          token: sessionToken 
        };
      }
      
      recordLoginAttempt(username, false);
      return { 
        success: false, 
        message: 'Invalid credentials' 
      };
    },
    
    logout(): void {
      currentUser = null;
      sessionToken = null;
    },
    
    getCurrentUser(): User | null {
      return currentUser ? { ...currentUser } : null;
    },
    
    isAuthenticated(): boolean {
      return currentUser !== null && sessionToken !== null;
    },
    
    hasRole(role: string): boolean {
      return currentUser?.role === role || currentUser?.role === 'admin';
    },
    
    getSessionToken(): string | null {
      return sessionToken;
    },
    
    validateSession(token: string): boolean {
      return sessionToken === token && currentUser !== null;
    },
    
    getRemainingLockoutTime(username: string): number {
      const attempts = loginAttempts.get(username);
      if (!attempts || attempts.count < MAX_LOGIN_ATTEMPTS) {
        return 0;
      }
      
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
      const remainingTime = LOCKOUT_DURATION - timeSinceLastAttempt;
      return Math.max(0, remainingTime);
    }
  };
})();

// Logger Module with different log levels
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  category?: string;
}

const LoggerModule = (function() {
  // Private state
  let logLevel: LogLevel = 'info';
  let logs: LogEntry[] = [];
  let maxLogs = 1000;
  const levelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };
  
  // Private functions
  function shouldLog(level: LogLevel): boolean {
    return levelPriority[level] >= levelPriority[logLevel];
  }
  
  function formatMessage(level: LogLevel, message: string, category?: string): string {
    const timestamp = new Date().toISOString();
    const cat = category ? `[${category}] ` : '';
    return `${timestamp} [${level.toUpperCase()}] ${cat}${message}`;
  }
  
  function addLog(level: LogLevel, message: string, category?: string): void {
    if (!shouldLog(level)) {
      return;
    }
    
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      category
    };
    
    logs.push(entry);
    
    // Maintain max log size
    if (logs.length > maxLogs) {
      logs.shift();
    }
    
    // Output to console
    const formattedMessage = formatMessage(level, message, category);
    console.log(formattedMessage);
  }
  
  // Public API
  return {
    setLevel(level: LogLevel): void {
      logLevel = level;
    },
    
    getLevel(): LogLevel {
      return logLevel;
    },
    
    debug(message: string, category?: string): void {
      addLog('debug', message, category);
    },
    
    info(message: string, category?: string): void {
      addLog('info', message, category);
    },
    
    warn(message: string, category?: string): void {
      addLog('warn', message, category);
    },
    
    error(message: string, category?: string): void {
      addLog('error', message, category);
    },
    
    getLogs(level?: LogLevel, category?: string): LogEntry[] {
      return logs
        .filter(log => !level || log.level === level)
        .filter(log => !category || log.category === category)
        .map(log => ({ ...log })); // Return copies
    },
    
    clearLogs(): void {
      logs = [];
    },
    
    getLogCount(): number {
      return logs.length;
    },
    
    setMaxLogs(max: number): void {
      maxLogs = Math.max(1, max);
      if (logs.length > maxLogs) {
        logs = logs.slice(-maxLogs);
      }
    }
  };
})();

// Factory functions for demonstration
export function createCounterInstance() {
  return CounterModule;
}

export function createShoppingCart() {
  return ShoppingCartModule;
}

export function createAuthSystem() {
  return AuthModule;
}

export function createLogger() {
  return LoggerModule;
}

export const metadata: PatternMetadata = {
  title: 'Module Pattern',
  category: 'Modern',
  difficulty: 'Medium',
  description: 'Encapsulate code using closures to create private scope',
  detailedDescription: `
    ## 📦 Module Pattern

    The **Module Pattern** uses closures to create encapsulated modules with private variables and methods, exposing only a public API. It's fundamental to JavaScript's module system and provides namespace management.

    ### Core Concepts

    🔹 **IIFE (Immediately Invoked Function Expression)** - Creates private scope  
    🔹 **Closures** - Enable access to private variables from public methods  
    🔹 **Public API** - Object returned with methods/properties to expose  
    🔹 **Private State** - Variables and functions accessible only within module

    ### Real-World Applications

    **Library Development** - jQuery, Lodash use module patterns for encapsulation  
    **Application State** - Manage app state without global variables  
    **Utility Functions** - Group related functionality with shared private state  
    **Configuration Management** - Encapsulate settings with controlled access

    ### Encapsulation Benefits

    **Private Variables** - Cannot be accessed from outside the module  
    **Namespace Management** - Prevents global scope pollution  
    **API Control** - Only expose what users should access  
    **State Protection** - Internal state cannot be corrupted externally

    ### Modern Alternatives

    **ES6 Modules** - Native import/export system  
    **TypeScript Namespaces** - Compile-time module organization  
    **Class-based Encapsulation** - Private fields and methods  
    **Module Bundlers** - Webpack, Rollup provide module isolation

    ### Implementation Benefits

    ✅ **True privacy** - Private variables cannot be accessed externally  
    ✅ **Controlled API** - Expose only intended functionality  
    ✅ **Namespace isolation** - Prevent naming collisions  
    ✅ **Singleton behavior** - Single instance with shared state
  `,
  useCases: [
    PatternUseCase.CODE_ORGANIZATION,
    PatternUseCase.LIBRARY_DEVELOPMENT,
    PatternUseCase.STATE_MANAGEMENT
  ],
  advantages: [
    'True privacy through closures',
    'Controlled public API exposure',
    'Prevents global namespace pollution',
    'Encapsulates related functionality'
  ],
  disadvantages: [
    'Cannot be easily unit tested (private methods)',
    'Memory overhead from closure retention',
    'Difficult to extend or inherit from',
    'No built-in dependency management'
  ],
  relatedPatterns: ['Revealing Module', 'Singleton', 'Facade']
};

export const solutions: SolutionMetadata[] = [
  {
    name: 'counter-module',
    title: 'Counter with Private State',
    description: 'Simple counter with private variables and history',
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    difficulty: 'Easy'
  },
  {
    name: 'shopping-cart',
    title: 'Shopping Cart Manager',
    description: 'E-commerce cart with private item management',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium'
  },
  {
    name: 'auth-system',
    title: 'Authentication Module',
    description: 'User authentication with session management',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    difficulty: 'Hard'
  },
  {
    name: 'logger-module',
    title: 'Logging System',
    description: 'Configurable logger with level filtering',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'Private State Counter',
    scenario: 'Create counter with private count variable that cannot be directly modified',
    inputExample: `const counter = createCounterInstance();

console.log('Initial:', counter.getCurrentValue());
counter.increment();
counter.increment();
console.log('After increments:', counter.getCurrentValue());

// Try to access private variables (this won't work)
console.log('Private count:', (counter as any).count); // undefined

console.log('History:', counter.getHistory());`,
    outputExample: `Initial: 0
[Counter] increment: 1
[Counter] increment: 2
After increments: 2
Private count: undefined
History: [1, 2]`,
    explanation: 'The count variable is completely private and cannot be accessed from outside. Only the public API methods can interact with the internal state.'
  },
  {
    title: 'Shopping Cart Management',
    scenario: 'Manage shopping cart with private item storage and validation',
    inputExample: `const cart = createShoppingCart();

cart.addItem({ id: '1', name: 'Laptop', price: 999, quantity: 1 });
cart.addItem({ id: '2', name: 'Mouse', price: 25, quantity: 2 });

console.log('Items:', cart.getItemCount());
console.log('Total quantity:', cart.getTotalQuantity());
console.log('Total price: $' + cart.getTotal());

cart.setDiscountRate(0.1);
console.log('With 10% discount: $' + cart.getTotal());`,
    outputExample: `Items: 2
Total quantity: 3
Total price: $1049
With 10% discount: $944.1`,
    explanation: 'Shopping cart encapsulates item management, validation, and pricing logic. Private functions handle calculations while public API provides controlled access.'
  },
  {
    title: 'Authentication System',
    scenario: 'User authentication with private session management and security features',
    inputExample: `const auth = createAuthSystem();

console.log('Initially authenticated:', auth.isAuthenticated());

const loginResult = auth.login('admin', 'admin123');
console.log('Login result:', loginResult.success);
console.log('Current user:', auth.getCurrentUser()?.username);
console.log('Has admin role:', auth.hasRole('admin'));

auth.logout();
console.log('After logout:', auth.isAuthenticated());`,
    outputExample: `Initially authenticated: false
Login result: true
Current user: admin
Has admin role: true
After logout: false`,
    explanation: 'Authentication module keeps user data, session tokens, and security logic private. Public API provides secure methods for login, role checking, and session management.'
  }
];

export { CounterModule, ShoppingCartModule, AuthModule, LoggerModule };
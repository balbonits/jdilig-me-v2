import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

// Calculator Revealing Module
const CalculatorModule = (function() {
  // Private variables
  let result = 0;
  let history: string[] = [];
  let precision = 2;
  
  // Private functions
  function formatResult(value: number): number {
    return Number(value.toFixed(precision));
  }
  
  function recordOperation(operation: string): void {
    history.push(`${operation} = ${result}`);
    if (history.length > 50) {
      history.shift(); // Keep only last 50 operations
    }
  }
  
  function validateNumber(value: number): void {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Invalid number provided');
    }
  }
  
  // Public functions (but defined as private)
  function add(value: number): number {
    validateNumber(value);
    result = formatResult(result + value);
    recordOperation(`+ ${value}`);
    return result;
  }
  
  function subtract(value: number): number {
    validateNumber(value);
    result = formatResult(result - value);
    recordOperation(`- ${value}`);
    return result;
  }
  
  function multiply(value: number): number {
    validateNumber(value);
    result = formatResult(result * value);
    recordOperation(`× ${value}`);
    return result;
  }
  
  function divide(value: number): number {
    validateNumber(value);
    if (value === 0) {
      throw new Error('Division by zero');
    }
    result = formatResult(result / value);
    recordOperation(`÷ ${value}`);
    return result;
  }
  
  function power(exponent: number): number {
    validateNumber(exponent);
    result = formatResult(Math.pow(result, exponent));
    recordOperation(`^ ${exponent}`);
    return result;
  }
  
  function sqrt(): number {
    if (result < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    result = formatResult(Math.sqrt(result));
    recordOperation('√');
    return result;
  }
  
  function getCurrentResult(): number {
    return result;
  }
  
  function clear(): void {
    result = 0;
    recordOperation('Clear');
  }
  
  function getHistory(): string[] {
    return [...history];
  }
  
  function setPrecision(digits: number): void {
    if (digits < 0 || digits > 10) {
      throw new Error('Precision must be between 0 and 10');
    }
    precision = digits;
  }
  
  function chain() {
    return {
      add: (value: number) => { add(value); return chain(); },
      subtract: (value: number) => { subtract(value); return chain(); },
      multiply: (value: number) => { multiply(value); return chain(); },
      divide: (value: number) => { divide(value); return chain(); },
      result: () => result
    };
  }
  
  // Revealing Module Pattern - explicitly define public API
  return {
    // Math operations
    add,
    subtract,
    multiply,
    divide,
    power,
    sqrt,
    
    // State management
    getCurrentResult,
    clear,
    chain,
    
    // Configuration
    setPrecision,
    
    // History
    getHistory
    
    // Note: formatResult, validateNumber, recordOperation remain private
  };
})();

// API Client Revealing Module
interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

const ApiClientModule = (function() {
  // Private configuration
  let baseUrl = 'https://api.example.com';
  let apiKey = '';
  let timeout = 5000;
  let defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  // Private functions
  function buildUrl(endpoint: string): string {
    return `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  }
  
  function getAuthHeaders(): Record<string, string> {
    return apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
  }
  
  function mergeHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    return {
      ...defaultHeaders,
      ...getAuthHeaders(),
      ...customHeaders
    };
  }
  
  function simulateApiCall<T>(endpoint: string, options: any = {}): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // Simulate different responses based on endpoint
        if (endpoint.includes('error')) {
          reject(new Error('API Error: Not found'));
          return;
        }
        
        let data: any;
        if (endpoint.includes('users')) {
          data = { id: 1, name: 'John Doe', email: 'john@example.com' };
        } else if (endpoint.includes('posts')) {
          data = { id: 1, title: 'Sample Post', content: 'Sample content', userId: 1 };
        } else {
          data = { message: 'Success' };
        }
        
        resolve({
          data: data as T,
          status: 200,
          headers: { 'content-type': 'application/json' }
        });
      }, 100);
    });
  }
  
  function handleApiError(error: Error): never {
    console.error('API Error:', error.message);
    throw error;
  }
  
  // Public functions
  function get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = buildUrl(endpoint);
    const finalHeaders = mergeHeaders(headers);
    
    return simulateApiCall<T>(endpoint, {
      method: 'GET',
      headers: finalHeaders
    }).catch(handleApiError);
  }
  
  function post<T>(endpoint: string, data: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = buildUrl(endpoint);
    const finalHeaders = mergeHeaders(headers);
    
    return simulateApiCall<T>(endpoint, {
      method: 'POST',
      headers: finalHeaders,
      body: JSON.stringify(data)
    }).catch(handleApiError);
  }
  
  function put<T>(endpoint: string, data: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = buildUrl(endpoint);
    const finalHeaders = mergeHeaders(headers);
    
    return simulateApiCall<T>(endpoint, {
      method: 'PUT',
      headers: finalHeaders,
      body: JSON.stringify(data)
    }).catch(handleApiError);
  }
  
  function deleteRequest<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = buildUrl(endpoint);
    const finalHeaders = mergeHeaders(headers);
    
    return simulateApiCall<T>(endpoint, {
      method: 'DELETE',
      headers: finalHeaders
    }).catch(handleApiError);
  }
  
  function setApiKey(key: string): void {
    apiKey = key;
  }
  
  function setBaseUrl(url: string): void {
    baseUrl = url.replace(/\/$/, ''); // Remove trailing slash
  }
  
  function setTimeout(ms: number): void {
    timeout = ms;
  }
  
  function setDefaultHeaders(headers: Record<string, string>): void {
    defaultHeaders = { ...headers };
  }
  
  function getConfig() {
    return {
      baseUrl,
      timeout,
      hasApiKey: !!apiKey,
      defaultHeaders: { ...defaultHeaders }
    };
  }
  
  // Resource-specific methods
  function getUsers(): Promise<User[]> {
    return get<User[]>('/users').then(response => response.data);
  }
  
  function getUser(id: number): Promise<User> {
    return get<User>(`/users/${id}`).then(response => response.data);
  }
  
  function createUser(userData: Omit<User, 'id'>): Promise<User> {
    return post<User>('/users', userData).then(response => response.data);
  }
  
  function updateUser(id: number, userData: Partial<User>): Promise<User> {
    return put<User>(`/users/${id}`, userData).then(response => response.data);
  }
  
  function deleteUser(id: number): Promise<void> {
    return deleteRequest<void>(`/users/${id}`).then(() => {});
  }
  
  function getUserPosts(userId: number): Promise<Post[]> {
    return get<Post[]>(`/users/${userId}/posts`).then(response => response.data);
  }
  
  // Revealing Module Pattern - choose what to expose
  return {
    // HTTP methods
    get,
    post,
    put,
    delete: deleteRequest,
    
    // Configuration
    setApiKey,
    setBaseUrl,
    setTimeout,
    setDefaultHeaders,
    getConfig,
    
    // Resource methods
    users: {
      getAll: getUsers,
      getById: getUser,
      create: createUser,
      update: updateUser,
      delete: deleteUser,
      getPosts: getUserPosts
    }
    
    // Private functions remain hidden:
    // buildUrl, getAuthHeaders, mergeHeaders, simulateApiCall, handleApiError
  };
})();

// Event Emitter Revealing Module
interface EventListener<T = any> {
  callback: (data: T) => void;
  once: boolean;
}

const EventEmitterModule = (function() {
  // Private state
  let events: Map<string, EventListener[]> = new Map();
  let maxListeners = 10;
  let debugging = false;
  
  // Private functions
  function validateEventName(eventName: string): void {
    if (typeof eventName !== 'string' || eventName.trim() === '') {
      throw new Error('Event name must be a non-empty string');
    }
  }
  
  function validateCallback(callback: Function): void {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
  }
  
  function debugLog(message: string): void {
    if (debugging) {
      console.log(`[EventEmitter] ${message}`);
    }
  }
  
  function getEventListeners(eventName: string): EventListener[] {
    return events.get(eventName) || [];
  }
  
  function addListener(eventName: string, callback: Function, once = false): void {
    validateEventName(eventName);
    validateCallback(callback);
    
    if (!events.has(eventName)) {
      events.set(eventName, []);
    }
    
    const listeners = events.get(eventName)!;
    
    if (listeners.length >= maxListeners) {
      console.warn(`Max listeners (${maxListeners}) exceeded for event "${eventName}"`);
    }
    
    listeners.push({ callback, once });
    debugLog(`Added ${once ? 'once' : ''} listener for "${eventName}"`);
  }
  
  function removeListener(eventName: string, callback: Function): boolean {
    validateEventName(eventName);
    
    const listeners = events.get(eventName);
    if (!listeners) {
      return false;
    }
    
    const index = listeners.findIndex(listener => listener.callback === callback);
    if (index !== -1) {
      listeners.splice(index, 1);
      debugLog(`Removed listener for "${eventName}"`);
      
      if (listeners.length === 0) {
        events.delete(eventName);
      }
      
      return true;
    }
    
    return false;
  }
  
  function emit(eventName: string, data?: any): boolean {
    validateEventName(eventName);
    
    const listeners = events.get(eventName);
    if (!listeners || listeners.length === 0) {
      debugLog(`No listeners for event "${eventName}"`);
      return false;
    }
    
    debugLog(`Emitting "${eventName}" to ${listeners.length} listeners`);
    
    // Execute listeners
    const listenersToRemove: number[] = [];
    
    listeners.forEach((listener, index) => {
      try {
        listener.callback(data);
        if (listener.once) {
          listenersToRemove.push(index);
        }
      } catch (error) {
        console.error(`Error in listener for "${eventName}":`, error);
      }
    });
    
    // Remove 'once' listeners (in reverse order to maintain indices)
    for (let i = listenersToRemove.length - 1; i >= 0; i--) {
      listeners.splice(listenersToRemove[i], 1);
    }
    
    if (listeners.length === 0) {
      events.delete(eventName);
    }
    
    return true;
  }
  
  function removeAllListeners(eventName?: string): void {
    if (eventName) {
      validateEventName(eventName);
      events.delete(eventName);
      debugLog(`Removed all listeners for "${eventName}"`);
    } else {
      events.clear();
      debugLog('Removed all listeners for all events');
    }
  }
  
  function getListenerCount(eventName: string): number {
    validateEventName(eventName);
    return getEventListeners(eventName).length;
  }
  
  function getEventNames(): string[] {
    return Array.from(events.keys());
  }
  
  function setMaxListeners(max: number): void {
    if (max < 0) {
      throw new Error('Max listeners must be non-negative');
    }
    maxListeners = max;
  }
  
  function setDebugging(enabled: boolean): void {
    debugging = enabled;
  }
  
  // Revealing Module Pattern
  return {
    // Core event methods
    on: addListener,
    once: (eventName: string, callback: Function) => addListener(eventName, callback, true),
    off: removeListener,
    emit,
    
    // Management methods
    removeAllListeners,
    getListenerCount,
    getEventNames,
    
    // Configuration
    setMaxListeners,
    setDebugging
    
    // Private functions remain hidden:
    // validateEventName, validateCallback, debugLog, getEventListeners
  };
})();

// Factory functions
export function createCalculator() {
  return CalculatorModule;
}

export function createApiClient() {
  return ApiClientModule;
}

export function createEventEmitter() {
  return EventEmitterModule;
}

export const metadata: PatternMetadata = {
  title: 'Revealing Module Pattern',
  category: 'Modern',
  difficulty: 'Medium',
  description: 'Define all functions privately, then reveal selected ones publicly',
  detailedDescription: `
    ## 🎭 Revealing Module Pattern

    The **Revealing Module Pattern** is a variation of the Module Pattern where all functions and variables are defined privately, and then a public API is created by revealing selected private functions through the return statement.

    ### Core Concepts

    🔹 **Private by Default** - All functions defined as private within IIFE  
    🔹 **Selective Exposure** - Choose which functions to make public  
    🔹 **Clean API** - Return object clearly shows public interface  
    🔹 **Consistent Access** - Private functions can call each other directly

    ### Key Differences from Classic Module Pattern

    **Classic Module**: Functions defined directly in return object  
    **Revealing Module**: All functions defined privately, then revealed  
    **Advantage**: Cleaner separation between public and private  
    **Advantage**: Consistent calling convention for private functions

    ### Real-World Applications

    **API Clients** - HTTP methods private, expose selected endpoints  
    **Calculators** - Math operations private, reveal chosen functionality  
    **Event Systems** - Internal event handling private, expose listener API  
    **Configuration Managers** - Internal validation private, expose settings API

    ### Pattern Benefits

    **Clear Intent** - Public API explicitly defined in return statement  
    **Better Organization** - All function definitions together, then public mapping  
    **Easier Refactoring** - Can easily change what's public without moving code  
    **Consistent Naming** - Private functions keep their names when revealed

    ### Implementation Benefits

    ✅ **Explicit public API** - Clear separation between public and private  
    ✅ **Better readability** - Public interface visible at end of module  
    ✅ **Flexible exposure** - Easy to change what's public/private  
    ✅ **Consistent internal calls** - Private functions call each other directly
  `,
  useCases: [
    PatternUseCase.LIBRARY_DEVELOPMENT,
    PatternUseCase.API_DESIGN,
    PatternUseCase.CODE_ORGANIZATION
  ],
  advantages: [
    'Explicit and clear public API definition',
    'Better organization of public vs private functions',
    'Consistent calling convention for private functions',
    'Easy to modify what gets exposed publicly'
  ],
  disadvantages: [
    'Slightly more verbose than classic module pattern',
    'Private functions cannot be easily tested in isolation',
    'Still has closure memory overhead',
    'Cannot dynamically modify public API'
  ],
  relatedPatterns: ['Module', 'Facade', 'Singleton']
};

export const solutions: SolutionMetadata[] = [
  {
    name: 'calculator-module',
    title: 'Advanced Calculator',
    description: 'Mathematical calculator with history and chaining',
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium'
  },
  {
    name: 'api-client',
    title: 'HTTP API Client',
    description: 'REST API client with authentication and resource methods',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Hard'
  },
  {
    name: 'event-emitter',
    title: 'Event Management System',
    description: 'Custom event emitter with listener management',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'Calculator with Method Chaining',
    scenario: 'Perform mathematical operations with private validation and public calculation methods',
    inputExample: `const calc = createCalculator();

calc.add(10);
calc.multiply(5);
calc.subtract(20);

console.log('Result:', calc.getCurrentResult());

// Method chaining
const chainResult = calc.chain()
  .add(100)
  .multiply(2)
  .divide(4)
  .result();

console.log('Chain result:', chainResult);
console.log('History:', calc.getHistory().slice(-3));`,
    outputExample: `Result: 30
Chain result: 75
History: ["- 20 = 30", "+ 100 = 130", "× 2 = 260"]`,
    explanation: 'All mathematical operations are defined privately with validation, then selectively revealed. Private functions like formatResult and validateNumber remain hidden.'
  },
  {
    title: 'API Client with Resource Methods',
    scenario: 'HTTP client with private helper functions and public resource-specific methods',
    inputExample: `const api = createApiClient();

api.setApiKey('secret-key');
api.setBaseUrl('https://jsonplaceholder.typicode.com');

console.log('Config:', api.getConfig());

// Use resource methods (these use private helpers internally)
api.users.getById(1).then(user => {
  console.log('User:', user.name);
}).catch(console.error);

api.users.create({ name: 'Jane', email: 'jane@example.com' }).then(user => {
  console.log('Created user:', user);
});`,
    outputExample: `Config: { baseUrl: 'https://jsonplaceholder.typicode.com', timeout: 5000, hasApiKey: true, defaultHeaders: {...} }
User: John Doe
Created user: { id: 1, name: 'Jane', email: 'jane@example.com' }`,
    explanation: 'API client reveals only necessary methods while keeping URL building, header merging, and error handling private. Resource methods provide clean interface.'
  },
  {
    title: 'Event Emitter with Private Validation',
    scenario: 'Event system with private validation functions and public listener management',
    inputExample: `const emitter = createEventEmitter();

emitter.setDebugging(true);

const handler1 = (data) => console.log('Handler 1:', data);
const handler2 = (data) => console.log('Handler 2:', data);

emitter.on('test', handler1);
emitter.once('test', handler2);

console.log('Listeners:', emitter.getListenerCount('test'));

emitter.emit('test', 'Hello World');
emitter.emit('test', 'Second message');

console.log('Listeners after:', emitter.getListenerCount('test'));`,
    outputExample: `[EventEmitter] Added  listener for "test"
[EventEmitter] Added once listener for "test"
Listeners: 2
[EventEmitter] Emitting "test" to 2 listeners
Handler 1: Hello World
Handler 2: Hello World
[EventEmitter] Emitting "test" to 1 listeners
Handler 1: Second message
Listeners after: 1`,
    explanation: 'Event emitter reveals listener management methods while keeping validation and internal event handling private. The "once" listener automatically removes itself after first emit.'
  }
];

export { CalculatorModule, ApiClientModule, EventEmitterModule };
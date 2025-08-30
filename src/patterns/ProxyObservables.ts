/* eslint-disable @typescript-eslint/no-explicit-any -- Proxy pattern requires dynamic property access */
import { PatternMetadata, PatternExample, PatternUseCase, Solution } from '../interfaces/patterns';

// Local type definitions for this pattern
type ChangeListener<T> = (target: T, property: keyof T, value: any, oldValue: any) => void;

interface ObservableOptions {
  deep?: boolean;
  lazy?: boolean;
  debounce?: number;
}

class ProxyObservable<T extends object> {
  private listeners: Set<ChangeListener<T>> = new Set();
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
  private readonly options: Required<ObservableOptions>;

  constructor(
    private target: T,
    options: ObservableOptions = {}
  ) {
    this.options = {
      deep: options.deep ?? true,
      lazy: options.lazy ?? false,
      debounce: options.debounce ?? 0
    };
  }

  observe(): T {
    return new Proxy(this.target, {
      get: (target, property) => {
        const value = (target as any)[property];
        
        // If deep observation is enabled and value is an object, wrap it
        if (this.options.deep && 
            value !== null && 
            typeof value === 'object' && 
            !this.isProxy(value)) {
          
          const childObservable = new ProxyObservable(value, this.options);
          childObservable.addListener((childTarget, childProperty, newValue, oldValue) => {
            // Bubble up changes from nested objects
            this.notifyListeners(target as T, `${String(property)}.${String(childProperty)}` as keyof T, newValue, oldValue);
          });
          
          (target as any)[property] = childObservable.observe();
          return (target as any)[property];
        }
        
        return value;
      },
      
      set: (target, property, value) => {
        const oldValue = (target as any)[property];
        
        if (oldValue === value) {
          return true; // No change
        }
        
        (target as any)[property] = value;
        
        if (!this.options.lazy) {
          this.notifyListeners(target as T, property as keyof T, value, oldValue);
        }
        
        return true;
      },
      
      deleteProperty: (target, property) => {
        const oldValue = (target as any)[property];
        delete (target as any)[property];
        
        this.notifyListeners(target as T, property as keyof T, undefined, oldValue);
        return true;
      }
    });
  }

  addListener(listener: ChangeListener<T>): void {
    this.listeners.add(listener);
  }

  removeListener(listener: ChangeListener<T>): void {
    this.listeners.delete(listener);
  }

  private notifyListeners(target: T, property: keyof T, value: any, oldValue: any): void {
    const propertyKey = String(property);
    
    if (this.options.debounce > 0) {
      // Clear existing timer
      const existingTimer = this.debounceTimers.get(propertyKey);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }
      
      // Set new timer
      const timer = setTimeout(() => {
        this.executeNotifications(target, property, value, oldValue);
        this.debounceTimers.delete(propertyKey);
      }, this.options.debounce);
      
      this.debounceTimers.set(propertyKey, timer);
    } else {
      this.executeNotifications(target, property, value, oldValue);
    }
  }

  private executeNotifications(target: T, property: keyof T, value: any, oldValue: any): void {
    this.listeners.forEach(listener => {
      try {
        listener(target, property, value, oldValue);
      } catch (error) {
        console.error('Error in change listener:', error);
      }
    });
  }

  private isProxy(obj: any): boolean {
    try {
      return obj.constructor === undefined;
    } catch {
      return true;
    }
  }

  getListenerCount(): number {
    return this.listeners.size;
  }

  clearListeners(): void {
    this.listeners.clear();
  }
}

// State Management with Proxy
interface AppState {
  user: {
    id: number;
    name: string;
    email: string;
    preferences: {
      theme: string;
      language: string;
      notifications: boolean;
    };
  } | null;
  ui: {
    loading: boolean;
    errors: string[];
    currentPage: string;
  };
  data: {
    items: any[];
    filters: Record<string, any>;
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

class StateManager {
  private state: AppState;
  private observable: ProxyObservable<AppState>;
  private proxy: AppState;
  private stateHistory: AppState[] = [];
  private maxHistorySize = 50;

  constructor(initialState: AppState) {
    this.state = JSON.parse(JSON.stringify(initialState)); // Deep clone
    this.observable = new ProxyObservable(this.state, { 
      deep: true, 
      debounce: 10 
    });
    
    // Track state changes for history
    this.observable.addListener((target, property, value, oldValue) => {
      this.addToHistory();
      this.logStateChange(property, value, oldValue);
    });
    
    this.proxy = this.observable.observe();
  }

  getState(): AppState {
    return this.proxy;
  }

  updateUser(updates: Partial<AppState['user']>): void {
    if (this.proxy.user) {
      Object.assign(this.proxy.user, updates);
    }
  }

  setLoading(loading: boolean): void {
    this.proxy.ui.loading = loading;
  }

  addError(error: string): void {
    this.proxy.ui.errors.push(error);
  }

  clearErrors(): void {
    this.proxy.ui.errors.length = 0;
  }

  updateFilters(filters: Record<string, any>): void {
    Object.assign(this.proxy.data.filters, filters);
  }

  addStateListener(listener: ChangeListener<AppState>): void {
    this.observable.addListener(listener);
  }

  removeStateListener(listener: ChangeListener<AppState>): void {
    this.observable.removeListener(listener);
  }

  private addToHistory(): void {
    const snapshot = JSON.parse(JSON.stringify(this.state));
    this.stateHistory.push(snapshot);
    
    if (this.stateHistory.length > this.maxHistorySize) {
      this.stateHistory.shift();
    }
  }

  private logStateChange(property: keyof AppState, value: any, oldValue: any): void {
    console.log(`State changed: ${String(property)}`, { oldValue, newValue: value });
  }

  getStateHistory(): AppState[] {
    return [...this.stateHistory];
  }

  getHistorySize(): number {
    return this.stateHistory.length;
  }
}

// Form Validation with Proxy
interface FormField {
  value: any;
  error?: string;
  touched: boolean;
  required: boolean;
}

interface FormState {
  [key: string]: FormField;
}

type ValidationRule = (value: any) => string | null;

class ReactiveForm {
  private fields: FormState = {};
  private observable: ProxyObservable<FormState>;
  private proxy: FormState;
  private validationRules: Map<string, ValidationRule[]> = new Map();
  private submitListeners: Array<(isValid: boolean, data: Record<string, any>) => void> = [];

  constructor() {
    this.observable = new ProxyObservable(this.fields, { debounce: 300 });
    
    // Auto-validate on change
    this.observable.addListener((target, property) => {
      this.validateField(String(property));
      this.notifyValidationChange();
    });
    
    this.proxy = this.observable.observe();
  }

  addField(name: string, initialValue: any = '', required: boolean = false): void {
    this.proxy[name] = {
      value: initialValue,
      touched: false,
      required
    };
  }

  addValidationRule(fieldName: string, rule: ValidationRule): void {
    if (!this.validationRules.has(fieldName)) {
      this.validationRules.set(fieldName, []);
    }
    this.validationRules.get(fieldName)!.push(rule);
  }

  setValue(fieldName: string, value: any): void {
    if (this.proxy[fieldName]) {
      this.proxy[fieldName].value = value;
      this.proxy[fieldName].touched = true;
    }
  }

  getValue(fieldName: string): any {
    return this.proxy[fieldName]?.value;
  }

  getField(fieldName: string): FormField | undefined {
    return this.proxy[fieldName];
  }

  private validateField(fieldName: string): void {
    const field = this.proxy[fieldName];
    if (!field) return;

    let error: string | null = null;

    // Check required
    if (field.required && (!field.value || field.value.toString().trim() === '')) {
      error = 'This field is required';
    }

    // Run custom validation rules
    if (!error) {
      const rules = this.validationRules.get(fieldName) || [];
      for (const rule of rules) {
        error = rule(field.value);
        if (error) break;
      }
    }

    field.error = error || undefined;
  }

  isValid(): boolean {
    // Validate all fields
    Object.keys(this.proxy).forEach(fieldName => {
      this.validateField(fieldName);
    });

    // Check if any field has errors
    return Object.values(this.proxy).every(field => !field.error);
  }

  getFormData(): Record<string, any> {
    const data: Record<string, any> = {};
    Object.entries(this.proxy).forEach(([key, field]) => {
      data[key] = field.value;
    });
    return data;
  }

  getErrors(): Record<string, string> {
    const errors: Record<string, string> = {};
    Object.entries(this.proxy).forEach(([key, field]) => {
      if (field.error) {
        errors[key] = field.error;
      }
    });
    return errors;
  }

  reset(): void {
    Object.keys(this.proxy).forEach(fieldName => {
      this.proxy[fieldName].value = '';
      this.proxy[fieldName].error = undefined;
      this.proxy[fieldName].touched = false;
    });
  }

  onSubmit(callback: (isValid: boolean, data: Record<string, any>) => void): void {
    this.submitListeners.push(callback);
  }

  submit(): void {
    const isValid = this.isValid();
    const data = this.getFormData();
    
    this.submitListeners.forEach(callback => {
      callback(isValid, data);
    });
  }

  private notifyValidationChange(): void {
    // Could emit events for UI updates
    const errors = this.getErrors();
    if (Object.keys(errors).length > 0) {
      console.log('Form validation errors:', errors);
    }
  }

  addChangeListener(listener: ChangeListener<FormState>): void {
    this.observable.addListener(listener);
  }
}

// Model with Computed Properties
interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
  };
}

class ReactiveUserModel {
  private model: UserModel;
  private observable: ProxyObservable<UserModel>;
  private proxy: UserModel;
  private computedValues: Map<string, () => any> = new Map();

  constructor(initialData: UserModel) {
    this.model = { ...initialData };
    this.observable = new ProxyObservable(this.model);
    this.proxy = this.observable.observe();
    
    this.setupComputedProperties();
  }

  private setupComputedProperties(): void {
    // Computed properties are recalculated when dependencies change
    this.computedValues.set('fullName', () => {
      return `${this.proxy.firstName} ${this.proxy.lastName}`;
    });
    
    this.computedValues.set('age', () => {
      const today = new Date();
      const birthDate = new Date(this.proxy.birthDate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
      }
      return age;
    });
    
    this.computedValues.set('initials', () => {
      return (this.proxy.firstName[0] || '') + (this.proxy.lastName[0] || '');
    });
  }

  get data(): UserModel {
    return this.proxy;
  }

  getComputed(propertyName: string): any {
    const computer = this.computedValues.get(propertyName);
    return computer ? computer() : undefined;
  }

  getAllComputed(): Record<string, any> {
    const computed: Record<string, any> = {};
    this.computedValues.forEach((computer, key) => {
      computed[key] = computer();
    });
    return computed;
  }

  addChangeListener(listener: ChangeListener<UserModel>): void {
    this.observable.addListener(listener);
  }

  toJSON(): any {
    return {
      ...this.model,
      computed: this.getAllComputed()
    };
  }
}

// Factory functions
export function createObservable<T extends object>(
  target: T, 
  options?: ObservableOptions
): { proxy: T; observable: ProxyObservable<T> } {
  const observable = new ProxyObservable(target, options);
  const proxy = observable.observe();
  return { proxy, observable };
}

export function createStateManager(initialState: AppState) {
  return new StateManager(initialState);
}

export function createReactiveForm() {
  return new ReactiveForm();
}

export function createUserModel(initialData: UserModel) {
  return new ReactiveUserModel(initialData);
}

export const metadata: PatternMetadata = {
  title: 'Proxy-Based Observables',
  category: 'Modern',
  difficulty: 'Hard',
  description: 'Create reactive objects using ES6 Proxy for automatic change detection',
  concepts: ["design patterns","software architecture","code organization","object-oriented programming"],
    timeComplexity: 'O(1) for property access, O(n) for deep observation',
  spaceComplexity: 'O(n) where n is the number of observers',
    detailedDescription: `
    ## 🔍 Proxy-Based Observables Pattern

    The **Proxy-Based Observables Pattern** leverages ES6 Proxy to create reactive objects that automatically notify observers when properties change. This enables building reactive systems with minimal boilerplate.

    ### Core Concepts

    🔹 **ES6 Proxy** - Intercepts and customizes operations on objects (property access, assignment)  
    🔹 **Automatic Detection** - Changes are detected without explicit setter methods  
    🔹 **Deep Observation** - Nested objects can be recursively observed  
    🔹 **Transparent Usage** - Objects behave normally while being observed

    ### Real-World Applications

    **State Management** - Redux-like stores with automatic change detection  
    **Form Validation** - Real-time validation as user types  
    **Data Binding** - Two-way binding between models and views  
    **Computed Properties** - Auto-recalculation when dependencies change

    ### Proxy Advantages Over Traditional Observables

    **No Manual Setup** - Properties are automatically observable without decoration  
    **Dynamic Properties** - New properties added at runtime are automatically observed  
    **Minimal Code** - No need for getter/setter pairs or observable decorators  
    **Native Performance** - Browser-optimized Proxy implementation

    ### Advanced Features

    **Debouncing** - Batch rapid changes to prevent excessive notifications  
    **Deep Observation** - Automatically observe nested objects and arrays  
    **Change History** - Track property changes over time  
    **Validation Integration** - Combine observation with validation rules

    ### Implementation Benefits

    ✅ **Automatic reactivity** - No manual observer setup required  
    ✅ **Natural syntax** - Regular property access and assignment  
    ✅ **Deep observation** - Nested objects automatically wrapped  
    ✅ **Performance optimized** - Native Proxy implementation in modern browsers
  `,
  useCases: [
    PatternUseCase.STATE_MANAGEMENT,
    PatternUseCase.DATA_BINDING,
    PatternUseCase.REACTIVE_SYSTEMS
  ],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
  advantages: [
    'Automatic change detection without manual setup',
    'Natural property access syntax',
    'Deep observation of nested objects',
    'Minimal boilerplate compared to traditional observables'
  ],
  disadvantages: [
    'ES6 Proxy not supported in older browsers',
    'Debugging can be difficult due to proxy wrapper',
    'Performance overhead for every property access',
    'Complex behavior with inheritance and prototypes'
  ],
  relatedPatterns: ['Observer', 'Proxy', 'Model-View-ViewModel (MVVM)']
};

export const solutions: Solution[] = [
  {
    name: 'basic-observable',
    tabName: 'Basic Proxy Observable',
    approach: 'Simple reactive object with change listeners',
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    type: 'function',
    code: `// Basic Observable using Proxy
type ChangeListener<T> = (target: T, property: keyof T, value: any, oldValue: any) => void;

function createObservable<T extends object>(
  target: T,
  listeners: Array<ChangeListener<T>> = []
): T {
  return new Proxy(target, {
    set(obj, property, value) {
      const oldValue = (obj as any)[property];
      (obj as any)[property] = value;
      
      // Notify listeners
      listeners.forEach(listener => {
        try {
          listener(obj as T, property as keyof T, value, oldValue);
        } catch (error) {
          console.error('Observer error:', error);
        }
      });
      
      return true;
    }
  });
}

// Usage
const data = createObservable({ count: 0, name: 'test' }, [
  (target, property, value) => console.log(\`\${String(property)} changed to \${value}\`)
]);

data.count = 5; // Logs: "count changed to 5"
data.name = 'updated'; // Logs: "name changed to updated"`
  },
  {
    name: 'state-manager',
    tabName: 'Application State Manager',
    approach: 'Complex state management with history and deep observation',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    type: 'class',
    code: `// Advanced State Manager
class StateManager<T extends Record<string, any>> {
  private state: T;
  private listeners: Array<ChangeListener<T>> = [];
  private history: Array<{ property: keyof T; value: any; timestamp: Date }> = [];

  constructor(initialState: T) {
    this.state = this.createDeepObservable(initialState);
  }

  private createDeepObservable<U extends object>(obj: U): U {
    const self = this;
    
    return new Proxy(obj, {
      set(target, property, value) {
        const oldValue = (target as any)[property];
        
        // Make nested objects observable too
        if (typeof value === 'object' && value !== null) {
          value = self.createDeepObservable(value);
        }
        
        (target as any)[property] = value;
        
        // Record in history
        self.history.push({
          property: property as keyof T,
          value,
          timestamp: new Date()
        });
        
        // Notify listeners
        self.listeners.forEach(listener => {
          listener(target as T, property as keyof T, value, oldValue);
        });
        
        return true;
      }
    });
  }

  getState(): T {
    return this.state;
  }

  addStateListener(listener: ChangeListener<T>): void {
    this.listeners.push(listener);
  }

  getHistory(): Array<{ property: keyof T; value: any; timestamp: Date }> {
    return [...this.history];
  }
}`
  },
  {
    name: 'reactive-form',
    tabName: 'Form Validation System',
    approach: 'Real-time form validation with reactive fields',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    type: 'class',
    code: `// Reactive Form Validation
interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

class ReactiveFormField {
  private _value: any = '';
  private _errors: string[] = [];
  private validators: ValidationRule[] = [];
  private listeners: Array<(field: ReactiveFormField) => void> = [];

  constructor(initialValue: any = '', required: boolean = false) {
    this._value = initialValue;
    
    if (required) {
      this.addValidator({
        validate: (value) => value !== null && value !== undefined && value !== '',
        message: 'This field is required'
      });
    }

    return new Proxy(this, {
      set(target, property, value) {
        if (property === 'value') {
          target._value = value;
          target.validate();
          target.notifyListeners();
        } else {
          (target as any)[property] = value;
        }
        return true;
      },
      
      get(target, property) {
        if (property === 'value') return target._value;
        if (property === 'errors') return target._errors;
        return (target as any)[property];
      }
    });
  }

  addValidator(rule: ValidationRule): void {
    this.validators.push(rule);
    this.validate();
  }

  private validate(): void {
    this._errors = [];
    this.validators.forEach(rule => {
      if (!rule.validate(this._value)) {
        this._errors.push(rule.message);
      }
    });
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this));
  }

  onChange(listener: (field: ReactiveFormField) => void): void {
    this.listeners.push(listener);
  }

  isValid(): boolean {
    return this._errors.length === 0;
  }
}`
  },
  {
    name: 'computed-properties',
    tabName: 'Model with Computed Properties',
    approach: 'Reactive model with auto-updating computed values',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'class',
    code: `// Reactive Model with Computed Properties
interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

class ReactiveUserModel {
  private data: UserModel;
  private computedCache = new Map<string, any>();
  private listeners: Array<(model: ReactiveUserModel) => void> = [];

  constructor(initialData: UserModel) {
    this.data = new Proxy(initialData, {
      set: (target, property, value) => {
        (target as any)[property] = value;
        
        // Clear related computed properties
        this.computedCache.clear();
        
        // Notify listeners
        this.listeners.forEach(listener => listener(this));
        
        return true;
      }
    });
  }

  // Computed properties
  get fullName(): string {
    if (!this.computedCache.has('fullName')) {
      this.computedCache.set('fullName', \`\${this.data.firstName} \${this.data.lastName}\`);
    }
    return this.computedCache.get('fullName');
  }

  get displayName(): string {
    if (!this.computedCache.has('displayName')) {
      const name = this.fullName;
      const ageInfo = this.data.age > 0 ? \` (age \${this.data.age})\` : '';
      this.computedCache.set('displayName', \`\${name}\${ageInfo}\`);
    }
    return this.computedCache.get('displayName');
  }

  get isAdult(): boolean {
    if (!this.computedCache.has('isAdult')) {
      this.computedCache.set('isAdult', this.data.age >= 18);
    }
    return this.computedCache.get('isAdult');
  }

  // Direct property access
  get firstName(): string { return this.data.firstName; }
  set firstName(value: string) { this.data.firstName = value; }
  
  get lastName(): string { return this.data.lastName; }
  set lastName(value: string) { this.data.lastName = value; }
  
  get email(): string { return this.data.email; }
  set email(value: string) { this.data.email = value; }
  
  get age(): number { return this.data.age; }
  set age(value: number) { this.data.age = value; }

  onChange(listener: (model: ReactiveUserModel) => void): void {
    this.listeners.push(listener);
  }
}`
  }
];

export const examples: PatternExample[] = [
  {
    scenario: 'Create application state that automatically notifies when properties change',
    input: `const initialState: AppState = {
  user: { id: 1, name: 'John', email: 'john@example.com', preferences: { theme: 'dark', language: 'en', notifications: true } },
  ui: { loading: false, errors: [], currentPage: 'home' },
  data: { items: [], filters: {}, pagination: { page: 1, pageSize: 10, total: 0 } }
};

const stateManager = createStateManager(initialState);
const state = stateManager.getState();

// Add change listener
stateManager.addStateListener((target, property, value) => {
  console.log(\`State changed: \${String(property)} = \${JSON.stringify(value)}\`);
});

// Make changes
state.user.name = 'Jane Doe';
state.ui.loading = true;
state.user.preferences.theme = 'light';`,
    output: `State changed: name = "Jane Doe"
State changed: loading = true  
State changed: theme = "light"`,
    description: 'All state changes are automatically detected through Proxy, including nested object properties. The state manager maintains history and provides centralized change tracking.'
  },
  {
    scenario: 'Create reactive form with automatic validation as user types',
    input: `const form = createReactiveForm();

// Setup form fields
form.addField('email', '', true);
form.addField('password', '', true);

// Add validation rules
form.addValidationRule('email', (value) => {
  return value.includes('@') ? null : 'Invalid email format';
});

form.addValidationRule('password', (value) => {
  return value.length >= 6 ? null : 'Password must be at least 6 characters';
});

// Simulate user input
form.setValue('email', 'john');
console.log('Email field:', form.getField('email'));

form.setValue('email', 'john@example.com');
form.setValue('password', '12345');
console.log('Form valid:', form.isValid());

form.setValue('password', '123456');
console.log('Form valid after password fix:', form.isValid());`,
    output: `Form validation errors: { email: 'Invalid email format' }
Email field: { value: 'john', error: 'Invalid email format', touched: true, required: true }
Form validation errors: { password: 'Password must be at least 6 characters' }
Form valid: false
Form valid after password fix: true`,
    description: 'Form fields are automatically validated when values change. The Proxy detects property changes and triggers validation with debouncing to prevent excessive validation calls.'
  },
  {
    scenario: 'Create reactive model where computed properties automatically update when dependencies change',
    input: `const userData: UserModel = {
  firstName: 'John',
  lastName: 'Doe', 
  email: 'john@example.com',
  birthDate: new Date('1990-05-15'),
  preferences: { theme: 'light', language: 'en' }
};

const userModel = createUserModel(userData);

console.log('Initial computed:', userModel.getAllComputed());

// Change name - computed properties auto-update
userModel.data.firstName = 'Jane';
userModel.data.lastName = 'Smith';

console.log('After name change:');
console.log('Full name:', userModel.getComputed('fullName'));
console.log('Initials:', userModel.getComputed('initials'));
console.log('Age:', userModel.getComputed('age'));`,
    output: `Initial computed: { fullName: 'John Doe', age: 34, initials: 'JD' }
After name change:
Full name: Jane Smith
Initials: JS
Age: 34`,
    description: 'Computed properties automatically recalculate when their dependencies change. The Proxy detects changes to firstName and lastName, causing fullName and initials to update automatically.'
  }
];

export { 
  ProxyObservable, StateManager, ReactiveForm, ReactiveUserModel
};

export type { 
  ChangeListener, ObservableOptions, AppState, FormField, FormState, UserModel
};

const proxyObservablesModule = {
  metadata,
  solutions, 
  examples
};

export default proxyObservablesModule;
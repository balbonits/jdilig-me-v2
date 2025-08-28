import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

// Abstract product interfaces
interface Button {
  render(): string;
  onClick(handler: () => void): void;
}

interface Input {
  render(): string;
  getValue(): string;
  setValue(value: string): void;
}

interface Modal {
  render(): string;
  show(): void;
  hide(): void;
}

// Abstract factory interface
interface UIFactory {
  createButton(text: string): Button;
  createInput(placeholder: string): Input;
  createModal(title: string, content: string): Modal;
}

// Light theme implementations
class LightButton implements Button {
  constructor(private text: string) {}

  render(): string {
    return `<button class="btn btn-light">${this.text}</button>`;
  }

  onClick(handler: () => void): void {
    console.log(`Light button "${this.text}" click handler attached`);
  }
}

class LightInput implements Input {
  private value: string = '';
  
  constructor(private placeholder: string) {}

  render(): string {
    return `<input class="input input-light" placeholder="${this.placeholder}" value="${this.value}">`;
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }
}

class LightModal implements Modal {
  constructor(private title: string, private content: string) {}

  render(): string {
    return `<div class="modal modal-light"><div class="modal-header">${this.title}</div><div class="modal-body">${this.content}</div></div>`;
  }

  show(): void {
    console.log(`Showing light modal: ${this.title}`);
  }

  hide(): void {
    console.log(`Hiding light modal: ${this.title}`);
  }
}

// Dark theme implementations
class DarkButton implements Button {
  constructor(private text: string) {}

  render(): string {
    return `<button class="btn btn-dark">${this.text}</button>`;
  }

  onClick(handler: () => void): void {
    console.log(`Dark button "${this.text}" click handler attached`);
  }
}

class DarkInput implements Input {
  private value: string = '';
  
  constructor(private placeholder: string) {}

  render(): string {
    return `<input class="input input-dark" placeholder="${this.placeholder}" value="${this.value}">`;
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }
}

class DarkModal implements Modal {
  constructor(private title: string, private content: string) {}

  render(): string {
    return `<div class="modal modal-dark"><div class="modal-header">${this.title}</div><div class="modal-body">${this.content}</div></div>`;
  }

  show(): void {
    console.log(`Showing dark modal: ${this.title}`);
  }

  hide(): void {
    console.log(`Hiding dark modal: ${this.title}`);
  }
}

// Concrete factory implementations
export class LightUIFactory implements UIFactory {
  createButton(text: string): Button {
    return new LightButton(text);
  }

  createInput(placeholder: string): Input {
    return new LightInput(placeholder);
  }

  createModal(title: string, content: string): Modal {
    return new LightModal(title, content);
  }
}

export class DarkUIFactory implements UIFactory {
  createButton(text: string): Button {
    return new DarkButton(text);
  }

  createInput(placeholder: string): Input {
    return new DarkInput(placeholder);
  }

  createModal(title: string, content: string): Modal {
    return new DarkModal(title, content);
  }
}

// Database abstraction example
interface Connection {
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}

interface Query<T> {
  select(fields: string[]): Query<T>;
  where(condition: string): Query<T>;
  execute(): Promise<T[]>;
}

interface Transaction {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

interface DatabaseFactory {
  createConnection(connectionString: string): Connection;
  createQuery<T>(table: string): Query<T>;
  createTransaction(): Transaction;
}

// PostgreSQL implementation
class PostgreSQLConnection implements Connection {
  constructor(private connectionString: string) {}

  async connect(): Promise<boolean> {
    console.log(`Connecting to PostgreSQL: ${this.connectionString}`);
    return true;
  }

  async disconnect(): Promise<void> {
    console.log('Disconnecting from PostgreSQL');
  }

  isConnected(): boolean {
    return true;
  }
}

class PostgreSQLQuery<T> implements Query<T> {
  private selectFields: string[] = ['*'];
  private whereClause: string = '';

  constructor(private table: string) {}

  select(fields: string[]): Query<T> {
    this.selectFields = fields;
    return this;
  }

  where(condition: string): Query<T> {
    this.whereClause = condition;
    return this;
  }

  async execute(): Promise<T[]> {
    const query = `SELECT ${this.selectFields.join(', ')} FROM ${this.table}${
      this.whereClause ? ' WHERE ' + this.whereClause : ''
    }`;
    console.log(`Executing PostgreSQL query: ${query}`);
    return [];
  }
}

class PostgreSQLTransaction implements Transaction {
  async begin(): Promise<void> {
    console.log('Beginning PostgreSQL transaction');
  }

  async commit(): Promise<void> {
    console.log('Committing PostgreSQL transaction');
  }

  async rollback(): Promise<void> {
    console.log('Rolling back PostgreSQL transaction');
  }
}

export class PostgreSQLFactory implements DatabaseFactory {
  createConnection(connectionString: string): Connection {
    return new PostgreSQLConnection(connectionString);
  }

  createQuery<T>(table: string): Query<T> {
    return new PostgreSQLQuery<T>(table);
  }

  createTransaction(): Transaction {
    return new PostgreSQLTransaction();
  }
}

// Client code that uses abstract factory
export class Application {
  constructor(private uiFactory: UIFactory, private dbFactory: DatabaseFactory) {}

  public createUserInterface(): void {
    const loginButton = this.uiFactory.createButton('Login');
    const usernameInput = this.uiFactory.createInput('Enter username');
    const loginModal = this.uiFactory.createModal('Login', 'Please enter your credentials');

    console.log('UI Components created:');
    console.log(loginButton.render());
    console.log(usernameInput.render());
    console.log(loginModal.render());
  }

  public async setupDatabase(): Promise<void> {
    const connection = this.dbFactory.createConnection('localhost:5432/myapp');
    await connection.connect();

    const userQuery = this.dbFactory.createQuery<{id: string, username: string, email: string}>('users');
    await userQuery.select(['id', 'username', 'email']).execute();

    const transaction = this.dbFactory.createTransaction();
    await transaction.begin();
    await transaction.commit();
  }
}

// Factory functions
export function createLightThemeApp() {
  const uiFactory = new LightUIFactory();
  const dbFactory = new PostgreSQLFactory();
  return new Application(uiFactory, dbFactory);
}

export function createDarkThemeApp() {
  const uiFactory = new DarkUIFactory();
  const dbFactory = new PostgreSQLFactory();
  return new Application(uiFactory, dbFactory);
}

export const metadata: PatternMetadata = {
  title: 'Abstract Factory Pattern',
  category: 'Creational',
  difficulty: 'Hard',
  description: 'Create families of related objects without specifying concrete classes',
  detailedDescription: `
    ## 🏗️ Abstract Factory Pattern

    The **Abstract Factory Pattern** provides an interface for creating families of related or dependent objects without specifying their concrete classes. It ensures that objects created together are compatible.

    ### Core Concepts

    🔹 **Abstract Factory** - Interface for creating families of related objects  
    🔹 **Concrete Factory** - Implements abstract factory for specific product families  
    🔹 **Abstract Product** - Interface for a type of product object  
    🔹 **Concrete Product** - Specific implementation of abstract product

    ### Real-World Applications

    **UI Themes** - Create matching buttons, inputs, modals for light/dark themes  
    **Database Drivers** - Create compatible connection, query, transaction objects  
    **Cross-Platform Development** - Create platform-specific UI components  
    **Game Engines** - Create renderer-specific graphics, audio, input objects

    ### Implementation Benefits

    ✅ **Consistency** - Ensures related objects work together  
    ✅ **Flexibility** - Easy to switch entire product families  
    ✅ **Isolation** - Client code doesn't depend on concrete classes  
    ✅ **Extensibility** - New product families can be added easily
  `,
  useCases: [
    PatternUseCase.API_DESIGN,
    PatternUseCase.CODE_ORGANIZATION,
    PatternUseCase.SYSTEM_INTEGRATION
  ],
  advantages: [
    'Ensures consistency among related objects',
    'Easy to exchange product families',
    'Promotes loose coupling between classes',
    'Supports the Open/Closed Principle'
  ],
  disadvantages: [
    'Can be complex to implement initially',
    'Requires creating many interfaces and classes',
    'Difficult to extend with new product types',
    'May introduce unnecessary complexity for simple cases'
  ],
  relatedPatterns: ['Factory Method', 'Builder', 'Prototype']
};

export const solutions: SolutionMetadata[] = [
  {
    name: 'ui-theme-factory',
    title: 'UI Theme Factory',
    description: 'Create consistent UI components for different themes',
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Hard'
  },
  {
    name: 'database-factory',
    title: 'Database Abstraction Factory',
    description: 'Create compatible database components for different engines',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Medium'
  },
  {
    name: 'application-integration',
    title: 'Complete Application Integration',
    description: 'Combine UI and database factories in application',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Hard'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'Theme-Consistent UI Creation',
    scenario: 'Create UI components that match the selected theme automatically',
    inputExample: `const app = createDarkThemeApp();
app.createUserInterface();`,
    outputExample: `UI Components created:
<button class="btn btn-dark">Login</button>
<input class="input input-dark" placeholder="Enter username" value="">
<div class="modal modal-dark"><div class="modal-header">Login</div><div class="modal-body">Please enter your credentials</div></div>`,
    explanation: 'All UI components created by the dark theme factory automatically have consistent dark styling. The abstract factory ensures theme compatibility across all components.'
  },
  {
    title: 'Database Abstraction',
    scenario: 'Create database components that work with specific database engines',
    inputExample: `const dbFactory = new PostgreSQLFactory();
const connection = dbFactory.createConnection('localhost:5432/myapp');
const query = dbFactory.createQuery('users');
await connection.connect();
await query.select(['id', 'name']).where('active = true').execute();`,
    outputExample: `Connecting to PostgreSQL: localhost:5432/myapp
Executing PostgreSQL query: SELECT id, name FROM users WHERE active = true`,
    explanation: 'Database factory creates PostgreSQL-specific implementations that work together. Connection, query, and transaction objects are all compatible and optimized for PostgreSQL.'
  },
  {
    title: 'Complete Application Setup',
    scenario: 'Configure entire application with compatible UI and database factories',
    inputExample: `const lightApp = createLightThemeApp();
lightApp.createUserInterface();
await lightApp.setupDatabase();`,
    outputExample: `UI Components created:
<button class="btn btn-light">Login</button>
<input class="input input-light" placeholder="Enter username" value="">
<div class="modal modal-light"><div class="modal-header">Login</div><div class="modal-body">Please enter your credentials</div></div>
Connecting to PostgreSQL: localhost:5432/myapp
Executing PostgreSQL query: SELECT id, username, email FROM users
Beginning PostgreSQL transaction
Committing PostgreSQL transaction`,
    explanation: 'Application uses light theme UI factory and PostgreSQL database factory together. Both factories provide compatible components that work seamlessly in the same application.'
  }
];

export { UIFactory, DatabaseFactory, Button, Input, Modal, Connection, Query, Transaction };
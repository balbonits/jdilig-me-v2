/* eslint-disable @typescript-eslint/no-unused-vars */
import { PatternMetadata, PatternExample, PatternUseCase, Solution } from '../interfaces/patterns';

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
  concepts: ['abstract interfaces', 'object families', 'creational pattern', 'loose coupling'],
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
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
  realWorldApplications: [
    'UI component libraries with theme support',
    'Database abstraction layers with multiple drivers',
    'Cross-platform application development',
    'Game engines with multiple rendering backends'
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

export const solutions: Solution[] = [
  {
    name: 'ui-theme-factory',
    tabName: 'UI Theme Factory',
    code: `// UI Factory implementation for different themes
class LightUIFactory implements UIFactory {
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

class DarkUIFactory implements UIFactory {
  createButton(text: string): Button {
    return new DarkButton(text);
  }

  createInput(placeholder: string): Input {
    return new DarkInput(placeholder);
  }

  createModal(title: string, content: string): Modal {
    return new DarkModal(title, content);
  }
}`,
    approach: 'Create consistent UI components for different themes',
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'class'
  },
  {
    name: 'database-factory',
    tabName: 'Database Abstraction Factory',
    code: `// Database Factory implementation for different engines
class PostgreSQLFactory implements DatabaseFactory {
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

class MySQLFactory implements DatabaseFactory {
  createConnection(connectionString: string): Connection {
    return new MySQLConnection(connectionString);
  }

  createQuery<T>(table: string): Query<T> {
    return new MySQLQuery<T>(table);
  }

  createTransaction(): Transaction {
    return new MySQLTransaction();
  }
}`,
    approach: 'Create compatible database components for different engines',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'class'
  },
  {
    name: 'application-integration',
    tabName: 'Complete Application Integration',
    code: `// Application that uses abstract factories
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
}`,
    approach: 'Combine UI and database factories in application',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    type: 'class'
  }
];

export const examples: PatternExample[] = [
  {
    scenario: 'Create UI components that match the selected theme automatically',
    description: 'Theme-Consistent UI Creation',
    input: 'createDarkThemeApp().createUserInterface()',
    output: 'UI Components with dark theme styling'
  },
  {
    scenario: 'Create database components that work with specific database engines',
    description: 'Database Abstraction',
    input: 'new PostgreSQLFactory().createConnection()',
    output: 'PostgreSQL-compatible database components'
  },
  {
    scenario: 'Configure entire application with compatible UI and database factories',
    description: 'Complete Application Setup',
    input: 'createLightThemeApp() with database setup',
    output: 'Fully configured application with light theme UI and PostgreSQL database'
  }
];


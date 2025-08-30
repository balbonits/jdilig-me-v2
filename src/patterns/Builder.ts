import { PatternMetadata, PatternExample, Solution, PatternUseCase } from '@/interfaces/patterns';

/**
 * 🏗️ Builder Pattern Implementation - Complex Object Construction
 * 
 * DESCRIPTION:
 * Constructs complex objects step by step, allowing different representations
 * of the same construction process. Perfect for creating objects with many
 * optional parameters or complex initialization sequences.
 * 
 * EXAMPLES:
 * • SQL query builder - Build queries with method chaining
 * • Configuration objects - Set multiple options step by step
 * • Form builders - Create complex forms programmatically
 * 
 * IMPLEMENTATION APPROACHES:
 * • Method chaining - Fluent interface with returning 'this'
 * • Director pattern - Separate builder from construction logic
 * • Functional builders - Immutable approach with function composition
 * 
 * REAL-WORLD USAGE:
 * • StringBuilder in many languages
 * • HTTP request builders in API clients
 * • Test data builders in testing frameworks
 * • Configuration builders for complex systems
 * 
 * PERFORMANCE:
 * - Time: O(n) where n is number of build steps
 * - Space: O(1) for builder state
 */

// Method chaining Builder (Fluent Interface)
export class QueryBuilder {
  private selectFields: string[] = [];
  private fromTable: string = '';
  private whereConditions: string[] = [];
  private orderByField: string = '';
  private limitValue: number | null = null;

  public select(fields: string[]): QueryBuilder {
    this.selectFields = [...fields];
    return this;
  }

  public from(table: string): QueryBuilder {
    this.fromTable = table;
    return this;
  }

  public where(condition: string): QueryBuilder {
    this.whereConditions.push(condition);
    return this;
  }

  public orderBy(field: string): QueryBuilder {
    this.orderByField = field;
    return this;
  }

  public limit(count: number): QueryBuilder {
    this.limitValue = count;
    return this;
  }

  public build(): string {
    let query = `SELECT ${this.selectFields.join(', ')} FROM ${this.fromTable}`;
    
    if (this.whereConditions.length > 0) {
      query += ` WHERE ${this.whereConditions.join(' AND ')}`;
    }
    
    if (this.orderByField) {
      query += ` ORDER BY ${this.orderByField}`;
    }
    
    if (this.limitValue !== null) {
      query += ` LIMIT ${this.limitValue}`;
    }
    
    return query;
  }

  public reset(): QueryBuilder {
    this.selectFields = [];
    this.fromTable = '';
    this.whereConditions = [];
    this.orderByField = '';
    this.limitValue = null;
    return this;
  }
}

// Director pattern Builder
interface House {
  foundation: string;
  walls: string;
  roof: string;
  garage?: boolean;
  pool?: boolean;
}

export abstract class HouseBuilder {
  protected house: Partial<House> = {};

  public reset(): void {
    this.house = {};
  }

  public abstract buildFoundation(): void;
  public abstract buildWalls(): void;
  public abstract buildRoof(): void;
  public abstract addGarage(): void;
  public abstract addPool(): void;

  public getResult(): House {
    const result = this.house as House;
    this.reset();
    return result;
  }
}

export class ModernHouseBuilder extends HouseBuilder {
  public buildFoundation(): void {
    this.house.foundation = 'concrete slab with radiant heating';
  }

  public buildWalls(): void {
    this.house.walls = 'glass and steel with smart home integration';
  }

  public buildRoof(): void {
    this.house.roof = 'flat roof with solar panels';
  }

  public addGarage(): void {
    this.house.garage = true;
  }

  public addPool(): void {
    this.house.pool = true;
  }
}

export class TraditionalHouseBuilder extends HouseBuilder {
  public buildFoundation(): void {
    this.house.foundation = 'stone foundation with basement';
  }

  public buildWalls(): void {
    this.house.walls = 'brick walls with wooden frame';
  }

  public buildRoof(): void {
    this.house.roof = 'pitched roof with clay tiles';
  }

  public addGarage(): void {
    this.house.garage = true;
  }

  public addPool(): void {
    this.house.pool = false; // Traditional houses typically don't have pools
  }
}

export class HouseDirector {
  public buildBasicHouse(builder: HouseBuilder): House {
    builder.buildFoundation();
    builder.buildWalls();
    builder.buildRoof();
    return builder.getResult();
  }

  public buildLuxuryHouse(builder: HouseBuilder): House {
    builder.buildFoundation();
    builder.buildWalls();
    builder.buildRoof();
    builder.addGarage();
    builder.addPool();
    return builder.getResult();
  }
}

// Functional Builder approach
interface UserProfile {
  name: string;
  email: string;
  age?: number;
  preferences?: string[];
  notifications?: boolean;
  theme?: 'light' | 'dark';
}

interface UserProfileBuilderFunction {
  name: string;
  email: string;
  withAge: (age: number) => UserProfileBuilderFunction & { age: number };
  withPreferences: (preferences: string[]) => UserProfileBuilderFunction & { preferences: string[] };
  withNotifications: (enabled: boolean) => UserProfileBuilderFunction & { notifications: boolean };
  withTheme: (theme: 'light' | 'dark') => UserProfileBuilderFunction & { theme: 'light' | 'dark' };
  build: () => UserProfile;
}

export const createUserProfile = (name: string, email: string): UserProfileBuilderFunction => ({
  name,
  email,
  withAge: (age: number) => ({ ...createUserProfile(name, email), age }),
  withPreferences: (preferences: string[]) => ({ ...createUserProfile(name, email), preferences }),
  withNotifications: (enabled: boolean) => ({ ...createUserProfile(name, email), notifications: enabled }),
  withTheme: (theme: 'light' | 'dark') => ({ ...createUserProfile(name, email), theme }),
  build: (): UserProfile => ({ name, email })
});

// More comprehensive functional builder
export class UserProfileBuilder {
  constructor(private profile: Partial<UserProfile> = {}) {}

  static create(name: string, email: string): UserProfileBuilder {
    return new UserProfileBuilder({ name, email });
  }

  withAge(age: number): UserProfileBuilder {
    return new UserProfileBuilder({ ...this.profile, age });
  }

  withPreferences(preferences: string[]): UserProfileBuilder {
    return new UserProfileBuilder({ ...this.profile, preferences });
  }

  withNotifications(enabled: boolean): UserProfileBuilder {
    return new UserProfileBuilder({ ...this.profile, notifications: enabled });
  }

  withTheme(theme: 'light' | 'dark'): UserProfileBuilder {
    return new UserProfileBuilder({ ...this.profile, theme });
  }

  build(): UserProfile {
    if (!this.profile.name || !this.profile.email) {
      throw new Error('Name and email are required');
    }
    return this.profile as UserProfile;
  }
}

export const metadata: PatternMetadata = {
  title: "Builder Pattern",
  description: "Construct complex objects step by step with flexible configuration",
  detailedDescription: "🏗️ **The Builder Pattern - Complex Object Construction**\n\nConstructs complex objects step by step, allowing different representations of the same construction process. Perfect for creating objects with many optional parameters!\n\n🎯 **Core Problem Solved:**\n• Avoid telescoping constructor parameters\n• Create objects with complex initialization\n• Support different representations of same object\n• Enable step-by-step construction process\n\n🔍 **Three Implementation Approaches:**\n• **Method Chaining:** Fluent interface with returning 'this'\n• **Director Pattern:** Separate builder from construction logic\n• **Functional Builder:** Immutable approach with function composition\n\n🚀 **Real-World Applications:**\n• SQL query builders and ORM query construction\n• HTTP request builders in API clients\n• Configuration objects for complex systems\n• Test data builders in testing frameworks\n• UI component builders and form generators\n• Document and report generators\n\n⚡ **Modern Usage Examples:**\n• React component prop builders\n• GraphQL query builders\n• Docker container configuration\n• Webpack configuration builders",
  category: "Creational",
  difficulty: "Medium",
  concepts: ['step-by-step construction', 'fluent interface', 'object composition'],
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  useCases: [PatternUseCase.API_DESIGN, PatternUseCase.CODE_ORGANIZATION, PatternUseCase.LIBRARY_DEVELOPMENT],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    relatedPatterns: ["Factory Method", "Abstract Factory", "Prototype"],
  frameworkSupport: ["jQuery (chaining)", "Lodash", "Immutable.js", "Builder libraries"]
};

export const examples: PatternExample[] = [
  {
    scenario: "SQL query construction",
    description: "Build complex SQL queries step by step",
    input: "QueryBuilder().select(['name', 'email']).from('users').where('active = 1')",
    output: "SELECT name, email FROM users WHERE active = 1"
  },
  {
    scenario: "House construction",
    description: "Build different types of houses using director pattern",
    input: "HouseDirector.buildLuxuryHouse(new ModernHouseBuilder())",
    output: "House with concrete foundation, glass walls, flat roof, garage, and pool"
  },
  {
    scenario: "User profile creation", 
    description: "Create user profiles with optional settings",
    input: "UserProfileBuilder.create('John', 'john@example.com').withAge(30).withTheme('dark')",
    output: "UserProfile with name, email, age 30, and dark theme"
  }
];

export const solutions: Solution[] = [
  {
    name: "method-chaining",
    tabName: "Method Chaining",
    approach: "Fluent Interface with Method Chaining",
    type: "class",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    code: `class QueryBuilder {
  private selectFields: string[] = [];
  private fromTable: string = '';
  private whereConditions: string[] = [];

  public select(fields: string[]): QueryBuilder {
    this.selectFields = [...fields];
    return this; // Enable chaining
  }

  public from(table: string): QueryBuilder {
    this.fromTable = table;
    return this;
  }

  public where(condition: string): QueryBuilder {
    this.whereConditions.push(condition);
    return this;
  }

  public build(): string {
    let query = \`SELECT \${this.selectFields.join(', ')} FROM \${this.fromTable}\`;
    
    if (this.whereConditions.length > 0) {
      query += \` WHERE \${this.whereConditions.join(' AND ')}\`;
    }
    
    return query;
  }
}

// Usage
const query = new QueryBuilder()
  .select(['name', 'email'])
  .from('users')
  .where('active = 1')
  .where('age > 18')
  .build();`
  },
  {
    name: "director-pattern",
    tabName: "Director Pattern", 
    approach: "Separate Builder from Construction Logic",
    type: "class",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `abstract class HouseBuilder {
  protected house: Partial<House> = {};

  public abstract buildFoundation(): void;
  public abstract buildWalls(): void;
  public abstract buildRoof(): void;

  public getResult(): House {
    const result = this.house as House;
    this.reset();
    return result;
  }

  public reset(): void {
    this.house = {};
  }
}

class ModernHouseBuilder extends HouseBuilder {
  public buildFoundation(): void {
    this.house.foundation = 'concrete slab with radiant heating';
  }

  public buildWalls(): void {
    this.house.walls = 'glass and steel with smart home integration';
  }

  public buildRoof(): void {
    this.house.roof = 'flat roof with solar panels';
  }
}

class HouseDirector {
  public buildBasicHouse(builder: HouseBuilder): House {
    builder.buildFoundation();
    builder.buildWalls();
    builder.buildRoof();
    return builder.getResult();
  }
}

// Usage
const director = new HouseDirector();
const modernBuilder = new ModernHouseBuilder();
const house = director.buildBasicHouse(modernBuilder);`
  },
  {
    name: "functional-builder",
    tabName: "Functional Builder",
    approach: "Immutable Functional Composition",
    type: "function",
    timeComplexity: "O(n)", 
    spaceComplexity: "O(n)",
    isOptimal: false,
    code: `class UserProfileBuilder {
  constructor(private profile: Partial<UserProfile> = {}) {}

  static create(name: string, email: string): UserProfileBuilder {
    return new UserProfileBuilder({ name, email });
  }

  withAge(age: number): UserProfileBuilder {
    return new UserProfileBuilder({ ...this.profile, age });
  }

  withPreferences(preferences: string[]): UserProfileBuilder {
    return new UserProfileBuilder({ ...this.profile, preferences });
  }

  withTheme(theme: 'light' | 'dark'): UserProfileBuilder {
    return new UserProfileBuilder({ ...this.profile, theme });
  }

  build(): UserProfile {
    if (!this.profile.name || !this.profile.email) {
      throw new Error('Name and email are required');
    }
    return this.profile as UserProfile;
  }
}

// Usage - immutable chain
const profile = UserProfileBuilder
  .create('John Doe', 'john@example.com')
  .withAge(30)
  .withTheme('dark')
  .withPreferences(['tech', 'gaming'])
  .build();`
  }
];
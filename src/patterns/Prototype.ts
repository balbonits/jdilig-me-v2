import { PatternMetadata, PatternExample, Solution, PatternUseCase } from '@/interfaces/patterns';

/**
 * 🏗️ Prototype Pattern Implementation - Efficient Object Cloning
 * 
 * DESCRIPTION:
 * Creates new objects by cloning existing instances rather than creating
 * from scratch. Perfect for when object creation is expensive or when you
 * need objects that are similar to existing ones.
 * 
 * EXAMPLES:
 * • Document templates - Clone and customize existing documents
 * • Game entities - Clone enemy types with slight variations
 * • Configuration objects - Clone base configs for different environments
 * 
 * IMPLEMENTATION APPROACHES:
 * • Shallow clone - Copy object properties but not nested objects
 * • Deep clone - Recursively copy all nested objects and arrays
 * • Registry pattern - Store prototypes in registry for reuse
 * 
 * REAL-WORLD USAGE:
 * • Object.create() in JavaScript
 * • Clone methods in many programming languages
 * • Template systems and document generators
 * • Game object spawning systems
 * 
 * PERFORMANCE:
 * - Time: O(n) for deep clone, O(1) for shallow clone
 * - Space: O(n) for cloned object storage
 */

// Base prototype interface
interface Cloneable<T> {
  clone(): T;
}

// Document prototype example
export class Document implements Cloneable<Document> {
  constructor(
    public title: string = '',
    public content: string = '',
    public metadata: Record<string, unknown> = {},
    public sections: DocumentSection[] = []
  ) {}

  public clone(): Document {
    // Deep clone implementation
    return new Document(
      this.title,
      this.content,
      { ...this.metadata },
      this.sections.map(section => section.clone())
    );
  }

  public addSection(section: DocumentSection): void {
    this.sections.push(section);
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public addMetadata(key: string, value: unknown): void {
    this.metadata[key] = value;
  }
}

export class DocumentSection implements Cloneable<DocumentSection> {
  constructor(
    public heading: string = '',
    public body: string = '',
    public order: number = 0
  ) {}

  public clone(): DocumentSection {
    return new DocumentSection(this.heading, this.body, this.order);
  }
}

// Game entity prototype example
export abstract class GameEntity implements Cloneable<GameEntity> {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public health: number = 100,
    public speed: number = 1,
    public abilities: string[] = []
  ) {}

  public abstract clone(): GameEntity;

  public moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }

  public addAbility(ability: string): void {
    if (!this.abilities.includes(ability)) {
      this.abilities.push(ability);
    }
  }
}

export class Warrior extends GameEntity {
  constructor(
    x: number = 0,
    y: number = 0,
    health: number = 150,
    speed: number = 0.8,
    public armor: number = 20,
    public weapon: string = 'sword'
  ) {
    super(x, y, health, speed, ['melee_attack', 'block']);
    this.armor = armor;
    this.weapon = weapon;
  }

  public clone(): Warrior {
    return new Warrior(
      this.x,
      this.y,
      this.health,
      this.speed,
      this.armor,
      this.weapon
    );
  }

  public upgradeArmor(amount: number): void {
    this.armor += amount;
  }
}

export class Mage extends GameEntity {
  constructor(
    x: number = 0,
    y: number = 0,
    health: number = 80,
    speed: number = 1.2,
    public mana: number = 100,
    public spells: string[] = ['fireball']
  ) {
    super(x, y, health, speed, ['cast_spell', 'teleport']);
    this.mana = mana;
    this.spells = [...spells];
  }

  public clone(): Mage {
    return new Mage(
      this.x,
      this.y,
      this.health,
      this.speed,
      this.mana,
      [...this.spells] // Deep clone array
    );
  }

  public learnSpell(spell: string): void {
    if (!this.spells.includes(spell)) {
      this.spells.push(spell);
    }
  }
}

// Prototype Registry pattern
export class EntityRegistry {
  private prototypes: Map<string, GameEntity> = new Map();

  public registerPrototype(name: string, prototype: GameEntity): void {
    this.prototypes.set(name, prototype);
  }

  public createEntity(name: string): GameEntity | null {
    const prototype = this.prototypes.get(name);
    return prototype ? prototype.clone() : null;
  }

  public listAvailableTypes(): string[] {
    return Array.from(this.prototypes.keys());
  }

  public removePrototype(name: string): boolean {
    return this.prototypes.delete(name);
  }
}

// Configuration prototype example
export interface AppConfig {
  database: {
    host: string;
    port: number;
    name: string;
    ssl: boolean;
  };
  cache: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: string;
  };
  features: string[];
}

export class ConfigPrototype implements Cloneable<ConfigPrototype> {
  constructor(public config: AppConfig) {}

  public clone(): ConfigPrototype {
    return new ConfigPrototype({
      database: { ...this.config.database },
      cache: { ...this.config.cache },
      logging: { ...this.config.logging },
      features: [...this.config.features]
    });
  }

  public updateDatabaseHost(host: string): ConfigPrototype {
    const cloned = this.clone();
    cloned.config.database.host = host;
    return cloned;
  }

  public enableFeature(feature: string): ConfigPrototype {
    const cloned = this.clone();
    if (!cloned.config.features.includes(feature)) {
      cloned.config.features.push(feature);
    }
    return cloned;
  }

  public setLogLevel(level: AppConfig['logging']['level']): ConfigPrototype {
    const cloned = this.clone();
    cloned.config.logging.level = level;
    return cloned;
  }
}

// Deep clone utility function
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}

export const metadata: PatternMetadata = {
  title: "Prototype Pattern",
  description: "Clone existing objects efficiently instead of creating from scratch",
  detailedDescription: "🏗️ **The Prototype Pattern - Efficient Object Cloning**\n\nCreates new objects by cloning existing instances rather than creating from scratch. Perfect for when object creation is expensive!\n\n🎯 **Core Problem Solved:**\n• Avoid expensive object creation operations\n• Create similar objects with slight variations\n• Support runtime object creation without knowing concrete classes\n• Enable object creation without constructors\n\n🔍 **Three Implementation Approaches:**\n• **Shallow Clone:** Copy object properties but not nested objects\n• **Deep Clone:** Recursively copy all nested objects and arrays\n• **Registry Pattern:** Store prototypes in registry for reuse\n\n🚀 **Real-World Applications:**\n• Document templates and content management systems\n• Game entity spawning and character creation\n• Configuration management for different environments\n• Caching expensive-to-create objects\n• GUI component libraries with template widgets\n• Database record templates\n\n⚡ **Modern Usage Examples:**\n• Object.create() and Object.assign() in JavaScript\n• Immutable.js and data structure libraries\n• React component cloning patterns\n• Redux state management with immutable updates",
  category: "Creational",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  concepts: ["Object Cloning", "Deep/Shallow Copy", "Template Objects", "Performance Optimization", "Runtime Creation"],
  useCases: [PatternUseCase.CODE_ORGANIZATION, PatternUseCase.PERFORMANCE_OPTIMIZATION, PatternUseCase.FRAMEWORK_DEVELOPMENT],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    relatedPatterns: ["Factory Method", "Builder", "Singleton"],
  frameworkSupport: ["Lodash (cloneDeep)", "Immutable.js", "Ramda", "Native Object methods"]
};

export const examples: PatternExample[] = [
  {
    scenario: "Document template cloning",
    description: "Clone existing document template and customize",
    input: "reportTemplate.clone().setTitle('Monthly Report').addSection(summarySection)",
    output: "New document with custom title and additional section"
  },
  {
    scenario: "Game entity creation",
    description: "Clone warrior prototype to create new warrior instances",
    input: "warriorPrototype.clone().moveTo(100, 200).upgradeArmor(10)",
    output: "New warrior at position (100, 200) with upgraded armor"
  },
  {
    scenario: "Environment configuration",
    description: "Clone base config for different environments",
    input: "baseConfig.clone().updateDatabaseHost('prod.db.com').setLogLevel('error')",
    output: "Production config with updated database host and error-only logging"
  }
];

export const solutions: Solution[] = [
  {
    name: "shallow-clone",
    tabName: "Shallow Clone",
    approach: "Copy Object Properties Only",
    type: "method",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `class Document {
  constructor(
    public title: string = '',
    public content: string = '',
    public metadata: Record<string, any> = {}
  ) {}

  // Shallow clone - only copies direct properties
  public clone(): Document {
    return new Document(
      this.title,
      this.content,
      this.metadata  // Reference copied, not deep cloned
    );
  }
}

// Alternative using Object.assign
const shallowClone = (obj: any) => Object.assign({}, obj);

// Or using spread operator
const shallowCloneSpread = (obj: any) => ({ ...obj });

// Usage
const template = new Document('Template', 'Base content', { author: 'John' });
const copy = template.clone();

// Issue: metadata is shared between original and copy
copy.metadata.author = 'Jane'; // This affects the original!`
  },
  {
    name: "deep-clone",
    tabName: "Deep Clone",
    approach: "Recursively Clone All Nested Objects",
    type: "method",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    code: `class Document {
  constructor(
    public title: string = '',
    public content: string = '',
    public metadata: Record<string, unknown> = {},
    public sections: DocumentSection[] = []
  ) {}

  // Deep clone - recursively copies all nested objects
  public clone(): Document {
    return new Document(
      this.title,
      this.content,
      { ...this.metadata }, // Shallow copy for simple objects
      this.sections.map(section => section.clone()) // Deep copy array
    );
  }
}

// Generic deep clone utility
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}

// Usage
const template = new Document('Template', 'Content', { author: 'John' });
const copy = template.clone();
copy.metadata.author = 'Jane'; // Original is unaffected`
  },
  {
    name: "registry-pattern",
    tabName: "Registry Pattern",
    approach: "Centralized Prototype Storage",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(k)",
    isOptimal: false,
    code: `class EntityRegistry {
  private prototypes: Map<string, GameEntity> = new Map();

  public registerPrototype(name: string, prototype: GameEntity): void {
    this.prototypes.set(name, prototype);
  }

  public createEntity(name: string): GameEntity | null {
    const prototype = this.prototypes.get(name);
    return prototype ? prototype.clone() : null;
  }

  public listAvailableTypes(): string[] {
    return Array.from(this.prototypes.keys());
  }
}

// Setup prototypes
const registry = new EntityRegistry();
registry.registerPrototype('warrior', new Warrior(0, 0, 150, 0.8, 20, 'sword'));
registry.registerPrototype('mage', new Mage(0, 0, 80, 1.2, 100, ['fireball']));

// Create entities from prototypes
const warrior1 = registry.createEntity('warrior');
const warrior2 = registry.createEntity('warrior');
const mage1 = registry.createEntity('mage');

// Each entity is independent
warrior1?.moveTo(100, 100);
warrior2?.moveTo(200, 200);
mage1?.learnSpell('lightning');

console.log(registry.listAvailableTypes()); // ['warrior', 'mage']`
  }
];
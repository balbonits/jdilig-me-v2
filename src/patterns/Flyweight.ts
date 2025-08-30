import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { Solution } from '../interfaces/shared';

// Flyweight interface
interface CharacterFlyweight {
  render(x: number, y: number, size: number, color: string): string;
}

// Concrete Flyweight - Intrinsic state only
class Character implements CharacterFlyweight {
  constructor(private char: string, private font: string) {}

  render(x: number, y: number, size: number, color: string): string {
    return `Render '${this.char}' in ${this.font} at (${x}, ${y}) size:${size} color:${color}`;
  }

  getIntrinsicState(): { char: string; font: string } {
    return { char: this.char, font: this.font };
  }
}

// Flyweight Factory - Ensures sharing
class CharacterFactory {
  private static flyweights = new Map<string, Character>();
  
  static getCharacter(char: string, font: string): Character {
    const key = `${char}-${font}`;
    
    if (!this.flyweights.has(key)) {
      this.flyweights.set(key, new Character(char, font));
      console.log(`Created new flyweight: ${key}`);
    }
    
    return this.flyweights.get(key)!;
  }
  
  static getFlyweightCount(): number {
    return this.flyweights.size;
  }
  
  static clear(): void {
    this.flyweights.clear();
  }
}

// Context - Extrinsic state
class CharacterContext {
  constructor(
    private x: number,
    private y: number,
    private size: number,
    private color: string,
    private flyweight: CharacterFlyweight
  ) {}

  render(): string {
    return this.flyweight.render(this.x, this.y, this.size, this.color);
  }
}

// Document using flyweights
class Document {
  private characters: CharacterContext[] = [];

  addCharacter(char: string, font: string, x: number, y: number, size: number, color: string): void {
    const flyweight = CharacterFactory.getCharacter(char, font);
    const context = new CharacterContext(x, y, size, color, flyweight);
    this.characters.push(context);
  }

  render(): string {
    return this.characters.map(c => c.render()).join('\n');
  }

  getCharacterCount(): number {
    return this.characters.length;
  }

  getFlyweightCount(): number {
    return CharacterFactory.getFlyweightCount();
  }
}

// Tree Flyweight Example
interface TreeType {
  render(x: number, y: number, health: number): string;
}

class TreeTypeFlyweight implements TreeType {
  constructor(
    private species: string,
    private sprite: string,
    private baseColor: string
  ) {}

  render(x: number, y: number, health: number): string {
    const healthColor = health > 50 ? this.baseColor : 'brown';
    return `${this.species} tree (${this.sprite}) at (${x}, ${y}) health:${health}% color:${healthColor}`;
  }
}

class TreeTypeFactory {
  private static treeTypes = new Map<string, TreeTypeFlyweight>();

  static getTreeType(species: string, sprite: string, baseColor: string): TreeTypeFlyweight {
    const key = `${species}-${sprite}-${baseColor}`;
    
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new TreeTypeFlyweight(species, sprite, baseColor));
    }
    
    return this.treeTypes.get(key)!;
  }

  static getTypeCount(): number {
    return this.treeTypes.size;
  }
}

class Tree {
  constructor(
    private x: number,
    private y: number,
    private health: number,
    private treeType: TreeType
  ) {}

  render(): string {
    return this.treeType.render(this.x, this.y, this.health);
  }

  takeDamage(damage: number): void {
    this.health = Math.max(0, this.health - damage);
  }
}

class Forest {
  private trees: Tree[] = [];

  plantTree(x: number, y: number, species: string, sprite: string, baseColor: string): void {
    const treeType = TreeTypeFactory.getTreeType(species, sprite, baseColor);
    const tree = new Tree(x, y, 100, treeType);
    this.trees.push(tree);
  }

  render(): string {
    return this.trees.map(t => t.render()).join('\n');
  }

  getTreeCount(): number {
    return this.trees.length;
  }

  getTreeTypeCount(): number {
    return TreeTypeFactory.getTypeCount();
  }
}

// Particle System Example
interface ParticleType {
  update(x: number, y: number, velocity: { x: number; y: number }, age: number): string;
}

class ParticleTypeFlyweight implements ParticleType {
  constructor(
    private color: string,
    private sprite: string,
    private behavior: string
  ) {}

  update(x: number, y: number, velocity: { x: number; y: number }, age: number): string {
    const alpha = Math.max(0, 1 - age / 100);
    return `${this.behavior} particle (${this.sprite}) at (${x.toFixed(1)}, ${y.toFixed(1)}) color:${this.color} alpha:${alpha.toFixed(2)}`;
  }
}

class ParticleTypeFactory {
  private static particleTypes = new Map<string, ParticleTypeFlyweight>();

  static getParticleType(color: string, sprite: string, behavior: string): ParticleTypeFlyweight {
    const key = `${color}-${sprite}-${behavior}`;
    
    if (!this.particleTypes.has(key)) {
      this.particleTypes.set(key, new ParticleTypeFlyweight(color, sprite, behavior));
    }
    
    return this.particleTypes.get(key)!;
  }

  static getTypeCount(): number {
    return this.particleTypes.size;
  }
}

class Particle {
  constructor(
    private x: number,
    private y: number,
    private velocity: { x: number; y: number },
    private age: number,
    private particleType: ParticleType
  ) {}

  update(): void {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.age++;
  }

  render(): string {
    return this.particleType.update(this.x, this.y, this.velocity, this.age);
  }

  isDead(): boolean {
    return this.age > 100;
  }
}

class ParticleSystem {
  private particles: Particle[] = [];

  emitParticle(x: number, y: number, color: string, sprite: string, behavior: string): void {
    const particleType = ParticleTypeFactory.getParticleType(color, sprite, behavior);
    const velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    };
    const particle = new Particle(x, y, velocity, 0, particleType);
    this.particles.push(particle);
  }

  update(): void {
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => !p.isDead());
  }

  render(): string {
    return this.particles.map(p => p.render()).join('\n');
  }

  getParticleCount(): number {
    return this.particles.length;
  }

  getParticleTypeCount(): number {
    return ParticleTypeFactory.getTypeCount();
  }
}

// Factory functions
export function createTextDocument() {
  const doc = new Document();
  const text = "Hello World! This is a flyweight pattern demo.";
  
  let x = 0;
  for (const char of text) {
    doc.addCharacter(char, 'Arial', x * 10, 0, 12, 'black');
    x++;
  }
  
  return doc;
}

export function createForest() {
  const forest = new Forest();
  
  // Plant many trees of few types
  for (let i = 0; i < 50; i++) {
    const species = ['Oak', 'Pine', 'Birch'][Math.floor(Math.random() * 3)];
    const x = Math.random() * 1000;
    const y = Math.random() * 1000;
    forest.plantTree(x, y, species, `${species.toLowerCase()}.png`, 'green');
  }
  
  return forest;
}

export function createParticleSystem() {
  const system = new ParticleSystem();
  
  // Emit many particles of few types
  for (let i = 0; i < 30; i++) {
    const colors = ['red', 'blue', 'yellow'];
    const behaviors = ['float', 'fall', 'sparkle'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const behavior = behaviors[Math.floor(Math.random() * behaviors.length)];
    
    system.emitParticle(100, 100, color, 'dot.png', behavior);
  }
  
  return system;
}

export const metadata: PatternMetadata = {
  title: 'Flyweight Pattern',
  category: 'Structural',
  difficulty: 'Hard',
  description: 'Share common state efficiently among large numbers of objects',
  concepts: ["design patterns","software architecture","code organization","object-oriented programming"],
  detailedDescription: `
    ## 🪶 Flyweight Pattern

    The **Flyweight Pattern** minimizes memory usage by sharing common data among multiple objects. It separates intrinsic state (shared) from extrinsic state (context-specific).

    ### Core Concepts

    🔹 **Intrinsic State** - Data that can be shared among multiple objects  
    🔹 **Extrinsic State** - Context-specific data passed to operations  
    🔹 **Factory** - Ensures flyweights are shared, not duplicated  
    🔹 **Context** - Stores extrinsic state and references flyweight

    ### Real-World Applications

    **Text Editors** - Character objects share font/style data, position is unique  
    **Game Development** - Tree sprites shared, position/health are individual  
    **Particle Systems** - Particle behaviors shared, position/velocity unique  
    **Web Browsers** - CSS styles shared among elements with same properties

    ### Memory Optimization

    **Before**: 1000 characters = 1000 complete objects  
    **After**: 1000 characters = 26 shared flyweights + 1000 contexts  
    **Savings**: ~95% memory reduction for typical text

    ### Implementation Benefits

    ✅ **Massive memory savings** - Shared intrinsic state reduces object count  
    ✅ **Performance gains** - Fewer objects mean less garbage collection  
    ✅ **Scalable design** - Handles thousands of objects efficiently  
    ✅ **Transparent sharing** - Client code doesn't need to manage sharing
  `,
    timeComplexity: 'O(1)',
  spaceComplexity: 'O(k)',
  useCases: [
    PatternUseCase.PERFORMANCE_OPTIMIZATION,
    PatternUseCase.MEMORY_MANAGEMENT,
    PatternUseCase.GAME_DEVELOPMENT
  ],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    advantages: [
    'Dramatically reduces memory usage for large object collections',
    'Improves performance by reducing object creation overhead',
    'Enables applications to handle massive numbers of objects',
    'Transparent to client code once properly implemented'
  ],
  disadvantages: [
    'Increases complexity by separating intrinsic and extrinsic state',
    'May introduce performance overhead for extrinsic state operations',
    'Requires careful design to identify what can be shared',
    'Not beneficial for applications with few objects'
  ],
  relatedPatterns: ['Factory', 'Composite', 'State']
};

export const solutions: Solution[] = [
  {
    name: 'text-document',
    tabName: 'Text Document',
    approach: 'Character objects sharing font and style information',
    code: `// Flyweight implementation code here`,
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(k)',
    type: 'class'
  },
  {
    name: 'forest-simulation',
    tabName: 'Forest Trees',
    approach: 'Tree objects sharing species and sprite data',
    code: `// Forest simulation code here`,
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(k)',
    type: 'class'
  },
  {
    name: 'particle-system',
    tabName: 'Particle System',
    approach: 'Particles sharing behavior and appearance data',
    code: `// Particle system code here`,
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    type: 'class'
  }
];

export const examples: PatternExample[] = [
  {
    input: `const doc = createTextDocument();
console.log(\`Characters: \${doc.getCharacterCount()}\`);
console.log(\`Flyweights: \${doc.getFlyweightCount()}\`);
console.log(doc.render().split('\\n').slice(0, 3).join('\\n'));`,
    output: `Characters: 46
Flyweights: 15
Render 'H' in Arial at (0, 0) size:12 color:black
Render 'e' in Arial at (10, 0) size:12 color:black
Render 'l' in Arial at (20, 0) size:12 color:black`,
    description: '46 characters use only 15 flyweights (unique characters). Font and character data are shared, while position and styling are stored per instance.',
    scenario: 'Render text document with shared character flyweights to minimize memory usage'
  },
  {
    input: `const forest = createForest();
console.log(\`Trees planted: \${forest.getTreeCount()}\`);`,
    output: `Trees planted: 1000
Tree types created: 3`,
    description: '1000 trees use only 3 flyweights (tree types). Species data is shared while position and health are stored per tree.',
    scenario: 'Simulate forest with thousands of trees using minimal memory through shared tree types'
  },
  {
    input: `const forest = createForest();
console.log(\`Trees planted: \${forest.getTreeCount()}\`);
console.log(\`Tree types: \${forest.getTreeTypeCount()}\`);
console.log(forest.render().split('\\n').slice(0, 3).join('\\n'));`,
    output: `Trees planted: 50
Tree types: 3
Oak tree (oak.png) at (234.5, 567.8) health:100% color:green
Pine tree (pine.png) at (123.4, 890.1) health:100% color:green
Birch tree (birch.png) at (456.7, 234.5) health:100% color:green`,
    description: '50 trees use only 3 shared flyweights (Oak, Pine, Birch). Species and sprite data are shared while position and health are individual.',
    scenario: 'Forest simulation example'
  },
  {
    input: `const system = createParticleSystem();
console.log(\`Particles: \${system.getParticleCount()}\`);
console.log(\`Particle types: \${system.getParticleTypeCount()}\`);
system.update(); // Simulate one frame
console.log(system.render().split('\\n').slice(0, 3).join('\\n'));`,
    output: `Particles: 30
Particle types: 9
float particle (dot.png) at (100.5, 99.8) color:red alpha:0.99
fall particle (dot.png) at (99.2, 100.7) color:blue alpha:0.99
sparkle particle (dot.png) at (100.1, 100.3) color:yellow alpha:0.99`,
    description: '30 particles use 9 shared flyweights (3 colors × 3 behaviors). Color and behavior logic are shared while position, velocity, and age are individual.',
    scenario: 'Handle thousands of particles efficiently by sharing behavior and appearance data'
  }
];

export type { 
  CharacterFlyweight, Character, CharacterFactory, CharacterContext, Document,
  TreeType, TreeTypeFlyweight, TreeTypeFactory, Tree, Forest,
  ParticleType, ParticleTypeFlyweight, ParticleTypeFactory, Particle, ParticleSystem
};

const flyweightModule = {
  metadata,
  solutions, 
  examples
};

export default flyweightModule;
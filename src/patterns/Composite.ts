import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

// Component interface
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
  display(indent?: string): string;
}

// Leaf - File
class File implements FileSystemComponent {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  display(indent = ''): string {
    return `${indent}📄 ${this.name} (${this.size}KB)`;
  }
}

// Composite - Folder
class Folder implements FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }

  add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  remove(component: FileSystemComponent): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  display(indent = ''): string {
    let result = `${indent}📁 ${this.name}/ (${this.getSize()}KB total)`;
    for (const child of this.children) {
      result += '\n' + child.display(indent + '  ');
    }
    return result;
  }

  getChildren(): FileSystemComponent[] {
    return [...this.children];
  }
}

// UI Component Tree Example
interface UIComponent {
  render(): string;
  getType(): string;
}

class Button implements UIComponent {
  constructor(private text: string) {}

  render(): string {
    return `<button>${this.text}</button>`;
  }

  getType(): string {
    return 'Button';
  }
}

class Container implements UIComponent {
  private components: UIComponent[] = [];

  constructor(private tag: string) {}

  add(component: UIComponent): void {
    this.components.push(component);
  }

  render(): string {
    const content = this.components.map(c => c.render()).join('');
    return `<${this.tag}>${content}</${this.tag}>`;
  }

  getType(): string {
    return 'Container';
  }
}

// Factory functions for different implementations
export function createFileSystem() {
  const root = new Folder('project');
  const src = new Folder('src');
  const components = new Folder('components');
  
  components.add(new File('Button.tsx', 2));
  components.add(new File('Input.tsx', 1.5));
  
  src.add(components);
  src.add(new File('index.ts', 0.5));
  
  root.add(src);
  root.add(new File('package.json', 1));
  root.add(new File('README.md', 2));
  
  return root;
}

export function createUITree() {
  const app = new Container('div');
  const header = new Container('header');
  const main = new Container('main');
  
  header.add(new Button('Home'));
  header.add(new Button('About'));
  
  main.add(new Container('section'));
  
  app.add(header);
  app.add(main);
  
  return app;
}

// Expression Tree for mathematical operations
abstract class Expression {
  abstract evaluate(): number;
  abstract toString(): string;
}

class Number extends Expression {
  constructor(private value: number) {
    super();
  }

  evaluate(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}

class BinaryOperation extends Expression {
  constructor(
    private left: Expression,
    private operator: string,
    private right: Expression
  ) {
    super();
  }

  evaluate(): number {
    const leftVal = this.left.evaluate();
    const rightVal = this.right.evaluate();
    
    switch (this.operator) {
      case '+': return leftVal + rightVal;
      case '-': return leftVal - rightVal;
      case '*': return leftVal * rightVal;
      case '/': return leftVal / rightVal;
      default: throw new Error(`Unknown operator: ${this.operator}`);
    }
  }

  toString(): string {
    return `(${this.left.toString()} ${this.operator} ${this.right.toString()})`;
  }
}

export function createExpressionTree() {
  // Creates: (3 + 4) * (2 - 1)
  const left = new BinaryOperation(new Number(3), '+', new Number(4));
  const right = new BinaryOperation(new Number(2), '-', new Number(1));
  return new BinaryOperation(left, '*', right);
}

export const metadata: PatternMetadata = {
  title: 'Composite Pattern',
  category: 'Structural',
  difficulty: 'Medium',
  description: 'Compose objects into tree structures to represent part-whole hierarchies',
  detailedDescription: `
    ## 🌳 Composite Pattern

    The **Composite Pattern** allows you to compose objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.

    ### Core Concepts

    🔹 **Component Interface** - Common interface for all objects in the tree  
    🔹 **Leaf** - Individual objects with no children  
    🔹 **Composite** - Objects that can contain other components  
    🔹 **Uniform Treatment** - Same operations work on both leaves and composites

    ### Real-World Applications

    **File Systems** - Files and folders both support operations like size calculation  
    **UI Components** - Individual elements and containers both render content  
    **Expression Trees** - Numbers and operations both evaluate to values  
    **Organization Charts** - Employees and departments both have hierarchical operations

    ### Implementation Benefits

    ✅ **Simplifies client code** - Same interface for simple and complex objects  
    ✅ **Easy to add new components** - Just implement the component interface  
    ✅ **Recursive operations** - Operations naturally work on entire trees  
    ✅ **Flexible structure** - Can build complex hierarchies dynamically
  `,
  useCases: [
    PatternUseCase.CODE_ORGANIZATION,
    PatternUseCase.API_DESIGN,
    PatternUseCase.UI_ARCHITECTURE
  ],
  advantages: [
    'Uniform interface for simple and complex objects',
    'Easy to add new component types',
    'Simplifies client code that works with tree structures',
    'Recursive operations work naturally on the entire tree'
  ],
  disadvantages: [
    'Can make design overly general',
    'Difficult to restrict component types in composite',
    'May require runtime type checking for specific operations'
  ],
  relatedPatterns: ['Iterator', 'Visitor', 'Decorator']
};

export const solutions: SolutionMetadata[] = [
  {
    name: 'file-system',
    title: 'File System Hierarchy',
    description: 'Files and folders with size calculation and display',
    isOptimal: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    difficulty: 'Medium'
  },
  {
    name: 'ui-components',
    title: 'UI Component Tree',
    description: 'Buttons and containers with rendering capability',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    difficulty: 'Medium'
  },
  {
    name: 'expression-tree',
    title: 'Mathematical Expressions',
    description: 'Numbers and operations forming evaluable expressions',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    difficulty: 'Hard'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'File System Operations',
    scenario: 'Calculate total size of a project directory with nested folders and files',
    inputExample: `const project = createFileSystem();
console.log(project.display());
console.log(\`Total size: \${project.getSize()}KB\`);`,
    outputExample: `📁 project/ (7KB total)
  📁 src/ (4KB total)
    📁 components/ (3.5KB total)
      📄 Button.tsx (2KB)
      📄 Input.tsx (1.5KB)
    📄 index.ts (0.5KB)
  📄 package.json (1KB)
  📄 README.md (2KB)
Total size: 7KB`,
    explanation: 'Both files and folders implement the same interface, allowing uniform size calculation and display operations across the entire tree structure.'
  },
  {
    title: 'UI Component Rendering',
    scenario: 'Render a complex UI structure with nested containers and components',
    inputExample: `const app = createUITree();
console.log(app.render());`,
    outputExample: `<div><header><button>Home</button><button>About</button></header><main><section></section></main></div>`,
    explanation: 'Individual UI elements and containers both implement the render method, allowing the same operation to work recursively on the entire UI tree.'
  },
  {
    title: 'Expression Evaluation',
    scenario: 'Build and evaluate mathematical expressions as tree structures',
    inputExample: `const expr = createExpressionTree();
console.log(\`Expression: \${expr.toString()}\`);
console.log(\`Result: \${expr.evaluate()}\`);`,
    outputExample: `Expression: ((3 + 4) * (2 - 1))
Result: 7`,
    explanation: 'Numbers and operations both implement evaluate(), enabling complex mathematical expressions to be built as trees and evaluated recursively.'
  }
];

export { File, Folder, Button, Container, Expression, Number as NumberExpression, BinaryOperation };
import { PatternMetadata, PatternExample, Solution, PatternUseCase } from '@/interfaces/patterns';

// Element interface
interface Shape {
  accept(visitor: ShapeVisitor): string;
}

// Visitor interface
interface ShapeVisitor {
  visitCircle(circle: Circle): string;
  visitRectangle(rectangle: Rectangle): string;
  visitTriangle(triangle: Triangle): string;
}

// Concrete Elements
class Circle implements Shape {
  constructor(public radius: number) {}

  accept(visitor: ShapeVisitor): string {
    return visitor.visitCircle(this);
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  accept(visitor: ShapeVisitor): string {
    return visitor.visitRectangle(this);
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Triangle implements Shape {
  constructor(public base: number, public height: number) {}

  accept(visitor: ShapeVisitor): string {
    return visitor.visitTriangle(this);
  }

  getArea(): number {
    return 0.5 * this.base * this.height;
  }
}

// Concrete Visitors
class AreaCalculator implements ShapeVisitor {
  visitCircle(circle: Circle): string {
    const area = Math.PI * circle.radius * circle.radius;
    return `Circle area: ${area.toFixed(2)}`;
  }

  visitRectangle(rectangle: Rectangle): string {
    const area = rectangle.width * rectangle.height;
    return `Rectangle area: ${area}`;
  }

  visitTriangle(triangle: Triangle): string {
    const area = 0.5 * triangle.base * triangle.height;
    return `Triangle area: ${area}`;
  }
}

class PerimeterCalculator implements ShapeVisitor {
  visitCircle(circle: Circle): string {
    const perimeter = 2 * Math.PI * circle.radius;
    return `Circle perimeter: ${perimeter.toFixed(2)}`;
  }

  visitRectangle(rectangle: Rectangle): string {
    const perimeter = 2 * (rectangle.width + rectangle.height);
    return `Rectangle perimeter: ${perimeter}`;
  }

  visitTriangle(triangle: Triangle): string {
    // Assuming equilateral triangle for simplicity
    const side = Math.sqrt((triangle.base / 2) ** 2 + triangle.height ** 2);
    const perimeter = triangle.base + 2 * side;
    return `Triangle perimeter: ${perimeter.toFixed(2)}`;
  }
}

class SVGRenderer implements ShapeVisitor {
  visitCircle(circle: Circle): string {
    return `<circle r="${circle.radius}" cx="0" cy="0" />`;
  }

  visitRectangle(rectangle: Rectangle): string {
    return `<rect width="${rectangle.width}" height="${rectangle.height}" x="0" y="0" />`;
  }

  visitTriangle(triangle: Triangle): string {
    const x1 = 0, y1 = triangle.height;
    const x2 = triangle.base / 2, y2 = 0;
    const x3 = triangle.base, y3 = triangle.height;
    return `<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3}" />`;
  }
}

// File System Example
interface FileSystemItem {
  accept(visitor: FileSystemVisitor): string;
  getName(): string;
}

interface FileSystemVisitor {
  visitFile(file: File): string;
  visitDirectory(directory: Directory): string;
  visitSymlink(symlink: Symlink): string;
}

class File implements FileSystemItem {
  constructor(private name: string, private size: number, private extension: string) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  getExtension(): string {
    return this.extension;
  }

  accept(visitor: FileSystemVisitor): string {
    return visitor.visitFile(this);
  }
}

class Directory implements FileSystemItem {
  private items: FileSystemItem[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  addItem(item: FileSystemItem): void {
    this.items.push(item);
  }

  getItems(): FileSystemItem[] {
    return [...this.items];
  }

  accept(visitor: FileSystemVisitor): string {
    return visitor.visitDirectory(this);
  }
}

class Symlink implements FileSystemItem {
  constructor(private name: string, private target: string) {}

  getName(): string {
    return this.name;
  }

  getTarget(): string {
    return this.target;
  }

  accept(visitor: FileSystemVisitor): string {
    return visitor.visitSymlink(this);
  }
}

class SizeCalculator implements FileSystemVisitor {
  visitFile(file: File): string {
    return `${file.getName()}: ${file.getSize()}KB`;
  }

  visitDirectory(directory: Directory): string {
    const items = directory.getItems();
    const totalSize = items.reduce((sum, item) => {
      if (item instanceof File) {
        return sum + item.getSize();
      }
      return sum; // Directories and symlinks don't add to size in this simple example
    }, 0);
    
    return `${directory.getName()}/: ${totalSize}KB (${items.length} items)`;
  }

  visitSymlink(symlink: Symlink): string {
    return `${symlink.getName()} -> ${symlink.getTarget()}: 0KB (symlink)`;
  }
}

class SecurityScanner implements FileSystemVisitor {
  visitFile(file: File): string {
    const dangerousExtensions = ['.exe', '.bat', '.sh', '.ps1'];
    const isDangerous = dangerousExtensions.includes(file.getExtension());
    const status = isDangerous ? '⚠️  DANGEROUS' : '✅ Safe';
    return `${file.getName()}: ${status}`;
  }

  visitDirectory(directory: Directory): string {
    const items = directory.getItems();
    let dangerousCount = 0;
    
    for (const item of items) {
      if (item instanceof File) {
        const dangerousExtensions = ['.exe', '.bat', '.sh', '.ps1'];
        if (dangerousExtensions.includes(item.getExtension())) {
          dangerousCount++;
        }
      }
    }
    
    const status = dangerousCount > 0 ? `⚠️  ${dangerousCount} dangerous files` : '✅ Clean';
    return `${directory.getName()}/: ${status}`;
  }

  visitSymlink(symlink: Symlink): string {
    return `${symlink.getName()} -> ${symlink.getTarget()}: ⚠️  Potential security risk`;
  }
}

// AST Example
interface ASTNode {
  accept(visitor: ASTVisitor): string;
}

interface ASTVisitor {
  visitNumber(node: NumberNode): string;
  visitBinaryOp(node: BinaryOpNode): string;
  visitVariable(node: VariableNode): string;
}

class NumberNode implements ASTNode {
  constructor(public value: number) {}

  accept(visitor: ASTVisitor): string {
    return visitor.visitNumber(this);
  }
}

class BinaryOpNode implements ASTNode {
  constructor(
    public left: ASTNode,
    public operator: string,
    public right: ASTNode
  ) {}

  accept(visitor: ASTVisitor): string {
    return visitor.visitBinaryOp(this);
  }
}

class VariableNode implements ASTNode {
  constructor(public name: string) {}

  accept(visitor: ASTVisitor): string {
    return visitor.visitVariable(this);
  }
}

class CodeGenerator implements ASTVisitor {
  visitNumber(node: NumberNode): string {
    return node.value.toString();
  }

  visitBinaryOp(node: BinaryOpNode): string {
    const left = node.left.accept(this);
    const right = node.right.accept(this);
    return `(${left} ${node.operator} ${right})`;
  }

  visitVariable(node: VariableNode): string {
    return node.name;
  }
}

class Evaluator implements ASTVisitor {
  constructor(private variables: Record<string, number> = {}) {}

  visitNumber(node: NumberNode): string {
    return node.value.toString();
  }

  visitBinaryOp(node: BinaryOpNode): string {
    const left = parseFloat(node.left.accept(this));
    const right = parseFloat(node.right.accept(this));
    
    let result: number;
    switch (node.operator) {
      case '+': result = left + right; break;
      case '-': result = left - right; break;
      case '*': result = left * right; break;
      case '/': result = left / right; break;
      default: throw new Error(`Unknown operator: ${node.operator}`);
    }
    
    return result.toString();
  }

  visitVariable(node: VariableNode): string {
    const value = this.variables[node.name];
    if (value === undefined) {
      throw new Error(`Unknown variable: ${node.name}`);
    }
    return value.toString();
  }
}

// Factory functions
function createShapeCollection() {
  const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(10, 8),
    new Triangle(6, 4)
  ];
  
  const visitors = {
    area: new AreaCalculator(),
    perimeter: new PerimeterCalculator(),
    svg: new SVGRenderer()
  };
  
  return { shapes, visitors };
}

function createFileSystem() {
  const root = new Directory('project');
  const src = new Directory('src');
  const docs = new Directory('docs');
  
  src.addItem(new File('index.js', 5, '.js'));
  src.addItem(new File('config.json', 2, '.json'));
  src.addItem(new File('script.sh', 1, '.sh'));
  
  docs.addItem(new File('README.md', 3, '.md'));
  docs.addItem(new Symlink('manual.pdf', '/usr/share/docs/manual.pdf'));
  
  root.addItem(src);
  root.addItem(docs);
  root.addItem(new File('package.json', 1, '.json'));
  
  const visitors = {
    size: new SizeCalculator(),
    security: new SecurityScanner()
  };
  
  return { root, visitors };
}

function createAST() {
  // Represents: (3 + x) * (2 - 1)
  const ast = new BinaryOpNode(
    new BinaryOpNode(new NumberNode(3), '+', new VariableNode('x')),
    '*',
    new BinaryOpNode(new NumberNode(2), '-', new NumberNode(1))
  );
  
  const visitors = {
    codegen: new CodeGenerator(),
    evaluator: new Evaluator({ x: 5 })
  };
  
  return { ast, visitors };
}

export const metadata: PatternMetadata = {
  title: 'Visitor Pattern',
  category: 'Behavioral',
  difficulty: 'Hard',
  timeComplexity: 'O(n) - visits each element once',
  spaceComplexity: 'O(h) - recursion depth for tree structures',
  description: 'Separate algorithms from objects they operate on',
  concepts: ["design patterns","software architecture","code organization","object-oriented programming"],
  detailedDescription: `
    ## 👋 Visitor Pattern

    The **Visitor Pattern** separates algorithms from the objects on which they operate. It lets you define new operations without changing the classes of elements on which they operate.

    ### Core Concepts

    🔹 **Visitor Interface** - Declares visit methods for each element type  
    🔹 **Concrete Visitors** - Implement specific operations on elements  
    🔹 **Element Interface** - Declares accept method that takes visitor  
    🔹 **Double Dispatch** - Method calls depend on both visitor and element types

    ### Real-World Applications

    **Compilers** - AST traversal for code generation, optimization, type checking  
    **File Systems** - Operations on files/directories (size calculation, security scanning)  
    **Document Processing** - Export to different formats (HTML, PDF, XML)  
    **Game Engines** - Operations on game objects (rendering, collision, AI)

    ### Double Dispatch Magic

    **Single Dispatch** - Method chosen based on receiver type only  
    **Double Dispatch** - Method chosen based on both visitor and element types  
    **Result** - Visitor pattern enables operation-specific behavior per element type

    ### Implementation Benefits

    ✅ **Open/Closed Principle** - Easy to add new operations without modifying elements  
    ✅ **Single Responsibility** - Operations grouped by visitor, not scattered across elements  
    ✅ **Centralized Operations** - Related operations live in same visitor class  
    ✅ **Type Safety** - Compile-time verification of visitor-element compatibility
  `,
  useCases: [
    PatternUseCase.COMPILER_DESIGN,
    PatternUseCase.DATA_PROCESSING,
    PatternUseCase.CODE_ANALYSIS
  ],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
  advantages: [
    'Easy to add new operations without changing element classes',
    'Groups related operations in visitor classes',
    'Can accumulate state during traversal',
    'Works well with composite structures'
  ],
  disadvantages: [
    'Hard to add new element types (breaks all visitors)',
    'Violates encapsulation by exposing element internals',
    'Complex double dispatch mechanism',
    'Circular dependencies between visitors and elements'
  ],
  relatedPatterns: ['Composite', 'Interpreter', 'Iterator']
};

export const solutions: Solution[] = [
  {
    name: 'shape-operations',
    tabName: 'Shape Operations',
    approach: 'Multiple operations on geometric shapes',
    code: `// Visitor pattern for shape operations
interface Shape {
  accept(visitor: ShapeVisitor): string;
}

interface ShapeVisitor {
  visitCircle(circle: Circle): string;
  visitRectangle(rectangle: Rectangle): string;
  visitTriangle(triangle: Triangle): string;
}

class Circle implements Shape {
  constructor(public radius: number) {}

  accept(visitor: ShapeVisitor): string {
    return visitor.visitCircle(this);
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  accept(visitor: ShapeVisitor): string {
    return visitor.visitRectangle(this);
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class AreaCalculator implements ShapeVisitor {
  visitCircle(circle: Circle): string {
    const area = Math.PI * circle.radius * circle.radius;
    return \`Circle area: \${area.toFixed(2)}\`;
  }

  visitRectangle(rectangle: Rectangle): string {
    const area = rectangle.width * rectangle.height;
    return \`Rectangle area: \${area}\`;
  }

  visitTriangle(triangle: Triangle): string {
    const area = 0.5 * triangle.base * triangle.height;
    return \`Triangle area: \${area}\`;
  }
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    isOptimal: true,
    type: 'class'
  },
  {
    name: 'file-system',
    tabName: 'File System Analysis',
    approach: 'Size calculation and security scanning on files',
    code: `// File system visitor pattern
interface FileSystemItem {
  accept(visitor: FileSystemVisitor): string;
  getName(): string;
}

interface FileSystemVisitor {
  visitFile(file: File): string;
  visitDirectory(directory: Directory): string;
  visitSymlink(symlink: Symlink): string;
}

class File implements FileSystemItem {
  constructor(private name: string, private size: number, private extension: string) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  getExtension(): string {
    return this.extension;
  }

  accept(visitor: FileSystemVisitor): string {
    return visitor.visitFile(this);
  }
}

class SizeCalculator implements FileSystemVisitor {
  visitFile(file: File): string {
    return \`\${file.getName()}: \${file.getSize()}KB\`;
  }

  visitDirectory(directory: Directory): string {
    const items = directory.getItems();
    const totalSize = items.reduce((sum, item) => {
      if (item instanceof File) {
        return sum + item.getSize();
      }
      return sum;
    }, 0);
    
    return \`\${directory.getName()}/: \${totalSize}KB (\${items.length} items)\`;
  }

  visitSymlink(symlink: Symlink): string {
    return \`\${symlink.getName()} -> \${symlink.getTarget()}: 0KB (symlink)\`;
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    isOptimal: false,
    type: 'class'
  },
  {
    name: 'ast-processing',
    tabName: 'AST Processing',
    approach: 'Code generation and evaluation on expression trees',
    code: `// AST visitor pattern
interface ASTNode {
  accept(visitor: ASTVisitor): string;
}

interface ASTVisitor {
  visitNumber(node: NumberNode): string;
  visitBinaryOp(node: BinaryOpNode): string;
  visitVariable(node: VariableNode): string;
}

class NumberNode implements ASTNode {
  constructor(public value: number) {}

  accept(visitor: ASTVisitor): string {
    return visitor.visitNumber(this);
  }
}

class BinaryOpNode implements ASTNode {
  constructor(
    public left: ASTNode,
    public operator: string,
    public right: ASTNode
  ) {}

  accept(visitor: ASTVisitor): string {
    return visitor.visitBinaryOp(this);
  }
}

class CodeGenerator implements ASTVisitor {
  visitNumber(node: NumberNode): string {
    return node.value.toString();
  }

  visitBinaryOp(node: BinaryOpNode): string {
    const left = node.left.accept(this);
    const right = node.right.accept(this);
    return \`(\${left} \${node.operator} \${right})\`;
  }

  visitVariable(node: VariableNode): string {
    return node.name;
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    isOptimal: false,
    type: 'class'
  }
];

export const examples: PatternExample[] = [
  {
    input: 'createShapeCollection()',
    output: 'Shape operations executed',
    description: 'Multi-Operation Shape Processing',
    scenario: 'Perform different calculations and rendering operations on geometric shapes without modifying shape classes'
  },
  {
    input: 'createFileSystem()',
    output: 'File system analyzed',
    description: 'File System Analysis',
    scenario: 'Analyze file system structure with size calculation and security scanning using visitor pattern'
  },
  {
    input: 'createAST()',
    output: 'Code generated and evaluated',
    description: 'AST Processing',
    scenario: 'Process abstract syntax tree for both code generation and mathematical evaluation with same structure'
  }
];

// Export classes for actual use
export { 
  Circle, Rectangle, Triangle,
  AreaCalculator, PerimeterCalculator, SVGRenderer,
  File, Directory, Symlink,
  SizeCalculator, SecurityScanner,
  NumberNode, BinaryOpNode, VariableNode,
  CodeGenerator, Evaluator,
  createShapeCollection, createFileSystem, createAST
};

// Export types for TypeScript
export type { 
  Shape, ShapeVisitor,
  FileSystemItem, FileSystemVisitor,
  ASTNode, ASTVisitor
};
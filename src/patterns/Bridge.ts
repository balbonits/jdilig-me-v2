import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

// Implementation interface - the "bridge"
interface DrawingAPI {
  drawCircle(x: number, y: number, radius: number): string;
  drawRectangle(x: number, y: number, width: number, height: number): string;
}

// Concrete implementations
class SVGRenderer implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): string {
    return `<circle cx="${x}" cy="${y}" r="${radius}" />`;
  }

  drawRectangle(x: number, y: number, width: number, height: number): string {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" />`;
  }
}

class CanvasRenderer implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): string {
    return `ctx.arc(${x}, ${y}, ${radius}, 0, 2 * Math.PI);`;
  }

  drawRectangle(x: number, y: number, width: number, height: number): string {
    return `ctx.rect(${x}, ${y}, ${width}, ${height});`;
  }
}

class ConsoleRenderer implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): string {
    return `Circle at (${x}, ${y}) with radius ${radius}`;
  }

  drawRectangle(x: number, y: number, width: number, height: number): string {
    return `Rectangle at (${x}, ${y}) with size ${width}x${height}`;
  }
}

// Abstraction
abstract class Shape {
  protected renderer: DrawingAPI;

  constructor(renderer: DrawingAPI) {
    this.renderer = renderer;
  }

  abstract draw(): string;
  
  // Allow changing implementation at runtime
  setRenderer(renderer: DrawingAPI): void {
    this.renderer = renderer;
  }
}

// Refined abstractions
class Circle extends Shape {
  constructor(
    renderer: DrawingAPI,
    private x: number,
    private y: number,
    private radius: number
  ) {
    super(renderer);
  }

  draw(): string {
    return this.renderer.drawCircle(this.x, this.y, this.radius);
  }

  resize(factor: number): void {
    this.radius *= factor;
  }
}

class Rectangle extends Shape {
  constructor(
    renderer: DrawingAPI,
    private x: number,
    private y: number,
    private width: number,
    private height: number
  ) {
    super(renderer);
  }

  draw(): string {
    return this.renderer.drawRectangle(this.x, this.y, this.width, this.height);
  }

  resize(widthFactor: number, heightFactor: number): void {
    this.width *= widthFactor;
    this.height *= heightFactor;
  }
}

// Message Bridge Example
interface MessageSender {
  send(message: string, recipient: string): string;
}

class EmailSender implements MessageSender {
  send(message: string, recipient: string): string {
    return `Email to ${recipient}: ${message}`;
  }
}

class SMSSender implements MessageSender {
  send(message: string, recipient: string): string {
    return `SMS to ${recipient}: ${message}`;
  }
}

class SlackSender implements MessageSender {
  send(message: string, recipient: string): string {
    return `Slack to ${recipient}: ${message}`;
  }
}

abstract class Message {
  protected sender: MessageSender;

  constructor(sender: MessageSender) {
    this.sender = sender;
  }

  abstract send(recipient: string): string;
}

class TextMessage extends Message {
  constructor(sender: MessageSender, private content: string) {
    super(sender);
  }

  send(recipient: string): string {
    return this.sender.send(this.content, recipient);
  }
}

class EncryptedMessage extends Message {
  constructor(sender: MessageSender, private content: string) {
    super(sender);
  }

  send(recipient: string): string {
    const encrypted = `🔒${this.content.split('').reverse().join('')}🔒`;
    return this.sender.send(encrypted, recipient);
  }
}

// Database Bridge Example
interface Database {
  query(sql: string): string;
  insert(table: string, data: Record<string, unknown>): string;
}

class MySQL implements Database {
  query(sql: string): string {
    return `MySQL: ${sql}`;
  }

  insert(table: string, data: Record<string, unknown>): string {
    const values = Object.values(data).map(v => `'${v}'`).join(', ');
    return `MySQL: INSERT INTO ${table} VALUES (${values})`;
  }
}

class PostgreSQL implements Database {
  query(sql: string): string {
    return `PostgreSQL: ${sql}`;
  }

  insert(table: string, data: Record<string, unknown>): string {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map(v => `'${v}'`).join(', ');
    return `PostgreSQL: INSERT INTO ${table} (${columns}) VALUES (${values})`;
  }
}

class Repository {
  constructor(private db: Database) {}

  findUser(id: number): string {
    return this.db.query(`SELECT * FROM users WHERE id = ${id}`);
  }

  createUser(name: string, email: string): string {
    return this.db.insert('users', { name, email });
  }

  setDatabase(db: Database): void {
    this.db = db;
  }
}

// Factory functions
export function createShapeRenderer() {
  const svgRenderer = new SVGRenderer();
  const canvasRenderer = new CanvasRenderer();
  const consoleRenderer = new ConsoleRenderer();

  const circle = new Circle(svgRenderer, 100, 100, 50);
  const rectangle = new Rectangle(canvasRenderer, 0, 0, 200, 100);

  return { circle, rectangle, svgRenderer, canvasRenderer, consoleRenderer };
}

export function createMessagingSystem() {
  const emailSender = new EmailSender();
  const smsSender = new SMSSender();
  const slackSender = new SlackSender();

  const textMessage = new TextMessage(emailSender, 'Hello World');
  const encryptedMessage = new EncryptedMessage(smsSender, 'Secret Info');

  return { textMessage, encryptedMessage, emailSender, smsSender, slackSender };
}

export function createDatabaseRepository() {
  const mysql = new MySQL();
  const postgres = new PostgreSQL();
  const repository = new Repository(mysql);

  return { repository, mysql, postgres };
}

export const metadata: PatternMetadata = {
  title: 'Bridge Pattern',
  category: 'Structural',
  difficulty: 'Hard',
  description: 'Separate abstraction from implementation to vary them independently',
  detailedDescription: `
    ## 🌉 Bridge Pattern

    The **Bridge Pattern** decouples an abstraction from its implementation so that both can vary independently. It creates a "bridge" between the abstraction and implementation hierarchies.

    ### Core Concepts

    🔹 **Abstraction** - High-level interface that clients use  
    🔹 **Implementation** - Low-level interface for concrete operations  
    🔹 **Bridge** - Connection that allows abstraction to use any implementation  
    🔹 **Independence** - Both sides can evolve separately

    ### Real-World Applications

    **Graphics Systems** - Shapes can use different rendering engines (SVG, Canvas, OpenGL)  
    **Database Access** - Repository pattern works with different database drivers  
    **Messaging Systems** - Message types can use different delivery channels  
    **Device Drivers** - Abstract device operations work with specific hardware

    ### Implementation Benefits

    ✅ **Platform independence** - Switch implementations without changing client code  
    ✅ **Runtime flexibility** - Change implementation at runtime  
    ✅ **Separate concerns** - Abstraction and implementation evolve independently  
    ✅ **Reduces coupling** - Client depends only on abstraction interface
  `,
  useCases: [
    PatternUseCase.API_DESIGN,
    PatternUseCase.SYSTEM_INTEGRATION,
    PatternUseCase.CROSS_PLATFORM_SUPPORT
  ],
  advantages: [
    'Decouples interface from implementation',
    'Improved extensibility - add new implementations easily',
    'Runtime implementation switching',
    'Platform and implementation independence'
  ],
  disadvantages: [
    'Increases complexity with additional abstraction layer',
    'May be overkill for simple cases',
    'Requires careful design of abstraction interface'
  ],
  relatedPatterns: ['Adapter', 'Strategy', 'Abstract Factory']
};

export const solutions: SolutionMetadata[] = [
  {
    name: 'graphics-rendering',
    title: 'Graphics Rendering Bridge',
    description: 'Shapes that can render using different graphics APIs',
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Hard'
  },
  {
    name: 'messaging-system',
    title: 'Message Delivery Bridge',
    description: 'Messages that can be sent through different channels',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Medium'
  },
  {
    name: 'database-access',
    title: 'Database Access Bridge',
    description: 'Repository pattern with different database implementations',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Medium'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'Cross-Platform Graphics',
    scenario: 'Render shapes using different graphics APIs (SVG, Canvas) without changing shape code',
    inputExample: `const { circle, rectangle, svgRenderer, canvasRenderer } = createShapeRenderer();

console.log(circle.draw());  // Currently SVG
circle.setRenderer(canvasRenderer);
console.log(circle.draw());  // Now Canvas`,
    outputExample: `<circle cx="100" cy="100" r="50" />
ctx.arc(100, 100, 50, 0, 2 * Math.PI);`,
    explanation: 'The Circle abstraction works with any rendering implementation. You can switch from SVG to Canvas rendering without modifying the Circle class.'
  },
  {
    title: 'Multi-Channel Messaging',
    scenario: 'Send different message types through various delivery channels',
    inputExample: `const { textMessage, encryptedMessage, slackSender } = createMessagingSystem();

console.log(textMessage.send('john@example.com'));
textMessage.sender = slackSender;
console.log(textMessage.send('@john'));`,
    outputExample: `Email to john@example.com: Hello World
Slack to @john: Hello World`,
    explanation: 'Message abstractions can use any sender implementation. The same message can be delivered via email, SMS, or Slack by changing the bridge.'
  },
  {
    title: 'Database Flexibility',
    scenario: 'Use repository pattern with different database engines',
    inputExample: `const { repository, postgres } = createDatabaseRepository();

console.log(repository.findUser(1));  // MySQL syntax
repository.setDatabase(postgres);
console.log(repository.createUser('John', 'john@example.com'));  // PostgreSQL syntax`,
    outputExample: `MySQL: SELECT * FROM users WHERE id = 1
PostgreSQL: INSERT INTO users (name, email) VALUES ('John', 'john@example.com')`,
    explanation: 'Repository abstraction works with any database implementation. You can switch from MySQL to PostgreSQL without changing repository methods.'
  }
];

export { 
  DrawingAPI, SVGRenderer, CanvasRenderer, ConsoleRenderer,
  Shape, Circle, Rectangle,
  MessageSender, EmailSender, SMSSender, SlackSender,
  Message, TextMessage, EncryptedMessage,
  Database, MySQL, PostgreSQL, Repository 
};
import { PatternMetadata, PatternExample, SolutionMetadata } from '@/interfaces/patterns';

/**
 * 🎭 Command Pattern Implementation - Request Encapsulation
 * 
 * DESCRIPTION:
 * Encapsulates a request as an object, allowing you to parameterize clients
 * with different requests, queue operations, log requests, and support undo.
 * Perfect for implementing undo/redo, macro recording, and queuing operations.
 * 
 * EXAMPLES:
 * • Text editor operations - Undo/redo functionality
 * • GUI button actions - Decouple UI from business logic
 * • Task queues - Background job processing
 * 
 * IMPLEMENTATION APPROACHES:
 * • Simple command - Basic command interface with execute method
 * • Macro command - Composite commands that execute multiple operations
 * • Undoable command - Commands that support undo/redo operations
 * 
 * REAL-WORLD USAGE:
 * • Redux actions in React applications
 * • Database transaction logs
 * • Remote procedure calls (RPC)
 * • Task scheduling systems
 * 
 * PERFORMANCE:
 * - Time: O(1) for command execution
 * - Space: O(n) for command history storage
 */

// Command interface
interface Command {
  execute(): void;
  undo?(): void;
}

// Receiver - the object that knows how to perform the operations
class TextEditor {
  private content: string = '';

  public getContent(): string {
    return this.content;
  }

  public insertText(text: string, position: number): void {
    this.content = this.content.slice(0, position) + text + this.content.slice(position);
  }

  public deleteText(position: number, length: number): string {
    const deleted = this.content.slice(position, position + length);
    this.content = this.content.slice(0, position) + this.content.slice(position + length);
    return deleted;
  }

  public replaceText(position: number, length: number, newText: string): string {
    const deleted = this.content.slice(position, position + length);
    this.content = this.content.slice(0, position) + newText + this.content.slice(position + length);
    return deleted;
  }
}

// Concrete Commands
export class InsertTextCommand implements Command {
  private editor: TextEditor;
  private text: string;
  private position: number;

  constructor(editor: TextEditor, text: string, position: number) {
    this.editor = editor;
    this.text = text;
    this.position = position;
  }

  execute(): void {
    this.editor.insertText(this.text, this.position);
  }

  undo(): void {
    this.editor.deleteText(this.position, this.text.length);
  }
}

export class DeleteTextCommand implements Command {
  private editor: TextEditor;
  private position: number;
  private length: number;
  private deletedText: string = '';

  constructor(editor: TextEditor, position: number, length: number) {
    this.editor = editor;
    this.position = position;
    this.length = length;
  }

  execute(): void {
    this.deletedText = this.editor.deleteText(this.position, this.length);
  }

  undo(): void {
    this.editor.insertText(this.deletedText, this.position);
  }
}

// Macro Command - executes multiple commands
export class MacroCommand implements Command {
  private commands: Command[] = [];

  public addCommand(command: Command): void {
    this.commands.push(command);
  }

  execute(): void {
    this.commands.forEach(command => command.execute());
  }

  undo(): void {
    // Undo in reverse order
    for (let i = this.commands.length - 1; i >= 0; i--) {
      if (this.commands[i].undo) {
        this.commands[i].undo!();
      }
    }
  }
}

// Invoker - manages and executes commands
export class EditorInvoker {
  private history: Command[] = [];
  private currentPosition: number = -1;

  public executeCommand(command: Command): void {
    // Remove any commands after current position (when undoing then executing new command)
    this.history = this.history.slice(0, this.currentPosition + 1);
    
    // Execute and store command
    command.execute();
    this.history.push(command);
    this.currentPosition++;
  }

  public undo(): boolean {
    if (this.currentPosition >= 0) {
      const command = this.history[this.currentPosition];
      if (command.undo) {
        command.undo();
        this.currentPosition--;
        return true;
      }
    }
    return false;
  }

  public redo(): boolean {
    if (this.currentPosition < this.history.length - 1) {
      this.currentPosition++;
      const command = this.history[this.currentPosition];
      command.execute();
      return true;
    }
    return false;
  }

  public getHistory(): Command[] {
    return [...this.history];
  }

  public canUndo(): boolean {
    return this.currentPosition >= 0;
  }

  public canRedo(): boolean {
    return this.currentPosition < this.history.length - 1;
  }
}

// Smart Home System Example
interface Device {
  turnOn(): void;
  turnOff(): void;
  getName(): string;
}

class Light implements Device {
  private isOn: boolean = false;

  constructor(private name: string) {}

  turnOn(): void {
    this.isOn = true;
    console.log(`${this.name} light is ON`);
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`${this.name} light is OFF`);
  }

  getName(): string {
    return this.name;
  }
}

class AirConditioner implements Device {
  private isOn: boolean = false;

  constructor(private name: string) {}

  turnOn(): void {
    this.isOn = true;
    console.log(`${this.name} AC is ON`);
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`${this.name} AC is OFF`);
  }

  getName(): string {
    return this.name;
  }
}

// Device Commands
export class TurnOnCommand implements Command {
  constructor(private device: Device) {}

  execute(): void {
    this.device.turnOn();
  }

  undo(): void {
    this.device.turnOff();
  }
}

export class TurnOffCommand implements Command {
  constructor(private device: Device) {}

  execute(): void {
    this.device.turnOff();
  }

  undo(): void {
    this.device.turnOn();
  }
}

// Remote Control - Universal invoker
export class RemoteControl {
  private commands: Map<string, Command> = new Map();
  private lastCommand: Command | null = null;

  public setCommand(slot: string, command: Command): void {
    this.commands.set(slot, command);
  }

  public pressButton(slot: string): void {
    const command = this.commands.get(slot);
    if (command) {
      command.execute();
      this.lastCommand = command;
    } else {
      console.log(`No command set for slot: ${slot}`);
    }
  }

  public pressUndo(): void {
    if (this.lastCommand && this.lastCommand.undo) {
      this.lastCommand.undo();
    } else {
      console.log('No command to undo');
    }
  }
}

// Task Queue System Example
interface Task {
  id: string;
  execute(): Promise<void>;
  retry?(): Promise<void>;
}

class EmailTask implements Task {
  constructor(
    public id: string,
    private to: string,
    private subject: string,
    private body: string
  ) {}

  async execute(): Promise<void> {
    console.log(`Sending email to ${this.to}: ${this.subject}`);
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async retry(): Promise<void> {
    console.log(`Retrying email task: ${this.id}`);
    await this.execute();
  }
}

class DatabaseTask implements Task {
  constructor(
    public id: string,
    private query: string
  ) {}

  async execute(): Promise<void> {
    console.log(`Executing database query: ${this.query}`);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  async retry(): Promise<void> {
    console.log(`Retrying database task: ${this.id}`);
    await this.execute();
  }
}

export class TaskQueue {
  private pending: Task[] = [];
  private completed: Task[] = [];
  private failed: Task[] = [];
  private isProcessing: boolean = false;

  public addTask(task: Task): void {
    this.pending.push(task);
    console.log(`Task added to queue: ${task.id}`);
  }

  public async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    console.log('Starting queue processing...');

    while (this.pending.length > 0) {
      const task = this.pending.shift()!;
      
      try {
        await task.execute();
        this.completed.push(task);
        console.log(`Task completed: ${task.id}`);
      } catch (error) {
        console.log(`Task failed: ${task.id} - ${error}`);
        this.failed.push(task);
      }
    }

    this.isProcessing = false;
    console.log('Queue processing complete');
  }

  public async retryFailedTasks(): Promise<void> {
    const tasksToRetry = [...this.failed];
    this.failed = [];

    for (const task of tasksToRetry) {
      try {
        if (task.retry) {
          await task.retry();
        } else {
          await task.execute();
        }
        this.completed.push(task);
        console.log(`Task retry successful: ${task.id}`);
      } catch (error) {
        console.log(`Task retry failed: ${task.id} - ${error}`);
        this.failed.push(task);
      }
    }
  }

  public getQueueStatus(): { pending: number; completed: number; failed: number } {
    return {
      pending: this.pending.length,
      completed: this.completed.length,
      failed: this.failed.length
    };
  }
}

// Function-based Command Pattern (Modern approach)
export type FunctionCommand = () => void;
export type UndoableFunctionCommand = {
  execute: () => void;
  undo: () => void;
};

export class FunctionCommandInvoker {
  private history: UndoableFunctionCommand[] = [];
  private currentPosition: number = -1;

  public execute(command: UndoableFunctionCommand): void {
    this.history = this.history.slice(0, this.currentPosition + 1);
    command.execute();
    this.history.push(command);
    this.currentPosition++;
  }

  public undo(): boolean {
    if (this.currentPosition >= 0) {
      this.history[this.currentPosition].undo();
      this.currentPosition--;
      return true;
    }
    return false;
  }

  public redo(): boolean {
    if (this.currentPosition < this.history.length - 1) {
      this.currentPosition++;
      this.history[this.currentPosition].execute();
      return true;
    }
    return false;
  }
}

export const metadata: PatternMetadata = {
  title: "Command Pattern",
  description: "Encapsulate requests as objects for undo, queue, and log operations",
  detailedDescription: "🎭 **The Command Pattern - Request Encapsulation**\n\nEncapsulates requests as objects, allowing you to parameterize clients with different requests, queue operations, and support undo!\n\n🎯 **Core Problem Solved:**\n• Decouple sender of request from receiver\n• Support undo/redo operations easily\n• Queue and schedule operations for later execution\n• Log and audit all operations performed\n\n🔍 **Three Implementation Approaches:**\n• **Simple Command:** Basic command interface with execute method\n• **Macro Command:** Composite commands executing multiple operations\n• **Undoable Command:** Commands supporting undo/redo functionality\n\n🚀 **Real-World Applications:**\n• Text editor undo/redo functionality\n• GUI button actions and menu operations\n• Database transaction logging and rollback\n• Task scheduling and background job processing\n• Remote procedure calls and API requests\n• Smart home device control systems\n\n⚡ **Modern Usage Examples:**\n• Redux actions in React state management\n• Event sourcing in microservices\n• Command buses in CQRS architecture\n• Async task queues in Node.js applications",
  category: "Behavioral",
  difficulty: "Medium",
  timeComplexity: "O(1)",
  spaceComplexity: "O(n)",
  useCases: ["State Management", "Code Organization", "API Design", "Performance"],
  concepts: ["request encapsulation", "undo/redo", "macro operations", "command queuing"],
  realWorldApplications: [
    "Text editor operations",
    "GUI action handling",
    "Database transactions",
    "Task queue systems",
    "Smart home controls",
    "API request handling"
  ],
  relatedPatterns: ["Memento", "Observer", "Strategy"],
  frameworkSupport: ["Redux", "MobX", "EventBus libraries", "Task queue systems"]
};

export const examples: PatternExample[] = [
  {
    scenario: "Text editor undo/redo",
    description: "Execute and undo text editing operations",
    input: "invoker.executeCommand(new InsertTextCommand(editor, 'Hello', 0))",
    output: "Text inserted, can be undone with invoker.undo()"
  },
  {
    scenario: "Smart home remote control",
    description: "Control devices with unified interface",
    input: "remote.pressButton('living-room-light')",
    output: "Living room light is ON (can be undone with remote.pressUndo())"
  },
  {
    scenario: "Background task processing",
    description: "Queue and process tasks asynchronously",
    input: "taskQueue.addTask(new EmailTask('1', 'user@example.com', 'Hello', 'Message'))",
    output: "Task queued and processed: Email sent to user@example.com"
  }
];

export const solutions: SolutionMetadata[] = [
  {
    name: "text-editor-commands",
    tabName: "Text Editor Commands",
    approach: "Undoable Operations Implementation",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    code: `// Command interface
interface Command {
  execute(): void;
  undo?(): void;
}

// Receiver - performs the actual work
class TextEditor {
  private content: string = '';

  insertText(text: string, position: number): void {
    this.content = this.content.slice(0, position) + 
                   text + 
                   this.content.slice(position);
  }

  deleteText(position: number, length: number): string {
    const deleted = this.content.slice(position, position + length);
    this.content = this.content.slice(0, position) + 
                   this.content.slice(position + length);
    return deleted;
  }

  getContent(): string {
    return this.content;
  }
}

// Concrete commands
class InsertTextCommand implements Command {
  constructor(
    private editor: TextEditor,
    private text: string,
    private position: number
  ) {}

  execute(): void {
    this.editor.insertText(this.text, this.position);
  }

  undo(): void {
    this.editor.deleteText(this.position, this.text.length);
  }
}

class DeleteTextCommand implements Command {
  private deletedText: string = '';

  constructor(
    private editor: TextEditor,
    private position: number,
    private length: number
  ) {}

  execute(): void {
    this.deletedText = this.editor.deleteText(this.position, this.length);
  }

  undo(): void {
    this.editor.insertText(this.deletedText, this.position);
  }
}

// Invoker with undo/redo support
class EditorInvoker {
  private history: Command[] = [];
  private currentPosition: number = -1;

  executeCommand(command: Command): void {
    // Clear redo history when executing new command
    this.history = this.history.slice(0, this.currentPosition + 1);
    
    command.execute();
    this.history.push(command);
    this.currentPosition++;
  }

  undo(): boolean {
    if (this.currentPosition >= 0) {
      const command = this.history[this.currentPosition];
      if (command.undo) {
        command.undo();
        this.currentPosition--;
        return true;
      }
    }
    return false;
  }

  redo(): boolean {
    if (this.currentPosition < this.history.length - 1) {
      this.currentPosition++;
      this.history[this.currentPosition].execute();
      return true;
    }
    return false;
  }
}

// Usage
const editor = new TextEditor();
const invoker = new EditorInvoker();

invoker.executeCommand(new InsertTextCommand(editor, 'Hello', 0));
invoker.executeCommand(new InsertTextCommand(editor, ' World', 5));
console.log(editor.getContent()); // "Hello World"

invoker.undo(); // Removes " World"
console.log(editor.getContent()); // "Hello"

invoker.redo(); // Adds " World" back
console.log(editor.getContent()); // "Hello World"`
  },
  {
    name: "device-control-commands",
    tabName: "Device Control",
    approach: "Smart Home System Implementation",
    type: "class",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    code: `interface Device {
  turnOn(): void;
  turnOff(): void;
  getName(): string;
}

class Light implements Device {
  constructor(private name: string, private isOn: boolean = false) {}

  turnOn(): void {
    this.isOn = true;
    console.log(\`\${this.name} light is ON\`);
  }

  turnOff(): void {
    this.isOn = false;
    console.log(\`\${this.name} light is OFF\`);
  }

  getName(): string {
    return this.name;
  }
}

// Device commands
class TurnOnCommand implements Command {
  constructor(private device: Device) {}

  execute(): void {
    this.device.turnOn();
  }

  undo(): void {
    this.device.turnOff();
  }
}

class TurnOffCommand implements Command {
  constructor(private device: Device) {}

  execute(): void {
    this.device.turnOff();
  }

  undo(): void {
    this.device.turnOn();
  }
}

// Remote control invoker
class RemoteControl {
  private commands: Map<string, Command> = new Map();
  private lastCommand: Command | null = null;

  setCommand(slot: string, command: Command): void {
    this.commands.set(slot, command);
  }

  pressButton(slot: string): void {
    const command = this.commands.get(slot);
    if (command) {
      command.execute();
      this.lastCommand = command;
    }
  }

  pressUndo(): void {
    if (this.lastCommand?.undo) {
      this.lastCommand.undo();
    }
  }
}

// Usage
const livingRoomLight = new Light('Living Room');
const kitchenLight = new Light('Kitchen');

const remote = new RemoteControl();
remote.setCommand('1', new TurnOnCommand(livingRoomLight));
remote.setCommand('2', new TurnOffCommand(livingRoomLight));
remote.setCommand('3', new TurnOnCommand(kitchenLight));

remote.pressButton('1'); // Living Room light is ON
remote.pressButton('3'); // Kitchen light is ON
remote.pressUndo();      // Kitchen light is OFF`
  },
  {
    name: "task-queue-commands",
    tabName: "Task Queue System",
    approach: "Asynchronous Command Processing",
    type: "class",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: false,
    code: `interface Task {
  id: string;
  execute(): Promise<void>;
  retry?(): Promise<void>;
}

class EmailTask implements Task {
  constructor(
    public id: string,
    private to: string,
    private subject: string
  ) {}

  async execute(): Promise<void> {
    console.log(\`Sending email to \${this.to}: \${this.subject}\`);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async retry(): Promise<void> {
    console.log(\`Retrying email: \${this.id}\`);
    await this.execute();
  }
}

class DatabaseTask implements Task {
  constructor(
    public id: string,
    private query: string
  ) {}

  async execute(): Promise<void> {
    console.log(\`Executing query: \${this.query}\`);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

// Task queue with command pattern
class TaskQueue {
  private pending: Task[] = [];
  private completed: Task[] = [];
  private failed: Task[] = [];

  addTask(task: Task): void {
    this.pending.push(task);
    console.log(\`Task queued: \${task.id}\`);
  }

  async processQueue(): Promise<void> {
    console.log('Processing queue...');
    
    while (this.pending.length > 0) {
      const task = this.pending.shift()!;
      
      try {
        await task.execute();
        this.completed.push(task);
        console.log(\`Completed: \${task.id}\`);
      } catch (error) {
        console.log(\`Failed: \${task.id}\`);
        this.failed.push(task);
      }
    }
  }

  async retryFailedTasks(): Promise<void> {
    const tasksToRetry = [...this.failed];
    this.failed = [];

    for (const task of tasksToRetry) {
      try {
        await (task.retry ? task.retry() : task.execute());
        this.completed.push(task);
      } catch (error) {
        this.failed.push(task);
      }
    }
  }
}

// Usage
const taskQueue = new TaskQueue();

taskQueue.addTask(new EmailTask('1', 'user@example.com', 'Welcome'));
taskQueue.addTask(new DatabaseTask('2', 'UPDATE users SET active = true'));
taskQueue.addTask(new EmailTask('3', 'admin@example.com', 'Report'));

await taskQueue.processQueue();
// All tasks executed asynchronously`
  }
];
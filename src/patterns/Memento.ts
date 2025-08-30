import { PatternMetadata, PatternExample, PatternUseCase, Solution } from '../interfaces/patterns';

// Memento interface
interface TextEditorMemento {
  getContent(): string;
  getCursor(): number;
  getTimestamp(): Date;
}

// Originator
class TextEditor {
  private content = '';
  private cursor = 0;

  type(text: string): void {
    const before = this.content.substring(0, this.cursor);
    const after = this.content.substring(this.cursor);
    this.content = before + text + after;
    this.cursor += text.length;
  }

  delete(count: number = 1): void {
    const before = this.content.substring(0, Math.max(0, this.cursor - count));
    const after = this.content.substring(this.cursor);
    this.content = before + after;
    this.cursor = Math.max(0, this.cursor - count);
  }

  moveCursor(position: number): void {
    this.cursor = Math.max(0, Math.min(position, this.content.length));
  }

  // Create memento
  save(): TextEditorMemento {
    return new ConcreteTextEditorMemento(this.content, this.cursor);
  }

  // Restore from memento
  restore(memento: TextEditorMemento): void {
    this.content = memento.getContent();
    this.cursor = memento.getCursor();
  }

  getContent(): string {
    return this.content;
  }

  getCursor(): number {
    return this.cursor;
  }

  getCurrentLine(): string {
    const lines = this.content.split('\n');
    let currentPos = 0;
    
    for (const line of lines) {
      if (currentPos + line.length >= this.cursor) {
        return line;
      }
      currentPos += line.length + 1; // +1 for newline
    }
    
    return lines[lines.length - 1] || '';
  }
}

// Concrete Memento
class ConcreteTextEditorMemento implements TextEditorMemento {
  private readonly timestamp = new Date();

  constructor(
    private readonly content: string,
    private readonly cursor: number
  ) {}

  getContent(): string {
    return this.content;
  }

  getCursor(): number {
    return this.cursor;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }
}

// Caretaker
class EditorHistory {
  private history: TextEditorMemento[] = [];
  private currentIndex = -1;
  private maxHistorySize = 50;

  save(memento: TextEditorMemento): void {
    // Remove any history after current index (when user makes changes after undo)
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    // Add new memento
    this.history.push(memento);
    this.currentIndex++;
    
    // Maintain max history size
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  undo(): TextEditorMemento | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): TextEditorMemento | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  getHistorySize(): number {
    return this.history.length;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  getHistoryPreview(): { index: number; content: string; timestamp: Date }[] {
    return this.history.map((memento, index) => ({
      index,
      content: memento.getContent().substring(0, 50) + (memento.getContent().length > 50 ? '...' : ''),
      timestamp: memento.getTimestamp()
    }));
  }
}

// Game State Example
interface GameStateMemento {
  getLevel(): number;
  getScore(): number;
  getHealth(): number;
  getInventory(): string[];
  getPosition(): { x: number; y: number };
  getTimestamp(): Date;
}

class GameState {
  private level = 1;
  private score = 0;
  private health = 100;
  private inventory: string[] = [];
  private position = { x: 0, y: 0 };

  levelUp(): void {
    this.level++;
    this.health = 100; // Restore health on level up
  }

  addScore(points: number): void {
    this.score += points;
  }

  takeDamage(damage: number): void {
    this.health = Math.max(0, this.health - damage);
  }

  addItem(item: string): void {
    this.inventory.push(item);
  }

  move(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
  }

  createSavePoint(): GameStateMemento {
    return new ConcreteGameStateMemento(
      this.level,
      this.score,
      this.health,
      [...this.inventory],
      { ...this.position }
    );
  }

  loadSavePoint(memento: GameStateMemento): void {
    this.level = memento.getLevel();
    this.score = memento.getScore();
    this.health = memento.getHealth();
    this.inventory = [...memento.getInventory()];
    this.position = { ...memento.getPosition() };
  }

  getStats() {
    return {
      level: this.level,
      score: this.score,
      health: this.health,
      inventory: [...this.inventory],
      position: { ...this.position }
    };
  }
}

class ConcreteGameStateMemento implements GameStateMemento {
  private readonly timestamp = new Date();

  constructor(
    private readonly level: number,
    private readonly score: number,
    private readonly health: number,
    private readonly inventory: string[],
    private readonly position: { x: number; y: number }
  ) {}

  getLevel(): number { return this.level; }
  getScore(): number { return this.score; }
  getHealth(): number { return this.health; }
  getInventory(): string[] { return [...this.inventory]; }
  getPosition(): { x: number; y: number } { return { ...this.position }; }
  getTimestamp(): Date { return this.timestamp; }
}

class SaveManager {
  private saveSlots: Map<string, GameStateMemento> = new Map();
  private autoSaves: GameStateMemento[] = [];
  private maxAutoSaves = 5;

  saveGame(slotName: string, memento: GameStateMemento): void {
    this.saveSlots.set(slotName, memento);
  }

  loadGame(slotName: string): GameStateMemento | null {
    return this.saveSlots.get(slotName) || null;
  }

  autoSave(memento: GameStateMemento): void {
    this.autoSaves.push(memento);
    if (this.autoSaves.length > this.maxAutoSaves) {
      this.autoSaves.shift();
    }
  }

  getAutoSave(index: number): GameStateMemento | null {
    return this.autoSaves[index] || null;
  }

  getLatestAutoSave(): GameStateMemento | null {
    return this.autoSaves[this.autoSaves.length - 1] || null;
  }

  getSaveSlots(): string[] {
    return Array.from(this.saveSlots.keys());
  }

  getAutoSaveCount(): number {
    return this.autoSaves.length;
  }

  deleteSave(slotName: string): boolean {
    return this.saveSlots.delete(slotName);
  }
}

// Configuration Manager Example
interface ConfigMemento {
  getSettings(): Record<string, unknown>;
  getTimestamp(): Date;
  getName(): string;
}

class ConfigurationManager {
  private settings: Record<string, unknown> = {
    theme: 'light',
    fontSize: 14,
    autoSave: true,
    language: 'en'
  };

  setSetting(key: string, value: unknown): void {
    this.settings[key] = value;
  }

  getSetting(key: string): unknown {
    return this.settings[key];
  }

  getAllSettings(): Record<string, unknown> {
    return { ...this.settings };
  }

  createSnapshot(name: string): ConfigMemento {
    return new ConcreteConfigMemento(name, { ...this.settings });
  }

  restoreSnapshot(memento: ConfigMemento): void {
    this.settings = { ...memento.getSettings() };
  }

  resetToDefaults(): void {
    this.settings = {
      theme: 'light',
      fontSize: 14,
      autoSave: true,
      language: 'en'
    };
  }
}

class ConcreteConfigMemento implements ConfigMemento {
  private readonly timestamp = new Date();

  constructor(
    private readonly name: string,
    private readonly settings: Record<string, unknown>
  ) {}

  getSettings(): Record<string, unknown> {
    return { ...this.settings };
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  getName(): string {
    return this.name;
  }
}

class ConfigHistory {
  private snapshots: ConfigMemento[] = [];

  saveSnapshot(memento: ConfigMemento): void {
    this.snapshots.push(memento);
  }

  getSnapshot(name: string): ConfigMemento | null {
    return this.snapshots.find(s => s.getName() === name) || null;
  }

  getAllSnapshots(): ConfigMemento[] {
    return [...this.snapshots];
  }

  deleteSnapshot(name: string): boolean {
    const index = this.snapshots.findIndex(s => s.getName() === name);
    if (index !== -1) {
      this.snapshots.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Factory functions
export function createTextEditorWithHistory() {
  const editor = new TextEditor();
  const history = new EditorHistory();
  
  // Initial save point
  history.save(editor.save());
  
  return { editor, history };
}

export function createGameWithSaveSystem() {
  const game = new GameState();
  const saveManager = new SaveManager();
  
  return { game, saveManager };
}

export function createConfigManagerWithHistory() {
  const config = new ConfigurationManager();
  const history = new ConfigHistory();
  
  // Save initial state
  history.saveSnapshot(config.createSnapshot('initial'));
  
  return { config, history };
}

export const metadata: PatternMetadata = {
  title: 'Memento Pattern',
  category: 'Behavioral',
  difficulty: 'Medium',
  description: 'Capture and restore object state without violating encapsulation',
  concepts: ["design patterns","software architecture","code organization","object-oriented programming"],
  detailedDescription: `
    ## 💾 Memento Pattern

    The **Memento Pattern** captures and externalizes an object's internal state without violating encapsulation, allowing the object to be restored to this state later.

    ### Core Concepts

    🔹 **Originator** - Object whose state needs to be saved and restored  
    🔹 **Memento** - Stores the internal state of the originator  
    🔹 **Caretaker** - Manages mementos but never examines their contents  
    🔹 **Encapsulation** - Memento protects originator's state from external access

    ### Real-World Applications

    **Text Editors** - Undo/redo functionality with document state snapshots  
    **Games** - Save/load game state at checkpoints or user request  
    **Configuration Management** - Save/restore application settings  
    **Database Transactions** - Rollback to previous state on failure

    ### State Management Benefits

    **Undo/Redo Operations** - Navigate through state history efficiently  
    **Save Points** - Create checkpoints for later restoration  
    **Rollback Capability** - Revert to known good state after errors  
    **State Isolation** - Memento contents remain opaque to caretaker

    ### Implementation Benefits

    ✅ **Preserves encapsulation** - No external access to object internals  
    ✅ **Simplified originator** - No need to manage state history internally  
    ✅ **Flexible storage** - Caretaker can implement any storage strategy  
    ✅ **State integrity** - Immutable snapshots prevent accidental modification
  `,
  useCases: [
    PatternUseCase.STATE_MANAGEMENT,
    PatternUseCase.DATA_BACKUP,
    PatternUseCase.TRANSACTION_PROCESSING
  ],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    timeComplexity: 'O(1)',
  spaceComplexity: 'O(n)',
    advantages: [
    'Preserves encapsulation boundaries',
    'Simplifies originator by removing state management responsibility',
    'Enables undo/redo functionality',
    'Provides rollback capability for error recovery'
  ],
  disadvantages: [
    'Can be expensive if large objects need frequent snapshots',
    'Memory overhead from storing multiple states',
    'Caretaker must manage memento lifecycle',
    'May require garbage collection considerations'
  ],
  relatedPatterns: ['Command', 'Iterator', 'Prototype']
};

export const solutions: Solution[] = [
  {
    name: 'text-editor',
    tabName: 'Text Editor with Undo/Redo',
    approach: 'Document editing with history management',
    type: 'class',
    isOptimal: true,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    code: `// Memento interface
interface TextEditorMemento {
  getContent(): string;
  getCursor(): number;
  getTimestamp(): Date;
}

// Originator
class TextEditor {
  private content = '';
  private cursor = 0;

  type(text: string): void {
    const before = this.content.substring(0, this.cursor);
    const after = this.content.substring(this.cursor);
    this.content = before + text + after;
    this.cursor += text.length;
  }

  delete(count: number = 1): void {
    const before = this.content.substring(0, Math.max(0, this.cursor - count));
    const after = this.content.substring(this.cursor);
    this.content = before + after;
    this.cursor = Math.max(0, this.cursor - count);
  }

  save(): TextEditorMemento {
    return new ConcreteTextEditorMemento(this.content, this.cursor);
  }

  restore(memento: TextEditorMemento): void {
    this.content = memento.getContent();
    this.cursor = memento.getCursor();
  }
}`
  },
  {
    name: 'game-save-system',
    tabName: 'Game State Management',
    approach: 'Save/load game progress with multiple slots',
    type: 'class',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(k)',
    code: `// Game State Memento
interface GameStateMemento {
  getLevel(): number;
  getScore(): number;
  getHealth(): number;
  getInventory(): string[];
  getPosition(): { x: number; y: number };
}

class GameState {
  private level = 1;
  private score = 0;
  private health = 100;
  private inventory: string[] = [];
  private position = { x: 0, y: 0 };

  createSavePoint(): GameStateMemento {
    return new ConcreteGameStateMemento(
      this.level,
      this.score,
      this.health,
      [...this.inventory],
      { ...this.position }
    );
  }

  loadSavePoint(memento: GameStateMemento): void {
    this.level = memento.getLevel();
    this.score = memento.getScore();
    this.health = memento.getHealth();
    this.inventory = [...memento.getInventory()];
    this.position = { ...memento.getPosition() };
  }
}`
  },
  {
    name: 'configuration-manager',
    tabName: 'Settings Snapshot System',
    approach: 'Application configuration with named snapshots',
    type: 'class',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    code: `// Configuration Memento
interface ConfigMemento {
  getSettings(): Record<string, unknown>;
  getName(): string;
}

class ConfigurationManager {
  private settings: Record<string, unknown> = {
    theme: 'light',
    fontSize: 14,
    autoSave: true,
    language: 'en'
  };

  setSetting(key: string, value: unknown): void {
    this.settings[key] = value;
  }

  createSnapshot(name: string): ConfigMemento {
    return new ConcreteConfigMemento(name, { ...this.settings });
  }

  restoreSnapshot(memento: ConfigMemento): void {
    this.settings = { ...memento.getSettings() };
  }
}`
  }
];

export const examples: PatternExample[] = [
  {
    scenario: 'Edit document with ability to undo and redo changes through state snapshots',
    input: `const { editor, history } = createTextEditorWithHistory();

editor.type('Hello');
history.save(editor.save());
editor.type(' World');
history.save(editor.save());

console.log('Current:', editor.getContent());
editor.restore(history.undo()!);
console.log('After undo:', editor.getContent());
editor.restore(history.redo()!);
console.log('After redo:', editor.getContent());`,
    output: `Current: Hello World
After undo: Hello
After redo: Hello World`,
    description: 'Each edit operation can be followed by saving a memento. The history manager enables navigating through saved states without exposing internal editor structure.'
  },
  {
    scenario: 'Save game progress at checkpoints and restore when needed',
    input: `const { game, saveManager } = createGameWithSaveSystem();

game.addScore(100);
game.addItem('sword');
game.move(10, 20);

// Save at checkpoint
saveManager.saveGame('checkpoint1', game.createSavePoint());

game.takeDamage(50);
game.addScore(50);
console.log('After damage:', game.getStats());

// Load checkpoint
game.loadSavePoint(saveManager.loadGame('checkpoint1')!);
console.log('After loading:', game.getStats());`,
    output: `After damage: {level: 1, score: 150, health: 50, inventory: ['sword'], position: {x: 10, y: 20}}
After loading: {level: 1, score: 100, health: 100, inventory: ['sword'], position: {x: 10, y: 20}}`,
    description: 'Game state can be captured at any point and restored later. The save manager handles storage while keeping game state details private.'
  },
  {
    scenario: 'Create named configuration snapshots for easy restoration of settings',
    input: `const { config, history } = createConfigManagerWithHistory();

config.setSetting('theme', 'dark');
config.setSetting('fontSize', 16);
history.saveSnapshot(config.createSnapshot('dark-theme'));

config.setSetting('theme', 'high-contrast');
config.setSetting('fontSize', 18);

console.log('Current theme:', config.getSetting('theme'));
config.restoreSnapshot(history.getSnapshot('dark-theme')!);
console.log('Restored theme:', config.getSetting('theme'));`,
    output: `Current theme: high-contrast
Restored theme: dark`,
    description: 'Configuration states can be saved as named snapshots and restored later. The memento pattern keeps settings data encapsulated while enabling flexible state management.'
  }
];

export type { 
  TextEditorMemento, GameStateMemento, ConfigMemento
};

export { 
  TextEditor, ConcreteTextEditorMemento, EditorHistory,
  GameState, ConcreteGameStateMemento, SaveManager,
  ConfigurationManager, ConcreteConfigMemento, ConfigHistory 
};

const mementoModule = {
  metadata,
  solutions, 
  examples
};

export default mementoModule;
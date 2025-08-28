import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

// Data Processing Template
abstract class DataProcessor {
  // Template method - defines the algorithm structure
  processData(data: unknown[]): string {
    const results: string[] = [];
    
    results.push(this.loadData(data));
    
    const processedData = this.validateData(data);
    if (processedData.length === 0) {
      return 'No valid data to process';
    }
    
    results.push(this.transformData(processedData));
    results.push(this.saveData(processedData));
    
    // Optional hook
    const postProcess = this.postProcess();
    if (postProcess) {
      results.push(postProcess);
    }
    
    return results.join(' → ');
  }

  // Abstract methods - must be implemented by subclasses
  protected abstract loadData(data: unknown[]): string;
  protected abstract transformData(data: unknown[]): string;
  protected abstract saveData(data: unknown[]): string;

  // Hook method - optional override
  protected postProcess(): string | null {
    return null;
  }

  // Common method - shared implementation
  protected validateData(data: unknown[]): unknown[] {
    return data.filter(item => item != null && item !== '');
  }
}

// Concrete implementations
class CSVProcessor extends DataProcessor {
  protected loadData(data: unknown[]): string {
    return `Loaded ${data.length} CSV records`;
  }

  protected transformData(data: unknown[]): string {
    return `Converted ${data.length} records to CSV format`;
  }

  protected saveData(data: unknown[]): string {
    return `Saved CSV file with ${data.length} records`;
  }

  protected postProcess(): string {
    return 'Generated CSV summary report';
  }
}

class JSONProcessor extends DataProcessor {
  protected loadData(data: unknown[]): string {
    return `Parsed ${data.length} JSON objects`;
  }

  protected transformData(data: unknown[]): string {
    return `Normalized ${data.length} JSON objects`;
  }

  protected saveData(data: unknown[]): string {
    return `Stored JSON data in database (${data.length} records)`;
  }
}

class XMLProcessor extends DataProcessor {
  protected loadData(data: unknown[]): string {
    return `Parsed ${data.length} XML elements`;
  }

  protected transformData(data: unknown[]): string {
    return `Validated and transformed ${data.length} XML elements`;
  }

  protected saveData(data: unknown[]): string {
    return `Exported ${data.length} elements to XML file`;
  }

  protected postProcess(): string {
    return 'Validated XML schema compliance';
  }
}

// Game AI Template
abstract class GameAI {
  // Template method
  playTurn(): string {
    const actions: string[] = [];
    
    actions.push(this.collectResources());
    actions.push(this.buildStructures());
    actions.push(this.buildUnits());
    actions.push(this.sendScouts());
    
    const attackResult = this.sendWarriors();
    if (attackResult) {
      actions.push(attackResult);
    }
    
    return actions.join(' | ');
  }

  // Abstract methods
  protected abstract collectResources(): string;
  protected abstract buildStructures(): string;
  protected abstract buildUnits(): string;

  // Concrete methods with default implementation
  protected sendScouts(): string {
    return 'Scouts deployed to explore map';
  }

  // Hook method
  protected sendWarriors(): string | null {
    return null; // Default: no attack
  }
}

class AggressiveAI extends GameAI {
  protected collectResources(): string {
    return 'Quickly gathered minimum resources';
  }

  protected buildStructures(): string {
    return 'Built barracks and weapon factories';
  }

  protected buildUnits(): string {
    return 'Mass produced combat units';
  }

  protected sendWarriors(): string {
    return 'Launched full-scale attack on enemy';
  }
}

class DefensiveAI extends GameAI {
  protected collectResources(): string {
    return 'Methodically collected maximum resources';
  }

  protected buildStructures(): string {
    return 'Built walls, towers, and defensive structures';
  }

  protected buildUnits(): string {
    return 'Created balanced army with defensive focus';
  }

  protected sendWarriors(): string {
    return 'Positioned units in defensive formations';
  }
}

class EconomicAI extends GameAI {
  protected collectResources(): string {
    return 'Optimized resource gathering with advanced techniques';
  }

  protected buildStructures(): string {
    return 'Built resource processing and storage facilities';
  }

  protected buildUnits(): string {
    return 'Created worker units and resource gatherers';
  }

  // Override scout behavior for economic focus
  protected sendScouts(): string {
    return 'Scouts sent to find resource deposits';
  }
}

// Document Generation Template
abstract class DocumentGenerator {
  generateDocument(title: string, content: string[]): string {
    const parts: string[] = [];
    
    parts.push(this.createHeader(title));
    parts.push(this.formatContent(content));
    parts.push(this.addFooter());
    
    const metadata = this.addMetadata();
    if (metadata) {
      parts.push(metadata);
    }
    
    return this.finalizeDocument(parts);
  }

  protected abstract createHeader(title: string): string;
  protected abstract formatContent(content: string[]): string;
  protected abstract finalizeDocument(parts: string[]): string;

  // Common method
  protected addFooter(): string {
    return `Generated on ${new Date().toISOString()}`;
  }

  // Hook method
  protected addMetadata(): string | null {
    return null;
  }
}

class HTMLGenerator extends DocumentGenerator {
  protected createHeader(title: string): string {
    return `<html><head><title>${title}</title></head><body><h1>${title}</h1>`;
  }

  protected formatContent(content: string[]): string {
    return content.map(item => `<p>${item}</p>`).join('');
  }

  protected finalizeDocument(parts: string[]): string {
    return parts.join('') + '</body></html>';
  }

  protected addMetadata(): string {
    return '<meta name="generator" content="HTMLGenerator" charset="utf-8">';
  }
}

class MarkdownGenerator extends DocumentGenerator {
  protected createHeader(title: string): string {
    return `# ${title}\n`;
  }

  protected formatContent(content: string[]): string {
    return content.map(item => `${item}\n`).join('\n');
  }

  protected finalizeDocument(parts: string[]): string {
    return parts.join('\n');
  }
}

class PDFGenerator extends DocumentGenerator {
  protected createHeader(title: string): string {
    return `PDF_HEADER: ${title}`;
  }

  protected formatContent(content: string[]): string {
    return `PDF_CONTENT: ${content.join(' | ')}`;
  }

  protected finalizeDocument(parts: string[]): string {
    return `PDF_DOCUMENT[${parts.join(' | ')}]`;
  }

  protected addMetadata(): string {
    return 'PDF_METADATA: Version 1.0, Searchable';
  }
}

// Factory functions
export function createDataProcessors() {
  return {
    csv: new CSVProcessor(),
    json: new JSONProcessor(),
    xml: new XMLProcessor()
  };
}

export function createGameAIs() {
  return {
    aggressive: new AggressiveAI(),
    defensive: new DefensiveAI(),
    economic: new EconomicAI()
  };
}

export function createDocumentGenerators() {
  return {
    html: new HTMLGenerator(),
    markdown: new MarkdownGenerator(),
    pdf: new PDFGenerator()
  };
}

export const metadata: PatternMetadata = {
  title: 'Template Method Pattern',
  category: 'Behavioral',
  difficulty: 'Medium',
  description: 'Define algorithm skeleton, let subclasses override specific steps',
  detailedDescription: `
    ## 📋 Template Method Pattern

    The **Template Method Pattern** defines the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the algorithm's structure.

    ### Core Concepts

    🔹 **Template Method** - Defines algorithm structure with method calls  
    🔹 **Abstract Methods** - Steps that must be implemented by subclasses  
    🔹 **Hook Methods** - Optional steps that subclasses can override  
    🔹 **Concrete Methods** - Shared implementation used by all subclasses

    ### Real-World Applications

    **Data Processing** - Load, validate, transform, save with different formats  
    **Game AI** - Common turn structure with different strategies  
    **Document Generation** - Header, content, footer with different formats  
    **Testing Frameworks** - Setup, execute, teardown with different test types

    ### Method Types

    **Abstract Methods** - Must be overridden (pure virtual functions)  
    **Hook Methods** - Can be overridden (empty default implementation)  
    **Template Methods** - Should not be overridden (final methods)  
    **Concrete Methods** - Shared utilities (common implementation)

    ### Implementation Benefits

    ✅ **Code reuse** - Common algorithm structure shared across subclasses  
    ✅ **Consistent structure** - All implementations follow same pattern  
    ✅ **Flexible customization** - Override only the steps that differ  
    ✅ **Inversion of control** - Framework calls subclass methods
  `,
  useCases: [
    PatternUseCase.CODE_ORGANIZATION,
    PatternUseCase.ALGORITHM_IMPLEMENTATION,
    PatternUseCase.FRAMEWORK_DEVELOPMENT
  ],
  advantages: [
    'Promotes code reuse by extracting common behavior',
    'Enforces consistent algorithm structure',
    'Easy to extend with new implementations',
    'Follows Hollywood principle (don\'t call us, we\'ll call you)'
  ],
  disadvantages: [
    'Limited flexibility - algorithm structure is fixed',
    'Can lead to complex inheritance hierarchies',
    'Liskov Substitution Principle violations possible',
    'Debugging can be difficult across inheritance levels'
  ],
  relatedPatterns: ['Strategy', 'Factory Method', 'Iterator']
};

export const solutions: SolutionMetadata[] = [
  {
    name: 'data-processing',
    title: 'Data Processing Pipeline',
    description: 'Load, validate, transform, save with format-specific implementations',
    isOptimal: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium'
  },
  {
    name: 'game-ai',
    title: 'Game AI Strategy Template',
    description: 'Turn-based AI with different strategic implementations',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Medium'
  },
  {
    name: 'document-generation',
    title: 'Multi-Format Document Generator',
    description: 'Generate documents in HTML, Markdown, PDF formats',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Easy'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'Multi-Format Data Processing',
    scenario: 'Process data through consistent pipeline with format-specific implementations',
    inputExample: `const processors = createDataProcessors();
const data = ['item1', 'item2', null, 'item3', ''];

console.log(processors.csv.processData(data));
console.log('---');
console.log(processors.json.processData(data));`,
    outputExample: `Loaded 5 CSV records → Converted 3 records to CSV format → Saved CSV file with 3 records → Generated CSV summary report
---
Parsed 5 JSON objects → Normalized 3 JSON objects → Stored JSON data in database (3 records)`,
    explanation: 'All processors follow the same pipeline (load → validate → transform → save) but implement steps differently. CSV includes post-processing while JSON does not.'
  },
  {
    title: 'Game AI Strategies',
    scenario: 'Implement different AI strategies using common turn structure',
    inputExample: `const ais = createGameAIs();

console.log('Aggressive AI:');
console.log(ais.aggressive.playTurn());
console.log('\\nDefensive AI:');
console.log(ais.defensive.playTurn());`,
    outputExample: `Aggressive AI:
Quickly gathered minimum resources | Built barracks and weapon factories | Mass produced combat units | Scouts deployed to explore map | Launched full-scale attack on enemy

Defensive AI:
Methodically collected maximum resources | Built walls, towers, and defensive structures | Created balanced army with defensive focus | Scouts deployed to explore map | Positioned units in defensive formations`,
    explanation: 'All AIs follow the same turn sequence but implement each step according to their strategy. Aggressive focuses on quick attacks, Defensive on fortification.'
  },
  {
    title: 'Cross-Format Document Generation',
    scenario: 'Generate documents in multiple formats using consistent structure',
    inputExample: `const generators = createDocumentGenerators();
const title = 'Project Report';
const content = ['Introduction text', 'Main findings', 'Conclusions'];

console.log(generators.html.generateDocument(title, content));
console.log('---');
console.log(generators.markdown.generateDocument(title, content));`,
    outputExample: `<html><head><title>Project Report</title></head><body><h1>Project Report</h1><p>Introduction text</p><p>Main findings</p><p>Conclusions</p>Generated on 2024-01-01T12:00:00.000Z<meta name="generator" content="HTMLGenerator" charset="utf-8"></body></html>
---
# Project Report

Introduction text

Main findings

Conclusions

Generated on 2024-01-01T12:00:00.000Z`,
    explanation: 'All generators follow the same structure (header → content → footer → metadata) but format output differently. HTML adds metadata while Markdown keeps it simple.'
  }
];

export { 
  DataProcessor, CSVProcessor, JSONProcessor, XMLProcessor,
  GameAI, AggressiveAI, DefensiveAI, EconomicAI,
  DocumentGenerator, HTMLGenerator, MarkdownGenerator, PDFGenerator 
};
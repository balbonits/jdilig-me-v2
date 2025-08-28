import React from 'react';
import Link from 'next/link';
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';
import { PatternData, PatternCategory, PatternUseCase } from '@/interfaces/patterns';
import { useAnalytics } from '@/hooks/useAnalytics';
import styles from './style.module.css';

// Complete list of all implemented patterns
const patterns: PatternData[] = [
  // Creational Patterns (5)
  {
    name: 'Singleton',
    slug: 'singleton',
    metadata: {
      title: 'Singleton Pattern',
      description: 'Ensures a class has only one instance with global access point',
      detailedDescription: '🏗️ **The Singleton Pattern - Single Instance Control**\n\nEnsures a class has only one instance while providing global access to that instance. Essential for managing shared resources!',
      concepts: ['object creation', 'global state', 'instance control', 'resource management'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Easy' as const,
      category: 'Creational' as const,
      useCases: [PatternUseCase.STATE_MANAGEMENT, PatternUseCase.CODE_ORGANIZATION],
      realWorldApplications: ['Database connections', 'Logging systems', 'Configuration management'],
      relatedPatterns: ['Factory', 'Builder', 'Prototype'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['DatabaseConnection', 'Logger', 'ConfigManager'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Factory',
    slug: 'factory',
    metadata: {
      title: 'Factory Pattern',
      description: 'Creates objects without specifying their concrete classes',
      detailedDescription: '',
      concepts: ['object creation', 'polymorphism', 'abstraction'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Easy' as const,
      category: 'Creational' as const,
      useCases: [PatternUseCase.API_DESIGN, PatternUseCase.CODE_ORGANIZATION],
      realWorldApplications: ['Component libraries', 'Database adapters', 'Payment systems'],
      relatedPatterns: ['Abstract Factory', 'Builder'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['LoggerFactory', 'UIComponentFactory', 'PaymentProcessorFactory'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Builder',
    slug: 'builder',
    metadata: {
      title: 'Builder Pattern',
      description: 'Construct complex objects step by step',
      detailedDescription: '',
      concepts: ['object creation', 'step-by-step construction', 'fluent interface'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Creational' as const,
      useCases: [PatternUseCase.API_DESIGN, PatternUseCase.CODE_ORGANIZATION],
      realWorldApplications: ['Query builders', 'Configuration objects', 'Form builders'],
      relatedPatterns: ['Factory', 'Abstract Factory'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['QueryBuilder', 'ConfigBuilder', 'FormBuilder'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Prototype',
    slug: 'prototype',
    metadata: {
      title: 'Prototype Pattern',
      description: 'Clone existing objects efficiently',
      detailedDescription: '',
      concepts: ['object cloning', 'prototypal inheritance', 'copy creation'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      difficulty: 'Medium' as const,
      category: 'Creational' as const,
      useCases: [PatternUseCase.PERFORMANCE_OPTIMIZATION, PatternUseCase.DATA_PROCESSING],
      realWorldApplications: ['Object copying', 'Template systems', 'Cache systems'],
      relatedPatterns: ['Factory', 'Memento'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['DeepClone', 'TemplateCloner', 'CachePrototype'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'AbstractFactory',
    slug: 'abstract-factory',
    metadata: {
      title: 'Abstract Factory Pattern',
      description: 'Create families of related objects without specifying concrete classes',
      detailedDescription: '',
      concepts: ['object families', 'product families', 'factory hierarchy'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Hard' as const,
      category: 'Creational' as const,
      useCases: [PatternUseCase.API_DESIGN, PatternUseCase.SYSTEM_INTEGRATION],
      realWorldApplications: ['UI themes', 'Database drivers', 'Cross-platform development'],
      relatedPatterns: ['Factory', 'Builder'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['UIThemeFactory', 'DatabaseFactory', 'PlatformFactory'],
    solutions: [],
    solutionMetadata: []
  },

  // Structural Patterns (7)
  {
    name: 'Decorator',
    slug: 'decorator',
    metadata: {
      title: 'Decorator Pattern',
      description: 'Add new behaviors to objects dynamically without altering structure',
      detailedDescription: '',
      concepts: ['composition over inheritance', 'wrapper objects', 'dynamic behavior'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      difficulty: 'Medium' as const,
      category: 'Structural' as const,
      useCases: [PatternUseCase.CODE_ORGANIZATION, PatternUseCase.API_DESIGN],
      realWorldApplications: ['Express middleware', 'React HOCs', 'Data processing'],
      relatedPatterns: ['Adapter', 'Composite'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['DataProcessorDecorator', 'withRetry', 'createLoggingProxy'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Adapter',
    slug: 'adapter',
    metadata: {
      title: 'Adapter Pattern',
      description: 'Make incompatible interfaces work together',
      detailedDescription: '',
      concepts: ['interface adaptation', 'legacy integration', 'wrapper pattern'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Easy' as const,
      category: 'Structural' as const,
      useCases: [PatternUseCase.API_DESIGN, PatternUseCase.SYSTEM_INTEGRATION],
      realWorldApplications: ['API integration', 'Legacy system integration', 'Third-party libraries'],
      relatedPatterns: ['Bridge', 'Facade'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['APIAdapter', 'LegacyAdapter', 'ServiceAdapter'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Facade',
    slug: 'facade',
    metadata: {
      title: 'Facade Pattern',
      description: 'Simplified interface to complex subsystems',
      detailedDescription: '',
      concepts: ['simplified interface', 'subsystem coordination', 'complexity hiding'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Easy' as const,
      category: 'Structural' as const,
      useCases: [PatternUseCase.API_DESIGN, PatternUseCase.CODE_ORGANIZATION],
      realWorldApplications: ['API wrappers', 'Library interfaces', 'System integration'],
      relatedPatterns: ['Adapter', 'Proxy'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['PaymentFacade', 'DataFacade', 'SystemFacade'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Proxy',
    slug: 'proxy',
    metadata: {
      title: 'Proxy Pattern',
      description: 'Control access to another object',
      detailedDescription: '',
      concepts: ['access control', 'lazy loading', 'caching', 'security'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Structural' as const,
      useCases: [PatternUseCase.PERFORMANCE_OPTIMIZATION, PatternUseCase.DATA_PROCESSING],
      realWorldApplications: ['Image loading', 'API caching', 'Access control'],
      relatedPatterns: ['Decorator', 'Facade'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['ImageProxy', 'CacheProxy', 'SecurityProxy'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Composite',
    slug: 'composite',
    metadata: {
      title: 'Composite Pattern',
      description: 'Compose objects into tree structures to represent part-whole hierarchies',
      detailedDescription: '',
      concepts: ['tree structures', 'part-whole hierarchies', 'uniform interface'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      difficulty: 'Medium' as const,
      category: 'Structural' as const,
      useCases: [PatternUseCase.UI_ARCHITECTURE, PatternUseCase.CODE_ORGANIZATION],
      realWorldApplications: ['File systems', 'UI components', 'Organization charts'],
      relatedPatterns: ['Decorator', 'Iterator'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['FileSystem', 'UIComponent', 'MenuSystem'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Bridge',
    slug: 'bridge',
    metadata: {
      title: 'Bridge Pattern',
      description: 'Separate abstraction from implementation to vary them independently',
      detailedDescription: '',
      concepts: ['abstraction decoupling', 'implementation independence', 'platform abstraction'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Hard' as const,
      category: 'Structural' as const,
      useCases: [PatternUseCase.CROSS_PLATFORM_SUPPORT, PatternUseCase.SYSTEM_INTEGRATION],
      realWorldApplications: ['Graphics rendering', 'Database drivers', 'Platform abstraction'],
      relatedPatterns: ['Adapter', 'Strategy'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['GraphicsRenderer', 'DatabaseBridge', 'PlatformBridge'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Flyweight',
    slug: 'flyweight',
    metadata: {
      title: 'Flyweight Pattern',
      description: 'Share common state efficiently among large numbers of objects',
      detailedDescription: '',
      concepts: ['memory optimization', 'shared state', 'intrinsic vs extrinsic'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(k)',
      difficulty: 'Hard' as const,
      category: 'Structural' as const,
      useCases: [PatternUseCase.PERFORMANCE_OPTIMIZATION, PatternUseCase.MEMORY_MANAGEMENT],
      realWorldApplications: ['Text editors', 'Game development', 'Graphics systems'],
      relatedPatterns: ['Factory', 'Composite'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['CharacterFlyweight', 'TreeFlyweight', 'ParticleFlyweight'],
    solutions: [],
    solutionMetadata: []
  },

  // Behavioral Patterns (10)
  {
    name: 'Observer',
    slug: 'observer',
    metadata: {
      title: 'Observer Pattern',
      description: 'Notify multiple objects about state changes automatically',
      detailedDescription: '',
      concepts: ['event handling', 'state management', 'reactive programming'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.STATE_MANAGEMENT, PatternUseCase.EVENT_HANDLING],
      realWorldApplications: ['Event systems', 'Model-View architectures', 'Real-time updates'],
      relatedPatterns: ['Mediator', 'Command'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['EventEmitter', 'StateManager', 'NewsletterService'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Strategy',
    slug: 'strategy',
    metadata: {
      title: 'Strategy Pattern',
      description: 'Encapsulate algorithms and make them interchangeable at runtime',
      detailedDescription: '',
      concepts: ['algorithm encapsulation', 'runtime switching', 'polymorphism'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.CODE_ORGANIZATION, PatternUseCase.API_DESIGN],
      realWorldApplications: ['Payment processing', 'Sorting algorithms', 'Validation strategies'],
      relatedPatterns: ['State', 'Bridge'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['PaymentStrategy', 'SortStrategy', 'ValidationStrategy'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Command',
    slug: 'command',
    metadata: {
      title: 'Command Pattern',
      description: 'Encapsulate requests as objects',
      detailedDescription: '',
      concepts: ['request encapsulation', 'undo/redo', 'queuing', 'logging'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.REQUEST_PROCESSING, PatternUseCase.EVENT_HANDLING],
      realWorldApplications: ['GUI actions', 'Task queues', 'Macro recording'],
      relatedPatterns: ['Memento', 'Observer'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['TaskCommand', 'MacroCommand', 'UndoCommand'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'State',
    slug: 'state',
    metadata: {
      title: 'State Pattern',
      description: 'Change object behavior based on internal state',
      detailedDescription: '',
      concepts: ['state management', 'behavior change', 'state machines'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.STATE_MANAGEMENT, PatternUseCase.UI_ARCHITECTURE],
      realWorldApplications: ['Game states', 'UI states', 'Workflow systems'],
      relatedPatterns: ['Strategy', 'Singleton'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['GameState', 'UIState', 'WorkflowState'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'ChainOfResponsibility',
    slug: 'chain-of-responsibility',
    metadata: {
      title: 'Chain of Responsibility Pattern',
      description: 'Pass requests along a chain of handlers until one handles it',
      detailedDescription: '',
      concepts: ['request handling', 'handler chain', 'responsibility delegation'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.REQUEST_PROCESSING, PatternUseCase.MIDDLEWARE_SYSTEMS],
      realWorldApplications: ['Middleware', 'Event handling', 'Support systems'],
      relatedPatterns: ['Command', 'Composite'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['MiddlewareChain', 'SupportChain', 'ValidationChain'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'TemplateMethod',
    slug: 'template-method',
    metadata: {
      title: 'Template Method Pattern',
      description: 'Define algorithm skeleton, let subclasses override specific steps',
      detailedDescription: '',
      concepts: ['algorithm template', 'inheritance', 'hook methods'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.CODE_ORGANIZATION, PatternUseCase.FRAMEWORK_DEVELOPMENT],
      realWorldApplications: ['Data processing', 'Testing frameworks', 'Code generation'],
      relatedPatterns: ['Strategy', 'Factory Method'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['DataProcessor', 'TestRunner', 'CodeGenerator'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Visitor',
    slug: 'visitor',
    metadata: {
      title: 'Visitor Pattern',
      description: 'Separate algorithms from objects they operate on',
      detailedDescription: '',
      concepts: ['double dispatch', 'operation separation', 'object traversal'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      difficulty: 'Hard' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.COMPILER_DESIGN, PatternUseCase.DATA_PROCESSING],
      realWorldApplications: ['AST processing', 'File system traversal', 'Code analysis'],
      relatedPatterns: ['Composite', 'Iterator'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['ASTVisitor', 'FileVisitor', 'AnalysisVisitor'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Mediator',
    slug: 'mediator',
    metadata: {
      title: 'Mediator Pattern',
      description: 'Reduce coupling by centralizing complex communications',
      detailedDescription: '',
      concepts: ['communication mediation', 'loose coupling', 'centralized control'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.UI_ARCHITECTURE, PatternUseCase.EVENT_HANDLING],
      realWorldApplications: ['Chat systems', 'UI coordination', 'Air traffic control'],
      relatedPatterns: ['Observer', 'Facade'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['ChatMediator', 'UIMediator', 'SystemMediator'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Memento',
    slug: 'memento',
    metadata: {
      title: 'Memento Pattern',
      description: 'Capture and restore object state without violating encapsulation',
      detailedDescription: '',
      concepts: ['state capture', 'undo/redo', 'encapsulation preservation'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.STATE_MANAGEMENT, PatternUseCase.DATA_BACKUP],
      realWorldApplications: ['Text editors', 'Game saves', 'Transaction rollback'],
      relatedPatterns: ['Command', 'Iterator'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['EditorMemento', 'GameSave', 'TransactionMemento'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Iterator',
    slug: 'iterator',
    metadata: {
      title: 'Iterator Pattern',
      description: 'Access elements sequentially without exposing underlying structure',
      detailedDescription: '',
      concepts: ['sequential access', 'collection traversal', 'encapsulation'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Behavioral' as const,
      useCases: [PatternUseCase.DATA_PROCESSING, PatternUseCase.COLLECTION_TRAVERSAL],
      realWorldApplications: ['Data structures', 'File processing', 'Stream processing'],
      relatedPatterns: ['Composite', 'Factory Method'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['ArrayIterator', 'TreeIterator', 'StreamIterator'],
    solutions: [],
    solutionMetadata: []
  },

  // Modern JavaScript/TypeScript Patterns (5)
  {
    name: 'Module',
    slug: 'module',
    metadata: {
      title: 'Module Pattern',
      description: 'Encapsulate code using closures to create private scope',
      detailedDescription: '',
      concepts: ['encapsulation', 'closures', 'private variables'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Modern' as const,
      useCases: [PatternUseCase.CODE_ORGANIZATION, PatternUseCase.LIBRARY_DEVELOPMENT],
      realWorldApplications: ['Library development', 'Namespace management', 'State encapsulation'],
      relatedPatterns: ['Revealing Module', 'Singleton'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['CounterModule', 'CalculatorModule', 'UtilityModule'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'RevealingModule',
    slug: 'revealing-module',
    metadata: {
      title: 'Revealing Module Pattern',
      description: 'Define all functions privately, then reveal selected ones publicly',
      detailedDescription: '',
      concepts: ['selective exposure', 'clean API', 'private by default'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Medium' as const,
      category: 'Modern' as const,
      useCases: [PatternUseCase.API_DESIGN, PatternUseCase.LIBRARY_DEVELOPMENT],
      realWorldApplications: ['API clients', 'Calculator libraries', 'Event systems'],
      relatedPatterns: ['Module', 'Facade'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['APIClient', 'EventSystem', 'ConfigManager'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'Mixin',
    slug: 'mixin',
    metadata: {
      title: 'Mixin Pattern',
      description: 'Compose objects from multiple sources to achieve multiple inheritance',
      detailedDescription: '',
      concepts: ['composition', 'multiple inheritance', 'trait sharing'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      difficulty: 'Hard' as const,
      category: 'Modern' as const,
      useCases: [PatternUseCase.CODE_ORGANIZATION, PatternUseCase.FRAMEWORK_DEVELOPMENT],
      realWorldApplications: ['Component systems', 'Behavior composition', 'Trait libraries'],
      relatedPatterns: ['Decorator', 'Strategy'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['TimestampedMixin', 'ValidatableMixin', 'ObservableMixin'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'AsyncIterator',
    slug: 'async-iterator',
    metadata: {
      title: 'Async Iterator Pattern',
      description: 'Process asynchronous data streams using modern iteration protocols',
      detailedDescription: '',
      concepts: ['async iteration', 'stream processing', 'lazy evaluation'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      difficulty: 'Hard' as const,
      category: 'Modern' as const,
      useCases: [PatternUseCase.DATA_PROCESSING, PatternUseCase.STREAM_PROCESSING],
      realWorldApplications: ['API pagination', 'File processing', 'Real-time data'],
      relatedPatterns: ['Iterator', 'Observer'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['PaginatedIterator', 'FileIterator', 'StreamIterator'],
    solutions: [],
    solutionMetadata: []
  },
  {
    name: 'ProxyObservables',
    slug: 'proxy-observables',
    metadata: {
      title: 'Proxy-Based Observables',
      description: 'Create reactive objects using ES6 Proxy for automatic change detection',
      detailedDescription: '',
      concepts: ['reactivity', 'proxy objects', 'automatic detection'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      difficulty: 'Hard' as const,
      category: 'Modern' as const,
      useCases: [PatternUseCase.STATE_MANAGEMENT, PatternUseCase.REACTIVE_SYSTEMS],
      realWorldApplications: ['State management', 'Form validation', 'Data binding'],
      relatedPatterns: ['Observer', 'Proxy'],
      advantages: [],
      disadvantages: []
    },
    examples: [],
    code: '',
    functions: ['ProxyObservable', 'ReactiveState', 'FormValidator'],
    solutions: [],
    solutionMetadata: []
  }
];

const categoryEmojis: Record<PatternCategory, string> = {
  'Creational': '🏗️',
  'Structural': '🔗',
  'Behavioral': '🎭',
  'Modern': '⚡'
};

const categoryDescriptions: Record<PatternCategory, string> = {
  'Creational': 'Object creation patterns',
  'Structural': 'Object composition patterns', 
  'Behavioral': 'Object interaction patterns',
  'Modern': 'Modern JavaScript/TypeScript patterns'
};

export default function PatternsPage() {
  const { trackNavigation, trackEngagement } = useAnalytics();

  // Group patterns by category
  const patternsByCategory = patterns.reduce((acc, pattern) => {
    const category = pattern.metadata.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(pattern);
    return acc;
  }, {} as Record<PatternCategory, PatternData[]>);

  // Sort categories in preferred order
  const sortedCategories: PatternCategory[] = ['Creational', 'Behavioral', 'Structural', 'Modern'];

  const handlePatternClick = (slug: string, category: string) => {
    trackNavigation(`/code/patterns/${slug}`, 'pattern-card');
    trackEngagement('click', `pattern-${category.toLowerCase()}-${slug}`);
  };

  return (
    <PageContainer>
      <PageHeader title="Design Patterns">
        Software design solutions in TypeScript. Proven patterns for building maintainable, scalable applications.
      </PageHeader>

      <SectionContainer>
        <Section title="Overview">
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{patterns.length}</span>
              <span className={styles.statLabel}>Patterns</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{Object.keys(patternsByCategory).length}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>3-5</span>
              <span className={styles.statLabel}>Solutions Each</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>TypeScript</span>
            </div>
          </div>
        </Section>
      </SectionContainer>

      {sortedCategories.map(category => {
        const categoryPatterns = patternsByCategory[category];
        if (!categoryPatterns || categoryPatterns.length === 0) return null;

        return (
          <SectionContainer key={category}>
            <Section 
              title={`${categoryEmojis[category]} ${category} (${categoryPatterns.length})`}
              description={categoryDescriptions[category]}
            >
              <Grid>
                {categoryPatterns.map(pattern => (
                  <Link 
                    key={pattern.slug}
                    href={`/code/patterns/${pattern.slug}`}
                    className={styles.patternLink}
                    onClick={() => handlePatternClick(pattern.slug, category)}
                  >
                    <Card className={styles.patternCard}>
                      <div className={styles.patternCardHeader}>
                        <h3 className={styles.patternTitle}>{pattern.metadata.title}</h3>
                        <div className={styles.patternBadges}>
                          <span className={`${styles.difficultyBadge} ${styles[pattern.metadata.difficulty.toLowerCase()]}`}>
                            {pattern.metadata.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <p className={styles.patternDescription}>
                        {pattern.metadata.description}
                      </p>
                      
                      <div className={styles.patternMeta}>
                        <div className={styles.complexity}>
                          <span className={styles.complexityLabel}>Time:</span>
                          <code className={styles.complexityValue}>{pattern.metadata.timeComplexity}</code>
                        </div>
                        <div className={styles.complexity}>
                          <span className={styles.complexityLabel}>Space:</span>
                          <code className={styles.complexityValue}>{pattern.metadata.spaceComplexity}</code>
                        </div>
                      </div>
                      
                      <div className={styles.useCases}>
                        {pattern.metadata.useCases.slice(0, 2).map(useCase => (
                          <span key={useCase} className={styles.useCaseTag}>
                            {useCase}
                          </span>
                        ))}
                        {pattern.metadata.useCases.length > 2 && (
                          <span className={styles.useCaseTag}>
                            +{pattern.metadata.useCases.length - 2} more
                          </span>
                        )}
                      </div>
                      
                      <div className={styles.patternFooter}>
                        <div className={styles.solutionCount}>
                          3-5 solutions
                        </div>
                        <div className={styles.realWorldApps}>
                          {pattern.metadata.realWorldApplications?.length || 3} real-world uses
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </Section>
          </SectionContainer>
        );
      })}

      <SectionContainer>
        <Section title="Why Learn Design Patterns?" description="Understanding the value of proven software design solutions">
          <Grid className={styles.featureGrid}>
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>🧠</div>
              <h3 className={styles.featureTitle}>Problem-Solving Skills</h3>
              <p className={styles.featureDescription}>
                Learn proven solutions to common software design problems. Each pattern addresses specific challenges you&apos;ll encounter in real development.
              </p>
            </Card>
            
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3 className={styles.featureTitle}>Developer Communication</h3>
              <p className={styles.featureDescription}>
                Establish a shared vocabulary with other developers. Patterns provide a common language for discussing software architecture.
              </p>
            </Card>
            
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Modern Implementation</h3>
              <p className={styles.featureDescription}>
                See how classic patterns apply to modern JavaScript/TypeScript development, including functional programming approaches.
              </p>
            </Card>
            
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>🔧</div>
              <h3 className={styles.featureTitle}>Practical Examples</h3>
              <p className={styles.featureDescription}>
                Every pattern includes real-world scenarios and multiple implementation approaches you can use in your projects today.
              </p>
            </Card>
          </Grid>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
}
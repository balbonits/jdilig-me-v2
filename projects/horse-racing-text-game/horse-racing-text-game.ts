import { ProjectData } from '@/interfaces/projects';

const horseRacingTextGame: ProjectData = {
  slug: 'horse-racing-text-game',
  metadata: {
    title: 'Horse Racing Text Game',
    name: 'horse-racing-text-game',
    description: 'Advanced terminal-based horse racing simulation with sophisticated progression systems',
    detailedDescription: `A comprehensive terminal-based horse racing simulation game showcasing advanced software engineering practices, state machine architecture, and TDD methodology. Features sophisticated progression systems, comprehensive testing, and polished user experience.

## Key Features

- **Advanced State Machine**: O(1) input handling with Map-based routing replacing linear switch-case patterns
- **Sophisticated Progression**: Dual bond and form systems with horse racing terminology and strategic depth  
- **Comprehensive Testing**: 24+ test files with snapshot testing for visual regression and 95% code coverage
- **Terminal UI Excellence**: ASCII progress bars, color-coded interfaces, and responsive terminal layouts

## Technical Implementation

- **Performance Architecture**: State transition validation O(1) average via Map + Set lookup vs O(n) switch-case
- **TDD Methodology**: Test-driven development with comprehensive unit, integration, and E2E testing suites
- **Clean Architecture**: SOLID principles with factory patterns, observer pattern, and strategy pattern implementation
- **Modern JavaScript**: ES6+ features, async/await, modules with efficient data structures and algorithms

## Development Process

- **AI-Assisted Development**: Collaborative development showcasing effective human-AI partnership for technical implementation
- **Iterative Design**: Progressive feature development with continuous testing and balance validation
- **Quality Assurance**: Multiple testing strategies including snapshot tests, performance testing, and game balance validation`,
    category: 'AI/CLI Development',
    startDate: '2024-08',
    role: 'Full-Stack Developer',
    difficulty: 'Hard',
    featured: true
  },
  techStack: [
    {
      category: 'Core Technologies',
      items: ['Node.js', 'JavaScript ES6+', 'Terminal UI (blessed)', 'ASCII Art']
    },
    {
      category: 'Architecture & Patterns',
      items: ['State Machine Pattern', 'Factory Pattern', 'Observer Pattern', 'Event-driven Architecture']
    },
    {
      category: 'Testing & Quality',
      items: ['Jest Testing Framework', 'Snapshot Testing', 'TDD Methodology', 'Code Coverage Analysis']
    },
    {
      category: 'Development Tools',
      items: ['Git Version Control', 'NPM Package Management', 'ESLint', 'Cross-platform Terminal Support']
    }
  ],
  features: [
    {
      title: 'Advanced State Machine Architecture',
      description: 'O(1) input handling with graph-based navigation and Map/Set data structures',
      impact: 'Eliminated linear search patterns for scalable performance and maintainable code architecture'
    },
    {
      title: 'Dual Progression Systems',
      description: 'Bond system (player-horse relationship) and Form system (dynamic condition) with strategic depth',
      impact: 'Created engaging 15-minute gameplay sessions with meaningful long-term and short-term decision making'
    },
    {
      title: 'Comprehensive Testing Suite',
      description: '24+ test files covering unit, integration, E2E, balance, and visual regression testing',
      impact: 'Achieved 95% code coverage with robust quality assurance and confident refactoring capabilities'
    },
    {
      title: 'Terminal UI Excellence',
      description: 'ASCII progress bars, color-coded interfaces, and responsive layouts for professional presentation',
      impact: 'Delivered polished user experience rivaling modern GUI applications in terminal environment'
    }
  ],
  highlights: [
    {
      title: 'Performance Optimization Achievement',
      description: 'Transformed O(n) switch-case input handling into O(1) Map-based routing system',
      achievements: ['Eliminated linear search patterns', 'Scalable state management', 'Efficient memory usage O(V + E)']
    },
    {
      title: 'Advanced Testing Implementation',
      description: 'Comprehensive test strategy with snapshot testing for terminal UI visual regression',
      achievements: ['24+ test files across multiple categories', '95% code coverage achieved', 'Visual regression prevention']
    },
    {
      title: 'Game Balance & Design',
      description: 'Mathematically balanced progression systems with strategic depth and replayability',
      achievements: ['15-minute target session length achieved', 'Multiple viable strategies implemented', 'Legacy system for cross-career progression']
    }
  ],
  screenshots: [
    {
      src: '/images/projects/horse-racing-text-game/01-main-menu-desktop.webp',
      alt: 'Main menu interface with ASCII art and navigation options',
      caption: 'Clean terminal interface with professional presentation and clear navigation',
      category: 'desktop'
    },
    {
      src: '/images/projects/horse-racing-text-game/02-training-interface-desktop.webp',
      alt: 'Training interface showing horse stats, progress bars, and training options',
      caption: 'Comprehensive training interface with visual progress indicators and strategic options',
      category: 'feature'
    },
    {
      src: '/images/projects/horse-racing-text-game/05-race-animation-desktop.webp',
      alt: 'Race animation in progress showing horses competing',
      caption: 'Live race animation with real-time positioning and progress tracking',
      category: 'feature'
    },
    {
      src: '/images/projects/horse-racing-text-game/03-race-results-desktop.webp',
      alt: 'Race results screen with detailed performance statistics',
      caption: 'Race results with detailed statistics showing multi-factor performance calculation',
      category: 'feature'
    },
    {
      src: '/images/projects/horse-racing-text-game/04-career-completion-desktop.webp',
      alt: 'Career completion screen with grading and achievements',
      caption: 'Career summary with S/A/B/C/D/F grading system and achievement recognition',
      category: 'feature'
    }
  ],
  links: [
    {
      type: 'github',
      url: 'https://github.com/balbonits/horse-racing-text-game',
      label: 'GitHub Repository'
    },
    {
      type: 'demo',
      url: 'https://github.com/balbonits/horse-racing-text-game?tab=readme-ov-file#-how-to-play',
      label: 'Installation Guide'
    }
  ],
  metrics: [
    {
      label: 'Test Coverage',
      value: '95%',
      description: '24+ test files covering unit, integration, E2E, and snapshot testing'
    },
    {
      label: 'Performance',
      value: 'O(1) Input',
      description: 'State machine with Map-based routing vs O(n) switch-case patterns'
    },
    {
      label: 'Code Quality',
      value: '100% ES6+',
      description: 'Modern JavaScript with clean architecture and design patterns'
    },
    {
      label: 'Features',
      value: '25+ Modules',
      description: 'Comprehensive game systems with 3,000+ lines of production code'
    }
  ],
  lessons: [
    'Advanced state machine architecture with O(1) performance optimization for scalable input handling',
    'Comprehensive test-driven development including visual regression testing for terminal applications',
    'Professional terminal UI design with ASCII art and cross-platform compatibility considerations',
    'Mathematical game balance modeling to achieve target 15-minute session engagement',
    'AI-assisted development demonstrating effective human-AI collaboration for technical implementation'
  ],
  challenges: [
    'Optimizing state transitions from O(n) to O(1) while maintaining clean, readable architecture',
    'Designing engaging terminal interface with professional presentation rivaling modern GUI applications', 
    'Balancing sophisticated game mechanics with accessibility for casual 15-minute sessions',
    'Implementing snapshot testing for terminal UI visual regression in CLI environment',
    'Coordinating complex interdependent systems (progression, racing, career management) cohesively'
  ],
  futureImprovements: [
    'Enhanced horse specialization system with breed-specific traits and racing preferences',
    'Machine learning integration for more sophisticated AI opponent behaviors and strategies',
    'Optional web interface while preserving the authentic terminal experience',
    'Cloud save synchronization for cross-device career persistence',
    'Performance analytics dashboard for detailed gameplay statistics and improvement tracking'
  ]
};

export default horseRacingTextGame;
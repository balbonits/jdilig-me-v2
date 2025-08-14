import { ProjectData } from '@/interfaces/projects';

const project: ProjectData = {
  slug: 'personal-website-v2',
  metadata: {
    title: 'Personal Website v2',
    name: 'jdilig-me-v2',
    description: 'A modern, accessible personal website with unified design system and component-driven architecture.',
    detailedDescription: 'Complete rebuild featuring a unified UI component system, modular architecture, and comprehensive testing. Includes advanced features like interactive code showcases, modal systems, 7-color rotation design patterns, and full accessibility compliance with WCAG 2.1 AA standards.',
    category: 'Full-Stack Development',
    status: 'completed',
    startDate: '2024-11',
    endDate: '2025-01',
    duration: '3 months',
    role: 'Full-Stack Developer & Designer',
    difficulty: 'Expert',
    featured: true
  },
  techStack: [
    {
      category: 'Frontend Framework',
      items: ['Next.js 15', 'React 18', 'TypeScript']
    },
    {
      category: 'Styling & Design',
      items: ['Tailwind CSS v4', 'CSS Modules', 'Mobile-first Responsive Design']
    },
    {
      category: 'Testing & Quality',
      items: ['Jest', 'React Testing Library', 'Playwright E2E', 'ESLint', 'TypeScript Strict Mode']
    },
    {
      category: 'Architecture & Performance',
      items: ['Static Site Generation (SSG)', 'Custom Hooks', 'Modular Components', 'Path Aliases']
    },
    {
      category: 'Accessibility & UX',
      items: ['WCAG 2.1 AA Compliance', 'ARIA Implementation', 'Keyboard Navigation', 'Screen Reader Support']
    }
  ],
  features: [
    {
      title: 'Interactive Code Showcase System',
      description: 'Dynamic display of algorithm exercises and utility functions with live examples, complexity analysis, and multiple solution approaches.',
      impact: 'Enables visitors to explore 15+ algorithm exercises and 14+ utility functions with comprehensive documentation.'
    },
    {
      title: 'Advanced Modal System',
      description: 'Custom useModal hook with TypeScript generics, proper z-index stacking, and container overflow prevention.',
      impact: 'Provides seamless user interaction for code examples without layout issues.'
    },
    {
      title: 'Comprehensive Accessibility Implementation',
      description: 'Full WCAG 2.1 AA compliance with ARIA labels, semantic HTML, keyboard navigation, and screen reader optimization.',
      impact: 'Ensures the website is usable by everyone, including users with disabilities.'
    },
    {
      title: 'Multi-shape Profile Image Component',
      description: 'Flexible ProfileImage component supporting circle, box, rounded, and hexagon shapes with Next.js optimization.',
      impact: 'Provides visual variety and performance optimization across different page contexts.'
    },
    {
      title: 'Robust Testing Infrastructure',
      description: 'Comprehensive test coverage with unit tests (Jest), E2E tests (Playwright), and visual regression testing.',
      impact: 'Ensures code quality and prevents regressions across 5 browser environments.'
    },
    {
      title: 'Modular Component Architecture',
      description: 'Unified UI component system with consistent patterns, CSS Modules, and clean separation of concerns.',
      impact: 'Enables rapid development and easy maintenance with reusable, scalable components.'
    },
    {
      title: 'Unified Design System with Color Variants',
      description: '7-color rotation system with colorVariant props for visual differentiation across Card components.',
      impact: 'Provides consistent visual hierarchy while eliminating CSS anti-patterns and repetitive styling.'
    }
  ],
  metrics: [
    {
      label: 'Test Coverage',
      value: '84+ tests',
      description: '30 E2E tests across 5 browsers + 54 unit tests'
    },
    {
      label: 'Performance',
      value: '38 pages',
      description: 'Static site generation with optimized bundle sizes'
    },
    {
      label: 'Code Quality',
      value: '100% TypeScript',
      description: 'Strict mode with comprehensive type safety'
    },
    {
      label: 'Components',
      value: '15+ UI components',
      description: 'Reusable, tested, and documented'
    }
  ],
  highlights: [
    {
      title: 'Custom Modal Hook Implementation',
      description: 'Created a reusable TypeScript hook for modal state management with proper positioning and accessibility.',
      code: 'export function useModal<T = unknown>(): UseModalReturn<T> {\n  const [isOpen, setIsOpen] = useState(false);\n  const [data, setData] = useState<T | null>(null);\n\n  const openModal = useCallback((modalData: T) => {\n    setData(modalData);\n    setIsOpen(true);\n  }, []);\n\n  const closeModal = useCallback(() => {\n    setIsOpen(false);\n    setData(null);\n  }, []);\n\n  return { isOpen, data, openModal, closeModal };\n}',
      achievements: [
        'TypeScript generics for type safety',
        'Proper z-index stacking (9999)',
        'Container overflow prevention',
        'Keyboard accessibility support'
      ]
    },
    {
      title: 'Comprehensive Testing Strategy',
      description: 'Multi-layered testing approach ensuring quality and reliability across all components and user interactions.',
      achievements: [
        '30 E2E tests across Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari',
        '54 unit tests with React Testing Library',
        'Visual regression testing with Playwright screenshots',
        'Accessibility testing with ARIA validation',
        'ESLint strict compliance with TypeScript rules'
      ]
    },
    {
      title: 'Modular Component System',
      description: 'Built a unified UI component library following consistent patterns and best practices.',
      achievements: [
        'index.tsx → script.tsx → style.module.css pattern',
        'Mobile-first responsive design approach',
        'CSS custom properties for theming',
        'Path aliases (@/) for clean imports',
        'Generic and reusable component design'
      ]
    },
    {
      title: 'Advanced Algorithm Showcase',
      description: 'Dynamic system for displaying coding exercises with complexity analysis and optimal solution detection.',
      achievements: [
        'Automatic optimal solution detection based on time complexity',
        'Tabbed interface with multiple algorithmic approaches',
        'Live example cases with input/output validation',
        'Comprehensive metadata including difficulty levels',
        'Static JSON generation for performance'
      ]
    }
  ],
  links: [
    {
      type: 'live',
      url: 'https://jdilig.me',
      label: 'Live Website'
    },
    {
      type: 'github',
      url: 'https://github.com/johndilig/jdilig-me-v2',
      label: 'Source Code'
    }
  ],
  lessons: [
    'Modal positioning requires careful consideration of z-index and container overflow',
    'TypeScript generics greatly improve hook reusability and type safety',
    'Comprehensive testing prevents regressions and improves confidence in deployments',
    'Mobile-first design approach leads to better responsive experiences',
    'Path aliases significantly improve code maintainability and readability',
    'Accessibility should be built-in from the start, not added as an afterthought'
  ],
  challenges: [
    'Tailwind CSS v4 theme() functions not working properly - required fallback CSS values',
    'Modal container overflow issues required architectural changes to move modals to page level',
    'Test file organization needed adjustment to prevent Next.js build conflicts',
    'Balancing component reusability with specific use case requirements'
  ],
  futureImprovements: [
    'Add more interactive code examples with live execution',
    'Implement advanced filtering and search for code showcase',
    'Add more project case studies and detailed documentation',
    'Enhance accessibility with voice navigation support',
    'Implement progressive web app features',
    'Add internationalization support'
  ]
};

export default project;

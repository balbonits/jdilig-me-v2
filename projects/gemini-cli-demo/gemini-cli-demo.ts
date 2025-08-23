import { ProjectData } from '@/interfaces/projects';

const project: ProjectData = {
  slug: 'gemini-cli-demo',
  metadata: {
    title: 'Gemini CLI Demo',
    name: 'gemini-cli-demo',
    description: 'A showcase of web component-based applications built with Gemini CLI.',
    detailedDescription: `This project showcases web component-based applications built entirely by Gemini, Google's large language model. The showcase demonstrates Gemini's ability to understand high-level requirements, break them down into smaller tasks, and generate complete web applications.

Key Features:
- Multiple self-contained web component applications
- Each app launches in a modal window for focused interaction  
- Comprehensive application suite: To-Do List, Calculator, Weather App, Drawing App, Data Visualization, and JSFiddle Clone
- Pure vanilla JavaScript implementation with modern Web Components architecture

Technical Implementation:
- Framework-free architecture built with vanilla JavaScript, HTML, and CSS (Chart.js only exception for data visualization)
- Web Components standard with each application and sub-component implemented as custom elements
- Modular file structure with organized directory system and each app in its own namespace
- Modern JavaScript ES6+ features with clean, maintainable code patterns

Development Process:
- AI-human collaboration built through iterative collaboration between user requirements and Gemini's code generation
- Natural language driven development based on conversational prompts and requirements  
- Automated documentation with project structure and documentation generated alongside the codebase`,
    category: 'AI/CLI Development',
    startDate: '2025-08',
    role: 'AI Interaction Designer & Project Lead',
    difficulty: 'Medium',
    featured: false
  },
  techStack: [
    {
      category: 'AI Integration',
      items: ['Google Gemini API']
    },
    {
      category: 'Frontend Development',
      items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Web Components']
    },
    {
      category: 'Development Tools',
      items: ['Vercel', 'GitHub']
    }
  ],
  features: [
    {
      title: 'AI-Powered Development',
      description: 'The entire project was built by Gemini, demonstrating the power of AI in software development.',
      impact: 'Showcases the potential of AI to accelerate the development process and build complete applications from scratch.'
    },
    {
      title: 'Web Component Showcase',
      description: 'A collection of self-contained web component-based applications.',
      impact: 'Demonstrates the use of modern web technologies to build modular and reusable UI components without frameworks.'
    }
  ],
  highlights: [
    {
      title: 'Exploring AI Capabilities',
      description: 'The main challenge was to test a new AI model and figure out how to measure its success while still learning and exploring the AI space.',
      achievements: ['The showcase project provided a concrete way to explore the capabilities of Gemini CLI.', 'The project served as a hands-on learning experience in the AI space.']
    },
    {
      title: 'Overcoming Preconceptions',
      description: 'Another challenge was to overcome previous negative experiences with other AI chat apps and give Gemini CLI a fair chance.',
      achievements: ['Successfully detached from past experiences and evaluated the tool on its own merits.', 'Recognized the difference between a chat app and a CLI tool.']
    }
  ],
  links: [
    {
      type: 'github',
      url: 'https://github.com/balbonits/gemini-cli-demo',
      label: 'GitHub Repository'
    },
    {
      type: 'live',
      url: 'https://gemini-cli-demo.vercel.app/',
      label: 'Live Demo'
    }
  ],
  lessons: [
    'The potential of AI as a development partner.',
    'The power of Web Components for building modular and framework-free applications.',
    'The importance of clear communication and iterative development when working with AI.'
  ],
  challenges: [
    'Figuring out how to test a new AI model and measure its success.',
    'Overcoming preconceptions about AI tools based on past experiences.'
  ],
  futureImprovements: [
    'Add more complex applications to the showcase.',
    'Explore different ways to interact with the AI to build applications.',
    'Integrate more third-party APIs and libraries.'
  ],
  screenshots: [
    {
      src: '/images/projects/gemini-cli-demo/01-desktop-homepage-desktop.webp',
      alt: 'Gemini CLI Demo Homepage',
      caption: 'Main landing page showcasing web component-based applications built with Gemini CLI',
      category: 'desktop'
    },
    {
      src: '/images/projects/gemini-cli-demo/02-feature-todo-app-feature.webp',
      alt: 'Todo App Feature',
      caption: 'Interactive todo list application demonstrating state management and user interaction',
      category: 'feature'
    },
    {
      src: '/images/projects/gemini-cli-demo/03-feature-drawing-app-feature.webp',
      alt: 'Drawing App Feature',
      caption: 'Creative drawing application showcasing canvas manipulation and tool selection',
      category: 'feature'
    }
  ],
  metrics: []
};

export default project;
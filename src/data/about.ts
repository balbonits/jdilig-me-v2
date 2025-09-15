import { CardColorVariant } from '@/types';
import { ContactItem } from '@/components/ui/ContactSection';

// Journey/Values Data
export interface JourneyItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: CardColorVariant;
}

export const journeyData: JourneyItem[] = [
  {
    id: 'frontend-focus',
    icon: '🚀',
    title: 'Frontend Focus',
    description: 'Specializing in React ecosystems, modern JavaScript, and creating high-performance user interfaces that serve millions of users.',
    color: 'blue'
  },
  {
    id: 'problem-solver',
    icon: '💡',
    title: 'Problem Solver',
    description: 'From building scalable cloud dashboards at AWS to optimizing video players at FOXSports.com, I tackle complex challenges with elegant solutions at scale.',
    color: 'purple'
  },
  {
    id: 'growth-mindset',
    icon: '📈',
    title: 'Growth Mindset',
    description: 'Continuously learning new technologies while mentoring teams and sharing knowledge across organizations.',
    color: 'teal'
  },
  {
    id: 'user-advocate',
    icon: '🎯',
    title: 'User Advocate',
    description: 'Passionate about accessibility and inclusive design, ensuring web experiences work seamlessly for users of all abilities and devices.',
    color: 'orange'
  }
];

// Experience Data
export interface ExperienceItem {
  id: string;
  icon: string;
  title: string;
  badge: string;
  description: string;
  color: CardColorVariant;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'fox',
    icon: '🏆',
    title: 'FOX Sports',
    badge: 'Front-End Developer • March 2012-August 2019',
    description: 'Elevated UI/UX on FOXSports.com, FX.com, FOXNation.com, boosting engagement, accessibility, performance markedly. Managed live coverage (e.g., 2018 FIFA World Cup) for real-time updates in peak traffic.',
    color: 'orange'
  },
  {
    id: 'aws',
    icon: '☁️',
    title: 'Amazon Web Services',
    badge: 'Front-End Developer • July 2022-May 2023',
    description: 'Enhanced AWS QuickSight UI with TypeScript/React.js, improving engagement and efficiency notably. Optimized performance by resolving UI bugs for seamless experiences.',
    color: 'pink'
  },
  {
    id: 'tbn',
    icon: '📡',
    title: 'Trinity Broadcasting Network',
    badge: 'React/CMS Developer • June 2023-August 2024',
    description: 'Enhanced web presence with cross-platform UX/UI and CMS integration, boosting user engagement significantly. Implemented subscription flows for TBNPlus.com and MeritPlus.com, introducing revenue streams via adaptive solutions.',
    color: 'green'
  },
  {
    id: 'freelance',
    icon: '💼',
    title: 'Freelance & Consulting',
    badge: 'Independent Developer • 2006-Present',
    description: 'Delivered custom web solutions for diverse clients including startups, non-profits, and local businesses. Specialized in WordPress development, responsive design, and e-commerce implementations.',
    color: 'blue'
  }
];

// Skills Data
export interface SkillItem {
  id: string;
  title: string;
  level: string;
  skills: string[];
  color: CardColorVariant;
}

export const skillsData: SkillItem[] = [
  {
    id: 'frontend-core',
    title: 'Frontend Core',
    level: '18 years',
    skills: ['JavaScript (16 years)', 'HTML5/CSS3 (18 years)', 'React.js (7 years)', 'TypeScript (5 years)', 'Responsive Web Design (18 years)'],
    color: 'red'
  },
  {
    id: 'frameworks-tools',
    title: 'Frameworks & Tools',
    level: 'Advanced',
    skills: ['Redux (4 years)', 'WordPress (7 years)', 'SASS/LESS (6-8 years)', 'Webpack (6 years)', 'Git (14 years)', 'RESTful APIs (14 years)'],
    color: 'blue'
  },
  {
    id: 'testing-analytics',
    title: 'Testing & Analytics',
    level: 'Experienced',
    skills: ['Jest/Enzyme (3 years)', 'Google Analytics/Segment (4 years)', 'UX Research/Wireframing (6 years)', 'Agile Methodologies (14 years)'],
    color: 'purple'
  },
  {
    id: 'modern-stack',
    title: 'Modern Stack',
    level: 'Current',
    skills: ['Next.js (3 years)', 'Tailwind CSS (2 years)', 'Node.js (4 years)', 'AWS Services (2 years)', 'Docker (1 year)', 'CI/CD Pipelines (3 years)'],
    color: 'teal'
  }
];

// Contact Data
export const contactData: ContactItem[] = [
  {
    type: 'email',
    label: 'Email',
    value: 'rjdofficemail@gmail.com',
    icon: '📧',
    href: 'mailto:rjdofficemail@gmail.com'
  },
  {
    type: 'phone',
    label: 'Phone',
    value: '+1 (909) 997-1393',
    icon: '📱',
    href: 'tel:+19099971393'
  },
  {
    type: 'location',
    label: 'Location',
    value: 'Redondo Beach, CA',
    icon: '📍'
  }
];

// Hero Banner Data - Accurate Professional Profile
export const heroData = {
  title: "John Dilig",
  badge: "Front-end Developer",
  description: "Front-end Developer with 18+ years building responsive, high-traffic web apps and cross-platform solutions. Expert in JavaScript, React.js, and CMS integration. Proven in boosting user engagement, optimizing performance, and driving revenue via innovative UI/UX.",
  stats: [
    { number: "18", label: "Years Experience" },
    { number: "10M+", label: "Users Served" },
    { number: "3", label: "Fortune 500s" }
  ],
  tags: ["UI/UX Expert", "React.js", "TypeScript", "Cross-platform", "Web Accessibility"],
  imageUrl: "/images/profile.png",
  imageAlt: "John Dilig - Senior Frontend Engineer",
  imageShape: "circle" as const,
  variant: "profile" as const
};

// Future AI Projects Data
export interface FutureProjectItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  status: 'planned' | 'in-development' | 'beta';
  aiTechnology: string[];
  color: CardColorVariant;
}

export const futureAiProjectsData: FutureProjectItem[] = [
  {
    id: 'ai-code-reviewer',
    icon: '🤖',
    title: 'AI Code Reviewer',
    description: 'Intelligent code analysis tool that provides automated code review suggestions, detects patterns, and offers optimization recommendations using advanced language models.',
    status: 'planned',
    aiTechnology: ['GPT-4', 'Code Analysis', 'Pattern Recognition'],
    color: 'blue'
  },
  {
    id: 'smart-documentation',
    icon: '📚',
    title: 'Smart Documentation Generator',
    description: 'AI-powered documentation system that automatically generates comprehensive technical documentation from codebases, API endpoints, and project structure.',
    status: 'planned',
    aiTechnology: ['Natural Language Processing', 'Code Parsing', 'Auto-Generation'],
    color: 'purple'
  },
  {
    id: 'intelligent-testing',
    icon: '🧪',
    title: 'Intelligent Test Generator',
    description: 'Machine learning system that analyzes code patterns to automatically generate comprehensive test suites, edge cases, and performance benchmarks.',
    status: 'in-development',
    aiTechnology: ['Machine Learning', 'Test Automation', 'Edge Case Detection'],
    color: 'teal'
  },
  {
    id: 'ai-design-assistant',
    icon: '🎨',
    title: 'AI Design Assistant',
    description: 'Creative AI tool that helps generate UI/UX designs, color schemes, and layout suggestions based on user requirements and modern design principles.',
    status: 'planned',
    aiTechnology: ['Computer Vision', 'Design Patterns', 'Generative AI'],
    color: 'pink'
  }
];

// Contact Section Data
export const contactSectionData = {
  title: "Let's Connect",
  badge: "Open to Work", 
  description: "I'm actively seeking new opportunities! Ready to bring my 18 years of front-end expertise to your team and help build exceptional user experiences.",
  contacts: contactData
};
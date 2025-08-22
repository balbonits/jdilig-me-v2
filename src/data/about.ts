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

// Contact Section Data
export const contactSectionData = {
  title: "Let's Connect",
  badge: "Open to Work", 
  description: "I'm actively seeking new opportunities! Ready to bring my 18 years of front-end expertise to your team and help build exceptional user experiences.",
  contacts: contactData
};
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
    id: 'aws',
    icon: '⚡',
    title: 'Amazon Web Services',
    badge: 'Cloud Computing',
    description: 'Enhanced AWS QuickSight UI with TypeScript and React.js, building data visualization interfaces used by millions. Developed cloud-native solutions and testing frameworks.',
    color: 'pink'
  },
  {
    id: 'fox',
    icon: '📺',
    title: 'FOXSports.com',
    badge: 'Media & Entertainment', 
    description: 'Developed frontend solutions for high-traffic video streaming platforms serving millions of users. Optimized video player performance and user experience.',
    color: 'orange'
  },
  {
    id: 'tbn',
    icon: '📡',
    title: 'TBN',
    badge: 'Broadcasting & Media',
    description: 'Provided frontend consulting for modern web solutions for global broadcasting operations. Enhanced user interfaces for content management and distribution systems.',
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
    id: 'frontend-mastery',
    title: 'Frontend Mastery',
    level: 'Core',
    skills: ['React.js', 'TypeScript', 'Next.js', 'JavaScript ES6+', 'HTML5/CSS3', 'Responsive Design'],
    color: 'red'
  },
  {
    id: 'styling-design',
    title: 'Styling & Design',
    level: 'Advanced',
    skills: ['CSS Modules', 'Tailwind CSS', 'SASS/LESS', 'PostCSS', 'UI/UX Design', 'Performance'],
    color: 'blue'
  },
  {
    id: 'tools-workflow',
    title: 'Tools & Workflow',
    level: 'Professional',
    skills: ['Git/GitHub', 'Jest/Testing', 'Webpack/Build', 'Agile/Scrum', 'Code Review', 'Mentoring'],
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

// Hero Banner Data
export const heroData = {
  title: "John Dilig",
  badge: "Front-End Developer",
  description: "Passionate front-end developer with 18 years crafting exceptional user experiences. I transform complex problems into elegant, performant web solutions.",
  stats: [
    { number: "18", label: "Years" },
    { number: "50+", label: "Projects" },
    { number: "5", label: "Major Companies" }
  ],
  tags: ["React", "TypeScript", "Next.js", "Performance", "UI/UX"],
  imageUrl: "/images/profile.png",
  imageAlt: "John Dilig - Front-End Developer",
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
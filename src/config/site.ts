// Site configuration for production and development environments

export interface SiteConfig {
  baseUrl: string;
  siteName: string;
  siteDescription: string;
  keywords: string[];
  language: string;
  locale: string;
  author: {
    name: string;
    email: string;
    twitter: string;
    linkedin: string;
    github: string;
    website: string;
  };
  social: {
    twitterHandle: string;
    linkedinProfile: string;
    githubProfile: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
    ogImageAlt: string;
    twitterCard: 'summary' | 'summary_large_image';
    themeColor: string;
    backgroundColor: string;
  };
  business: {
    type: string;
    industry: string;
    founded: string;
    location: {
      city: string;
      state: string;
      country: string;
    };
  };
}

const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment ? 'http://localhost:3000' : 'https://jdilig.me';

export const siteConfig: SiteConfig = {
  baseUrl,
  siteName: 'John Dilig - Web Developer',
  siteDescription: 'Interactive web development portfolio showcasing modern React, TypeScript, and algorithm implementations with 17+ years of professional experience.',
  keywords: [
    'John Dilig',
    'Web Developer',
    'Frontend Developer',
    'React Developer',
    'TypeScript',
    'JavaScript',
    'Next.js',
    'Algorithm Implementation',
    'UI/UX Design',
    'Portfolio',
    'AWS',
    'FOXSports',
    'TBN',
    'Software Engineering'
  ],
  language: 'en',
  locale: 'en_US',
  
  author: {
    name: 'John Dilig',
    email: 'john@jdilig.me',
    twitter: '@jdilig',
    linkedin: 'https://linkedin.com/in/jdilig',
    github: 'https://github.com/jdilig',
    website: 'https://jdilig.me',
  },
  
  social: {
    twitterHandle: '@jdilig',
    linkedinProfile: 'https://linkedin.com/in/jdilig',
    githubProfile: 'https://github.com/jdilig',
  },
  
  seo: {
    defaultTitle: 'John Dilig - Web Developer Portfolio',
    titleTemplate: '%s | John Dilig',
    defaultDescription: 'Interactive web development portfolio showcasing modern React, TypeScript, and algorithm implementations with 17+ years of professional experience.',
    ogImage: `${baseUrl}/og-image.png`,
    ogImageAlt: 'John Dilig - Web Developer Portfolio - Interactive showcase of React, TypeScript, and algorithm implementations',
    twitterCard: 'summary_large_image',
    themeColor: '#3b82f6',
    backgroundColor: '#ffffff',
  },
  
  business: {
    type: 'Person',
    industry: 'Web Development',
    founded: '2007',
    location: {
      city: 'Remote',
      state: 'Nationwide',
      country: 'United States',
    },
  },
};

// Helper functions for common URL operations
export const getCanonicalUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.baseUrl}${cleanPath}`;
};

export const getPageTitle = (title?: string): string => {
  if (!title) return siteConfig.seo.defaultTitle;
  return siteConfig.seo.titleTemplate.replace('%s', title);
};

export const getPageDescription = (description?: string): string => {
  return description || siteConfig.seo.defaultDescription;
};

// Page-specific configurations
export const pageConfigs = {
  home: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    path: '/',
    keywords: ['John Dilig portfolio', 'web developer', 'React developer', 'TypeScript', 'frontend developer'],
    type: 'website' as const,
  },
  about: {
    title: 'About John Dilig - Web Developer',
    description: 'Learn more about John Dilig, a web developer with 17+ years of experience in React, TypeScript, and modern frontend development. Professional experience with AWS, FOXSports, and TBN.',
    path: '/about',
    keywords: ['John Dilig bio', 'web developer experience', 'AWS developer', 'FOXSports developer', 'React expert'],
    type: 'profile' as const,
  },
  projects: {
    title: 'Web Development Projects - John Dilig Portfolio',
    description: 'Explore professional web development projects showcasing modern React, Next.js, TypeScript implementations, and real-world applications built for enterprise clients.',
    path: '/projects',
    keywords: ['web development projects', 'React projects', 'TypeScript projects', 'Next.js portfolio', 'frontend projects'],
    type: 'website' as const,
  },
  code: {
    title: 'Interactive Code Showcase - John Dilig',
    description: 'Browse interactive coding exercises, algorithm implementations, and utility functions with detailed complexity analysis and multiple solution approaches.',
    path: '/code',
    keywords: ['algorithm implementations', 'coding exercises', 'JavaScript algorithms', 'TypeScript utilities', 'code examples'],
    type: 'website' as const,
  },
  exercises: {
    title: 'Algorithm Exercises - Interactive Code Challenges',
    description: 'Interactive coding exercises featuring classic computer science algorithms with multiple solution approaches, time/space complexity analysis, and optimal solution detection.',
    path: '/code/exercises',
    keywords: ['algorithm exercises', 'coding challenges', 'computer science algorithms', 'algorithm complexity', 'programming practice'],
    type: 'website' as const,
  },
  utilities: {
    title: 'JavaScript & TypeScript Utility Functions',
    description: 'Reusable utility functions and helper libraries with comprehensive usage examples, implementation details, and real-world applications.',
    path: '/code/utilities',
    keywords: ['JavaScript utilities', 'TypeScript utilities', 'helper functions', 'code libraries', 'programming utilities'],
    type: 'website' as const,
  },
};

export default siteConfig;
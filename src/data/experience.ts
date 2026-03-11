export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const experience: Experience[] = [
  {
    company: 'FOX Sports',
    role: 'Front-End Developer',
    period: 'March 2012 – August 2019',
    description:
      'Elevated UI/UX on FOXSports.com, FX.com, FOXNation.com, boosting engagement, accessibility, and performance. Managed live coverage (e.g., 2018 FIFA World Cup) for real-time updates in peak traffic.',
  },
  {
    company: 'Amazon Web Services',
    role: 'Front-End Developer',
    period: 'July 2022 – May 2023',
    description:
      'Enhanced AWS QuickSight UI with TypeScript/React, improving engagement and efficiency. Optimized performance by resolving UI bugs for seamless experiences.',
  },
  {
    company: 'Trinity Broadcasting Network',
    role: 'React/CMS Developer',
    period: 'June 2023 – August 2024',
    description:
      'Enhanced web presence with cross-platform UX/UI and CMS integration, boosting user engagement. Implemented subscription flows for TBNPlus.com and MeritPlus.com, introducing revenue streams.',
  },
  {
    company: 'Freelance & Consulting',
    role: 'Independent Developer',
    period: '2006 – Present',
    description:
      'Delivered custom web solutions for diverse clients including startups, non-profits, and local businesses. Specialized in WordPress, responsive design, and e-commerce.',
  },
];

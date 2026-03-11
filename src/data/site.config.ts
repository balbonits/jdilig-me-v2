export const siteConfig = {
  name: 'John Dilig',
  description:
    'Front-end Developer with 18+ years building responsive, high-traffic web apps. Expert in JavaScript, React, TypeScript, and modern frontend architecture.',
  url: 'https://jdilig.me',
  author: {
    name: 'John Dilig',
    email: 'rjdofficemail@gmail.com',
    github: 'https://github.com/balbonits',
    linkedin: 'https://linkedin.com/in/jdilig',
  },
  seo: {
    defaultTitle: 'John Dilig — Front-End Developer',
    titleTemplate: (page: string) => `${page} | John Dilig`,
  },
} as const;

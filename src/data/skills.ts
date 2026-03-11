export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    title: 'Frontend Core',
    skills: ['JavaScript', 'TypeScript', 'React', 'HTML5/CSS3', 'Responsive Design'],
  },
  {
    title: 'Frameworks & Tools',
    skills: ['Next.js', 'Astro', 'Tailwind CSS', 'Redux', 'Git', 'REST APIs'],
  },
  {
    title: 'Testing & Quality',
    skills: ['Jest', 'Playwright', 'Vitest', 'ESLint', 'Accessibility (WCAG)'],
  },
  {
    title: 'Infrastructure',
    skills: ['Node.js', 'Vercel', 'AWS', 'CI/CD', 'Docker'],
  },
];

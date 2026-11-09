import type { ProjectData } from '@/interfaces/projects';

export interface WorkItem {
  title: string;
  meta: string;
  summary: string;
  tags: string[];
  href: string;
}

// Home "Selected work" (design SPEC 6): City App Framework first, then picks from the live projects list.
export const SELECTED_SLUGS = ['city-app-framework', 'personal-website-v2', 'horse-racing-text-game'];

export function toWorkItem(p: ProjectData): WorkItem {
  const year = p.metadata.startDate ? p.metadata.startDate.slice(0, 4) : '';
  return {
    title: p.metadata.title,
    meta: [year, p.metadata.category].filter(Boolean).join(' · '),
    summary: p.metadata.description,
    tags: p.techStack.flatMap((t) => t.items).slice(0, 4),
    href: `/projects/${p.slug}`,
  };
}

export function pickSelected(projects: ProjectData[]): WorkItem[] {
  return SELECTED_SLUGS.map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is ProjectData => Boolean(p))
    .map(toWorkItem);
}

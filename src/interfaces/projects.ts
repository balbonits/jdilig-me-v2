import { DifficultyLevel } from './shared';

export interface TechStack {
  category: string;
  items: string[];
}

export interface ProjectFeature {
  title: string;
  description: string;
  impact?: string;
}

export interface ProjectMetrics {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'live' | 'documentation' | 'case-study';
  url: string;
  label: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
  code?: string;
  image?: string;
  achievements?: string[];
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
  category: 'desktop' | 'mobile' | 'feature' | 'architecture';
}

export interface ProjectMetadata {
  title: string;
  name: string;
  description: string;
  detailedDescription: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planned' | 'archived';
  startDate: string;
  endDate?: string;
  duration: string;
  role: string;
  team?: string;
  difficulty: DifficultyLevel;
  featured: boolean;
}

export interface ProjectData {
  slug: string;
  metadata: ProjectMetadata;
  techStack: TechStack[];
  features: ProjectFeature[];
  metrics?: ProjectMetrics[];
  highlights: ProjectHighlight[];
  screenshots?: ProjectScreenshot[];
  links: ProjectLink[];
  lessons?: string[];
  challenges?: string[];
  futureImprovements?: string[];
}
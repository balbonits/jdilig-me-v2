import { ProjectData } from '@/interfaces/projects';
// Import JSON data statically to avoid TS module hot reload issues
import projectsJsonData from '../../public/projects.json';

// TEMPORARY FIX: Use JSON data instead of TS imports to resolve infinite refresh
// import personalWebsiteV2 from '../../projects/personal-website-v2/personal-website-v2';
// import geminiCliDemo from '../../projects/gemini-cli-demo/gemini-cli-demo';

// Function to load projects data (used in getStaticProps/getStaticPaths)
export async function loadProjectsData(): Promise<ProjectData[]> {
  // TEMPORARY: Use JSON files to avoid infinite refresh bug
  return projectsJsonData as ProjectData[];
}

// Legacy exports for compatibility
export const projectsData: ProjectData[] = projectsJsonData as ProjectData[];

export const getFeaturedProjects = (projects?: ProjectData[]): ProjectData[] => {
  const data = projects || projectsData;
  return data.filter(project => project.metadata.featured);
};

export const getProjectBySlug = (slug: string, projects?: ProjectData[]): ProjectData | undefined => {
  const data = projects || projectsData;
  return data.find(project => project.slug === slug);
};

// Named default export for ESLint compliance
const defaultProjectsData = projectsJsonData as ProjectData[];
export default defaultProjectsData;
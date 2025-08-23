import { ProjectData } from '@/interfaces/projects';

// BRUTE FORCE FIX: Direct import from TypeScript modules instead of JSON
import personalWebsiteV2 from '@root/projects/personal-website-v2/personal-website-v2';
import geminiCliDemo from '@root/projects/gemini-cli-demo/gemini-cli-demo';

// Hardcoded project data as fallback for production issues
const hardcodedProjectsData: ProjectData[] = [
  personalWebsiteV2,    // Featured project first
  geminiCliDemo         // Then other projects
];

// Function to load projects data (used in getStaticProps/getStaticPaths)
export async function loadProjectsData(): Promise<ProjectData[]> {
  // BRUTE FORCE: Always return the hardcoded data
  return hardcodedProjectsData;
}

// Legacy exports for compatibility (updated to use hardcoded data)
export const projectsData = hardcodedProjectsData;

export const getFeaturedProjects = (projects?: ProjectData[]): ProjectData[] => {
  const data = projects || hardcodedProjectsData;
  return data.filter(project => project.metadata.featured);
};

export const getProjectBySlug = (slug: string, projects?: ProjectData[]): ProjectData | undefined => {
  const data = projects || hardcodedProjectsData;
  return data.find(project => project.slug === slug);
};

export default hardcodedProjectsData;
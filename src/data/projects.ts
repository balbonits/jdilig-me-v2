import { ProjectData } from '@/interfaces/projects';

// BRUTE FORCE FIX: Direct import from TypeScript module instead of JSON
import personalWebsiteV2 from '../../projects/personal-website-v2/personal-website-v2';

// Hardcoded project data as fallback for production issues
const hardcodedProjectsData: ProjectData[] = [personalWebsiteV2];

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
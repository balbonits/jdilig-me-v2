import { ProjectData } from '@/interfaces/projects';

// Load projects from generated JSON file
// This file is generated at build time from individual project JSON files in /projects/
let projectsData: ProjectData[] = [];

// Function to load projects data (used in getStaticProps/getStaticPaths)
export async function loadProjectsData(): Promise<ProjectData[]> {
  if (typeof window === 'undefined') {
    // Server-side: read from file system
    try {
      const fs = await import('fs');
      const path = await import('path');
      const projectsPath = path.join(process.cwd(), 'public', 'projects.json');
      const projectsJson = fs.readFileSync(projectsPath, 'utf-8');
      projectsData = JSON.parse(projectsJson);
    } catch (error) {
      console.warn('Projects JSON not found:', error);
      projectsData = [];
    }
  } else {
    // Client-side: fetch from public directory
    try {
      const response = await fetch('/projects.json');
      if (response.ok) {
        projectsData = await response.json();
      }
    } catch (error) {
      console.warn('Could not fetch projects data:', error);
      projectsData = [];
    }
  }
  
  return projectsData;
}

// Legacy exports for compatibility (used in static generation)
export { projectsData };

export const getFeaturedProjects = (projects?: ProjectData[]): ProjectData[] => {
  const data = projects || projectsData;
  return data.filter(project => project.metadata.featured);
};

export const getProjectBySlug = (slug: string, projects?: ProjectData[]): ProjectData | undefined => {
  const data = projects || projectsData;
  return data.find(project => project.slug === slug);
};

export default projectsData;
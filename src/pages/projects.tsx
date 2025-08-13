
import ProjectsPage from '@/components/pages/ProjectsPage';
import SEOHead from '@/components/SEOHead';
import { loadProjectsData } from '@/data/projects';
import { ProjectData } from '@/interfaces/projects';
import { GetStaticProps } from 'next';

type ProjectsProps = {
  projects: ProjectData[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <SEOHead pathname="/projects" />
      <ProjectsPage projects={projects} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await loadProjectsData();
  return {
    props: {
      projects,
    },
    revalidate: 60, // ISR: re-generate every 60s
  };
};
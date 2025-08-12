import ProjectsPage from '@/components/pages/ProjectsPage';
import SEOHead from '@/components/SEOHead';

export default function Projects() {
  return (
    <>
      <SEOHead pathname="/projects" />
      <ProjectsPage />
    </>
  );
}
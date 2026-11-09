import { GetStaticProps } from 'next';
import SEOHead from '@/components/SEOHead';
import WorkCard from '@/components/site/WorkCard';
import { loadProjectsData } from '@/data/projects';
import { toWorkItem, type WorkItem } from '@/data/work';

export default function Projects({ work }: { work: WorkItem[] }) {
  return (
    <>
      <SEOHead pathname="/projects" title="Work - John Dilig" />
      <div className="s-container">
        <header className="s-page-head">
          <p className="s-eyebrow">Work</p>
          <h1 className="s-h1-inner" style={{ marginTop: 12 }}>Things I&apos;ve built</h1>
          <p className="s-lede">Tools, experiments, and side projects I build on my own time.</p>
        </header>
        <section className="s-section" aria-label="Projects" style={{ paddingTop: 0, paddingInline: 0 }}>
          <ul className="s-cards">
            {work.map((item) => (
              <li key={item.href}><WorkCard item={item} headingLevel={2} /></li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await loadProjectsData();
  return { props: { work: projects.map(toWorkItem) } };
};

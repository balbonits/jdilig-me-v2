import Link from 'next/link';
import { GetStaticProps } from 'next';
import SEOHead from '@/components/SEOHead';
import WorkCard from '@/components/site/WorkCard';
import { loadProjectsData } from '@/data/projects';
import { ProjectData } from '@/interfaces/projects';
import { selectedWork, type WorkItem } from '@/data/resume';

type ProjectsProps = { projects: ProjectData[] };

function toItem(p: ProjectData): WorkItem {
  const year = p.metadata.startDate ? new Date(p.metadata.startDate).getFullYear() : '';
  return {
    title: p.metadata.title,
    subtitle: p.metadata.category.toLowerCase(),
    meta: [year, 'Open source', p.metadata.role].filter(Boolean).join(' · '),
    summary: p.metadata.description,
    tags: p.techStack.flatMap((t) => t.items).slice(0, 4),
    href: `/projects/${p.slug}`,
  };
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <SEOHead pathname="/projects" title="Work - John Dilig" />
      <div className="s-container">
        <header className="s-page-head">
          <p className="s-eyebrow">Work</p>
          <h1 className="s-h1-inner" style={{ marginTop: 12 }}>Selected work</h1>
          <p className="s-lede">
            Shipped products and features from my resume, plus open-source projects I build on my own time.
          </p>
        </header>

        <section className="s-section" aria-labelledby="shipped" style={{ paddingTop: 0, paddingInline: 0 }}>
          <h2 id="shipped" className="s-h2" style={{ marginBottom: 24 }}>Shipped</h2>
          <ul className="s-cards">
            {selectedWork.map((item) => (
              <li key={item.title}><WorkCard item={item} /></li>
            ))}
          </ul>
        </section>

        <section className="s-section" aria-labelledby="oss" style={{ paddingInline: 0 }}>
          <h2 id="oss" className="s-h2" style={{ marginBottom: 24 }}>Open source</h2>
          <ul className="s-cards">
            {projects.map((p) => (
              <li key={p.slug}><WorkCard item={toItem(p)} /></li>
            ))}
          </ul>
          <p style={{ marginTop: 24 }}>
            More code samples live in the <Link className="s-link" href="/code">code library</Link>.
          </p>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await loadProjectsData();
  return { props: { projects }, revalidate: 60 };
};

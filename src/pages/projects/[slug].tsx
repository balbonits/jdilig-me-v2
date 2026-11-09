import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ProjectData } from '@/interfaces/projects';
import { loadProjectsData, getProjectBySlug } from '@/data/projects';
import { processMarkdown } from '@/lib/markdown';
import SEOHead from '@/components/SEOHead';
import { Icon } from '@/components/site/Icons';

interface ProjectPageProps {
  project: ProjectData;
  next: { slug: string; title: string } | null;
}

const isExternal = (url: string) => /^https?:\/\//.test(url);

// UX-IA 4: H1 name, Role/Year/Stack as a <dl>, sections as H2, then "Next project" and "Back to work".
export default function ProjectPage({ project, next }: ProjectPageProps) {
  const { metadata, techStack, features, links, lessons } = project;
  const { intro, sections } = processMarkdown(metadata.detailedDescription || '');
  const stack = techStack.flatMap((t) => t.items).join(', ');

  return (
    <>
      <SEOHead
        pathname={`/projects/${project.slug}`}
        title={`${metadata.title} - John Dilig`}
        description={metadata.description}
      />
      <article className="s-container s-detail" style={{ paddingBottom: 72 }}>
        <header className="s-page-head" style={{ paddingBottom: 0 }}>
          <p className="s-eyebrow">{metadata.category}</p>
          <h1 className="s-h1-inner" style={{ marginTop: 12 }}>{metadata.title}</h1>
          <p className="s-lede">{metadata.description}</p>
          <dl className="s-facts">
            <dt>Role</dt>
            <dd>{metadata.role}</dd>
            <dt>Year</dt>
            <dd>{metadata.startDate?.slice(0, 4)}</dd>
            <dt>Stack</dt>
            <dd>{stack}</dd>
          </dl>
        </header>

        {intro.length > 0 && (
          <>
            <h2 className="s-h2">Overview</h2>
            <div className="s-prose">
              {intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </>
        )}

        {sections.map((section) => (
          <section key={section.title} aria-labelledby={`sec-${section.title}`}>
            <h2 id={`sec-${section.title}`} className="s-h2">{section.title}</h2>
            <ul className="s-list">
              {section.content.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </section>
        ))}

        {features.length > 0 && (
          <section aria-labelledby="sec-features">
            <h2 id="sec-features" className="s-h2">Features</h2>
            <ul className="s-list">
              {features.map((f) => (
                <li key={f.title}><strong>{f.title}:</strong> {f.description}</li>
              ))}
            </ul>
          </section>
        )}

        {lessons && lessons.length > 0 && (
          <section aria-labelledby="sec-lessons">
            <h2 id="sec-lessons" className="s-h2">What I learned</h2>
            <ul className="s-list">
              {lessons.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </section>
        )}

        {links.length > 0 && (
          <section aria-labelledby="sec-links">
            <h2 id="sec-links" className="s-h2">Links</h2>
            <ul className="s-rows">
              {links.map((l) => (
                <li key={l.url}>
                  <a className="s-row" href={l.url}>
                    {l.label}
                    {isExternal(l.url) && <span className="s-visually-hidden"> (external site)</span>}
                    {isExternal(l.url) && (
                      <span className="s-host" aria-hidden="true">
                        {new URL(l.url).hostname} <Icon name="external" small />
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="s-pager" aria-label="Project">
          <Link className="s-standalone" href="/projects">Back to work</Link>
          {next && (
            <Link className="s-standalone" href={`/projects/${next.slug}`}>
              Next project: {next.title} <Icon name="arrow" small />
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsData = await loadProjectsData();
  return { paths: projectsData.map((p) => ({ params: { slug: p.slug } })), fallback: false };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const projectsData = await loadProjectsData();
  const project = getProjectBySlug(slug, projectsData);
  if (!project) return { notFound: true };
  const idx = projectsData.findIndex((p) => p.slug === slug);
  const n = projectsData.length > 1 ? projectsData[(idx + 1) % projectsData.length] : null;
  return {
    props: { project, next: n ? { slug: n.slug, title: n.metadata.title } : null },
    revalidate: 3600,
  };
};

import Link from 'next/link';
import type { GetStaticProps } from 'next';
import SEOHead from '@/components/SEOHead';
import WorkCard from '@/components/site/WorkCard';
import ContactBlock from '@/components/site/ContactBlock';
import { Icon, PixelMark, PixelPlay } from '@/components/site/Icons';
import { heroData } from '@/data/about';
import { jobs, resumeMeta, status, summary } from '@/data/resume';
import { loadProjectsData } from '@/data/projects';
import { pickSelected, type WorkItem } from '@/data/work';

// Years only for the one-line experience list (UX-IA R2).
const years = (dates: string) => {
  const ys = dates.match(/\d{4}/g) ?? [];
  if (ys.length === 0) return dates;
  const first = ys[0];
  const last = /present/i.test(dates) ? 'Present' : ys[ys.length - 1];
  return first === last ? first : `${first}–${last}`;
};

export default function Home({ work }: { work: WorkItem[] }) {
  return (
    <>
      <SEOHead pathname="/" />

      <section className="s-hero" aria-labelledby="hero-title">
        <div className="s-container s-hero__grid">
          <div className="s-hero__text">
            <p className="s-eyebrow">{heroData.badge} · {resumeMeta.location}</p>
            <h1 id="hero-title" className="s-h1">
              <span>
                Hello<span className="s-visually-hidden">.</span>
                <span className="s-dot" aria-hidden="true" />
              </span>
              <span>
                <span className="s-serif">I build</span> things
              </span>
              <span>for the web.</span>
            </h1>
            <p className="s-lede">{heroData.description}</p>
            <div className="s-btns">
              <a className="s-btn s-btn--primary" href="#work">
                See the work <Icon name="arrow" />
              </a>
              <a className="s-btn s-btn--secondary" href="#contact">
                Get in touch
              </a>
            </div>
            <div className="s-strip" aria-hidden="true">
              <span className="s-tile"><PixelMark scale={4} /></span>
              React · TypeScript · games
            </div>
          </div>
          <div className="s-hero__visual" aria-hidden="true">
            <div className="s-panel">
              <PixelMark scale={24} />
              <span className="s-panel__cap">React · TypeScript · games</span>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="s-section" aria-labelledby="work-title">
        <div className="s-container">
          <div className="s-sechead">
            <div>
              <p className="s-label s-seclabel" aria-hidden="true">01</p>
              <h2 id="work-title" className="s-h2">Selected work</h2>
            </div>
            <Link className="s-standalone" href="/projects">
              All work <Icon name="arrow" small />
            </Link>
          </div>
          <ul className="s-cards">
            {work.map((item) => (
              <li key={item.href}><WorkCard item={item} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s-section" aria-labelledby="play-title">
        <div className="s-container">
          <p className="s-label s-seclabel" aria-hidden="true">02</p>
          <h2 id="play-title" className="s-h2" style={{ marginBottom: 24 }}>Playground</h2>
          <a className="s-play" href="https://games.jdilig.me">
            <span className="s-tile" aria-hidden="true"><PixelPlay /></span>
            <span>
              <span className="s-play__title">AI-assisted browser games</span>
              <span className="s-host" aria-hidden="true">games.jdilig.me <Icon name="external" small /></span>
              <span className="s-visually-hidden"> (external site)</span>
            </span>
          </a>
        </div>
      </section>

      <section id="resume" className="s-section" aria-labelledby="resume-title">
        <div className="s-container">
          <p className="s-label s-seclabel" aria-hidden="true">03</p>
          <h2 id="resume-title" className="s-h2" style={{ marginBottom: 16 }}>Resume</h2>
          <div className="s-prose">
            <p>{summary}</p>
            <p>{status}</p>
          </div>
          <a className="s-dl-row" href={resumeMeta.pdf} download>
            <Icon name="download" /> Download resume (PDF, {resumeMeta.pdfSize})
          </a>
          <h3 className="s-h3" style={{ marginTop: 40 }}>Experience</h3>
          <ol className="s-xp" style={{ marginTop: 12 }}>
            {jobs.map((job) => (
              <li key={`${job.company}-${job.dates}`}>
                <span><span className="s-xp__role">{job.role}</span>, {job.company}</span>
                <span className="s-xp__years">{years(job.dates)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="about" className="s-section" aria-labelledby="about-title">
        <div className="s-container">
          <p className="s-label s-seclabel" aria-hidden="true">04</p>
          <h2 id="about-title" className="s-h2" style={{ marginBottom: 16 }}>About</h2>
          <div className="s-prose">
            <p>
              I&apos;m a {resumeMeta.title.toLowerCase()} in {resumeMeta.location} with 18+ years of React,
              TypeScript, and Next.js work across streaming and sports media, enterprise BI, consumer products,
              and live-event platforms. On my own time I build AI-assisted tools and browser games.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="s-section" aria-labelledby="contact-heading">
        <div className="s-container">
          <ContactBlock label="05" />
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await loadProjectsData();
  return { props: { work: pickSelected(projects) } };
};

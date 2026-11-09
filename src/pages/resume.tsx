import SEOHead from '@/components/SEOHead';
import { Icon } from '@/components/site/Icons';
import { education, jobs, resumeMeta, skills, summary } from '@/data/resume';

export default function Resume() {
  return (
    <>
      <SEOHead
        pathname="/resume"
        title="Resume - John Dilig, Senior Front-End Developer"
        description="Resume of John Dilig, Senior Front-End Developer with 18+ years in React, TypeScript, and Next.js."
      />
      <div className="s-container">
        <header className="s-page-head">
          <p className="s-eyebrow">Resume · updated {resumeMeta.updated}</p>
          <h1 className="s-h1-inner" style={{ marginTop: 12 }}>{resumeMeta.title}</h1>
          <p className="s-lede">{summary}</p>
          <div className="s-btns">
            <a className="s-btn s-btn--primary" href={resumeMeta.pdf} download>
              <Icon name="download" /> Download PDF
            </a>
            <a className="s-btn s-btn--secondary" href={resumeMeta.pdf} target="_blank" rel="noopener noreferrer">
              Open PDF <Icon name="external" small />
              <span className="s-visually-hidden">, new tab</span>
            </a>
          </div>
        </header>

        <section className="s-section" aria-labelledby="exp" style={{ paddingInline: 0 }}>
          <h2 id="exp" className="s-h2" style={{ marginBottom: 32 }}>Experience</h2>
          <ol className="s-jobs">
            {jobs.map((job) => (
              <li key={`${job.company}-${job.dates}`} className="s-job">
                <div>
                  <p className="s-meta">{job.dates}</p>
                  <p className="s-job__co" style={{ marginTop: 4 }}>{job.company}</p>
                  <p style={{ fontSize: 15 }}>{job.place}</p>
                </div>
                <div>
                  <h3 className="s-h3">{job.role}</h3>
                  <ul>
                    {job.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="s-section" aria-labelledby="skills" style={{ paddingInline: 0 }}>
          <h2 id="skills" className="s-h2" style={{ marginBottom: 24 }}>Skills</h2>
          <dl className="s-skills">
            {skills.map((s) => (
              <div key={s.label} style={{ display: 'contents' }}>
                <dt>{s.label}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="s-section" aria-labelledby="edu" style={{ paddingInline: 0 }}>
          <h2 id="edu" className="s-h2" style={{ marginBottom: 16 }}>Education</h2>
          <p className="s-job__co">{education.degree}</p>
          <p>{education.school} · {education.dates}</p>
        </section>
      </div>
    </>
  );
}

import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import WorkCard from '@/components/site/WorkCard';
import ContactBlock from '@/components/site/ContactBlock';
import { Icon, PixelMark, PixelPlay } from '@/components/site/Icons';
import { heroData } from '@/data/about';
import { selectedWork, resumeMeta } from '@/data/resume';

export default function Home() {
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
              <Link className="s-btn s-btn--primary" href="/projects">
                See my work <Icon name="arrow" />
              </Link>
              <a className="s-btn s-btn--secondary" href={resumeMeta.pdf} download>
                <Icon name="download" /> Resume (PDF)
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

      <section className="s-section" aria-labelledby="glance-title" style={{ paddingTop: 0 }}>
        <div className="s-container">
          <h2 id="glance-title" className="s-label" style={{ marginBottom: 12 }}>At a glance</h2>
          <ul className="s-proof">
            {heroData.stats.map((s) => (
              <li key={s.label}>
                <strong>{s.number}</strong>
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s-section" aria-labelledby="work-title">
        <div className="s-container">
          <div className="s-sechead">
            <div>
              <p className="s-label s-seclabel"><span aria-hidden="true">01</span></p>
              <h2 id="work-title" className="s-h2">Selected work</h2>
            </div>
            <Link className="s-standalone" href="/projects">
              All work <Icon name="arrow" small />
            </Link>
          </div>
          <ul className="s-cards">
            {selectedWork.map((item) => (
              <li key={item.title}><WorkCard item={item} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s-section" aria-labelledby="play-title">
        <div className="s-container">
          <p className="s-label s-seclabel"><span aria-hidden="true">02</span></p>
          <h2 id="play-title" className="s-h2" style={{ marginBottom: 24 }}>Playground</h2>
          <a className="s-play" href="https://games.jdilig.me" target="_blank" rel="noopener noreferrer"
            aria-label="Playground, AI-assisted browser games, opens games.jdilig.me, new tab">
            <span className="s-tile"><PixelPlay /></span>
            <span>
              <span className="s-meta" style={{ display: 'block' }}>Playground</span>
              <span className="s-play__title">AI-assisted browser games</span>
              <span className="s-host">opens games.jdilig.me <Icon name="external" small /></span>
            </span>
          </a>
        </div>
      </section>

      <div className="s-container s-split">
        <section className="s-section" aria-labelledby="about-title" style={{ paddingInline: 0 }}>
          <p className="s-label s-seclabel"><span aria-hidden="true">03</span></p>
          <h2 id="about-title" className="s-h2" style={{ marginBottom: 16 }}>About</h2>
          <div className="s-prose">
            <p>
              I&apos;m a {resumeMeta.title.toLowerCase()} in {resumeMeta.location} with 18+ years of React,
              TypeScript, and Next.js work across streaming and sports media, enterprise BI, consumer products,
              and live-event platforms.
            </p>
          </div>
          <p style={{ marginTop: 16 }}>
            <Link className="s-standalone" href="/resume">
              Read my resume <Icon name="arrow" small />
            </Link>
          </p>
        </section>
        <section className="s-section" aria-labelledby="contact-heading" style={{ paddingInline: 0 }}>
          <ContactBlock />
        </section>
      </div>
    </>
  );
}

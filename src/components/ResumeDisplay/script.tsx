import React from 'react';
import { PageContainer, SectionContainer, Section, Card, Grid } from '@/components/ui';
import HeroBanner from '@/components/ui/HeroBanner';
import { useScreenshotMode } from '@/hooks/useScreenshotMode';
import styles from './style.module.css';

const linksData = [
  {
    id: 'linkedin',
    icon: '💼',
    title: 'LinkedIn Profile',
    url: 'linkedin.com/in/rjdilig',
    href: 'https://www.linkedin.com/in/rjdilig/',
    color: 'blue' as const
  },
  {
    id: 'source-code',
    icon: '💻',
    title: 'Site Source Code',
    url: 'github.com/balbonits/jdilig-me-v2',
    href: 'https://github.com/balbonits/jdilig-me-v2',
    color: 'purple' as const
  },
  {
    id: 'github-projects',
    icon: '⚡',
    title: 'GitHub Projects',
    url: 'github.com/balbonits',
    href: 'http://github.com/balbonits',
    color: 'teal' as const
  }
];

export default function ResumeDisplay() {
  const { hideShareLinks } = useScreenshotMode();

  return (
    <PageContainer>
      {/* Hero Header */}
      <HeroBanner
        title="Reuel John Dilig"
        subtitle="Front-End Developer"
        description="Redondo Beach, CA 90278 • (909) 997-1393 • rjdofficemail@gmail.com"
        imageUrl="/images/headshot.png"
        imageAlt="John Dilig Professional Headshot"
        imageShape="circle"
        variant="profile"
        stats={[
          { number: "18+", label: "Years Experience" },
          { number: "25+", label: "Technologies" },
          { number: "5", label: "Major Companies" }
        ]}
        className="resume-header-hero"
      />

      <SectionContainer>
        {/* Professional Summary Hero Banner */}
        <HeroBanner
          title="Professional Summary"
          badge="18+ Years Proven"
          description="Front-End Developer with 18+ years building responsive, high-traffic web apps and cross-platform solutions. Expert in JavaScript, React.js, and CMS integration. Proven in boosting user engagement, optimizing performance, and driving revenue via innovative UI/UX. Skilled in team mentoring and user-centric solutions for leaders like AWS, FOX, and ADP."
          tags={["React", "TypeScript", "Next.js", "JavaScript ES6+", "CSS/SASS", "Performance"]}
          className="resume-summary-hero"
        />

        {/* Links Section - Hidden in screenshot mode */}
        {!hideShareLinks && (
          <Grid columns={3} gap="2rem" className={styles.linksSection}>
            {linksData.map((link) => (
              <a 
                key={link.id} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.linkWrapper}
              >
                <Card className={styles.linkCard} colorVariant={link.color}>
                  <div className={styles.linkContent}>
                    <span className={styles.linkIcon}>{link.icon}</span>
                    <div className={styles.linkText}>
                      <span className={styles.linkTitle}>{link.title}</span>
                      <span className={styles.linkUrl}>{link.url}</span>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </Grid>
        )}

      {/* Skills */}
      <Section title="Skills">
        <div className={styles.skillsGrid}>
          <div className={styles.skillsColumn}>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Front-End Development</span>
              <span className={styles.skillYears}>18 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>JavaScript</span>
              <span className={styles.skillYears}>16 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>HTML5/CSS3</span>
              <span className={styles.skillYears}>18 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>React.js</span>
              <span className={styles.skillYears}>7 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>TypeScript</span>
              <span className={styles.skillYears}>5 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Redux</span>
              <span className={styles.skillYears}>4 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>WordPress</span>
              <span className={styles.skillYears}>7 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Drupal</span>
              <span className={styles.skillYears}>3 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Agile Methodologies</span>
              <span className={styles.skillYears}>14 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Responsive Web Design</span>
              <span className={styles.skillYears}>18 years</span>
            </div>
          </div>
          <div className={styles.skillsColumn}>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Cross-Browser Compatibility</span>
              <span className={styles.skillYears}>18 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Git</span>
              <span className={styles.skillYears}>14 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>RESTful APIs</span>
              <span className={styles.skillYears}>14 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>UX Research/Wireframing</span>
              <span className={styles.skillYears}>6 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Jest/Enzyme</span>
              <span className={styles.skillYears}>3 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Webpack</span>
              <span className={styles.skillYears}>6 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>SASS/LESS</span>
              <span className={styles.skillYears}>6-8 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Google Analytics/Segment</span>
              <span className={styles.skillYears}>4 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Network Administration</span>
              <span className={styles.skillYears}>4 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Languages: English • Filipino</span>
              <span className={styles.skillYears}>Native</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Work History */}
      <Section title="Work History">
        
        {/* Trinity Broadcasting Network */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>React/CMS Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Trinity Broadcasting Network (TBN), Fort Worth, TX</div>
              <div className={styles.period}>June 2023 – August 2024</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Enhanced web presence with cross-platform UX/UI and CMS integration, boosting user engagement significantly.</li>
            <li>Implemented subscription flows for TBNPlus.com and MeritPlus.com, introducing revenue streams via adaptive solutions.</li>
            <li>Refined VoD strategies through UX research, analysis, wireframing, and prototyping, improving stakeholder agility.</li>
            <li>Boosted accessibility with cross-platform features and mentored on UI/UX best practices.</li>
          </ul>
        </div>

        {/* Amazon Web Services */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Front-End Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Amazon Web Services (AWS), Seattle, WA</div>
              <div className={styles.period}>July 2022 – May 2023</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Enhanced AWS QuickSight UI with TypeScript/React.js, improving engagement and efficiency notably.</li>
            <li>Optimized performance by resolving UI bugs for seamless experiences.</li>
            <li>Developed prototypes and testing frameworks/unit tests to support innovation.</li>
          </ul>
        </div>

        {/* Diamond */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Full Stack Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Diamond, Los Angeles, CA</div>
              <div className={styles.period}>June 2020 – May 2022</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Enhanced FOX.com video player (JW Player) with cross-platform functionality, improving performance substantially.</li>
            <li>Integrated Conviva, Mux, Segment analytics to optimize playback and insights across FOX properties.</li>
            <li>Improved user experience via UI enhancements, bug fixes, and data-driven content delivery.</li>
          </ul>
        </div>

        {/* ADP */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Frontend Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>ADP, Pasadena, CA</div>
              <div className={styles.period}>November 2019 – May 2020</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Enhanced Wisely by ADP app UI with React.js/TypeScript, improving integrity, engagement, and accessibility considerably.</li>
            <li>Enabled cross-platform via Cordova/PhoneGap and Redux/RxJS state management.</li>
            <li>Ensured reliability with Jest/Enzyme testing and cross-functional alignment.</li>
          </ul>
        </div>

        {/* FOX Digital Media */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Front-End Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Fox Digital Media, Los Angeles, CA</div>
              <div className={styles.period}>March 2012 – August 2019</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Elevated UI/UX on FOXSports.com, FX.com, FOXNation.com, boosting engagement, accessibility, performance markedly.</li>
            <li>Optimized workflows leading CMS migrations to Adobe CQ5.6/WordPress, developing themes/plugins/tools.</li>
            <li>Managed live coverage (e.g., 2018 FIFA World Cup) for real-time updates in peak traffic.</li>
            <li>Crafted Emmy-winning longform features, enhancing content quality and audience notably.</li>
          </ul>
        </div>

        {/* Medversant Technologies */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Network/UI Engineer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Medversant Technologies LLC, Los Angeles, CA</div>
              <div className={styles.period}>June 2008 – February 2012</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Led front-end for SaaS credentialing products, building UIs from draft to launch, improving efficiency.</li>
            <li>Improved engagement with solutions for ProviderSource.com and company site significantly.</li>
            <li>Enhanced infrastructure reliability via upgrades, ASP.NET, and LESS.CSS.</li>
          </ul>
        </div>

        {/* Hythiam */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Front End Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Hythiam, Inc., Santa Monica, CA</div>
              <div className={styles.period}>February 2008 – May 2008</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Implemented web app designs with HTML/CSS, fixing bugs for optimal functionality.</li>
          </ul>
        </div>

        {/* Personal Projects */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Portfolio Website (jdilig.me)</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Self-Employed, Remote</div>
              <div className={styles.period}>August 2024 – Present</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Developed responsive personal site with Next.js, TypeScript, Tailwind CSS v4, keeping skills current.</li>
            <li>Implemented testing (Jest, React Testing Library, Playwright E2E) and ESLint compliance.</li>
            <li>Added features: light/dark mode, PWA readiness, WCAG 2.1 AA accessibility.</li>
            <li>Showcased algorithms, utilities with documentation and complexity analysis.</li>
          </ul>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className={styles.education}>
          <h3 className={styles.degree}>Associate of Science in Computer Network Systems</h3>
          <div className={styles.school}>ITT Technical Institute, San Dimas, CA</div>
          <div className={styles.graduationDate}>December 2008</div>
        </div>
      </Section>
      </SectionContainer>
    </PageContainer>
  );
}
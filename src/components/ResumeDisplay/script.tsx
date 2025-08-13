import React from 'react';
import { PageContainer, SectionContainer, Section } from '@/components/ui';
import HeroBanner from '@/components/ui/HeroBanner';
import { useScreenshotMode } from '@/hooks/useScreenshotMode';
import styles from './style.module.css';

export default function ResumeDisplay() {
  const { hideShareLinks } = useScreenshotMode();

  return (
    <PageContainer>
      {/* Hero Header */}
      <HeroBanner
        title="John Dilig"
        subtitle="Front-End Developer"
        imageUrl="/images/headshot.png"
        imageAlt="John Dilig Professional Headshot"
        imageShape="circle"
        variant="profile"
        stats={[
          { number: "16+", label: "Years Experience" },
          { number: "25+", label: "Technologies" },
          { number: "4", label: "Major Companies" }
        ]}
        className="resume-header-hero"
      />

      <SectionContainer>
        {/* Professional Summary Hero Banner */}
        <HeroBanner
          title="Frontend Engineering Excellence"
          badge="16+ Years Proven"
          description="Front-end developer specializing in React ecosystems, high-traffic web applications, 
            and cloud-native solutions. Contributed to teams at AWS, Fox, TBN, and ADP building scalable user interfaces 
            that serve millions. Expert in modern JavaScript, TypeScript, and responsive design with a 
            track record of improving user engagement and application performance."
          tags={["React", "TypeScript", "Next.js", "JavaScript ES6+", "CSS/SASS", "Performance"]}
          className="resume-summary-hero"
        />

        {/* Links Banner - Hidden in screenshot mode */}
        {!hideShareLinks && (
          <div className={styles.linksGrid}>
            <a href="https://www.linkedin.com/in/rjdilig/" target="_blank" rel="noopener noreferrer" className={`${styles.linkBanner} ${styles.linkedin}`}>
              <div className={styles.linkContent}>
                <div className={styles.linkIcon}>💼</div>
                <div className={styles.linkText}>
                  <div className={styles.linkTitle}>LinkedIn Profile</div>
                  <div className={styles.linkUrl}>linkedin.com/in/rjdilig</div>
                </div>
              </div>
            </a>
            <a href="https://github.com/balbonits/jdilig-me-v2" target="_blank" rel="noopener noreferrer" className={`${styles.linkBanner} ${styles.github}`}>
              <div className={styles.linkContent}>
                <div className={styles.linkIcon}>💻</div>
                <div className={styles.linkText}>
                  <div className={styles.linkTitle}>Site Source Code</div>
                  <div className={styles.linkUrl}>github.com/balbonits/jdilig-me-v2</div>
                </div>
              </div>
            </a>
            <a href="http://github.com/balbonits" target="_blank" rel="noopener noreferrer" className={styles.linkBanner}>
              <div className={styles.linkContent}>
                <div className={styles.linkIcon}>⚡</div>
                <div className={styles.linkText}>
                  <div className={styles.linkTitle}>GitHub Projects</div>
                  <div className={styles.linkUrl}>github.com/balbonits</div>
                </div>
              </div>
            </a>
          </div>
        )}

      {/* Skills */}
      <Section title="Skills">
        <div className={styles.skillsGrid}>
          <div className={styles.skillsColumn}>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Front-End Development</span>
              <span className={styles.skillYears}>16 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>JavaScript</span>
              <span className={styles.skillYears}>14 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>HTML/HTML5</span>
              <span className={styles.skillYears}>16 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>CSS/CSS3</span>
              <span className={styles.skillYears}>16 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>React.js</span>
              <span className={styles.skillYears}>5 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>WordPress</span>
              <span className={styles.skillYears}>5 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Agile Methodologies</span>
              <span className={styles.skillYears}>12 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Cross-browser compatibility</span>
              <span className={styles.skillYears}>16 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Responsive Web Design</span>
              <span className={styles.skillYears}>16 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>TypeScript</span>
              <span className={styles.skillYears}>3 years</span>
            </div>
          </div>
          <div className={styles.skillsColumn}>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Redux</span>
              <span className={styles.skillYears}>2 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Zustand</span>
              <span className={styles.skillYears}>1 year</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>jQuery</span>
              <span className={styles.skillYears}>4 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Lodash/Underscore</span>
              <span className={styles.skillYears}>2 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Backbone.js</span>
              <span className={styles.skillYears}>1 year</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>Angular.js</span>
              <span className={styles.skillYears}>1 year</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>ASP.NET (2.0, 3.5)</span>
              <span className={styles.skillYears}>4 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>LESS.CSS</span>
              <span className={styles.skillYears}>6 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>SASS</span>
              <span className={styles.skillYears}>4 years</span>
            </div>
            <div className={styles.skillItem}>
              <span className={styles.skillName}>PostCSS</span>
              <span className={styles.skillYears}>4 years</span>
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
              <div className={styles.company}>Trinity Broadcasting Network - Fort Worth, TX</div>
              <div className={styles.period}>June 2023 - August 2024</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Enhanced TBN&apos;s web presence with cross-platform UX/UI design integration, boosting user engagement.</li>
            <li>Implemented subscription flow for TBNPlus.com & MeritPlus.com, introducing more revenue avenues.</li>
            <li>Conducted UX research and competitive analysis, wireframing and front-end flow diagrams, refining VoD platform strategies & improving agility by helping stakeholders & product owners visualize their thoughts during ideation/conceptualization.</li>
            <li>Mentored team on UX/UI development and principles, fostering best practices, innovation, and user accessibility.</li>
          </ul>
        </div>

        {/* Amazon Web Services */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Front-End Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Amazon Web Services (AWS) - Seattle, WA</div>
              <div className={styles.period}>July 2022 - May 2023</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Enhanced AWS QuickSight UI with TypeScript and React.js, improving user engagement and efficiency.</li>
            <li>Resolved UI bugs and optimized performance, contributing to seamless user experiences.</li>
            <li>Developed prototypes for new features, supporting innovative product development.</li>
            <li>Implemented testing frameworks, ensuring reliable and robust application functionality.</li>
          </ul>
          <div className={styles.techStack}>
            <strong>Tech stack:</strong> React.js, Redux, Material UI, SASS
          </div>
        </div>

        {/* Diamond Web Services */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Full Stack Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Diamond Web Services/Diamond.la - Los Angeles, CA</div>
              <div className={styles.period}>June 2020 - May 2022</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Developed FOX.com&apos;s video player, enhancing cross-platform functionality.</li>
            <li>Integrated analytics tools, improving data insights for various FOX properties.</li>
            <li>Collaborated on UI enhancements, boosting user experience across platforms.</li>
            <li>Enhanced user experience through UI bug fixes and improvements.</li>
            <li>Collaborated across FOX properties to streamline video playback, significantly boosting viewer engagement.</li>
            <li>Optimized video player performance by integrating Conviva, Mux, and Segment analytics.</li>
            <li>Analyzed data to drive continuous improvements in user experience and content delivery.</li>
          </ul>
        </div>

        {/* ADP */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Front-End Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>ADP - Pasadena, CA</div>
              <div className={styles.period}>November 2019 - May 2020</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Developed Wisely by ADP&apos;s app UI using React.js and TypeScript, enhancing data integrity, user engagement and accessibility.</li>
            <li>Integrated Cordova/PhoneGap for hybrid app, improving cross-platform functionality.</li>
            <li>Managed state with Redux, ensuring seamless data flow, and app performance.</li>
            <li>Executed testing with Jest and Enzyme, ensuring high-quality code and reliability.</li>
            <li>Engineered hybrid mobile applications with Cordova/PhoneGap, integrating Redux for state management and RxJS for efficient side effect handling.</li>
            <li>Contributed to cross-functional team efforts, aligning front-end development with back-end systems to deliver seamless financial solutions.</li>
          </ul>
        </div>

        {/* FOX Digital Media */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Front-End Developer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>FOX Digital Media - Los Angeles, CA</div>
              <div className={styles.period}>March 2012 - August 2019</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Enhanced FOXSports.com UI/UX, boosting user engagement, accessibility, site reliability & performance.</li>
            <li>Developed new UI themes, plugins & tools during CMS migrations to Adobe CQ5.6 and WordPress, optimizing content workflows.</li>
            <li>Built CMS tools and designs for editors and writer, showcasing their award-winning articles and storytelling.</li>
            <li>Ensured seamless live coverage of major sports events, like the 2018 FIFA World Cup, improving real-time updates.</li>
            <li>Collaborated on front-end strategies, innovating digital media user interactions.</li>
            <li>Partnered with cross-functional teams to enhance FOXSports.com, FX.com, FOXNation.com and WestminsterKennelClub.org, elevating user experience and site reliability.</li>
            <li>Managed real-time updates during 2018 FIFA World Cup & 2019 Westminster Dog Show, ensuring flawless coverage and seamless user experience during peak traffic periods.</li>
          </ul>
        </div>

        {/* Medversant Technologies */}
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <h3 className={styles.jobTitle}>Network/UI Engineer</h3>
            <div className={styles.jobDetails}>
              <div className={styles.company}>Medversant Technologies, LLC. - Los Angeles, CA</div>
              <div className={styles.period}>May 2008 - February 2012</div>
            </div>
          </div>
          <ul className={styles.achievements}>
            <li>Delivered high-performance front-end solutions for various SaaS products, and even the company website, significantly improving online presence and user engagement.</li>
            <li>Managed network and server infrastructure; enhanced system performance reliability; utilized ASP.NET for web solutions.</li>
            <li>Spearheaded network infrastructure upgrades and pioneered front-end development initiatives, implementing LESS.CSS for enhanced CSS management.</li>
            <li>Implemented ASP.NET 2.0 & 3.5; streamlined web development processes & boosted website functionality.</li>
            <li>Managed desktop computers and devices; maintaining office productivity & equipment reliability.</li>
          </ul>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className={styles.education}>
          <h3 className={styles.degree}>Associate of Science in Computer Network Systems</h3>
          <div className={styles.school}>ITT Technical Institute SAN DIMAS, CA</div>
          <div className={styles.graduationDate}>January 2008</div>
        </div>
      </Section>
      </SectionContainer>
    </PageContainer>
  );
}
import React from 'react';
import { PageContainer, SectionContainer } from '@/components/ui';
import styles from './style.module.css';

export default function AboutPage() {
  return (
    <PageContainer>
      {/* Main Hero Banner */}
      <div className={styles.mainHero}>
        <div className={styles.heroContent}>
          <div className={styles.heroHeader}>
            <h1 className={styles.heroTitle}>About Me</h1>
            <div className={styles.heroBadge}>Front-End Developer</div>
          </div>
          <p className={styles.heroDescription}>
            Passionate front-end developer with 16+ years crafting exceptional user experiences. 
            I transform complex problems into elegant, performant web solutions.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>16+</span>
              <span className={styles.statLabel}>Years</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>Major Corps</span>
            </div>
          </div>
          <div className={styles.heroTech}>
            <span>React</span>
            <span>TypeScript</span>
            <span>Next.js</span>
            <span>Performance</span>
            <span>UI/UX</span>
          </div>
        </div>
        <div className={styles.heroGradient}></div>
      </div>
      
      <SectionContainer>
        {/* Journey Cards Grid */}
        <div className={styles.journeyGrid}>
          <div className={styles.journeyCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>🚀</div>
                <h3 className={styles.cardTitle}>Frontend Focus</h3>
              </div>
              <p className={styles.cardDescription}>
                Specializing in React ecosystems, modern JavaScript, and creating 
                high-performance user interfaces that serve millions of users.
              </p>
            </div>
            <div className={styles.cardGradient}></div>
          </div>
          
          <div className={styles.journeyCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>💡</div>
                <h3 className={styles.cardTitle}>Problem Solver</h3>
              </div>
              <p className={styles.cardDescription}>
                From optimizing video players at Fox to building financial apps at ADP, 
                I tackle complex challenges with elegant solutions.
              </p>
            </div>
            <div className={styles.cardGradient}></div>
          </div>
          
          <div className={styles.journeyCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>📈</div>
                <h3 className={styles.cardTitle}>Growth Mindset</h3>
              </div>
              <p className={styles.cardDescription}>
                Continuously learning new technologies while mentoring teams 
                and sharing knowledge across organizations.
              </p>
            </div>
            <div className={styles.cardGradient}></div>
          </div>
        </div>
        
        {/* Skills Hero Banners */}
        <div className={styles.skillsGrid}>
          <div className={styles.skillBanner}>
            <div className={styles.skillContent}>
              <div className={styles.skillHeader}>
                <h3 className={styles.skillTitle}>Frontend Mastery</h3>
                <div className={styles.skillBadge}>Core</div>
              </div>
              <div className={styles.skillTags}>
                <span>React.js</span>
                <span>TypeScript</span>
                <span>Next.js</span>
                <span>JavaScript ES6+</span>
                <span>HTML5/CSS3</span>
                <span>Responsive Design</span>
              </div>
            </div>
            <div className={styles.skillGradient}></div>
          </div>
          
          <div className={styles.skillBanner}>
            <div className={styles.skillContent}>
              <div className={styles.skillHeader}>
                <h3 className={styles.skillTitle}>Styling & Design</h3>
                <div className={styles.skillBadge}>Advanced</div>
              </div>
              <div className={styles.skillTags}>
                <span>CSS Modules</span>
                <span>Tailwind CSS</span>
                <span>SASS/LESS</span>
                <span>PostCSS</span>
                <span>UI/UX Design</span>
                <span>Performance</span>
              </div>
            </div>
            <div className={styles.skillGradient}></div>
          </div>
          
          <div className={styles.skillBanner}>
            <div className={styles.skillContent}>
              <div className={styles.skillHeader}>
                <h3 className={styles.skillTitle}>Tools & Workflow</h3>
                <div className={styles.skillBadge}>Professional</div>
              </div>
              <div className={styles.skillTags}>
                <span>Git/GitHub</span>
                <span>Jest/Testing</span>
                <span>Webpack/Build</span>
                <span>Agile/Scrum</span>
                <span>Code Review</span>
                <span>Mentoring</span>
              </div>
            </div>
            <div className={styles.skillGradient}></div>
          </div>
        </div>

        {/* Contact Hero Banner */}
        <div className={styles.contactHero}>
          <div className={styles.contactContent}>
            <div className={styles.contactHeader}>
              <h2 className={styles.contactTitle}>Let&apos;s Connect</h2>
              <div className={styles.contactBadge}>Available</div>
            </div>
            <p className={styles.contactDescription}>
              Ready to collaborate on your next project? Let&apos;s discuss how we can build 
              something amazing together.
            </p>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📧</div>
                <div className={styles.contactText}>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>rjdofficemail@gmail.com</div>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📱</div>
                <div className={styles.contactText}>
                  <div className={styles.contactLabel}>Phone</div>
                  <div className={styles.contactValue}>+1 (909) 997-1393</div>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div className={styles.contactText}>
                  <div className={styles.contactLabel}>Location</div>
                  <div className={styles.contactValue}>Redondo Beach, CA</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contactGradient}></div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

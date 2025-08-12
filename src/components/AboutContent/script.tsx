import React from 'react';
import { SectionContainer } from '@/components/ui';
import HeroBanner from '@/components/ui/HeroBanner';
import styles from './style.module.css';

export default function AboutContent() {
  return (
    <>
      {/* Main Hero Banner */}
      <HeroBanner
        title="John Dilig"
        badge="Front-End Developer"
        description="Passionate front-end developer with 17 years crafting exceptional user experiences. 
          I transform complex problems into elegant, performant web solutions."
        stats={[
          { number: "17", label: "Years" },
          { number: "50+", label: "Projects" },
          { number: "3", label: "Major Companies" }
        ]}
        tags={["React", "TypeScript", "Next.js", "Performance", "UI/UX"]}
        imageUrl="/images/profile.png"
        imageAlt="John Dilig - Front-End Developer"
        imageShape="circle"
        variant="profile"
        className="about-main-hero"
      />
      
      {/* Contact Hero Banner */}
      <section 
        className={styles.contactHero}
        aria-label="Contact information and availability"
      >
        <div className={styles.contactContent}>
          <header className={styles.contactHeader}>
            <h2 className={styles.contactTitle} id="contact-title">Let&apos;s Connect</h2>
            <div 
              className={styles.contactBadge}
              role="status"
              aria-label="Current employment status: Open to work"
            >Open to Work</div>
          </header>
          <p 
            className={styles.contactDescription}
            aria-describedby="contact-title"
          >
            I&apos;m actively seeking new opportunities! Ready to bring my 17 years of front-end expertise 
            to your team and help build exceptional user experiences.
          </p>
          <div 
            className={styles.contactGrid}
            role="group"
            aria-label="Contact methods"
          >
            <div 
              className={styles.contactItem}
              role="group"
              aria-label="Email contact information"
            >
              <div className={styles.contactIcon} aria-hidden="true">📧</div>
              <div className={styles.contactText}>
                <div className={styles.contactLabel} id="email-label">Email</div>
                <div className={styles.contactValue}>
                  <a 
                    href="mailto:rjdofficemail@gmail.com"
                    aria-labelledby="email-label"
                    aria-label="Send email to rjdofficemail@gmail.com"
                  >rjdofficemail@gmail.com</a>
                </div>
              </div>
            </div>
            
            <div 
              className={styles.contactItem}
              role="group"
              aria-label="Phone contact information"
            >
              <div className={styles.contactIcon} aria-hidden="true">📱</div>
              <div className={styles.contactText}>
                <div className={styles.contactLabel} id="phone-label">Phone</div>
                <div 
                  className={styles.contactValue}
                  aria-labelledby="phone-label"
                  aria-label="Phone number: +1 (909) 997-1393"
                >+1 (909) 997-1393</div>
              </div>
            </div>
            
            <div 
              className={styles.contactItem}
              role="group"
              aria-label="Location information"
            >
              <div className={styles.contactIcon} aria-hidden="true">📍</div>
              <div className={styles.contactText}>
                <div className={styles.contactLabel} id="location-label">Location</div>
                <div 
                  className={styles.contactValue}
                  aria-labelledby="location-label"
                  aria-label="Located in Redondo Beach, California"
                >Redondo Beach, CA</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contactGradient}></div>
      </section>
      
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
                From building scalable cloud dashboards at AWS to optimizing video players at FOXSports.com, 
                I tackle complex challenges with elegant solutions at scale.
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
        
        {/* Company Experience Banners */}
        <div className={styles.experienceGrid}>
          <div className={`${styles.experienceBanner} ${styles.awsBanner}`}>
            <div className={styles.experienceContent}>
              <div className={styles.experienceHeader}>
                <div className={styles.experienceIcon}>⚡</div>
                <div className={styles.experienceInfo}>
                  <h3 className={styles.experienceTitle}>Amazon Web Services</h3>
                  <div className={styles.experienceBadge}>Cloud Computing</div>
                </div>
              </div>
              <p className={styles.experienceDescription}>
                Enhanced AWS QuickSight UI with TypeScript and React.js, building data visualization 
                interfaces used by millions. Developed cloud-native solutions and testing frameworks.
              </p>
            </div>
            <div className={styles.experienceGradient}></div>
          </div>
          
          <div className={`${styles.experienceBanner} ${styles.foxBanner}`}>
            <div className={styles.experienceContent}>
              <div className={styles.experienceHeader}>
                <div className={styles.experienceIcon}>📺</div>
                <div className={styles.experienceInfo}>
                  <h3 className={styles.experienceTitle}>FOXSports.com</h3>
                  <div className={styles.experienceBadge}>Media & Entertainment</div>
                </div>
              </div>
              <p className={styles.experienceDescription}>
                Developed frontend solutions for high-traffic video streaming platforms 
                serving millions of users. Optimized video player performance and user experience.
              </p>
            </div>
            <div className={styles.experienceGradient}></div>
          </div>
          
          <div className={`${styles.experienceBanner} ${styles.tbnBanner}`}>
            <div className={styles.experienceContent}>
              <div className={styles.experienceHeader}>
                <div className={styles.experienceIcon}>📡</div>
                <div className={styles.experienceInfo}>
                  <h3 className={styles.experienceTitle}>TBN</h3>
                  <div className={styles.experienceBadge}>Broadcasting & Media</div>
                </div>
              </div>
              <p className={styles.experienceDescription}>
                Provided frontend consulting for modern web solutions for global broadcasting operations. 
                Enhanced user interfaces for content management and distribution systems.
              </p>
            </div>
            <div className={styles.experienceGradient}></div>
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
      </SectionContainer>
    </>
  );
}

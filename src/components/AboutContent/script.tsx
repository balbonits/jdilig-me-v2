import React from 'react';
import { SectionContainer, Card, Grid } from '@/components/ui';
import HeroBanner from '@/components/ui/HeroBanner';
import styles from './style.module.css';

const journeyData = [
  {
    id: 'frontend-focus',
    icon: '🚀',
    title: 'Frontend Focus',
    description: 'Specializing in React ecosystems, modern JavaScript, and creating high-performance user interfaces that serve millions of users.',
    color: 'blue' as const
  },
  {
    id: 'problem-solver',
    icon: '💡',
    title: 'Problem Solver',
    description: 'From building scalable cloud dashboards at AWS to optimizing video players at FOXSports.com, I tackle complex challenges with elegant solutions at scale.',
    color: 'purple' as const
  },
  {
    id: 'growth-mindset',
    icon: '📈',
    title: 'Growth Mindset',
    description: 'Continuously learning new technologies while mentoring teams and sharing knowledge across organizations.',
    color: 'teal' as const
  }
];

const experienceData = [
  {
    id: 'aws',
    icon: '⚡',
    title: 'Amazon Web Services',
    badge: 'Cloud Computing',
    description: 'Enhanced AWS QuickSight UI with TypeScript and React.js, building data visualization interfaces used by millions. Developed cloud-native solutions and testing frameworks.',
    color: 'pink' as const
  },
  {
    id: 'fox',
    icon: '📺',
    title: 'FOXSports.com',
    badge: 'Media & Entertainment', 
    description: 'Developed frontend solutions for high-traffic video streaming platforms serving millions of users. Optimized video player performance and user experience.',
    color: 'orange' as const
  },
  {
    id: 'tbn',
    icon: '📡',
    title: 'TBN',
    badge: 'Broadcasting & Media',
    description: 'Provided frontend consulting for modern web solutions for global broadcasting operations. Enhanced user interfaces for content management and distribution systems.',
    color: 'green' as const
  }
];

const skillsData = [
  {
    id: 'frontend-mastery',
    title: 'Frontend Mastery',
    level: 'Core',
    skills: ['React.js', 'TypeScript', 'Next.js', 'JavaScript ES6+', 'HTML5/CSS3', 'Responsive Design'],
    color: 'red' as const
  },
  {
    id: 'styling-design',
    title: 'Styling & Design',
    level: 'Advanced',
    skills: ['CSS Modules', 'Tailwind CSS', 'SASS/LESS', 'PostCSS', 'UI/UX Design', 'Performance'],
    color: 'blue' as const
  },
  {
    id: 'tools-workflow',
    title: 'Tools & Workflow',
    level: 'Professional',
    skills: ['Git/GitHub', 'Jest/Testing', 'Webpack/Build', 'Agile/Scrum', 'Code Review', 'Mentoring'],
    color: 'purple' as const
  }
];

export default function AboutContent() {
  return (
    <>
      {/* Main Hero Banner */}
      <HeroBanner
        title="John Dilig"
        badge="Front-End Developer"
        description="Passionate front-end developer with 18 years crafting exceptional user experiences. 
          I transform complex problems into elegant, performant web solutions."
        stats={[
          { number: "18", label: "Years" },
          { number: "50+", label: "Projects" },
          { number: "5", label: "Major Companies" }
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
            I&apos;m actively seeking new opportunities! Ready to bring my 18 years of front-end expertise 
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
          
          {/* Resume Download CTA */}
          <div className={styles.resumeSection}>
            <a 
              href="/resume.pdf" 
              download="resume.pdf"
              className={styles.resumeButton}
              aria-label="Download John Dilig's resume as PDF"
            >
              <span className={styles.resumeIcon}>📄</span>
              <span className={styles.resumeText}>
                <span className={styles.resumeTitle}>Download Resume</span>
                <span className={styles.resumeSubtitle}>Complete professional background</span>
              </span>
            </a>
          </div>
        </div>
      </section>
      
      <SectionContainer>
        {/* Journey Cards */}
        <Grid columns={3} gap="2rem" className={styles.journeySection}>
          {journeyData.map((journey) => (
            <Card key={journey.id} className={styles.journeyCard} colorVariant={journey.color}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{journey.icon}</div>
                <h3 className={styles.cardTitle}>{journey.title}</h3>
              </div>
              <p className={styles.cardDescription}>
                {journey.description}
              </p>
            </Card>
          ))}
        </Grid>
        
        {/* Company Experience */}
        <Grid columns={3} gap="2rem" className={styles.experienceSection}>
          {experienceData.map((experience) => (
            <Card key={experience.id} className={styles.experienceCard} colorVariant={experience.color}>
              <div className={styles.experienceHeader}>
                <div className={styles.experienceIcon}>{experience.icon}</div>
                <h3 className={styles.experienceTitle}>{experience.title}</h3>
              </div>
              <div className={styles.experienceBadge}>{experience.badge}</div>
              <p className={styles.experienceDescription}>
                {experience.description}
              </p>
            </Card>
          ))}
        </Grid>
        
        {/* Skills */}
        <Grid columns={3} gap="2rem" className={styles.skillsSection}>
          {skillsData.map((skill) => (
            <Card key={skill.id} className={styles.skillCard} colorVariant={skill.color}>
              <div className={styles.skillHeader}>
                <h3 className={styles.skillTitle}>{skill.title}</h3>
                <div className={styles.skillBadge}>{skill.level}</div>
              </div>
              <div className={styles.skillTags}>
                {skill.skills.map((skillName, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skillName}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </Grid>
      </SectionContainer>
    </>
  );
}

import React from 'react';
import Link from 'next/link';
import { PageContainer, PageHeader, SectionContainer } from '@/components/ui';
import { projectsData } from '@/data/projects';
import styles from './style.module.css';

export default function ProjectsPage() {
  return (
    <PageContainer>
      <PageHeader title="Project Portfolio">
        Full-stack development projects with comprehensive case studies, technical deep-dives, and implementation details.
      </PageHeader>

      <SectionContainer>
        <div className={styles.heroGrid}>
          {projectsData.map((project, index) => {
            const primaryTechStack = project.techStack[0]?.items.slice(0, 4) || [];
            const liveLink = project.links.find(link => link.type === 'live');
            const githubLink = project.links.find(link => link.type === 'github');
            
            return (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.heroLink}>
                <div className={`${styles.heroBanner} ${styles[`heroBanner${index + 1}`]}`}>
                  <div className={styles.heroContent}>
                    <div className={styles.heroHeader}>
                      <h3 className={styles.heroTitle}>{project.metadata.title}</h3>
                      <div className={styles.heroBadge}>{project.metadata.status}</div>
                    </div>
                    
                    <p className={styles.heroDescription}>
                      {project.metadata.description}
                    </p>
                    
                    <div className={styles.heroStats}>
                      <div className={styles.stat}>
                        <span className={styles.statNumber}>{project.metadata.duration}</span>
                        <span className={styles.statLabel}>Duration</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statNumber}>{project.metadata.difficulty}</span>
                        <span className={styles.statLabel}>Complexity</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statNumber}>{project.features.length}+</span>
                        <span className={styles.statLabel}>Features</span>
                      </div>
                    </div>
                    
                    <div className={styles.heroMeta}>
                      <div className={styles.heroCategory}>{project.metadata.category}</div>
                      <div className={styles.heroLinks}>
                        {liveLink && (
                          <span className={styles.linkBadge}>Live Demo</span>
                        )}
                        {githubLink && (
                          <span className={styles.linkBadge}>Source Code</span>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.heroTech}>
                      {primaryTechStack.map((tech, techIndex) => (
                        <span key={techIndex}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.heroGradient}></div>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

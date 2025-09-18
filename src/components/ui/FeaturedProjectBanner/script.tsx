import React from 'react';
import Link from 'next/link';
import { ProjectData } from '@/interfaces/projects';
import { Section, Card, Grid, TerminalCard } from '@/components/ui';
import styles from './style.module.css';

interface FeaturedProjectBannerProps {
  project: ProjectData;
  className?: string;
}

export default function FeaturedProjectBanner({ project, className = '' }: FeaturedProjectBannerProps) {
  const firstHighlight = project.highlights?.[0];

  return (
    <Section
      title={project.metadata.title}
      badge="✨ Featured Project"
      className={`${styles.featuredSection} ${className}`}
    >
      <p className={styles.description}>{project.metadata.description}</p>
      <span className={styles.categoryBadge}>{project.metadata.category}</span>

      <Grid layout="2-col" gap="2rem" className={styles.mainContent}>
        {/* Achievement Content */}
        <Card className={styles.achievementCard}>
          {firstHighlight && (
            <>
              <h3 className={styles.highlightTitle}>{firstHighlight.title}</h3>
              <p className={styles.highlightDescription}>{firstHighlight.description}</p>
              <ul className={styles.achievements}>
                {firstHighlight.achievements?.slice(0, 3).map((achievement, index) => (
                  <li key={index} className={styles.achievement}>
                    🚀 {achievement}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        {/* Terminal Visual */}
        <TerminalCard
          title={project.metadata.name}
          lines={[
            '$ npm run start',
            '🏇 Starting horse racing simulation...',
            '✅ v1.0 Production Ready',
            '⚡ 90%+ test coverage achieved'
          ]}
        />
      </Grid>

      {/* Tech Stack */}
      <div className={styles.techStack}>
        <h4>Key Technologies</h4>
        <div className={styles.techTags}>
          {project.techStack?.[0]?.items?.slice(0, 4).map((tech, index) => (
            <span key={index} className={styles.techTag}>{tech}</span>
          ))}
          {project.techStack?.[1]?.items?.slice(0, 2).map((tech, index) => (
            <span key={index + 4} className={styles.techTag}>{tech}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Link href={`/projects/${project.slug}`} className={styles.primaryAction}>
          View Project Details →
        </Link>
        <Link href="/projects" className={styles.secondaryAction}>
          All Projects
        </Link>
      </div>
    </Section>
  );
}
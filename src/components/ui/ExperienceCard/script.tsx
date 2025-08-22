import React from 'react';
import { Card } from '@/components/ui';
import { CardColorVariant } from '@/types';
import styles from './style.module.css';

export interface ExperienceCardProps {
  /** Unique identifier for the experience item */
  id: string;
  /** Icon or emoji representing the company/experience */
  icon: string;
  /** Company or organization name */
  title: string;
  /** Industry or category badge */
  badge: string;
  /** Detailed description of the role and achievements */
  description: string;
  /** Color variant for the card styling */
  color: CardColorVariant;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ExperienceCard - Displays professional experience and company information
 * 
 * Used for showcasing work experience, notable projects, or company affiliations
 * with industry context and achievement descriptions.
 * 
 * @example
 * <ExperienceCard
 *   id="aws"
 *   icon="⚡"
 *   title="Amazon Web Services"
 *   badge="Cloud Computing"
 *   description="Enhanced AWS QuickSight UI with TypeScript and React.js..."
 *   color="pink"
 * />
 */
export default function ExperienceCard({
  id,
  icon,
  title,
  badge,
  description,
  color,
  className,
}: ExperienceCardProps) {
  return (
    <Card 
      colorVariant={color}
      className={`${styles.experienceCard} ${className || ''}`}
      data-testid={`experience-card-${id}`}
    >
      <div className={styles.experienceHeader}>
        <div 
          className={styles.experienceIcon}
          role="img"
          aria-label={`${title} company icon`}
        >
          {icon}
        </div>
        <h3 className={styles.experienceTitle}>{title}</h3>
      </div>
      
      <div className={styles.experienceBadge}>
        {badge.includes('•') ? (
          <>
            <span className={styles.badgeTitle}>{badge.split('•')[0].trim()}</span>
            <span className={styles.badgeDates}>{badge.split('•')[1].trim()}</span>
          </>
        ) : (
          badge
        )}
      </div>
      
      <p className={styles.experienceDescription}>
        {description}
      </p>
    </Card>
  );
}
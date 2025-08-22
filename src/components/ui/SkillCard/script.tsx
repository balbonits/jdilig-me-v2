import React from 'react';
import { Card } from '@/components/ui';
import { CardColorVariant } from '@/types';
import styles from './style.module.css';

export interface SkillCardProps {
  /** Unique identifier for the skill category */
  id: string;
  /** Title of the skill category */
  title: string;
  /** Proficiency level badge (e.g., "Core", "Advanced", "Professional") */
  level: string;
  /** Array of individual skills in this category */
  skills: string[];
  /** Color variant for the card styling */
  color: CardColorVariant;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkillCard - Displays technical skills and competencies by category
 * 
 * Used for showcasing technical skills grouped by category with proficiency levels
 * and individual skill tags for easy scanning.
 * 
 * @example
 * <SkillCard
 *   id="frontend-mastery"
 *   title="Frontend Mastery"
 *   level="Core"
 *   skills={['React.js', 'TypeScript', 'Next.js']}
 *   color="red"
 * />
 */
export default function SkillCard({
  id,
  title,
  level,
  skills,
  color,
  className,
}: SkillCardProps) {
  // Helper function to extract years from skill string
  const extractYears = (skill: string): number => {
    const match = skill.match(/\((\d+(?:-\d+)?)\s*years?\)/);
    if (match) {
      // Handle ranges like "6-8 years" by taking the maximum
      if (match[1].includes('-')) {
        const years = match[1].split('-').map(Number);
        return Math.max(...years);
      }
      return parseInt(match[1], 10);
    }
    return 0;
  };

  // Sort skills by years (descending) and take top 4
  const topSkills = [...skills]
    .sort((a, b) => extractYears(b) - extractYears(a))
    .slice(0, 4);

  return (
    <Card 
      colorVariant={color}
      className={`${styles.skillCard} ${className || ''}`}
      data-testid={`skill-card-${id}`}
    >
      <div className={styles.skillHeader}>
        <h3 className={styles.skillTitle}>{title}</h3>
        <div 
          className={styles.skillBadge}
          role="status"
          aria-label={`Proficiency level: ${level}`}
        >
          {level}
        </div>
      </div>
      
      <div 
        className={styles.skillTags}
        role="group"
        aria-label={`Skills in ${title} category`}
      >
        {topSkills.map((skill, index) => (
          <span 
            key={index} 
            className={styles.skillTag}
            role="listitem"
          >
            {skill}
          </span>
        ))}
      </div>
    </Card>
  );
}
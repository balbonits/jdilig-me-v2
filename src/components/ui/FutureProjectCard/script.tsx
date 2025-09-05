import React from 'react';
import { Card } from '@/components/ui';
import { CardColorVariant } from '@/types';
import styles from './style.module.css';

interface FutureProjectCardProps {
  /** Unique identifier for the future project */
  id: string;
  /** Icon or emoji representing the project */
  icon: string;
  /** Main title of the project */
  title: string;
  /** Detailed description of the project */
  description: string;
  /** Current development status */
  status: 'planned' | 'in-development' | 'beta';
  /** AI technologies used in the project */
  aiTechnology: string[];
  /** Color variant for the card styling */
  color: CardColorVariant;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FutureProjectCard - Displays upcoming AI projects and concepts
 * 
 * Used for showcasing planned AI/ML projects, their status, and technologies
 * in an engaging card format with status indicators and tech tags.
 * 
 * @example
 * <FutureProjectCard
 *   id="ai-code-reviewer"
 *   icon="🤖"
 *   title="AI Code Reviewer"
 *   description="Intelligent code analysis tool..."
 *   status="planned"
 *   aiTechnology={['GPT-4', 'Code Analysis']}
 *   color="blue"
 * />
 */
export default function FutureProjectCard({
  id,
  icon,
  title,
  description,
  status,
  aiTechnology,
  color,
  className,
}: FutureProjectCardProps) {
  const statusLabels = {
    planned: 'Planned',
    'in-development': 'In Development', 
    beta: 'Beta'
  };

  const statusColors = {
    planned: 'var(--color-blue)',
    'in-development': 'var(--color-orange)',
    beta: 'var(--color-green)'
  };

  return (
    <Card 
      colorVariant={color}
      className={`${styles.futureProjectCard} ${className || ''}`}
      data-testid={`future-project-card-${id}`}
    >
      <div className={styles.cardHeader}>
        <div 
          className={styles.cardIcon}
          role="img"
          aria-label={`${title} icon`}
        >
          {icon}
        </div>
        <div className={styles.titleSection}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span 
            className={styles.statusBadge}
            style={{ backgroundColor: statusColors[status] }}
          >
            {statusLabels[status]}
          </span>
        </div>
      </div>
      <p className={styles.cardDescription}>
        {description}
      </p>
      <div className={styles.techTags}>
        {aiTechnology.map((tech, index) => (
          <span key={index} className={styles.techTag}>
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
}

export type { FutureProjectCardProps };
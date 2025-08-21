import React from 'react';
import { Card } from '@/components/ui';
import { CardColorVariant } from '@/types';
import styles from './style.module.css';

export interface JourneyCardProps {
  /** Unique identifier for the journey item */
  id: string;
  /** Icon or emoji representing the journey item */
  icon: string;
  /** Main title of the journey item */
  title: string;
  /** Detailed description of the journey item */
  description: string;
  /** Color variant for the card styling */
  color: CardColorVariant;
  /** Additional CSS classes */
  className?: string;
}

/**
 * JourneyCard - Displays personal journey, values, or key characteristics
 * 
 * Used for showcasing professional development milestones, core values,
 * or key characteristics in an engaging card format with icon and description.
 * 
 * @example
 * <JourneyCard
 *   id="frontend-focus"
 *   icon="🚀"
 *   title="Frontend Focus"
 *   description="Specializing in React ecosystems and modern JavaScript..."
 *   color="blue"
 * />
 */
export default function JourneyCard({
  id,
  icon,
  title,
  description,
  color,
  className,
}: JourneyCardProps) {
  return (
    <Card 
      colorVariant={color}
      className={`${styles.journeyCard} ${className || ''}`}
      data-testid={`journey-card-${id}`}
    >
      <div className={styles.cardHeader}>
        <div 
          className={styles.cardIcon}
          role="img"
          aria-label={`${title} icon`}
        >
          {icon}
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardDescription}>
        {description}
      </p>
    </Card>
  );
}
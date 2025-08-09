import React, { ReactNode } from 'react';
import styles from './style.module.css';

interface TabProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  background?: boolean;
}

export default function Tab({ 
  children, 
  className = '',
  padding = 'medium',
  background = true
}: TabProps) {
  const paddingClass = {
    none: styles.paddingNone,
    small: styles.paddingSmall,
    medium: styles.paddingMedium,
    large: styles.paddingLarge
  }[padding];

  return (
    <div className={`${styles.tab} ${paddingClass} ${
      background ? styles.withBackground : styles.noBackground
    } ${className}`}>
      {children}
    </div>
  );
}
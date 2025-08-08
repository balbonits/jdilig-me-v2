import React from 'react';
import styles from './style.module.css';

export interface HeroBannerGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeroBannerGrid({ children, className = '' }: HeroBannerGridProps) {
  return (
    <div className={`${styles.heroGrid} ${className}`}>
      {children}
    </div>
  );
}

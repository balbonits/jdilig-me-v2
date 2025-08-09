import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

export interface HeroBannerGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeroBannerGrid({ children, className = '' }: HeroBannerGridProps) {
  return (
    <div className={cn(styles.heroGrid, className)}>
      {children}
    </div>
  );
}

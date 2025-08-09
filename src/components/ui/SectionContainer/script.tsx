import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({ children, className = '' }: SectionContainerProps) {
  return (
    <div className={cn(styles.sections, className)}>
      {children}
    </div>
  );
}

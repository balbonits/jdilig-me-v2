import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ title, description, children, className = '' }: SectionProps) {
  return (
    <section className={cn(styles.section, className)}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description && <p className={styles.sectionText}>{description}</p>}
      {children}
    </section>
  );
}

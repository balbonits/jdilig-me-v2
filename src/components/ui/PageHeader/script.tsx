import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ title, subtitle, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn(styles.header, className)}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}

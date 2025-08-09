import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={cn(styles.page, className)}>
      {children}
    </div>
  );
}

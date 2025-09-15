import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'full-width';
}

export default function PageContainer({ children, className = '', variant = 'default' }: PageContainerProps) {
  return (
    <div className={cn(
      styles.page, 
      variant === 'full-width' && styles.fullWidth,
      className
    )}>
      {children}
    </div>
  );
}

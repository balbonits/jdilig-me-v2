import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div className={cn(styles.card, { [styles.hover]: hover }, className)}>
      {children}
    </div>
  );
}

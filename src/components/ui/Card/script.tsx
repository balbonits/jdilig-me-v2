import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

type ColorVariant = 'blue' | 'purple' | 'teal' | 'pink' | 'orange' | 'green' | 'red';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  colorVariant?: ColorVariant;
}

export default function Card({ children, className, hover = true, colorVariant }: CardProps) {
  return (
    <div className={cn(
      styles.card, 
      { [styles.hover]: hover },
      colorVariant && styles[`color${colorVariant.charAt(0).toUpperCase() + colorVariant.slice(1)}`],
      className
    )}>
      {children}
    </div>
  );
}

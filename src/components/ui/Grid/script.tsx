import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  minWidth?: string;
  gap?: string;
  className?: string;
}

export default function Grid({ 
  children, 
  columns, 
  minWidth = '300px', 
  gap = '1.5rem', 
  className = '' 
}: GridProps) {
  const gridStyle = {
    gap,
    gridTemplateColumns: columns 
      ? `repeat(${columns}, 1fr)` 
      : `repeat(auto-fit, minmax(${minWidth}, 1fr))`
  };

  return (
    <div className={cn(styles.grid, className)} style={gridStyle}>
      {children}
    </div>
  );
}

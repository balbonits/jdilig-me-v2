import React from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

type GridLayout = 'auto' | '1-col' | '2-col' | '3-col' | '4-col';

interface GridProps {
  children: React.ReactNode;
  layout?: GridLayout;
  columns?: number;
  minWidth?: string;
  gap?: string;
  className?: string;
}

export default function Grid({
  children,
  layout = 'auto',
  columns,
  minWidth = '300px',
  gap = '1.5rem',
  className = ''
}: GridProps) {
  const getGridColumns = () => {
    // If columns prop is provided, it takes precedence
    if (columns) {
      return `repeat(${columns}, 1fr)`;
    }

    // Layout-based configurations
    switch (layout) {
      case '1-col':
        return '1fr';
      case '2-col':
        return 'repeat(2, 1fr)';
      case '3-col':
        return 'repeat(2, 1fr)';
      case '4-col':
        return 'repeat(2, 1fr)';
      case 'auto':
      default:
        return `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
    }
  };

  const gridStyle = {
    gap,
    gridTemplateColumns: getGridColumns()
  };

  return (
    <div
      className={cn(
        styles.grid,
        layout && styles[`layout-${layout}`],
        className
      )}
      style={gridStyle}
    >
      {children}
    </div>
  );
}

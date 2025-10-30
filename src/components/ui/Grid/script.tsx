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
  // Only apply inline gridTemplateColumns for 'auto' layout or when columns prop is provided
  // For fixed layouts ('1-col', '2-col', etc.), let CSS handle responsive behavior
  const getGridColumns = () => {
    // If columns prop is provided, it takes precedence
    if (columns) {
      return `repeat(${columns}, 1fr)`;
    }

    // Only return inline style for 'auto' layout
    if (layout === 'auto') {
      return `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
    }

    // For fixed layouts, return null to let CSS modules handle responsive behavior
    return null;
  };

  const gridColumns = getGridColumns();
  const gridStyle = {
    gap,
    ...(gridColumns && { gridTemplateColumns: gridColumns })
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

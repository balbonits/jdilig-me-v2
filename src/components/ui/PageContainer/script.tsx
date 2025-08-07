import React from 'react';
import styles from './style.module.css';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`${styles.page} ${className}`}>
      {children}
    </div>
  );
}

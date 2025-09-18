import React from 'react';
import styles from './style.module.css';

interface TerminalCardProps {
  title?: string;
  lines: string[];
  className?: string;
}

export default function TerminalCard({ title, lines, className = '' }: TerminalCardProps) {
  return (
    <div className={`${styles.terminalCard} ${className}`}>
      <div className={styles.terminalHeader}>
        <div className={styles.cardDots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {title && <span className={styles.cardTitle}>{title}</span>}
      </div>
      <div className={styles.terminalContent}>
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <div className={styles.cursor}>_</div>
      </div>
    </div>
  );
}
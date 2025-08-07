import React from 'react';
import ResumeDisplay from '@/components/ResumeDisplay';
import styles from './style.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <ResumeDisplay />
    </div>
  );
}

import React from 'react';
import styles from './style.module.css';

export default function CodePage() {
  return (
    <div className={styles.codePage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Code Showcase</h1>
        <p className={styles.description}>
          Algorithms, utilities, and coding examples demonstrating problem-solving skills.
        </p>
      </div>
      
      <div className={styles.sections}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Algorithm Exercises</h2>
          <p className={styles.sectionText}>
            Classic computer science problems and data structure implementations.
          </p>
          <div className={styles.codeGrid}>
            <div className={styles.codeCard}>
              <h3 className={styles.codeTitle}>Binary Search</h3>
              <p className={styles.codeDescription}>
                Efficient search algorithm for sorted arrays
              </p>
              <div className={styles.complexity}>O(log n)</div>
            </div>
            
            <div className={styles.codeCard}>
              <h3 className={styles.codeTitle}>Merge Sort</h3>
              <p className={styles.codeDescription}>
                Divide and conquer sorting algorithm
              </p>
              <div className={styles.complexity}>O(n log n)</div>
            </div>
            
            <div className={styles.codeCard}>
              <h3 className={styles.codeTitle}>LRU Cache</h3>
              <p className={styles.codeDescription}>
                Least Recently Used cache implementation
              </p>
              <div className={styles.complexity}>O(1)</div>
            </div>
          </div>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Utility Functions</h2>
          <p className={styles.sectionText}>
            Reusable utility functions for common programming tasks.
          </p>
          <div className={styles.codeGrid}>
            <div className={styles.codeCard}>
              <h3 className={styles.codeTitle}>Debounce</h3>
              <p className={styles.codeDescription}>
                Rate limiting function calls for performance
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

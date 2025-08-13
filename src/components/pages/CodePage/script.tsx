import React from 'react';
import Link from 'next/link';
import { PageContainer, PageHeader, SectionContainer } from '@/components/ui';
import styles from './style.module.css';

export default function CodePage() {
  return (
    <PageContainer>
      <PageHeader title="Code Showcase">
        Frontend engineering expertise through algorithms, utilities, and clean TypeScript implementations.
      </PageHeader>

      <SectionContainer>
        <div className={styles.heroGrid}>
          <Link href="/code/exercises" className={styles.heroLink}>
            <div className={styles.heroBanner}>
              <div className={styles.heroContent}>
                <div className={styles.heroHeader}>
                  <h3 className={styles.heroTitle}>Algorithm Mastery</h3>
                  <div className={styles.heroBadge}>14+ Problems</div>
                </div>
                <p className={styles.heroDescription}>
                  Computer science fundamentals with multiple solution approaches. 
                  From O(1) hash maps to O(log n) binary search - optimal solutions explained.
                </p>
                <div className={styles.heroStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>14+</span>
                    <span className={styles.statLabel}>Algorithms</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>3-5</span>
                    <span className={styles.statLabel}>Solutions Each</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>O(1)</span>
                    <span className={styles.statLabel}>Optimal Focus</span>
                  </div>
                </div>
                <div className={styles.heroTech}>
                  <span>Hash Maps</span>
                  <span>Binary Search</span>
                  <span>Dynamic Programming</span>
                  <span>Data Structures</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/code/utilities" className={styles.heroLink}>
            <div className={styles.heroBanner}>
              <div className={styles.heroContent}>
                <div className={styles.heroHeader}>
                  <h3 className={styles.heroTitle}>Production Utilities</h3>
                  <div className={styles.heroBadge}>Battle-Tested</div>
                </div>
                <p className={styles.heroDescription}>
                  Frontend toolkit of reusable functions. Performance optimization, 
                  type safety, and zero-dependency solutions for real applications.
                </p>
                <div className={styles.heroStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>0</span>
                    <span className={styles.statLabel}>Dependencies</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>100%</span>
                    <span className={styles.statLabel}>TypeScript</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>∞</span>
                    <span className={styles.statLabel}>Reusable</span>
                  </div>
                </div>
                <div className={styles.heroTech}>
                  <span>Debounce</span>
                  <span>Performance</span>
                  <span>Type Safety</span>
                  <span>Frontend Focus</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

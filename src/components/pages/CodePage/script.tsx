import React from 'react';
import Link from 'next/link';
import { PageContainer, PageHeader, SectionContainer, Section, Grid, Card } from '@/components/ui';
import styles from './style.module.css';

export default function CodePage() {
  return (
    <PageContainer>
      <PageHeader title="Code Showcase">
        Algorithms, utilities, and coding examples demonstrating problem-solving skills.
      </PageHeader>

      <SectionContainer>
        <Section title="Browse Code Collections">
          <Grid>
            <Link href="/code/exercises">
              <Card>
                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Algorithm Exercises</h3>
                    <div className={styles.badge}>Interactive</div>
                  </div>
                  <p className={styles.sectionDescription}>
                    Classic computer science problems and data structure implementations 
                    with multiple solution approaches and complexity analysis.
                  </p>
                  <div className={styles.features}>
                    <span className={styles.feature}>Multiple Solutions</span>
                    <span className={styles.feature}>Complexity Analysis</span>
                    <span className={styles.feature}>Test Cases</span>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/code/utilities">
              <Card>
                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Utility Functions</h3>
                    <div className={styles.badge}>Reusable</div>
                  </div>
                  <p className={styles.sectionDescription}>
                    Well-documented utility functions for common programming tasks,
                    with practical usage examples and implementation details.
                  </p>
                  <div className={styles.features}>
                    <span className={styles.feature}>TypeScript</span>
                    <span className={styles.feature}>Usage Examples</span>
                    <span className={styles.feature}>Documentation</span>
                  </div>
                </div>
              </Card>
            </Link>
          </Grid>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
}

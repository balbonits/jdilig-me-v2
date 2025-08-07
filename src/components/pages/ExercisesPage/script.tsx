import React from 'react';
import Link from 'next/link';
import { useCodeData } from '@/hooks/useCodeData';
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';
import styles from './style.module.css';

export default function ExercisesPage() {
  const { exercises, exercisesState, error } = useCodeData();

  if (exercisesState === 'loading') {
    return (
      <PageContainer>
        <div className={styles.loading}>Loading exercises...</div>
      </PageContainer>
    );
  }

  if (exercisesState === 'error') {
    return (
      <PageContainer>
        <div className={styles.error}>Error loading exercises: {error}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Code Exercises"
        subtitle="Algorithm & Data Structure Implementations"
      >
        A collection of coding exercises demonstrating various algorithms, data structures, 
        and problem-solving techniques. Each exercise includes multiple solution approaches 
        with complexity analysis.
      </PageHeader>

      <SectionContainer>
        <Section title={`${exercises.length} Exercises`}>
          <Grid>
            {exercises.map((exercise) => (
              <Link 
                key={exercise.slug} 
                href={`/code/exercises/${exercise.slug}`}
                className={styles.exerciseLink}
              >
                <Card className={styles.exerciseCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.exerciseTitle}>{exercise.metadata.title}</h3>
                    <div className={styles.solutionCount}>
                      {exercise.solutions.length} solution{exercise.solutions.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <p className={styles.exerciseDescription}>
                    {exercise.metadata.description}
                  </p>

                  <div className={styles.concepts}>
                    {exercise.metadata.concepts.slice(0, 3).map(concept => (
                      <span key={concept} className={styles.conceptTag}>
                        {concept}
                      </span>
                    ))}
                    {exercise.metadata.concepts.length > 3 && (
                      <span className={styles.moreTag}>
                        +{exercise.metadata.concepts.length - 3}
                      </span>
                    )}
                  </div>

                  <div className={styles.complexity}>
                    <div className={styles.complexityItem}>
                      <span className={styles.label}>Time:</span>
                      <code className={styles.value}>{exercise.metadata.timeComplexity}</code>
                    </div>
                    <div className={styles.complexityItem}>
                      <span className={styles.label}>Space:</span>
                      <code className={styles.value}>{exercise.metadata.spaceComplexity}</code>
                    </div>
                  </div>

                  {exercise.solutions.some(s => s.isOptimal) && (
                    <div className={styles.optimalBadge}>
                      ★ Optimal Solution Included
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </Grid>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
}
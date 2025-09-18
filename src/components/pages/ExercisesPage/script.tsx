import React from 'react';
import Link from 'next/link';
import { ExerciseData } from '@/interfaces/exercises';
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';
import { useAnalytics } from '@/hooks/useAnalytics';
import styles from './style.module.css';

interface ExercisesPageProps {
  exercises: ExerciseData[];
}

export default function ExercisesPage({ exercises }: ExercisesPageProps) {
  // Analytics hook for tracking exercise interactions
  // Helps understand which algorithms are most popular and engagement patterns
  const { trackCodeView, trackCodeInteraction } = useAnalytics();

  // Track when user clicks on an exercise card
  // Provides insights into which problems generate the most interest
  const handleExerciseClick = (exercise: ExerciseData) => {
    // Track the specific exercise being viewed
    trackCodeView({
      action: 'exercise_card_click',
      category: 'Code Showcase',
      exerciseSlug: exercise.slug,
      difficulty: exercise.metadata.difficulty,
      complexity: exercise.metadata.timeComplexity,
    });

    // Track the interaction type for UX analysis
    trackCodeInteraction('card_click', exercise.slug, 'exercise');
  };

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
          <Grid layout="2-col">
            {exercises.map((exercise) => (
              <Link 
                key={exercise.slug} 
                href={`/code/exercises/${exercise.slug}`}
                className={styles.exerciseLink}
                onClick={() => handleExerciseClick(exercise)}
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
                </Card>
              </Link>
            ))}
          </Grid>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
}
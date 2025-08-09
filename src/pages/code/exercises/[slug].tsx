import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { ExerciseData } from '@/interfaces/exercises';
import { TabContainer, Tab, Showcase, Grid, Card } from '@/components/ui';
import type { TabItem } from '@/components/ui/TabContainer';
import type { ShowcaseSection } from '@/components/ui/Showcase';
import styles from './exercise-showcase.module.css';

interface ExercisePageProps {
  exercise: ExerciseData;
}

export default function ExercisePage({ exercise }: ExercisePageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading exercise...</div>;
  }

  // Create solution tabs
  const tabs: TabItem[] = exercise.solutions.map(solution => ({
    id: solution.name,
    label: solution.approach,
    content: (
      <Tab padding="none">
        <div className={styles.solutionHeader}>
          <div className={styles.solutionInfo}>
            <h4>{solution.name}</h4>
            <div className={styles.solutionMeta}>
              <span>Time: {solution.timeComplexity}</span> | <span>Space: {solution.spaceComplexity}</span>
            </div>
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(solution.code)}
            className={styles.copyButton}
          >
            Copy
          </button>
        </div>
        <pre className={styles.codeBlock}>
          <code>{solution.code}</code>
        </pre>
      </Tab>
    ),
    metadata: solution.timeComplexity,
    badge: solution.isOptimal ? '★' : undefined,
    isHighlighted: solution.isOptimal
  }));

  // Create showcase sections
  const sections: ShowcaseSection[] = [
    {
      id: 'overview',
      title: 'Problem Overview',
      content: (
        <div className={styles.overviewContainer}>
          {/* Problem Description */}
          {exercise.metadata.detailedDescription && (
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Description</h4>
              <p className={styles.subsectionText}>
                {exercise.metadata.detailedDescription}
              </p>
              {exercise.metadata.examples && exercise.metadata.examples.length > 0 && (
                <div className={styles.examplesList}>
                  <h5 className={styles.examplesLabel}>Examples:</h5>
                  {exercise.metadata.examples.map((example, index) => (
                    <pre key={index} className={styles.exampleBlock}>
                      <code>{example}</code>
                    </pre>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Concepts */}
          <div className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>Concepts</h4>
            <div className={styles.conceptsContainer}>
              {exercise.metadata.concepts.map(concept => (
                <span key={concept} className={styles.conceptTag}>
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Complexity Analysis */}
          <div className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>Complexity Analysis</h4>
            <div className={styles.complexityGrid}>
              <div className={styles.complexityRow}>
                <div className={styles.complexityItem}>
                  <span className={styles.complexityLabel}>Time:</span>
                  <span className={styles.complexityValue}>
                    {exercise.metadata.timeComplexity}
                  </span>
                </div>
                <div className={styles.complexityItem}>
                  <span className={styles.complexityLabel}>Space:</span>
                  <span className={styles.complexityValue}>
                    {exercise.metadata.spaceComplexity}
                  </span>
                </div>
              </div>
              
              {exercise.metadata.performanceNotes && (
                <div className={styles.performanceNote}>
                  <h5 className={styles.performanceTitle}>Performance Notes:</h5>
                  <p className={styles.performanceText}>{exercise.metadata.performanceNotes}</p>
                </div>
              )}
              
              {exercise.metadata.approaches && exercise.metadata.approaches.length > 0 && (
                <div>
                  <h5 className={styles.approachesLabel}>Available Approaches:</h5>
                  <div className={styles.approachesContainer}>
                    {exercise.metadata.approaches.map((approach, index) => (
                      <div key={index} className={styles.approachItem}>
                        <span className={styles.approachArrow}>→</span>{approach}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'solutions',
      title: 'Solutions',
      content: <TabContainer tabs={tabs} emptyMessage="No solutions available" />
    },
    {
      id: 'examples',
      title: 'Examples & Test Cases',
      content: (
        <Grid minWidth="280px">
          {exercise.examples.map((example, index) => (
            <Card key={index}>
              <div className={styles.exampleHeader}>
                <span className={styles.exampleNumber}>
                  #{index + 1}
                </span>
                <span className={styles.exampleDescription}>
                  {example.description}
                </span>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.exampleSection}>
                  <span className={styles.exampleLabel}>Input:</span>
                  <code className={styles.exampleValue}>
                    {typeof example.input === 'object' 
                      ? JSON.stringify(example.input, null, 2)
                      : String(example.input)
                    }
                  </code>
                </div>
                <div className={styles.exampleSection}>
                  <span className={styles.exampleLabel}>Output:</span>
                  <code className={styles.exampleValue}>
                    {example.output instanceof Error 
                      ? example.output.message
                      : typeof example.output === 'object' 
                      ? JSON.stringify(example.output, null, 2)
                      : String(example.output)
                    }
                  </code>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      )
    }
  ];

  return (
    <Showcase
      title={exercise.metadata.title}
      subtitle={exercise.metadata.description}
      sections={sections}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Import exercises data
  const exercisesData = await import('../../../../public/exercises.json');
  const exercises = exercisesData.default as ExerciseData[];

  const paths = exercises.map((exercise) => ({
    params: { slug: exercise.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ExercisePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Import exercises data
  const exercisesData = await import('../../../../public/exercises.json');
  const exercises = exercisesData.default as ExerciseData[];

  const exercise = exercises.find((ex) => ex.slug === slug);

  if (!exercise) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      exercise,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
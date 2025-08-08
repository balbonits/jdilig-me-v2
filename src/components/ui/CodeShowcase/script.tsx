import React from 'react';
import { ExerciseData } from '@/interfaces/exercises';
import SolutionTabs from '@/components/ui/SolutionTabs';
import styles from './style.module.css';

interface CodeShowcaseProps {
  exercise: ExerciseData;
  className?: string;
}

export default function CodeShowcase({ exercise, className = '' }: CodeShowcaseProps) {
  return (
    <div className={`${styles.codeShowcase} ${className}`}>
      {/* 2-Column Layout: Description | Code */}
      <div className={styles.mainContent}>
        {/* Left Column: Description */}
        <div className={styles.description}>
          <div className={styles.header}>
            <h1 className={styles.title}>{exercise.metadata.title}</h1>
            <p className={styles.subtitle}>{exercise.metadata.description}</p>
          </div>

          <div className={styles.details}>
            <div className={styles.concepts}>
              <h3 className={styles.sectionTitle}>Concepts</h3>
              <div className={styles.conceptTags}>
                {exercise.metadata.concepts.map(concept => (
                  <span key={concept} className={styles.conceptTag}>
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.complexity}>
              <h3 className={styles.sectionTitle}>Complexity</h3>
              <div className={styles.complexityInfo}>
                <div className={styles.complexityItem}>
                  <span className={styles.label}>Time:</span>
                  <span className={styles.value}>{exercise.metadata.timeComplexity}</span>
                </div>
                <div className={styles.complexityItem}>
                  <span className={styles.label}>Space:</span>
                  <span className={styles.value}>{exercise.metadata.spaceComplexity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code */}
        <div className={styles.codeDisplay}>
          <SolutionTabs solutions={exercise.solutions} />
        </div>
      </div>

      {/* Bottom Row: Examples/Test Cases */}
      <div className={styles.examples}>
        <h3 className={styles.sectionTitle}>Examples & Test Cases</h3>
        <div className={styles.examplesGrid}>
          {exercise.examples.map((example, index) => (
            <div key={index} className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <span className={styles.exampleNumber}>#{index + 1}</span>
                <span className={styles.exampleDescription}>{example.description}</span>
              </div>
              <div className={styles.exampleContent}>
                <div className={styles.inputOutput}>
                  <div className={styles.input}>
                    <span className={styles.ioLabel}>Input:</span>
                    <code className={styles.ioValue}>
                      {typeof example.input === 'object' 
                        ? JSON.stringify(example.input, null, 2)
                        : String(example.input)
                      }
                    </code>
                  </div>
                  <div className={styles.output}>
                    <span className={styles.ioLabel}>Output:</span>
                    <code className={styles.ioValue}>
                      {example.output instanceof Error 
                        ? example.output.message
                        : typeof example.output === 'object' 
                        ? JSON.stringify(example.output, null, 2)
                        : String(example.output)
                      }
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
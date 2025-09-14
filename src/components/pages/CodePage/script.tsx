import React from 'react';
import Link from 'next/link';
import { PageContainer, PageHeader, SectionContainer } from '@/components/ui';
import { useAnalytics } from '@/hooks/useAnalytics';
import styles from './style.module.css';

export default function CodePage() {
  // Analytics hook for tracking user interactions on the code showcase page
  // This helps understand which sections users find most interesting
  const { trackNavigation, trackEngagement } = useAnalytics();

  // Track clicks on exercise showcase card
  // Provides insights into user interest in algorithm problems
  const handleExerciseClick = () => {
    trackNavigation('/code/exercises', 'code-showcase-card');
    trackEngagement('click', 'exercise-hero-card');
  };

  // Track clicks on utilities showcase card
  // Helps measure interest in practical utility functions
  const handleUtilityClick = () => {
    trackNavigation('/code/utilities', 'code-showcase-card');
    trackEngagement('click', 'utility-hero-card');
  };

  // Track clicks on patterns showcase card
  // Helps measure interest in design patterns
  const handlePatternsClick = () => {
    trackNavigation('/code/patterns', 'code-showcase-card');
    trackEngagement('click', 'patterns-hero-card');
  };

  // Track clicks on notes showcase card
  // Helps measure interest in interview cheat sheets and reference materials
  const handleNotesClick = () => {
    trackNavigation('/code/notes', 'code-showcase-card');
    trackEngagement('click', 'notes-hero-card');
  };

  return (
    <PageContainer>
      <PageHeader title="Code Showcase">
        Frontend engineering expertise through algorithms, utilities, design patterns, interview cheat sheets, and clean TypeScript implementations.
      </PageHeader>

      <SectionContainer>
        <div className={styles.heroGrid}>
          <Link href="/code/exercises" className={styles.heroLink} onClick={handleExerciseClick}>
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

          <Link href="/code/utilities" className={styles.heroLink} onClick={handleUtilityClick}>
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

          <Link href="/code/patterns" className={styles.heroLink} onClick={handlePatternsClick}>
            <div className={styles.heroBanner}>
              <div className={styles.heroContent}>
                <div className={styles.heroHeader}>
                  <h3 className={styles.heroTitle}>Design Patterns</h3>
                  <div className={styles.heroBadge}>25+ Patterns</div>
                </div>
                <p className={styles.heroDescription}>
                  Software design solutions in TypeScript. Gang of Four patterns plus modern 
                  JavaScript approaches for building maintainable, scalable applications.
                </p>
                <div className={styles.heroStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>4</span>
                    <span className={styles.statLabel}>Categories</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>3-5</span>
                    <span className={styles.statLabel}>Solutions Each</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>25+</span>
                    <span className={styles.statLabel}>Patterns</span>
                  </div>
                </div>
                <div className={styles.heroTech}>
                  <span>Creational</span>
                  <span>Structural</span>
                  <span>Behavioral</span>
                  <span>Modern JS/TS</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/code/notes" className={styles.heroLink} onClick={handleNotesClick}>
            <div className={styles.heroBanner}>
              <div className={styles.heroContent}>
                <div className={styles.heroHeader}>
                  <h3 className={styles.heroTitle}>Interview Notes</h3>
                  <div className={styles.heroBadge}>6 Cheat Sheets</div>
                </div>
                <p className={styles.heroDescription}>
                  Essential technical interview preparation materials. Comprehensive cheat sheets 
                  covering CSS, JavaScript, React, Git, and Agile methodologies.
                </p>
                <div className={styles.heroStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>6</span>
                    <span className={styles.statLabel}>Cheat Sheets</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>100%</span>
                    <span className={styles.statLabel}>Interview-Ready</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>📱</span>
                    <span className={styles.statLabel}>Mobile-First</span>
                  </div>
                </div>
                <div className={styles.heroTech}>
                  <span>CSS Fundamentals</span>
                  <span>JavaScript Gotchas</span>
                  <span>React Patterns</span>
                  <span>Git Workflows</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

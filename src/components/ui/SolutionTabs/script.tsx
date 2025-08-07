import React, { useState } from 'react';
import { Solution } from '@interfaces/exercises';
import styles from './style.module.css';

interface SolutionTabsProps {
  solutions: Solution[];
  className?: string;
}

export default function SolutionTabs({ solutions, className = '' }: SolutionTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!solutions || solutions.length === 0) {
    return <div className={styles.noSolutions}>No solutions available</div>;
  }

  const activeSolution = solutions[activeTab];

  return (
    <div className={`${styles.solutionTabs} ${className}`}>
      {/* Tab Headers */}
      <div className={styles.tabHeaders}>
        {solutions.map((solution, index) => (
          <button
            key={solution.name}
            className={`${styles.tabHeader} ${
              index === activeTab ? styles.active : ''
            } ${solution.isOptimal ? styles.optimal : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <span className={styles.tabLabel}>
              {solution.approach}
              {solution.isOptimal && <span className={styles.optimalBadge}>★</span>}
            </span>
            <span className={styles.complexity}>
              {solution.timeComplexity}
            </span>
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className={styles.tabContent}>
        <div className={styles.codeHeader}>
          <h4 className={styles.functionName}>{activeSolution.name}</h4>
          <div className={styles.complexityInfo}>
            <span className={styles.time}>Time: {activeSolution.timeComplexity}</span>
            <span className={styles.space}>Space: {activeSolution.spaceComplexity}</span>
          </div>
          <button 
            className={styles.copyButton}
            onClick={() => navigator.clipboard.writeText(activeSolution.code)}
            title="Copy code"
          >
            Copy
          </button>
        </div>
        
        <pre className={styles.codeBlock}>
          <code className={styles.typescript}>{activeSolution.code}</code>
        </pre>
      </div>
    </div>
  );
}
import React from 'react';
import styles from './style.module.css';

export default function ProjectsPage() {
  return (
    <div className={styles.projectsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.description}>
          A collection of my recent work and personal projects.
        </p>
      </div>
      
      <div className={styles.projectsGrid}>
        <div className={styles.projectCard}>
          <h3 className={styles.projectTitle}>Personal Website v2</h3>
          <p className={styles.projectDescription}>
            A complete rebuild of my personal website using Next.js, TypeScript, and Tailwind CSS v4.
          </p>
          <div className={styles.techStack}>
            <span className={styles.tech}>Next.js</span>
            <span className={styles.tech}>TypeScript</span>
            <span className={styles.tech}>Tailwind CSS</span>
          </div>
        </div>
        
        <div className={styles.projectCard}>
          <h3 className={styles.projectTitle}>More Projects Coming Soon</h3>
          <p className={styles.projectDescription}>
            Additional projects and case studies will be added here.
          </p>
        </div>
      </div>
    </div>
  );
}

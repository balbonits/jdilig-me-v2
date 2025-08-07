import React from 'react';
import styles from './style.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.hero}>
        <h1 className={styles.title}>About Me</h1>
        <p className={styles.subtitle}>
          Software Engineer & Problem Solver
        </p>
      </div>
      
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Background</h2>
          <p className={styles.text}>
            I'm a passionate software engineer with experience in full-stack development, 
            focusing on creating efficient, scalable, and user-friendly applications.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <h3 className={styles.categoryTitle}>Frontend</h3>
              <ul className={styles.skillList}>
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>CSS Modules</li>
              </ul>
            </div>
            
            <div className={styles.skillCategory}>
              <h3 className={styles.categoryTitle}>Backend</h3>
              <ul className={styles.skillList}>
                <li>Node.js</li>
                <li>Python</li>
                <li>Database Design</li>
                <li>API Development</li>
              </ul>
            </div>
            
            <div className={styles.skillCategory}>
              <h3 className={styles.categoryTitle}>Tools & Methods</h3>
              <ul className={styles.skillList}>
                <li>Git / GitHub</li>
                <li>Testing</li>
                <li>CI/CD</li>
                <li>Agile Development</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.text}>
            Feel free to reach out if you'd like to discuss opportunities or just chat about technology.
          </p>
        </section>
      </div>
    </div>
  );
}

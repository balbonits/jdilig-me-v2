import styles from './style.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>John Dilig</h1>
        <p className={styles.subtitle}>Full Stack Developer & Software Engineer</p>
        <p className={styles.description}>
          Welcome to my personal website. I'm passionate about building scalable web applications 
          and exploring new technologies.
        </p>
      </section>
      
      <section className={styles.highlight}>
        <h2 className={styles.sectionTitle}>What I Do</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Web Development</h3>
            <p>Building modern web applications with React, Next.js, and TypeScript</p>
          </div>
          <div className={styles.card}>
            <h3>Code Challenges</h3>
            <p>Solving algorithms and data structure problems</p>
          </div>
          <div className={styles.card}>
            <h3>Open Source</h3>
            <p>Contributing to the developer community</p>
          </div>
        </div>
      </section>
    </div>
  );
}

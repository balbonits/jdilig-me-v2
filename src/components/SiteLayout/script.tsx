import { useTheme } from '@/contexts/ThemeContext';
import styles from './style.module.css';

interface SiteLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function SiteLayout({ children, className = '' }: SiteLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`${styles.layout} ${className}`}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>My Site ({theme} mode)</h1>
          <button 
            onClick={toggleTheme}
            className={styles.themeToggle}
          >
            Toggle Theme
          </button>
        </div>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/code">Code</a>
          <a href="/about">About</a>
        </nav>
      </header>
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <p>© 2024 My Site. Built with Next.js.</p>
      </footer>
    </div>
  );
}
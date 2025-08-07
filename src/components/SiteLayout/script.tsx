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
        <nav className={styles.nav}>
          <div className={styles.navContainer}>
            {/* Logo/Brand */}
            <div className={styles.brand}>
              <h1 className={styles.title}>John Dilig</h1>
            </div>
            
            {/* Navigation Links */}
            <div className={styles.navLinks}>
              <a href="/" className={styles.navLink}>Home</a>
              <a href="/projects" className={styles.navLink}>Projects</a>
              <a href="/code" className={styles.navLink}>Code</a>
              <a href="/about" className={styles.navLink}>About</a>
            </div>
            
            {/* Theme Toggle */}
            <div className={styles.actions}>
              <button 
                onClick={toggleTheme}
                className={styles.themeToggle}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </nav>
      </header>
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2025 John Dilig. Built with Next.js & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
}
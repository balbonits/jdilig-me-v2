import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/router';
import styles from './style.module.css';

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          {/* Logo/Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.titleLink}>
              <h1 className={styles.title}>John Dilig</h1>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className={styles.navLinks}>
            <Link 
              href="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className={`${styles.navLink} ${isActive('/projects') ? styles.navLinkActive : ''}`}
            >
              Projects
            </Link>
            <Link 
              href="/code" 
              className={`${styles.navLink} ${isActive('/code') ? styles.navLinkActive : ''}`}
            >
              Code
            </Link>
            <Link 
              href="/about" 
              className={`${styles.navLink} ${isActive('/about') ? styles.navLinkActive : ''}`}
            >
              About
            </Link>
          </div>
          
          {/* Actions */}
          <div className={styles.actions}>
            <a 
              href="/resume.pdf" 
              download="resume.pdf"
              className={styles.resumeLink}
              aria-label="Download resume PDF"
              title="Download Resume"
            >
              📄
            </a>
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
  );
}

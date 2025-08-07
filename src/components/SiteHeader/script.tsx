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
            <h1 className={styles.title}>Reuel John Dilig</h1>
          </div>
          
          {/* Navigation Links */}
          <div className={styles.navLinks}>
            <a 
              href="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
            >
              Home
            </a>
            <a 
              href="/projects" 
              className={`${styles.navLink} ${isActive('/projects') ? styles.navLinkActive : ''}`}
            >
              Projects
            </a>
            <a 
              href="/code" 
              className={`${styles.navLink} ${isActive('/code') ? styles.navLinkActive : ''}`}
            >
              Code
            </a>
            <a 
              href="/about" 
              className={`${styles.navLink} ${isActive('/about') ? styles.navLinkActive : ''}`}
            >
              About
            </a>
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
  );
}

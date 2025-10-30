import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/router';
import MobileMenu from '@/components/ui/MobileMenu';
import NavDropdown from '@/components/ui/NavDropdown';
import styles from './style.module.css';

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const codeSubmenuItems = [
    { href: '/code/exercises', label: 'Exercises' },
    { href: '/code/utilities', label: 'Utilities' },
    { href: '/code/patterns', label: 'Design Patterns' },
    { href: '/code/notes', label: 'Notes' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
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
            <NavDropdown
              label="Code"
              href="/code"
              items={codeSubmenuItems}
              className={styles.navLink}
            />
            <Link
              href="/ui"
              className={`${styles.navLink} ${isActive('/ui') ? styles.navLinkActive : ''}`}
            >
              UI
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
            {/* Desktop actions */}
            <div className={styles.desktopActions}>
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
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                aria-pressed={theme === 'dark'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Mobile hamburger menu */}
            <button
              className={styles.hamburger}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
}

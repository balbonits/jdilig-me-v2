import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './style.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  {
    href: '/code',
    label: 'Code',
    subItems: [
      { href: '/code/exercises', label: 'Exercises' },
      { href: '/code/utilities', label: 'Utilities' },
      { href: '/code/patterns', label: 'Design Patterns' }
    ]
  },
  {
    href: '/ui',
    label: 'UI',
    subItems: [
      { href: '/ui/notes', label: 'Notes & Concepts' }
    ]
  },
  { href: '/about', label: 'About' }
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, onClose]);

  // Prevent body scroll when menu is open and set viewport height
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Calculate actual viewport height and set CSS variable
      const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setViewportHeight();
      window.addEventListener('resize', setViewportHeight);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('resize', setViewportHeight);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu */}
      <div 
        className={styles.menu}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Menu</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className={styles.navigation}>
          {navigationItems.map((item) => {
            const isActive = router.pathname === item.href;
            const hasSubItems = 'subItems' in item && item.subItems;
            const isSubItemActive = hasSubItems ? item.subItems.some(subItem => router.pathname === subItem.href) : false;
            
            return (
              <div key={item.href} className={styles.navGroup}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive || isSubItemActive ? styles.navLinkActive : ''}`}
                >
                  {item.label}
                </Link>
                {hasSubItems && (
                  <div className={styles.subItems}>
                    {item.subItems.map((subItem) => {
                      const isSubActive = router.pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`${styles.subNavLink} ${isSubActive ? styles.subNavLinkActive : ''}`}
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer with theme toggle, resume link, and contact info */}
        <div className={styles.footer}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          <a
            href="/resume.pdf"
            download="resume.pdf"
            className={styles.resumeLink}
            aria-label="Download resume PDF"
          >
            📄
            <span>Download Resume</span>
          </a>
          
        </div>
      </div>
    </>
  );
}
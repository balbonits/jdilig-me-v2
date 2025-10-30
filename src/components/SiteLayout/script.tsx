import { useState, useEffect } from 'react';
import SiteHeader from '@/components/SiteHeader';
import FloatingShare from '@/components/FloatingShare';
import { getVersionInfo } from '@/lib/version';
import { cn } from '@/utils';
import styles from './style.module.css';

interface SiteLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function SiteLayout({ children, className }: SiteLayoutProps) {
  const [version, setVersion] = useState<string>('...');

  useEffect(() => {
    getVersionInfo().then(info => {
      setVersion(info.version);
    }).catch(() => {
      setVersion('1.0.0');
    });
  }, []);

  return (
    <div className={cn(styles.layout, className)}>
      {/* Skip to main content link for keyboard navigation */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" className={styles.main} aria-label="Main content">
        {children}
      </main>

      <footer className={styles.footer} aria-label="Site footer">
        <div className={styles.footerContent}>
          <p>© 2025 John Dilig. Built with Next.js & TypeScript. <a href="https://github.com/balbonits/jdilig-me-v2" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub (opens in new tab)">Open Source (MIT)</a> • <a href="https://github.com/balbonits/jdilig-me-v2/wiki" target="_blank" rel="noopener noreferrer" aria-label="View project documentation wiki (opens in new tab)">Wiki</a></p>
          <p className={styles.versionInfo}>v{version} • <span title="Automatically versioned with semantic-release">Auto-versioned</span></p>
        </div>
      </footer>

      <FloatingShare />
    </div>
  );
}
import { useState, useEffect } from 'react';
import SiteHeader from '@/components/SiteHeader';
import FloatingShare from '@/components/FloatingShare';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
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
      <SiteHeader />
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2025 John Dilig. Built with Next.js & TypeScript. <a href="https://github.com/balbonits/jdilig-me-v2" target="_blank" rel="noopener noreferrer">Open Source (MIT)</a> • <a href="https://github.com/balbonits/jdilig-me-v2/wiki" target="_blank" rel="noopener noreferrer">Wiki</a></p>
          <p className={styles.versionInfo}>v{version} • <span title="Automatically versioned with semantic-release">Auto-versioned</span></p>
        </div>
      </footer>
      
      <FloatingShare />
      <PWAInstallPrompt />
    </div>
  );
}
import SiteHeader from '@/components/SiteHeader';
import FloatingShare from '@/components/FloatingShare';
import { cn } from '@/utils';
import styles from './style.module.css';

interface SiteLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function SiteLayout({ children, className }: SiteLayoutProps) {
  return (
    <div className={cn(styles.layout, className)}>
      <SiteHeader />
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2025 John Dilig. Built with Next.js & TypeScript. <a href="https://github.com/jdilig/jdilig-me-v2" target="_blank" rel="noopener noreferrer">Open Source (MIT)</a></p>
        </div>
      </footer>
      
      <FloatingShare />
    </div>
  );
}
import SiteHeader from '@/components/SiteHeader';
import styles from './style.module.css';

interface SiteLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function SiteLayout({ children, className = '' }: SiteLayoutProps) {
  return (
    <div className={`${styles.layout} ${className}`}>
      <SiteHeader />
      
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
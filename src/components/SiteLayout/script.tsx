import { useTheme } from '@/contexts/ThemeContext';

interface SiteLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function SiteLayout({ children, className = '' }: SiteLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  console.log('📐 SiteLayout render, theme:', theme);

  return (
    <div className={`site-layout ${className}`}>
      <header className="bg-primary text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">My Site ({theme} mode)</h1>
          <button 
            onClick={toggleTheme}
            className="bg-white text-primary px-3 py-1 rounded"
          >
            Toggle Theme
          </button>
        </div>
        <nav>
          <a href="/" className="text-white hover:underline mr-4">Home</a>
          <a href="/projects" className="text-white hover:underline mr-4">Projects</a>
          <a href="/code" className="text-white hover:underline mr-4">Code</a>
          <a href="/about" className="text-white hover:underline">About</a>
        </nav>
      </header>
      
      <main className="site-main">
        {children}
      </main>
      
      <footer className="bg-gray-100 p-4 text-center text-muted">
        <p>© 2024 My Site. Built with Next.js.</p>
      </footer>
    </div>
  );
}
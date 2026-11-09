import { createContext, useCallback, useContext, useSyncExternalStore } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// The inline script in _document sets data-theme on <html> before paint (saved choice, else the OS setting).
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function read(): ThemeMode {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}
function apply(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.body.classList.toggle('dark', theme === 'dark');
  document.body.classList.toggle('light', theme === 'light');
  listeners.forEach((l) => l());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<ThemeMode>(subscribe, read, () => 'light');
  const { trackThemeChange } = useAnalytics();

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = read() === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage may be blocked */
    }
    trackThemeChange(next);
  }, [trackThemeChange]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

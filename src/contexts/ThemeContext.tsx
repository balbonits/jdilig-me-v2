import { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  console.log('🎨 ThemeProvider render');
  const [theme, setTheme] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    console.log('🔄 toggleTheme called, current theme:', theme);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    console.log('⚡ ThemeProvider useEffect running');
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    console.log('💾 savedTheme from localStorage:', savedTheme);
    if (savedTheme) {
      console.log('🔄 Setting theme from localStorage:', savedTheme);
      setTheme(savedTheme);
    } else {
      console.log('💡 No saved theme, staying with default:', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
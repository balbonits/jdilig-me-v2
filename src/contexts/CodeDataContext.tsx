import { createContext, useContext, useEffect, useState } from 'react';

interface CodeItem {
  id: string;
  name: string;
  title: string;
  description: string;
  code: string;
}

interface CodeDataContextType {
  exercises: CodeItem[];
  utilities: CodeItem[];
  loading: boolean;
  error: string | null;
  refetchData: () => Promise<void>;
}

const CodeDataContext = createContext<CodeDataContextType | undefined>(undefined);

export function CodeDataProvider({ children }: { children: React.ReactNode }) {
  const [exercises, setExercises] = useState<CodeItem[]>([]);
  const [utilities, setUtilities] = useState<CodeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCodeData = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      setLoading(true);
      setError(null);
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      setExercises([
        { id: '1', name: 'test', title: 'Test Exercise', description: 'A test', code: 'console.log("test");' }
      ]);
      setUtilities([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCodeData();
  }, []);

  const contextValue = {
    exercises,
    utilities,
    loading,
    error,
    refetchData: loadCodeData,
  };

  return (
    <CodeDataContext.Provider value={contextValue}>
      {children}
    </CodeDataContext.Provider>
  );
}

export function useCodeData() {
  const context = useContext(CodeDataContext);
  if (context === undefined) {
    throw new Error('useCodeData must be used within a CodeDataProvider');
  }
  return context;
}
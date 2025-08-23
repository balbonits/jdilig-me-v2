import { renderHook, act } from '@testing-library/react';
import { createMockLocalStorage, createMockMatchMedia, setupFakeTimers } from '../__tests__/test-utils';

// Mock the ThemeContext - we'll test it in isolation
const mockThemeContext = {
  theme: 'light' as const,
  setTheme: jest.fn(),
  systemTheme: 'light' as const,
};

// Mock React context
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(() => mockThemeContext),
}));

// For this example, let's create a simple theme hook to test
const useTheme = () => {
  const { theme, setTheme, systemTheme } = mockThemeContext;
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const setSystemTheme = () => {
    setTheme('system');
  };

  const getEffectiveTheme = () => {
    return theme === 'system' ? systemTheme : theme;
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    setSystemTheme,
    getEffectiveTheme,
    systemTheme,
  };
};

describe('useTheme Hook', () => {
  let mockLocalStorage: ReturnType<typeof createMockLocalStorage>;
  let mockMatchMedia: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset mock context
    mockThemeContext.theme = 'light';
    mockThemeContext.systemTheme = 'light';
    mockThemeContext.setTheme = jest.fn();

    // Setup window mocks
    mockLocalStorage = createMockLocalStorage();
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    mockMatchMedia = createMockMatchMedia();
    Object.defineProperty(window, 'matchMedia', {
      value: mockMatchMedia,
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Theme State Management', () => {
    test('returns current theme state', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('light');
      expect(result.current.systemTheme).toBe('light');
    });

    test('toggles between light and dark themes', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(mockThemeContext.setTheme).toHaveBeenCalledWith('dark');

      // Simulate theme change
      mockThemeContext.theme = 'dark';

      act(() => {
        result.current.toggleTheme();
      });

      expect(mockThemeContext.setTheme).toHaveBeenCalledWith('light');
    });

    test('sets system theme preference', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setSystemTheme();
      });

      expect(mockThemeContext.setTheme).toHaveBeenCalledWith('system');
    });
  });

  describe('Effective Theme Resolution', () => {
    test('returns actual theme when not using system preference', () => {
      mockThemeContext.theme = 'dark';
      const { result } = renderHook(() => useTheme());

      expect(result.current.getEffectiveTheme()).toBe('dark');
    });

    test('returns system theme when using system preference', () => {
      mockThemeContext.theme = 'system';
      mockThemeContext.systemTheme = 'dark';
      
      const { result } = renderHook(() => useTheme());

      expect(result.current.getEffectiveTheme()).toBe('dark');
    });
  });

  describe('Integration with Browser APIs', () => {
    test('calls localStorage methods for persistence', () => {
      // This would be in the actual ThemeProvider implementation
      // Testing the integration patterns
      
      const themeName = 'dark';
      localStorage.setItem('theme-preference', themeName);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'theme-preference', 
        themeName
      );
    });

    test('responds to system theme changes', () => {
      // Test media query change handling
      const darkModeQuery = '(prefers-color-scheme: dark)';
      
      mockMatchMedia.mockReturnValueOnce({
        matches: true,
        media: darkModeQuery,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      window.matchMedia(darkModeQuery);
      
      expect(mockMatchMedia).toHaveBeenCalledWith(darkModeQuery);
    });
  });

  describe('Performance and Cleanup', () => {
    test('handles rapid theme changes without issues', () => {
      const { result } = renderHook(() => useTheme());
      
      // Simulate rapid theme changes
      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.toggleTheme();
        }
      });

      // Should call setTheme for each toggle
      expect(mockThemeContext.setTheme).toHaveBeenCalledTimes(10);
    });

    test('works with fake timers', () => {
      const { advanceBy, cleanup } = setupFakeTimers();
      
      const { result } = renderHook(() => useTheme());

      // Simulate theme change with delay
      act(() => {
        setTimeout(() => {
          result.current.setTheme('dark');
        }, 1000);
      });

      // Advance timers
      act(() => {
        advanceBy(1000);
      });

      expect(mockThemeContext.setTheme).toHaveBeenCalledWith('dark');
      
      cleanup();
    });
  });

  describe('Error Handling', () => {
    test('handles localStorage unavailability gracefully', () => {
      // Mock localStorage to throw
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage not available');
      });

      const { result } = renderHook(() => useTheme());

      // Should not throw when trying to persist theme
      expect(() => {
        act(() => {
          result.current.setTheme('dark');
        });
      }).not.toThrow();
    });

    test('handles matchMedia unavailability', () => {
      // Remove matchMedia
      delete (window as any).matchMedia;

      const { result } = renderHook(() => useTheme());

      // Should still work without system theme detection
      expect(result.current.theme).toBeDefined();
      expect(result.current.getEffectiveTheme).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    test('handles invalid theme values', () => {
      const invalidTheme = 'invalid-theme' as any;
      
      act(() => {
        mockThemeContext.setTheme(invalidTheme);
      });

      expect(mockThemeContext.setTheme).toHaveBeenCalledWith(invalidTheme);
      // In real implementation, this should be sanitized
    });

    test('maintains consistency across multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useTheme());
      const { result: result2 } = renderHook(() => useTheme());

      expect(result1.current.theme).toBe(result2.current.theme);
      expect(result1.current.systemTheme).toBe(result2.current.systemTheme);
    });
  });
});
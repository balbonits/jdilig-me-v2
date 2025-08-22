import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import PWAInstallPrompt from './script';

// Mock beforeinstallprompt event
class MockBeforeInstallPromptEvent extends Event {
  prompt = jest.fn().mockResolvedValue(undefined);
  userChoice = Promise.resolve({ outcome: 'accepted' as const });
  
  constructor() {
    super('beforeinstallprompt');
  }
}

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('PWAInstallPrompt', () => {
  let mockEvent: MockBeforeInstallPromptEvent;
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
    mockEvent = new MockBeforeInstallPromptEvent();
    
    // Reset window properties
    (window.matchMedia as jest.Mock).mockImplementation(() => ({
      matches: false
    }));
    
    // Reset navigator.standalone
    Object.defineProperty(window.navigator, 'standalone', {
      writable: true,
      value: undefined
    });
  });

  it('should not render when app is installed (standalone mode)', () => {
    (window.matchMedia as jest.Mock).mockImplementation(() => ({
      matches: true
    }));
    
    render(<PWAInstallPrompt />);
    
    expect(screen.queryByText('Install John Dilig Portfolio')).not.toBeInTheDocument();
  });

  it('should not render when app is installed (iOS standalone)', () => {
    Object.defineProperty(window.navigator, 'standalone', {
      writable: true,
      value: true
    });
    
    render(<PWAInstallPrompt />);
    
    expect(screen.queryByText('Install John Dilig Portfolio')).not.toBeInTheDocument();
  });

  it('should not render initially without beforeinstallprompt event', () => {
    render(<PWAInstallPrompt />);
    
    expect(screen.queryByText('Install John Dilig Portfolio')).not.toBeInTheDocument();
  });

  it('should show install prompt after beforeinstallprompt event with delay', async () => {
    render(<PWAInstallPrompt />);
    
    // Fire beforeinstallprompt event
    await act(async () => {
      window.dispatchEvent(mockEvent);
    });
    
    // Should not show immediately
    expect(screen.queryByText('Install John Dilig Portfolio')).not.toBeInTheDocument();
    
    // Should show after delay (using fake timers would be ideal)
    await waitFor(() => {
      expect(screen.getByText('Install John Dilig Portfolio')).toBeInTheDocument();
    }, { timeout: 4000 });
  });

  it('should handle install button click', async () => {
    render(<PWAInstallPrompt />);
    
    await act(async () => {
      window.dispatchEvent(mockEvent);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Install John Dilig Portfolio')).toBeInTheDocument();
    }, { timeout: 4000 });
    
    const installButton = screen.getByRole('button', { name: /install portfolio app/i });
    
    await act(async () => {
      fireEvent.click(installButton);
    });
    
    await waitFor(() => {
      expect(mockEvent.prompt).toHaveBeenCalled();
    });
  });

  it('should handle dismiss button and set localStorage', async () => {
    render(<PWAInstallPrompt />);
    
    await act(async () => {
      window.dispatchEvent(mockEvent);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Install John Dilig Portfolio')).toBeInTheDocument();
    }, { timeout: 4000 });
    
    const dismissButton = screen.getByRole('button', { name: /dismiss install prompt/i });
    
    await act(async () => {
      fireEvent.click(dismissButton);
    });
    
    expect(screen.queryByText('Install John Dilig Portfolio')).not.toBeInTheDocument();
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('pwa-prompt-dismissed', expect.any(String));
  });

  it('should not show prompt if recently dismissed (less than 24 hours)', async () => {
    const recentTime = Date.now() - (12 * 60 * 60 * 1000); // 12 hours ago
    mockLocalStorage.setItem('pwa-prompt-dismissed', recentTime.toString());
    
    render(<PWAInstallPrompt />);
    
    await act(async () => {
      window.dispatchEvent(mockEvent);
    });
    
    // Should not show even after event
    expect(screen.queryByText('Install John Dilig Portfolio')).not.toBeInTheDocument();
  });

  it('should show prompt if dismissed more than 24 hours ago', async () => {
    const oldTime = Date.now() - (25 * 60 * 60 * 1000); // 25 hours ago
    mockLocalStorage.setItem('pwa-prompt-dismissed', oldTime.toString());
    
    render(<PWAInstallPrompt />);
    
    await act(async () => {
      window.dispatchEvent(mockEvent);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Install John Dilig Portfolio')).toBeInTheDocument();
    }, { timeout: 4000 });
  });

  it('should hide prompt when app is installed via appinstalled event', async () => {
    render(<PWAInstallPrompt />);
    
    await act(async () => {
      window.dispatchEvent(mockEvent);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Install John Dilig Portfolio')).toBeInTheDocument();
    }, { timeout: 4000 });
    
    // Fire appinstalled event
    await act(async () => {
      window.dispatchEvent(new Event('appinstalled'));
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Install John Dilig Portfolio')).not.toBeInTheDocument();
    });
  });

  it('should have proper accessibility attributes', async () => {
    render(<PWAInstallPrompt />);
    
    await act(async () => {
      window.dispatchEvent(mockEvent);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Install John Dilig Portfolio')).toBeInTheDocument();
    }, { timeout: 4000 });
    
    const installButton = screen.getByRole('button', { name: /install portfolio app/i });
    const dismissButton = screen.getByRole('button', { name: /dismiss install prompt/i });
    
    expect(installButton).toHaveAttribute('aria-label', 'Install portfolio app');
    expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss install prompt');
  });

  it('should handle user choice rejection', async () => {
    const rejectedEvent = new MockBeforeInstallPromptEvent();
    rejectedEvent.userChoice = Promise.resolve({ outcome: 'dismissed' as const });
    
    render(<PWAInstallPrompt />);
    
    await act(async () => {
      window.dispatchEvent(rejectedEvent);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Install John Dilig Portfolio')).toBeInTheDocument();
    }, { timeout: 4000 });
    
    const installButton = screen.getByRole('button', { name: /install portfolio app/i });
    
    await act(async () => {
      fireEvent.click(installButton);
    });
    
    await waitFor(() => {
      expect(rejectedEvent.prompt).toHaveBeenCalled();
      expect(screen.queryByText('Install John Dilig Portfolio')).not.toBeInTheDocument();
    });
  });
});
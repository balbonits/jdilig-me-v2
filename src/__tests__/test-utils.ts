/**
 * Test Utilities - Common patterns and helpers for Jest testing
 * 
 * Provides standardized mocks, spies, and utility functions for consistent
 * testing across components and modules.
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// ============= MOCK UTILITIES =============

/**
 * Creates a mock localStorage with Jest spies
 * Provides realistic storage behavior with full spy capabilities
 */
export const createMockLocalStorage = () => {
  let store: Record<string, string> = {};
  
  const mockStorage = {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  };

  // Expose store for test inspection
  (mockStorage as any).__store = store;
  
  return mockStorage;
};

/**
 * Creates a mock window.matchMedia with configurable responses
 */
export const createMockMatchMedia = (matches: boolean = false) => {
  return jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

/**
 * Creates a mock IntersectionObserver for visibility testing
 */
export const createMockIntersectionObserver = () => {
  const mockObserver = {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  };

  (window as any).IntersectionObserver = jest.fn().mockImplementation((callback) => {
    return mockObserver;
  });

  return mockObserver;
};

/**
 * Creates a mock ResizeObserver for responsive testing
 */
export const createMockResizeObserver = () => {
  const mockObserver = {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  };

  (window as any).ResizeObserver = jest.fn().mockImplementation((callback) => {
    return mockObserver;
  });

  return mockObserver;
};

// ============= COMPONENT TESTING UTILITIES =============

/**
 * Custom render function with common providers and setup
 */
export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  // Add any common providers here (Theme, Router, etc.)
  return render(ui, options);
};

/**
 * Creates a mock component for testing component composition
 */
export const createMockComponent = (name: string) => {
  const MockComponent = ({ children, ...props }: any) => {
    return React.createElement(
      'div', 
      { 'data-testid': `mock-${name.toLowerCase()}`, ...props },
      children
    );
  };
  MockComponent.displayName = `Mock${name}`;
  return MockComponent;
};

// ============= ASYNC TESTING UTILITIES =============

/**
 * Waits for multiple async operations to complete
 */
export const waitForMultiple = (promises: Promise<any>[]) => {
  return Promise.allSettled(promises);
};

/**
 * Creates a controllable promise for testing async flows
 */
export const createControllablePromise = <T>() => {
  let resolve: (value: T) => void;
  let reject: (reason?: any) => void;
  
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve: resolve!, reject: reject! };
};

// ============= SPY UTILITIES =============

/**
 * Creates console spies with automatic cleanup
 */
export const createConsoleSpy = () => {
  const originalConsole = { ...console };
  const spies = {
    log: jest.spyOn(console, 'log').mockImplementation(() => {}),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
    error: jest.spyOn(console, 'error').mockImplementation(() => {}),
    info: jest.spyOn(console, 'info').mockImplementation(() => {}),
  };

  const restore = () => {
    Object.assign(console, originalConsole);
    Object.values(spies).forEach(spy => spy.mockRestore());
  };

  return { spies, restore };
};

/**
 * Creates a spy on window methods with automatic cleanup
 */
export const createWindowSpy = <K extends keyof Window>(
  method: K,
  implementation?: Window[K]
) => {
  const original = window[method];
  const spy = jest.spyOn(window, method);
  
  if (implementation) {
    spy.mockImplementation(implementation as any);
  }

  const restore = () => {
    spy.mockRestore();
    (window as any)[method] = original;
  };

  return { spy, restore };
};

// ============= DATA TESTING UTILITIES =============

/**
 * Generates mock data for testing components
 */
export const createMockData = {
  journey: (overrides = {}) => ({
    id: 'test-journey',
    icon: '🚀',
    title: 'Test Journey',
    description: 'Test journey description',
    color: 'blue' as const,
    ...overrides
  }),

  experience: (overrides = {}) => ({
    id: 'test-experience',
    icon: '🏆',
    title: 'Test Company',
    badge: 'Test Role • 2020-2023',
    description: 'Test experience description',
    color: 'orange' as const,
    ...overrides
  }),

  skill: (overrides = {}) => ({
    id: 'test-skill',
    title: 'Test Skills',
    level: 'Advanced',
    skills: ['JavaScript (5 years)', 'React (3 years)', 'TypeScript (2 years)'],
    color: 'purple' as const,
    ...overrides
  }),

  contact: (overrides = {}) => ({
    type: 'email' as const,
    label: 'Email',
    value: 'test@example.com',
    icon: '📧',
    href: 'mailto:test@example.com',
    ...overrides
  })
};

// ============= TIMER UTILITIES =============

/**
 * Sets up fake timers with common configurations
 */
export const setupFakeTimers = () => {
  jest.useFakeTimers();
  
  const advanceBy = (time: number) => {
    jest.advanceTimersByTime(time);
  };
  
  const runAllTimers = () => {
    jest.runAllTimers();
  };
  
  const cleanup = () => {
    jest.useRealTimers();
  };

  return { advanceBy, runAllTimers, cleanup };
};

// ============= ASSERTION HELPERS =============

/**
 * Custom matchers for common component testing scenarios
 */
export const customMatchers = {
  toHaveAccessibleName: (element: HTMLElement, name: string) => {
    const accessibleName = element.getAttribute('aria-label') || 
                          element.getAttribute('aria-labelledby') ||
                          element.textContent;
    return {
      pass: accessibleName === name,
      message: () => `Expected element to have accessible name "${name}", got "${accessibleName}"`
    };
  },

  toHaveProperColorVariant: (element: HTMLElement, variant: string) => {
    const classes = element.className;
    const hasVariant = classes.includes(variant);
    return {
      pass: hasVariant,
      message: () => `Expected element to have color variant "${variant}" class`
    };
  }
};
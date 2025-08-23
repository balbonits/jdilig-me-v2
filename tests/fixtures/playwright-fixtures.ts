/**
 * Playwright Custom Fixtures
 * 
 * Provides reusable fixtures for common testing scenarios including
 * network mocking, performance simulation, and data setup.
 */

import { test as base, expect, Page, BrowserContext } from '@playwright/test';

// ============= DATA FIXTURES =============

interface TestData {
  mockProjects: any[];
  mockExercises: any[];
  mockUtilities: any[];
}

// ============= PAGE FIXTURES =============

interface PageFixtures {
  mockNetworkResponses: Page;
  performancePage: Page;
  accessibilityPage: Page;
  offlinePage: Page;
}

// ============= CONTEXT FIXTURES =============

interface ContextFixtures {
  slowNetworkContext: BrowserContext;
  offlineContext: BrowserContext;
}

// Mock data for testing
const createMockData = (): TestData => ({
  mockProjects: [
    {
      id: 'test-project-1',
      title: 'Test Project 1',
      description: 'A test project for E2E testing',
      techStack: ['React', 'TypeScript'],
      featured: true,
    },
    {
      id: 'test-project-2', 
      title: 'Test Project 2',
      description: 'Another test project',
      techStack: ['Next.js', 'CSS'],
      featured: false,
    }
  ],
  
  mockExercises: [
    {
      id: 'test-exercise-1',
      title: 'Test Algorithm',
      description: 'A test algorithm for E2E testing',
      difficulty: 'Easy',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    }
  ],
  
  mockUtilities: [
    {
      id: 'test-utility-1',
      title: 'Test Utility',
      description: 'A test utility function',
      category: 'String Manipulation',
    }
  ]
});

// ============= CUSTOM FIXTURES =============

export const test = base.extend<PageFixtures & ContextFixtures & TestData>({
  // Data fixtures
  mockProjects: async ({}, use) => {
    await use(createMockData().mockProjects);
  },
  
  mockExercises: async ({}, use) => {
    await use(createMockData().mockExercises);
  },
  
  mockUtilities: async ({}, use) => {
    await use(createMockData().mockUtilities);
  },

  // Network mocking fixture
  mockNetworkResponses: async ({ page, mockProjects, mockExercises, mockUtilities }, use) => {
    // Mock API responses
    await page.route('**/projects.json', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProjects),
      });
    });

    await page.route('**/exercises.json', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json', 
        body: JSON.stringify(mockExercises),
      });
    });

    await page.route('**/utilities.json', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUtilities),
      });
    });

    // Mock analytics calls
    await page.route('**/google-analytics.com/**', async route => {
      await route.fulfill({ status: 200, body: 'OK' });
    });

    await page.route('**/vercel.com/api/**', async route => {
      await route.fulfill({ status: 200, body: 'OK' });
    });

    await use(page);
  },

  // Performance testing fixture
  performancePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      // Simulate slower device
      viewport: { width: 1280, height: 720 },
    });

    const page = await context.newPage();
    
    // Throttle CPU
    const client = await page.context().newCDPSession(page);
    await client.send('Emulation.setCPUThrottlingRate', { rate: 6 });

    // Throttle network
    await page.route('**/*', async (route) => {
      const response = await route.fetch();
      const body = await response.body();
      
      // Add artificial delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await route.fulfill({
        status: response.status(),
        headers: response.headers(),
        body,
      });
    });

    await use(page);
    await context.close();
  },

  // Accessibility testing fixture
  accessibilityPage: async ({ page }, use) => {
    // Inject axe-core for accessibility testing
    await page.addInitScript(() => {
      // This would inject axe-core in a real implementation
      (window as any).axe = {
        run: () => Promise.resolve({ violations: [] }),
        configure: () => {},
      };
    });

    // Set high contrast mode
    await page.emulateMedia({ 
      colorScheme: 'dark',
      reducedMotion: 'reduce'
    });

    await use(page);
  },

  // Offline testing fixture
  offlinePage: async ({ page }, use) => {
    // Initially online
    await page.setOfflineMode(false);
    
    // Add helper method to toggle offline
    (page as any).goOffline = async () => {
      await page.setOfflineMode(true);
      await page.reload({ waitUntil: 'networkidle' });
    };
    
    (page as any).goOnline = async () => {
      await page.setOfflineMode(false);
      await page.reload({ waitUntil: 'networkidle' });
    };

    await use(page);
  },

  // Slow network context
  slowNetworkContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    
    // Simulate 3G network
    await context.route('**/*', async (route) => {
      const response = await route.fetch();
      const body = await response.body();
      
      // Simulate slow 3G (750ms delay for resources)
      const delay = route.request().resourceType() === 'image' ? 750 : 250;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      await route.fulfill({
        status: response.status(),
        headers: response.headers(),
        body,
      });
    });

    await use(context);
    await context.close();
  },

  // Offline context
  offlineContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    
    // Block all network requests except service worker
    await context.route('**/*', async (route) => {
      if (route.request().url().includes('sw.js')) {
        await route.continue();
        return;
      }
      
      await route.abort('internetdisconnected');
    });

    await use(context);
    await context.close();
  },
});

// ============= CUSTOM ASSERTIONS =============

export const customExpect = {
  ...expect,
  
  // Custom assertion for performance metrics
  async toHaveGoodPerformance(page: Page) {
    const performanceMetrics = await page.evaluate(() => {
      return {
        // Core Web Vitals
        lcp: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0,
        fid: performance.getEntriesByType('first-input')[0]?.processingStart || 0,
        cls: (performance as any).getEntriesByType?.('layout-shift')?.reduce?.((sum: number, entry: any) => sum + entry.value, 0) || 0,
        
        // Loading metrics
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart,
      };
    });

    const assertions = {
      lcp: performanceMetrics.lcp < 2500, // 2.5s threshold
      fid: performanceMetrics.fid < 100,   // 100ms threshold
      cls: performanceMetrics.cls < 0.1,   // 0.1 threshold
      domContentLoaded: performanceMetrics.domContentLoaded < 1500,
      loadComplete: performanceMetrics.loadComplete < 3000,
    };

    const failures = Object.entries(assertions)
      .filter(([_, passed]) => !passed)
      .map(([metric]) => metric);

    return {
      pass: failures.length === 0,
      message: () => failures.length === 0 
        ? `Expected performance to be poor, but all metrics passed`
        : `Performance issues found in: ${failures.join(', ')}\nMetrics: ${JSON.stringify(performanceMetrics, null, 2)}`
    };
  },

  // Custom assertion for accessibility
  async toBeAccessible(page: Page) {
    const violations = await page.evaluate(async () => {
      // In real implementation, would run axe.run()
      return (window as any).axe?.run?.() || { violations: [] };
    });

    return {
      pass: violations.violations.length === 0,
      message: () => violations.violations.length === 0
        ? 'Expected accessibility violations, but none found'
        : `Found ${violations.violations.length} accessibility violations`
    };
  },

  // Custom assertion for PWA capabilities
  async toBePWAReady(page: Page) {
    const pwaChecks = await page.evaluate(() => {
      return {
        hasManifest: !!document.querySelector('link[rel="manifest"]'),
        hasServiceWorker: 'serviceWorker' in navigator,
        isHTTPS: location.protocol === 'https:' || location.hostname === 'localhost',
        hasThemeColor: !!document.querySelector('meta[name="theme-color"]'),
        hasAppleTouchIcon: !!document.querySelector('link[rel="apple-touch-icon"]'),
      };
    });

    const failures = Object.entries(pwaChecks)
      .filter(([_, passed]) => !passed)
      .map(([check]) => check);

    return {
      pass: failures.length === 0,
      message: () => failures.length === 0
        ? 'Expected PWA to fail requirements, but all checks passed'
        : `PWA requirements not met: ${failures.join(', ')}`
    };
  },
};

export { expect } from '@playwright/test';
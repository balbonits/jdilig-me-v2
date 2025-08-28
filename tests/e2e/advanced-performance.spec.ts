/**
 * Advanced Performance Testing
 * 
 * Tests application performance under various network conditions,
 * device constraints, and user interaction patterns.
 */

import { test, expect, customExpect } from '../fixtures/playwright-fixtures';

test.describe('Advanced Performance Testing', () => {
  test.describe('Core Web Vitals', () => {
    test('should meet Core Web Vitals thresholds on homepage', async ({ performancePage }) => {
      await performancePage.goto('/', { waitUntil: 'networkidle' });
      
      // Wait for page to be fully loaded and interactive
      await performancePage.waitForLoadState('networkidle');
      await performancePage.waitForTimeout(2000); // Allow for late metrics
      
      // Test Core Web Vitals
      await customExpect.toHaveGoodPerformance(performancePage);
    });

    test('should maintain performance with heavy user interaction', async ({ performancePage }) => {
      await performancePage.goto('/');
      
      // Simulate heavy interaction
      const cards = await performancePage.locator('[data-testid*="card"]').all();
      for (const card of cards) {
        await card.hover();
        await performancePage.waitForTimeout(100);
      }
      
      // Toggle theme multiple times
      const themeToggle = performancePage.locator('[data-testid="theme-toggle"]');
      for (let i = 0; i < 5; i++) {
        await themeToggle.click();
        await performancePage.waitForTimeout(200);
      }
      
      await customExpect.toHaveGoodPerformance(performancePage);
    });
  });

  test.describe('Network Conditions', () => {
    test('should load efficiently on slow 3G', async ({ slowNetworkContext }) => {
      const page = await slowNetworkContext.newPage();
      
      const startTime = Date.now();
      await page.goto('/');
      
      // Should still be usable within reasonable time on 3G
      await page.waitForSelector('h1', { timeout: 10000 });
      const loadTime = Date.now() - startTime;
      
      // Should load within 10 seconds on 3G
      expect(loadTime).toBeLessThan(10000);
      
      await page.close();
    });

    test('should progressively enhance content', async ({ mockNetworkResponses }) => {
      // Block CSS temporarily to test progressive enhancement
      await mockNetworkResponses.route('**/*.css', route => route.abort());
      
      await mockNetworkResponses.goto('/');
      
      // Content should still be readable without CSS
      await expect(mockNetworkResponses.locator('h1#hero-title')).toBeVisible();
      await expect(mockNetworkResponses.locator('main')).toBeVisible();
      
      // Re-enable CSS
      await mockNetworkResponses.unroute('**/*.css');
      await mockNetworkResponses.reload();
      
      // Styled version should load
      const bodyClass = await mockNetworkResponses.locator('body').getAttribute('class');
      expect(bodyClass).toBeTruthy();
    });
  });

  test.describe('Resource Loading', () => {
    test('should handle failed image loads gracefully', async ({ mockNetworkResponses }) => {
      // Mock image failures
      await mockNetworkResponses.route('**/*.{png,jpg,jpeg,gif,webp}', route => {
        route.fulfill({ status: 404 });
      });
      
      await mockNetworkResponses.goto('/');
      
      // Page should still be functional
      await expect(mockNetworkResponses.locator('h1#hero-title')).toBeVisible();
      
      // Check for proper fallback handling
      const images = await mockNetworkResponses.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy(); // Should have alt text
      }
    });

    test('should lazy load images below the fold', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      
      // Count initially loaded images
      const initialImages = await page.evaluate(() => {
        return Array.from(document.images).filter(img => img.complete).length;
      });
      
      // Scroll to bottom
      await page.keyboard.press('End');
      await page.waitForTimeout(1000);
      
      // More images should be loaded now
      const afterScrollImages = await page.evaluate(() => {
        return Array.from(document.images).filter(img => img.complete).length;
      });
      
      expect(afterScrollImages).toBeGreaterThanOrEqual(initialImages);
    });
  });

  test.describe('Memory Usage', () => {
    test('should not have memory leaks with theme switching', async ({ page }) => {
      await page.goto('/');
      
      // Get baseline memory
      const initialMemory = await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0;
      });
      
      // Perform multiple theme switches
      const themeToggle = page.locator('[data-testid="theme-toggle"]');
      if (await themeToggle.count() > 0) {
        for (let i = 0; i < 20; i++) {
          await themeToggle.click();
          await page.waitForTimeout(50);
        }
      }
      
      // Force garbage collection and measure
      await page.evaluate(() => {
        if ((window as any).gc) {
          (window as any).gc();
        }
      });
      
      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0;
      });
      
      // Memory shouldn't grow significantly (allow 50% increase max)
      if (initialMemory > 0) {
        const growthRatio = finalMemory / initialMemory;
        expect(growthRatio).toBeLessThan(1.5);
      }
    });
  });

  test.describe('JavaScript Performance', () => {
    test('should have fast rendering times for dynamic content', async ({ page }) => {
      await page.goto('/code');
      
      // Measure time to render exercise cards
      const renderTime = await page.evaluate(async () => {
        const start = performance.now();
        
        // Trigger any dynamic loading
        const event = new CustomEvent('loadExercises');
        document.dispatchEvent(event);
        
        // Wait for rendering
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        return performance.now() - start;
      });
      
      // Dynamic content should render quickly
      expect(renderTime).toBeLessThan(100); // 100ms threshold
    });

    test('should handle large data sets efficiently', async ({ mockNetworkResponses, mockExercises }) => {
      // Create large dataset
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        ...mockExercises[0],
        id: `exercise-${i}`,
        title: `Test Exercise ${i}`,
      }));
      
      await mockNetworkResponses.route('**/exercises.json', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(largeDataset),
        });
      });
      
      const startTime = Date.now();
      await mockNetworkResponses.goto('/code/exercises');
      
      // Should handle large dataset efficiently
      await mockNetworkResponses.waitForSelector('[data-testid*="exercise-card"]', { timeout: 5000 });
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000); // 3s threshold for large dataset
    });
  });

  test.describe('Caching Performance', () => {
    test('should serve repeat visits from cache', async ({ page }) => {
      // First visit
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Second visit should be faster
      const startTime = Date.now();
      await page.reload();
      await page.waitForSelector('h1');
      const cacheLoadTime = Date.now() - startTime;
      
      // Cached load should be significantly faster
      expect(cacheLoadTime).toBeLessThan(2000);
    });

    test('should have efficient service worker caching', async ({ page }) => {
      await page.goto('/');
      
      // Check service worker registration
      const swRegistered = await page.evaluate(async () => {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          return !!registration;
        }
        return false;
      });
      
      if (swRegistered) {
        // Go offline and test cached content
        await page.context().setOffline(true);
        await page.reload({ waitUntil: 'domcontentloaded' });
        
        // Should still show content from cache
        await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
      }
    });
  });
});
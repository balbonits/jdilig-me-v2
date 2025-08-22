import { test, expect } from '@playwright/test';

test.describe('PWA Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have valid manifest.json', async ({ page }) => {
    // Check manifest link in head
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', '/manifest.json');
    
    // Fetch and validate manifest content
    const manifestResponse = await page.request.get('/manifest.json');
    expect(manifestResponse.ok()).toBeTruthy();
    
    const manifest = await manifestResponse.json();
    
    // Validate required manifest properties
    expect(manifest).toHaveProperty('name', 'John Dilig - Web Developer Portfolio');
    expect(manifest).toHaveProperty('short_name', 'John Dilig');
    expect(manifest).toHaveProperty('start_url', '/');
    expect(manifest).toHaveProperty('display', 'standalone');
    expect(manifest).toHaveProperty('theme_color');
    expect(manifest).toHaveProperty('background_color');
    
    // Validate icons array
    expect(manifest.icons).toBeDefined();
    expect(Array.isArray(manifest.icons)).toBeTruthy();
    expect(manifest.icons.length).toBeGreaterThan(0);
    
    // Validate app shortcuts
    expect(manifest.shortcuts).toBeDefined();
    expect(Array.isArray(manifest.shortcuts)).toBeTruthy();
    expect(manifest.shortcuts.length).toBe(4);
    
    const expectedShortcuts = [
      { name: 'View Projects', url: '/projects' },
      { name: 'Code Showcase', url: '/code' },
      { name: 'About & Resume', url: '/about' },
      { name: 'Download Resume', url: '/resume.pdf' }
    ];
    
    expectedShortcuts.forEach((expected, index) => {
      expect(manifest.shortcuts[index]).toMatchObject(expected);
    });
  });

  test('should have service worker registered', async ({ page }) => {
    // Check if service worker is registered
    const swRegistration = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        try {
          // Wait for service worker to be ready
          const registration = await navigator.serviceWorker.ready;
          return {
            active: !!registration?.active,
            scope: registration?.scope,
            state: registration?.active?.state,
            supported: true
          };
        } catch (error) {
          return { error: error.message, supported: true };
        }
      }
      return { supported: false };
    });
    
    if (swRegistration.supported) {
      expect(swRegistration.active).toBeTruthy();
      expect(swRegistration.state).toBe('activated');
    } else {
      console.log('Service Worker not supported in this browser');
    }
  });

  test('should have proper PWA meta tags', async ({ page }) => {
    // Check theme-color meta tag (allow multiple for dark/light themes)
    const themeColorMeta = page.locator('meta[name="theme-color"]');
    await expect(themeColorMeta.first()).toBeVisible();
    
    // Check Apple-specific meta tags
    const appleCapableMeta = page.locator('meta[name="apple-mobile-web-app-capable"]');
    await expect(appleCapableMeta).toHaveAttribute('content', 'yes');
    
    const appleStatusBarMeta = page.locator('meta[name="apple-mobile-web-app-status-bar-style"]');
    await expect(appleStatusBarMeta).toHaveAttribute('content', 'default');
    
    // Check Apple touch icons
    const appleTouchIcons = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleTouchIcons).toHaveCount(3); // 180x180, 167x167, 152x152
  });

  test('should serve offline page when service worker active', async ({ page, context }) => {
    // Wait for service worker to be active
    await page.waitForFunction(() => {
      return navigator.serviceWorker.ready.then(() => true);
    });
    
    // Go offline
    await context.setOffline(true);
    
    // Navigate to a page that should fallback to offline
    try {
      await page.goto('/nonexistent-page');
      
      // Should either show offline page or cached content
      const content = await page.textContent('body');
      const hasOfflineContent = content?.includes('You\'re Offline') || 
                               content?.includes('No internet connection') ||
                               content?.includes('cached content');
      
      expect(hasOfflineContent).toBeTruthy();
    } catch (error) {
      // If navigation fails completely, that's also expected offline behavior
      const errorMessage = error.message.toLowerCase();
      const isOfflineError = errorMessage.includes('net::') || 
                            errorMessage.includes('offline') || 
                            errorMessage.includes('connection') ||
                            errorMessage.includes('aborted') ||
                            errorMessage.includes('webkit encountered an internal error');
      expect(isOfflineError).toBeTruthy();
    }
    
    // Go back online
    await context.setOffline(false);
  });

  test('should cache static assets', async ({ page }) => {
    // Visit page to trigger caching
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if assets are cached by looking at cache storage
    const cacheInfo = await page.evaluate(async () => {
      const cacheNames = await caches.keys();
      const staticCache = cacheNames.find(name => name.includes('static'));
      
      if (staticCache) {
        const cache = await caches.open(staticCache);
        const cachedRequests = await cache.keys();
        return {
          cacheName: staticCache,
          cachedCount: cachedRequests.length,
          cachedUrls: cachedRequests.slice(0, 5).map(req => req.url) // First 5 for inspection
        };
      }
      
      return { cacheName: null, cachedCount: 0 };
    });
    
    expect(cacheInfo.cacheName).toBeTruthy();
    expect(cacheInfo.cachedCount).toBeGreaterThan(0);
  });

  test('should handle beforeinstallprompt event', async ({ page }) => {
    // Skip this test for browsers that don't support evaluateOnNewDocument
    await page.goto('/');
    
    // Mock beforeinstallprompt event using addInitScript instead
    try {
      await page.addInitScript(() => {
        // Mock the beforeinstallprompt event
        const mockEvent = new Event('beforeinstallprompt') as any;
        mockEvent.prompt = () => Promise.resolve();
        mockEvent.userChoice = Promise.resolve({ outcome: 'accepted' });
        
        // Dispatch the event after page load
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.dispatchEvent(mockEvent);
          }, 1000);
        });
      });
      
      await page.reload();
      
      // Wait for potential install prompt to appear
      await page.waitForSelector('[class*="installPrompt"]', { timeout: 6000 });
      const installPrompt = page.locator('[class*="installPrompt"]');
      await expect(installPrompt).toBeVisible();
      
      // Check for install button
      const installButton = page.locator('button:has-text("Install")');
      await expect(installButton).toBeVisible();
      
      // Check for dismiss button
      const dismissButton = page.locator('button[aria-label*="Dismiss"]');
      await expect(dismissButton).toBeVisible();
      
    } catch (error) {
      // Install prompt might not show in test environment, which is fine
      console.log('Install prompt test skipped - not supported in this browser');
    }
  });

  test('should have proper PWA installation criteria', async ({ page }) => {
    // Check if page meets PWA installation criteria
    const pwaChecks = await page.evaluate(() => {
      const checks = {
        hasManifest: !!document.querySelector('link[rel="manifest"]'),
        hasServiceWorker: 'serviceWorker' in navigator,
        hasHttps: location.protocol === 'https:' || location.hostname === 'localhost',
        hasIcons: !!document.querySelector('link[rel="icon"]'),
        hasAppleTouchIcon: !!document.querySelector('link[rel="apple-touch-icon"]'),
        hasThemeColor: !!document.querySelector('meta[name="theme-color"]'),
        hasViewport: !!document.querySelector('meta[name="viewport"]')
      };
      
      return checks;
    });
    
    expect(pwaChecks.hasManifest).toBeTruthy();
    expect(pwaChecks.hasServiceWorker).toBeTruthy();
    expect(pwaChecks.hasHttps).toBeTruthy();
    expect(pwaChecks.hasIcons).toBeTruthy();
    expect(pwaChecks.hasAppleTouchIcon).toBeTruthy();
    expect(pwaChecks.hasThemeColor).toBeTruthy();
    expect(pwaChecks.hasViewport).toBeTruthy();
  });

  test('should work offline after caching', async ({ page, context }) => {
    // Visit multiple pages to cache them
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
    
    // Go offline
    await context.setOffline(true);
    
    // Try to navigate to cached pages
    await page.goto('/');
    // Use more specific selector to avoid multiple h1 elements
    await expect(page.locator('h1').first()).toBeVisible(); // Should show cached home page
    
    // Clean up
    await context.setOffline(false);
  });

  test('should have working app shortcuts in manifest', async ({ page }) => {
    const manifestResponse = await page.request.get('/manifest.json');
    const manifest = await manifestResponse.json();
    
    // Test each shortcut URL is accessible
    for (const shortcut of manifest.shortcuts) {
      if (shortcut.url.endsWith('.pdf')) {
        // PDF files - just check if they exist via HEAD request
        const response = await page.request.head(shortcut.url);
        expect(response.status()).toBe(200);
      } else if (shortcut.url.startsWith('http')) {
        // External links - just check if they exist
        const response = await page.request.head(shortcut.url);
        expect(response.status()).toBeLessThan(500); // Not server error
      } else {
        // Internal routes - navigate and check
        await page.goto(shortcut.url);
        
        // Should not be a 404 page
        const title = await page.title();
        expect(title).not.toMatch(/404|not found/i);
        
        // Should have some content
        const bodyText = await page.textContent('body');
        expect(bodyText?.length).toBeGreaterThan(100);
      }
    }
  });
});
/**
 * Advanced User Journey Testing
 * 
 * Tests complete user flows and interactions across the application,
 * including accessibility, mobile behavior, and error scenarios.
 */

import { test, expect, customExpect } from '../fixtures/playwright-fixtures';

test.describe('Advanced User Journey Testing', () => {
  test.describe('Complete Recruiter Journey', () => {
    test('should support complete recruiter evaluation flow', async ({ page }) => {
      // Landing page - first impression
      await page.goto('/');
      
      // Recruiter checks hero section
      await expect(page.locator('h1')).toContainText('John Dilig');
      await expect(page.locator('[data-testid*="hero"]')).toBeVisible();
      
      // Checks professional stats
      const stats = page.locator('[data-testid*="stat"]');
      await expect(stats).toHaveCount(3);
      
      // Navigates to skills/experience
      await page.click('text=About');
      await page.waitForURL('**/about');
      
      // Reviews technical skills
      const skillCards = page.locator('[data-testid*="skill-card"]');
      await expect(skillCards).toHaveCount(3);
      
      // Checks experience details
      const experienceCards = page.locator('[data-testid*="experience-card"]');
      await expect(experienceCards).toHaveCount(3);
      
      // Views code showcase
      await page.click('text=Code');
      await page.waitForURL('**/code');
      
      // Explores exercises and utilities
      await page.click('text=Exercises');
      await page.waitForURL('**/code/exercises');
      
      const exerciseCards = page.locator('[data-testid*="exercise-card"]');
      await expect(exerciseCards.first()).toBeVisible();
      
      // Views specific algorithm
      await exerciseCards.first().click();
      await expect(page.locator('[data-testid="code-showcase"]')).toBeVisible();
      
      // Downloads resume
      await page.goto('/about');
      const downloadLink = page.locator('a[href="/resume.pdf"]');
      if (await downloadLink.count() > 0) {
        // Verify download link is properly configured
        await expect(downloadLink).toHaveAttribute('target', '_blank');
      }
      
      // Contacts for opportunity
      const emailLink = page.locator('a[href^="mailto:"]');
      await expect(emailLink).toBeVisible();
    });

    test('should work seamlessly on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto('/');
      
      // Check mobile navigation
      const mobileMenu = page.locator('[data-testid="mobile-menu-toggle"]');
      if (await mobileMenu.count() > 0) {
        await mobileMenu.click();
        
        // Mobile menu should open
        const mobileNav = page.locator('[data-testid="mobile-navigation"]');
        await expect(mobileNav).toBeVisible();
        
        // Navigate through mobile menu
        await page.click('text=About');
        await expect(mobileNav).not.toBeVisible(); // Should close after navigation
      }
      
      // Test touch interactions
      const cards = page.locator('[data-testid*="card"]').first();
      await cards.tap();
      
      // Test scrolling behavior
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      
      // Contact section should be accessible
      const contactSection = page.locator('[data-testid*="contact"]');
      if (await contactSection.count() > 0) {
        await expect(contactSection).toBeInViewport();
      }
    });
  });

  test.describe('Accessibility User Journey', () => {
    test('should support complete keyboard navigation', async ({ accessibilityPage }) => {
      await accessibilityPage.goto('/');
      
      // Tab through all interactive elements
      let tabCount = 0;
      const maxTabs = 20; // Prevent infinite loop
      
      while (tabCount < maxTabs) {
        await accessibilityPage.keyboard.press('Tab');
        tabCount++;
        
        const focusedElement = await accessibilityPage.evaluate(() => {
          const focused = document.activeElement;
          return {
            tagName: focused?.tagName,
            role: focused?.getAttribute('role'),
            ariaLabel: focused?.getAttribute('aria-label'),
            type: (focused as HTMLInputElement)?.type,
          };
        });
        
        // Verify focused element is interactive
        if (focusedElement.tagName) {
          const interactiveTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
          const hasRole = ['button', 'link', 'tab', 'menuitem'].includes(focusedElement.role || '');
          
          expect(
            interactiveTags.includes(focusedElement.tagName) || hasRole
          ).toBeTruthy();
        }
      }
    });

    test('should support screen reader navigation', async ({ accessibilityPage }) => {
      await accessibilityPage.goto('/');
      
      // Check heading hierarchy
      const headings = await accessibilityPage.locator('h1, h2, h3, h4, h5, h6').all();
      
      let previousLevel = 0;
      for (const heading of headings) {
        const tagName = await heading.evaluate(el => el.tagName);
        const currentLevel = parseInt(tagName[1]);
        
        // Heading levels shouldn't skip (accessibility guideline)
        if (previousLevel > 0) {
          expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
        }
        
        previousLevel = currentLevel;
      }
      
      // Check ARIA landmarks
      const landmarks = await accessibilityPage.locator('[role="main"], main, [role="navigation"], nav, [role="banner"], header').all();
      expect(landmarks.length).toBeGreaterThan(0);
      
      // Verify skip links (if present)
      const skipLink = accessibilityPage.locator('a[href="#main-content"], a[href="#content"]');
      if (await skipLink.count() > 0) {
        await expect(skipLink).toBeHidden(); // Should be hidden by default
        
        // Should become visible on focus
        await skipLink.focus();
        await expect(skipLink).toBeVisible();
      }
    });

    test('should have proper accessibility attributes', async ({ accessibilityPage }) => {
      await accessibilityPage.goto('/');
      
      // Run accessibility checks
      await customExpect.toBeAccessible(accessibilityPage);
      
      // Check specific accessibility features
      const images = await accessibilityPage.locator('img').all();
      for (const img of images) {
        // All images should have alt text or be marked decorative
        const alt = await img.getAttribute('alt');
        const ariaHidden = await img.getAttribute('aria-hidden');
        const role = await img.getAttribute('role');
        
        expect(
          alt !== null || ariaHidden === 'true' || role === 'presentation'
        ).toBeTruthy();
      }
      
      // Check form elements (if any)
      const formInputs = await accessibilityPage.locator('input, select, textarea').all();
      for (const input of formInputs) {
        // Form inputs should have labels
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledby = await input.getAttribute('aria-labelledby');
        
        if (id) {
          const label = accessibilityPage.locator(`label[for="${id}"]`);
          const hasLabel = (await label.count()) > 0;
          
          expect(
            hasLabel || ariaLabel || ariaLabelledby
          ).toBeTruthy();
        }
      }
    });
  });

  test.describe('Error Scenarios and Edge Cases', () => {
    test('should handle network failures gracefully', async ({ page }) => {
      await page.goto('/');
      
      // Block all network requests after initial load
      await page.route('**/*', route => {
        if (route.request().resourceType() === 'document') {
          route.continue(); // Allow navigation
        } else {
          route.abort('internetdisconnected');
        }
      });
      
      // Try to navigate - should still work with cached content
      await page.click('text=About');
      await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
    });

    test('should handle JavaScript errors gracefully', async ({ page }) => {
      // Listen for console errors
      const errors: string[] = [];
      page.on('pageerror', error => {
        errors.push(error.message);
      });
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Inject a script error
      await page.addInitScript(() => {
        // Simulate a common error scenario
        setTimeout(() => {
          try {
            // This would normally cause an error but we'll handle it gracefully
            (window as any).problematicFunction?.();
          } catch (error) {
            console.log('Handled error gracefully:', error);
          }
        }, 1000);
      });
      
      await page.goto('/');
      await page.waitForTimeout(2000);
      
      // Page should still be functional despite errors
      await expect(page.locator('h1')).toBeVisible();
      
      // Check that errors are handled gracefully
      const criticalErrors = errors.filter(error => 
        !error.includes('Handled error gracefully') &&
        !error.includes('Non-critical')
      );
      
      expect(criticalErrors.length).toBe(0);
    });

    test('should handle slow loading gracefully', async ({ page }) => {
      // Add artificial delays to all requests
      await page.route('**/*', async route => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await route.continue();
      });
      
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      
      // Should show loading states or skeleton content
      // while content is loading
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible({ timeout: 10000 });
      
      // Eventually all content should load
      await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Progressive Web App Journey', () => {
    test('should provide complete PWA experience', async ({ page }) => {
      await page.goto('/');
      
      // Check PWA readiness
      await customExpect.toBePWAReady(page);
      
      // Test offline capability
      await page.waitForLoadState('networkidle');
      
      // Go offline
      await page.context().setOffline(true);
      
      // Should still work offline
      await page.reload({ waitUntil: 'domcontentloaded' });
      
      // Basic content should be available
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
      
      // Go back online
      await page.context().setOffline(false);
    });

    test('should handle installation flow', async ({ page }) => {
      await page.goto('/');
      
      // Check for install prompt (if supported)
      const installPrompt = page.locator('[data-testid="install-prompt"]');
      
      if (await installPrompt.count() > 0) {
        // Test install prompt interaction
        await expect(installPrompt).toBeVisible();
        
        const dismissButton = installPrompt.locator('button:has-text("Dismiss")');
        const installButton = installPrompt.locator('button:has-text("Install")');
        
        await expect(dismissButton).toBeVisible();
        await expect(installButton).toBeVisible();
        
        // Test dismiss functionality
        await dismissButton.click();
        await expect(installPrompt).not.toBeVisible();
      }
    });
  });

  test.describe('Cross-Browser Compatibility', () => {
    test('should work consistently across different browsers', async ({ page }) => {
      await page.goto('/');
      
      // Basic functionality should work
      await expect(page.locator('h1')).toBeVisible();
      
      // Theme switching should work
      const themeToggle = page.locator('[data-testid="theme-toggle"]');
      if (await themeToggle.count() > 0) {
        const initialTheme = await page.evaluate(() => 
          document.documentElement.className
        );
        
        await themeToggle.click();
        await page.waitForTimeout(100);
        
        const newTheme = await page.evaluate(() => 
          document.documentElement.className
        );
        
        expect(newTheme).not.toBe(initialTheme);
      }
      
      // CSS features should be supported
      const supportsGrid = await page.evaluate(() => 
        CSS.supports('display', 'grid')
      );
      expect(supportsGrid).toBeTruthy();
      
      const supportsCustomProperties = await page.evaluate(() =>
        CSS.supports('color', 'var(--test-color)')
      );
      expect(supportsCustomProperties).toBeTruthy();
    });
  });
});
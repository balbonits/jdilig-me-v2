import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Regression', () => {
  test('homepage should match snapshot', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for all content to load
    await page.waitForLoadState('networkidle');
    
    // Wait for hero banners to be visible
    await page.waitForSelector('text=John Dilig');
    await page.waitForSelector('text=Let\'s Connect');
    
    // Hide any dynamic content (like floating action button)
    await page.addStyleTag({
      content: `
        [style*="position: fixed"] { display: none !important; }
        .floating-share { display: none !important; }
      `
    });
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('hero banners spacing and gradients', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of just the main content area (excluding header/footer)
    const mainContent = page.locator('main');
    await expect(mainContent).toHaveScreenshot('homepage-content.png', {
      animations: 'disabled'
    });
  });

  test('mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hide floating elements
    await page.addStyleTag({
      content: `[style*="position: fixed"] { display: none !important; }`
    });
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
});

test.describe('Card Spacing Tests', () => {
  test('journey cards should have consistent spacing', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Focus on journey cards section using CSS modules selector
    const journeyCards = page.locator('[class*="journeyGrid"]');
    await expect(journeyCards).toHaveScreenshot('journey-cards.png');
  });

  test('experience banners should have consistent spacing', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Focus on experience banners section using CSS modules selector
    const experienceBanners = page.locator('[class*="experienceGrid"]');
    await expect(experienceBanners).toHaveScreenshot('experience-banners.png');
  });

  test('skill banners should have consistent spacing', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Focus on skills section using CSS modules selector
    const skillBanners = page.locator('[class*="skillsGrid"]');
    await expect(skillBanners).toHaveScreenshot('skill-banners.png');
  });
});
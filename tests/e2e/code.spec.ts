import { test, expect } from '@playwright/test';
import { EXPECTED_COUNTS, SAMPLE_EXERCISES, SAMPLE_UTILITIES } from '../fixtures/test-data-collections';

test.describe('Code Page', () => {
  test('should render and match visual snapshot', async ({ page }) => {
    await page.goto('/code');
    await expect(page).toHaveScreenshot('code-page.png', { fullPage: true });
  });

  test('should display exercise hero section with correct link', async ({ page }) => {
    await page.goto('/code');
    
    // Wait for content to load
    await expect(page.getByText('Algorithm Mastery')).toBeVisible();
    
    // Verify hero section content
    await expect(page.getByText('Computer science fundamentals')).toBeVisible();
    await expect(page.getByText('14+ Problems')).toBeVisible(); // Hardcoded in hero
    
    // Count exercise links (should be 1 hero banner link)
    const exerciseLinks = page.locator('a[href*="/code/exercises"]');
    await expect(exerciseLinks).toHaveCount(1);
  });

  test('should display utility hero section with correct link', async ({ page }) => {
    await page.goto('/code');
    
    // Wait for content to load
    await expect(page.getByText('Production Utilities')).toBeVisible();
    
    // Verify hero section content
    await expect(page.getByText('Frontend toolkit of reusable functions')).toBeVisible();
    await expect(page.getByText('Battle-Tested')).toBeVisible(); // Hardcoded badge
    
    // Count utility links (should be 1 hero banner link)
    const utilityLinks = page.locator('a[href*="/code/utilities"]');
    await expect(utilityLinks).toHaveCount(1);
  });

  test('should have working navigation links to exercise and utility showcase pages', async ({ page }) => {
    await page.goto('/code');
    
    // Verify section headers exist (these contain implicit navigation context)
    await expect(page.getByText('Algorithm Mastery')).toBeVisible();
    await expect(page.getByText('Production Utilities')).toBeVisible();
    
    // Verify cards are clickable links
    await expect(page.locator('a[href*="/code/exercises/"]').first()).toBeVisible();
    await expect(page.locator('a[href*="/code/utilities/"]').first()).toBeVisible();
  });
});

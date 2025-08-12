import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('should render and match visual snapshot', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveScreenshot('about-page.png', { fullPage: true });
  });
});

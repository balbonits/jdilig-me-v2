import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test('should render and match visual snapshot', async ({ page }) => {
    await page.goto('/projects');
    await expect(page).toHaveScreenshot('projects-page.png', { fullPage: true });
  });
});

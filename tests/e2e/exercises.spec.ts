import { test, expect } from '@playwright/test';

test.describe('Exercises Page', () => {
  test('should render and match visual snapshot', async ({ page }) => {
    await page.goto('/code/exercises');
    await expect(page).toHaveScreenshot('exercises-page.png', { fullPage: true });
  });
});

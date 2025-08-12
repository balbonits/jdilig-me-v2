import { test, expect } from '@playwright/test';

test.describe('Utilities Page', () => {
  test('should render and match visual snapshot', async ({ page }) => {
    await page.goto('/code/utilities');
    await expect(page).toHaveScreenshot('utilities-page.png', { fullPage: true });
  });
});

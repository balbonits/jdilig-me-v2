import { test, expect } from '@playwright/test';

test.describe('Code Page', () => {
  test('should render and match visual snapshot', async ({ page }) => {
    await page.goto('/code');
    await expect(page).toHaveScreenshot('code-page.png', { fullPage: true });
  });
});

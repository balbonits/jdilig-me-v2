import { test, expect } from '@playwright/test';

// This test checks that the favicon and related icons are present in the <head> and point to the correct files

test.describe('Favicon and App Icons', () => {
  test('should include all favicon and app icon links in <head>', async ({ page }) => {
    await page.goto('/');
    const head = await page.locator('head');

    // Favicon PNG 32x32
    await expect(head.locator('link[rel="icon"][type="image/png"][sizes="32x32"]')).toHaveAttribute('href', '/images/favicon/favicon-32x32.png');
    // Favicon PNG 16x16
    await expect(head.locator('link[rel="icon"][type="image/png"][sizes="16x16"]')).toHaveAttribute('href', '/images/favicon/favicon-16x16.png');
    // Shortcut icon (ICO)
    await expect(head.locator('link[rel="shortcut icon"]')).toHaveAttribute('href', '/images/favicon/favicon.ico');
    // Apple touch icon
    await expect(head.locator('link[rel="apple-touch-icon"][sizes="180x180"]')).toHaveAttribute('href', '/images/favicon/apple-touch-icon.png');
    // Manifest
    await expect(head.locator('link[rel="manifest"]')).toHaveAttribute('href', '/images/favicon/site.webmanifest');
  });
});

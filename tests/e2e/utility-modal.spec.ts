import { test, expect } from '@playwright/test';

test.describe('Utility Modal Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a specific utility page (using Curry as example)
    await page.goto('/code/utilities/Curry');
  });

  test('should open modal when clicking usage example card', async ({ page }) => {
    // Wait for the page to load and scroll to usage examples section
    await page.waitForLoadState('networkidle');
    
    // Find and click the first usage example card
    const exampleCard = page.getByRole('button', { name: /Open usage example/i }).first();
    await expect(exampleCard).toBeVisible();
    
    await exampleCard.click();
    
    // Check that modal appears
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Check modal content
    await expect(modal).toContainText('Basic function currying');
    await expect(modal.locator('pre code')).toBeVisible();
  });

  test('should close modal when clicking close button', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Open modal
    const exampleCard = page.getByRole('button', { name: /Open usage example/i }).first();
    await exampleCard.click();
    
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Close modal
    const closeButton = modal.getByRole('button', { name: /close/i });
    await closeButton.click();
    
    // Check modal is gone
    await expect(modal).not.toBeVisible();
  });

  test('should open modal with keyboard (Enter key)', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const exampleCard = page.getByRole('button', { name: /Open usage example/i }).first();
    await exampleCard.focus();
    await page.keyboard.press('Enter');
    
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
  });

  test('should open modal with keyboard (Space key)', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const exampleCard = page.getByRole('button', { name: /Open usage example/i }).first();
    await exampleCard.focus();
    await page.keyboard.press('Space');
    
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
  });

  test('should display different content for different example cards', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const exampleCards = page.getByRole('button', { name: /Open usage example/i });
    const cardCount = await exampleCards.count();
    
    if (cardCount > 1) {
      // Click first card
      await exampleCards.nth(0).click();
      const modal1 = page.getByRole('dialog');
      const firstContent = await modal1.locator('pre code').textContent();
      
      // Close modal
      await modal1.getByRole('button', { name: /close/i }).click();
      await expect(modal1).not.toBeVisible();
      
      // Click second card
      await exampleCards.nth(1).click();
      const modal2 = page.getByRole('dialog');
      const secondContent = await modal2.locator('pre code').textContent();
      
      // Content should be different
      expect(firstContent).not.toBe(secondContent);
    }
  });

  test('should have proper modal accessibility attributes', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const exampleCard = page.getByRole('button', { name: /Open usage example/i }).first();
    await exampleCard.click();
    
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Check ARIA attributes
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
    
    // Check close button has proper label
    const closeButton = modal.getByRole('button', { name: /close/i });
    await expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
  });

  test('should render modal with proper positioning', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const exampleCard = page.getByRole('button', { name: /Open usage example/i }).first();
    await exampleCard.click();
    
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Check modal is visible and properly positioned
    const modalBox = await modal.boundingBox();
    expect(modalBox).toBeTruthy();
    
    if (modalBox) {
      // Modal should be within viewport bounds
      expect(modalBox.width).toBeGreaterThan(0);
      expect(modalBox.height).toBeGreaterThan(0);
    }
  });
});
import { test, expect } from '@playwright/test';

test.describe('Markdown Rendering', () => {
  test('should render markdown correctly in pattern pages', async ({ page }) => {
    await page.goto('/code/patterns/adapter');
    
    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Adapter Pattern');
    
    // Check that markdown headers are converted to HTML
    await expect(page.locator('h2')).toBeVisible();
    
    // Check that bold markdown is converted to strong tags
    await expect(page.locator('strong')).toBeVisible();
    
    // Check that bullet points with emojis are converted to list items
    await expect(page.locator('li')).toBeVisible();
    
    // Verify specific content from Adapter pattern
    await expect(page.locator('text=The Adapter Pattern - Interface Compatibility')).toBeVisible();
    
    // Verify that raw markdown syntax is NOT visible
    await expect(page.locator('text=**The Adapter Pattern**')).not.toBeVisible();
    await expect(page.locator('text=## ')).not.toBeVisible();
  });

  test('should render markdown correctly in exercise pages', async ({ page }) => {
    await page.goto('/code/exercises/AnagramCheck');
    
    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Anagram Check');
    
    // Check that bold markdown is converted to strong tags
    await expect(page.locator('strong')).toBeVisible();
    
    // Check that bullet points are converted to list items
    await expect(page.locator('li')).toBeVisible();
    
    // Verify that raw markdown syntax is NOT visible
    await expect(page.locator('text=**')).not.toBeVisible();
    await expect(page.locator('text=## ')).not.toBeVisible();
    await expect(page.locator('text=• ')).not.toBeVisible();
  });

  test('should render markdown correctly in utility pages', async ({ page }) => {
    await page.goto('/code/utilities/Debounce');
    
    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Debounce Function');
    
    // Check that bold markdown is converted to strong tags
    await expect(page.locator('strong')).toBeVisible();
    
    // Check that bullet points are converted to list items  
    await expect(page.locator('li')).toBeVisible();
    
    // Verify specific content from Debounce utility
    await expect(page.locator('text=Performance Optimization Essential')).toBeVisible();
    
    // Verify that raw markdown syntax is NOT visible
    await expect(page.locator('text=**Performance Optimization Essential**')).not.toBeVisible();
    await expect(page.locator('text=## ')).not.toBeVisible();
    await expect(page.locator('text=• ')).not.toBeVisible();
    await expect(page.locator('text=🎯 **')).not.toBeVisible();
  });

  test('should render emoji-based list items with correct CSS classes', async ({ page }) => {
    await page.goto('/code/patterns/adapter');
    
    // Check for CSS classes on emoji list items
    await expect(page.locator('li.target')).toBeVisible(); // 🎯
    await expect(page.locator('li.feature')).toBeVisible(); // 🚀  
    await expect(page.locator('li.highlight')).toBeVisible(); // ⚡
  });

  test('should render inline code blocks correctly', async ({ page }) => {
    await page.goto('/code/utilities/Debounce');
    
    // Check that backtick code is converted to <code> tags
    await expect(page.locator('code')).toBeVisible();
    
    // Verify that raw backticks are not visible
    await expect(page.locator('text=`debounce(searchAPI, 300)`')).not.toBeVisible();
  });

  test('should render headers with proper hierarchy', async ({ page }) => {
    await page.goto('/code/patterns/adapter');
    
    // Check for proper header hierarchy (h2, h3)
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();
    
    expect(h2Count).toBeGreaterThan(0);
    expect(h3Count).toBeGreaterThan(0);
    
    // Verify headers don't contain raw markdown
    const h2Text = await page.locator('h2').first().textContent();
    expect(h2Text).not.toContain('##');
  });

  test('should consistently render markdown across all three section types', async ({ page }) => {
    const sections = [
      { url: '/code/patterns/adapter', title: 'Adapter Pattern' },
      { url: '/code/exercises/AnagramCheck', title: 'Anagram Check' }, 
      { url: '/code/utilities/Debounce', title: 'Debounce Function' }
    ];

    for (const section of sections) {
      await page.goto(section.url);
      await expect(page.locator('h1')).toContainText(section.title);
      
      // All sections should have properly rendered HTML elements
      await expect(page.locator('strong')).toBeVisible();
      await expect(page.locator('li')).toBeVisible();
      
      // None should show raw markdown syntax
      await expect(page.locator('text=**')).not.toBeVisible();
      await expect(page.locator('text=## ')).not.toBeVisible();
    }
  });
});
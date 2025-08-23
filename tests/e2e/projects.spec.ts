import { test, expect } from '@playwright/test';
import { EXPECTED_COUNTS, EXPECTED_PROJECTS } from '../fixtures/test-data-collections';

test.describe('Projects Page', () => {
  test('should render and match visual snapshot', async ({ page }) => {
    await page.goto('/projects');
    await expect(page).toHaveScreenshot('projects-page.png', { fullPage: true });
  });

  test('should display correct number of project cards matching data source', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for content to load
    await expect(page.getByText('All Projects')).toBeVisible();
    
    // Count project cards in "All Projects" section only (exclude hero section)
    const allProjectsSection = page.locator('section').filter({ hasText: 'All Projects' });
    const projectCards = allProjectsSection.locator('a[href*="/projects/"]');
    
    await expect(projectCards).toHaveCount(EXPECTED_COUNTS.projects); // Dynamic from central collection
    
    // Verify specific projects are present (using central data, use first() to avoid duplicates)
    for (const project of EXPECTED_PROJECTS) {
      await expect(page.getByText(project.title).first()).toBeVisible();
    }
  });

  test('should display all featured projects', async ({ page }) => {
    await page.goto('/projects');
    
    // Get featured projects from central data
    const featuredProjects = EXPECTED_PROJECTS.filter(p => p.featured);
    
    // Verify featured section exists
    await expect(page.getByText('Featured Projects')).toBeVisible();
    
    // Verify featured project descriptions are visible (use first() to avoid duplicates)
    for (const project of featuredProjects) {
      await expect(page.getByText(project.description, { exact: false }).first()).toBeVisible();
    }
  });
});

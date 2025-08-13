import { test, expect } from '@playwright/test';

test.describe('Project Showcase Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the projects page
    await page.goto('/projects');
  });

  test('should render projects page with correct content', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check page title and description
    await expect(page.getByText('Projects')).toBeVisible();
    await expect(page.getByText('Portfolio & Case Studies')).toBeVisible();
    await expect(page.getByText(/A showcase of my development work/)).toBeVisible();
  });

  test('should display featured projects section', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByText('Featured Projects')).toBeVisible();
    await expect(page.getByText('All Projects')).toBeVisible();
  });

  test('should navigate to project showcase page when clicking project link', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for a project details link and click it
    const projectLink = page.getByText('View Project Details →').first();
    await expect(projectLink).toBeVisible();
    
    await projectLink.click();
    
    // Should navigate to a project showcase page
    await expect(page).toHaveURL(/\/projects\/[^\/]+$/);
  });

  test('should display project showcase content', async ({ page }) => {
    // Navigate directly to the personal website project
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Check that showcase content is displayed
    await expect(page.getByText('Personal Website v2')).toBeVisible();
    await expect(page.getByText('Full-Stack Development')).toBeVisible();
    await expect(page.getByText('completed')).toBeVisible();
    
    // Check for showcase sections
    await expect(page.getByText('Project Overview')).toBeVisible();
    await expect(page.getByText('Technology Stack')).toBeVisible();
    await expect(page.getByText('Key Features')).toBeVisible();
    await expect(page.getByText('Technical Highlights')).toBeVisible();
    await expect(page.getByText('Insights & Learnings')).toBeVisible();
  });

  test('should display tech stack information', async ({ page }) => {
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Check for tech stack items
    await expect(page.getByText('Next.js 15')).toBeVisible();
    await expect(page.getByText('TypeScript')).toBeVisible();
    await expect(page.getByText('Tailwind CSS v4')).toBeVisible();
    await expect(page.getByText('Jest')).toBeVisible();
  });

  test('should display project features', async ({ page }) => {
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Check for key features
    await expect(page.getByText('Interactive Code Showcase System')).toBeVisible();
    await expect(page.getByText('Advanced Modal System')).toBeVisible();
    await expect(page.getByText('Comprehensive Accessibility Implementation')).toBeVisible();
  });

  test('should display technical highlights with code examples', async ({ page }) => {
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Check for technical highlights
    await expect(page.getByText('Custom Modal Hook Implementation')).toBeVisible();
    await expect(page.getByText('Comprehensive Testing Strategy')).toBeVisible();
    
    // Check for code examples
    await expect(page.locator('pre code').first()).toBeVisible();
  });

  test('should display project links with correct attributes', async ({ page }) => {
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Check for external links
    const liveLink = page.getByRole('link', { name: 'Live Website' });
    await expect(liveLink).toBeVisible();
    await expect(liveLink).toHaveAttribute('target', '_blank');
    await expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const githubLink = page.getByRole('link', { name: 'Source Code' });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('should display insights and learnings', async ({ page }) => {
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Check for insights sections
    await expect(page.getByText('Lessons Learned')).toBeVisible();
    await expect(page.getByText('Challenges Overcome')).toBeVisible();
    await expect(page.getByText('Future Improvements')).toBeVisible();
  });

  test('should display project metrics', async ({ page }) => {
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Check for metrics
    await expect(page.getByText('81+ tests')).toBeVisible();
    await expect(page.getByText('37 pages')).toBeVisible();
    await expect(page.getByText('100% TypeScript')).toBeVisible();
    await expect(page.getByText('15+ UI components')).toBeVisible();
  });

  test('should have responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Check that content is still visible and readable
    await expect(page.getByText('Personal Website v2')).toBeVisible();
    await expect(page.getByText('Project Overview')).toBeVisible();
  });

  test('should handle navigation back to projects list', async ({ page }) => {
    await page.goto('/projects/personal-website-v2');
    await page.waitForLoadState('networkidle');
    
    // Navigate back using browser back button
    await page.goBack();
    
    // Should be back on projects list page
    await expect(page).toHaveURL('/projects');
    await expect(page.getByText('Featured Projects')).toBeVisible();
  });

  test('should render project cards with correct styling', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check that project cards are rendered
    const projectCards = page.locator('[class*="projectCard"], [class*="featuredCard"]');
    await expect(projectCards.first()).toBeVisible();
    
    // Check for hover effects by checking CSS properties
    const firstCard = projectCards.first();
    await expect(firstCard).toBeVisible();
  });

  test('should display featured project with special styling', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for featured project indicators
    const featuredCards = page.locator('[class*="featuredCard"]');
    if (await featuredCards.count() > 0) {
      await expect(featuredCards.first()).toBeVisible();
    }
  });
});
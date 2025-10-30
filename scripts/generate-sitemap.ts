import fs from 'fs';
import path from 'path';
import { siteConfig } from '../src/config/site';

// Import data to get dynamic paths
import exercisesData from '../public/exercises.json';
import utilitiesData from '../public/utilities.json';
import patternsData from '../public/patterns.json';
import projectsData from '../public/projects.json';
import notesData from '../public/notes.json';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

function generateSitemap() {
  const baseUrl = 'https://jdilig.me';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages: SitemapEntry[] = [
    { url: '/', lastmod: currentDate, changefreq: 'daily', priority: 1.0 },
    { url: '/about', lastmod: currentDate, changefreq: 'monthly', priority: 0.9 },
    { url: '/projects', lastmod: currentDate, changefreq: 'weekly', priority: 0.9 },
    { url: '/code', lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { url: '/code/exercises', lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { url: '/code/utilities', lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { url: '/code/patterns', lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { url: '/code/notes', lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
    { url: '/ui', lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { url: '/ui/notes', lastmod: currentDate, changefreq: 'weekly', priority: 0.7 },
  ];

  // Dynamic pages
  const dynamicPages: SitemapEntry[] = [];

  // Add exercise pages
  exercisesData.forEach((exercise: any) => {
    dynamicPages.push({
      url: `/code/exercises/${exercise.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  // Add utility pages
  utilitiesData.forEach((utility: any) => {
    dynamicPages.push({
      url: `/code/utilities/${utility.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  // Add pattern pages
  patternsData.forEach((pattern: any) => {
    dynamicPages.push({
      url: `/code/patterns/${pattern.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  // Add project pages
  projectsData.forEach((project: any) => {
    dynamicPages.push({
      url: `/projects/${project.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    });
  });

  // Add notes pages (routes based on note type)
  notesData.forEach((note: any) => {
    const noteType = note.type || 'code'; // Default to 'code' for backwards compatibility
    const baseRoute = noteType === 'ui' ? '/ui/notes' : '/code/notes';

    dynamicPages.push({
      url: `${baseRoute}/${note.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Combine all pages
  const allPages = [...staticPages, ...dynamicPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap
  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, sitemap, 'utf8');

  console.log(`✅ Sitemap generated with ${allPages.length} URLs`);
}

// Run the generator
generateSitemap();
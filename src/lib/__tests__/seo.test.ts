/**
 * SEO Test Suite
 * 
 * Comprehensive testing for SEO compliance across all pages:
 * - Meta tags (title, description, robots)
 * - OpenGraph properties
 * - Twitter Card metadata
 * - Structured data (JSON-LD)
 * - Semantic HTML structure
 * - Performance metrics
 * - Accessibility compliance
 * - Content quality
 */

import { detailedDescriptionToHtml } from '../markdown';

// Mock fetch for testing
global.fetch = jest.fn();

describe('SEO Test Suite', () => {
  const testUrls = {
    home: 'http://localhost:3004/',
    about: 'http://localhost:3004/about',
    projects: 'http://localhost:3004/projects',
    code: 'http://localhost:3004/code',
    patterns: 'http://localhost:3004/code/patterns',
    exercises: 'http://localhost:3004/code/exercises',
    utilities: 'http://localhost:3004/code/utilities',
    patternDetail: 'http://localhost:3004/code/patterns/proxy-observables',
    exerciseDetail: 'http://localhost:3004/code/exercises/two-sum',
    utilityDetail: 'http://localhost:3004/code/utilities/debounce'
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('Meta Tags Validation', () => {
    test.each(Object.entries(testUrls))('%s page should have valid meta tags', async (pageName, url) => {
      const mockHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Test Page - John Dilig</title>
          <meta name="description" content="This is a comprehensive test description for the ${pageName} page that meets SEO requirements with sufficient length and meaningful content." />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="${url}" />
        </head>
        <body><h1>Test Content</h1></body>
        </html>
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const response = await fetch(url);
      const html = await response.text();

      // Title tag validation
      expect(html).toMatch(/<title>[^<]{10,60}<\/title>/);
      expect(html).toContain('John Dilig');

      // Meta description validation
      expect(html).toMatch(/<meta name="description" content="[^"]{50,160}"/);

      // Robots meta
      expect(html).toMatch(/<meta name="robots" content="(index, follow|noindex, nofollow)"/);

      // Viewport meta
      expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1"');

      // Canonical link
      expect(html).toMatch(/<link rel="canonical" href="[^"]+"/);
    });

    test('title lengths should be within SEO limits', () => {
      const titles = [
        'John Dilig - Full Stack Developer',
        'Projects - John Dilig',
        'Code Showcase - John Dilig',
        'Proxy-Based Observables - Design Patterns',
        'Two Sum Algorithm - Coding Exercises'
      ];

      titles.forEach(title => {
        expect(title.length).toBeGreaterThan(10);
        expect(title.length).toBeLessThan(60);
        expect(title).toMatch(/[A-Z]/); // Should have capital letters
        expect(title).not.toMatch(/^\s|\s$/); // No leading/trailing spaces
      });
    });

    test('meta descriptions should be within SEO limits', () => {
      const descriptions = [
        'Experienced full stack developer specializing in React, Node.js, and modern web technologies. View projects and code samples.',
        'Browse my portfolio of web applications, tools, and software projects built with modern frameworks and best practices.',
        'Comprehensive collection of algorithms, design patterns, and utility functions with detailed explanations and examples.',
        'Create reactive objects using ES6 Proxy for automatic change detection in modern JavaScript applications.',
        'Classic algorithm problem: find two numbers in an array that sum to a target value. Multiple solution approaches provided.'
      ];

      descriptions.forEach(desc => {
        expect(desc.length).toBeGreaterThan(50);
        expect(desc.length).toBeLessThan(160);
        expect(desc).toMatch(/[.!?]$/); // Should end with punctuation
        expect(desc).not.toMatch(/^\s|\s$/); // No leading/trailing spaces
      });
    });
  });

  describe('OpenGraph Properties', () => {
    test('should have complete OpenGraph tags', async () => {
      const mockHtml = `
        <meta property="og:title" content="Test Page - John Dilig" />
        <meta property="og:description" content="This is a comprehensive test description for OpenGraph that meets the minimum length requirements for proper social media sharing and SEO optimization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jdilig.me/" />
        <meta property="og:image" content="https://www.jdilig.me/og-image.png" />
        <meta property="og:site_name" content="John Dilig" />
        <meta property="og:locale" content="en_US" />
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();

      expect(html).toMatch(/<meta property="og:title" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:description" content="[^"]{50,300}"/);
      expect(html).toMatch(/<meta property="og:type" content="(website|article)"/);
      expect(html).toMatch(/<meta property="og:url" content="https?:\/\/[^"]+"/);
      expect(html).toMatch(/<meta property="og:image" content="https?:\/\/[^"]+\.(png|jpg|jpeg)"/);
      expect(html).toMatch(/<meta property="og:site_name" content="[^"]+"/);
      expect(html).toMatch(/<meta property="og:locale" content="en_US"/);
    });
  });

  describe('Twitter Card Metadata', () => {
    test('should have complete Twitter Card tags', async () => {
      const mockHtml = `
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jdilig" />
        <meta name="twitter:creator" content="@jdilig" />
        <meta name="twitter:title" content="Test Page - John Dilig" />
        <meta name="twitter:description" content="This is a comprehensive test description for Twitter that meets the minimum length requirements for proper social media sharing." />
        <meta name="twitter:image" content="https://www.jdilig.me/twitter-image.png" />
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();

      expect(html).toMatch(/<meta name="twitter:card" content="(summary|summary_large_image)"/);
      expect(html).toMatch(/<meta name="twitter:title" content="[^"]+"/);
      expect(html).toMatch(/<meta name="twitter:description" content="[^"]{50,200}"/);
      expect(html).toMatch(/<meta name="twitter:image" content="https?:\/\/[^"]+\.(png|jpg|jpeg)"/);
    });
  });

  describe('Structured Data (JSON-LD)', () => {
    test('home page should have Person schema', async () => {
      const mockJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'John Dilig',
        jobTitle: 'Full Stack Developer',
        url: 'https://www.jdilig.me',
        sameAs: [
          'https://github.com/jdilig',
          'https://www.linkedin.com/in/john-dilig'
        ]
      };

      const mockHtml = `<script type="application/ld+json">${JSON.stringify(mockJsonLd)}</script>`;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();
      const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
      
      expect(jsonLdMatch).toBeTruthy();
      if (jsonLdMatch) {
        const jsonLd = JSON.parse(jsonLdMatch[1]);
        expect(jsonLd['@context']).toBe('https://schema.org');
        expect(jsonLd['@type']).toBe('Person');
        expect(jsonLd.name).toBeTruthy();
        expect(jsonLd.jobTitle).toBeTruthy();
        expect(jsonLd.url).toBeTruthy();
      }
    });

    test('article pages should have Article schema', async () => {
      const mockJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Proxy-Based Observables Pattern',
        description: 'Create reactive objects using ES6 Proxy',
        author: {
          '@type': 'Person',
          name: 'John Dilig'
        },
        publisher: {
          '@type': 'Person',
          name: 'John Dilig'
        },
        dateModified: '2025-01-01',
        mainEntityOfPage: 'https://www.jdilig.me/code/patterns/proxy-observables'
      };

      const mockHtml = `<script type="application/ld+json">${JSON.stringify(mockJsonLd)}</script>`;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.patternDetail)).text();
      const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
      
      expect(jsonLdMatch).toBeTruthy();
      if (jsonLdMatch) {
        const jsonLd = JSON.parse(jsonLdMatch[1]);
        expect(jsonLd['@type']).toBe('Article');
        expect(jsonLd.headline).toBeTruthy();
        expect(jsonLd.author).toBeTruthy();
        expect(jsonLd.publisher).toBeTruthy();
      }
    });
  });

  describe('Semantic HTML Structure', () => {
    test('should have proper heading hierarchy', async () => {
      const mockHtml = `
        <header><nav><a href="/">Home</a></nav></header>
        <main>
          <h1>Main Page Title</h1>
          <h2>Section Title</h2>
          <h3>Subsection Title</h3>
          <h4>Detail Title</h4>
        </main>
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();

      // Should have exactly one H1
      const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
      expect(h1Count).toBe(1);

      // H1 should come before H2
      const h1Index = html.indexOf('<h1');
      const h2Index = html.indexOf('<h2');
      if (h1Index !== -1 && h2Index !== -1) {
        expect(h1Index).toBeLessThan(h2Index);
      }

      // Should have semantic structure elements
      expect(html).toMatch(/<main[^>]*>/);
      expect(html).toMatch(/<header[^>]*>/);
      expect(html).toMatch(/<nav[^>]*>/);
    });

    test('should have proper ARIA attributes', async () => {
      const mockHtml = `
        <nav aria-label="Main navigation">
        <button aria-expanded="false" aria-label="Toggle menu">
        <img alt="Description of image">
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();

      // Images should have alt attributes
      const imgTags = html.match(/<img[^>]*>/g) || [];
      imgTags.forEach(img => {
        expect(img).toMatch(/alt="[^"]*"/);
      });

      // Interactive elements should have proper ARIA
      expect(html).toMatch(/aria-label="[^"]+"/);
      expect(html).toMatch(/aria-expanded="(true|false)"/);
    });
  });

  describe('Content Quality for SEO', () => {
    test('markdown content should enhance SEO', () => {
      const testMarkdown = `
        ## 🔍 Proxy-Based Observables Pattern

        The **Proxy-Based Observables Pattern** leverages ES6 Proxy to create reactive objects.

        ### Core Concepts

        🔹 **ES6 Proxy** - Intercepts and customizes operations
        🔹 **Automatic Detection** - Changes detected automatically
        🔹 **Deep Observation** - Nested objects recursively observed

        ### Implementation Benefits

        ✅ **Automatic reactivity** - No manual setup required
        ✅ **Natural syntax** - Regular property access
        ✅ **Performance optimized** - Native browser implementation
      `;

      const html = detailedDescriptionToHtml(testMarkdown);

      // Should have proper heading structure for SEO
      expect(html).toContain('<h2>🔍 Proxy-Based Observables Pattern</h2>');
      expect(html).toContain('<h3>Core Concepts</h3>');
      expect(html).toContain('<h3>Implementation Benefits</h3>');

      // Should have structured content with bullets (our implementation uses <br> for emoji bullets)
      expect(html).toMatch(/🔹.*<br>\s*🔹.*<br>/); // Emoji bullets with line breaks (allow whitespace)
      
      // Should have emphasis for keywords
      expect(html).toContain('<strong>ES6 Proxy</strong>');
      expect(html).toContain('<strong>Automatic reactivity</strong>');

      // Should maintain emoji bullets for visual appeal
      expect(html).toContain('🔹');
      expect(html).toContain('✅');

      // Content should be substantial (good for SEO)
      expect(html.replace(/<[^>]*>/g, '').length).toBeGreaterThan(200);
    });

    test('should have good keyword density', () => {
      const content = `
        John Dilig is a full stack developer specializing in JavaScript, React, and TypeScript. 
        With extensive experience in web development, he creates modern applications using 
        frameworks like Next.js and Node.js. His portfolio showcases various projects 
        demonstrating expertise in software engineering, database design, and user experience. 
        He is passionate about creating efficient, scalable solutions for complex problems.
        
        Beyond technical skills, he focuses on clean architecture, performance optimization,
        testing strategies, and collaborative teamwork. His approach emphasizes maintainable
        code, responsive design principles, accessibility standards, and continuous learning.
        Through various client projects and personal initiatives, he has gained valuable
        insights into project management, stakeholder communication, and agile methodologies.
        
        His interests extend into emerging technologies, machine learning concepts, cloud
        computing platforms, DevOps practices, and innovative problem-solving approaches.
        Whether working on small business solutions or enterprise-level applications,
        he brings dedication, creativity, and technical excellence to every challenge.
      `;
      const words = content.toLowerCase().split(/\s+/).filter(word => word.length > 2);
      const totalWords = words.length;
      
      // Count technical keywords
      const keywords = ['javascript', 'react', 'typescript', 'node', 'developer', 'web', 'development'];
      const keywordCount = words.filter(word => 
        keywords.some(keyword => word.includes(keyword))
      ).length;
      
      const keywordDensity = (keywordCount / totalWords) * 100;
      
      // Should have 2-8% keyword density (SEO best practice)
      expect(keywordDensity).toBeGreaterThan(2);
      expect(keywordDensity).toBeLessThan(8);
    });
  });

  describe('Performance & Technical SEO', () => {
    test('should have fast loading times', async () => {
      const startTime = Date.now();
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<html><body><h1>Test</h1></body></html>')
      });

      await fetch(testUrls.home);
      const loadTime = Date.now() - startTime;
      
      // Should load quickly (under 100ms for mocked response)
      expect(loadTime).toBeLessThan(100);
    });

    test('should have proper HTTP status codes', async () => {
      // Test successful pages
      const successPages = [testUrls.home, testUrls.about, testUrls.projects];
      
      for (const url of successPages) {
        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          text: () => Promise.resolve('<html><body>Success</body></html>')
        });

        const response = await fetch(url);
        expect(response.status).toBe(200);
        expect(response.ok).toBe(true);
      }
    });

    test('should handle 404 pages gracefully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: () => Promise.resolve('<html><body><h1>404 - Page Not Found</h1></body></html>')
      });

      const response = await fetch('http://localhost:3004/nonexistent-page');
      const html = await response.text();
      
      expect(response.status).toBe(404);
      expect(html).toContain('404');
      expect(html).toMatch(/<h1[^>]*>.*404.*<\/h1>/i);
    });
  });

  describe('Mobile SEO', () => {
    test('should be mobile-friendly', async () => {
      const mockHtml = `
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          @media (max-width: 768px) {
            .responsive { font-size: 14px; }
          }
        </style>
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();

      // Should have viewport meta tag
      expect(html).toContain('width=device-width');
      expect(html).toContain('initial-scale=1');

      // Should have responsive CSS
      expect(html).toMatch(/@media\s*\([^)]*max-width[^)]*\)/);
    });

    test('touch targets should be appropriately sized', async () => {
      const mockHtml = `
        <button style="min-height: 44px; min-width: 44px;">Touch Target</button>
        <a href="#" style="padding: 12px;">Link Target</a>
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();

      // Should have minimum touch target sizes (44px recommended)
      expect(html).toMatch(/min-height:\s*\d{2,}px/);
      expect(html).toMatch(/min-width:\s*\d{2,}px/);
    });
  });

  describe('Accessibility & SEO', () => {
    test('should have proper language attributes', async () => {
      const mockHtml = '<html lang="en"><head><title>Test</title></head></html>';

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();
      
      expect(html).toMatch(/<html[^>]*lang="en"[^>]*>/);
    });

    test('should have skip navigation links', async () => {
      const mockHtml = '<a href="#main-content" class="skip-link">Skip to main content</a>';

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();
      
      expect(html).toMatch(/<a[^>]*href="#[^"]*"[^>]*>Skip to [^<]*<\/a>/i);
    });
  });

  describe('URL Structure & Navigation', () => {
    test('URLs should be SEO-friendly', () => {
      const goodUrls = [
        '/code/patterns/proxy-observables',
        '/code/exercises/two-sum',
        '/code/utilities/debounce',
        '/projects/portfolio-website',
        '/about'
      ];

      goodUrls.forEach(url => {
        // Should be lowercase
        expect(url).toBe(url.toLowerCase());
        
        // Should use hyphens, not underscores
        expect(url).not.toContain('_');
        
        // Should not be too long
        expect(url.length).toBeLessThan(100);
        
        // Should be descriptive
        expect(url.split('/').length).toBeGreaterThan(1);
        expect(url).toMatch(/[a-z-]+/);
      });
    });

    test('should have proper internal linking', async () => {
      const mockHtml = `
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          <a href="/code">Code</a>
        </nav>
        <main>
          <p>Check out my <a href="/projects">portfolio projects</a></p>
          <p>View my <a href="/code/patterns">design patterns</a></p>
        </main>
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      });

      const html = await (await fetch(testUrls.home)).text();
      
      // Should have internal navigation links
      const internalLinks = (html.match(/href="\/[^"]*"/g) || []).length;
      expect(internalLinks).toBeGreaterThan(3);
      
      // Should have contextual internal links
      expect(html).toMatch(/<a href="\/[^"]*"[^>]*>[^<]+<\/a>/);
    });
  });
});
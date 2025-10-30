#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { UIComponentData, UIComponentFrontmatter } from '../src/interfaces/ui-components';

const UI_COMPONENTS_DIR = path.join(__dirname, '../ui-components');
const OUTPUT_DIR = path.join(__dirname, '../public');

// Component file names to look for
const COMPONENT_FILES = {
  markdown: 'component.md',
  html: 'component.html',
  css: 'component.css',
  js: 'component.js'
};

interface ComponentFiles {
  markdown?: string;
  html?: string;
  css?: string;
  js?: string;
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(fileContent: string): { frontmatter: UIComponentFrontmatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    throw new Error('No frontmatter found in markdown file');
  }

  const frontmatterContent = match[1];
  const content = match[2].trim();

  // Parse YAML-like frontmatter
  const frontmatter: Partial<UIComponentFrontmatter> = {};
  const lines = frontmatterContent.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();

    // Handle arrays (tags, features, browserSupport, searchKeywords)
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      frontmatter[key as keyof UIComponentFrontmatter] = arrayContent
        .split(',')
        .map(item => item.trim().replace(/^['"]|['"]$/g, '')) as any;
    } else {
      // Remove quotes if present
      value = value.replace(/^['"]|['"]$/g, '');
      (frontmatter as any)[key] = value;
    }
  }

  return {
    frontmatter: frontmatter as UIComponentFrontmatter,
    content
  };
}

/**
 * Process markdown content with special shortcodes
 * Handles {{code:filename}} and {{demo:component-name}} shortcodes
 */
function processMarkdownShortcodes(
  content: string,
  componentPath: string,
  files: ComponentFiles
): string {
  let processedContent = content;

  // Process {{code:filename}} shortcodes
  const codeRegex = /\{\{code:(\w+(?:\.\w+)?)\}\}/g;
  processedContent = processedContent.replace(codeRegex, (match, filename) => {
    // Map filename to actual code
    let code = '';
    let language = 'text';

    if (filename === 'html' || filename === 'component.html') {
      code = files.html || '';
      language = 'html';
    } else if (filename === 'css' || filename === 'component.css') {
      code = files.css || '';
      language = 'css';
    } else if (filename === 'js' || filename === 'javascript' || filename === 'component.js') {
      code = files.js || '';
      language = 'javascript';
    }

    if (!code) {
      console.warn(`Warning: Code file ${filename} not found for shortcode`);
      return match; // Return original if not found
    }

    // Return as markdown code block
    return `\`\`\`${language}\n${code}\n\`\`\``;
  });

  // Process {{demo:component-name}} shortcodes
  // This will be a placeholder that the frontend can replace with actual demo
  const demoRegex = /\{\{demo:([\w-]+)\}\}/g;
  processedContent = processedContent.replace(demoRegex, (match, componentName) => {
    // Return a special marker that the frontend can recognize
    return `<!-- DEMO:${componentName} -->`;
  });

  return processedContent;
}

/**
 * Read component files from a directory
 */
function readComponentFiles(componentDir: string): ComponentFiles {
  const files: ComponentFiles = {};

  // Read markdown file (required)
  const markdownPath = path.join(componentDir, COMPONENT_FILES.markdown);
  if (fs.existsSync(markdownPath)) {
    files.markdown = fs.readFileSync(markdownPath, 'utf-8');
  }

  // Read HTML file (optional)
  const htmlPath = path.join(componentDir, COMPONENT_FILES.html);
  if (fs.existsSync(htmlPath)) {
    files.html = fs.readFileSync(htmlPath, 'utf-8');
  }

  // Read CSS file (optional)
  const cssPath = path.join(componentDir, COMPONENT_FILES.css);
  if (fs.existsSync(cssPath)) {
    files.css = fs.readFileSync(cssPath, 'utf-8');
  }

  // Read JS file (optional)
  const jsPath = path.join(componentDir, COMPONENT_FILES.js);
  if (fs.existsSync(jsPath)) {
    files.js = fs.readFileSync(jsPath, 'utf-8');
  }

  return files;
}

/**
 * Generate UI components JSON from component directories
 */
async function generateUIComponentsJSON() {
  console.log('🔄 Starting UI components generation...');

  // Ensure public directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Check if ui-components directory exists
  if (!fs.existsSync(UI_COMPONENTS_DIR)) {
    console.error(`❌ UI components directory not found: ${UI_COMPONENTS_DIR}`);
    process.exit(1);
  }

  // Get all component directories
  const componentDirs = fs.readdirSync(UI_COMPONENTS_DIR)
    .filter(item => {
      const itemPath = path.join(UI_COMPONENTS_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    })
    .sort();

  const components: UIComponentData[] = [];

  for (const dirName of componentDirs) {
    const componentPath = path.join(UI_COMPONENTS_DIR, dirName);

    try {
      console.log(`📦 Processing ${dirName}...`);

      // Read all component files
      const files = readComponentFiles(componentPath);

      if (!files.markdown) {
        console.warn(`⚠️  Skipping ${dirName}: No component.md file found`);
        continue;
      }

      // Parse frontmatter and content
      const { frontmatter, content } = parseFrontmatter(files.markdown);

      if (!frontmatter.title) {
        console.warn(`⚠️  Skipping ${dirName}: Missing required title in frontmatter`);
        continue;
      }

      // Process markdown content with shortcodes
      const processedContent = processMarkdownShortcodes(content, componentPath, files);

      // Generate ID and slug
      const slug = frontmatter.slug || dirName;
      const id = `ui-component-${slug}`;

      // Create UIComponentData object
      const componentData: UIComponentData = {
        id,
        slug,
        name: dirName,
        title: frontmatter.title,
        description: frontmatter.description || '',
        detailedDescription: frontmatter.detailedDescription || frontmatter.description || '',
        category: 'ui-component',
        tags: frontmatter.tags || [],
        htmlCode: files.html || '',
        cssCode: files.css || '',
        jsCode: files.js,
        content: processedContent,
        features: frontmatter.features,
        browserSupport: frontmatter.browserSupport,
        lastUpdated: frontmatter.lastUpdated || new Date().toISOString().split('T')[0],
        searchKeywords: frontmatter.searchKeywords
      };

      components.push(componentData);
      console.log(`✅ Processed ${dirName} successfully`);

    } catch (error) {
      console.error(`❌ Error processing ${dirName}:`, error);
    }
  }

  // Write ui-components.json (minified for production)
  const outputPath = path.join(OUTPUT_DIR, 'ui-components.json');
  const minifiedJSON = JSON.stringify(components);
  fs.writeFileSync(outputPath, minifiedJSON);

  const fileSizeKB = (Buffer.byteLength(minifiedJSON, 'utf8') / 1024).toFixed(1);
  console.log(`\n✅ Generated ui-components.json with ${components.length} components`);
  console.log(`📄 Output: ${outputPath} (${fileSizeKB} KB minified)`);

  // Validate generated data
  const uniqueSlugs = new Set(components.map(comp => comp.slug));
  if (uniqueSlugs.size !== components.length) {
    console.warn('⚠️  Warning: Duplicate slugs found in components data');
  }

  const tags = [...new Set(components.flatMap(comp => comp.tags))];
  console.log(`🏷️  Unique tags: ${tags.length}`);
  console.log(`📝 Tags: ${tags.join(', ')}`);

  // Show component names
  console.log(`\n📚 Components generated:`);
  components.forEach(comp => {
    const hasCode = [comp.htmlCode, comp.cssCode, comp.jsCode].filter(Boolean).length;
    console.log(`   - ${comp.title} (${comp.slug}) - ${hasCode} code files`);
  });

  return components;
}

// Run if called directly
if (require.main === module) {
  generateUIComponentsJSON()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Failed to generate UI components JSON:', error);
      process.exit(1);
    });
}

export { generateUIComponentsJSON };
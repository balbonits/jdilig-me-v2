/**
 * UI Component Data Interfaces
 * Type definitions for UI component showcase system
 */

export interface UIComponentData {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  detailedDescription?: string;
  category: 'ui-component';
  tags: string[];
  htmlCode: string;
  cssCode: string;
  jsCode?: string;
  content: string; // Processed markdown content with embedded code/demos
  features?: string[];
  browserSupport?: string[];
  lastUpdated?: string;
  searchKeywords?: string[];
}

export interface UIComponentFrontmatter {
  title: string;
  slug?: string;
  description: string;
  detailedDescription?: string;
  category?: 'ui-component';
  tags?: string[];
  features?: string[];
  browserSupport?: string[];
  lastUpdated?: string;
  searchKeywords?: string[];
}

export interface UIComponentFiles {
  markdown: string;
  html?: string;
  css?: string;
  js?: string;
}

export interface ProcessedUIComponent {
  data: UIComponentData;
  files: UIComponentFiles;
}
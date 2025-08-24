/**
 * Markdown processing utilities for project descriptions and content
 */

export interface MarkdownSection {
  title: string;
  content: string[];
}

export interface ProcessedMarkdown {
  intro: string[];
  sections: MarkdownSection[];
}

/**
 * Decode HTML entities that might be present in content
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");
}

/**
 * Convert markdown bold syntax to HTML strong tags
 */
function processBoldMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*:/g, '<strong>$1:</strong>');
}

/**
 * Process a single bullet point item with markdown formatting
 */
function processBulletPoint(line: string): string {
  let content = line.substring(2); // Remove '- '
  
  // Convert markdown bold to HTML
  content = processBoldMarkdown(content);
  
  // Decode HTML entities
  content = decodeHtmlEntities(content);
  
  return content;
}

/**
 * Process markdown text into structured sections
 * 
 * Handles:
 * - Markdown headers (## Header) and colon headers (Header:)
 * - Bullet points with bold formatting
 * - HTML entity decoding
 * - Intro content before first header
 */
export function processMarkdown(text: string): ProcessedMarkdown {
  if (!text) {
    return { intro: [], sections: [] };
  }
  
  // Normalize escaped sequences
  const normalized = text
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");
  
  const sections: MarkdownSection[] = [];
  const lines = normalized.split('\n');
  let currentSection: MarkdownSection | null = null;
  const introContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (line.length === 0) continue;
    
    // Markdown headers (## Header) or colon headers (Header:)
    if ((line.startsWith('## ') && line.length > 3) || (line.endsWith(':') && line.length > 1)) {
      // Save previous section
      if (currentSection) {
        sections.push(currentSection);
      }
      
      // Start new section - clean header text
      const headerText = line.startsWith('## ') ? line.substring(3) : line;
      currentSection = {
        title: headerText,
        content: []
      };
    }
    // Bullet points
    else if (line.startsWith('- ')) {
      if (currentSection) {
        const processedBullet = processBulletPoint(line);
        currentSection.content.push(processedBullet);
      }
    }
    // Regular content
    else {
      if (currentSection) {
        currentSection.content.push(line);
      } else {
        introContent.push(line);
      }
    }
  }
  
  // Save final section
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return {
    intro: introContent,
    sections: sections
  };
}

/**
 * Simple markdown to HTML converter for inline formatting
 */
export function markdownToHtml(text: string): string {
  let html = text;
  
  // Convert bold
  html = processBoldMarkdown(html);
  
  // Convert italic (single asterisk)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert inline code (backticks)
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Decode HTML entities
  html = decodeHtmlEntities(html);
  
  return html;
}
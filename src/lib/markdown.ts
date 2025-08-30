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
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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

/**
 * Convert detailed description markdown to HTML for patterns, exercises, and utilities
 * Handles the rich format used in detailedDescription fields
 */
export function detailedDescriptionToHtml(text: string): string {
  if (!text) return '';
  
  let html = text;
  
  // Normalize line endings and handle escaped newlines
  html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  html = html.replace(/\\n/g, '\n');
  
  // Convert headers (##, ###) - must be on their own lines, allowing leading whitespace
  html = html.replace(/^\s*### (.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^\s*## (.*)$/gm, '<h2>$1</h2>');
  
  // Convert bold text (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert italic text (*text*) - avoid interfering with bold
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>');
  
  // Convert inline code (`code`)
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  
  // Convert bullet points with different markers
  html = html.replace(/^• (.*$)/gm, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/^🔹 (.*$)/gm, '<li>$1</li>');
  html = html.replace(/^✅ (.*$)/gm, '<li class="success">$1</li>');
  html = html.replace(/^❌ (.*$)/gm, '<li class="error">$1</li>');
  html = html.replace(/^⚡ (.*$)/gm, '<li class="highlight">$1</li>');
  html = html.replace(/^🚀 (.*$)/gm, '<li class="feature">$1</li>');
  html = html.replace(/^🛠️ (.*$)/gm, '<li class="tool">$1</li>');
  html = html.replace(/^🎯 (.*$)/gm, '<li class="target">$1</li>');
  
  // Wrap consecutive list items in <ul> tags (fix regex)
  html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>\s*\n?)+/g, (match) => {
    // Remove any newlines within the match and clean up
    const cleanMatch = match.replace(/\n\s*/g, '');
    return `<ul>${cleanMatch}</ul>`;
  });
  
  // Split content by double newlines to identify sections
  const sections = html.split('\n\n').filter(section => section.trim());
  
  html = sections.map(section => {
    const trimmed = section.trim();
    
    // Check if this section is a block element (starts with HTML tags)
    if (trimmed.startsWith('<h') || 
        trimmed.startsWith('<ul') || 
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('<blockquote')) {
      return trimmed;
    }
    
    // Handle mixed content within a section
    const lines = trimmed.split('\n');
    const processedLines: string[] = [];
    let currentParagraph: string[] = [];
    
    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join('<br>').trim();
        if (paragraphText) {
          processedLines.push(`<p>${paragraphText}</p>`);
        }
        currentParagraph = [];
      }
    };
    
    for (const line of lines) {
      const lineTrimmed = line.trim();
      
      // Skip empty lines within section
      if (!lineTrimmed) continue;
      
      // Check if this line is already a block element
      const isBlockElement = lineTrimmed.startsWith('<h') || 
                            lineTrimmed.startsWith('<ul') || 
                            lineTrimmed.startsWith('<ol') ||
                            lineTrimmed.startsWith('<div') ||
                            lineTrimmed.startsWith('<blockquote');
      
      if (isBlockElement) {
        // Flush any pending paragraph before adding block element
        flushParagraph();
        processedLines.push(lineTrimmed);
      } else {
        // This is regular text, add to current paragraph
        currentParagraph.push(lineTrimmed);
      }
    }
    
    // Flush any remaining paragraph
    flushParagraph();
    
    return processedLines.join('');
  }).join('');
  
  // Decode HTML entities
  html = decodeHtmlEntities(html);
  
  return html;
}
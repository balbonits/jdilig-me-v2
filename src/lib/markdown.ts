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
 * Escape HTML characters to prevent XSS and ensure proper display in code blocks
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
  
  // Process diagram shortcodes first - [diagram:name alt="alt text"]
  html = html.replace(/\[diagram:([a-z-]+)(?:\s+alt="([^"]*)")?\]/g, (match, diagramName, altText) => {
    const alt = altText || `${diagramName.replace('-', ' ')} diagram`;
    const imgPath = `/notes/diagrams/${diagramName}.png`;

    // Attribution mapping for Wikimedia Commons diagrams
    const attributions: { [key: string]: string } = {
      'css-box-model': 'CSS Box Model by <a href="https://commons.wikimedia.org/wiki/User:Lazar.S.Mladenovic">Lazar.S.Mladenovic</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
      'flexbox-layout': 'CSS Grid x Flexbox Layout by <a href="https://commons.wikimedia.org/wiki/User:Allyhere">Allyhere</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
      'js-event-loop': 'Binary Search Flowchart by <a href="https://commons.wikimedia.org/wiki/User:NickyMcLean">Nicky McLean</a>, Public Domain, via Wikimedia Commons',
      'react-lifecycle': 'Finite State Machine by <a href="https://commons.wikimedia.org/wiki/User:Macguy314">Macguy314</a> & <a href="https://commons.wikimedia.org/wiki/User:Perhelion">Perhelion</a>, Public Domain, via Wikimedia Commons',
      'react-context-flow': 'Model Context Protocol Component Diagram by modelcontextprotocol developers, <a href="https://opensource.org/licenses/MIT">MIT License</a>, via Wikimedia Commons',
      'redux-data-flow': 'Data Flow Diagram by <a href="https://commons.wikimedia.org/wiki/User:AutumnSnow">AutumnSnow</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
      'git-workflow': 'Git Branching Workflow by <a href="https://commons.wikimedia.org/wiki/User:TheresNoTime">TheresNoTime</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
      'state-management-comparison': 'Comparison Chart by <a href="https://commons.wikimedia.org/wiki/User:Djanes">Djanes</a>, Public Domain, via Wikimedia Commons'
    };

    const attribution = attributions[diagramName] || 'Diagram from Wikimedia Commons';

    return `<div class="diagram-container">
      <img src="${imgPath}" alt="${alt}" class="diagram" />
      <p class="diagram-attribution">${attribution}</p>
    </div>`;
  });

  // Convert markdown tables
  html = html.replace(/^\|(.+)\|[ \t]*\n\|[-\s|]+\|[ \t]*\n((?:^\|.+\|[ \t]*(?:\n|$))*)/gm, (match, headerRow, separatorAndBody) => {
    // Parse header row
    const headers = headerRow.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell);

    // Parse body rows (everything after the separator line)
    const bodyLines = separatorAndBody.split('\n').filter((line: string) => line.trim() && line.includes('|'));
    const bodyRows = bodyLines.map((line: string) => {
      return line.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell);
    });

    // Build HTML table
    let tableHtml = '<table><thead><tr>';
    headers.forEach((header: string) => {
      tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';

    bodyRows.forEach((row: string[]) => {
      if (row.length > 0) {
        tableHtml += '<tr>';
        row.forEach((cell: string) => {
          tableHtml += `<td>${cell}</td>`;
        });
        tableHtml += '</tr>';
      }
    });

    tableHtml += '</tbody></table>';
    return tableHtml;
  });

  // Convert code blocks FIRST, before any other processing
  html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, language, code) => {
    const lang = language || '';
    const trimmedCode = code.trim();
    const langClass = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${langClass}>${escapeHtml(trimmedCode)}</code></pre>`;
  });

  // Convert headers (##, ###) - must be on their own lines, allowing leading whitespace
  html = html.replace(/^\s*### (.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^\s*## (.*)$/gm, '<h2>$1</h2>');

  // Convert bold text (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert italic text (*text*) - avoid interfering with bold
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>');

  // Convert inline code (`code`) - but not inside <pre><code> blocks
  html = html.replace(/`([^`\n]+)`/g, (match, code) => {
    return `<code>${escapeHtml(code)}</code>`;
  });

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

  // Convert single line breaks to <br> tags (but not in code blocks)
  html = html.replace(/\n(?![\n\s]*<)/g, '<br>');

  // Split content by double line breaks to identify sections
  const sections = html.split(/(?:<br>){2,}/g).filter(section => section.trim());

  html = sections.map(section => {
    const trimmed = section.trim();

    // Check if this section is a block element (starts with HTML tags)
    if (trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<table')) {
      return trimmed;
    }

    // For non-block content, wrap in a paragraph
    return `<p>${trimmed}</p>`;
  }).join('');
  
  // Decode HTML entities
  html = decodeHtmlEntities(html);
  
  return html;
}
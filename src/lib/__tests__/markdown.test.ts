import { detailedDescriptionToHtml, markdownToHtml } from '../markdown';

describe('Markdown Renderer', () => {
  describe('detailedDescriptionToHtml', () => {
    
    describe('Headers', () => {
      test('should convert ## headers to h2 tags', () => {
        const markdown = '## Main Header';
        const expected = '<h2>Main Header</h2>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should convert ### headers to h3 tags', () => {
        const markdown = '### Sub Header';
        const expected = '<h3>Sub Header</h3>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle headers with emojis', () => {
        const markdown = '## 🏗️ Abstract Factory Pattern';
        const expected = '<h2>🏗️ Abstract Factory Pattern</h2>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle multiple headers', () => {
        const markdown = `## Main Header
### Sub Header
## Another Main`;
        const result = detailedDescriptionToHtml(markdown);
        expect(result).toContain('<h2>Main Header</h2>');
        expect(result).toContain('<h3>Sub Header</h3>');
        expect(result).toContain('<h2>Another Main</h2>');
      });
    });

    describe('Bold Text', () => {
      test('should convert **text** to strong tags', () => {
        const markdown = '**Bold Text**';
        const expected = '<p><strong>Bold Text</strong></p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle bold text with colons', () => {
        const markdown = '**Core Problem Solved:**';
        const expected = '<p><strong>Core Problem Solved:</strong></p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle multiple bold sections', () => {
        const markdown = '**First** and **Second** bold text';
        const expected = '<p><strong>First</strong> and <strong>Second</strong> bold text</p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle bold text in different contexts', () => {
        const markdown = 'Text with **bold** and more text';
        const expected = '<p>Text with <strong>bold</strong> and more text</p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });
    });

    describe('Italic Text', () => {
      test('should convert *text* to em tags', () => {
        const markdown = '*Italic Text*';
        const expected = '<p><em>Italic Text</em></p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should not interfere with bold text', () => {
        const markdown = '**Bold** and *italic* text';
        const expected = '<p><strong>Bold</strong> and <em>italic</em> text</p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });
    });

    describe('Inline Code', () => {
      test('should convert `code` to code tags', () => {
        const markdown = '`debounce(searchAPI, 300)`';
        const expected = '<p><code>debounce(searchAPI, 300)</code></p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle multiple inline code blocks', () => {
        const markdown = 'Use `function()` and `variable` here';
        const expected = '<p>Use <code>function()</code> and <code>variable</code> here</p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle inline code with special characters', () => {
        const markdown = 'Pattern: `interface{}`';
        const expected = '<p>Pattern: <code>interface{}</code></p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });
    });

    describe('Bullet Points', () => {
      test('should convert • bullet points to li tags', () => {
        const markdown = '• First item\n• Second item';
        const expected = '<ul><li>First item</li><li>Second item</li></ul>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should convert - bullet points to li tags', () => {
        const markdown = '- First item\n- Second item';
        const expected = '<ul><li>First item</li><li>Second item</li></ul>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle emoji bullet points with CSS classes', () => {
        const markdown = '🎯 Target item\n🚀 Feature item\n⚡ Highlight item';
        const expected = '<ul><li class="target">Target item</li><li class="feature">Feature item</li><li class="highlight">Highlight item</li></ul>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle success/error indicators', () => {
        const markdown = '✅ Success item\n❌ Error item';
        const expected = '<ul><li class="success">Success item</li><li class="error">Error item</li></ul>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle mixed emoji bullet types', () => {
        const markdown = '🔹 Basic item\n🛠️ Tool item\n🎯 Target item';
        const expected = '<ul><li>Basic item</li><li class="tool">Tool item</li><li class="target">Target item</li></ul>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle bullet points with bold text', () => {
        const markdown = '• **Search Input:** Wait for user to stop typing\n• **Window Resize:** Avoid layout thrashing';
        const expected = '<ul><li><strong>Search Input:</strong> Wait for user to stop typing</li><li><strong>Window Resize:</strong> Avoid layout thrashing</li></ul>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle bullet points with inline code', () => {
        const markdown = '• Use `debounce(fn, 300)` for search\n• Use `throttle(fn, 100)` for scroll';
        const expected = '<ul><li>Use <code>debounce(fn, 300)</code> for search</li><li>Use <code>throttle(fn, 100)</code> for scroll</li></ul>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });
    });

    describe('Line Breaks and Paragraphs', () => {
      test('should handle single line breaks within paragraphs', () => {
        const markdown = 'Line one\nLine two';
        const expected = '<p>Line one<br>Line two</p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle double line breaks as paragraph separators', () => {
        const markdown = 'First paragraph\n\nSecond paragraph';
        const expected = '<p>First paragraph</p><p>Second paragraph</p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });

      test('should handle escaped newlines', () => {
        const markdown = 'First line\\nSecond line';
        const expected = '<p>First line<br>Second line</p>';
        expect(detailedDescriptionToHtml(markdown)).toBe(expected);
      });
    });

    describe('Complex Real-World Examples', () => {
      test('should handle pattern description with all elements', () => {
        const markdown = `🔗 **The Adapter Pattern - Interface Compatibility**

Allows incompatible interfaces to work together by providing a wrapper that translates one interface to another. Perfect for integration!

🎯 **Core Problem Solved:**
• Integrate incompatible interfaces without modifying existing code
• Wrap third-party libraries with consistent APIs
• Bridge legacy systems with modern applications

## Implementation Approaches

### Object Adapter
Use composition to adapt existing objects.

### Class Adapter  
Use inheritance for adaptation (less common in JS/TS).

🚀 **Real-World Applications:**
• API wrappers and gateway adapters
• Database ORM adapters for different databases
• Payment gateway integration layers

Use \`adapter.process()\` to handle the conversion.`;

        const result = detailedDescriptionToHtml(markdown);
        
        // Should contain headers
        expect(result).toContain('<h2>Implementation Approaches</h2>');
        expect(result).toContain('<h3>Object Adapter</h3>');
        // Accept Class Adapter with potential trailing spaces
        expect(result).toMatch(/<h3>Class Adapter\s*<\/h3>/);
        
        // Should contain bold text
        expect(result).toContain('<strong>The Adapter Pattern - Interface Compatibility</strong>');
        expect(result).toContain('<strong>Core Problem Solved:</strong>');
        expect(result).toContain('<strong>Real-World Applications:</strong>');
        
        // Should contain lists with classes
        expect(result).toContain('<li class="target">');
        expect(result).toContain('<li class="feature">');
        expect(result).toContain('<li>Integrate incompatible interfaces');
        
        // Should contain inline code
        expect(result).toContain('<code>adapter.process()</code>');
        
        // Should contain paragraph content
        expect(result).toContain('<p>Allows incompatible interfaces');
        expect(result).toContain('Use composition to adapt');
      });

      test('should handle utility description format', () => {
        const markdown = `⏱️ **Performance Optimization Essential**
Debouncing prevents functions from firing too frequently by delaying execution until a quiet period. Perfect for handling rapid user interactions!

🎯 **How Debouncing Works:**
• User types → Timer starts
• User types again → Timer resets
• User stops → Function executes after delay
• Result: Function runs once instead of dozens of times

⚡ **Two Implementation Variants:**
• **Standard Debounce:** Waits for quiet period before execution
• **Immediate Debounce:** Executes immediately, then prevents subsequent calls

🛠️ **Common Use Cases:**
• **Search Input:** \`debounce(searchAPI, 300)\` - Wait for user to stop typing
• **Window Resize:** \`debounce(handleResize, 100)\` - Avoid layout thrashing

🚀 **Performance Impact:**
• Reduces function calls by 90%+ in rapid-fire scenarios
• Prevents unnecessary API requests and DOM updates`;

        const result = detailedDescriptionToHtml(markdown);
        
        // Should contain emoji-classed lists
        expect(result).toContain('<li class="target">');
        expect(result).toContain('<li class="highlight">');
        expect(result).toContain('<li class="tool">');
        expect(result).toContain('<li class="feature">');
        
        // Should contain bold headers
        expect(result).toContain('<strong>Performance Optimization Essential</strong>');
        expect(result).toContain('<strong>How Debouncing Works:</strong>');
        
        // Should contain nested bold in lists
        expect(result).toContain('<li><strong>Standard Debounce:</strong>');
        expect(result).toContain('<li><strong>Search Input:</strong>');
        
        // Should contain inline code
        expect(result).toContain('<code>debounce(searchAPI, 300)</code>');
        expect(result).toContain('<code>debounce(handleResize, 100)</code>');
      });
    });

    describe('Edge Cases', () => {
      test('should handle empty input', () => {
        expect(detailedDescriptionToHtml('')).toBe('');
        expect(detailedDescriptionToHtml(null as string)).toBe('');
        expect(detailedDescriptionToHtml(undefined as string)).toBe('');
      });

      test('should handle input with only whitespace', () => {
        expect(detailedDescriptionToHtml('   \n\n   ')).toBe('');
      });

      test('should handle malformed markdown gracefully', () => {
        const markdown = '**Unclosed bold\n## Header without content\n• Bullet without content';
        const result = detailedDescriptionToHtml(markdown);
        
        // Should still process what it can
        expect(result).toContain('<h2>Header without content</h2>');
        expect(result).toContain('<ul><li>Bullet without content</li></ul>');
        expect(result).toContain('**Unclosed bold'); // Should leave malformed markdown as-is
      });

      test('should handle mixed line endings', () => {
        const markdown = 'Line 1\r\nLine 2\nLine 3\r\n\r\nNew paragraph';
        const result = detailedDescriptionToHtml(markdown);
        expect(result).toContain('<br>');
        expect(result).toContain('<p>New paragraph</p>');
      });

      test('should handle special characters in content', () => {
        const markdown = 'Text with <script> and &amp; characters';
        const result = detailedDescriptionToHtml(markdown);
        expect(result).toContain('<script>');
        expect(result).toContain('&');
      });
    });

    describe('Block Element Handling', () => {
      test('should not wrap headers in paragraph tags', () => {
        const markdown = '## Header\nSome text';
        const result = detailedDescriptionToHtml(markdown);
        expect(result).toContain('<h2>Header</h2>');
        // Headers should not be wrapped in paragraphs
        expect(result).not.toContain('<p><h2>');
        expect(result).not.toContain('<p>## Header</p>');
      });

      test('should not wrap lists in paragraph tags', () => {
        const markdown = '• Item 1\n• Item 2\nSome text';
        const result = detailedDescriptionToHtml(markdown);
        expect(result).toContain('<ul><li>Item 1</li><li>Item 2</li></ul>');
        // Lists should not be wrapped in paragraphs
        expect(result).not.toContain('<p><ul>');
        expect(result).not.toContain('<p>• Item');
      });
    });
  });

  describe('markdownToHtml (simple inline converter)', () => {
    test('should handle basic inline formatting', () => {
      const markdown = '**Bold** and *italic* and `code`';
      const expected = '<strong>Bold</strong> and <em>italic</em> and <code>code</code>';
      expect(markdownToHtml(markdown)).toBe(expected);
    });

    test('should decode HTML entities', () => {
      const markdown = '**Text** with &amp; entities';
      const expected = '<strong>Text</strong> with & entities';
      expect(markdownToHtml(markdown)).toBe(expected);
    });
  });

  describe('Performance and Stress Tests', () => {
    test('should handle large input efficiently', () => {
      const largeMarkdown = Array(1000).fill('• List item with **bold** text').join('\n');
      const start = performance.now();
      const result = detailedDescriptionToHtml(largeMarkdown);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
      expect(result).toContain('<ul>');
      expect(result).toContain('<li>List item with <strong>bold</strong> text</li>');
      expect((result.match(/<li>/g) || []).length).toBe(1000);
    });

    test('should handle deeply nested formatting', () => {
      const markdown = 'Text with **bold containing `code` inside** more text';
      const result = detailedDescriptionToHtml(markdown);
      expect(result).toContain('<strong>bold containing <code>code</code> inside</strong>');
    });
  });
});
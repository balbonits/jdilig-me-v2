import React from 'react';
import CodeBlock from '@/components/ui/CodeBlock';
import LiveDemo from '@/components/ui/LiveDemo';
import { detailedDescriptionToHtml } from '@/lib/markdown';
import styles from './style.module.css';

interface ComponentMarkdownRendererProps {
  content: string;
  className?: string;
  componentCodeSources?: {
    [key: string]: {
      html?: string;
      css?: string;
      js?: string;
      jsx?: string;
      typescript?: string;
    };
  };
}

/**
 * ComponentMarkdownRenderer
 *
 * Enhanced markdown renderer that supports UI component shortcodes:
 * - {{html:componentName}} - Renders HTML code in a CodeBlock
 * - {{css:componentName}} - Renders CSS code in a CodeBlock
 * - {{js:componentName}} or {{jsx:componentName}} - Renders JavaScript/JSX code in a CodeBlock
 * - {{typescript:componentName}} or {{ts:componentName}} - Renders TypeScript code in a CodeBlock
 * - {{demo:componentName}} - Renders a live demo of the component
 *
 * Falls back to regular markdown processing if shortcodes aren't present.
 *
 * @param content - The markdown text with potential shortcodes
 * @param className - Optional CSS class to apply
 * @param componentCodeSources - Optional map of component names to their code sources
 */
const ComponentMarkdownRenderer: React.FC<ComponentMarkdownRendererProps> = ({
  content,
  className = '',
  componentCodeSources = {}
}) => {
  if (!content) {
    return null;
  }

  // Process shortcodes and convert to React components
  const processShortcodes = (text: string): React.ReactNode[] => {
    // Pattern to match component shortcodes
    const shortcodePattern = /{{(html|css|js|jsx|typescript|ts|demo):([a-zA-Z0-9-_]+)(?:\s+([^}]+))?}}/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    while ((match = shortcodePattern.exec(text)) !== null) {
      const [fullMatch, type, componentName, params] = match;
      const beforeText = text.slice(lastIndex, match.index);

      // Add any text before the shortcode as HTML
      if (beforeText) {
        const html = detailedDescriptionToHtml(beforeText);
        parts.push(
          <div
            key={`text-${keyCounter++}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }

      // Parse optional parameters (e.g., height="400px" title="Example")
      const parseParams = (paramString: string | undefined): Record<string, string> => {
        const params: Record<string, string> = {};
        if (!paramString) return params;

        const paramPattern = /(\w+)="([^"]+)"/g;
        let paramMatch;
        while ((paramMatch = paramPattern.exec(paramString)) !== null) {
          params[paramMatch[1]] = paramMatch[2];
        }
        return params;
      };

      const parsedParams = parseParams(params);

      // Handle different shortcode types
      switch (type) {
        case 'html':
        case 'css':
        case 'js':
        case 'jsx':
        case 'typescript':
        case 'ts': {
          // Try to get code from provided sources first
          const codeSource = componentCodeSources[componentName];
          let code: string | undefined;
          let language: string = type;

          if (codeSource) {
            if (type === 'html' && codeSource.html) {
              code = codeSource.html;
              language = 'html';
            } else if (type === 'css' && codeSource.css) {
              code = codeSource.css;
              language = 'css';
            } else if ((type === 'js' || type === 'jsx') && (codeSource.js || codeSource.jsx)) {
              code = codeSource.js || codeSource.jsx;
              language = type === 'jsx' ? 'jsx' : 'javascript';
            } else if ((type === 'typescript' || type === 'ts') && codeSource.typescript) {
              code = codeSource.typescript;
              language = 'typescript';
            }
          }

          // If no code provided, try to load from file system (would need async handling)
          if (!code) {
            // For now, show a placeholder with instructions
            code = `// Component code for "${componentName}" not found.
// To display code, provide it via the componentCodeSources prop:
//
// <ComponentMarkdownRenderer
//   content={content}
//   componentCodeSources={{
//     "${componentName}": {
//       ${type}: \`// Your ${type.toUpperCase()} code here\`
//     }
//   }}
// />`;
            language = 'javascript';
          }

          parts.push(
            <CodeBlock
              key={`code-${keyCounter++}`}
              code={code}
              language={language}
              title={parsedParams.title || `${componentName}.${type}`}
              showCopy={parsedParams.showCopy !== 'false'}
            />
          );
          break;
        }

        case 'demo': {
          // Get the component code for the live demo
          const codeSource = componentCodeSources[componentName];
          if (codeSource && (codeSource.html || codeSource.css || codeSource.js)) {
            parts.push(
              <LiveDemo
                key={`demo-${keyCounter++}`}
                html={codeSource.html || ''}
                css={codeSource.css || ''}
                javascript={codeSource.js}
                title={parsedParams.title || componentName}
                responsive={parsedParams.responsive !== 'false'}
                className={parsedParams.className}
              />
            );
          } else {
            // Show error message if no code provided
            parts.push(
              <div key={`demo-error-${keyCounter++}`} className={styles.demoError}>
                Demo for &quot;{componentName}&quot; requires HTML/CSS/JS code to be provided via componentCodeSources
              </div>
            );
          }
          break;
        }

        default:
          // Unknown shortcode type, render as text
          parts.push(
            <span key={`unknown-${keyCounter++}`} className={styles.unknownShortcode}>
              {fullMatch}
            </span>
          );
      }

      lastIndex = match.index + fullMatch.length;
    }

    // Add any remaining text after the last shortcode
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      const html = detailedDescriptionToHtml(remainingText);
      parts.push(
        <div
          key={`text-${keyCounter++}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    // If no shortcodes were found, return the original HTML
    if (parts.length === 0) {
      const html = detailedDescriptionToHtml(text);
      return [
        <div
          key="content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ];
    }

    return parts;
  };

  const processedContent = processShortcodes(content);

  return (
    <div className={`${styles.componentMarkdownRenderer} ${className}`}>
      {processedContent}
    </div>
  );
};

export default ComponentMarkdownRenderer;
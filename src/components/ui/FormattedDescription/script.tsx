import React from 'react';
import styles from './style.module.css';

interface FormattedDescriptionProps {
  text: string;
  className?: string;
}

export default function FormattedDescription({ text, className }: FormattedDescriptionProps) {
  // Convert markdown-like formatting to HTML
  const formatText = (text: string): React.ReactNode[] => {
    // Split by double newlines to create paragraphs
    const paragraphs = text.split('\\n\\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle different formatting within paragraphs
      const formattedContent = paragraph
        // Convert single newlines to spaces (within same paragraph)
        .replace(/\\n/g, ' ')
        // Handle bold text **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Handle code snippets `code`
        .replace(/`([^`]+)`/g, '<code>$1</code>');

      // Check if this is a bullet point section
      const isBulletSection = formattedContent.includes('•');
      
      if (isBulletSection) {
        // Split by bullet points and create a list
        const items = formattedContent.split('•').filter(item => item.trim());
        
        if (items.length > 1) {
          const title = items[0].trim();
          const bullets = items.slice(1);
          
          return (
            <div key={index} className={styles.bulletSection}>
              {title && (
                <div 
                  className={styles.bulletTitle}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              <ul className={styles.bulletList}>
                {bullets.map((bullet, bulletIndex) => (
                  <li 
                    key={bulletIndex}
                    className={styles.bulletItem}
                    dangerouslySetInnerHTML={{ __html: bullet.trim() }}
                  />
                ))}
              </ul>
            </div>
          );
        }
      }
      
      // Regular paragraph
      return (
        <p 
          key={index}
          className={styles.paragraph}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      );
    });
  };

  const formattedElements = formatText(text);

  return (
    <div className={`${styles.formattedDescription} ${className || ''}`}>
      {formattedElements}
    </div>
  );
}
import { useState } from 'react';
import styles from './style.module.css';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showCopy?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
  showCopy = true
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={styles.codeBlock}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {showCopy && (
            <button
              className={styles.copyButton}
              onClick={handleCopy}
              title="Copy code"
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          )}
        </div>
      )}
      <pre className={styles.pre}>
        <code className={`${styles.code} language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
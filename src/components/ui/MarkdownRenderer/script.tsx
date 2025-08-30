import React from 'react';
import { detailedDescriptionToHtml } from '@/lib/markdown';
import styles from './style.module.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  type?: 'detailed' | 'inline';
}

/**
 * MarkdownRenderer Component
 * 
 * A reusable component that converts markdown text to HTML and renders it safely.
 * Supports all the markdown patterns used in patterns, exercises, and utilities:
 * 
 * - Headers (##, ###)
 * - Bold text (**text**)
 * - Italic text (*text*)
 * - Inline code (`code`)
 * - Bullet points (•, -, 🎯, 🚀, ⚡, etc.)
 * - Line breaks and paragraphs
 * 
 * @param content - The markdown text to render
 * @param className - Optional CSS class to apply
 * @param type - Rendering type: 'detailed' for full markdown, 'inline' for simple formatting
 */
export default function MarkdownRenderer({ 
  content, 
  className = ''
}: MarkdownRendererProps) {
  if (!content) {
    return null;
  }

  const html = detailedDescriptionToHtml(content);

  return (
    <div 
      className={`${styles.markdownRenderer} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './style.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title, className }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // Handle background click
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  const modalContent = (
    <div 
      className={styles.overlay} 
      role="dialog" 
      aria-modal="true" 
      tabIndex={-1}
      ref={modalRef}
      onClick={handleBackgroundClick}
    >
      <div className={`${styles.modal} ${className || ''}`.trim()}>
        <button 
          className={styles.close} 
          aria-label="Close modal" 
          onClick={onClose}
          autoFocus
        >
          &times;
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );

  // Render modal in a portal to avoid z-index and styling conflicts
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default Modal;

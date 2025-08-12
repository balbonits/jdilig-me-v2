import React from 'react';
import styles from './style.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title, className }) => {
  if (!open) return null;
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" tabIndex={-1}>
      <div className={`${styles.modal} ${className || ''}`.trim()}>
        <button className={styles.close} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

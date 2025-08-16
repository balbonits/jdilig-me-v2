import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './style.module.css';

interface DropdownItem {
  href: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  href: string;
  items: DropdownItem[];
  className?: string;
}

export default function NavDropdown({ label, href, items, className }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if current route matches main href or any sub-items
  const isActive = router.pathname === href || items.some(item => router.pathname === item.href);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle mouse enter with slight delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  // Handle mouse leave with delay to prevent flickering
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen && isMounted) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMounted]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className={`${styles.dropdown} ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.trigger}>
        <Link 
          href={href}
          className={`${styles.mainLink} ${isActive ? styles.active : ''}`}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {label}
          <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
            ▼
          </span>
        </Link>
      </div>

      {isOpen && (
        <div 
          className={styles.menu}
          role="menu"
          aria-label={`${label} submenu`}
        >
          {items.map((item) => {
            const isItemActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.menuItem} ${isItemActive ? styles.menuItemActive : ''}`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
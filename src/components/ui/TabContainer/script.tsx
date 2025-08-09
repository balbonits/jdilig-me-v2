import React, { useState, ReactNode } from 'react';
import { cn } from '@/utils';
import styles from './style.module.css';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  metadata?: string;
  badge?: string;
  isHighlighted?: boolean;
}

interface TabContainerProps {
  tabs: TabItem[];
  defaultActiveTab?: number;
  emptyMessage?: string;
  className?: string;
  fullWidth?: boolean;
  onTabChange?: (activeIndex: number, tab: TabItem) => void;
}

export default function TabContainer({ 
  tabs, 
  defaultActiveTab = 0,
  emptyMessage = 'No content available',
  className = '',
  fullWidth = false,
  onTabChange 
}: TabContainerProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  if (!tabs || tabs.length === 0) {
    return <div className={styles.noContent}>{emptyMessage}</div>;
  }

  const activeTabItem = tabs[activeTab];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <div className={cn(styles.tabContainer, className)}>
      {/* Tab Headers */}
      <div className={cn(styles.tabHeaders, { [styles.fullWidth]: fullWidth })}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={cn(
              styles.tabHeader,
              { [styles.active]: index === activeTab },
              { [styles.highlighted]: !!tab.isHighlighted },
              { [styles.fullWidthTab]: fullWidth }
            )}
            onClick={() => handleTabClick(index)}
          >
            <span className={styles.tabLabel}>
              {tab.label}
              {tab.badge && <span className={styles.badge}>{tab.badge}</span>}
            </span>
            {tab.metadata && (
              <span className={styles.metadata}>{tab.metadata}</span>
            )}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className={styles.tabContent}>
        {activeTabItem.content}
      </div>
    </div>
  );
}
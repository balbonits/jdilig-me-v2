import React from 'react';
import AboutContent from '@/components/AboutContent';
import { PageContainer } from '@/components/ui';
import styles from './style.module.css';

export default function HomePage() {
  return (
    <PageContainer>
      <AboutContent />
    </PageContainer>
  );
}

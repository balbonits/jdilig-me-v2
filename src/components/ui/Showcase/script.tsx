import React, { ReactNode } from 'react';
import { PageContainer, PageHeader, SectionContainer, Section } from '@/components/ui';

export interface ShowcaseSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface ShowcaseProps {
  title: string;
  subtitle?: string;
  header?: ReactNode;
  sections: ShowcaseSection[];
  className?: string;
}

export default function Showcase({
  title,
  subtitle,
  header,
  sections,
  className = ''
}: ShowcaseProps) {
  return (
    <PageContainer className={className}>
      <PageHeader title={title} subtitle={subtitle}>
        {header}
      </PageHeader>
      
      <SectionContainer>
        {sections.map(section => (
          <Section key={section.id} title={section.title}>
            {section.content}
          </Section>
        ))}
      </SectionContainer>
    </PageContainer>
  );
}
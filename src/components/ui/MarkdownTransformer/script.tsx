import React from 'react';
import { parseNoteStructure } from '@/lib/parseNoteStructure';
import Section from '@/components/ui/Section';
import TabContainer, { TabItem } from '@/components/ui/TabContainer';
import Card from '@/components/ui/Card';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';

interface MarkdownTransformerProps {
  markdown: string;
  className?: string;
}

/**
 * Transforms markdown into hierarchical UI structure:
 * - Level 1: Entire page
 * - Level 2 (##): Main sections (blue borders)
 * - Level 3 (###): Tabbed sub-sections
 * - Level 4 (####): Card components within tabs
 */
const MarkdownTransformer: React.FC<MarkdownTransformerProps> = ({ markdown, className = '' }) => {
  const structure = parseNoteStructure(markdown);

  return (
    <div className={className}>
      {/* Page intro content */}
      {structure.intro && (
        <div style={{ marginBottom: '2rem' }}>
          <MarkdownRenderer content={structure.intro} />
        </div>
      )}

      {/* Level 2: Main Sections */}
      {structure.sections.map((section) => (
        <Section key={section.id} title={section.title} className="note-main-section">
          {/* Section content */}
          {section.content && (
            <MarkdownRenderer content={section.content} />
          )}

          {/* Level 3: Sub-sections as Tabs */}
          {section.subSections.length > 0 && (
            <TabContainer
              tabs={section.subSections.map((subSection): TabItem => ({
                id: subSection.id,
                label: subSection.title.replace(/^###\s*/, ''),
                content: (
                  <div>
                    {/* Sub-section content */}
                    {subSection.content && (
                      <MarkdownRenderer content={subSection.content} />
                    )}

                    {/* Level 4: Cards */}
                    {subSection.tabs.length > 0 && (
                      <div className="level-4-cards" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '1rem' }}>
                        {subSection.tabs.map((tab) => (
                          <Card key={tab.id} className="level-4-card">
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: 'var(--heading-color)' }}>
                              {tab.title.replace(/^####\s*/, '')}
                            </h4>
                            <MarkdownRenderer content={tab.content} />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }))}
              className="note-sub-section-tabs"
            />
          )}
        </Section>
      ))}
    </div>
  );
};

export default MarkdownTransformer;
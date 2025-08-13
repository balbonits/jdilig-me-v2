import React from 'react';
import { Modal } from '@/components/ui';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { UtilityData } from '@/interfaces/utilities';
import { TabContainer, Tab, Showcase } from '@/components/ui';
import type { TabItem } from '@/components/ui/TabContainer';
import type { ShowcaseSection } from '@/components/ui/Showcase';
import { useModal } from '@/hooks/useModal';
import styles from './utility-showcase.module.css';

interface UsageExamplesProps {
  examples: { description: string; code: string }[];
  onExampleClick: (example: { description: string; code: string }) => void;
}

function UsageExamples({ examples, onExampleClick }: UsageExamplesProps) {
  return (
    <div className={styles.examplesGrid}>
      {examples.map((example, idx) => (
        <div
          key={idx}
          className={styles.exampleCard}
          tabIndex={0}
          role="button"
          aria-label={`Open usage example: ${example.description}`}
          onClick={() => onExampleClick(example)}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onExampleClick(example)}
        >
          <h4 className={styles.exampleTitle}>{example.description}</h4>
          <pre className={styles.exampleCode}>
            <code>{example.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

interface UtilityPageProps {
  utility: UtilityData;
}

export default function UtilityPage({ utility }: UtilityPageProps) {
  const router = useRouter();
  const modal = useModal<{ description: string; code: string }>();

  if (router.isFallback) {
    return <div>Loading utility...</div>;
  }

  const { metadata, examples, functions, solutions } = utility;

  const headerContent = (
    <div className={styles.headerTags}>
      <span className={styles.categoryTag}>
        {metadata.category}
      </span>
      <span className={styles.countTag}>
        {functions.length} function{functions.length !== 1 ? 's' : ''}
      </span>
    </div>
  );

  // Create solution tabs like exercises
  const tabs: TabItem[] = solutions.map(solution => ({
    id: solution.name,
    label: solution.tabName,
    content: (
      <Tab padding="none">
        <div className={styles.solutionHeader}>
          <div className={styles.solutionInfo}>
            <h4>{solution.name}</h4>
            <div className={styles.solutionMeta}>
              <span>Time: {solution.timeComplexity}</span> | <span>Space: {solution.spaceComplexity}</span>
            </div>
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(solution.code)}
            className={styles.copyButton}
          >
            Copy
          </button>
        </div>
        <pre className={styles.codeBlock}>
          <code>{solution.code}</code>
        </pre>
      </Tab>
    ),
    metadata: solution.timeComplexity,
    badge: solution.isOptimal ? '★' : undefined,
    isHighlighted: solution.isOptimal
  }));

  const sections: ShowcaseSection[] = [
    {
      id: 'overview',
      title: 'Utility Overview',
      content: (
        <div className={styles.overviewContainer}>
          {/* Description */}
          {metadata.detailedDescription && (
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Description</h4>
              <p className={styles.subsectionText}>
                {metadata.detailedDescription}
              </p>
            </div>
          )}

          {/* Usage */}
          {metadata.usage && (
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Common Usage</h4>
              <pre className={styles.usageBlock}>
                <code>{metadata.usage}</code>
              </pre>
            </div>
          )}

          {/* Details */}
          <div className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>Details</h4>
            
            {/* Main Description */}
            <div className={styles.descriptionContainer}>
              <p className={styles.descriptionText}>
                {metadata.description}
              </p>
            </div>
            
            <div className={styles.detailsGrid}>
              <div className={styles.detailsRow}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Category:</span>
                  <span className={styles.detailValue}>{metadata.category}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Functions:</span>
                  <span className={styles.detailValue}>{functions.join(', ')}</span>
                </div>
              </div>

              {metadata.performanceNotes && (
                <div className={styles.performanceNote}>
                  <h5 className={styles.performanceTitle}>Performance:</h5>
                  <p className={styles.performanceText}>
                    {metadata.performanceNotes}
                  </p>
                </div>
              )}

              {/* Concepts */}
              <div>
                <h5 className={styles.subsectionTitle}>Concepts:</h5>
                <div className={styles.conceptsContainer}>
                  {metadata.concepts.map(concept => (
                    <span key={concept} className={styles.conceptTag}>
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Implementation',
      content: <TabContainer tabs={tabs} emptyMessage="No implementations available" />
    },
    {
      id: 'examples',
      title: 'Usage Examples',
      content: <UsageExamples examples={examples} onExampleClick={modal.openModal} />
  }
  ];

  return (
    <>
      <Showcase
        title={metadata.title}
        header={headerContent}
        sections={sections}
      />
      {modal.isOpen && modal.data && (
        <Modal open onClose={modal.closeModal} title={modal.data.description}>
          <pre className={styles.modalCode}>
            <code>{modal.data.code}</code>
          </pre>
        </Modal>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Import utilities data
  const utilitiesData = await import('../../../../public/utilities.json');
  const utilities = utilitiesData.default as UtilityData[];

  const paths = utilities.map((utility) => ({
    params: { slug: utility.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<UtilityPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Import utilities data
  const utilitiesData = await import('../../../../public/utilities.json');
  const utilities = utilitiesData.default as UtilityData[];

  const utility = utilities.find((util) => util.slug === slug);

  if (!utility) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      utility,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
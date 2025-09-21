import React, { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { PatternData } from '@/interfaces/patterns';
import { TabContainer, Tab, Showcase, Breadcrumb, MarkdownRenderer } from '@/components/ui';
import type { TabItem } from '@/components/ui/TabContainer';
import type { ShowcaseSection } from '@/components/ui/Showcase';
import type { BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { getAllPatternSlugs, loadPatternBySlug } from '@/utils/data-fetchers';
import { useAnalytics } from '@/hooks/useAnalytics';
import SEOHead from '@/components/SEOHead';
import styles from './pattern-showcase.module.css';

interface PatternPageProps {
  pattern: PatternData;
}

export default function PatternPage({ pattern }: PatternPageProps) {
  const router = useRouter();
  
  // Analytics hook for tracking detailed pattern page interactions
  const { trackCodeView, trackCodeInteraction } = useAnalytics();

  // Track pattern page view on component mount
  useEffect(() => {
    trackCodeView({
      action: 'pattern_page_view',
      category: 'Code Showcase',
      patternSlug: pattern.slug,
      difficulty: pattern.metadata.difficulty,
      complexity: pattern.metadata.timeComplexity,
      solutionType: pattern.solutions.find(s => s.isOptimal)?.approach || 'multiple',
    });
  }, [pattern, trackCodeView]);

  // Track when users copy solution code
  const handleCopyCode = (solutionName: string, solutionCode: string) => {
    navigator.clipboard.writeText(solutionCode);
    
    trackCodeInteraction('code_copy', pattern.slug, 'pattern');
    
    trackCodeView({
      action: 'solution_code_copy',
      category: 'Code Showcase',
      patternSlug: pattern.slug,
      solutionType: solutionName,
    });
  };

  if (router.isFallback) {
    return <div>Loading pattern...</div>;
  }

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Code', href: '/code' },
    { label: 'Design Patterns', href: '/code/patterns' },
    { label: pattern.metadata.title }
  ];

  // Create solution tabs
  const tabs: TabItem[] = pattern.solutions.map(solution => ({
    id: solution.name,
    label: solution.tabName || solution.approach,
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
            onClick={() => handleCopyCode(solution.name, solution.code)}
            className={styles.copyButton}
            aria-label={`Copy ${solution.name} solution code to clipboard`}
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

  // Create showcase sections
  const sections: ShowcaseSection[] = [
    {
      id: 'overview',
      title: 'Pattern Overview',
      content: (
        <div className={styles.overviewContainer}>
          <div className={styles.mainDescription}>
            <MarkdownRenderer 
              content={pattern.metadata.detailedDescription || pattern.metadata.description}
              className={styles.descriptionContent}
            />
            {pattern.examples && pattern.examples.length > 0 && (
              <div className={styles.examplesList}>
                <h5 className={styles.examplesLabel}>Examples:</h5>
                {pattern.examples.map((example, index) => (
                  <div key={index} className={styles.exampleWrapper}>
                    <div className={styles.exampleScenario}>{example.scenario}</div>
                    <div className={styles.exampleInput}>
                      <strong>Input:</strong>
                      <pre className={styles.exampleBlock}>
                        <code>{typeof example.input === 'object' 
                          ? JSON.stringify(example.input, null, 2)
                          : String(example.input)
                        }</code>
                      </pre>
                    </div>
                    <div className={styles.exampleOutput}>
                      <strong>Output:</strong>
                      <pre className={styles.exampleBlock}>
                        <code>{example.output instanceof Error 
                          ? example.output.message
                          : typeof example.output === 'object' 
                          ? JSON.stringify(example.output, null, 2)
                          : String(example.output)
                        }</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>Concepts</h4>
            <div className={styles.conceptsContainer}>
              {pattern.metadata.concepts.map(concept => (
                <span key={concept} className={styles.conceptTag}>
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>Complexity Analysis</h4>
            <div className={styles.complexityGrid}>
              <div className={styles.complexityRow}>
                <div className={styles.complexityItem}>
                  <span className={styles.complexityLabel}>Time:</span>
                  <span className={styles.complexityValue}>
                    {pattern.metadata.timeComplexity}
                  </span>
                </div>
                <div className={styles.complexityItem}>
                  <span className={styles.complexityLabel}>Space:</span>
                  <span className={styles.complexityValue}>
                    {pattern.metadata.spaceComplexity}
                  </span>
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
      content: (
        <div className={styles.implementationContainer}>
          <TabContainer tabs={tabs} />
        </div>
      )
    }
  ];

  return (
    <>
      <SEOHead 
        pathname={`/code/patterns/${pattern.slug}`}
        title={`${pattern.metadata.title} - Design Patterns`}
        description={pattern.metadata.description}
      />
      <Breadcrumb items={breadcrumbItems} />
      <Showcase
        title={pattern.metadata.title}
        subtitle={pattern.metadata.description}
        sections={sections}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPatternSlugs();
  const paths = slugs.map(slug => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PatternPageProps> = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== 'string') {
    return {
      notFound: true
    };
  }

  try {
    const pattern = await loadPatternBySlug(params.slug);
    
    if (!pattern) {
      return {
        notFound: true
      };
    }
    
    return {
      props: {
        pattern
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
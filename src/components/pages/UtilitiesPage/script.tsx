import React from 'react';
import Link from 'next/link';
import { UtilityData } from '@/interfaces/utilities';
import { PageContainer, PageHeader, SectionContainer, Section, Grid, Card } from '@/components/ui';
import { useAnalytics } from '@/hooks/useAnalytics';
import styles from './style.module.css';

interface UtilitiesPageProps {
  utilities: UtilityData[];
}


const UtilitiesPage: React.FC<UtilitiesPageProps> = ({ utilities }) => {
  // Analytics hook for tracking utility function interactions
  // Helps understand which utility categories and functions are most valuable to users
  const { trackCodeView, trackCodeInteraction } = useAnalytics();

  // Track when user clicks on a utility card
  // Provides insights into which utility functions generate the most interest
  const handleUtilityClick = (utility: UtilityData) => {
    // Track the specific utility being viewed
    trackCodeView({
      action: 'utility_card_click',
      category: 'Code Showcase',
      utilitySlug: utility.slug,
      // Include category for understanding which types of utilities are popular
      utilityCategory: utility.metadata.category,
    });

    // Track the interaction type for UX analysis
    trackCodeInteraction('card_click', utility.slug, 'utility');
  };

  return (
    <PageContainer>
      <PageHeader
        title="Utility Functions"
        subtitle="Reusable Functions for Real Projects"
      >
        A collection of reusable utility functions for common programming tasks.
      </PageHeader>

      <SectionContainer>
        <Section title={`${utilities.length} Utilities`}>
          <Grid>
            {utilities.map((utility) => (
              <Link
                key={utility.slug}
                href={`/code/utilities/${utility.slug}`}
                className={styles.utilityLink}
                onClick={() => handleUtilityClick(utility)}
              >
                <Card className={styles.utilityCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.utilityTitle}>{utility.metadata.title}</h3>
                    <div className={styles.functionCount}>
                      {utility.functions.length} function{utility.functions.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <p className={styles.utilityDescription}>{utility.metadata.description}</p>

                  <div className={styles.tagsRow}>
                    <span className={styles.categoryTag}>{utility.metadata.category}</span>
                  </div>

                  <div className={styles.functionListRow}>
                    {utility.functions.map(fn => (
                      <span key={fn} className={styles.functionTag}>{fn}</span>
                    ))}
                  </div>

                  <div className={styles.examplesRow}>
                    <span className={styles.exampleCount}>
                      {utility.examples.length} usage example{utility.examples.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
};

export default UtilitiesPage;
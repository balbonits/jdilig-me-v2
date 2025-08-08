import React from 'react';
import Link from 'next/link';
import { UtilityData } from '@/interfaces/utilities';
import { PageContainer, PageHeader, SectionContainer, Section, Grid, Card } from '@/components/ui';
import styles from './style.module.css';

interface UtilitiesPageProps {
  utilities: UtilityData[];
}

const UtilitiesPage: React.FC<UtilitiesPageProps> = ({ utilities }) => {
  return (
    <PageContainer>
      <PageHeader title="Utility Functions">
        A collection of reusable utility functions for common programming tasks.
      </PageHeader>

      <SectionContainer>
        <Section title="Available Utilities">
          <Grid>
            {utilities.map((utility) => (
              <Link key={utility.slug} href={`/code/utilities/${utility.slug}`}>
                <Card>
                  <div className={styles.utilityCard}>
                    <div className={styles.header}>
                      <h3 className={styles.title}>{utility.metadata.title}</h3>
                      <span className={styles.category}>{utility.metadata.category}</span>
                    </div>
                    
                    <div className={styles.functions}>
                      <span className={styles.functionCount}>
                        {utility.functions.length} function{utility.functions.length !== 1 ? 's' : ''}:
                      </span>
                      <span className={styles.functionList}>
                        {utility.functions.join(', ')}
                      </span>
                    </div>

                    <div className={styles.examples}>
                      <p className={styles.exampleCount}>
                        {utility.examples.length} usage example{utility.examples.length !== 1 ? 's' : ''}
                      </p>
                    </div>
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
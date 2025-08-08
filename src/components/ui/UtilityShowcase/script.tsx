import React from 'react';
import { UtilityData } from '@/interfaces/utilities';
import { PageHeader, SectionContainer, Section, Grid, Card } from '@/components/ui';
import styles from './style.module.css';

interface UtilityShowcaseProps {
  utility: UtilityData;
}

const UtilityShowcase: React.FC<UtilityShowcaseProps> = ({ utility }) => {
  const { metadata, examples, code, functions } = utility;

  return (
    <div className={styles.showcase}>
      <PageHeader title={metadata.title}>
        <div className={styles.metadata}>
          <span className={styles.category}>{metadata.category}</span>
          <span className={styles.functionCount}>
            {functions.length} function{functions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </PageHeader>

      <SectionContainer>
        <div className={styles.layout}>
          {/* Left Column - Description */}
          <div className={styles.description}>
            <Section title="Overview">
              <div className={styles.info}>
                <p><strong>Category:</strong> {metadata.category}</p>
                <p><strong>Functions:</strong> {functions.join(', ')}</p>
              </div>
            </Section>
          </div>

          {/* Right Column - Code */}
          <div className={styles.codeSection}>
            <Section title="Implementation">
              <div className={styles.codeContainer}>
                <pre className={styles.code}>
                  <code>{code}</code>
                </pre>
              </div>
            </Section>
          </div>

          {/* Bottom Row - Examples */}
          <div className={styles.examples}>
            <Section title="Usage Examples">
              <Grid>
                {examples.map((example, index) => (
                  <Card key={index}>
                    <div className={styles.example}>
                      <h4 className={styles.exampleTitle}>{example.description}</h4>
                      <pre className={styles.exampleCode}>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  </Card>
                ))}
              </Grid>
            </Section>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default UtilityShowcase;
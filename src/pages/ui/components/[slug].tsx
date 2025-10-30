import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import TabContainer, { TabItem } from '@/components/ui/TabContainer/script';
import Tab from '@/components/ui/Tab';
import LiveDemo from '@/components/ui/LiveDemo';
import ComponentMarkdownRenderer from '@/components/ui/ComponentMarkdownRenderer';
import { getUIComponentBySlug, getUIComponentSlugs } from '@/utils/ui-data-fetchers';
import { UIComponentData } from '@/interfaces/ui-components';
import styles from './component-detail.module.css';

interface ComponentDetailPageProps {
  component: UIComponentData;
}

const ComponentDetailPage: React.FC<ComponentDetailPageProps> = ({ component }) => {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (router.isFallback) {
    return (
      <PageContainer>
        <div className={styles.loading}>Loading component...</div>
      </PageContainer>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'UI', href: '/ui' },
    { label: 'Components', href: '/ui/components' },
    { label: component.title }
  ];

  const handleCopyCode = async (codeType: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(codeType);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Create tabs for code display
  const codeTabs: TabItem[] = [];

  if (component.htmlCode) {
    codeTabs.push({
      id: 'html',
      label: 'HTML',
      content: (
        <Tab padding="none">
          <div className={styles.codeTabContent}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>HTML Structure</span>
              <button
                onClick={() => handleCopyCode('html', component.htmlCode)}
                className={styles.copyButton}
                aria-label="Copy HTML code"
              >
                {copiedCode === 'html' ? '✓ Copied' : 'Copy Code'}
              </button>
            </div>
            <pre className={styles.codeBlock}>
              <code className="language-html">{component.htmlCode}</code>
            </pre>
          </div>
        </Tab>
      )
    });
  }

  if (component.cssCode) {
    codeTabs.push({
      id: 'css',
      label: 'CSS',
      content: (
        <Tab padding="none">
          <div className={styles.codeTabContent}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>CSS Styles</span>
              <button
                onClick={() => handleCopyCode('css', component.cssCode)}
                className={styles.copyButton}
                aria-label="Copy CSS code"
              >
                {copiedCode === 'css' ? '✓ Copied' : 'Copy Code'}
              </button>
            </div>
            <pre className={styles.codeBlock}>
              <code className="language-css">{component.cssCode}</code>
            </pre>
          </div>
        </Tab>
      )
    });
  }

  if (component.jsCode) {
    codeTabs.push({
      id: 'javascript',
      label: 'JavaScript',
      content: (
        <Tab padding="none">
          <div className={styles.codeTabContent}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>JavaScript Functionality</span>
              <button
                onClick={() => handleCopyCode('js', component.jsCode!)}
                className={styles.copyButton}
                aria-label="Copy JavaScript code"
              >
                {copiedCode === 'js' ? '✓ Copied' : 'Copy Code'}
              </button>
            </div>
            <pre className={styles.codeBlock}>
              <code className="language-javascript">{component.jsCode}</code>
            </pre>
          </div>
        </Tab>
      )
    });
  }

  // Component code sources for markdown renderer
  const componentCodeSources = {
    [component.slug]: {
      html: component.htmlCode,
      css: component.cssCode,
      js: component.jsCode
    }
  };

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title={component.title}
        subtitle={component.description}
      />

      {/* Live Demo Section */}
      <Section title="Live Demo">
        <LiveDemo
          html={component.htmlCode}
          css={component.cssCode}
          javascript={component.jsCode}
          title={component.title}
          responsive={true}
        />
      </Section>

      {/* Documentation Section */}
      {component.content && (
        <Section title="Documentation">
          <div className={styles.documentation}>
            <ComponentMarkdownRenderer
              content={component.content}
              componentCodeSources={componentCodeSources}
            />
          </div>
        </Section>
      )}

      {/* Code Section */}
      <Section title="Component Code">
        <div className={styles.codeSection}>
          <TabContainer tabs={codeTabs} />
        </div>
      </Section>

      {/* Features & Properties */}
      <Section title="Properties & Features">
        <div className={styles.properties}>
          {/* Tags */}
          <div className={styles.propertyGroup}>
            <h3 className={styles.propertyTitle}>Tags</h3>
            <div className={styles.tags}>
              {component.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          {component.features && component.features.length > 0 && (
            <div className={styles.propertyGroup}>
              <h3 className={styles.propertyTitle}>Features</h3>
              <ul className={styles.featureList}>
                {component.features.map(feature => (
                  <li key={feature} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Browser Support */}
          {component.browserSupport && component.browserSupport.length > 0 && (
            <div className={styles.propertyGroup}>
              <h3 className={styles.propertyTitle}>Browser Support</h3>
              <div className={styles.browserList}>
                {component.browserSupport.map(browser => (
                  <span key={browser} className={styles.browserBadge}>
                    {browser}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Last Updated */}
          {component.lastUpdated && (
            <div className={styles.propertyGroup}>
              <h3 className={styles.propertyTitle}>Last Updated</h3>
              <p className={styles.lastUpdated}>{component.lastUpdated}</p>
            </div>
          )}
        </div>
      </Section>

      {/* Usage Tips */}
      <Section title="Usage Tips">
        <div className={styles.tips}>
          <div className={styles.tip}>
            <h4>Installation</h4>
            <p>Copy the HTML, CSS, and JavaScript code above into your project files.</p>
          </div>
          <div className={styles.tip}>
            <h4>Customization</h4>
            <p>Modify CSS variables and classes to match your design system.</p>
          </div>
          <div className={styles.tip}>
            <h4>Accessibility</h4>
            <p>Ensure all interactive elements have proper ARIA labels and keyboard support.</p>
          </div>
          <div className={styles.tip}>
            <h4>Responsive Design</h4>
            <p>Test the component across different screen sizes and devices.</p>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getUIComponentSlugs();

  const paths = slugs.map(slug => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<ComponentDetailPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const component = await getUIComponentBySlug(slug);

  if (!component) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      component
    }
  };
};

export default ComponentDetailPage;
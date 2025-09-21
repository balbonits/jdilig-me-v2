import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { ProjectData, ProjectScreenshot } from '@/interfaces/projects';
import { Showcase, Modal, Grid, Breadcrumb } from '@/components/ui';
import type { ShowcaseSection } from '@/components/ui/Showcase';
import { loadProjectsData, getProjectBySlug } from '@/data/projects';
import { useModal } from '@/hooks/useModal';
import { processMarkdown } from '@/lib/markdown';
import SEOHead from '@/components/SEOHead';
import Image from 'next/image';
import styles from './project-showcase.module.css';

interface ProjectPageProps {
  project: ProjectData;
}

// Image with loading state
function ImageWithLoading({ src, alt, fill, className, width, height }: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <div className={styles.imageLoading}>
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>Loading...</span>
        </div>
      )}
      {hasError && (
        <div className={styles.imageError}>
          <span className={styles.errorIcon}>📷</span>
          <span className={styles.errorText}>Failed to load image</span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={className}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        style={hasError ? { display: 'none' } : undefined}
      />
    </div>
  );
}

// Render processed markdown content as React components
function renderMarkdownContent(text: string): React.ReactNode {
  if (!text) return null;
  
  const { intro, sections } = processMarkdown(text);
  const components: React.ReactNode[] = [];
  
  // Render intro content
  if (intro.length > 0) {
    components.push(
      <div key="intro" className={styles.descriptionIntro}>
        {intro.map((content, idx) => (
          <p key={idx} style={{ marginBottom: '1rem', lineHeight: '1.6', textAlign: 'left' }}>
            {content}
          </p>
        ))}
      </div>
    );
  }
  
  // Render sections
  sections.forEach((section) => {
    components.push(
      <div key={section.title} className={styles.descriptionSection}>
        <h3 className={styles.sectionTitle}>{section.title}</h3>
        <div className={styles.sectionContent}>
          {section.content.map((item, idx) => (
            <div key={idx} className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span dangerouslySetInnerHTML={{ __html: item }}></span>
            </div>
          ))}
        </div>
      </div>
    );
  });
  
  return (
    <div className={styles.descriptionContainer}>
      {components}
    </div>
  );
}

function TechStackSection({ techStack }: { techStack: ProjectData['techStack'] }) {
  return (
    <div className={styles.techStackContainer}>
      {techStack.map((category, idx) => (
        <div key={idx} className={styles.techCategory}>
          <h3 className={styles.techCategoryTitle}>{category.category}</h3>
          <div className={styles.techItems}>
            {category.items.map((item, itemIdx) => (
              <span key={itemIdx} className={styles.techItem}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesSection({ features }: { features: ProjectData['features'] }) {
  return (
    <div className={styles.featuresContainer}>
      {features.map((feature, idx) => (
        <div key={idx} className={styles.featureCard}>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureDescription}>{feature.description}</p>
          {feature.impact && (
            <div className={styles.featureImpact}>
              <strong>Impact:</strong> {feature.impact}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MetricsSection({ metrics }: { metrics: ProjectData['metrics'] }) {
  if (!metrics) return null;
  
  return (
    <div className={styles.metricsContainer}>
      {metrics.map((metric, idx) => (
        <div key={idx} className={styles.metricCard}>
          <div className={styles.metricValue}>{metric.value}</div>
          <div className={styles.metricLabel}>{metric.label}</div>
          {metric.description && (
            <div className={styles.metricDescription}>{metric.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function HighlightsSection({ highlights }: { highlights: ProjectData['highlights'] }) {
  return (
    <div className={styles.highlightsContainer}>
      {highlights.map((highlight, idx) => (
        <div key={idx} className={styles.highlightCard}>
          <h3 className={styles.highlightTitle}>{highlight.title}</h3>
          <p className={styles.highlightDescription}>{highlight.description}</p>
          
          {highlight.code && (
            <div className={styles.highlightCode}>
              <h4>Implementation:</h4>
              <pre className={styles.codeBlock}>
                <code>{highlight.code}</code>
              </pre>
            </div>
          )}
          
          {highlight.achievements && (
            <div className={styles.highlightAchievements}>
              <h4>Key Achievements:</h4>
              <ul className={styles.achievementsList}>
                {highlight.achievements.map((achievement, achIdx) => (
                  <li key={achIdx} className={styles.achievementItem}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ScreenshotsSection({ screenshots }: { screenshots?: ProjectData['screenshots'] }) {
  const modal = useModal<ProjectScreenshot>();
  
  if (!screenshots || screenshots.length === 0) {
    return (
      <div className={styles.screenshotsPlaceholder}>
        <div className={styles.placeholderGrid}>
          {[1, 2, 3].map((num) => (
            <div key={num} className={styles.screenshotPlaceholder}>
              <div className={styles.placeholderIcon}>📸</div>
              <div className={styles.placeholderText}>
                Screenshot {num}
                <br />
                <small>Coming Soon</small>
              </div>
            </div>
          ))}
        </div>
        <p className={styles.placeholderNote}>
          High-quality screenshots showcasing the user interface, responsive design, and key features will be added here.
        </p>
      </div>
    );
  }

  return (
    <>
      <Grid layout="2-col">
        {screenshots.map((screenshot, idx) => (
          <div
            key={idx}
            className={styles.screenshotCard}
            onClick={() => modal.openModal(screenshot)}
            role="button"
            tabIndex={0}
            aria-label={`View ${screenshot.alt} in full size`}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && modal.openModal(screenshot)}
          >
            <div className={styles.screenshotImage}>
              <ImageWithLoading
                src={screenshot.src}
                alt={screenshot.alt}
                fill
                className={styles.screenshot}
              />
              <div className={styles.screenshotOverlay}>
                <span className={styles.expandIcon}>🔍</span>
                <span className={styles.expandText}>Click to expand</span>
              </div>
            </div>
            <div className={styles.screenshotCaption}>
              <h3 className={styles.screenshotTitle}>{screenshot.caption}</h3>
              <span className={styles.screenshotCategory}>{screenshot.category}</span>
            </div>
          </div>
        ))}
      </Grid>
      
      {modal.isOpen && modal.data && (
        <Modal open onClose={modal.closeModal} title={modal.data.caption}>
          <div className={styles.modalImageContainer}>
            <ImageWithLoading
              src={modal.data.src}
              alt={modal.data.alt}
              width={1200}
              height={800}
              className={styles.modalImage}
            />
            <p className={styles.modalCaption}>{modal.data.alt}</p>
          </div>
        </Modal>
      )}
    </>
  );
}

function LinksSection({ links }: { links: ProjectData['links'] }) {
  return (
    <div className={styles.linksContainer}>
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.linkButton} ${styles[`link-${link.type}`]}`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function InsightsSection({ 
  lessons, 
  challenges, 
  futureImprovements 
}: { 
  lessons?: string[];
  challenges?: string[];
  futureImprovements?: string[];
}) {
  return (
    <div className={styles.insightsContainer}>
      {lessons && (
        <div className={styles.insightCategory}>
          <h3 className={styles.insightTitle}>Lessons Learned</h3>
          <ul className={styles.insightList}>
            {lessons.map((lesson, idx) => (
              <li key={idx} className={styles.insightItem}>{lesson}</li>
            ))}
          </ul>
        </div>
      )}
      
      {challenges && (
        <div className={styles.insightCategory}>
          <h3 className={styles.insightTitle}>Challenges Overcome</h3>
          <ul className={styles.insightList}>
            {challenges.map((challenge, idx) => (
              <li key={idx} className={styles.insightItem}>{challenge}</li>
            ))}
          </ul>
        </div>
      )}
      
      {futureImprovements && (
        <div className={styles.insightCategory}>
          <h3 className={styles.insightTitle}>Future Improvements</h3>
          <ul className={styles.insightList}>
            {futureImprovements.map((improvement, idx) => (
              <li key={idx} className={styles.insightItem}>{improvement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading project...</div>;
  }

  const { metadata, techStack, features, metrics, highlights, screenshots, links, lessons, challenges, futureImprovements } = project;

  const headerContent = (
    <div className={styles.headerContent}>
      <div className={styles.headerTags}>
        <span className={styles.categoryTag}>{metadata.category}</span>
        <span className={styles.difficultyTag}>{metadata.difficulty}</span>
      </div>
      <div className={styles.projectMeta}>
        <span className={styles.startDate}>Started: {metadata.startDate}</span>
        <span className={styles.role}>{metadata.role}</span>
      </div>
    </div>
  );

  const sections: ShowcaseSection[] = [
    {
      id: 'overview',
      title: 'Project Overview',
      content: (
        <div className={styles.overviewContainer}>
          {/* Description content above screenshots */}
          <div className={styles.overviewDescription}>
            {renderMarkdownContent(metadata.detailedDescription || '')}
          </div>
          
          <ScreenshotsSection screenshots={screenshots} />
          
          <div className={styles.projectDetails}>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Started:</span>
                <span className={styles.detailValue}>{metadata.startDate}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Role:</span>
                <span className={styles.detailValue}>{metadata.role}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Difficulty:</span>
                <span className={styles.detailValue}>{metadata.difficulty}</span>
              </div>
            </div>
          </div>
          
          {metrics && <MetricsSection metrics={metrics} />}
          
          <LinksSection links={links} />
        </div>
      )
    },
    {
      id: 'tech-stack',
      title: 'Technology Stack',
      content: <TechStackSection techStack={techStack} />
    },
    {
      id: 'features',
      title: 'Key Features',
      content: <FeaturesSection features={features} />
    },
    {
      id: 'highlights',
      title: 'Technical Highlights',
      content: <HighlightsSection highlights={highlights} />
    },
    {
      id: 'insights',
      title: 'Insights & Learnings',
      content: <InsightsSection 
        lessons={lessons} 
        challenges={challenges} 
        futureImprovements={futureImprovements} 
      />
    }
  ];

  return (
    <>
      <SEOHead 
        pathname={`/projects/${project.slug}`}
        title={`${metadata.title} - Project Showcase`}
        description={metadata.description}
      />
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: metadata.title, href: `/projects/${project.slug}` }
        ]}
      />
      <Showcase
        title={metadata.title}
        header={headerContent}
        sections={sections}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsData = await loadProjectsData();
  const paths = projectsData.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const projectsData = await loadProjectsData();
  
  const project = getProjectBySlug(slug, projectsData);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
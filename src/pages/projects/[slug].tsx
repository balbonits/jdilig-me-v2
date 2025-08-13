import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { ProjectData, ProjectScreenshot } from '@/interfaces/projects';
import { Showcase, Modal, Grid } from '@/components/ui';
import type { ShowcaseSection } from '@/components/ui/Showcase';
import { loadProjectsData, getProjectBySlug } from '@/data/projects';
import { useModal } from '@/hooks/useModal';
import SEOHead from '@/components/SEOHead';
import Image from 'next/image';
import styles from './project-showcase.module.css';

interface ProjectPageProps {
  project: ProjectData;
}

function TechStackSection({ techStack }: { techStack: ProjectData['techStack'] }) {
  return (
    <div className={styles.techStackContainer}>
      {techStack.map((category, idx) => (
        <div key={idx} className={styles.techCategory}>
          <h4 className={styles.techCategoryTitle}>{category.category}</h4>
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
          <h4 className={styles.featureTitle}>{feature.title}</h4>
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
          <h4 className={styles.highlightTitle}>{highlight.title}</h4>
          <p className={styles.highlightDescription}>{highlight.description}</p>
          
          {highlight.code && (
            <div className={styles.highlightCode}>
              <h5>Implementation:</h5>
              <pre className={styles.codeBlock}>
                <code>{highlight.code}</code>
              </pre>
            </div>
          )}
          
          {highlight.achievements && (
            <div className={styles.highlightAchievements}>
              <h5>Key Achievements:</h5>
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
      <Grid>
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
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.screenshot}
              />
              <div className={styles.screenshotOverlay}>
                <span className={styles.expandIcon}>🔍</span>
                <span className={styles.expandText}>Click to expand</span>
              </div>
            </div>
            <div className={styles.screenshotCaption}>
              <h4 className={styles.screenshotTitle}>{screenshot.caption}</h4>
              <span className={styles.screenshotCategory}>{screenshot.category}</span>
            </div>
          </div>
        ))}
      </Grid>
      
      {modal.isOpen && modal.data && (
        <Modal open onClose={modal.closeModal} title={modal.data.caption}>
          <div className={styles.modalImageContainer}>
            <Image
              src={modal.data.src}
              alt={modal.data.alt}
              width={1200}
              height={800}
              style={{ width: '100%', height: 'auto' }}
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
          <h4 className={styles.insightTitle}>Lessons Learned</h4>
          <ul className={styles.insightList}>
            {lessons.map((lesson, idx) => (
              <li key={idx} className={styles.insightItem}>{lesson}</li>
            ))}
          </ul>
        </div>
      )}
      
      {challenges && (
        <div className={styles.insightCategory}>
          <h4 className={styles.insightTitle}>Challenges Overcome</h4>
          <ul className={styles.insightList}>
            {challenges.map((challenge, idx) => (
              <li key={idx} className={styles.insightItem}>{challenge}</li>
            ))}
          </ul>
        </div>
      )}
      
      {futureImprovements && (
        <div className={styles.insightCategory}>
          <h4 className={styles.insightTitle}>Future Improvements</h4>
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
        <span className={styles.statusTag}>{metadata.status}</span>
        <span className={styles.difficultyTag}>{metadata.difficulty}</span>
      </div>
      <div className={styles.projectMeta}>
        <span className={styles.duration}>{metadata.duration}</span>
        <span className={styles.role}>{metadata.role}</span>
      </div>
      <div className={styles.projectDescription}>
        {metadata.detailedDescription}
      </div>
    </div>
  );

  const sections: ShowcaseSection[] = [
    {
      id: 'overview',
      title: 'Project Overview',
      content: (
        <div className={styles.overviewContainer}>
          <ScreenshotsSection screenshots={screenshots} />
          
          <div className={styles.projectDetails}>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Duration:</span>
                <span className={styles.detailValue}>{metadata.duration}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Role:</span>
                <span className={styles.detailValue}>{metadata.role}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Status:</span>
                <span className={styles.detailValue}>{metadata.status}</span>
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
import React from 'react';
import Link from 'next/link';
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';
import { ProjectData } from '@/interfaces/projects';
import styles from './style.module.css';

type ProjectsPageProps = {
  projects: ProjectData[];
};


const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
  // For demo: treat the first project as featured if any exist
  const featuredProjects = projects.length > 0 ? [projects[0]] : [];
  const allProjects = projects;
  
  // Define semantic variants instead of dynamic numbering
  const variants = ['primary', 'secondary', 'tertiary', 'quaternary'];

  return (
    <PageContainer>
      <PageHeader title="Projects" subtitle="Portfolio & Case Studies">
        A showcase of my development work, including full-stack projects, technical deep-dives, and implementation details.
      </PageHeader>

      <SectionContainer>

        {/* Featured Projects Section */}
        <Section title="Featured Projects">
          <div className={styles.heroGrid}>
            {featuredProjects.map((project, index) => {
              const primaryTechStack = project.techStack[0]?.items.slice(0, 4) || [];
              const liveLink = project.links.find(link => link.type === 'live');
              const githubLink = project.links.find(link => link.type === 'github');
              return (
                <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.heroLink}>
                  <div className={`${styles.heroBanner} ${styles[variants[index % variants.length]]}`}>
                    <div className={styles.heroContent}>
                      <div className={styles.heroHeader}>
                        <h3 className={styles.heroTitle}>{project.metadata.title}</h3>
                        <div className={styles.heroBadge}>{project.metadata.status}</div>
                      </div>
                      <p className={styles.heroDescription}>{project.metadata.description}</p>
                      <div className={styles.heroStats}>
                        <div className={styles.stat}>
                          <span className={styles.statNumber}>{project.metadata.duration}</span>
                          <span className={styles.statLabel}>Duration</span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statNumber}>{project.metadata.difficulty}</span>
                          <span className={styles.statLabel}>Complexity</span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statNumber}>{project.features.length}+</span>
                          <span className={styles.statLabel}>Features</span>
                        </div>
                      </div>
                      <div className={styles.heroMeta}>
                        <div className={styles.heroCategory}>{project.metadata.category}</div>
                        <div className={styles.heroLinks}>
                          {liveLink && (<span className={styles.linkBadge}>Live Demo</span>)}
                          {githubLink && (<span className={styles.linkBadge}>Source Code</span>)}
                        </div>
                      </div>
                      <div className={styles.heroTech}>
                        {primaryTechStack.map((tech, techIndex) => (
                          <span key={techIndex}>{tech}</span>
                        ))}
                      </div>
                      <div className={styles.heroFooter}>
                        <span className={styles.linkText}>View Project Details →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>


        {/* All Projects Section */}
        <Section title="All Projects">
          <Grid columns={3} gap="2rem" className={styles.projectsGrid}>
            {allProjects.map((project) => {
              const primaryTechStack = project.techStack[0]?.items.slice(0, 3) || [];
              // Create a shortened description (first sentence or first 100 characters)
              const shortDescription = project.metadata.description.split('.')[0] + '.';
              
              return (
                <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.projectLink}>
                  <Card className={styles.projectCard}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.projectTitle}>{project.metadata.title}</h3>
                      <div className={styles.projectStatus}>
                        {project.metadata.featured ? 'Featured' : 'Project'}
                      </div>
                    </div>

                    <p className={styles.projectDescription}>
                      {shortDescription}
                    </p>

                    <div className={styles.techStack}>
                      {primaryTechStack.map(tech => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                      {project.techStack[0]?.items.length > 3 && (
                        <span className={styles.moreTag}>
                          +{project.techStack[0].items.length - 3}
                        </span>
                      )}
                    </div>

                    <div className={styles.projectMeta}>
                      <div className={styles.metaItem}>
                        <span className={styles.label}>Category:</span>
                        <code className={styles.value}>{project.metadata.category}</code>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.label}>Features:</span>
                        <code className={styles.value}>{project.features.length}+</code>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </Grid>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
};

export default ProjectsPage;
//

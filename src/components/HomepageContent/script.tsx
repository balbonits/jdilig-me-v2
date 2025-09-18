import React from 'react';
import {
  SectionContainer,
  Grid,
  HeroBanner,
  JourneyCard,
  ExperienceCard,
  SkillCard,
  ContactSection,
  FutureProjectCard,
  FeaturedProjectBanner
} from '@/components/ui';
import { journeyData, experienceData, skillsData, contactData, heroData, futureAiProjectsData } from '@/data/about';
import { getFeaturedProjects } from '@/data/projects';
import styles from './style.module.css';

export default function HomepageContent() {
  const featuredProjects = getFeaturedProjects();
  const featuredProject = featuredProjects[0]; // Get the first featured project

  return (
    <>
      {/* Main Hero Banner */}
      <HeroBanner
        title={heroData.title}
        badge={heroData.badge}
        description={heroData.description}
        stats={heroData.stats}
        tags={heroData.tags}
        imageUrl={heroData.imageUrl}
        imageAlt={heroData.imageAlt}
        imageShape={heroData.imageShape}
        variant={heroData.variant}
        className="about-main-hero"
      />

      {/* Featured Project Banner */}
      {featuredProject && (
        <SectionContainer>
          <FeaturedProjectBanner project={featuredProject} />
        </SectionContainer>
      )}

      <SectionContainer>
        {/* Contact Section */}
        <ContactSection 
          title="Let&apos;s Connect"
          badge="Open to Work"
          description="I&apos;m actively seeking new opportunities! Ready to bring my 18 years of front-end expertise to your team and help build exceptional user experiences."
          contacts={contactData}
          className={styles.contactSection}
        />
        {/* Journey Cards */}
        <Grid layout="2-col" gap="2rem" className={styles.journeySection}>
          {journeyData.map((journey) => (
            <JourneyCard 
              key={journey.id}
              id={journey.id}
              icon={journey.icon}
              title={journey.title}
              description={journey.description}
              color={journey.color}
            />
          ))}
        </Grid>
        
        {/* Company Experience */}
        <Grid layout="2-col" gap="2rem" className={styles.experienceSection}>
          {experienceData.map((experience) => (
            <ExperienceCard
              key={experience.id}
              id={experience.id}
              icon={experience.icon}
              title={experience.title}
              badge={experience.badge}
              description={experience.description}
              color={experience.color}
            />
          ))}
        </Grid>
        
        {/* Skills */}
        <Grid layout="2-col" gap="2rem" className={styles.skillsSection}>
          {skillsData.map((skill) => (
            <SkillCard
              key={skill.id}
              id={skill.id}
              title={skill.title}
              level={skill.level}
              skills={skill.skills}
              color={skill.color}
            />
          ))}
        </Grid>

        {/* Future AI Projects */}
        <Grid layout="2-col" gap="2rem" className={styles.futureProjectsSection}>
          {futureAiProjectsData.map((project) => (
            <FutureProjectCard
              key={project.id}
              id={project.id}
              icon={project.icon}
              title={project.title}
              description={project.description}
              status={project.status}
              aiTechnology={project.aiTechnology}
              color={project.color}
            />
          ))}
        </Grid>

        {/* Technical Documentation Reference */}
        <div className={styles.wikiReference}>
          <p>📚 For technical details, architecture documentation, and development guides, visit the <a href="https://github.com/balbonits/jdilig-me-v2/wiki" target="_blank" rel="noopener noreferrer">project Wiki</a>.</p>
        </div>
      </SectionContainer>
    </>
  );
}

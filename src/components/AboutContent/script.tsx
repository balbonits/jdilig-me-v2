import React from 'react';
import { 
  SectionContainer, 
  Grid, 
  HeroBanner,
  JourneyCard,
  ExperienceCard,
  SkillCard,
  ContactSection
} from '@/components/ui';
import { journeyData, experienceData, skillsData, contactData, heroData } from '@/data/about';
import styles from './style.module.css';

export default function AboutContent() {
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
        <Grid gap="2rem" className={styles.journeySection}>
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
        <Grid gap="2rem" className={styles.experienceSection}>
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
        <Grid gap="2rem" className={styles.skillsSection}>
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
      </SectionContainer>
    </>
  );
}

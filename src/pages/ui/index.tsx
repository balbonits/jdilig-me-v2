import React from 'react';
import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Grid from '@/components/ui/Grid';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';
import styles from './ui.module.css';

interface UICategory {
  title: string;
  description: string;
  href: string;
  icon: string;
  count: number;
  status: 'available' | 'coming-soon';
}

const UIPage: React.FC = () => {
  const categories: UICategory[] = [
    {
      title: 'Notes & Concepts',
      description: 'CSS fundamentals, methodologies, and advanced techniques',
      href: '/ui/notes',
      icon: '📝',
      count: 6,
      status: 'available'
    },
    {
      title: 'Components',
      description: 'Reusable UI components with live demos and code',
      href: '/ui/components',
      icon: '🧩',
      count: 1,
      status: 'available'
    },
    {
      title: 'Patterns',
      description: 'Common UI patterns and layout solutions',
      href: '/ui/patterns',
      icon: '🎨',
      count: 0,
      status: 'coming-soon'
    },
    {
      title: 'Projects',
      description: 'Full UI projects showcasing design and implementation',
      href: '/ui/projects',
      icon: '🚀',
      count: 0,
      status: 'coming-soon'
    },
    {
      title: 'Animations',
      description: 'Interactive animations and motion design examples',
      href: '/ui/animations',
      icon: '✨',
      count: 0,
      status: 'coming-soon'
    },
    {
      title: 'Experiments',
      description: 'Creative UI experiments and cutting-edge techniques',
      href: '/ui/experiments',
      icon: '🧪',
      count: 0,
      status: 'coming-soon'
    }
  ];

  return (
    <PageContainer>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'UI', href: '/ui' }
        ]}
      />

      <PageHeader
        title="UI & Frontend Development"
        subtitle="Showcasing UI skills through components, patterns, animations, and visual design"
      />

      <Section title="Introduction">
        <div className={styles.intro}>
          <p>
            As a frontend developer, I believe in creating beautiful, functional, and accessible user interfaces.
            This section showcases my UI development skills through various projects, components, and educational content.
          </p>
        </div>
      </Section>

      <Section title="Explore UI Categories">
        <Grid columns={3}>
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.status === 'available' ? category.href : '#'}
              className={styles.categoryLink}
            >
              <Card className={`${styles.categoryCard} ${category.status === 'coming-soon' ? styles.comingSoon : ''}`}>
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3 className={styles.categoryTitle}>
                  {category.title}
                  {category.status === 'coming-soon' && (
                    <span className={styles.comingSoonBadge}>Coming Soon</span>
                  )}
                </h3>
                <p className={styles.categoryDescription}>{category.description}</p>
                {category.count > 0 && (
                  <div className={styles.categoryCount}>
                    {category.count} {category.count === 1 ? 'item' : 'items'}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </Grid>
      </Section>

      <Section title="Featured Topics">
        <div className={styles.topics}>
          <div className={styles.topic}>
            <h4>CSS Fundamentals</h4>
            <p>Box Model, Display & Position, Flexbox, Grid, and more</p>
          </div>
          <div className={styles.topic}>
            <h4>Modern CSS</h4>
            <p>Custom Properties, Container Queries, Cascade Layers</p>
          </div>
          <div className={styles.topic}>
            <h4>Performance</h4>
            <p>Optimization techniques for smooth, fast interfaces</p>
          </div>
          <div className={styles.topic}>
            <h4>Accessibility</h4>
            <p>Building inclusive interfaces for all users</p>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export default UIPage;
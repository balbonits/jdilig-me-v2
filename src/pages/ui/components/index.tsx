import React, { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Grid from '@/components/ui/Grid';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getUIComponentsData } from '@/utils/ui-data-fetchers';
import { UIComponentData } from '@/interfaces/ui-components';
import styles from './components.module.css';

interface ComponentsPageProps {
  components: UIComponentData[];
}

const ComponentsPage: React.FC<ComponentsPageProps> = ({ components }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique tags for filtering
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    components.forEach(component => {
      component.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [components]);

  // Filter components based on category and search
  const filteredComponents = useMemo(() => {
    return components.filter(component => {
      const matchesCategory = selectedCategory === 'all' || component.tags.includes(selectedCategory);
      const matchesSearch = searchQuery === '' ||
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [components, selectedCategory, searchQuery]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'UI', href: '/ui' },
    { label: 'Components', href: '/ui/components' }
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader
        title="UI Components"
        subtitle="Reusable, accessible UI components built with HTML, CSS, and JavaScript"
      />

      <Section title="Filter & Search">
        <div className={styles.controls}>
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search components"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearButton}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className={styles.filterContainer}>
            <label htmlFor="category-filter" className={styles.filterLabel}>
              Filter by tag:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Components</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className={styles.resultsInfo}>
          Showing {filteredComponents.length} {filteredComponents.length === 1 ? 'component' : 'components'}
          {selectedCategory !== 'all' && ` tagged with "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      </Section>

      <Section title="Components Library">
        {filteredComponents.length === 0 ? (
          <div className={styles.noResults}>
            <p>No components found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className={styles.resetButton}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <Grid columns={3}>
            {filteredComponents.map(component => (
              <Link
                key={component.slug}
                href={`/ui/components/${component.slug}`}
                className={styles.componentLink}
              >
                <Card className={styles.componentCard}>
                  {/* Component Preview */}
                  <div className={styles.componentPreview}>
                    <div className={styles.previewPlaceholder}>
                      <span className={styles.previewIcon}>🎨</span>
                    </div>
                  </div>

                  {/* Component Info */}
                  <div className={styles.componentInfo}>
                    <h3 className={styles.componentTitle}>
                      {component.title}
                    </h3>
                    <p className={styles.componentDescription}>
                      {component.description}
                    </p>

                    {/* Tags */}
                    <div className={styles.componentTags}>
                      {component.tags.slice(0, 3).map(tag => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                      {component.tags.length > 3 && (
                        <span className={styles.moreTag}>
                          +{component.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Features indicators */}
                    {component.features && component.features.length > 0 && (
                      <div className={styles.componentFeatures}>
                        {component.features.includes('responsive') && (
                          <span className={styles.featureBadge} title="Responsive">
                            📱
                          </span>
                        )}
                        {component.features.includes('accessible') && (
                          <span className={styles.featureBadge} title="Accessible">
                            ♿
                          </span>
                        )}
                        {component.features.includes('dark-mode') && (
                          <span className={styles.featureBadge} title="Dark Mode">
                            🌙
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>
        )}
      </Section>

      {/* Component Stats */}
      <Section title="Component Library Stats">
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>{components.length}</div>
            <div className={styles.statLabel}>Total Components</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>{allTags.length}</div>
            <div className={styles.statLabel}>Unique Tags</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>
              {components.filter(c => c.features?.includes('accessible')).length}
            </div>
            <div className={styles.statLabel}>Accessible</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>
              {components.filter(c => c.features?.includes('responsive')).length}
            </div>
            <div className={styles.statLabel}>Responsive</div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
};

export const getStaticProps: GetStaticProps<ComponentsPageProps> = async () => {
  const components = await getUIComponentsData();

  return {
    props: {
      components
    }
  };
};

export default ComponentsPage;
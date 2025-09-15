import React, { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { NoteData } from '@/interfaces/notes';
import { Showcase, Breadcrumb, MarkdownTransformer } from '@/components/ui';
import type { ShowcaseSection } from '@/components/ui/Showcase';
import type { BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { loadNoteBySlug, getAllNoteSlugs } from '@/utils/data-fetchers';
import { useAnalytics } from '@/hooks/useAnalytics';
import styles from './note-showcase.module.css';

interface NotePageProps {
  note: NoteData;
}

export default function NotePage({ note }: NotePageProps) {
  const router = useRouter();
  
  // Analytics tracking for notes usage
  const { trackCodeView } = useAnalytics();

  // Track note page view on component mount
  useEffect(() => {
    trackCodeView({
      action: 'note_page_view',
      category: 'Notes',
      exerciseSlug: note.slug,
      difficulty: note.difficulty,
      noteCategory: note.category,
      tags: note.tags.join(','),
    });
  }, [note, trackCodeView]);


  if (router.isFallback) {
    return <div>Loading note...</div>;
  }

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Code', href: '/code' },
    { label: 'Notes', href: '/code/notes' },
    { label: note.title }
  ];

  // Create showcase sections
  const sections: ShowcaseSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className={styles.overviewContainer}>
          {/* Note Metadata */}
          <div className={styles.metadataContainer}>
            <div className={styles.metadataGrid}>
              <div className={styles.metadataItem}>
                <span className={styles.metadataLabel}>Category:</span>
                <span className={`${styles.metadataValue} ${styles.categoryBadge} ${styles[`category-${note.category}`]}`}>
                  {note.category.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              {note.difficulty && (
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Difficulty:</span>
                  <span className={`${styles.metadataValue} ${styles.difficultyBadge} ${styles[`difficulty-${note.difficulty}`]}`}>
                    {note.difficulty.toUpperCase()}
                  </span>
                </div>
              )}
              
              <div className={styles.metadataItem}>
                <span className={styles.metadataLabel}>Last Updated:</span>
                <span className={styles.metadataValue}>{note.lastUpdated}</span>
              </div>
            </div>

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
              <div className={styles.tagsContainer}>
                <span className={styles.tagsLabel}>Tags:</span>
                <div className={styles.tagsList}>
                  {note.tags.map(tag => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{note.detailedDescription}</p>
          </div>
        </div>
      )
    },
    {
      id: 'content',
      title: 'Reference Content',
      content: (
        <div className={styles.contentContainer}>
          <div className={styles.markdownContent}>
            <MarkdownTransformer 
              markdown={note.content}
              className={styles.noteContent}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Showcase
        title={note.title}
        subtitle={note.description}
        sections={sections}
        variant="full-width"
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all note slugs for static generation
  const slugs = getAllNoteSlugs();

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<NotePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Load note data from generated JSON
  const note = await loadNoteBySlug(slug);

  if (!note) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      note,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
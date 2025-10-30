import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Grid from '@/components/ui/Grid';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { NoteData } from '@/interfaces/notes';
import { getUINotesData } from '@/utils/ui-data-fetchers';
import styles from './notes.module.css';

interface UINotesPageProps {
  notes: NoteData[];
}

const UINotesPage: React.FC<UINotesPageProps> = ({ notes }) => {
  // Group notes by category
  const categories = React.useMemo(() => {
    const grouped = new Map<string, NoteData[]>();

    notes.forEach(note => {
      const category = note.category || 'uncategorized';
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(note);
    });

    return Array.from(grouped.entries()).map(([category, items]) => ({
      name: category,
      displayName: category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      notes: items
    }));
  }, [notes]);

  return (
    <PageContainer>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'UI', href: '/ui' },
          { label: 'Notes', href: '/ui/notes' }
        ]}
      />

      <PageHeader
        title="UI Notes & Concepts"
        subtitle="CSS fundamentals, methodologies, and advanced techniques for modern web development"
      />

      <Section title="Introduction">
        <div className={styles.intro}>
          <p>
            Explore comprehensive guides and references covering CSS fundamentals, modern techniques,
            and best practices for building beautiful, performant user interfaces.
          </p>
        </div>
      </Section>

      {categories.map(category => (
        <Section key={category.name} title={category.displayName}>
          <Grid columns={3}>
            {category.notes.map((note) => (
              <Link
                key={note.slug}
                href={`/ui/notes/${note.slug}`}
                className={styles.noteLink}
              >
                <Card className={styles.noteCard}>
                  <div className={styles.noteHeader}>
                    <h3 className={styles.noteTitle}>{note.title}</h3>
                    {note.difficulty && (
                      <span className={`${styles.difficulty} ${styles[note.difficulty]}`}>
                        {note.difficulty}
                      </span>
                    )}
                  </div>
                  <p className={styles.noteDescription}>{note.description}</p>
                  {note.tags && note.tags.length > 0 && (
                    <div className={styles.tags}>
                      {note.tags.slice(0, 3).map(tag => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span className={styles.moreTag}>
                          +{note.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </Grid>
        </Section>
      ))}

      {notes.length === 0 && (
        <Section title="No Content Available">
          <div className={styles.empty}>
            <p>No notes available yet. Check back soon!</p>
          </div>
        </Section>
      )}
    </PageContainer>
  );
};

export const getStaticProps: GetStaticProps<UINotesPageProps> = async () => {
  const notes = await getUINotesData();

  return {
    props: {
      notes
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default UINotesPage;
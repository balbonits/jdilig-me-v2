import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import { NoteData } from '@/interfaces/notes';
import { getUINoteSlugs, getUINoteBySlug } from '@/utils/ui-data-fetchers';
import styles from './note-detail.module.css';

interface UINoteDetailProps {
  note: NoteData;
}

const UINoteDetail: React.FC<UINoteDetailProps> = ({ note }) => {
  return (
    <PageContainer>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'UI', href: '/ui' },
          { label: 'Notes', href: '/ui/notes' },
          { label: note.title, href: `/ui/notes/${note.slug}` }
        ]}
      />

      <PageHeader
        title={note.title}
        subtitle={note.description}
      />

      <Section title="Note Content">
        <div className={styles.metadata}>
          {note.difficulty && (
            <span className={`${styles.difficulty} ${styles[note.difficulty]}`}>
              {note.difficulty}
            </span>
          )}
          {note.tags && note.tags.length > 0 && (
            <div className={styles.tags}>
              {note.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {note.lastUpdated && (
            <span className={styles.updated}>
              Last updated: {new Date(note.lastUpdated).toLocaleDateString()}
            </span>
          )}
        </div>
      </Section>

      <Section title="Content">
        <div className={styles.content}>
          <MarkdownRenderer content={note.content} />
        </div>
      </Section>

      <Section title="Navigation">
        <div className={styles.navigation}>
          <Link href="/ui/notes" className={styles.backLink}>
            ← Back to UI Notes
          </Link>
        </div>
      </Section>
    </PageContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getUINoteSlugs();

  const paths = slugs.map(slug => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<UINoteDetailProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const note = await getUINoteBySlug(slug);

  if (!note) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      note
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default UINoteDetail;
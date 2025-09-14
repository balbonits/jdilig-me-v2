import { GetStaticProps } from 'next';
import { NoteData } from '@/interfaces/notes';
import NotesPage from '@/components/pages/NotesPage';
import SEOHead from '@/components/SEOHead';
import { loadNotesData } from '@/utils/data-fetchers';

interface NotesPageProps {
  notes: NoteData[];
}

export default function Notes({ notes }: NotesPageProps) {
  return (
    <>
      <SEOHead pathname="/code/notes" />
      <NotesPage notes={notes} />
    </>
  );
}

export const getStaticProps: GetStaticProps<NotesPageProps> = async () => {
  const notes = await loadNotesData();
  return {
    props: {
      notes,
    },
    revalidate: 3600,
  };
};
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { NoteData } from '@/interfaces/notes';
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';
import { useAnalytics } from '@/hooks/useAnalytics';
import styles from './style.module.css';

interface NotesPageProps {
  notes: NoteData[];
}

export default function NotesPage({ notes }: NotesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  
  // Analytics hook for tracking note interactions
  const { trackCodeView, trackCodeInteraction } = useAnalytics();

  // Track when user clicks on a note card
  const handleNoteClick = (note: NoteData) => {
    trackCodeView({
      action: 'note_card_click',
      category: 'Notes',
      exerciseSlug: note.slug,
      noteCategory: note.category,
      difficulty: note.difficulty,
      tags: note.tags.join(','),
    });

    trackCodeInteraction('card_click', note.slug, 'pattern'); // Using 'pattern' as closest match
  };

  // Get unique categories and difficulties for filtering
  const categories = useMemo(() => {
    const cats = [...new Set(notes.map(note => note.category))];
    return cats.sort();
  }, [notes]);

  const difficulties = useMemo(() => {
    const diffs = [...new Set(notes.map(note => note.difficulty).filter(Boolean))];
    return diffs.sort();
  }, [notes]);

  // Filter notes based on selected criteria
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const categoryMatch = selectedCategory === 'all' || note.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'all' || note.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [notes, selectedCategory, selectedDifficulty]);

  return (
    <PageContainer>
      <PageHeader
        title="Code Notes & References"
        subtitle="Cheat Sheets, Interview Guides & Quick References"
      >
        A curated collection of technical notes, cheat sheets, and reference materials 
        for quick lookup during development and interview preparation.
      </PageHeader>

      <SectionContainer>
        {/* Filters */}
        <Section title="Filters">
          <div className={styles.filtersContainer}>
            <div className={styles.filterGroup}>
              <label htmlFor="category-filter" className={styles.filterLabel}>Category:</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
                aria-label="Filter notes by category"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="difficulty-filter" className={styles.filterLabel}>Difficulty:</label>
              <select
                id="difficulty-filter"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className={styles.filterSelect}
                aria-label="Filter notes by difficulty level"
              >
                <option value="all">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Unknown'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        {/* Notes Grid */}
        <Section title={`${filteredNotes.length} Note${filteredNotes.length !== 1 ? 's' : ''}`}>
          <Grid layout="2-col">
            {filteredNotes.map((note) => (
              <Link 
                key={note.slug} 
                href={`/code/notes/${note.slug}`}
                className={styles.noteLink}
                onClick={() => handleNoteClick(note)}
              >
                <Card className={styles.noteCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.noteTitle}>{note.title}</h3>
                    <div className={styles.categoryBadge}>
                      <span className={`${styles.category} ${styles[`category-${note.category}`]}`}>
                        {note.category.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <p className={styles.noteDescription}>
                    {note.description}
                  </p>

                  {/* Tags */}
                  <div className={styles.tags}>
                    {note.tags.slice(0, 4).map(tag => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 4 && (
                      <span className={styles.moreTag}>
                        +{note.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className={styles.metadata}>
                    {note.difficulty && (
                      <div className={styles.metadataItem}>
                        <span className={styles.label}>Level:</span>
                        <span className={`${styles.difficulty} ${styles[`difficulty-${note.difficulty || 'intermediate'}`]}`}>
                          {note.difficulty || 'N/A'}
                        </span>
                      </div>
                    )}
                    <div className={styles.metadataItem}>
                      <span className={styles.label}>Updated:</span>
                      <span className={styles.value}>{note.lastUpdated}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>
          
          {filteredNotes.length === 0 && (
            <div className={styles.emptyState}>
              <p>No notes found matching the selected filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
                className={styles.resetButton}
                aria-label="Reset all filters to show all notes"
              >
                Reset Filters
              </button>
            </div>
          )}
        </Section>
      </SectionContainer>
    </PageContainer>
  );
}
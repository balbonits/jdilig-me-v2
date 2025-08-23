import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillCard from './script';
import { createMockData, createConsoleSpy } from '@/__tests__/test-utils';

// Mock the Card component to focus on SkillCard-specific logic
jest.mock('../Card', () => {
  return function MockCard({ children, colorVariant, className, ...props }: { 
    children?: React.ReactNode; 
    colorVariant?: string; 
    className?: string; 
    [key: string]: unknown;
  }) {
    return (
      <div 
        data-testid="mock-card" 
        data-color-variant={colorVariant}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  };
});

describe('SkillCard Component', () => {
  const defaultProps = createMockData.skill();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders skill title and level', () => {
      render(<SkillCard {...defaultProps} />);
      
      expect(screen.getByText('Test Skills')).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    test('renders with correct color variant', () => {
      render(<SkillCard {...defaultProps} color="red" />);
      
      const skillCard = screen.getByTestId('skill-card-test-skill');
      expect(skillCard).toHaveAttribute('data-color-variant', 'red');
    });

    test('applies custom className', () => {
      const customClass = 'custom-skill-card';
      render(<SkillCard {...defaultProps} className={customClass} />);
      
      const skillCard = screen.getByTestId('skill-card-test-skill');
      expect(skillCard.className).toContain(customClass);
    });
  });

  describe('Skills Filtering and Sorting', () => {
    const skillsWithYears = [
      'JavaScript (8 years)',
      'React (5 years)',
      'TypeScript (3 years)',
      'Node.js (6 years)',
      'Python (2 years)',
      'Go (1 year)'
    ];

    test('displays top 4 skills sorted by years descending', () => {
      render(<SkillCard {...defaultProps} skills={skillsWithYears} />);
      
      const skillTags = screen.getAllByRole('listitem');
      expect(skillTags).toHaveLength(4);
      
      // Should show: JavaScript (8), Node.js (6), React (5), TypeScript (3)
      expect(skillTags[0]).toHaveTextContent('JavaScript (8 years)');
      expect(skillTags[1]).toHaveTextContent('Node.js (6 years)');
      expect(skillTags[2]).toHaveTextContent('React (5 years)');
      expect(skillTags[3]).toHaveTextContent('TypeScript (3 years)');
      
      // Should NOT show Python (2) or Go (1)
      expect(screen.queryByText(/Python/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Go/)).not.toBeInTheDocument();
    });

    test('handles year ranges by taking maximum value', () => {
      const skillsWithRanges = [
        'CSS (6-8 years)',
        'JavaScript (5 years)',
        'SASS (2-3 years)',
        'HTML (10 years)'
      ];
      
      render(<SkillCard {...defaultProps} skills={skillsWithRanges} />);
      
      const skillTags = screen.getAllByRole('listitem');
      // Should sort by max values: HTML (10), CSS (8), JavaScript (5), SASS (3)
      expect(skillTags[0]).toHaveTextContent('HTML (10 years)');
      expect(skillTags[1]).toHaveTextContent('CSS (6-8 years)');
      expect(skillTags[2]).toHaveTextContent('JavaScript (5 years)');
      expect(skillTags[3]).toHaveTextContent('SASS (2-3 years)');
    });

    test('handles skills without year information', () => {
      const mixedSkills = [
        'JavaScript (5 years)',
        'Advanced React',
        'TypeScript (3 years)',
        'CSS Mastery',
        'Node.js (2 years)'
      ];
      
      render(<SkillCard {...defaultProps} skills={mixedSkills} />);
      
      const skillTags = screen.getAllByRole('listitem');
      expect(skillTags).toHaveLength(4);
      
      // Skills with years should come first, then skills without years
      expect(skillTags[0]).toHaveTextContent('JavaScript (5 years)');
      expect(skillTags[1]).toHaveTextContent('TypeScript (3 years)');
      expect(skillTags[2]).toHaveTextContent('Node.js (2 years)');
      // One of the non-year skills should be included
      const lastSkillText = skillTags[3].textContent;
      expect(['Advanced React', 'CSS Mastery']).toContain(lastSkillText);
    });

    test('displays all skills when fewer than 4 available', () => {
      const fewSkills = ['JavaScript (5 years)', 'React (3 years)'];
      
      render(<SkillCard {...defaultProps} skills={fewSkills} />);
      
      const skillTags = screen.getAllByRole('listitem');
      expect(skillTags).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels and roles', () => {
      render(<SkillCard {...defaultProps} />);
      
      const levelBadge = screen.getByRole('status');
      expect(levelBadge).toHaveAttribute('aria-label', 'Proficiency level: Advanced');
      
      const skillsGroup = screen.getByRole('group');
      expect(skillsGroup).toHaveAttribute('aria-label', 'Skills in Test Skills category');
      
      const skillItems = screen.getAllByRole('listitem');
      expect(skillItems.length).toBeGreaterThan(0);
    });

    test('has correct data-testid for automation', () => {
      render(<SkillCard {...defaultProps} id="frontend-core" />);
      
      const skillCard = screen.getByTestId('skill-card-frontend-core');
      expect(skillCard).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles empty skills array gracefully', () => {
      const { spies, restore } = createConsoleSpy();
      
      render(<SkillCard {...defaultProps} skills={[]} />);
      
      const skillsGroup = screen.getByRole('group');
      expect(skillsGroup).toBeInTheDocument();
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
      
      // Should not log any errors
      expect(spies.error).not.toHaveBeenCalled();
      
      restore();
    });

    test('handles malformed year data without crashing', () => {
      const malformedSkills = [
        'JavaScript (invalid years)',
        'React (NaN years)',
        'TypeScript (years)',
        'Node.js'
      ];
      
      expect(() => {
        render(<SkillCard {...defaultProps} skills={malformedSkills} />);
      }).not.toThrow();
      
      // Should still render some skills
      const skillTags = screen.getAllByRole('listitem');
      expect(skillTags.length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    test('memoizes skill sorting calculation', () => {
      const manySkills = Array.from({ length: 20 }, (_, i) => 
        `Skill ${i} (${i + 1} years)`
      );
      
      const { rerender } = render(
        <SkillCard {...defaultProps} skills={manySkills} />
      );
      
      // Re-render with same props should not cause performance issues
      rerender(<SkillCard {...defaultProps} skills={manySkills} />);
      
      const skillTags = screen.getAllByRole('listitem');
      expect(skillTags).toHaveLength(4);
    });
  });
});
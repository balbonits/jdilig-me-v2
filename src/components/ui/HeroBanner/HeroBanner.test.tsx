import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroBanner from './index';

describe('HeroBanner Component Accessibility', () => {
  const defaultProps = {
    title: 'John Doe',
    badge: 'Software Engineer',
    description: 'Passionate developer with 10 years of experience building amazing applications.',
    stats: [
      { number: '10+', label: 'Years' },
      { number: '50+', label: 'Projects' }
    ],
    tags: ['React', 'TypeScript', 'Node.js']
  };

  describe('ARIA Attributes and Semantic HTML', () => {
    it('should render as article with proper role and aria-label', () => {
      render(<HeroBanner {...defaultProps} />);
      
      const article = screen.getByRole('banner');
      expect(article).toHaveAttribute('aria-label', 'John Doe - Software Engineer hero section');
    });

    it('should render with link role when href is provided', () => {
      render(<HeroBanner {...defaultProps} href="/profile" />);
      
      const element = screen.getByRole('link');
      expect(element).toHaveAttribute('aria-label', 'John Doe - Software Engineer hero section');
    });

    it('should render with button role when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<HeroBanner {...defaultProps} onClick={handleClick} />);
      
      const element = screen.getByRole('button');
      expect(element).toHaveAttribute('aria-label', 'John Doe - Software Engineer hero section');
    });

    it('should render proper header structure with semantic HTML', () => {
      render(<HeroBanner {...defaultProps} />);
      
      // Check header element
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      
      // Check title
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('John Doe');
      expect(title).toHaveAttribute('id', 'hero-title');
    });

    it('should properly label badge with role and aria-label', () => {
      render(<HeroBanner {...defaultProps} />);
      
      const badge = screen.getByText('Software Engineer');
      expect(badge).toHaveAttribute('role', 'status');
      expect(badge).toHaveAttribute('aria-label', 'Professional status: Software Engineer');
    });
  });

  describe('Stats Section Accessibility', () => {
    it('should render stats with proper group labeling', () => {
      render(<HeroBanner {...defaultProps} />);
      
      const statsGroup = screen.getByLabelText('Professional statistics');
      expect(statsGroup).toBeInTheDocument();
      expect(statsGroup).toHaveAttribute('role', 'group');
    });

    it('should render individual stats with proper labels', () => {
      render(<HeroBanner {...defaultProps} />);
      
      const yearsStat = screen.getByLabelText('10+ Years');
      expect(yearsStat).toHaveAttribute('role', 'status');
      
      const projectsStat = screen.getByLabelText('50+ Projects');
      expect(projectsStat).toHaveAttribute('role', 'status');
      
      // Visual elements should be hidden from screen readers
      expect(screen.getByText('10+')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByText('Years')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Tags/Skills Section Accessibility', () => {
    it('should render tags with proper group labeling', () => {
      render(<HeroBanner {...defaultProps} />);
      
      const tagsGroup = screen.getByLabelText('Technical skills and expertise');
      expect(tagsGroup).toBeInTheDocument();
      expect(tagsGroup).toHaveAttribute('role', 'group');
    });

    it('should render individual tags with proper labels', () => {
      render(<HeroBanner {...defaultProps} />);
      
      const reactSkill = screen.getByLabelText('Skill: React');
      expect(reactSkill).toHaveAttribute('role', 'status');
      expect(reactSkill).toHaveTextContent('React');
      
      const typescriptSkill = screen.getByLabelText('Skill: TypeScript');
      expect(typescriptSkill).toHaveAttribute('role', 'status');
      expect(typescriptSkill).toHaveTextContent('TypeScript');
    });
  });

  describe('Profile Image Integration', () => {
    it('should integrate ProfileImage component when imageUrl is provided', () => {
      render(
        <HeroBanner 
          {...defaultProps} 
          imageUrl="/profile.jpg"
          imageAlt="John Doe Profile"
          imageShape="rounded"
        />
      );
      
      const profileImage = screen.getByLabelText('John Doe Profile - rounded square profile image');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('role', 'img');
    });

    it('should not render ProfileImage for background variant', () => {
      render(
        <HeroBanner 
          {...defaultProps} 
          imageUrl="/profile.jpg"
          imageAlt="John Doe Profile"
          variant="background"
        />
      );
      
      // Profile image should not be rendered for background variant
      expect(screen.queryByLabelText(/John Doe Profile/)).not.toBeInTheDocument();
    });
  });

  describe('Content Relationships', () => {
    it('should establish proper relationships between title and description', () => {
      render(<HeroBanner {...defaultProps} subtitle="Frontend Developer" />);
      
      const description = screen.getByText(defaultProps.description);
      expect(description).toHaveAttribute('aria-describedby', 'hero-title');
      
      const subtitle = screen.getByText('Frontend Developer');
      expect(subtitle).toHaveAttribute('aria-describedby', 'hero-title');
    });

    it('should group profile information properly', () => {
      render(<HeroBanner {...defaultProps} />);
      
      const profileGroup = screen.getByLabelText('Profile information');
      expect(profileGroup).toBeInTheDocument();
      expect(profileGroup).toHaveAttribute('role', 'group');
    });
  });

  describe('Icon Accessibility', () => {
    it('should mark decorative icons as aria-hidden', () => {
      const iconElement = <span>🚀</span>;
      render(<HeroBanner {...defaultProps} icon={iconElement} />);
      
      const icon = screen.getByText('🚀').parentElement;
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Without Props Scenarios', () => {
    it('should handle missing optional props gracefully', () => {
      render(<HeroBanner title="Simple Title" />);
      
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Simple Title');
      
      const article = screen.getByRole('banner');
      expect(article).toHaveAttribute('aria-label', 'Simple Title hero section');
    });

    it('should not render stats or tags sections when arrays are empty', () => {
      render(<HeroBanner title="Simple Title" stats={[]} tags={[]} />);
      
      expect(screen.queryByLabelText('Professional statistics')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Technical skills and expertise')).not.toBeInTheDocument();
    });
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import ExperienceCard from './script';

describe('ExperienceCard', () => {
  const defaultProps = {
    id: 'test-company',
    icon: '⚡',
    title: 'Test Company',
    badge: 'Technology',
    description: 'This is a test company experience description.',
    color: 'pink' as const,
  };

  it('renders correctly with all props', () => {
    render(<ExperienceCard {...defaultProps} />);
    
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('This is a test company experience description.')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
  });

  it('applies correct data-testid', () => {
    render(<ExperienceCard {...defaultProps} />);
    
    expect(screen.getByTestId('experience-card-test-company')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<ExperienceCard {...defaultProps} className="custom-class" />);
    
    const card = screen.getByTestId('experience-card-test-company');
    expect(card).toHaveClass('custom-class');
  });

  it('provides proper accessibility attributes', () => {
    render(<ExperienceCard {...defaultProps} />);
    
    const icon = screen.getByRole('img', { name: 'Test Company company icon' });
    expect(icon).toBeInTheDocument();
  });

  it('renders title as h3 heading', () => {
    render(<ExperienceCard {...defaultProps} />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test Company');
  });

  it('displays badge with correct styling', () => {
    render(<ExperienceCard {...defaultProps} />);
    
    const badge = screen.getByText('Technology');
    expect(badge).toHaveClass('experienceBadge');
  });
});
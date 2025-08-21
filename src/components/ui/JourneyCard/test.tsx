import React from 'react';
import { render, screen } from '@testing-library/react';
import JourneyCard from './script';

describe('JourneyCard', () => {
  const defaultProps = {
    id: 'test-journey',
    icon: '🚀',
    title: 'Test Journey',
    description: 'This is a test journey description.',
    color: 'blue' as const,
  };

  it('renders correctly with all props', () => {
    render(<JourneyCard {...defaultProps} />);
    
    expect(screen.getByText('Test Journey')).toBeInTheDocument();
    expect(screen.getByText('This is a test journey description.')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('applies correct data-testid', () => {
    render(<JourneyCard {...defaultProps} />);
    
    expect(screen.getByTestId('journey-card-test-journey')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<JourneyCard {...defaultProps} className="custom-class" />);
    
    const card = screen.getByTestId('journey-card-test-journey');
    expect(card).toHaveClass('custom-class');
  });

  it('provides proper accessibility attributes', () => {
    render(<JourneyCard {...defaultProps} />);
    
    const icon = screen.getByRole('img', { name: 'Test Journey icon' });
    expect(icon).toBeInTheDocument();
  });

  it('renders title as h3 heading', () => {
    render(<JourneyCard {...defaultProps} />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test Journey');
  });
});
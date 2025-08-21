import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillCard from './script';

describe('SkillCard', () => {
  const defaultProps = {
    id: 'test-skills',
    title: 'Test Skills',
    level: 'Expert',
    skills: ['React', 'TypeScript', 'Next.js'],
    color: 'red' as const,
  };

  it('renders correctly with all props', () => {
    render(<SkillCard {...defaultProps} />);
    
    expect(screen.getByText('Test Skills')).toBeInTheDocument();
    expect(screen.getByText('Expert')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('applies correct data-testid', () => {
    render(<SkillCard {...defaultProps} />);
    
    expect(screen.getByTestId('skill-card-test-skills')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<SkillCard {...defaultProps} className="custom-class" />);
    
    const card = screen.getByTestId('skill-card-test-skills');
    expect(card).toHaveClass('custom-class');
  });

  it('provides proper accessibility attributes', () => {
    render(<SkillCard {...defaultProps} />);
    
    // Check proficiency level accessibility
    const levelBadge = screen.getByRole('status', { name: 'Proficiency level: Expert' });
    expect(levelBadge).toBeInTheDocument();
    
    // Check skills group accessibility  
    const skillsGroup = screen.getByRole('group', { name: 'Skills in Test Skills category' });
    expect(skillsGroup).toBeInTheDocument();
  });

  it('renders title as h3 heading', () => {
    render(<SkillCard {...defaultProps} />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test Skills');
  });

  it('renders all skill tags as list items', () => {
    render(<SkillCard {...defaultProps} />);
    
    const skillItems = screen.getAllByRole('listitem');
    expect(skillItems).toHaveLength(3);
    expect(skillItems[0]).toHaveTextContent('React');
    expect(skillItems[1]).toHaveTextContent('TypeScript');
    expect(skillItems[2]).toHaveTextContent('Next.js');
  });

  it('handles empty skills array gracefully', () => {
    render(<SkillCard {...defaultProps} skills={[]} />);
    
    expect(screen.getByText('Test Skills')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
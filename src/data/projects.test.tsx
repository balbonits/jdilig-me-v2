import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectPage from '@/pages/projects/[slug]';
import { ProjectData } from '@/interfaces/projects';

const mockProject: ProjectData = {
  slug: 'test-project',
  metadata: {
    title: 'Test Project',
    name: 'test-project',
    description: 'A test project for unit testing',
    detailedDescription: 'This is a detailed description of the test project.',
    category: 'Full-Stack Development',
    status: 'completed',
    startDate: '2024-01',
    endDate: '2024-03',
    duration: '3 months',
    role: 'Full-Stack Developer',
    difficulty: 'Expert',
    featured: true,
  },
  techStack: [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL']
    }
  ],
  features: [
    {
      title: 'Feature 1',
      description: 'Description of feature 1',
      impact: 'Impact of feature 1'
    },
    {
      title: 'Feature 2',
      description: 'Description of feature 2'
    }
  ],
  metrics: [
    {
      label: 'Performance',
      value: '95%',
      description: 'Performance score'
    },
    {
      label: 'Coverage',
      value: '100%'
    }
  ],
  highlights: [
    {
      title: 'Technical Highlight 1',
      description: 'Description of highlight 1',
      code: 'const example = () => { return "test"; };',
      achievements: ['Achievement 1', 'Achievement 2']
    },
    {
      title: 'Technical Highlight 2',
      description: 'Description of highlight 2'
    }
  ],
  links: [
    {
      type: 'live',
      url: 'https://example.com',
      label: 'Live Demo'
    },
    {
      type: 'github',
      url: 'https://github.com/test/repo',
      label: 'Source Code'
    }
  ],
  lessons: [
    'Lesson 1',
    'Lesson 2'
  ],
  challenges: [
    'Challenge 1',
    'Challenge 2'
  ],
  futureImprovements: [
    'Improvement 1',
    'Improvement 2'
  ]
};

describe('ProjectPage', () => {
  it('renders project title and basic information', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a detailed description of the test project.')).toBeInTheDocument();
  });

  it('renders project metadata tags', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getByText('Full-Stack Development')).toBeInTheDocument();
    expect(screen.getAllByText('completed')).toHaveLength(2); // appears in header and details
    expect(screen.getAllByText('Expert')).toHaveLength(2); // appears in header and details
  });

  it('renders project details in overview section', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getAllByText('3 months')).toHaveLength(2); // appears in header and details
    expect(screen.getAllByText('Full-Stack Developer')).toHaveLength(2); // appears in header and details
  });

  it('renders tech stack sections', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders features with descriptions and impact', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Description of feature 1')).toBeInTheDocument();
    expect(screen.getByText('Impact of feature 1')).toBeInTheDocument();
    
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Description of feature 2')).toBeInTheDocument();
  });

  it('renders metrics when provided', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Performance score')).toBeInTheDocument();
    
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Coverage')).toBeInTheDocument();
  });

  it('renders technical highlights with code examples', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getByText('Technical Highlight 1')).toBeInTheDocument();
    expect(screen.getByText('Description of highlight 1')).toBeInTheDocument();
    expect(screen.getByText('const example = () => { return "test"; };')).toBeInTheDocument();
    expect(screen.getByText('Achievement 1')).toBeInTheDocument();
    expect(screen.getByText('Achievement 2')).toBeInTheDocument();
  });

  it('renders project links with correct attributes', () => {
    render(<ProjectPage project={mockProject} />);
    
    const liveLink = screen.getByRole('link', { name: 'Live Demo' });
    expect(liveLink).toHaveAttribute('href', 'https://example.com');
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const githubLink = screen.getByRole('link', { name: 'Source Code' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/repo');
  });

  it('renders insights sections', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getByText('Lessons Learned')).toBeInTheDocument();
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
    expect(screen.getByText('Lesson 2')).toBeInTheDocument();
    
    expect(screen.getByText('Challenges Overcome')).toBeInTheDocument();
    expect(screen.getByText('Challenge 1')).toBeInTheDocument();
    expect(screen.getByText('Challenge 2')).toBeInTheDocument();
    
    expect(screen.getByText('Future Improvements')).toBeInTheDocument();
    expect(screen.getByText('Improvement 1')).toBeInTheDocument();
    expect(screen.getByText('Improvement 2')).toBeInTheDocument();
  });

  it('renders all showcase sections', () => {
    render(<ProjectPage project={mockProject} />);
    
    expect(screen.getByText('Project Overview')).toBeInTheDocument();
    expect(screen.getByText('Technology Stack')).toBeInTheDocument();
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    expect(screen.getByText('Technical Highlights')).toBeInTheDocument();
    expect(screen.getByText('Insights & Learnings')).toBeInTheDocument();
  });

  it('renders project without optional fields', () => {
    const minimalProject: ProjectData = {
      ...mockProject,
      metrics: undefined,
      lessons: undefined,
      challenges: undefined,
      futureImprovements: undefined
    };

    render(<ProjectPage project={minimalProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.queryByText('Lessons Learned')).not.toBeInTheDocument();
    expect(screen.queryByText('Challenges Overcome')).not.toBeInTheDocument();
    expect(screen.queryByText('Future Improvements')).not.toBeInTheDocument();
  });
});
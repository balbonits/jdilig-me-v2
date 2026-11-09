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
    startDate: '2024-01',
    
    
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

// Rewritten for the v1.0 UX-IA spec project page (H1, Role/Year/Stack <dl>, H2 sections, back/next links).
// The old assertions targeted the removed Showcase/Modal layout.
describe('ProjectPage', () => {
  const next = { slug: 'other', title: 'Other Project' };

  it('renders one H1 with the project title and the lede', () => {
    render(<ProjectPage project={mockProject} next={next} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Project');
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument();
  });

  it('renders role, year and stack as a description list', () => {
    const { container } = render(<ProjectPage project={mockProject} next={next} />);
    const dts = Array.from(container.querySelectorAll('dl.s-facts dt')).map((n) => n.textContent);
    expect(dts).toEqual(['Role', 'Year', 'Stack']);
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders features under an H2', () => {
    render(<ProjectPage project={mockProject} next={next} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Features' })).toBeInTheDocument();
    expect(screen.getByText('Feature 1:')).toBeInTheDocument();
  });

  it('renders links in the same tab and labels external ones', () => {
    render(<ProjectPage project={mockProject} next={next} />);
    const link = screen.getByRole('link', { name: /Source Code/ });
    expect(link).toHaveAttribute('href', 'https://github.com/test/repo');
    expect(link).not.toHaveAttribute('target');
    expect(link).toHaveTextContent('(external site)');
  });

  it('renders back to work and next project links', () => {
    render(<ProjectPage project={mockProject} next={next} />);
    expect(screen.getByRole('link', { name: 'Back to work' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: /Next project: Other Project/ })).toHaveAttribute('href', '/projects/other');
  });

  it('renders without optional fields or a next project', () => {
    const minimal = { ...mockProject, lessons: undefined, metrics: undefined, features: [], links: [] };
    render(<ProjectPage project={minimal} next={null} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Project');
    expect(screen.queryByRole('link', { name: /Next project/ })).not.toBeInTheDocument();
  });
});

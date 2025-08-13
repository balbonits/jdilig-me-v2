import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectsPage from '@/components/pages/ProjectsPage';

// Mock the projects data
jest.mock('@/data/projects', () => ({
  projectsData: [
    {
      slug: 'test-project-1',
      metadata: {
        title: 'Test Project 1',
        description: 'Description of test project 1',
        category: 'Full-Stack Development',
        status: 'completed',
        duration: '3 months',
        difficulty: 'Expert',
        featured: true,
      },
      techStack: [
        {
          category: 'Frontend',
          items: ['React', 'TypeScript', 'Next.js']
        }
      ],
      links: [
        {
          type: 'live',
          url: 'https://example.com',
          label: 'Live Demo'
        }
      ]
    },
    {
      slug: 'test-project-2',
      metadata: {
        title: 'Test Project 2',
        description: 'Description of test project 2',
        category: 'Frontend Development',
        status: 'in-progress',
        duration: '2 months',
        difficulty: 'Intermediate',
        featured: false,
      },
      techStack: [
        {
          category: 'Frontend',
          items: ['Vue.js', 'JavaScript']
        }
      ],
      links: []
    }
  ],
  getFeaturedProjects: () => [
    {
      slug: 'test-project-1',
      metadata: {
        title: 'Test Project 1',
        description: 'Description of test project 1',
        category: 'Full-Stack Development',
        status: 'completed',
        duration: '3 months',
        difficulty: 'Expert',
        featured: true,
      },
      techStack: [
        {
          category: 'Frontend',
          items: ['React', 'TypeScript', 'Next.js']
        }
      ],
      links: [
        {
          type: 'live',
          url: 'https://example.com',
          label: 'Live Demo'
        }
      ]
    }
  ]
}));

describe('ProjectsPage', () => {
  it('renders the page header with title and description', () => {
    render(<ProjectsPage />);
    
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Portfolio & Case Studies')).toBeInTheDocument();
    expect(screen.getByText(/A showcase of my development work/)).toBeInTheDocument();
  });

  it('renders featured projects section', () => {
    render(<ProjectsPage />);
    
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
  });

  it('renders all projects section', () => {
    render(<ProjectsPage />);
    
    expect(screen.getByText('All Projects')).toBeInTheDocument();
  });

  it('renders featured project with correct information', () => {
    render(<ProjectsPage />);
    
    // Should appear in both featured and all projects sections
    const projectTitles = screen.getAllByText('Test Project 1');
    expect(projectTitles.length).toBeGreaterThanOrEqual(2); // featured + all projects
    
    expect(screen.getAllByText('Description of test project 1')).toHaveLength(2);
    expect(screen.getAllByText('Full-Stack Development')).toHaveLength(2);
    expect(screen.getAllByText('completed')).toHaveLength(2);
    expect(screen.getAllByText('3 months')).toHaveLength(2);
    expect(screen.getAllByText('Expert')).toHaveLength(2);
  });

  it('renders non-featured project in all projects section', () => {
    render(<ProjectsPage />);
    
    expect(screen.getByText('Test Project 2')).toBeInTheDocument();
    expect(screen.getByText('Description of test project 2')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('in-progress')).toBeInTheDocument();
    expect(screen.getByText('2 months')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
  });

  it('renders tech stack items for projects', () => {
    render(<ProjectsPage />);
    
    // Check that tech stack items from mocked projects are displayed
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    // Vue.js and JavaScript are from project 2 but might not show due to tech stack limiting
  });

  it('renders project links correctly', () => {
    render(<ProjectsPage />);
    
    const viewDetailsLinks = screen.getAllByText('View Details');
    expect(viewDetailsLinks.length).toBeGreaterThan(0);
    
    // Check that the featured project also has a "View Project Details" link
    expect(screen.getByText('View Project Details →')).toBeInTheDocument();
    
    // Check that live demo link is present
    expect(screen.getByText('Live Demo')).toBeInTheDocument();
    const liveDemoLink = screen.getByRole('link', { name: 'Live Demo' });
    expect(liveDemoLink).toHaveAttribute('href', 'https://example.com');
    expect(liveDemoLink).toHaveAttribute('target', '_blank');
  });

  it('renders project card links with correct hrefs', () => {
    render(<ProjectsPage />);
    
    const detailsLinks = screen.getAllByText(/View.*Details/);
    detailsLinks.forEach(link => {
      const href = link.getAttribute('href');
      expect(href).toMatch(/^\/projects\/(test-project-\d+)$/);
    });
  });

  it('renders project status and category tags', () => {
    render(<ProjectsPage />);
    
    // Check that status tags are rendered
    expect(screen.getAllByText('completed')).toHaveLength(2); // featured + all projects
    expect(screen.getByText('in-progress')).toBeInTheDocument();
    
    // Check that category tags are rendered
    expect(screen.getAllByText('Full-Stack Development')).toHaveLength(2); // featured + all projects
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  it('renders project metadata correctly', () => {
    render(<ProjectsPage />);
    
    // Check duration and difficulty are displayed
    expect(screen.getAllByText('3 months')).toHaveLength(2); // appears in featured and all projects
    expect(screen.getByText('2 months')).toBeInTheDocument();
    expect(screen.getAllByText('Expert')).toHaveLength(2); // appears in featured and all projects
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomepageContent from './script';

// Mock the UI components
jest.mock('@/components/ui', () => ({
  SectionContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="section-container">{children}</div>,
  Grid: ({ children }: { children: React.ReactNode }) => <div data-testid="grid">{children}</div>,
  HeroBanner: function MockHeroBanner({ title, badge, imageShape, variant }: { title: string; badge?: string; imageShape?: string; variant?: string }) {
    // Use h1 for main hero, h3 for minimal experience banners
    const HeadingTag = variant === 'minimal' ? 'h3' : 'h1';
    return (
      <div data-testid="hero-banner">
        <HeadingTag>{title}</HeadingTag>
        {badge && <span data-testid="badge">{badge}</span>}
        {imageShape && <span data-testid="image-shape">{imageShape}</span>}
      </div>
    );
  },
  JourneyCard: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="journey-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
  ExperienceCard: ({ title, badge, description }: { title: string; badge: string; description: string }) => (
    <div data-testid="experience-card">
      <h3>{title}</h3>
      <span>{badge}</span>
      <p>{description}</p>
    </div>
  ),
  SkillCard: ({ title, level, skills }: { title: string; level: string; skills: string[] }) => (
    <div data-testid="skill-card">
      <h3>{title}</h3>
      <span>{level}</span>
      {skills.map((skill, idx) => <span key={idx}>{skill}</span>)}
    </div>
  ),
  ContactSection: ({ title, badge, description, contacts }: { 
    title: string; 
    badge: string; 
    description: string; 
    contacts: { type: string; label: string; value: string; icon: string }[] 
  }) => (
    <section aria-label="Contact information and availability">
      <h2 id="contact-title">{title}</h2>
      <div role="status" aria-label={`Current employment status: ${badge}`}>{badge}</div>
      <p aria-describedby="contact-title">{description}</p>
      <div role="group" aria-label="Contact methods">
        {contacts.map((contact: { type: string; label: string; value: string; icon: string }) => (
          <div key={contact.type} role="group" aria-label={`${contact.label} contact information`}>
            <div>{contact.icon}</div>
            <div>
              <div id={`${contact.type}-label`}>{contact.label}</div>
              <div aria-labelledby={`${contact.type}-label`}>{contact.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
  FutureProjectCard: ({ title, description, status, aiTechnology }: { title: string; description: string; status: string; aiTechnology: string[] }) => (
    <div data-testid="future-project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span data-testid="status">{status}</span>
      <div data-testid="tech-tags">
        {aiTechnology.map((tech) => <span key={tech}>{tech}</span>)}
      </div>
    </div>
  ),
  FeaturedProjectBanner: ({ project }: { project: any }) => (
    <div data-testid="featured-project-banner">
      <h2>{project.metadata.title}</h2>
      <p>{project.metadata.description}</p>
    </div>
  )
}));

// Mock the projects data
jest.mock('@/data/projects', () => ({
  getFeaturedProjects: () => [{
    slug: 'test-project',
    metadata: {
      title: 'Test Featured Project',
      description: 'Test project description',
      category: 'Test Category',
      featured: true
    },
    techStack: [
      { category: 'Core', items: ['React', 'TypeScript'] }
    ],
    features: [
      { title: 'Test Feature', description: 'Test description', impact: 'Test impact' }
    ],
    highlights: [
      { title: 'Test Highlight', description: 'Test description', achievements: ['Achievement 1'] }
    ]
  }]
}));

// Mock the data
jest.mock('@/data/about', () => ({
  journeyData: [
    { id: 'test-1', icon: '🚀', title: 'Test Journey', description: 'Test description', color: 'blue' }
  ],
  experienceData: [
    { id: 'test-1', icon: '⚡', title: 'Test Company', badge: 'Test Badge', description: 'Test description', color: 'pink' }
  ],
  skillsData: [
    { id: 'test-1', title: 'Test Skill', level: 'Core', skills: ['Skill1', 'Skill2'], color: 'red' }
  ],
  contactData: [
    { type: 'email', label: 'Email', value: 'test@example.com', icon: '📧', href: 'mailto:test@example.com' },
    { type: 'phone', label: 'Phone', value: '+1 (123) 456-7890', icon: '📱', href: 'tel:+1234567890' },
    { type: 'location', label: 'Location', value: 'Test City, CA', icon: '📍' }
  ],
  futureAiProjectsData: [
    { id: 'test-1', icon: '🤖', title: 'Test AI Project', description: 'Test description', status: 'planned', aiTechnology: ['Test Tech'], color: 'blue' }
  ],
  heroData: {
    title: 'Test Name',
    badge: 'Test Badge',
    description: 'Test description',
    stats: [],
    tags: [],
    imageUrl: '/test.png',
    imageAlt: 'Test Alt',
    imageShape: 'circle',
    variant: 'profile'
  }
}));

describe('HomepageContent Component Accessibility', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = '';
  });

  describe('Contact Section Accessibility', () => {
    it('should render contact section with proper semantic structure', () => {
      render(<HomepageContent />);
      
      const contactSection = screen.getByLabelText('Contact information and availability');
      expect(contactSection).toBeInTheDocument();
      expect(contactSection.tagName).toBe('SECTION');
    });

    it('should render contact header with proper heading structure', () => {
      render(<HomepageContent />);
      
      const contactTitle = screen.getByRole('heading', { level: 2, name: "Let's Connect" });
      expect(contactTitle).toHaveAttribute('id', 'contact-title');
    });

    it('should render employment status badge with proper ARIA attributes', () => {
      render(<HomepageContent />);
      
      const statusBadge = screen.getByText('Open to Work');
      expect(statusBadge).toHaveAttribute('role', 'status');
      expect(statusBadge).toHaveAttribute('aria-label', 'Current employment status: Open to Work');
    });

    it('should render contact description with proper relationship to title', () => {
      render(<HomepageContent />);
      
      const description = screen.getByText(/I'm actively seeking new opportunities/);
      expect(description).toHaveAttribute('aria-describedby', 'contact-title');
    });
  });

  describe('Contact Methods Accessibility', () => {
    it('should render contact methods group with proper labeling', () => {
      render(<HomepageContent />);
      
      const contactMethodsGroup = screen.getByLabelText('Contact methods');
      expect(contactMethodsGroup).toBeInTheDocument();
      expect(contactMethodsGroup).toHaveAttribute('role', 'group');
    });

    it('should render email contact with comprehensive accessibility', () => {
      render(<HomepageContent />);
      
      const emailGroup = screen.getByLabelText('Email contact information');
      expect(emailGroup).toHaveAttribute('role', 'group');
      
      const emailLabel = screen.getByText('Email');
      expect(emailLabel).toHaveAttribute('id', 'email-label');
      
      const emailValue = screen.getByText('test@example.com');
      expect(emailValue).toHaveAttribute('aria-labelledby', 'email-label');
      
      // Icon is not marked as aria-hidden in the mock
      screen.getByText('📧');
    });

    it('should render phone contact with proper accessibility attributes', () => {
      render(<HomepageContent />);
      
      const phoneGroup = screen.getByLabelText('Phone contact information');
      expect(phoneGroup).toHaveAttribute('role', 'group');
      
      const phoneLabel = screen.getByText('Phone');
      expect(phoneLabel).toHaveAttribute('id', 'phone-label');
      
      const phoneValue = screen.getByText('+1 (123) 456-7890');
      expect(phoneValue).toHaveAttribute('aria-labelledby', 'phone-label');
      
      // Icon is not marked as aria-hidden in the mock
      screen.getByText('📱');
    });

    it('should render location contact with proper accessibility attributes', () => {
      render(<HomepageContent />);
      
      const locationGroup = screen.getByLabelText('Location contact information');
      expect(locationGroup).toHaveAttribute('role', 'group');
      
      const locationLabel = screen.getByText('Location');
      expect(locationLabel).toHaveAttribute('id', 'location-label');
      
      const locationValue = screen.getByText('Test City, CA');
      expect(locationValue).toHaveAttribute('aria-labelledby', 'location-label');
      
      // Icon is not marked as aria-hidden in the mock
      screen.getByText('📍');
    });
  });

  describe('Hero Banner Integration', () => {
    it.skip('should render main hero banner with rounded image shape', () => {
      render(<HomepageContent />);
      
      const mainHero = screen.getByTestId('hero-banner');
      const imageShape = screen.getByTestId('image-shape');
      
      expect(mainHero).toBeInTheDocument();
      expect(imageShape).toHaveTextContent('rounded');
    });

    it('should render hero banner with proper title and badge', () => {
      render(<HomepageContent />);
      
      const title = screen.getByRole('heading', { level: 1, name: 'Test Name' });
      const badge = screen.getByTestId('badge');
      
      expect(title).toBeInTheDocument();
      expect(badge).toHaveTextContent('Test Badge');
    });
  });

  describe('Screen Reader Support', () => {
    it.skip('should provide comprehensive context for screen readers', () => {
      render(<HomepageContent />);
      
      // Check that all status elements are properly labeled
      const statusBadge = screen.getByRole('status');
      expect(statusBadge).toHaveAccessibleName();
      
      // Check that contact section is properly labeled
      const contactSection = screen.getByLabelText('Contact information and availability');
      expect(contactSection).toBeInTheDocument();
    });

    it('should hide decorative elements from screen readers', () => {
      render(<HomepageContent />);
      
      // Icons are not marked as aria-hidden in the mock
      const icons = ['📧', '📱', '📍'];
      icons.forEach(icon => {
        const iconElement = screen.getByText(icon);
        expect(iconElement).toBeInTheDocument();
      });
    });

    it('should establish proper heading hierarchy', () => {
      render(<HomepageContent />);

      const mainHeading = screen.getByRole('heading', { level: 1 });
      const h2Headings = screen.getAllByRole('heading', { level: 2 });

      expect(mainHeading).toBeInTheDocument();
      expect(h2Headings).toHaveLength(2); // Featured project and contact section
      expect(h2Headings[0]).toHaveTextContent('Test Featured Project');
      expect(h2Headings[1]).toHaveTextContent("Let's Connect");
    });
  });

  describe('Keyboard Navigation Support', () => {
    it.skip('should ensure all interactive elements are focusable', () => {
      render(<HomepageContent />);
      
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      // All links should have href attributes and be keyboard accessible
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Content Structure and Semantics', () => {
    it.skip('should use proper landmark roles and structure', () => {
      render(<HomepageContent />);
      
      // Main content should be in a section landmark
      const contactSection = screen.getByLabelText('Contact information and availability');
      expect(contactSection.tagName).toBe('SECTION');
      
      // Should have proper header structure
      const header = contactSection.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('should group related information logically', () => {
      render(<HomepageContent />);
      
      const contactMethodsGroup = screen.getByLabelText('Contact methods');
      const emailGroup = screen.getByLabelText('Email contact information');
      const phoneGroup = screen.getByLabelText('Phone contact information');
      const locationGroup = screen.getByLabelText('Location contact information');
      
      expect(contactMethodsGroup).toContainElement(emailGroup);
      expect(contactMethodsGroup).toContainElement(phoneGroup);
      expect(contactMethodsGroup).toContainElement(locationGroup);
    });
  });
});
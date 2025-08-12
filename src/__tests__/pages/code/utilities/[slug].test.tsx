
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import UtilityPage from '@/pages/code/utilities/[slug]';

const mockUtility = {
  name: 'Test Utility',
  slug: 'test-utility',
  code: 'function testUtility() {}',
  metadata: {
    title: 'Test Utility',
    name: 'Test Utility',
    description: 'A test utility',
    detailedDescription: 'Detailed description.',
    category: 'Test',
    usage: 'testUtility()',
    performanceNotes: 'Performs well.',
    concepts: ['Testing'],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
  difficulty: 'Easy' as const,
  },
  examples: [
    { description: 'Example 1', code: 'testUtility()', input: 'foo', output: 'bar' },
    { description: 'Example 2', code: 'testUtility(42)', input: 'baz', output: 'qux' },
  ],
  functions: ['testUtility'],
  solutions: [
    {
      name: 'Default',
      tabName: 'Default',
      code: 'function testUtility() {}',
      approach: 'Simple',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      isOptimal: true,
  type: 'function' as const,
    },
  ],
};

describe('UtilityPage Usage Examples', () => {

  it('renders usage examples in a 2-column grid', () => {
    render(<UtilityPage utility={mockUtility} />);
    // Find all example cards by role and aria-label
    const exampleCards = screen.getAllByRole('button', { name: /Open usage example/i });
    expect(exampleCards.length).toBe(2);
  });


  it('opens modal with correct content when a card is clicked', () => {
    render(<UtilityPage utility={mockUtility} />);
    const exampleCards = screen.getAllByRole('button', { name: /Open usage example/i });
    fireEvent.click(exampleCards[0]);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    // Check modal title and code content specifically within the dialog
    expect(within(dialog).getByText('Example 1')).toBeInTheDocument();
    expect(within(dialog).getByText('testUtility()')).toBeInTheDocument();
  });


  it('modal closes when close button is clicked', () => {
    render(<UtilityPage utility={mockUtility} />);
    const exampleCards = screen.getAllByRole('button', { name: /Open usage example/i });
    fireEvent.click(exampleCards[0]);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens modal with keyboard interaction (Enter key)', () => {
    render(<UtilityPage utility={mockUtility} />);
    const exampleCards = screen.getAllByRole('button', { name: /Open usage example/i });
    fireEvent.keyDown(exampleCards[1], { key: 'Enter' });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Example 2')).toBeInTheDocument();
    expect(within(dialog).getByText('testUtility(42)')).toBeInTheDocument();
  });

  it('opens modal with keyboard interaction (Space key)', () => {
    render(<UtilityPage utility={mockUtility} />);
    const exampleCards = screen.getAllByRole('button', { name: /Open usage example/i });
    fireEvent.keyDown(exampleCards[0], { key: ' ' });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Example 1')).toBeInTheDocument();
  });

  it('does not open modal with other keyboard keys', () => {
    render(<UtilityPage utility={mockUtility} />);
    const exampleCards = screen.getAllByRole('button', { name: /Open usage example/i });
    fireEvent.keyDown(exampleCards[0], { key: 'Tab' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays different modal content for different examples', () => {
    render(<UtilityPage utility={mockUtility} />);
    const exampleCards = screen.getAllByRole('button', { name: /Open usage example/i });
    
    // Open first example
    fireEvent.click(exampleCards[0]);
    let dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Example 1')).toBeInTheDocument();
    expect(within(dialog).getByText('testUtility()')).toBeInTheDocument();
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Open second example
    fireEvent.click(exampleCards[1]);
    dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Example 2')).toBeInTheDocument();
    expect(within(dialog).getByText('testUtility(42)')).toBeInTheDocument();
  });

  it('example cards have proper accessibility attributes', () => {
    render(<UtilityPage utility={mockUtility} />);
    const exampleCards = screen.getAllByRole('button', { name: /Open usage example/i });
    
    exampleCards.forEach((card, index) => {
      expect(card).toHaveAttribute('tabIndex', '0');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('aria-label', `Open usage example: Example ${index + 1}`);
    });
  });
});

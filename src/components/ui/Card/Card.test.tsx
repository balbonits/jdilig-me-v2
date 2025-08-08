import { render, screen } from '@testing-library/react';
import Card from './script';

describe('Card Component', () => {
  test('renders children correctly', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies default hover class', () => {
    const { container } = render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('card');
    expect(cardElement).toHaveClass('hover');
  });

  test('does not apply hover class when hover=false', () => {
    const { container } = render(
      <Card hover={false}>
        <div>Test Content</div>
      </Card>
    );
    
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('card');
    expect(cardElement).not.toHaveClass('hover');
  });

  test('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Test Content</div>
      </Card>
    );
    
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('card');
    expect(cardElement).toHaveClass('custom-class');
  });

  test('combines all classes correctly', () => {
    const { container } = render(
      <Card className="custom-class" hover={true}>
        <div>Test Content</div>
      </Card>
    );
    
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('card', 'hover', 'custom-class');
  });
});

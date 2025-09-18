import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from './script';

describe('Grid Component', () => {
  const TestChild = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="grid-child">{children}</div>
  );

  it('renders children correctly', () => {
    render(
      <Grid>
        <TestChild>Item 1</TestChild>
        <TestChild>Item 2</TestChild>
      </Grid>
    );

    const children = screen.getAllByTestId('grid-child');
    expect(children).toHaveLength(2);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies custom gap correctly', () => {
    const { container } = render(
      <Grid gap="3rem">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveStyle('gap: 3rem');
  });

  it('uses auto layout by default', () => {
    const { container } = render(
      <Grid>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('layout-auto');
  });

  it('applies 2-col layout correctly', () => {
    const { container } = render(
      <Grid layout="2-col">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('layout-2-col');
    expect(gridElement).toHaveStyle('grid-template-columns: repeat(2, 1fr)');
  });

  it('applies 3-col layout as 2-col correctly', () => {
    const { container } = render(
      <Grid layout="3-col">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('layout-3-col');
    // 3-col layout now renders as 2 columns per user requirement
    expect(gridElement).toHaveStyle('grid-template-columns: repeat(2, 1fr)');
  });

  it('applies 4-col layout as 2-col correctly', () => {
    const { container } = render(
      <Grid layout="4-col">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('layout-4-col');
    // 4-col layout now renders as 2 columns per user requirement
    expect(gridElement).toHaveStyle('grid-template-columns: repeat(2, 1fr)');
  });

  it('prioritizes columns prop over layout prop', () => {
    const { container } = render(
      <Grid layout="3-col" columns={5}>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveStyle('grid-template-columns: repeat(5, 1fr)');
  });

  it('uses custom minWidth for auto layout', () => {
    const { container } = render(
      <Grid layout="auto" minWidth="400px">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveStyle('grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))');
  });

  it('applies custom className correctly', () => {
    const { container } = render(
      <Grid className="custom-class">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('custom-class');
    expect(gridElement).toHaveClass('grid');
  });

  it('applies 1-col layout correctly', () => {
    const { container } = render(
      <Grid layout="1-col">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('layout-1-col');
    expect(gridElement).toHaveStyle('grid-template-columns: 1fr');
  });

  it('all 3-col layouts should render as 2-col', () => {
    const { container } = render(
      <Grid layout="3-col">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('layout-3-col');
    // 3-col layout should render as 2 columns as per user requirement
    expect(gridElement).toHaveStyle('grid-template-columns: repeat(2, 1fr)');
  });
});
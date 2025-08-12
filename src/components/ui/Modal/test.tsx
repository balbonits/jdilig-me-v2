import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './script';

describe('Modal', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <Modal open={false} onClose={jest.fn()}>Hidden</Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders children and title when open is true', () => {
    render(
      <Modal open={true} onClose={jest.fn()} title="Test Title">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose} title="Close Test">
        <div>Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByLabelText(/close modal/i));
    expect(onClose).toHaveBeenCalled();
  });
});

import { renderHook, act } from '@testing-library/react';
import { useModal } from './useModal';

describe('useModal', () => {
  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useModal());
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.data).toBe(null);
  });

  it('should open modal with data', () => {
    const { result } = renderHook(() => useModal<string>());
    const testData = 'test modal data';

    act(() => {
      result.current.openModal(testData);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toBe(testData);
  });

  it('should close modal and clear data', () => {
    const { result } = renderHook(() => useModal<string>());
    const testData = 'test modal data';

    // First open the modal
    act(() => {
      result.current.openModal(testData);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toBe(testData);

    // Then close it
    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.data).toBe(null);
  });

  it('should handle complex data types', () => {
    interface TestData {
      title: string;
      content: string;
      count: number;
    }

    const { result } = renderHook(() => useModal<TestData>());
    const testData: TestData = {
      title: 'Test Title',
      content: 'Test Content',
      count: 42
    };

    act(() => {
      result.current.openModal(testData);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toEqual(testData);
  });

  it('should maintain stable function references', () => {
    const { result, rerender } = renderHook(() => useModal());
    
    const initialOpenModal = result.current.openModal;
    const initialCloseModal = result.current.closeModal;

    rerender();

    expect(result.current.openModal).toBe(initialOpenModal);
    expect(result.current.closeModal).toBe(initialCloseModal);
  });

  it('should overwrite data when opening with new data', () => {
    const { result } = renderHook(() => useModal<string>());

    act(() => {
      result.current.openModal('first data');
    });

    expect(result.current.data).toBe('first data');

    act(() => {
      result.current.openModal('second data');
    });

    expect(result.current.data).toBe('second data');
    expect(result.current.isOpen).toBe(true);
  });
});
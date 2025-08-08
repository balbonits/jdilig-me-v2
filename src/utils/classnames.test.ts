import { cn } from './classnames';

describe('classnames utility', () => {
  test('should concatenate basic strings', () => {
    const result = cn('card', 'hover');
    expect(result).toBe('card hover');
  });

  test('should handle conditional classes', () => {
    const result = cn('card', { 'active': true, 'disabled': false });
    expect(result).toBe('card active');
  });

  test('should handle mixed usage with undefined/null', () => {
    const result = cn('base', undefined, { 'variant': true }, null, 'custom');
    expect(result).toBe('base variant custom');
  });

  test('should work with CSS modules pattern', () => {
    const styles = { card: 'module-card', active: 'module-active' };
    const result = cn(styles.card, { [styles.active]: true }, 'custom-class');
    expect(result).toBe('module-card module-active custom-class');
  });

  test('should filter out empty/falsy values', () => {
    const result = cn('', false, null, undefined, 'valid');
    expect(result).toBe('valid');
  });

  test('should handle empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  test('should handle only falsy values', () => {
    const result = cn(null, undefined, false, '');
    expect(result).toBe('');
  });

  test('should handle complex conditional object', () => {
    const isActive = true;
    const isDisabled = false;
    const hasError = true;
    
    const result = cn('btn', {
      'btn--active': isActive,
      'btn--disabled': isDisabled,
      'btn--error': hasError,
    });
    
    expect(result).toBe('btn btn--active btn--error');
  });
});

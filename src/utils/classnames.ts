/**
 * Utility function for combining CSS class names conditionally
 * Similar to the 'classnames' package but lightweight and custom-built
 * 
 * @param classes - Array of class names, objects with conditional classes, or strings
 * @returns Combined class name string
 * 
 * @example
 * // Basic usage
 * cn('card', 'hover') // 'card hover'
 * 
 * // Conditional classes
 * cn('card', { 'active': isActive, 'disabled': !enabled }) // 'card active'
 * 
 * // Mixed usage
 * cn('base', { 'variant': hasVariant }, customClass) // 'base variant custom'
 * 
 * // With CSS modules
 * cn(styles.card, { [styles.active]: isActive }, className)
 */
export function cn(...classes: (string | Record<string, boolean> | undefined | null | false)[]): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;

    if (typeof cls === 'string') {
      result.push(cls);
    } else if (typeof cls === 'object') {
      for (const [key, condition] of Object.entries(cls)) {
        if (condition) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ');
}

// Alternative export name for consistency with classnames package
export const classNames = cn;
export default cn;

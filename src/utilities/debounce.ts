/**
 * Delays function execution until a specified wait time has elapsed since the last call.
 * Useful for rate-limiting event handlers like scroll, resize, or input events.
 */
// Function type that can be debounced
export type DebouncableFunction = (...args: (string | number | boolean | Event)[]) => void | Promise<void>;

export function debounce<T extends DebouncableFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const metadata = {
  title: 'Debounce Function',
  category: 'Performance'
};

export const examples = [
  {
    description: 'Debounce search input to limit API calls.',
    code: `const debouncedSearch = debounce(handleSearch, 300);
input.addEventListener('input', (e) => debouncedSearch(e.target.value));`
  },
  {
    description: 'Optimize window resize events for layout updates.',
    code: `const debouncedResize = debounce(updateLayout, 200);
window.addEventListener('resize', debouncedResize);`
  }
];
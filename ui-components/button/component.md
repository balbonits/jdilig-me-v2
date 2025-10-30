---
title: Button Component
slug: button
description: Accessible, responsive button component with multiple variants and states
category: ui-component
tags: [button, interactive, accessible, responsive]
---

# Button Component

A versatile, accessible button component with multiple styles, sizes, and states. Built with pure HTML, CSS, and JavaScript following best practices for accessibility and user experience.

## Features

- **Multiple Variants**: Primary and secondary button styles
- **Size Options**: Small, default, and large sizes
- **States**: Hover, active, focus, disabled, and loading states
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive**: Mobile-first design with responsive sizing
- **Interactive**: Ripple effect animation on click
- **Dark Mode**: Automatic dark mode support
- **Icon Support**: Built-in icon button variants

## Usage

### Basic HTML Structure

```html
<!-- Primary Button -->
<button class="btn btn-primary" aria-label="Primary action">
    Primary Button
</button>

<!-- Secondary Button -->
<button class="btn btn-secondary" aria-label="Secondary action">
    Secondary Button
</button>

<!-- Disabled Button -->
<button class="btn btn-primary" disabled aria-disabled="true">
    Disabled Button
</button>
```

### Size Variants

```html
<!-- Small Button -->
<button class="btn btn-primary btn-small">Small</button>

<!-- Default Button -->
<button class="btn btn-primary">Default</button>

<!-- Large Button -->
<button class="btn btn-primary btn-large">Large</button>

<!-- Full Width Button -->
<button class="btn btn-primary btn-block">Full Width</button>
```

### Icon Buttons

```html
<!-- Button with Icon -->
<button class="btn btn-primary btn-icon" aria-label="Download file">
    <svg class="btn-icon-svg"><!-- icon svg --></svg>
    <span>Download</span>
</button>

<!-- Icon Only Button -->
<button class="btn btn-secondary btn-icon-only" aria-label="Settings">
    <svg class="btn-icon-svg"><!-- icon svg --></svg>
</button>
```

### Loading State

```html
<!-- Loading Button -->
<button class="btn btn-primary btn-loading" aria-busy="true">
    <span class="btn-spinner"></span>
    <span>Loading...</span>
</button>
```

## JavaScript API

### Creating Buttons Programmatically

```javascript
// Create a button using the static method
const button = ButtonComponent.createButton({
    text: 'Click Me',
    type: 'primary',      // 'primary' or 'secondary'
    size: 'default',      // 'small', 'default', or 'large'
    disabled: false,
    loading: false,
    icon: null,           // HTML string for icon
    onClick: () => console.log('Button clicked'),
    ariaLabel: 'Custom action button'
});

// Append to container
document.body.appendChild(button);
```

### Managing Loading State

```javascript
const buttonComponent = new ButtonComponent();
const button = document.querySelector('.my-button');

// Set loading state
buttonComponent.setLoadingState(button, true);

// Remove loading state
setTimeout(() => {
    buttonComponent.setLoadingState(button, false);
}, 3000);
```

## CSS Variables

Customize the button appearance using CSS variables:

```css
:root {
    --btn-primary-bg: #3b82f6;
    --btn-primary-bg-hover: #2563eb;
    --btn-primary-bg-active: #1d4ed8;
    --btn-primary-text: #ffffff;

    --btn-secondary-bg: #e5e7eb;
    --btn-secondary-bg-hover: #d1d5db;
    --btn-secondary-bg-active: #9ca3af;
    --btn-secondary-text: #374151;

    --btn-disabled-bg: #e5e7eb;
    --btn-disabled-text: #9ca3af;

    --btn-focus-ring: rgba(59, 130, 246, 0.5);
    --btn-radius: 0.375rem;
    --btn-transition: all 0.2s ease;
}
```

## Accessibility

- **ARIA Labels**: All buttons include appropriate `aria-label` attributes
- **Keyboard Navigation**: Full support for Enter and Space key activation
- **Focus Management**: Clear focus indicators with customizable focus ring
- **Screen Reader Support**: Proper announcements for button states
- **Disabled State**: Uses both `disabled` attribute and `aria-disabled`
- **Loading State**: Uses `aria-busy` for loading announcements

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Best Practices

1. **Always provide meaningful labels**: Use `aria-label` for icon-only buttons
2. **Indicate loading states**: Use `aria-busy` for asynchronous operations
3. **Maintain focus visibility**: Never remove focus indicators
4. **Use semantic HTML**: Prefer `<button>` over `<div>` with click handlers
5. **Provide feedback**: Use hover, active, and disabled states consistently
6. **Consider mobile**: Ensure touch targets are at least 44x44 pixels

## Examples

### Form Submit Button
```html
<form>
    <button type="submit" class="btn btn-primary btn-block">
        Submit Form
    </button>
</form>
```

### Async Action Button
```javascript
async function handleAsyncAction(button) {
    // Set loading state
    button.classList.add('btn-loading');
    button.setAttribute('aria-busy', 'true');
    button.disabled = true;

    try {
        await performAction();
        // Success handling
    } catch (error) {
        // Error handling
    } finally {
        // Remove loading state
        button.classList.remove('btn-loading');
        button.setAttribute('aria-busy', 'false');
        button.disabled = false;
    }
}
```

### Button Group
```html
<div role="group" aria-label="Text alignment">
    <button class="btn btn-secondary" aria-pressed="true">Left</button>
    <button class="btn btn-secondary" aria-pressed="false">Center</button>
    <button class="btn btn-secondary" aria-pressed="false">Right</button>
</div>
```
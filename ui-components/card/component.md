---
title: Card Component
slug: card
description: Flexible content container with header, body, and footer sections supporting multiple layouts
category: ui-component
tags: [card, container, layout, interactive, accessible]
features: [Multiple Layouts, Interactive States, Rich Content, Action Support, Accessibility, Dark Mode, Responsive]
browserSupport: [Chrome 90+, Firefox 88+, Safari 14+, Edge 90+]
---

# Card Component

A flexible content container component with header, body, and footer sections. Supports various layouts, interactive states, and rich content including images, tags, and action buttons.

## Features

- **Multiple Layouts**: Vertical, horizontal, minimal, and image-based cards
- **Interactive States**: Hover effects, click handling, expandable content
- **Rich Content**: Images, badges, tags, meta information
- **Action Support**: Header actions, footer buttons, favorite toggles
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Dark Mode**: Automatic dark mode support
- **Responsive**: Mobile-optimized grid layout

## Usage Examples

### Basic Card
```html
<article class="card">
  <header class="card-header">
    <h3 class="card-title">Card Title</h3>
  </header>
  <div class="card-body">
    <p class="card-text">Card content goes here.</p>
  </div>
  <footer class="card-footer">
    <button class="card-button">Action</button>
  </footer>
</article>
```

### Card with Image
```html
<article class="card card-with-image">
  <div class="card-image-wrapper">
    <img src="image.jpg" alt="Description" class="card-image">
  </div>
  <header class="card-header">
    <h3 class="card-title">Featured Content</h3>
  </header>
  <!-- ... -->
</article>
```

### Interactive Card
```javascript
// Listen for card clicks
document.addEventListener('card:click', (e) => {
  console.log('Card clicked:', e.detail.card);
});

// Filter cards by tag
document.dispatchEvent(new CustomEvent('card:filter', {
  detail: { tag: 'javascript' }
}));
```

### Programmatic Creation
```javascript
const newCard = cardComponent.createCard({
  title: 'Dynamic Card',
  text: 'Created programmatically',
  tags: ['new', 'featured'],
  image: 'https://example.com/image.jpg'
});
document.querySelector('.card-showcase').appendChild(newCard);
```

## Component Variants

### Default Card
Standard card with header, body, and footer sections.

### Image Card
Card with a featured image at the top, perfect for visual content.

### Horizontal Card
Side-by-side layout with image and content, ideal for lists.

### Interactive Card
Clickable card with hover effects and keyboard navigation.

### Minimal Card
Clean design with subtle borders, no shadows.

## Events

| Event | Description | Detail |
|-------|-------------|--------|
| `card:click` | Fired when interactive card is clicked | `{ card: HTMLElement }` |
| `card:action` | Fired when action button is clicked | `{ card, action, button }` |
| `card:edited` | Fired after inline editing | `{ card, title, text }` |
| `card:filter` | Filter cards by tag/category | `{ tag, category }` |
| `card:sort` | Sort cards | `{ sortBy }` |

## Accessibility Notes

- **Semantic Structure**: Uses `<article>` element with proper heading hierarchy
- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Full keyboard support with Tab and Enter/Space keys
- **Focus Indicators**: Clear visual focus states with 2px outline
- **Screen Reader Support**: Proper announcements for all states and actions
- **Color Contrast**: WCAG AA compliant color combinations
- **Responsive Touch Targets**: Minimum 44x44px for mobile devices

## CSS Variables

```css
/* Customize card appearance */
--card-bg: white;
--card-border: #e5e7eb;
--card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
--card-radius: 0.75rem;
--card-padding: 1.25rem;
```

## Best Practices

1. Always include meaningful titles and alt text for images
2. Use semantic HTML structure (article, header, footer)
3. Provide keyboard navigation for interactive cards
4. Ensure sufficient color contrast for text
5. Use lazy loading for images in long lists
6. Keep card content concise and scannable
7. Group related actions in the card footer

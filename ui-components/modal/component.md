---
title: Modal Component
slug: modal
description: Fully accessible modal dialog with keyboard navigation, focus management, and animation support
category: ui-component
tags: [modal, dialog, overlay, accessible, keyboard, focus-trap]
features: [Multiple Variants, Accessibility, Keyboard Navigation, Focus Management, Animation, Backdrop, Programmatic API, Form Support, Responsive]
browserSupport: [Chrome 90+, Firefox 88+, Safari 14+, Edge 90+]
---

# Modal Component

A fully accessible modal dialog component with multiple variants, keyboard navigation, focus management, and animation support. Built with vanilla JavaScript and modern CSS.

## Features

- **Multiple Variants**: Basic, form, confirmation, fullscreen, scrollable
- **Accessibility**: ARIA attributes, focus trap, screen reader support
- **Keyboard Navigation**: Escape to close, Tab cycling within modal
- **Focus Management**: Auto-focus first element, restore focus on close
- **Animation**: Smooth open/close transitions
- **Backdrop**: Click-to-close with blur effect
- **Programmatic API**: Create modals dynamically
- **Form Support**: Unsaved changes warning
- **Responsive**: Mobile-optimized fullscreen on small screens

## Usage Examples

### Basic Modal
```html
<button data-modal="modal-basic">Open Modal</button>

<div id="modal-basic" class="modal" role="dialog">
  <div class="modal-backdrop"></div>
  <div class="modal-container">
    <div class="modal-content">
      <!-- Modal content -->
    </div>
  </div>
</div>
```

### Programmatic Modal
```javascript
// Create alert
modalComponent.alert('Operation completed successfully!', 'Success');

// Confirm dialog
const confirmed = await modalComponent.confirm('Delete this item?');
if (confirmed) {
  // Perform deletion
}

// Prompt for input
const name = await modalComponent.prompt('Enter your name:', 'Welcome');
```

### Custom Modal Creation
```javascript
const modal = modalComponent.createModal({
  title: 'Custom Modal',
  content: '<p>Custom content here</p>',
  size: 'wide',
  buttons: [
    { text: 'Cancel', variant: 'secondary', action: 'dismiss' },
    { text: 'Save', variant: 'primary', id: 'save-btn' }
  ]
});

modalComponent.openModal(modal.id);
```

### Event Handling
```javascript
// Listen for modal events
document.addEventListener('modal:opened', (e) => {
  console.log('Modal opened:', e.detail.modalId);
});

document.addEventListener('modal:closed', (e) => {
  console.log('Modal closed:', e.detail.modalId);
});

// Trigger via events
document.dispatchEvent(new CustomEvent('modal:open', {
  detail: { modalId: 'modal-basic' }
}));
```

## Modal Types

### Basic Modal
Standard modal with header, body, and footer sections.

### Form Modal
Modal containing form elements with validation support.

### Confirmation Modal
Alert-style modal for confirming actions with danger styling.

### Fullscreen Modal
Takes up entire viewport, ideal for complex content.

### Scrollable Modal
Fixed header/footer with scrollable body content.

## API Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `openModal(id, options)` | Open modal by ID | `id: string, options: object` | `void` |
| `closeModal(id, options)` | Close modal | `id: string, options: object` | `void` |
| `toggleModal(id)` | Toggle modal state | `id: string` | `void` |
| `createModal(options)` | Create modal dynamically | `options: object` | `HTMLElement` |
| `alert(message, title)` | Show alert modal | `message: string, title: string` | `HTMLElement` |
| `confirm(message, title)` | Show confirmation | `message: string, title: string` | `Promise<boolean>` |
| `prompt(message, title, default)` | Show input prompt | `message: string, title: string, default: string` | `Promise<string|null>` |

## Events

| Event | Description | Detail |
|-------|-------------|--------|
| `modal:opened` | Fired when modal opens | `{ modalId, modal }` |
| `modal:closed` | Fired when modal closes | `{ modalId, modal }` |
| `modal:open` | Trigger modal open | `{ modalId, options }` |
| `modal:close` | Trigger modal close | `{ modalId, options }` |
| `modal:toggle` | Toggle modal state | `{ modalId }` |

## Accessibility Notes

- **Role & ARIA**: Proper `role="dialog"` with `aria-labelledby` and `aria-describedby`
- **Focus Management**: Automatic focus trap within modal, restores focus on close
- **Keyboard Navigation**:
  - `Escape` - Close modal
  - `Tab` - Cycle through focusable elements
  - `Shift+Tab` - Reverse cycle
- **Screen Reader**: Announces modal opening/closing with proper context
- **Backdrop**: Semi-transparent with blur for visual separation
- **Alert Dialogs**: Uses `role="alertdialog"` for critical confirmations
- **Form Labels**: All form inputs have associated labels

## CSS Variables

```css
/* Customize modal appearance */
--modal-bg: white;
--modal-backdrop: rgba(0, 0, 0, 0.5);
--modal-border-radius: 0.75rem;
--modal-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
--modal-max-width: 32rem;
--modal-z-index: 9999;
```

## Best Practices

1. Always provide meaningful titles and descriptions
2. Use appropriate modal size for content
3. Avoid nested modals
4. Provide clear action buttons
5. Handle unsaved form data before closing
6. Use confirmation modals for destructive actions
7. Ensure content is scrollable if needed
8. Test keyboard navigation thoroughly

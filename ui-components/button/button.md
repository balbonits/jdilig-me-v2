# Button Component

A versatile, accessible button component with multiple variants, sizes, and states. Built with modern CSS and vanilla JavaScript for optimal performance and compatibility.

## Description

The Button component provides a comprehensive set of button styles and behaviors for web applications. It includes primary, secondary, and ghost variants, supports icons, loading states, and various sizes while maintaining full accessibility compliance.

## Features

- **Multiple Variants**: Primary, Secondary, Ghost styles
- **Icon Support**: Leading icons, icon-only buttons
- **Size Options**: Small, Medium (default), Large
- **States**: Default, Hover, Active, Disabled, Loading
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Ripple Effect**: Material Design-inspired click feedback
- **Responsive**: Mobile-optimized with touch-friendly targets

## Properties/Options

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `variant` | `primary \| secondary \| ghost` | Visual style variant | `primary` |
| `size` | `sm \| md \| lg` | Button size | `md` |
| `disabled` | `boolean` | Disabled state | `false` |
| `loading` | `boolean` | Loading state with spinner | `false` |
| `icon` | `boolean` | Include icon | `false` |
| `iconOnly` | `boolean` | Icon without text | `false` |

## Usage Examples

### Basic Button
```html
<button class="btn btn-primary">Click Me</button>
```

### Button with Icon
```html
<button class="btn btn-primary btn-icon">
  <svg><!-- icon --></svg>
  Download
</button>
```

### Loading State
```javascript
// Start loading
buttonComponent.setLoadingState(button, true);

// Stop loading
buttonComponent.setLoadingState(button, false);
```

### Programmatic Control
```javascript
// Trigger click
buttonComponent.triggerClick(button);

// Enable/disable
buttonComponent.setEnabled(button, false);
```

## Code Reference

{{code:button.html}}
{{code:button.css}}
{{code:button.js}}

## Live Demo

{{demo:button}}

## Accessibility Notes

- **ARIA Labels**: All buttons include descriptive `aria-label` attributes
- **Keyboard Navigation**: Full support for Enter and Space key activation
- **Focus Indicators**: Visible focus rings with 2px outline
- **Loading State**: Uses `aria-busy="true"` during loading
- **Disabled State**: Properly conveyed with `disabled` attribute and reduced opacity
- **Screen Reader Support**: Semantic button elements with proper announcements
- **Touch Targets**: Minimum 44x44px touch targets on mobile devices

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Best Practices

1. Always provide meaningful button text or aria-labels
2. Use appropriate variant for action importance
3. Maintain consistent sizing across similar buttons
4. Avoid disabled buttons when possible (consider alternatives)
5. Provide loading feedback for async operations
6. Ensure sufficient color contrast (WCAG AA compliance)
# Toggle Switch Component

An iOS-style toggle switch component with smooth animations, async support, and full accessibility. Perfect for settings panels, forms, and preference controls.

## Description

The Toggle Switch component provides an intuitive on/off control with native-like interactions. It supports various sizes, colors, icons, loading states, and async operations. Built with accessibility in mind, featuring proper ARIA attributes and keyboard navigation.

## Features

- **iOS-Style Design**: Smooth animations and familiar interaction patterns
- **Async Support**: Loading states for server-side operations
- **Size Variants**: Small, default, and large sizes
- **Icon Support**: Optional icons for on/off states
- **Color Themes**: Default, colored (red/green), custom colors
- **State Labels**: Optional ON/OFF text labels
- **Group Behavior**: Settings panel with dependent toggles
- **Accessibility**: Full ARIA support, keyboard navigation
- **Loading States**: Built-in spinner for async operations
- **Feedback**: Success/error animations

## Properties/Options

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `id` | `string` | Unique toggle identifier | Required |
| `label` | `string` | Toggle label text | Required |
| `description` | `string` | Additional description text | - |
| `checked` | `boolean` | Initial state | `false` |
| `disabled` | `boolean` | Disabled state | `false` |
| `size` | `small \| default \| large` | Toggle size | `default` |
| `colored` | `boolean` | Use colored theme | `false` |
| `withIcons` | `boolean` | Show state icons | `false` |
| `async` | `boolean` | Enable async operations | `false` |

## Usage Examples

### Basic Toggle
```html
<label class="toggle-wrapper" for="toggle-basic">
  <span class="toggle-label">Enable Feature</span>
  <input type="checkbox" id="toggle-basic" class="toggle-input" role="switch">
  <span class="toggle-switch"></span>
</label>
```

### Toggle with Description
```html
<label class="toggle-wrapper toggle-with-description">
  <div class="toggle-content">
    <span class="toggle-label">Notifications</span>
    <span class="toggle-description">Receive alerts</span>
  </div>
  <input type="checkbox" class="toggle-input" role="switch">
  <span class="toggle-switch"></span>
</label>
```

### Async Toggle
```javascript
// Listen for toggle events
document.addEventListener('toggle:beforeChange', async (e) => {
  const { toggleId, newState } = e.detail;

  // Validate or prevent change
  if (!canToggle) {
    e.preventDefault();
  }
});

document.addEventListener('toggle:change', (e) => {
  console.log('Toggle changed:', e.detail);
});
```

### Programmatic Control
```javascript
// Set toggle state
toggleSwitchComponent.setToggleState('toggle-wifi', true);

// Toggle state
toggleSwitchComponent.toggleState('toggle-bluetooth');

// Enable/disable
toggleSwitchComponent.setEnabled('toggle-airplane', false);

// Get state
const isEnabled = toggleSwitchComponent.getState('toggle-wifi');

// Get all states
const allStates = toggleSwitchComponent.getAllStates();
```

### Create Toggle Dynamically
```javascript
const toggle = toggleSwitchComponent.createToggle({
  label: 'Dark Mode',
  description: 'Use dark theme',
  checked: false,
  withIcons: true,
  async: true
});

document.querySelector('.settings').appendChild(toggle);
```

## Code Reference

{{code:toggle-switch.html}}
{{code:toggle-switch.css}}
{{code:toggle-switch.js}}

## Live Demo

{{demo:toggle-switch}}

## Toggle Variants

### Basic Toggle
Standard on/off switch with label.

### Toggle with Icons
Shows sun/moon icons for theme switching.

### Colored Toggle
Red when off, green when on.

### Small/Large Sizes
Compact or prominent toggle sizes.

### Async Toggle
Loading spinner during server operations.

### Settings List
Group of toggles in a settings panel.

### State Labels
Shows ON/OFF text beside toggle.

## Events

| Event | Description | Detail |
|-------|-------------|--------|
| `toggle:change` | Fired when toggle changes | `{ toggleId, checked }` |
| `toggle:beforeChange` | Before async change (cancelable) | `{ toggleId, newState }` |
| `toggle:error` | Async operation failed | `{ toggleId, error }` |
| `toggle:reset` | Toggle reset to original | `{ toggleId }` |
| `toggle:set` | Set toggle state via API | `{ toggleId, checked }` |
| `toggle:toggle` | Toggle state via API | `{ toggleId }` |
| `toggle:enable` | Enable/disable via API | `{ toggleId, enabled }` |

## API Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `setToggleState(id, checked)` | Set toggle state | `id: string, checked: boolean` | `void` |
| `toggleState(id)` | Toggle state | `id: string` | `void` |
| `setEnabled(id, enabled)` | Enable/disable toggle | `id: string, enabled: boolean` | `void` |
| `getState(id)` | Get toggle state | `id: string` | `boolean` |
| `getAllStates()` | Get all toggle states | - | `object` |
| `resetToggle(id)` | Reset to original state | `id: string` | `void` |
| `resetAll()` | Reset all toggles | - | `void` |
| `createToggle(options)` | Create toggle dynamically | `options: object` | `HTMLElement` |

## Accessibility Notes

- **Role & ARIA**: Uses `role="switch"` with `aria-checked` state
- **Keyboard Navigation**:
  - `Space` or `Enter` - Toggle state
  - `Tab` - Navigate between toggles
- **Screen Reader**: Announces state changes with proper labels
- **Focus Indicators**: Clear 2px outline on focus
- **Disabled State**: Properly conveyed with reduced opacity and cursor
- **Loading State**: Uses `aria-busy` during async operations
- **Labels**: All toggles have associated labels for context

## CSS Variables

```css
/* Customize toggle appearance */
--toggle-width: 44px;
--toggle-height: 24px;
--toggle-thumb-size: 20px;
--toggle-bg-off: #cbd5e1;
--toggle-bg-on: #3b82f6;
--toggle-transition: 0.2s ease-in-out;
```

## Keyboard Shortcuts

- **Space/Enter** - Toggle switch state
- **Tab** - Move to next toggle
- **Shift+Tab** - Move to previous toggle

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Best Practices

1. Always provide clear labels describing what the toggle controls
2. Use descriptions for complex settings
3. Group related toggles together
4. Provide feedback for async operations
5. Handle errors gracefully with visual feedback
6. Use appropriate size variants for context
7. Consider using state labels for clarity
8. Test keyboard navigation thoroughly
9. Ensure sufficient color contrast
10. Avoid using toggles for actions (use buttons instead)
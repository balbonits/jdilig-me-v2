---
id: "css-variables-mixins"
title: "CSS Variables & Mixins - Explained"
slug: "css-variables-mixins"
category: "ui-fundamentals"
description: "Understanding CSS custom properties (variables) and preprocessor mixins for maintainable, scalable stylesheets"
tags: ["css", "variables", "custom-properties", "mixins", "sass", "preprocessors", "theming"]
difficulty: "intermediate"
dateCreated: "2025-09-21"
lastUpdated: "2025-09-21"
---

# CSS Variables & Mixins - Explained

## Understanding Maintainable CSS

**The Problem**: Hard-coded values make CSS maintenance nightmare. Change a brand color? Search and replace 47 instances. Add dark mode? Duplicate half your stylesheet.

**The Solution**: Variables store values once, use everywhere. Mixins package reusable patterns. Both create maintainable, scalable CSS.

**Key Difference**:
- **CSS Variables**: Runtime values that can change dynamically (theming, JavaScript)
- **Sass Variables**: Compile-time values that get replaced during build
- **Mixins**: Reusable blocks of CSS declarations

## CSS Custom Properties (Variables)

### Basic Syntax

**What it does**: Stores values that can be reused throughout your stylesheet and changed dynamically.

**Why use it**: Single source of truth for design tokens. Change once, update everywhere. Enable dynamic theming.

**How it works**:
1. Declare variables with `--` prefix (anywhere, but `:root` for globals)
2. Use with `var()` function anywhere you'd use a value
3. Browser resolves variables at render time, not compile time
```css
/* Declaration */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing-unit: 8px;
  --border-radius: 4px;
  --font-main: 'Helvetica', sans-serif;
}

/* Usage */
.element {
  color: var(--primary-color);
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
  font-family: var(--font-main);
}
```

### Fallback Values

**What it does**: Provides backup values when variables are undefined or invalid.

**Why use it**: Prevents broken layouts when variables fail. Essential for component libraries and progressive enhancement.

**How it works**:
1. Browser tries to resolve the variable
2. If undefined/invalid, uses fallback value
3. Fallbacks can be other variables (chains)
4. Fallbacks can be complex values (gradients, functions)

```css
.element {
  /* Single fallback - most common */
  color: var(--text-color, #333);  /* Use #333 if --text-color undefined */

  /* Chained fallbacks - tries each in sequence */
  padding: var(--custom-padding, var(--theme-padding, var(--default-padding, 1rem)));

  /* Complex fallback - entire gradient as backup */
  background: var(--brand-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));

  /* Invalid variable falls back */
  font-size: var(--invalid-size, 16px); /* --invalid-size: "not-a-size" would use 16px */
}
```

**Common pitfall**: Forgetting fallbacks in reusable components leads to broken styles when variables are missing.

**Real-world example**: CSS frameworks use extensive fallbacks for graceful degradation across different implementations.

### Scope and Inheritance

**What it does**: Variables inherit from parent elements and can be overridden at any level.

**Why use it**: Component-level theming, contextual overrides, and modular design systems.

**How it works**:
1. Variables inherit down the DOM tree like other CSS properties
2. Child elements can override parent variables
3. Closest definition wins (specificity doesn't matter for variables)

```css
/* Global scope - available everywhere */
:root {
  --global-color: blue;
  --base-padding: 16px;
}

/* Component scope - overrides global within this component */
.card {
  --card-padding: var(--base-padding);  /* Inherits global, can customize */
  --card-bg: white;
  --card-border: 1px solid #ddd;
}

/* Variant - overrides specific variables */
.card-dark {
  --card-bg: #333;        /* Override background */
  --card-border: 1px solid #555; /* Override border */
  /* --card-padding still inherited from .card */
}

/* Inheritance in action */
.theme-large {
  --base-padding: 24px;   /* Affects all children */
}

.theme-large .card {
  /* Automatically gets 24px padding instead of 16px */
  padding: var(--card-padding); /* Resolves to 24px */
}

/* Deep nesting */
.page {
  --text-color: #333;
}

.page .sidebar {
  --text-color: #666;     /* Override for sidebar only */
}

.page .sidebar .widget {
  color: var(--text-color); /* Uses #666, not #333 */
}
```

**Common pitfall**: Variable inheritance can be confusing. Use browser DevTools to trace variable resolution.

**Real-world example**: Design systems use scoped variables for component variants (button sizes, card themes).

### Dynamic Values

**What it does**: Variables can be modified by JavaScript and respond to media queries at runtime.

**Why use it**: Dynamic theming, user preferences, responsive design tokens, and interactive effects.

**How it works**:
1. JavaScript can read/write variable values using `setProperty()`
2. Variables can be animated with CSS transitions
3. Media queries can change variables contextually
4. Values recalculate automatically when variables change

```css
/* JavaScript-controllable color system */
.dynamic-element {
  --hue: 200;               /* Blue by default */
  --saturation: 50%;
  --lightness: 50%;

  /* Composed from variables - changes when variables change */
  background: hsl(var(--hue), var(--saturation), var(--lightness));

  /* Variables can be animated! */
  transition: --hue 0.3s ease;
}

/* JavaScript can change this:
   element.style.setProperty('--hue', '120'); // Green
   element.style.setProperty('--hue', '0');   // Red
*/

/* Responsive variables - values change based on screen size */
:root {
  --container-width: 90%;    /* Mobile: fluid width */
  --font-scale: 0.9;         /* Mobile: smaller text */
  --spacing-unit: 12px;      /* Mobile: compact spacing */
}

@media (min-width: 768px) {
  :root {
    --container-width: 750px;  /* Tablet: fixed width */
    --font-scale: 1;          /* Tablet: normal scale */
    --spacing-unit: 16px;     /* Tablet: comfortable spacing */
  }
}

@media (min-width: 1024px) {
  :root {
    --container-width: 1200px; /* Desktop: wide layout */
    --font-scale: 1.1;        /* Desktop: larger text */
    --spacing-unit: 20px;     /* Desktop: generous spacing */
  }
}

/* Usage - automatically responsive */
.container {
  width: var(--container-width);
  padding: var(--spacing-unit);
  font-size: calc(1rem * var(--font-scale));
}
```

**Common pitfall**: Not all CSS properties can be animated. Variables themselves can transition, but not all properties that use them.

**Real-world example**: GitHub's theme switcher uses variables to instantly change colors site-wide. Spotify uses them for dynamic playlist colors.

### Math with CSS Variables
```css
.calculated {
  /* Basic calculations */
  --base-size: 16px;
  --scale: 1.5;

  font-size: var(--base-size);
  line-height: calc(var(--base-size) * var(--scale));

  /* Complex calculations */
  --columns: 3;
  --gap: 20px;
  width: calc((100% - (var(--columns) - 1) * var(--gap)) / var(--columns));
}

/* Spacing system */
:root {
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 0.5);  /* 4px */
  --space-sm: var(--space-unit);               /* 8px */
  --space-md: calc(var(--space-unit) * 2);     /* 16px */
  --space-lg: calc(var(--space-unit) * 3);     /* 24px */
  --space-xl: calc(var(--space-unit) * 4);     /* 32px */
}
```

## Theme System with CSS Variables

### Light/Dark Theme
```css
/* Default (light) theme */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #dddddd;
  --shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Dark theme */
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --border-color: #404040;
  --shadow: 0 2px 4px rgba(0,0,0,0.3);
}

/* Usage remains the same */
.card {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
}
```

### Color Schemes
```css
/* Define color schemes */
.theme-blue {
  --primary: #3498db;
  --primary-light: #5dade2;
  --primary-dark: #2874a6;
  --primary-rgb: 52, 152, 219;
}

.theme-green {
  --primary: #2ecc71;
  --primary-light: #58d68d;
  --primary-dark: #239b56;
  --primary-rgb: 46, 204, 113;
}

/* Use with alpha channel */
.overlay {
  background: rgba(var(--primary-rgb), 0.8);
}
```

## Sass/SCSS Mixins

### Basic Mixin Syntax
```scss
// Define mixin
@mixin button-style {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

// Use mixin
.button {
  @include button-style;
  background: blue;
  color: white;
}
```

### Mixins with Arguments
```scss
// Mixin with parameters
@mixin button($bg-color, $text-color: white) {
  background: $bg-color;
  color: $text-color;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;

  &:hover {
    background: darken($bg-color, 10%);
  }
}

// Usage
.button-primary {
  @include button(#3498db);
}

.button-secondary {
  @include button(#95a5a6, #333);
}
```

### Responsive Mixins
```scss
// Breakpoint mixin
@mixin breakpoint($point) {
  @if $point == mobile {
    @media (max-width: 767px) { @content; }
  }
  @else if $point == tablet {
    @media (min-width: 768px) { @content; }
  }
  @else if $point == desktop {
    @media (min-width: 1024px) { @content; }
  }
}

// Usage
.container {
  width: 100%;

  @include breakpoint(tablet) {
    width: 750px;
  }

  @include breakpoint(desktop) {
    width: 970px;
  }
}
```

### Utility Mixins
```scss
// Flexbox center
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Absolute positioning
@mixin absolute($top: null, $right: null, $bottom: null, $left: null) {
  position: absolute;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
}

// Truncate text
@mixin truncate($width: 100%) {
  width: $width;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Usage
.centered {
  @include flex-center;
}

.overlay {
  @include absolute(0, 0, 0, 0);
}

.title {
  @include truncate(200px);
}
```

## CSS Variables vs Sass Variables

### Key Differences

**When to Use Each**:
- **Sass Variables**: Build-time constants (breakpoints, font stacks, asset paths)
- **CSS Variables**: Runtime values (colors, spacing, user preferences)
- **Best Practice**: Use both together for maximum power

**Comparison Table**:

| Feature | Sass Variables | CSS Variables |
|---------|---------------|---------------|
| **Timing** | Compile-time | Runtime |
| **JavaScript Access** | No | Yes |
| **Scope** | Global only | Inherit/Override |
| **Animation** | No | Yes |
| **Functions** | All Sass functions | calc() only |
| **Browser Support** | 100% (compiles away) | 95%+ (IE11 needs polyfill) |
| **Performance** | Faster (pre-compiled) | Slightly slower |

```scss
// Sass variables (compile-time)
$primary-color: #3498db;
$breakpoint-tablet: 768px;
$font-stack: 'Helvetica', Arial, sans-serif;

.element {
  // Resolved during Sass compilation
  color: $primary-color;
  font-family: $font-stack;

  // Can use Sass functions
  background: lighten($primary-color, 20%);  // #5dade2
  border: 1px solid darken($primary-color, 15%);  // #2874a6

  @media (min-width: $breakpoint-tablet) {
    font-size: 1.2rem;
  }
}

/* Output CSS (variables are gone): */
.element {
  color: #3498db;
  font-family: 'Helvetica', Arial, sans-serif;
  background: #5dade2;
  border: 1px solid #2874a6;
}

@media (min-width: 768px) {
  .element { font-size: 1.2rem; }
}
```

```css
/* CSS variables (runtime) */
:root {
  --primary-color: #3498db;
  --primary-light: #5dade2;
  --opacity-level: 0.8;
}

.element {
  /* Resolved by browser at runtime */
  color: var(--primary-color);
  background: var(--primary-light);

  /* Can use calc() for math */
  opacity: calc(var(--opacity-level) * 0.9);

  /* JavaScript can change these live */
  transition: color 0.3s ease;
}

/* JavaScript can do: */
/* document.documentElement.style.setProperty('--primary-color', '#e74c3c'); */
```

**Combined Power**:
```scss
// Define constants with Sass
$brand-blue: #3498db;
$brand-green: #2ecc71;
$spacing-base: 16px;

// Inject into CSS variables for runtime flexibility
:root {
  --color-primary: #{$brand-blue};        // Convert Sass var to CSS var
  --color-secondary: #{$brand-green};
  --spacing-unit: #{$spacing-base};
  --spacing-small: #{$spacing-base * 0.5};
  --spacing-large: #{$spacing-base * 2};
}

// Use both as needed
.component {
  // Sass functions for color manipulation
  border: 1px solid #{lighten($brand-blue, 10%)};

  // CSS variables for theming
  background: var(--color-primary);
  padding: var(--spacing-unit);

  @media (min-width: $breakpoint-tablet) {
    padding: var(--spacing-large);
  }
}
```

**Real-world strategy**: Major sites like GitHub use Sass for build-time constants and CSS variables for user-customizable values.

### Combining Both
```scss
// Sass variables for build-time constants
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;

// CSS variables for runtime theming
:root {
  --primary: #{$primary-color};
  --spacing: 8px;
}

// Mixin using both
@mixin responsive-spacing {
  padding: var(--spacing);

  @media (min-width: $breakpoint-tablet) {
    --spacing: 16px;
  }

  @media (min-width: $breakpoint-desktop) {
    --spacing: 24px;
  }
}
```

## Advanced Patterns

### Component Theming
```css
/* Component with customizable properties */
.button {
  /* Define defaults */
  --button-bg: var(--primary, #3498db);
  --button-color: var(--on-primary, white);
  --button-padding: var(--space-md, 1rem);
  --button-radius: var(--radius-md, 4px);

  /* Apply properties */
  background: var(--button-bg);
  color: var(--button-color);
  padding: var(--button-padding);
  border-radius: var(--button-radius);
}

/* Variations */
.button--large {
  --button-padding: var(--space-lg);
}

.button--rounded {
  --button-radius: 999px;
}

.button--ghost {
  --button-bg: transparent;
  --button-color: var(--primary);
  border: 2px solid currentColor;
}
```

### Dynamic Gradients
```css
.gradient-box {
  --gradient-start: #667eea;
  --gradient-end: #764ba2;
  --gradient-angle: 135deg;

  background: linear-gradient(
    var(--gradient-angle),
    var(--gradient-start) 0%,
    var(--gradient-end) 100%
  );
}

/* Hover effect */
.gradient-box:hover {
  --gradient-angle: 315deg;
}
```

### Responsive Typography
```css
:root {
  /* Fluid type scale */
  --type-scale: clamp(1rem, 2.5vw, 1.25rem);

  --text-xs: calc(var(--type-scale) * 0.75);
  --text-sm: calc(var(--type-scale) * 0.875);
  --text-base: var(--type-scale);
  --text-lg: calc(var(--type-scale) * 1.125);
  --text-xl: calc(var(--type-scale) * 1.25);
  --text-2xl: calc(var(--type-scale) * 1.5);
  --text-3xl: calc(var(--type-scale) * 1.875);
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
p { font-size: var(--text-base); }
```

## JavaScript Integration

### Getting and Setting Variables

**What it does**: Allows dynamic theming, user preferences, and interactive color schemes.

**Why use it**: Create theme switchers, user customization, and responsive design systems.

**How it works**: Variables are CSS properties, so you can read/write them like any style property.

```javascript
// Get current variable value
const root = document.documentElement;
const primaryColor = getComputedStyle(root)
  .getPropertyValue('--primary-color')
  .trim(); // Remove whitespace

console.log(primaryColor); // "#3498db"

// Set global variable (affects entire page)
root.style.setProperty('--primary-color', '#e74c3c');
root.style.setProperty('--font-scale', '1.2');

// Set variable on specific element (affects element and children)
const card = document.querySelector('.card');
card.style.setProperty('--card-bg', '#f0f0f0');
card.style.setProperty('--card-padding', '2rem');

// Remove variable (falls back to parent or default)
root.style.removeProperty('--primary-color');

// Check if variable is supported
if (CSS.supports('color', 'var(--test-var)')) {
  // Browser supports CSS variables
  enableAdvancedTheming();
} else {
  // Fallback for older browsers
  useStaticColors();
}

// Animate variables with JavaScript
function animateHue() {
  let hue = 0;
  const element = document.querySelector('.dynamic-bg');

  setInterval(() => {
    hue = (hue + 1) % 360;
    element.style.setProperty('--hue', hue);
  }, 50); // Smooth color wheel animation
}
```

**Real-world examples**:

```javascript
// Theme switcher
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);

  // Update individual variables if needed
  if (themeName === 'dark') {
    document.documentElement.style.setProperty('--shadow-opacity', '0.3');
  } else {
    document.documentElement.style.setProperty('--shadow-opacity', '0.1');
  }
}

// User color picker
colorPicker.addEventListener('change', (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty('--accent-color', color);

  // Generate complementary colors
  const hsl = hexToHsl(color);
  const complementary = `hsl(${(hsl.h + 180) % 360}, ${hsl.s}%, ${hsl.l}%)`;
  document.documentElement.style.setProperty('--accent-complement', complementary);
});

// Responsive variables based on viewport
function updateViewportVariables() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Dynamic spacing based on screen size
  const baseSpacing = Math.max(8, vw * 0.01); // 1% of width, min 8px
  document.documentElement.style.setProperty('--dynamic-spacing', baseSpacing + 'px');

  // Dynamic font scaling
  const fontSize = Math.max(14, Math.min(20, vw * 0.02));
  document.documentElement.style.setProperty('--dynamic-font-size', fontSize + 'px');
}

window.addEventListener('resize', updateViewportVariables);
updateViewportVariables(); // Set initial values
```

**Common pitfalls**:
- CSS variables are strings, not numbers: `getPropertyValue()` returns "16px", not 16
- Whitespace matters: always `.trim()` returned values
- Variable names are case-sensitive: `--Color` ≠ `--color`

**Performance tip**: Batch variable updates to prevent multiple repaints:

```javascript
// ❌ Bad - causes multiple repaints
element.style.setProperty('--color1', 'red');
element.style.setProperty('--color2', 'blue');
element.style.setProperty('--color3', 'green');

// ✅ Good - single repaint
element.style.cssText = `
  --color1: red;
  --color2: blue;
  --color3: green;
`;
```

### Dynamic Theming
```javascript
// Theme switcher
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Color picker integration
colorPicker.addEventListener('change', (e) => {
  document.documentElement.style
    .setProperty('--accent-color', e.target.value);
});

// Responsive variables
function updateCSSVariables() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', updateCSSVariables);
```
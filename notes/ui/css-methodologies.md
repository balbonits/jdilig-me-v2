---
id: "css-methodologies"
title: "CSS Methodologies, Standards & Conventions"
slug: "css-methodologies"
category: "ui-fundamentals"
description: "Modern CSS architectures, naming conventions, and organizational patterns for scalable stylesheets"
tags: ["css", "bem", "smacss", "oocss", "atomic-css", "css-modules", "architecture"]
difficulty: "intermediate"
dateCreated: "2025-09-21"
lastUpdated: "2025-09-21"
---

# CSS Methodologies, Standards & Conventions

## Popular Methodologies

### BEM (Block Element Modifier)

#### Structure
```css
/* Block */
.card {}

/* Element */
.card__title {}
.card__content {}
.card__footer {}

/* Modifier */
.card--featured {}
.card__title--large {}
```

#### Example Component
```html
<article class="card card--featured">
  <h2 class="card__title card__title--large">Title</h2>
  <div class="card__content">Content</div>
  <footer class="card__footer">
    <button class="card__button card__button--primary">Action</button>
  </footer>
</article>
```

### OOCSS (Object-Oriented CSS)

#### Separation of Structure and Skin
```css
/* Structure */
.btn {
  padding: 10px 20px;
  border-radius: 4px;
  display: inline-block;
}

/* Skin */
.btn-primary {
  background: blue;
  color: white;
}

.btn-secondary {
  background: gray;
  color: white;
}
```

#### Separation of Container and Content
```css
/* Bad - Content depends on container */
.sidebar h3 {
  font-size: 14px;
}

/* Good - Content is independent */
.widget-title {
  font-size: 14px;
}
```

### SMACSS (Scalable and Modular Architecture)

#### Categories
```css
/* 1. Base - Element defaults */
html, body { margin: 0; }
h1 { font-size: 2rem; }

/* 2. Layout - Major sections */
.l-header {}
.l-sidebar {}
.l-main {}

/* 3. Module - Reusable components */
.card {}
.navigation {}

/* 4. State - Stateful styles */
.is-active {}
.is-hidden {}
.is-loading {}

/* 5. Theme - Color schemes */
.theme-dark {}
.theme-light {}
```

### Atomic CSS (Utility-First)

#### Single-Purpose Classes
```css
/* Spacing */
.m-0 { margin: 0; }
.p-4 { padding: 1rem; }
.mt-2 { margin-top: 0.5rem; }

/* Typography */
.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.text-lg { font-size: 1.125rem; }

/* Layout */
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }
```

#### Usage Example
```html
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h3 class="text-lg font-bold">Title</h3>
  <button class="px-4 py-2 bg-blue-500 text-white rounded">Action</button>
</div>
```

### CSS Modules

#### Component Isolation
```css
/* Button.module.css */
.button {
  padding: 10px 20px;
  border-radius: 4px;
}

.primary {
  background: blue;
  color: white;
}

.large {
  padding: 15px 30px;
  font-size: 1.2rem;
}
```

#### JavaScript Import
```jsx
import styles from './Button.module.css';

<button className={`${styles.button} ${styles.primary}`}>
  Click Me
</button>
```

## Naming Conventions

### Common Patterns
```css
/* kebab-case (recommended) */
.my-component-name {}

/* camelCase */
.myComponentName {}

/* PascalCase */
.MyComponentName {}

/* snake_case */
.my_component_name {}
```

### Prefix Conventions
```css
/* JavaScript hooks */
.js-modal-trigger {}

/* State classes */
.is-active {}
.has-error {}
.can-edit {}

/* Utility classes */
.u-text-center {}
.u-hidden {}

/* Layout classes */
.l-container {}
.l-grid {}
```

## File Organization

### 7-1 Pattern
```
styles/
├── abstracts/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _buttons.scss
│   └── _cards.scss
├── layout/
│   ├── _header.scss
│   └── _footer.scss
├── pages/
│   ├── _home.scss
│   └── _about.scss
├── themes/
│   └── _dark.scss
├── vendors/
│   └── _bootstrap.scss
└── main.scss
```

### ITCSS (Inverted Triangle CSS)
```
styles/
├── settings/   # Variables
├── tools/      # Mixins, functions
├── generic/    # Reset, normalize
├── elements/   # HTML elements
├── objects/    # OOCSS patterns
├── components/ # UI components
├── utilities/  # Helper classes
```

## Best Practices

### Specificity Management
```css
/* Low specificity (good) */
.button {}
.button-primary {}

/* High specificity (avoid) */
div.container > ul.list > li.item > a.link {}

/* Use data attributes for state */
[data-state="active"] {}
[aria-expanded="true"] {}
```

### Progressive Enhancement
```css
/* Base styles */
.card {
  padding: 1rem;
  background: white;
}

/* Feature queries */
@supports (display: grid) {
  .card-grid {
    display: grid;
    gap: 1rem;
  }
}

/* Container queries */
@container (min-width: 400px) {
  .card {
    padding: 2rem;
  }
}
```

### Performance Considerations
```css
/* Avoid expensive selectors */
/* Bad */
[class*="btn"] {}
:nth-child(3n+1) {}

/* Good */
.btn {}
.third-item {}

/* Use CSS containment */
.widget {
  contain: layout style;
}
```

## Modern Standards

### Custom Properties Pattern
```css
.component {
  --component-padding: 1rem;
  --component-color: blue;

  padding: var(--component-padding);
  color: var(--component-color);
}

.component--large {
  --component-padding: 2rem;
}
```

### Logical Properties
```css
/* Old way */
.element {
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Modern way */
.element {
  margin-inline: auto;
  padding-inline: 1rem;
}
```

### Cascade Layers
```css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; }
}

@layer components {
  .button { padding: 1rem; }
}

@layer utilities {
  .mt-4 { margin-top: 1rem; }
}
```
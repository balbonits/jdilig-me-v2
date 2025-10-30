---
id: "css-display-position"
title: "CSS Display & Position - Definitions, Values & Usage"
slug: "css-display-position"
category: "ui-fundamentals"
description: "Complete guide to CSS display and position properties for layout and positioning control"
tags: ["css", "display", "position", "layout", "flexbox", "grid", "positioning"]
difficulty: "intermediate"
dateCreated: "2025-09-21"
lastUpdated: "2025-09-21"
---

# CSS Display & Position

## Display Property

### Basic Display Values

#### Block
```css
.block-element {
  display: block;
  /* Takes full width available */
  /* Starts on new line */
  /* Height/width can be set */
}

/* Default block elements: div, p, h1-h6, section, header, footer */
```

#### Inline
```css
.inline-element {
  display: inline;
  /* Takes only content width */
  /* Stays in line with text */
  /* Height/width ignored */
  /* Vertical padding/margin don't affect layout */
}

/* Default inline elements: span, a, strong, em, img */
```

#### Inline-Block
```css
.inline-block-element {
  display: inline-block;
  /* Best of both worlds */
  /* Stays in line */
  /* Respects width/height */
  /* Respects all padding/margin */
}
```

#### None
```css
.hidden {
  display: none;
  /* Removes from document flow */
  /* Not rendered at all */
  /* Screen readers ignore it */
}

/* Alternative for accessibility */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

### Flexbox Display

#### Flex Container
```css
.flex-container {
  display: flex;

  /* Direction */
  flex-direction: row; /* row | row-reverse | column | column-reverse */

  /* Wrapping */
  flex-wrap: wrap; /* nowrap | wrap | wrap-reverse */

  /* Main axis alignment */
  justify-content: space-between; /* flex-start | flex-end | center | space-around | space-evenly */

  /* Cross axis alignment */
  align-items: center; /* stretch | flex-start | flex-end | center | baseline */

  /* Multiple lines alignment */
  align-content: flex-start; /* stretch | flex-start | flex-end | center | space-between */

  /* Gap between items */
  gap: 1rem;
}
```

#### Flex Items
```css
.flex-item {
  /* Growth factor */
  flex-grow: 1;

  /* Shrink factor */
  flex-shrink: 1;

  /* Base size */
  flex-basis: 200px;

  /* Shorthand */
  flex: 1 1 200px;

  /* Individual alignment */
  align-self: flex-end;

  /* Order */
  order: -1;
}
```

### Grid Display

#### Grid Container
```css
.grid-container {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 1fr 200px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  /* Define rows */
  grid-template-rows: 100px auto 50px;

  /* Named areas */
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";

  /* Gaps */
  gap: 20px;
  column-gap: 20px;
  row-gap: 10px;

  /* Alignment */
  justify-items: start; /* start | end | center | stretch */
  align-items: center;
  justify-content: center;
  align-content: start;
}
```

#### Grid Items
```css
.grid-item {
  /* Placement */
  grid-column: 1 / 3;
  grid-row: 2 / 4;

  /* Named area */
  grid-area: header;

  /* Span */
  grid-column: span 2;

  /* Self alignment */
  justify-self: end;
  align-self: start;
}
```

### Modern Display Values

#### Contents
```css
.wrapper {
  display: contents;
  /* Element box disappears */
  /* Children act as direct children of parent */
}
```

#### Flow-Root
```css
.container {
  display: flow-root;
  /* Creates new block formatting context */
  /* Contains floats */
  /* Prevents margin collapse */
}
```

## Position Property

### Static (Default)
```css
.static {
  position: static;
  /* Normal document flow */
  /* top/right/bottom/left have no effect */
}
```

### Relative
```css
.relative {
  position: relative;
  top: 10px;
  left: 20px;
  /* Offset from normal position */
  /* Still occupies original space */
  /* Creates containing block for absolute children */
}
```

### Absolute
```css
.absolute {
  position: absolute;
  top: 0;
  right: 0;
  /* Removed from document flow */
  /* Positioned relative to nearest positioned ancestor */
  /* If no positioned ancestor, uses viewport */
}

/* Common pattern: Centered absolute */
.centered-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Fixed
```css
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* Positioned relative to viewport */
  /* Stays in place when scrolling */
  /* Removed from document flow */
}

/* Fixed header example */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
}
```

### Sticky
```css
.sticky {
  position: sticky;
  top: 20px;
  /* Hybrid of relative and fixed */
  /* Sticks when threshold is reached */
  /* Stays in document flow */
}

/* Sticky table headers */
thead th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}
```

## Z-Index & Stacking Context

### Z-Index Basics
```css
.element {
  position: relative; /* position required (not static) */
  z-index: 10;
}

/* Z-index scale system */
:root {
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

### Creating Stacking Context
```css
/* Ways to create new stacking context */
.stacking-context {
  /* Position + z-index */
  position: relative;
  z-index: 1;

  /* Or opacity less than 1 */
  opacity: 0.99;

  /* Or transform */
  transform: translateX(0);

  /* Or filter */
  filter: blur(0);

  /* Or isolation */
  isolation: isolate;
}
```

## Common Layout Patterns

### Modal Overlay
```css
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
  background: white;
  padding: 2rem;
  border-radius: 8px;
}
```

### Sticky Sidebar
```css
.sidebar {
  position: sticky;
  top: 80px; /* Below fixed header */
  height: calc(100vh - 100px);
  overflow-y: auto;
}
```

### Dropdown Menu
```css
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}
```

### Tooltip
```css
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
  padding: 8px;
  background: black;
  color: white;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1070;
}
```

### Card Overlay
```css
.card {
  position: relative;
  overflow: hidden;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}
```

## Performance Tips

### Layout Thrashing
```css
/* Avoid changing position in animations */
/* Bad */
@keyframes slide {
  to { left: 100px; }
}

/* Good - use transform instead */
@keyframes slide {
  to { transform: translateX(100px); }
}
```

### Containment
```css
.widget {
  contain: layout; /* Isolates layout calculations */
  position: relative;
}
```

### Will-Change
```css
.animated-element {
  will-change: transform;
  /* Hints browser for optimization */
  /* Remove when animation completes */
}
```
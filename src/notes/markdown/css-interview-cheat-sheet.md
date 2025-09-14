---
id: css-interview-cheat-sheet
slug: css-interview-cheat-sheet
title: CSS Interview Cheat Sheet
description: Complete CSS reference covering selectors, layouts, CSS3+ features, and common interview questions.
detailedDescription: Comprehensive CSS interview preparation guide covering selectors & specificity, modern layout systems (Flexbox, Grid), CSS3+ features, responsive design, and common interview scenarios with visual examples.
category: interview-prep
tags: [CSS, Interview, Selectors, Flexbox, Grid, CSS3, Responsive Design]
difficulty: intermediate
lastUpdated: 2025-01-10
searchKeywords: [css, selectors, flexbox, grid, specificity, responsive, css3, interview]
---

# CSS Interview Cheat Sheet

## 📚 Core Concepts

### Selectors & Specificity

#### CSS Box Model
```
┌─────────────────────────────────────┐
│              MARGIN                 │
├─────────┬─────────────────┬─────────┤
│         │     BORDER      │         │
│ MARGIN  ├─────────────────┤ MARGIN  │
│         │    PADDING     │         │
│         ├─────────────────┤         │
│         │    CONTENT     │         │
│         │               │         │
│         └─────────────────┘         │
└─────────────────────────────────────┘
```

#### Specificity Hierarchy
```
Inline styles:     1,0,0,0  (highest)
IDs:              0,1,0,0
Classes/Attrs:    0,0,1,0  
Elements:         0,0,0,1  (lowest)
```

### Selector Examples
```css
/* Element selector - 0,0,0,1 */
div { color: blue; }

/* Class selector - 0,0,1,0 */
.highlight { color: red; }

/* ID selector - 0,1,0,0 */
#header { color: green; }

/* Compound selectors add up */
div.highlight#header { color: purple; } /* 0,1,1,1 */

/* Pseudo-classes - 0,0,1,0 */
a:hover { color: orange; }

/* Attribute selectors - 0,0,1,0 */
input[type="email"] { border: 1px solid blue; }
```

### Advanced Selectors
```css
/* Child combinator */
ul > li { list-style: none; }

/* Adjacent sibling */
h1 + p { margin-top: 0; }

/* General sibling */
h1 ~ p { color: gray; }

/* Attribute selectors */
[class*="btn"] { padding: 8px; }     /* contains "btn" */
[class^="btn"] { border-radius: 4px; } /* starts with "btn" */
[class$="btn"] { cursor: pointer; }  /* ends with "btn" */

/* Pseudo-selectors */
:nth-child(2n+1) { background: #f0f0f0; } /* odd children */
:not(.hidden) { display: block; }
::before { content: "→"; }
```

## Layout Systems

### Flexbox Complete Guide
```css
/* Container properties */
.flex-container {
  display: flex;
  flex-direction: row | column | row-reverse | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  justify-content: flex-start | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | center | flex-end | baseline;
  align-content: stretch | flex-start | center | flex-end | space-between;
  gap: 1rem; /* Modern gap property */
}

/* Item properties */
.flex-item {
  flex: 1 0 auto; /* grow shrink basis */
  align-self: auto | flex-start | center | flex-end | stretch;
  order: 1; /* Change visual order */
}
```

#### Flexbox Layout Patterns

```
Row Layout (justify-content: space-between):
┌─────────────────────────────────────────────────┐
│ [Item 1]        [Item 2]        [Item 3]       │
└─────────────────────────────────────────────────┘

Column Layout (align-items: center):
┌──────────┐
│ [Item 1] │
│ [Item 2] │
│ [Item 3] │
└──────────┘

Flex Wrap:
┌─────────────────────────────┐
│ [1] [2] [3]                 │
│ [4] [5]                     │
└─────────────────────────────┘
```

### CSS Grid Complete Guide
```css
.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr 100px; /* Fixed Flex Fixed */
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header header"
    "sidebar content aside"
    "footer footer footer";
  gap: 1rem;
  
  /* Alternative syntax */
  grid-template: 
    "header header header" auto
    "sidebar content aside" 1fr
    "footer footer footer" auto
    / 200px 1fr 100px;
}

.grid-item {
  grid-area: content; /* Use named area */
  /* OR */
  grid-column: 2 / 4; /* Start line 2, end line 4 */
  grid-row: 1 / 3;
  
  /* Alignment */
  justify-self: start | center | end | stretch;
  align-self: start | center | end | stretch;
}
```

#### Grid Layout Visualization
```
┌─────────────────────────────────────┐
│              HEADER                 │
├─────────┬─────────────────┬─────────┤
│         │                 │         │
│ SIDEBAR │     CONTENT     │  ASIDE  │
│         │                 │         │
├─────────┴─────────────────┴─────────┤
│              FOOTER                 │
└─────────────────────────────────────┘
```

### Modern Layout Techniques
```css
/* Intrinsic layouts with CSS Grid */
.auto-fit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Container queries (modern browsers) */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

/* Subgrid (newer feature) */
.nested-grid {
  display: grid;
  grid-template-columns: subgrid;
}
```

## CSS3+ Modern Features

### Custom Properties (CSS Variables)
```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-base: 1rem;
  --spacing-unit: 8px;
}

.component {
  color: var(--primary-color);
  font-size: calc(var(--font-size-base) * 1.25);
  padding: calc(var(--spacing-unit) * 2);
  
  /* Fallback values */
  background: var(--undefined-var, #fallback);
}

/* Dynamic theming */
[data-theme="dark"] {
  --primary-color: #4dabf7;
  --background: #1a1a1a;
}
```

### Advanced Animations & Transitions
```css
/* Transition timing functions */
.smooth { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.bouncy { transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }

/* Keyframe animations */
@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated {
  animation: slideInUp 0.6s ease-out forwards;
  animation-fill-mode: both;
}

/* Modern motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Transform & Filter Effects
```css
.modern-effects {
  /* 3D transforms */
  transform: perspective(1000px) rotateX(45deg) rotateY(15deg);
  
  /* Filter effects */
  filter: blur(5px) brightness(1.2) contrast(1.1) saturate(1.3);
  backdrop-filter: blur(10px) saturate(1.5);
  
  /* Clip paths */
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
  
  /* Modern gradients */
  background: conic-gradient(from 90deg, red, yellow, lime, aqua, blue, magenta, red);
}
```

## Responsive Design

### Media Queries & Breakpoints
```css
/* Mobile-first approach */
.component { /* Mobile styles (320px+) */ }

@media (min-width: 768px) {
  .component { /* Tablet styles */ }
}

@media (min-width: 1024px) {
  .component { /* Desktop styles */ }
}

@media (min-width: 1440px) {
  .component { /* Large desktop */ }
}

/* Modern queries */
@media (orientation: landscape) { /* Landscape mode */ }
@media (hover: hover) { /* Devices with hover capability */ }
@media (prefers-color-scheme: dark) { /* System dark mode */ }
```

### Fluid Typography & Spacing
```css
/* Fluid typography using clamp() */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* min: 1.5rem, preferred: 4vw, max: 3rem */
}

/* Responsive spacing */
.container {
  padding: clamp(1rem, 5vw, 3rem);
  margin-block: clamp(2rem, 8vh, 6rem);
}

/* Aspect ratio (modern) */
.video-container {
  aspect-ratio: 16/9; /* Replaces padding-bottom hack */
}
```

### Container Queries (Modern)
```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 300px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## Performance & Optimization

### Critical CSS & Loading
```css
/* Above-the-fold critical styles */
.hero, .navigation, .header {
  /* Critical styles here */
}

/* Preload important fonts */
/* <link rel="preload" href="font.woff2" as="font" crossorigin> */

/* Font display strategies */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2');
  font-display: swap; /* or fallback, optional */
}
```

### CSS Optimization Techniques
```css
/* Use efficient selectors */
.button { } /* Good - single class */
.nav .menu .item a { } /* Avoid - too specific */

/* Minimize reflows/repaints */
.optimized {
  will-change: transform; /* Hint for animations */
  transform: translateZ(0); /* Create layer */
  contain: layout style paint; /* Containment */
}

/* Use logical properties */
.modern-spacing {
  margin-inline: auto; /* Left/right in LTR, right/left in RTL */
  padding-block: 1rem; /* Top/bottom */
  border-inline-start: 2px solid blue; /* Left border in LTR */
}
```

## Common Interview Questions

### Q1: What's the difference between `display: none` and `visibility: hidden`?
```css
/* Removes element from layout entirely */
.hidden { display: none; }

/* Hides element but keeps space in layout */
.invisible { visibility: hidden; }

/* Transparent but still interactive */
.transparent { opacity: 0; }
```

### Q2: Explain the CSS Box Model

```
Box Model Components:
┌─ margin ────────────────────────┐
│  ┌─ border ─────────────────┐   │
│  │  ┌─ padding ──────────┐  │   │
│  │  │                   │  │   │
│  │  │     CONTENT       │  │   │
│  │  │    width x height │  │   │
│  │  │                   │  │   │
│  │  └───────────────────┘  │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

```css
/* Box-sizing affects calculation */
.content-box { box-sizing: content-box; } /* Default: width = content only */
.border-box { box-sizing: border-box; }   /* width = content + padding + border */

/* Example calculation */
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid blue;
  margin: 10px;
  
  /* content-box: total width = 200 + 40 + 10 = 250px */
  /* border-box: total width = 200px (padding/border included) */
}
```

### Q3: Explain CSS positioning
```css
.static { position: static; }     /* Default, normal flow */
.relative { position: relative; } /* Offset from normal position */
.absolute { position: absolute; } /* Relative to positioned ancestor */
.fixed { position: fixed; }       /* Relative to viewport */
.sticky { position: sticky; }     /* Hybrid relative/fixed */
```

### Q4: How do you center elements?
```css
/* Flexbox centering (modern) */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid centering */
.grid-center {
  display: grid;
  place-items: center;
}

/* Block element centering */
.block-center {
  margin: 0 auto;
  max-width: 600px;
}

/* Absolute centering */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Q5: What are CSS methodologies?
```css
/* BEM (Block Element Modifier) */
.card { }              /* Block */
.card__title { }       /* Element */
.card__title--large { } /* Modifier */

/* OOCSS principles */
.btn { /* Structure */ }
.btn-primary { /* Skin */ }

/* Atomic CSS */
.m-4 { margin: 1rem; }
.text-center { text-align: center; }
```

## Browser Compatibility & Debugging

### Feature Detection
```css
/* Feature queries */
@supports (display: grid) {
  .layout { display: grid; }
}

@supports not (display: grid) {
  .layout { display: flex; }
}

/* Vendor prefixes (automated by tools) */
.gradient {
  background: -webkit-linear-gradient(red, blue);
  background: linear-gradient(red, blue);
}
```

### Debugging Tools
```css
/* Debug borders */
* { outline: 1px solid red; }

/* Debug grid */
.grid-debug {
  background-image: 
    linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## Quick Reference

### Must-Know Properties
- `display`: block, inline, flex, grid, none
- `position`: static, relative, absolute, fixed, sticky  
- `box-sizing`: content-box, border-box
- `overflow`: visible, hidden, scroll, auto
- `z-index`: stacking context control

### Modern CSS Features
- ✅ Custom properties (CSS variables)
- ✅ Flexbox & Grid
- ✅ `clamp()`, `min()`, `max()`
- ✅ Container queries
- ✅ Logical properties
- ✅ `aspect-ratio`
- ✅ `:has()` selector (newer)

### Performance Tips
- Use CSS containment for complex layouts
- Prefer transforms over changing layout properties
- Use `will-change` sparingly for animations
- Minimize CSS bundle size
- Use efficient selectors

## 💡 Quick Tips

### Interview Success Tips
- **Know the Box Model**: Content → Padding → Border → Margin
- **Master Flexbox vs Grid**: Flexbox for 1D, Grid for 2D layouts
- **Understand Specificity**: Calculate specificity weights accurately
- **Practice Centering**: Know multiple centering techniques
- **CSS Variables**: Show knowledge of modern CSS features

### Performance Mindset
- **Mobile-First**: Always design for mobile, enhance for desktop
- **Critical CSS**: Inline above-the-fold styles
- **Lazy Loading**: Use modern loading techniques
- **Browser Support**: Know when to use fallbacks

### Modern CSS Approach
- **Logical Properties**: Use `margin-inline` instead of `margin-left/right`
- **Container Queries**: Better than media queries for component-based design
- **Custom Properties**: Enable dynamic theming
- **Feature Queries**: Progressive enhancement with `@supports`

## ⚠️ Common Gotchas

### Layout Traps
- **Flexbox**: `justify-content` = main axis, `align-items` = cross axis
- **Grid**: `grid-template-areas` names must be valid CSS identifiers
- **Position Sticky**: Requires a scroll container and threshold value
- **Z-index**: Only works on positioned elements

### Specificity Issues
- **!important**: Avoid unless absolutely necessary
- **Inline styles**: Override almost everything (specificity 1000)
- **ID selectors**: Very high specificity (100) - use sparingly
- **CSS-in-JS**: Often generates high-specificity selectors

### Browser Compatibility
- **CSS Grid**: IE11 has older grid syntax
- **Container queries**: Very modern - check support
- **`:has()` selector**: Limited browser support (2023+)
- **Logical properties**: Good support but check for older browsers

### Performance Pitfalls
- **Will-change**: Remove after animation completes
- **Transform vs Position**: transforms are GPU-accelerated
- **Reflow triggers**: Avoid changing width/height in animations
- **Overly specific selectors**: Impact CSS parsing performance

### Common Mistakes
- **Box-sizing**: Forgetting to set `border-box` globally
- **Margin collapse**: Vertical margins collapse between block elements
- **Float clearfix**: Modern layouts rarely need floats
- **Viewport units on mobile**: iOS Safari viewport unit issues
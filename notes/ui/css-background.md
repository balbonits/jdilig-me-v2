---
id: "css-background"
title: "CSS Background - Everything You Need to Know"
slug: "css-background"
category: "ui-fundamentals"
description: "Complete guide to CSS background properties, from basic colors to advanced techniques with gradients and multiple backgrounds"
tags: ["css", "background", "gradients", "images", "design", "visual-effects"]
difficulty: "intermediate"
dateCreated: "2025-09-21"
lastUpdated: "2025-09-21"
---

# CSS Background - Everything You Need to Know

## Basic Background Properties

### Background Color
```css
.element {
  /* Named colors */
  background-color: red;

  /* Hex values */
  background-color: #ff5733;

  /* RGB/RGBA */
  background-color: rgb(255, 87, 51);
  background-color: rgba(255, 87, 51, 0.8);

  /* HSL/HSLA */
  background-color: hsl(9, 100%, 60%);
  background-color: hsla(9, 100%, 60%, 0.8);

  /* CSS Variables */
  background-color: var(--primary-color);
}
```

### Background Image
```css
.element {
  /* Single image */
  background-image: url('image.jpg');

  /* Multiple images (layered) */
  background-image: url('top-layer.png'), url('bottom-layer.jpg');

  /* With gradients */
  background-image:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('hero.jpg');
}
```

### Background Size
```css
.element {
  /* Keyword values */
  background-size: cover;    /* Scales to cover entire container */
  background-size: contain;  /* Scales to fit within container */
  background-size: auto;     /* Default size */

  /* Specific dimensions */
  background-size: 200px 100px;
  background-size: 50% 50%;

  /* Single value (width, height auto) */
  background-size: 200px;
  background-size: 50%;
}
```

### Background Position
```css
.element {
  /* Keywords */
  background-position: center;
  background-position: top left;
  background-position: bottom right;

  /* Percentages */
  background-position: 50% 50%;

  /* Specific values */
  background-position: 20px 30px;

  /* Offset from edges */
  background-position: right 20px bottom 10px;

  /* Multiple positions for multiple backgrounds */
  background-position: left top, center center;
}
```

### Background Repeat
```css
.element {
  /* Repeat patterns */
  background-repeat: repeat;      /* Default - repeats both directions */
  background-repeat: repeat-x;    /* Horizontal repeat only */
  background-repeat: repeat-y;    /* Vertical repeat only */
  background-repeat: no-repeat;   /* No repetition */

  /* New values */
  background-repeat: space;       /* Evenly spaces repetitions */
  background-repeat: round;       /* Scales to fit exact number */
}
```

### Background Attachment
```css
.element {
  /* Scroll behavior */
  background-attachment: scroll;  /* Default - scrolls with content */
  background-attachment: fixed;   /* Fixed to viewport */
  background-attachment: local;   /* Scrolls with element's content */
}

/* Parallax effect */
.parallax {
  background-image: url('bg.jpg');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  height: 100vh;
}
```

### Background Origin & Clip
```css
.element {
  /* Origin - where background positioning starts */
  background-origin: padding-box;  /* Default */
  background-origin: border-box;
  background-origin: content-box;

  /* Clip - where background is painted */
  background-clip: border-box;     /* Default */
  background-clip: padding-box;
  background-clip: content-box;
  background-clip: text;           /* Experimental - text fill */
}

/* Text fill effect */
.text-fill {
  background-image: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

## Gradients

### Linear Gradients
```css
.element {
  /* Basic gradient */
  background: linear-gradient(to right, red, blue);

  /* With angle */
  background: linear-gradient(45deg, red, blue);

  /* Multiple color stops */
  background: linear-gradient(to right, red 0%, yellow 50%, blue 100%);

  /* Sharp transitions */
  background: linear-gradient(to right, red 50%, blue 50%);

  /* Repeating gradient */
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #ccc 10px,
    #ccc 20px
  );
}
```

### Radial Gradients
```css
.element {
  /* Basic radial */
  background: radial-gradient(circle, red, blue);

  /* Ellipse (default) */
  background: radial-gradient(ellipse, red, blue);

  /* Positioned gradient */
  background: radial-gradient(circle at top left, red, blue);

  /* Sized gradient */
  background: radial-gradient(100px 50px at center, red, blue);

  /* Multiple stops */
  background: radial-gradient(
    circle at center,
    yellow 0%,
    orange 25%,
    red 50%,
    purple 75%,
    blue 100%
  );
}
```

### Conic Gradients
```css
.element {
  /* Basic conic (pie chart effect) */
  background: conic-gradient(red, yellow, green, blue, red);

  /* With angles */
  background: conic-gradient(from 45deg, red, blue);

  /* Pie chart */
  background: conic-gradient(
    red 0deg 90deg,
    blue 90deg 180deg,
    green 180deg 270deg,
    yellow 270deg 360deg
  );

  /* Repeating conic */
  background: repeating-conic-gradient(
    from 0deg,
    red 0deg 30deg,
    blue 30deg 60deg
  );
}
```

## Advanced Patterns

### Hero Section with Overlay
```css
.hero {
  background:
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.7)
    ),
    url('hero-image.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
}
```

### Animated Gradient
```css
.animated-gradient {
  background: linear-gradient(
    -45deg,
    #ee7752,
    #e73c7e,
    #23a6d5,
    #23d5ab
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### Mesh Gradient
```css
.mesh-gradient {
  background:
    radial-gradient(at 20% 80%, #ff6b6b 0%, transparent 50%),
    radial-gradient(at 80% 20%, #4ecdc4 0%, transparent 50%),
    radial-gradient(at 40% 40%, #45b7d1 0%, transparent 50%),
    radial-gradient(at 80% 80%, #96ceb4 0%, transparent 50%);
  background-size: 100% 100%;
}
```

### Pattern Background
```css
/* Dots pattern */
.dots {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Stripes */
.stripes {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0,0,0,0.1) 10px,
    rgba(0,0,0,0.1) 20px
  );
}

/* Grid */
.grid {
  background-image:
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### Multiple Backgrounds
```css
.layered {
  background:
    url('decoration.png') no-repeat top right,
    url('pattern.png') repeat-x bottom,
    linear-gradient(to bottom, #f0f0f0, #ffffff);
  background-size:
    100px 100px,
    auto,
    cover;
  background-position:
    top 20px right 20px,
    bottom,
    center;
}
```

## Performance Considerations

### Optimized Background Images
```css
.optimized {
  /* Use modern formats */
  background-image:
    url('image.webp'),
    url('image.jpg'); /* Fallback */

  /* Lazy loading for below-fold images */
  content-visibility: auto;

  /* Prevent repaints */
  will-change: background-position;
}
```

### CSS-Only Patterns
```css
/* Checkerboard - Pure CSS */
.checkerboard {
  background:
    linear-gradient(45deg, #eee 25%, transparent 25%),
    linear-gradient(-45deg, #eee 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #eee 75%),
    linear-gradient(-45deg, transparent 75%, #eee 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
```

## Responsive Backgrounds

### Art Direction
```css
.responsive-bg {
  /* Mobile */
  background-image: url('mobile-bg.jpg');

  /* Tablet */
  @media (min-width: 768px) {
    background-image: url('tablet-bg.jpg');
  }

  /* Desktop */
  @media (min-width: 1024px) {
    background-image: url('desktop-bg.jpg');
  }
}
```

### CSS Variables for Themes
```css
:root {
  --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --bg-secondary: #f7f8fc;
}

[data-theme="dark"] {
  --bg-primary: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  --bg-secondary: #1a1a2e;
}

.themed {
  background: var(--bg-primary);
}
```
---
id: "css-animations-transitions"
title: "CSS Animations & Transitions: Everything You Need to Know"
slug: "css-animations-transitions"
category: "ui-fundamentals"
description: "Master CSS animations and transitions for smooth, performant web interactions and visual effects"
tags: ["css", "animations", "transitions", "keyframes", "performance", "ux", "motion"]
difficulty: "intermediate"
dateCreated: "2025-09-21"
lastUpdated: "2025-09-21"
---

# CSS Animations & Transitions

## Understanding Motion in CSS

**Transitions vs Animations**:
- **Transitions**: Smooth change between two states (hover, focus, class change). Perfect for micro-interactions.
- **Animations**: Complex, multi-step sequences that can loop and reverse. Ideal for attention-grabbing effects.

**Performance Impact**: Motion should enhance, not hinder. Stick to GPU-accelerated properties (transform, opacity) for 60fps smoothness.

## Transitions

### Basic Transition Syntax

**What it does**: Smoothly animates property changes over time instead of instant jumps.

**Why use it**: Creates polished, professional interfaces. Users perceive smooth transitions as higher quality.

**How it works**:
1. Browser detects property change (hover, class addition, etc.)
2. Calculates intermediate values between start and end states
3. Updates property gradually over specified duration
```css
.element {
  /* Shorthand: property duration timing-function delay */
  transition: opacity 0.3s ease-in-out 0s;

  /* Individual properties */
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;

  /* Multiple properties */
  transition: opacity 0.3s, transform 0.5s;

  /* All properties */
  transition: all 0.3s ease;
}
```

### Transition Properties

**What it does**: Controls which properties animate, how long, and with what easing.

**Why use it**: Different properties need different speeds. Color changes feel good at 0.3s, transforms at 0.2s.

**How it works**:
1. Define initial state with base styles
2. Set up transition rules
3. Define end state (hover, active, class)
4. Browser interpolates between states

```css
.button {
  /* Initial state */
  background: #3498db;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  /* Transition setup - notice different durations */
  transition:
    background 0.3s ease,      /* Slower for color perception */
    transform 0.2s ease,       /* Snappy for movement */
    box-shadow 0.2s ease;      /* Match transform for cohesion */
}

.button:hover {
  /* End state */
  background: #2980b9;           /* Darker shade */
  transform: translateY(-2px);   /* Subtle lift */
  box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* Enhanced shadow */
}
```

**Common pitfall**: Using `transition: all` - it's slower and can animate unexpected properties.

**Real-world example**: This exact pattern is used in Material Design buttons, GitHub's UI, and Stripe's checkout.

### Timing Functions

**What it does**: Controls acceleration and deceleration during transitions, mimicking real-world physics.

**Why use it**: Linear motion looks robotic. Easing makes animations feel natural and responsive.

**How each works**:

```css
.timing-examples {
  /* LINEAR - Constant speed */
  transition-timing-function: linear;
  /* Use case: Progress bars, continuous rotations */
  /* Feels: Mechanical, precise */

  /* EASE (default) - Slow start/end, fast middle */
  transition-timing-function: ease;
  /* Use case: General transitions, safe default */
  /* Feels: Natural, smooth */

  /* EASE-IN - Slow start, accelerates */
  transition-timing-function: ease-in;
  /* Use case: Elements leaving screen */
  /* Feels: Building momentum */

  /* EASE-OUT - Fast start, decelerates */
  transition-timing-function: ease-out;
  /* Use case: Elements entering screen */
  /* Feels: Coming to rest naturally */

  /* EASE-IN-OUT - Slow both ends */
  transition-timing-function: ease-in-out;
  /* Use case: Looping animations, modals */
  /* Feels: Gentle, considered */

  /* STEPS - Discrete jumps */
  transition-timing-function: steps(4, jump-start);
  /* Use case: Sprite animations, typewriter effect */
  /* Feels: Retro, digital */

  /* CUBIC BEZIER - Custom curves */
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  /* This creates "overshoot" - element goes past target then settles */
  /* Use case: Playful interfaces, attention-grabbing */
  /* Tool: cubic-bezier.com for visual editing */
}
```

**Pro tip**: Use ease-out for entering elements (feels responsive) and ease-in for exiting (feels intentional).

### Advanced Transition Patterns

**Staggered Transitions**

**What it does**: Animates multiple elements in sequence, creating a cascade effect.

**Why use it**: Draws attention to content hierarchy, makes multiple elements less overwhelming.

**How it works**: Each element has an incremental delay, creating a wave-like appearance.

```css
/* Initial hidden state */
.card {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

/* Stagger delays - creates cascade */
.card:nth-child(1) { transition-delay: 0.1s; }
.card:nth-child(2) { transition-delay: 0.2s; }
.card:nth-child(3) { transition-delay: 0.3s; }

/* For dynamic lists, use CSS custom properties */
.card {
  transition-delay: calc(var(--index) * 0.1s);
}

/* Trigger: Add class to parent */
.cards-visible .card {
  opacity: 1;
  transform: translateY(0);
}
```

**Common pitfall**: Too much delay makes interface feel sluggish. Keep total animation under 1 second.

**Real-world example**: Google Material Design cards, Stripe's pricing page, Medium's article listings.

## Animations

### Keyframes Definition
```css
/* Basic keyframes */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Percentage-based keyframes */
@keyframes slide-bounce {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(100px);
  }
  50% {
    transform: translateX(100px) translateY(-20px);
  }
  75% {
    transform: translateX(100px) translateY(0);
  }
  100% {
    transform: translateX(0);
  }
}
```

### Animation Properties
```css
.animated-element {
  /* Shorthand */
  animation: slide-bounce 2s ease-in-out infinite alternate;

  /* Individual properties */
  animation-name: slide-bounce;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.5s;
  animation-iteration-count: infinite; /* or number */
  animation-direction: alternate; /* normal | reverse | alternate | alternate-reverse */
  animation-fill-mode: forwards; /* none | forwards | backwards | both */
  animation-play-state: running; /* running | paused */
}
```

### Multiple Animations
```css
.multi-animated {
  animation:
    rotate 2s linear infinite,
    pulse 1s ease-in-out infinite,
    float 3s ease-in-out infinite;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  50% { transform: scale(1.1); }
}

@keyframes float {
  50% { transform: translateY(-10px); }
}
```

## Common Animation Patterns

### Loading Spinner
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Pulse Effect
```css
.pulse {
  animation: pulse-effect 2s infinite;
}

@keyframes pulse-effect {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(52, 152, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
}
```

### Typing Effect
```css
.typing {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid;
  animation:
    typing 3.5s steps(40, end),
    blink 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}
```

### Skeleton Loading
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Bounce Animation
```css
.bounce {
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
```

## Performance Optimization

### Hardware Acceleration

**What it does**: Offloads animations to GPU, achieving 60fps even on complex animations.

**Why it matters**: Janky animations frustrate users and make apps feel broken. GPU acceleration = smooth motion.

**How it works**:
- GPU handles: `transform`, `opacity`, `filter`
- CPU handles: `width`, `height`, `top`, `left`, `margin`, `padding`
- GPU creates compositor layers for animated elements

```css
/* ✅ GOOD - GPU accelerated properties */
.performant {
  transform: translateX(100px);  /* Position via transform */
  opacity: 0.5;                  /* Transparency */
  filter: blur(5px);             /* Visual effects */
  /* These run at 60fps without affecting other elements */
}

/* ❌ AVOID - Triggers expensive layout/paint */
.expensive {
  left: 100px;     /* Forces layout recalculation */
  width: 200px;    /* All elements must reflow */
  height: 100px;   /* Entire page might repaint */
  /* These cause "layout thrashing" - major performance hit */
}

/* Real example: Sliding panel */
/* ❌ Bad - animates 'left' property */
.panel-slow {
  position: absolute;
  left: -300px;
  transition: left 0.3s;
}
.panel-slow.open {
  left: 0;
}

/* ✅ Good - animates 'transform' */
.panel-fast {
  transform: translateX(-300px);
  transition: transform 0.3s;
}
.panel-fast.open {
  transform: translateX(0);
}
```

**Common pitfall**: Animating `width`/`height` for accordions. Use `max-height` or `scale` transform instead.

**Performance test**: Chrome DevTools > Rendering tab > Enable "Paint flashing" to see what's repainting.

### Will-Change Property
```css
.will-animate {
  will-change: transform, opacity;
}

/* Remove after animation */
.animation-done {
  will-change: auto;
}
```

### Reducing Paint Areas
```css
.animated-card {
  /* Isolate paint area */
  contain: layout style paint;

  /* Create layer */
  transform: translateZ(0);

  /* Or */
  will-change: transform;
}
```

## Interactive Examples

### Hover Card Flip
```css
.flip-card {
  width: 300px;
  height: 200px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
```

### Morphing Button
```css
.morph-button {
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.morph-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.morph-button:hover::before {
  width: 300px;
  height: 300px;
}
```

### Animated Gradient Background
```css
.gradient-bg {
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

## Animation State Management

### Play/Pause Control
```css
.video-animation {
  animation: rotate 2s linear infinite;
  animation-play-state: paused;
}

.playing .video-animation {
  animation-play-state: running;
}
```

### Animation Events in CSS
```css
/* Using animation-fill-mode */
.slide-in {
  opacity: 0;
  transform: translateX(-100%);
  animation: slide-in 0.5s forwards;
}

@keyframes slide-in {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

## Accessibility Considerations

### Respecting User Preferences

**What it does**: Detects if users have requested reduced motion in their OS settings.

**Why it matters**: Motion can trigger vestibular disorders, migraines, and motion sickness. It's not just preference - it's accessibility.

**How to implement**: Provide alternatives, not just removal. Replace motion with fades or instant changes.

```css
/* Method 1: Nuclear option - remove all motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Method 2: Better - provide alternatives */
.card {
  animation: slideUp 0.5s ease;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    animation: fadeIn 0.2s ease; /* Gentler alternative */
  }
}

/* Method 3: Best - design with preference in mind */
.animated-element {
  /* Default: subtle motion */
  transform: scale(1);
  transition: transform 0.2s ease;
}

.animated-element:hover {
  transform: scale(1.05); /* Small, purposeful */
}

@media (prefers-reduced-motion: no-preference) {
  /* Enhance for those who want motion */
  .animated-element {
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .animated-element:hover {
    transform: scale(1.1) rotate(5deg);
  }
}
```

**Testing**:
- macOS: System Preferences > Accessibility > Display > Reduce motion
- Windows: Settings > Ease of Access > Display > Show animations
- Chrome DevTools: Rendering tab > Emulate CSS media feature prefers-reduced-motion

**Real-world impact**: iOS automatically reduces parallax and animations when enabled. Major sites like GitHub respect this setting.

### Focus Indicators
```css
.interactive:focus-visible {
  outline: none;
  animation: focus-pulse 1s ease;
}

@keyframes focus-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  100% {
    box-shadow: 0 0 0 8px rgba(52, 152, 219, 0);
  }
}
```
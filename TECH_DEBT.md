## [2025-08-23] Debugging Best Practices: HMR Infinite Refresh
**⚠️ Critical Learning: Next.js HMR + Complex TypeScript Imports**

### **Symptoms to Watch For**
- Development server infinite refresh loops
- Continuous `Fast Refresh had to perform a full reload` warnings
- Webpack hot-update JSON 404 errors repeating endlessly
- Dev server becomes unusable, constant page reloading

### **Root Cause Pattern**
- **Direct TypeScript module imports** in data layer files (`src/data/`) containing complex objects
- **Multiple TS imports** trigger webpack Hot Module Replacement conflicts
- **Not the data content** - the import mechanism itself causes issues

### **Debug Methodology**
1. **Isolate systematically**: Disable imports one by one to identify the trigger
2. **Monitor webpack output**: Look for HMR warnings as early indicators
3. **Question assumptions**: Data malformation is rarely the cause
4. **Test incremental changes**: Single imports may work, multiple may fail

### **Solution Pattern**
```typescript
// ❌ CAUSES INFINITE REFRESH
import personalWebsiteV2 from '../../projects/personal-website-v2/personal-website-v2';
import geminiCliDemo from '../../projects/gemini-cli-demo/gemini-cli-demo';

// ✅ STABLE SOLUTION  
import projectsJsonData from '../../public/projects.json';
```

### **Architecture Principle**
- **Source of truth**: Keep TypeScript modules in `./projects/` for maintainability
- **Runtime imports**: Use stable JSON files for actual application imports
- **Build pipeline**: Copy/transform TS → JSON at build time, never directly import TS in data layer

### **Prevention Checklist**
- [ ] Use existing build scripts for data transformation
- [ ] Import from `/public/*.json` instead of direct TS modules
- [ ] Test with multiple data items, not just single additions
- [ ] Monitor HMR output during development for early warning signs

**Lesson**: Our build pipeline design was correct from the start - this incident validates the architecture.

---

## [2025-08-12] E2E Playwright Test Policy
- E2E Playwright test failures (including visual snapshot mismatches) are now build-blocking.
- Playwright snapshot maintenance is a required part of the commit workflow.
- This helps catch UI/data issues before they reach production.
# August 2025
- Favicon and app icon implementation and E2E test coverage added. No tech debt for favicon system.
# [2025-08-12] (continued)
- [x] E2E Playwright spec files are now organized by page/component (no more monolithic specs)
- [x] Utilities and Exercises pages now include SEOHead for correct titles/meta (fixes E2E failures)
- E2E (Playwright) tests are commit-essential: all must pass before commit, not just before deploy. This ensures UI/UX and accessibility regressions are never committed.
# [2025-08-12]
- Consider further modularizing utility and exercise showcase components for maintainability.
- Add/expand E2E Playwright coverage for new modal interactions and usage example flows.
- Review UI/UX polish for modal transitions and accessibility (focus trap, ARIA live regions).
# Technical Debt & Refactoring Roadmap

## 📋 Quick Summary & Checklist

### 🔴 High Priority
- [x] **Complete PWA Implementation** - COMPLETED ✅
- [x] **Google Analytics Integration** - COMPLETED ✅
- [x] **Advanced Testing Enhancement** - COMPLETED ✅ (Enterprise-grade Jest + Playwright with mocks, spies, fixtures, and network interception)
- [ ] **Site Design Enhancement** - Visual polish for recruiters
- [x] **AboutContent Modularization** - COMPLETED ✅
- [ ] **Code Showcase Search** - Filter by concepts/tags
- [ ] **AI Development Journey Page** - Feature page documenting the dev journey of building the site using AI

### 🟡 Medium Priority  
- [ ] **My Notes Feature** - Developer insights blog
- [ ] **Mobile Playwright Testing** - Touch, navigation, PWA
- [ ] **Enhanced Animations** - Page entry, cards, transitions
- [ ] **Advanced Theme System** - Customizable theme engine with user-defined themes

### 🟢 Low Priority
- [ ] **Performance Optimization** - Bundle splitting, lazy loading
- [ ] **Design System Migration** - Atomic components, tokens  
- [ ] **Component Library** - Standalone package
- [ ] **Markdown Renderer** - Add site-wide markdown parsing for all large text/content to properly render **bold**, *italic*, `code`, and other markdown syntax

---

## Overview
This document tracks technical debt and planned refactoring work to maintain code quality and consistency across the project.

## Recently Completed ✅

### August 2025 - PWA Implementation & Testing Improvements
- [x] **Complete PWA Implementation** - Comprehensive Progressive Web App functionality
  - **Enhanced Manifest**: App shortcuts (Projects, Code, About, Resume), comprehensive metadata, installable app configuration
  - **Custom Install Prompt**: Professional bottom-banner UI with 24-hour dismissal logic, auto-detection of installed state
  - **Advanced Service Worker**: Multiple caching strategies (cache-first for assets, network-first for HTML, stale-while-revalidate for dynamic content)
  - **Comprehensive Offline Experience**: Professional offline.html page with connection retry, cached content navigation, auto-reconnection detection
  - **Cache Management**: Versioned cache buckets (static, dynamic, offline), automatic cleanup, graceful degradation
  - **Fallback Handling**: Placeholder images for offline content, empty arrays for failed API requests, proper error boundaries
  - **Technical Benefits**: Modern PWA patterns for demonstrating web development expertise, production-ready implementation

- [x] **Advanced Testing Enhancement** - Enterprise-grade testing infrastructure demonstrating Fortune 500-level development practices
  - **Jest Testing Suite**: 249 tests across 18 suites with advanced test utilities framework (280+ lines of reusable infrastructure)
  - **Playwright E2E Testing**: 160+ scenarios across 5 browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
  - **Custom Testing Utilities**: Mock factories, spy utilities, data generators, custom assertions for comprehensive testing
  - **Performance Testing**: Core Web Vitals validation, memory leak detection, network throttling, caching validation
  - **Accessibility Testing**: WCAG 2.1 AA compliance, screen reader simulation, keyboard navigation testing
  - **Professional Benefits**: Demonstrates senior/lead engineer testing expertise, enterprise readiness for high-stakes development environments

### August 2025 - Testing & Design System Improvements  
- [x] Migrate project JSON files in /projects to TypeScript modules for type safety and consistency (see CLAUDE.md and README.md for pattern)
- [ ] **Code Showcase Search Feature**: Implement search functionality using the existing `concepts` array as tags. Users can search/filter exercises and utilities by programming concepts like "Arrays", "Hash Maps", "Performance", etc. This leverages the existing metadata structure without requiring additional data modeling.

### Previously Completed 

## Medium Priority 🟡

### 1. My Notes Feature for Code Page
**Status**: Planning
**Priority**: Medium

**Description**: Add "My Notes" section to the Code page - a collection of learnings, thoughts, and general ideas & experiences as a developer. This will showcase personal insights on:
- Learning React & front-end development journey
- Personal conventions, standards, and syntax preferences
- Development philosophy and best practices
- Code patterns and architectural decisions
- Lessons learned from real projects

**Implementation Ideas**:
- Create a new section alongside Exercises and Utilities
- Use Markdown files for easy content authoring
- Include categories like "React Patterns", "Code Standards", "Learning Journey", "Best Practices"
- Add timestamps and tags for organization
- Consider a blog-like layout with preview cards
- Enable search/filter by topic or date

**Benefits**:
- Shows personality and thought process as a developer
- Demonstrates continuous learning mindset
- Provides value to other developers
- Makes the portfolio more personal and engaging

### 2. Comprehensive Mobile Playwright Testing
**Status**: Partially Implemented
**Priority**: Medium

**Current State**: Basic mobile viewports configured (Pixel 5, iPhone 12) with minimal mobile-specific tests

**Missing Coverage**:
- **Mobile Navigation**: Hamburger menu, mobile sidebar, touch interactions
- **Touch Gestures**: Swipe, pinch, tap, long-press behaviors
- **Mobile-Specific Components**: ContactSection mobile layout, card stacking on mobile
- **Accessibility on Mobile**: Screen reader testing, voice control, mobile-specific ARIA
- **Performance**: Mobile-specific Core Web Vitals, slow network simulation
- **PWA Features**: Install prompt, offline behavior, app shortcuts on mobile

**Implementation Plan**:
- Expand existing mobile tests with comprehensive scenarios
- Add mobile-specific interaction patterns (touch, gestures)
- Create mobile accessibility test suite
- Add mobile performance benchmarks
- Test PWA installation and offline functionality

**Benefits**:
- Catches mobile-specific regressions before deployment
- Ensures consistent experience across all device types
- Validates mobile accessibility compliance
- Professional-grade mobile testing demonstrates quality standards

### 3. Enhanced Animations & Micro-interactions
**Status**: Basic Implementation
**Priority**: Medium

**Current State**: Basic hover effects and transitions exist (card hover, mobile menu slide-in, button states)

**Enhancement Opportunities**:
- **Page Entry Animations**: Smooth fade-in with translateY for initial page load (high impact)
- **Staggered Card Reveals**: Sequential animation delays for card grids (professional polish)
- **Enhanced Theme Transitions**: Smooth color transitions across all elements during theme switching
- **Code Showcase Interactions**: Copy button success feedback, solution tab sliding, syntax highlighting animations
- **Micro-interactions**: Button ripple effects, form focus animations, scroll progress indicators

**Implementation Priority**:
1. **High Impact**: Page entry animations and staggered card reveals
2. **Professional Polish**: Enhanced theme transitions and code showcase interactions
3. **Delight Factor**: Micro-interactions and advanced effects

**Technical Approach**:
```css
/* Page entry animation */
@keyframes pageEntry {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Staggered cards */
.card:nth-child(n) { animation-delay: calc(0.1s * var(--index)); }

/* Enhanced theme transitions */
* { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
```

**Benefits**:
- **Professional Appeal**: Smooth animations demonstrate attention to detail for recruiters
- **User Experience**: Improved perceived performance and engagement
- **Modern Feel**: Brings site up to current design standards
- **Differentiation**: Sets portfolio apart from static competitors

## High Priority 🔴

### 1. Complete PWA Implementation
**Status**: Partially Implemented  
**Priority**: High

**Current State**: Basic service worker and manifest exist, but incomplete PWA experience

**Missing Critical Features**:
- **Enhanced Manifest**: Complete metadata, app shortcuts, proper theming
- **Install Prompts**: beforeinstallprompt handling and custom install UI
- **Offline Experience**: Comprehensive offline pages and functionality
- **App Shortcuts**: Quick navigation to Projects, Code, Resume
- **Advanced Caching**: Sophisticated cache strategies for different content types

**Implementation Tasks**:
```json
// Enhanced manifest with shortcuts
{
  "name": "John Dilig - Web Developer Portfolio",
  "shortcuts": [
    {"name": "Projects", "url": "/projects"},
    {"name": "Code Showcase", "url": "/code"},
    {"name": "Resume", "url": "/about"}
  ]
}
```

**Benefits**:
- **Professional Appeal**: Modern app-like experience impresses recruiters
- **User Engagement**: Install prompt increases return visits
- **Offline Access**: Portfolio accessible without internet (crucial for demos)
- **Performance**: Advanced caching improves loading times
- **Competitive Edge**: Most portfolio sites lack proper PWA implementation

### ✅ 2. Google Analytics Integration for Performance Metrics **[COMPLETED]**
**Status**: Comprehensive analytics implementation completed with professional-grade tracking system

**Completed Implementation**:
- ✅ **Google Analytics 4 (GA4)**: Official Next.js integration with TypeScript definitions
- ✅ **Vercel Analytics**: Dual analytics platform for comprehensive insights
- ✅ **Core Web Vitals tracking**: Automatic LCP, FID, CLS, FCP, TTFB monitoring
- ✅ **Custom events**: Complete code showcase interaction tracking (views, clicks, copies)
- ✅ **Privacy compliance**: Production-only tracking with environment gating
- ✅ **Performance optimized**: Zero impact on Core Web Vitals, deferred loading
- ✅ **Professional architecture**: Custom hooks, proper error handling, type safety

**Files implemented**:
- ✅ `src/pages/_app.tsx` - GA4 + Vercel Analytics + Core Web Vitals reporting
- ✅ `src/hooks/useAnalytics.ts` - Comprehensive tracking hook with all event types
- ✅ `src/types/analytics.ts` - Full TypeScript definitions for gtag and va functions
- ✅ `src/contexts/ThemeContext.tsx` - Theme change tracking
- ✅ All code showcase pages - Exercise/utility interaction tracking
- ✅ `.env.local.example` - Environment configuration template

**Analytics Coverage**:
- ✅ Exercise/utility card clicks and page views with metadata (difficulty, complexity, category)
- ✅ Code copy events (tracks genuine interest and potential reuse)
- ✅ Navigation tracking and user journey analysis
- ✅ Theme preference monitoring
- ✅ Performance metrics and Core Web Vitals reporting
- ✅ Example modal interactions and engagement depth

**Technical Benefits Achieved**: Professional demonstration of modern analytics integration, proper Next.js patterns, TypeScript safety, privacy compliance, and performance optimization

**Documentation**: Complete implementation documented in CLAUDE.md with setup instructions and architecture details

### 2. Site Design Enhancement for Recruiter Appeal
**Problem**: Current design lacks visual impact and professional polish expected by recruiters and hiring managers
**Business Impact**: Reduced interview opportunities and professional impression

**Design Enhancement Requirements**:
- **Visual Hierarchy**: Strengthen typography, spacing, and content organization for better scanability
- **Professional Polish**: Enhance color scheme, shadows, and micro-interactions for enterprise appeal
- **Skills Showcase**: More prominent display of technical competencies and achievements
- **Results Focus**: Highlight quantifiable impact (performance improvements, user metrics, scale)
- **Industry Standards**: Align with modern portfolio design expectations in tech recruiting

**Specific Improvements Needed**:
- **Hero Section**: More compelling value proposition with clear technical positioning
- **Experience Cards**: Emphasize company logos, impact metrics, and technology stacks
- **Skills Matrix**: Visual skill proficiency indicators and certification highlights
- **Project Portfolio**: Professional case study format with before/after metrics
- **Contact/CTA**: Clear calls-to-action for hiring managers (schedule interview, download resume)

**Visual Design System**:
```css
/* Professional color palette */
--primary-brand: #2563eb;      /* Professional blue */
--success-accent: #059669;     /* Achievement green */
--expertise-highlight: #7c3aed; /* Technical purple */
--corporate-neutral: #64748b;   /* Enterprise gray */

/* Typography hierarchy */
--font-display: 'Inter', system-ui;    /* Modern, readable headers */
--font-technical: 'Fira Code', monospace; /* Code/technical content */
--spacing-enterprise: 1.5rem 2rem;     /* Professional spacing */
```

**Implementation Strategy**:
1. **Research Phase**: Analyze top developer portfolios and recruiting preferences
2. **Design System**: Create professional component variants with recruiter focus
3. **Content Strategy**: Rewrite copy with business impact and technical authority
4. **A/B Testing**: Compare current vs enhanced design for engagement metrics

**Success Metrics**:
- Increased time-on-site and page engagement
- Higher contact form submission rates
- Positive feedback from recruiters and hiring managers
- Improved professional network referrals

**Priority**: HIGH - Directly impacts career opportunities and professional growth

## 🟡 Medium Priority Initiatives

### 1. Advanced Theme System - Customizable Theme Engine
**Vision**: Transform the current three-tier theming system into a comprehensive, user-customizable theme platform

**Current State**: Professional three-tier architecture (`:root`, `.light`, `.dark`) with component inheritance
**Future State**: Dynamic theme engine with user-defined custom themes and CSS templating tools

**Core Requirements**:
- **Shared CSS Variables**: Standardized theme API that controls all site styling
- **Theme Toggle Menu**: Enhanced theme selector supporting multiple custom themes
- **CSS Templating Tool**: User interface for creating and editing custom themes
- **Theme Persistence**: Local storage and potential cloud sync for custom themes
- **Import/Export**: Share custom themes between users or import community themes

**Technical Architecture**:
```typescript
// Theme System API
interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  author: string;
  variables: ThemeVariables;
  metadata: ThemeMetadata;
}

interface ThemeVariables {
  // Core color palette
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    success: string;
    warning: string;
    error: string;
    [key: string]: string;
  };
  
  // Typography system
  typography: {
    fontFamily: string;
    fontSize: ScaleDefinition;
    fontWeight: WeightDefinition;
    lineHeight: ScaleDefinition;
  };
  
  // Spacing and layout
  spacing: ScaleDefinition;
  borderRadius: ScaleDefinition;
  shadows: ShadowDefinition;
}
```

**CSS Templating System**:
```css
/* Template-based theme generation */
.theme-template {
  --color-primary: {PRIMARY_COLOR};
  --color-secondary: {SECONDARY_COLOR};
  --color-accent: {ACCENT_COLOR};
  
  /* Auto-generated variations */
  --color-primary-light: {PRIMARY_COLOR_LIGHT};
  --color-primary-dark: {PRIMARY_COLOR_DARK};
  --color-primary-alpha: {PRIMARY_COLOR_ALPHA};
}
```

**User Interface Components**:
- **Theme Builder**: Visual color picker, typography selector, spacing controls
- **Live Preview**: Real-time theme preview on actual site components
- **Theme Gallery**: Community themes, featured themes, user collections
- **Export Tools**: CSS download, JSON export, shareable theme URLs

**Implementation Phases**:
1. **Foundation**: Extract current theme system into standardized theme API
2. **Builder UI**: Create visual theme customization interface
3. **Template Engine**: Implement CSS variable templating system
4. **Persistence**: Add theme storage, import/export functionality
5. **Community**: Theme sharing, gallery, and social features

**Business Value**:
- **User Engagement**: Interactive customization increases site stickiness
- **Portfolio Differentiation**: Unique feature demonstrating advanced CSS architecture
- **Technical Showcase**: Advanced React state management, CSS-in-JS, design systems
- **Community Building**: Theme sharing creates user-generated content ecosystem

**Technical Benefits**:
- **Accessibility**: Custom themes can enhance readability and contrast preferences
- **Brand Flexibility**: Easy corporate theme creation for different contexts
- **Developer Experience**: Visual theme building reduces CSS development time
- **Performance**: Optimized CSS variable injection and minimal runtime overhead

**Inspiration Sources**:
- **Tailwind CSS Playground**: Visual configuration with live preview
- **Material Design Theme Builder**: Google's comprehensive theming system
- **VS Code Themes**: Community-driven theme ecosystem with import/export
- **Figma Design Tokens**: Professional design system management tools

**Success Metrics**:
- Theme creation engagement and completion rates
- Custom theme usage vs default themes
- Community theme sharing and adoption
- Performance impact of dynamic theming
- User satisfaction with customization depth

**Priority Justification**: Medium priority due to significant development investment required, but high impact on user engagement and technical demonstration value for potential employers.

### 3. Component Audit & Standardization
**Problem**: AboutContent has repetitive card patterns that violate DRY principles
- Journey cards, experience banners, skill banners all follow similar patterns
- 600+ lines of repetitive CSS with slight variations
- Hard to maintain and theme consistently

**Specific Issues in AboutContent**:
- **Journey Cards** (lines 8-67): 3 gradient variants, hover effects, content layout
- **Experience Banners** (lines 89-218): 4 company-specific gradients (AWS, Fox, ADP, TBN)
- **Skill Banners** (lines 240-390): 3 skill category gradients with tags system
- **Contact Hero** (lines 392-520): Another hero variant with contact grid
- **Mobile Responsive** (lines 522-580): Repeated responsive patterns

**Solution**: Create modular card components following HeroBanner pattern
```
src/components/ui/
├── GradientCard/           # Base card with gradient backgrounds
│   ├── index.tsx          # Main component with className overrides
│   └── style.module.css   # Base gradient card styles
├── ContentCard/            # Cards with icon + content layout  
│   ├── index.tsx          # Icon + title + description pattern
│   └── style.module.css   # Content layout styles
├── TagCard/               # Cards with tag systems
│   ├── index.tsx          # Card with tag/badge arrays
│   └── style.module.css   # Tag display and hover effects
└── ContactCard/           # Specialized contact information cards
    ├── index.tsx          # Contact-specific layout
    └── style.module.css   # Contact item styling
```

**Refactoring Plan**:
1. **Phase 1**: Extract Journey Cards → `GradientCard` component
2. **Phase 2**: Convert Experience Banners → use `ContentCard` with company themes
3. **Phase 3**: Transform Skill Banners → `TagCard` component with skill tags
4. **Phase 4**: Migrate Contact Hero → `HeroBanner` + `ContactCard` grid

**Benefits**:
- Reduce CSS from 600+ lines to ~100 lines per component
- Enable consistent theming via className overrides
- Improve maintainability and reusability
- Follow established modular pattern

### 2. CSS Anti-patterns Cleanup
**Problem**: Several CSS anti-patterns found in current codebase that need immediate resolution

**Specific Issues**:
- **Repeated nth-child selectors**: Journey/skill/experience cards use nth-child for variants
- **Magic numbers**: Inconsistent spacing, sizes, z-index values
- **Duplicated gradient definitions**: Same gradients redefined multiple times
- **Inconsistent hover effects**: Different transform/shadow values across components
- **Mixed units**: px, rem, em used inconsistently

**Priority**: HIGH - These patterns make maintenance difficult and create inconsistencies

**Immediate Action Items**:
- Remove nth-child styling variants from AboutContent
- Standardize spacing values using design tokens
- Consolidate gradient definitions into single source
- Unified hover effect patterns
- Convert mixed units to consistent rem-based system
- **Remove `!important` CSS rules**: Replace with proper CSS cascade and specificity hierarchy

**Impact**: Critical for maintainability and design consistency

### 3. AboutContent Component Modularization
**Problem**: AboutContent has 600+ lines of repetitive CSS patterns
- Journey cards, experience banners, skill banners all follow similar patterns
- Hard to maintain and theme consistently
- Violates DRY principles

**Specific Issues in AboutContent**:
- **Journey Cards** (lines 8-67): 3 gradient variants, hover effects, content layout
- **Experience Banners** (lines 89-218): 4 company-specific gradients (AWS, Fox, ADP, TBN)
- **Skill Banners** (lines 240-390): 3 skill category gradients with tags system
- **Contact Hero** (lines 392-520): Another hero variant with contact grid
- **Mobile Responsive** (lines 522-580): Repeated responsive patterns

**Refactoring Approach**:
1. **Phase 1**: Extract Journey Cards → enhance existing `Card` with gradient variants
2. **Phase 2**: Convert Experience Banners → use `HeroBanner` with company themes
3. **Phase 3**: Transform Skill Banners → `Card` component with tag systems
4. **Phase 4**: Migrate Contact Hero → enhanced `HeroBanner` + contact grid

**Benefits**:
- Reduce CSS from 600+ lines to ~100 lines per component
- Enable consistent theming via existing component props
- Improve maintainability and reusability

### 1. Component Audit & Standardization Details
**Problem**: Need systematic audit of all components for modular CSS compliance

**Components to audit**:

**High Priority (Likely needs refactoring)**:
- `CodeItemDisplay` - May have item display patterns similar to cards
- `ProjectCard` - Likely has card-like patterns that could be standardized
- `ProjectsDisplay` - May have grid/layout patterns
- `ContactForm` - Form styling that could be modularized
- `ResumeDisplay` - Has its own CSS that might conflict with modular pattern

**Medium Priority (Check for consistency)**:
- `SiteHeaderNav` - Navigation styling should be modular
- `SiteLayout` - Layout components should use CSS modules
- `TwoColumnLayout` - Layout pattern that could be reused
- `GridLayout` - Generic layout that should be in ui/

**Low Priority (Likely already good)**:
- `CodeShowcase` - Recently updated, probably follows pattern
- All `ui/` components - Should already be modular

**Specific Audit Checklist per Component**:
- [ ] Uses CSS modules (`.module.css` files)
- [ ] Accepts `className` prop for overrides
- [ ] Uses `cn()` utility for conditional classes
- [ ] No global CSS dependencies
- [ ] Follows naming convention (component + variant pattern)
- [ ] Mobile responsive within component
- [ ] TypeScript interfaces properly defined

## Medium Priority 🟡

### 4. Comprehensive Layout Component System
**Problem**: Missing dedicated layout primitives for complex CSS Grid, Flexbox, and form layouts
**Current State**: Basic Grid component exists, but lacking specialized layout components for different use cases

**Research Insights** (August 2025):
- **Industry Best Practice**: Hybrid approach using CSS Grid for 2D layouts, Flexbox for 1D alignment within components
- **Layout Primitives**: Composable building blocks following "single responsibility" principle (spacing, padding, alignment)
- **Modern Patterns**: Container Queries emerging alongside CSS Grid/Flexbox, 96%+ browser support for production-ready techniques
- **Performance**: Strategic combination prevents layout thrashing, requires efficient DOM batching

**Proposed Component Structure**:

**`/src/components/layout/` Collection:**
- **GridLayout/**: Complex CSS Grid with named areas, template layouts
- **AutoGrid/**: Self-sizing grid (enhance current Grid component)  
- **FlexContainer/**: Primary flexbox wrapper with direction, justify, align props
- **FlexStack/**: Vertical/horizontal stacking with spacing
- **FlexWrap/**: Auto-wrapping items with min-width controls
- **BlockContainer/**: Document flow layouts with max-width, spacing
- **TwoColumn/**: Side-by-side layouts with responsive breakpoints
- **StickyLayout/**: Sticky positioning for sidebars/navigation
- **DataTable/**: Semantic table wrapper with responsive, scrollable options
- **GridTable/**: CSS Grid as table alternative

**`/src/components/form/` Collection:**
- **FormLayout/**: Form-specific grid layouts with responsive columns
- **FieldSet/**: Logical field grouping with collapsible options
- **FormActions/**: Button grouping with alignment controls
- **FormGroup/**: Field containers with labels, validation, help text
- **FormRow/**: Horizontal field arrangements with span controls

**Implementation Criteria**:
```typescript
// Create Component When:
// - Complex responsive behavior needed
// - Multiple style variants required  
// - Reused across 3+ locations
// - Involves layout calculations
// - Props for configuration needed

// Keep as HTML When:
// - Single-use case
// - Default styling sufficient
// - Standard semantic meaning clear
```

**2025 Layout Principles**:
- **Mobile-first responsive design** with Container Queries
- **Layout primitives as composable building blocks**
- **Performance-conscious**: Minimize layout thrashing, efficient selectors
- **Accessibility-first**: Semantic HTML foundation, ARIA support
- **Type safety**: Full TypeScript interfaces for all layout props

**Priority**: MEDIUM - Would significantly improve developer experience and layout consistency, but current Grid component works for immediate needs

**Benefits**:
- Eliminate custom layout CSS across components
- Consistent responsive behavior patterns
- Improved developer velocity for new layouts
- Type-safe layout composition
- Better separation of concerns (layout vs styling)

### 5. Expand Unit Test Coverage
**Problem**: Insufficient unit test coverage for critical components and utilities
**Current State**: Basic Jest setup with limited component testing

**Testing Gaps Identified**:
- **UI Components**: Most components in `src/components/ui/` lack comprehensive unit tests
- **Utility Functions**: Functions in `src/utilities/` need thorough test coverage
- **Page Components**: AboutContent, CodePage, ProjectsPage need component behavior testing
- **Custom Hooks**: `useScreenshotMode`, `useTheme` missing test coverage
- **Integration Tests**: Component composition and prop passing not tested

**Implementation Requirements**:
```typescript
// Component testing patterns
describe('PageHeader', () => {
  it('renders title and subtitle correctly', () => { /* ... */ });
  it('forwards className prop', () => { /* ... */ });
  it('handles optional props gracefully', () => { /* ... */ });
});

// Utility function testing
describe('debounce utility', () => {
  it('delays function execution', () => { /* ... */ });
  it('cancels previous calls', () => { /* ... */ });
  it('handles edge cases', () => { /* ... */ });
});
```

**Coverage Targets**:
- **UI Components**: 85%+ coverage
- **Utility Functions**: 95%+ coverage  
- **Custom Hooks**: 90%+ coverage
- **Integration Tests**: Critical user flows covered

**Priority**: MEDIUM - Essential for maintainable codebase and confident refactoring

### 5. Comprehensive E2E Test Specification Files
**Problem**: E2E test coverage needs expansion beyond current Playwright implementation
**Current State**: Basic E2E tests for page navigation and visual regression

**Missing E2E Coverage**:
- **Code Showcase Workflows**: Algorithm exercise interactions, solution tab switching
- **Project Gallery Interactions**: Modal opening, image gallery navigation, project filtering
- **Contact Form Submission**: Form validation, error handling, success states
- **Theme Switching**: Dark/light mode transitions across all pages
- **Mobile Responsive Testing**: Touch interactions, mobile navigation, responsive layouts
- **Accessibility Testing**: Screen reader compatibility, keyboard navigation flows

**Test Specifications Needed**:
```typescript
// Code showcase workflow
describe('Algorithm Exercise Interaction', () => {
  it('displays multiple solutions with complexity analysis', () => { /* ... */ });
  it('allows copying code snippets', () => { /* ... */ });
  it('marks optimal solutions with badges', () => { /* ... */ });
});

// Project gallery
describe('Project Portfolio Navigation', () => {
  it('opens project modals with correct content', () => { /* ... */ });
  it('navigates through project screenshots', () => { /* ... */ });
  it('filters projects by technology', () => { /* ... */ });
});
```

**Cross-Browser Requirements**:
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: iOS Safari, Android Chrome
- **Accessibility**: Screen reader testing with NVDA/VoiceOver

**Priority**: MEDIUM - Critical for production confidence and user experience validation

### 6. Design System Foundation
**Problem**: Inconsistent design values across components
- No centralized design tokens
- Magic numbers throughout CSS
- Inconsistent spacing/sizing scale

**Specific Issues from Previous Analysis**:
- **Tailwind v4 Theme Functions**: `theme()` functions not processing correctly in CSS modules
  - Current: Using standard CSS values as fallback (working solution)
  - Goal: Integrate proper Tailwind v4 theme() function support
  - Impact: Medium - affects maintainability and design system consistency
  - Files: All `style.module.css` files, particularly CodeShowcase, SolutionTabs, AboutPage, CodePage, ResumeDisplay

- **CSS Design Token Library**: Repeated values like font-family, spacing, colors across components
  - Current: Hard-coded values duplicated in multiple CSS files, especially in hero banner gradients
  - Goal: Create centralized design token system with CSS custom properties
  - Impact: High - improves maintainability, consistency, and themeable design system
  - Example: `font-family: var(--font-mono)` instead of `'Monaco', 'Menlo', 'Ubuntu Mono', monospace`
  - Hero Banners: Gradient colors could be tokenized as `--gradient-primary`, `--gradient-secondary`, etc.

**Solution**: Implement design token system
```css
/* Design tokens */
:root {
  /* Spacing scale */
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 0.75rem;   /* 12px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 2.5rem;   /* 40px */
  
  /* Size scale */
  --size-card-sm: 250px;
  --size-card-md: 280px;
  --size-card-lg: 350px;
  
  /* Effects */
  --shadow-card: 0 8px 25px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.25);
  --transform-hover: translateY(-8px);
  
  /* Typography */
  --font-mono: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-success: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
```

### 5. Component Composition Patterns
**Problem**: Large monolithic components that could be composed
- AboutContent does everything in one component
- Hard to test individual pieces
- Poor separation of concerns

**Solution**: Break into composable pieces
```tsx
// Instead of one large AboutContent component
<AboutContent />

// Use composed approach
<PageContainer>
  <HeroBanner className="about-main-hero" {...mainHeroProps} />
  <Section title="My Journey">
    <ResponsiveGrid cols={3}>
      {journeyData.map(item => (
        <GradientCard key={item.id} variant={item.variant} {...item} />
      ))}
    </ResponsiveGrid>
  </Section>
  <Section title="Experience">
    <ResponsiveGrid cols={3}>
      {experienceData.map(exp => (
        <ContentCard key={exp.id} variant={exp.company} {...exp} />
      ))}
    </ResponsiveGrid>
  </Section>
</PageContainer>
```

### 7. Optimize Build and Bundle Size
**Current Issues**:
- Large CSS bundles due to duplication
- Unused CSS in bundles
- No tree-shaking for CSS modules

**Analysis Needed**:
```bash
npm run build:analyze  # Bundle size analysis
npm run css:analyze    # CSS duplication report
```

**Solutions**:
- CSS tree-shaking setup
- Critical CSS extraction
- Component lazy loading
- Bundle splitting optimization

### 8. Enhance Type Safety and Developer Experience
**Current State**: Good TypeScript coverage
**Improvements Needed**:

**Stricter Component Props**:
```tsx
// Instead of loose props
interface CardProps {
  title: string;
  description?: string;
  className?: string;
}

// Use more specific types  
interface CardProps {
  title: NonEmptyString;
  description?: string;
  variant: 'emerald' | 'sunset' | 'ocean' | 'fire';
  size: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Better Error Handling Types**:
```tsx
type ComponentResult<T> = 
  | { success: true; component: T }
  | { success: false; error: ComponentError };
```

**Theme System Types**:
```tsx
type ThemeVariant = keyof typeof themeVariants;
type GradientName = keyof typeof gradients;
```

### 9. Accessibility and Performance Improvements
**Accessibility Issues**:
- Missing ARIA labels on interactive cards
- No keyboard navigation for card grids
- Color contrast may need verification
- No reduced-motion support

**Performance Issues**:
- Heavy CSS animations on every hover
- No intersection observer for animations
- Large image assets not optimized
- No lazy loading for below-fold content

**Solutions**:
```tsx
// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
    transform: none;
  }
}

// Intersection observer for animations
const { ref, inView } = useInView({ triggerOnce: true });
<Card ref={ref} className={inView ? 'animate-in' : ''} />
```

## Low Priority 🟢

### 6. Development Journey Documentation (DEV_JOURNEY.md)
**Problem**: No centralized documentation of development decisions, discussions, and project evolution
**Business Impact**: Loss of project context and decision rationale for future maintainers

**Documentation Requirements**:
- **Decision Log**: Major architectural choices (Pages Router vs App Router, CSS Modules vs styled-components)
- **Discussion Summary**: Key conversations that shaped the project direction  
- **Commit Progression**: Significant milestones and feature implementations
- **Problem Solutions**: How specific challenges were addressed (TypeScript errors, build issues, performance optimizations)
- **Lessons Learned**: What worked well, what didn't, and why

**Benefits**:
- Preserve project context for future development
- Document reasoning behind technical decisions
- Provide learning reference for similar projects
- Maintain continuity across development sessions

**Implementation Strategy**:
```markdown
# DEV_JOURNEY.md Structure
## Project Genesis
- Initial goals and requirements
- Technology selection rationale

## Major Milestones  
- Analytics integration decision and implementation
- Component architecture evolution
- Performance optimization initiatives

## Decision Log
- Why Pages Router over App Router
- CSS Modules + Tailwind CSS v4 approach
- Testing strategy (Jest + Playwright)

## Challenges & Solutions
- Build errors and resolutions
- TypeScript configuration issues
- Deployment and environment setup
```

**Priority**: LOW - Valuable for long-term maintainability but not blocking current development

### 7. Implement Two-Tone Gradient Design Pattern
**Context**: Proper architectural approach for gradient backgrounds using pseudo-elements
**Current Issue**: Previous gradient implementation used sibling divs instead of true background layers

**Recommended Implementation Pattern**:
```css
.heroBanner {
  position: relative;
  /* base styles */
}

.heroBanner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  pointer-events: none;
  z-index: 1;
}

.heroContent {
  position: relative;
  z-index: 2; /* above the pseudo-element background */
}
```

**Benefits of Pseudo-Element Approach**:
- ✅ True background layer positioning
- ✅ No extra DOM elements needed
- ✅ Content naturally flows in foreground
- ✅ Cleaner HTML structure
- ✅ Better semantic meaning
- ✅ Easier to maintain and theme

**HTML Structure**:
```html
<div class="heroBanner">
  <div class="heroContent">
    <!-- All content here -->
  </div>
  <!-- No separate gradient div needed -->
</div>
```

**Priority**: LOW - Focus on component architecture first, gradients are aesthetic enhancement

### 7. Re-implement Gradient System (Future Enhancement)
**Context**: Gradients were removed from components for consistency and maintainability
**Future Goal**: Add gradient variants back to components using design token system

**Current State**: Components use solid colors and CSS custom properties
**Future Implementation**: 
- Use centralized gradient design tokens in `/src/styles/tokens.css`
- Add gradient variant props to Card and HeroBanner components
- Apply gradients through semantic aliases (e.g., `--gradient-primary`, `--gradient-success`)

**Benefits**: Visual richness while maintaining design system consistency
**Priority**: LOW - Focus on component architecture first, gradients are aesthetic enhancement

### 7. Enhanced Card & HeroBanner Variants
**Current**: Separate GradientCard concept planned
**New Approach**: Enhance existing `Card` and `HeroBanner` components with variant props

**Card Component Enhancement**:
```tsx
<Card 
  variant="gradient" 
  gradient="emerald" // emerald, sunset, ocean, fire
  className="custom-overrides"
>
  Content here
</Card>

<Card 
  variant="colored" 
  color="primary" // primary, secondary, accent
  className="custom-overrides"
>
  Content here  
</Card>
```

**HeroBanner Component Enhancement**:
```tsx
<HeroBanner
  variant="gradient"
  gradient="company-aws" // company-specific gradients
  stats={stats}
  tags={tags}
>
  Hero content
</HeroBanner>
```

**Benefits**:
- Leverages existing component architecture
- No new components to maintain
- Consistent API with current patterns
- Easy migration from AboutContent patterns

### 7. Code Syntax Highlighting Enhancement
**Problem**: Currently using plain `<pre><code>` blocks
- Current: Monospace font with basic styling
- Goal: Add syntax highlighting for TypeScript/JavaScript code showcase
- Impact: Low-Medium - would improve visual appeal of code showcase

### 11. Testing Strategy Implementation
**Current State**: Basic Jest setup
**Needed**:

**Component Testing**:
```tsx
// Unit tests for each UI component
describe('GradientCard', () => {
  it('applies variant classes correctly', () => {
    render(<GradientCard variant="emerald" title="Test" />);
    expect(screen.getByRole('article')).toHaveClass('emerald');
  });
  
  it('forwards className prop', () => {
    render(<GradientCard className="custom" title="Test" />);
    expect(screen.getByRole('article')).toHaveClass('custom');
  });
});
```

**Visual Regression Testing**:
```bash
npm run test:visual     # Chromatic or similar
npm run test:a11y       # Accessibility testing
```

**Integration Testing**:
- Data fetching flows
- Component composition
- Theme switching
- Responsive behavior

### 12. Documentation and Style Guide
**Missing Documentation**:
- Component usage examples
- Design system documentation
- Contribution guidelines
- Architecture decision records (ADRs)

**Style Guide Needed**:
```markdown
## Component Library Usage

### GradientCard
Used for content cards with gradient backgrounds.

#### Props
- `variant`: Theme variant (emerald, sunset, ocean, fire)
- `title`: Card title (required)
- `description`: Optional description text
- `icon`: Optional icon element
- `className`: Additional CSS classes

#### Examples
```tsx
<GradientCard 
  variant="emerald" 
  title="My Journey" 
  description="How I got started"
  icon={<JourneyIcon />}
  className="custom-spacing"
/>
```

### 13. Developer Experience Enhancements
**IDE/Tooling Improvements**:
- VSCode snippets for component patterns
- ESLint rules for component conventions
- Prettier config for consistent formatting
- Husky hooks for pre-commit checks

**Development Workflow**:
```json
{
  "scripts": {
    "dev:storybook": "storybook dev",
    "test:components": "jest --watch",
    "lint:css": "stylelint **/*.css",
    "type:check": "tsc --noEmit"
  }
}
```

### 14. Migration Strategy and Rollback Plan
**Phased Migration Approach**:

**Phase 1** (Week 1): Foundation
- Create base component architecture
- Implement design tokens
- Set up testing framework

**Phase 2** (Week 2): Core Components  
- Migrate Journey Cards → GradientCard
- Create ResponsiveGrid component
- Update one page to use new components

**Phase 3** (Week 3): Expand Migration
- Migrate Experience Banners → ContentCard
- Migrate Skill Banners → TagCard
- Update AboutContent to use new components

**Phase 4** (Week 4): Polish & Optimize
- Migrate remaining components
- Performance optimization
- Documentation completion

**Rollback Strategy**:
- Keep old CSS as fallback during migration
- Feature flags for new vs old components
- Automated testing before each deployment
- Quick rollback script if issues found

### 15. Monitoring and Success Metrics
**Performance Metrics**:
- Bundle size reduction: Target 30-50%
- CSS reduction: Target 50%+ in AboutContent
- Build time: Should not increase
- Runtime performance: No regression

**Code Quality Metrics**:
- TypeScript coverage: Maintain 95%+
- Test coverage: Target 80%+ for UI components
- Lint warnings: Zero tolerance
- Duplication: Track with tools like jscpd

**Developer Experience Metrics**:
- Component reuse rate
- Time to create new similar pages
- Bug count in UI components
- Developer satisfaction survey

## Refactoring Guidelines

### Modular Component Pattern
All UI components should follow this pattern:
```tsx
// Component structure
export interface ComponentProps {
  // Required props
  title: string;
  
  // Optional behavior
  href?: string;
  onClick?: () => void;
  
  // Styling - className for overrides
  className?: string;
  
  // Content
  children?: React.ReactNode;
}

export default function Component({ 
  title, 
  className, 
  ...props 
}: ComponentProps) {
  return (
    <div className={cn(styles.component, className)}>
      {/* Component content */}
    </div>
  );
}
```

### CSS Module Pattern
```css
/* Base component styles */
.component {
  /* Essential component styling */
}

/* Variants via className overrides, not global CSS */
.component.variant {
  /* Variant-specific styles */
}

/* Mobile responsive */
@media (max-width: 767px) {
  .component {
    /* Mobile adaptations */
  }
}
```

### Import/Export Pattern
```tsx
// Always use absolute imports
import { ComponentName } from '@/components/ui';
import { TypeName } from '@/interfaces/shared';

// Export from index files for clean imports
export { default as ComponentName } from './ComponentName';
```

## Next Steps

### Immediate (This Week) 🔥
1. **Component Audit** - Pick CodeItemDisplay or ProjectCard
   - Check for modular CSS compliance using audit checklist
   - Identify refactoring needs and anti-patterns
   - Document findings and create action plan

2. **CSS Anti-patterns Assessment** - AboutContent analysis
   - Identify all nth-child selectors and magic numbers
   - Map gradient definitions and hover effects
   - Create consolidation strategy

3. **AboutContent Refactoring Plan** - Detailed planning
   - Map current patterns to existing Card/HeroBanner components
   - Define enhancement props needed for variants
   - Create migration timeline

### Short Term (Next 2-3 Weeks) 📅
1. **Execute High Priority Items**:
   - Week 1: Complete component audit and CSS anti-pattern cleanup
   - Week 2: AboutContent refactoring using enhanced Card/HeroBanner
   - Week 3: Testing and validation of refactored components

2. **Establish design system foundation**:
   - Design tokens implementation
   - Component composition patterns
   - CSS module standardization

3. **Create enhanced component documentation**:
   - Updated Card and HeroBanner variant examples
   - Migration guide from AboutContent patterns
   - Best practices for gradient and color variants

### Medium Term (1-2 Months) 📈
1. **Audit and migrate remaining components**:
   - Complete component inventory audit
   - Migrate high-priority components
   - Remove legacy CSS patterns

2. **Performance optimization**:
   - Bundle size analysis and optimization
   - CSS tree-shaking implementation
   - Critical CSS extraction

3. **Enhanced developer experience**:
   - VSCode snippets for component patterns
   - Automated linting for component conventions
   - Component testing framework

### Long Term (2-3 Months) 🎯
1. **Advanced features**:
   - Accessibility improvements
   - Performance monitoring
   - Visual regression testing

2. **Scale and maintain**:
   - Document all patterns
   - Train team on new conventions
   - Monitor and iterate based on usage

## Risk Assessment and Mitigation

### High Risk 🚨
**Risk**: Breaking existing functionality during migration
**Mitigation**: 
- Parallel implementation (keep old code until new is tested)
- Feature flags for gradual rollout
- Comprehensive testing before each step
- Quick rollback plan

### Medium Risk ⚠️
**Risk**: Performance regression from additional component layers
**Mitigation**:
- Benchmark before/after each change
- Bundle size monitoring
- Runtime performance testing
- Optimize bundle splitting

### Low Risk ℹ️
**Risk**: Developer adoption of new patterns
**Mitigation**:
- Clear documentation and examples
- Gradual migration (not big bang)
- Team training sessions
- Make new patterns easier to use than old ones

## Success Metrics

### Code Quality Metrics 📊
- ✅ **CSS reduction**: Target 50%+ reduction in AboutContent CSS (600+ lines → ~200 lines)
- ✅ **Component reusability**: 3+ pages using same card components
- ✅ **TypeScript coverage**: Maintain 95%+ (currently good)
- ✅ **Duplication elimination**: Remove 80%+ of repeated CSS patterns
- ✅ **Build performance**: No regression in build times
- ✅ **Bundle size**: 20-30% reduction in CSS bundle size

### Developer Experience Metrics 👩‍💻
- ✅ **New page creation time**: 50% faster for card-based layouts
- ✅ **Consistency**: All components use className override pattern
- ✅ **Maintainability**: Single place to update card styling
- ✅ **Testing**: 80%+ test coverage for UI components
- ✅ **Documentation**: Complete usage examples for all components

### User Experience Metrics 👤
- ✅ **Performance**: No regression in page load times
- ✅ **Accessibility**: WCAG 2.1 AA compliance
- ✅ **Visual consistency**: Unified design language across pages
- ✅ **Responsive design**: Consistent mobile experience
- ✅ **Cross-browser**: No visual regressions

### Technical Debt Reduction 🔧
- ✅ **Anti-patterns eliminated**: No more nth-child styling variants
- ✅ **Magic numbers removed**: Design token system in place
- ✅ **Global CSS eliminated**: All components use CSS modules
- ✅ **Naming consistency**: Unified component naming conventions
- ✅ **Import structure**: Clean absolute imports throughout

## Tracking and Monitoring

### Automated Checks ✅
```bash
# Bundle size monitoring
npm run build:analyze

# CSS duplication detection  
npm run css:analyze

# Type coverage
npm run type:coverage

# Test coverage
npm run test:coverage

# Performance benchmarks
npm run perf:benchmark
```

### Manual Reviews 📋
- Weekly component audit reviews
- Monthly performance assessments  
- Quarterly architecture review
- Developer satisfaction surveys

### 8. Difficulty-Based Color Coding for Code Showcase
**Context**: Add visual difficulty indicators to Exercises and Utilities pages using colorVariant props
**Current State**: Exercises and Utilities use default Card components without color differentiation

**Proposed Implementation**:
- **Exercises**: Color code by time complexity (O(1)=green, O(log n)=blue, O(n)=yellow, O(n²)=orange, O(2^n)=red)
- **Utilities**: Color code by category or usage complexity (Performance=blue, Type Safety=purple, Data=teal, etc.)
- Use existing colorVariant prop system from Card component

**Benefits**:
- ✅ Quick visual identification of difficulty/complexity
- ✅ Better user experience for skill-appropriate content discovery
- ✅ Leverages existing colorVariant system for consistency
- ✅ Maintains accessible contrast and readability

**Priority**: LOW - Enhancement for improved UX, not essential functionality

### Success Criteria for Completion ✨
1. **AboutContent refactored** - Uses only modular components
2. **Zero global CSS** - All styling through CSS modules + className
3. **Component library complete** - GradientCard, ContentCard, TagCard working
4. **Documentation done** - Usage examples and migration guide
5. **Tests passing** - 80%+ coverage on new components
6. **Performance maintained** - No regressions in Core Web Vitals
7. **Team adoption** - New patterns being used for new features

---

*Last updated: August 14, 2025*
*Next review: August 21, 2025*
*Owner: Frontend Team*
*Priority: High (affects maintainability and development velocity)*

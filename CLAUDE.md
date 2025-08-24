# CLAUDE.md - Project Context

## 🤖 Shared Context System
This serves as a **persistent knowledge base** shared between AI sessions for project continuity.

**memorize:** pattern - Any statement following `memorize:` becomes a candidate for inclusion in this context file.

## 🚨 Critical Policies

### Project Status Language
- NEVER use "complete", "completed", "finished", "done" status language
- NEVER add status fields to project data or interfaces  
- Use "current", "working", "functional", "implemented" instead

### Project Card Display Rules
- Projects in "Featured" section: No badges needed (already in Featured section)
- Projects in "All Projects & Case Studies" section: Show type badge
  - "Featured" - if project is also in Featured section
  - "Case Study" - if category contains "case study"
  - "Project" - for all other projects
- The featured field in data is ONLY for determining what shows in Featured section

### TypeScript Standards
- **Zero tolerance for `any` types** - Use specific interfaces/types
- **ESLint compliance required** - All errors are build-blocking
- **Vercel deployment fails** on TypeScript/ESLint errors

### Human Readability First
- Use template literals for multiline strings (not escaped `\n`)
- Write self-documenting code with clear naming
- Code should read like well-written prose

## Project Overview
- **Name**: jdilig-me-v2  
- **URL**: https://www.jdilig.me
- **Stack**: Next.js Pages Router, TypeScript, Tailwind CSS v4, Jest, Playwright
- **Analytics**: Google Analytics 4, Vercel Analytics, Core Web Vitals tracking
- **Architecture**: Modular components with unified UI system

## 📁 Project Structure
```
src/
├── pages/                  # Next.js Pages Router
├── components/
│   ├── ui/                # Core UI primitives
│   └── pages/             # Page components
├── interfaces/            # Domain data structures
├── types/                 # Utility types
├── data/                  # Static data
├── exercises/             # Algorithm exercises
├── utilities/             # Utility functions
└── scripts/               # Build scripts
projects/                  # Project showcase data
```

## 🎨 CSS Architecture (MANDATORY)

### Mobile-First Hierarchy
```css
/* 1. ROOT - Global foundation */
:root { /* CSS variables */ }

/* 2. COMPONENT - Reusable styles */
.component { /* Mobile-first base */ }

/* 3. PAGE - Specific overrides (minimize) */
.pageSpecific { /* Only when needed */ }

/* 4. THEME - Conditional overrides */
:global(.dark) .component { /* Dark only */ }
```

### Responsive Breakpoints
- Mobile: 320px+ (base)
- Tablet: `@media (min-width: 768px)`
- Desktop: `@media (min-width: 1024px)`

**NEVER**: Use `max-width` queries or desktop-first approach

## 🎨 Theming System

### Three-Tier Architecture
1. **`:root`** - Default/fallback palette
2. **`.light`** - Light mode overrides
3. **`.dark`** - Dark mode overrides

### Component Variables Pattern
```css
--card-bg-color-default: var(--color-neutral);
--banner-border-color-hover: var(--border-color-medium);
```
Naming: `--{component}-{property}-{state}`

## 🧪 Testing Infrastructure

### Jest (249 tests, 18 suites)
- Mock factories for browser APIs
- Component testing with accessibility
- Advanced test utilities framework

### Playwright E2E (160+ scenarios, 5 browsers)
- Core Web Vitals validation
- Cross-browser testing matrix
- Visual regression snapshots
- User journey testing

### Test Commands
```bash
npm test                # Jest unit tests
npm run test:e2e        # Playwright E2E
npm run test:all        # Both suites
npm run test:e2e:update # Update snapshots
```

## 💻 Development Commands
```bash
npm run dev             # Start dev server
npm run build           # Build production
npm run generate        # Generate JSON data
npm run process-images  # Process project images
npm run lint            # ESLint check
```

## 📊 Analytics Implementation
- **Google Analytics 4** via @next/third-parties/google
- **Vercel Analytics** with zero config
- **Custom event tracking** for code showcase interactions
- **Production-only** with environment gating

Setup: Add `NEXT_PUBLIC_GA_ID=G-XXX` to `.env.local`

## 🏗️ Component Architecture

### Structure Pattern
```
ComponentName/
├── index.tsx      # Clean export
├── script.tsx     # Component logic
├── style.module.css # Scoped styles
└── test.tsx       # Jest tests
```

### UI Component System
Core primitives: PageContainer, PageHeader, Section, Card, Grid, Modal, ProfileImage, CodeShowcase, SolutionTabs, Breadcrumb

### TypeScript Organization
- `interfaces/` - Domain data structures (what data looks like)
- `types/` - Utility types (how code behaves)
- Shared template pattern: Shared → Showcase → Exercise/Utility

## 📝 Code Showcase System
- **Exercises** (15) & **Utilities** (14) with enhanced descriptions
- Multiple solutions with complexity analysis
- Optimal solution auto-detection (★ badges)
- PascalCase naming convention

### Enhanced Descriptions
- `description`: Brief one-liner for cards
- `detailedDescription`: Comprehensive showcase content
- JSDoc patterns with emojis and structure

## 🚀 Project Showcase System

### Structure
```
projects/{name}/
├── {name}.ts      # TypeScript module
├── images/        # Raw images
└── PROJECT.md     # Documentation
```

### Project Addition Workflow
1. Capture screenshots (01-desktop-homepage.png, etc.)
2. Create TypeScript module with ProjectData interface
3. Process images: `npm run process-images {slug}`
4. Generate JSON: `npm run generate:projects`
5. Build & test: `npm run build`
6. Update snapshots: `npx playwright test --update-snapshots`
7. Commit & push to deploy

## 🚨 CRITICAL DEVELOPMENT WORKFLOW

### 🔴 PRODUCTION DEPLOYMENT WARNING
**EVERY PUSH GOES LIVE IMMEDIATELY - NO DEV ENVIRONMENT**
- Pushes deploy directly to production at https://www.jdilig.me
- Broken code affects live users instantly
- NEVER push without complete testing

### Testing Requirements (MANDATORY)
**ALL tests must PASS before any commit consideration:**
```bash
npm run dev          # Test dev server works
npm run lint         # Zero ESLint errors
npm test             # All Jest tests pass
npm run build        # Production build succeeds
npx playwright test  # E2E tests pass (optional for docs)
```

### Commit/Push Protocol
1. **NEVER commit or push without explicit user approval**
2. **NEVER assume user wants immediate deployment**  
3. **Always ask: "Should I commit these changes?"**
4. **Wait for explicit "commit" or "push" commands**
5. **If build/tests fail, fix completely before mentioning commit**

### Pre-Commit Checklist
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] All syntax errors fixed (CSS, TypeScript, etc.)  
- [ ] Build succeeds (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tests pass (`npm test`)
- [ ] Changes tested in browser
- [ ] User explicitly approved commit/push

### Smart Test Skip (Docs Only)
```bash
# For .md files only - skip expensive tests
if git diff --cached --name-only | grep -v '\.md$' | grep -q .; then
  npm run lint && npm test && npx playwright test && npm run build
else
  npm run lint  # Lint only for docs
fi
```

## 🐛 Known Issues & Lessons

### Infinite Refresh Bug (Resolved)
- **Cause**: Direct TS module imports in data layer
- **Solution**: Use stable JSON imports
- **Prevention**: Always use build pipeline for data imports

### Interface Design Patterns
- Required fields for core data
- Optional fields for enhancements
- Never spread undefined values (overwrites existing)
- Always provide fallbacks for optional fields

## 📚 Key References
- **TECH_DEBT.md** - Refactoring plans and priorities
- **AI_PROJECT_SETUP.md** - AI assistant project guide
- **HISTORY.md** - Historical changes record

## 🎯 Accessibility & Quality
- WCAG 2.1 AA compliant
- Complete ARIA implementation
- Mobile-first responsive design
- 38+ pages static generation
- PWA with offline support

---
*Critical reminders:*
- Do only what's asked, nothing more
- Never create files unless necessary
- Always prefer editing over creating
- Never proactively create documentation
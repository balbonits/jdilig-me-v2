# Personal Website v2 - Project Documentation

## Overview
Complete rebuild of my personal website focusing on performance, accessibility, and maintainability. This serves as the prototype for the new consolidated project organization structure.

## Project Structure
```
projects/personal-website-v2/
├── personal-website-v2.ts         # Project data & metadata (TypeScript module)
├── images/                        # Raw images for processing
│   └── (add raw screenshots here)
└── PROJECT.md                     # This documentation file
```

## Image Processing Workflow
1. Add raw screenshots to the `images/` folder using naming convention:
   - `01-desktop-homepage.png` (main desktop view)
   - `02-mobile-responsive.png` (mobile experience)  
   - `03-feature-components.png` (UI components showcase)
   - etc.

2. Run image processing: `npm run process-images personal-website-v2`

3. Processed images will be generated in: `public/images/projects/personal-website-v2/`

## Key Features Implemented
- ✅ Interactive Code Showcase System (15+ exercises, 14+ utilities)
- ✅ Advanced Modal System with TypeScript generics
- ✅ Comprehensive Accessibility (WCAG 2.1 AA)
- ✅ Multi-shape Profile Image Component
- ✅ Robust Testing Infrastructure (84+ tests)
- ✅ Modular Component Architecture

## Technical Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS v4, CSS Modules, Mobile-first Design
- **Testing**: Jest, React Testing Library, Playwright E2E
- **Architecture**: SSG, Custom Hooks, Modular Components
- **Accessibility**: WCAG 2.1 AA, ARIA Implementation

## Live Links
- **Website**: https://jdilig.me
- **Repository**: https://github.com/johndilig/jdilig-me-v2

---

*This project serves as the prototype for the consolidated project organization structure where both data and images are co-located for better organization.*
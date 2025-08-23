# Development Journey

## Project Genesis
**Started**: November 2024  
**Initial Goal**: Create a modern, professional portfolio website showcasing technical skills and projects  
**Tech Stack Decision**: Next.js Pages Router + TypeScript + CSS Modules + Tailwind CSS v4  

---

## August 23, 2025: AI Project Integration Architecture

### The Problem
Manual process of copying project data from AI assistants (Gemini, Claude, etc.) was becoming tedious and unscalable. Each time an AI builds a project, we had to:
1. Manually copy their project data
2. Paste into our repo
3. Process images manually
4. Run build scripts

### The Discussion
**User Insight**: "Since we still have to copy-paste these `.ts` files, why not have these projects, since they're all gonna be AI-built & driven, create their own showcase pages?"

This led to a brilliant realization: AI projects can self-document and self-integrate into the portfolio.

### Architecture Evolution

#### Phase 1: Manual Copy-Paste (Current)
- AI provides TypeScript data
- We manually copy to `/projects/[slug]/`
- Run `npm run generate:projects`

#### Phase 2: Template-Driven (Implemented)
- Created `AI_PROJECT_SETUP.md` as comprehensive guide
- AI reads template and generates exact structure needed
- Still manual copy, but standardized format

#### Phase 3: GitHub List-Driven Pipeline (Designed Today)
**Key Decision**: Build a "pipeline" (really just a fetch script) that:
1. AI projects maintain `showcase/showcase.config.ts` in THEIR repos
2. We maintain a simple list of GitHub URLs
3. Build script fetches configs automatically
4. Images are copied locally (not hot-linked)

### Important Technical Decisions

#### Why Copy Images Locally?
**User Quote**: "I feel that we should just copy the images over to us, since at the end of the day, the domain name is my site (`www.jdilig.me`). CORS might be at play here."

**Decision**: Copy images to our `/public/images/projects/[slug]/` folder
- Avoids CORS issues
- Looks more professional (served from our domain)
- Better performance (no external dependencies)
- Can optimize images during build

#### Why Not Complex Infrastructure?
- No webhooks needed
- No GitHub Actions
- No CI/CD complexity
- Just a TypeScript script that runs during build
- Frontend developer friendly (no DevOps required)

### Pipeline Education
**User Quote**: "Before we move to 'pipelines', I need a crash course on them. I'm no DevOps guy (front-end dev, remember?)"

**Key Learning**: A "pipeline" is just a build script that:
```
Fetch → Process → Generate → Output
```

It's the same as `npm run build` - just automated fetching instead of manual copying.

### Implementation Status
- ✅ `AI_PROJECT_SETUP.md` - Complete template for AI projects
- ✅ Scaffolded pipeline files marked as "future release"
- ✅ GitHub fetcher utilities with image downloading
- ⏳ Waiting for Gemini tokens to refresh before testing

### Files Created Today
- `/config/ai-projects.future.ts` - Configuration for AI projects list
- `/scripts/generate-ai-projects.future.ts` - Main pipeline script
- `/utils/github-fetcher.future.ts` - GitHub fetching and image downloading utilities

### Lessons Learned
1. **Start Simple**: Manual process → Template → Automation
2. **Frontend Friendly**: Keep DevOps concepts simple for frontend developers
3. **Domain Ownership**: Serve all assets from your own domain
4. **Scaffolding Strategy**: Build structure first, implement when ready

---

## August 22, 2025: Service Worker & Dark Mode Fixes

### Service Worker Caching Conflicts
**Problem**: Infinite refresh loops in development due to aggressive service worker caching  
**Root Cause**: Service worker was registering in development, causing cache conflicts  
**Solution**: Modified `_document.tsx` to only register service worker in production  
**Learning**: Development and production should have different caching strategies  

### Dark Mode Card Backgrounds
**Problem**: Cards showing white/light backgrounds in dark mode  
**Root Cause**: Missing CSS variables for card backgrounds in dark mode selectors  
**Solution**: Added complete card background variables to both `:global(.dark)` and `.dark` selectors  

---

## Previous Sessions

### Project Description Formatting Issues
**Problem**: Markdown content from AI projects displaying raw syntax  
**Evolution**: 
1. Tried `dangerouslySetInnerHTML` (rejected for security)
2. Built custom markdown processor
3. User suggested: "Clean the source, not the destination"
4. Final solution: Clean TypeScript source files, use simple text processing

### Component Architecture
**Decision**: Modular components with separation of concerns
- `index.tsx` → `script.tsx` → `style.module.css` pattern
- CSS Modules for scoped styling
- Mobile-first responsive design

### Analytics Implementation
**Completed**: Comprehensive dual analytics with GA4 and Vercel Analytics
- Custom hooks for tracking
- Production-only implementation
- Privacy-focused approach

---

## Architecture Principles Established

1. **Human Readability First**: Code should be readable without processing
2. **Progressive Enhancement**: Start simple, add complexity only when needed
3. **Type Safety**: Full TypeScript with strict mode
4. **No Magic**: Explicit over implicit, clear over clever
5. **Frontend First**: DevOps concepts explained in frontend terms

---

*Last Updated: August 23, 2025*
*Next Session: Implement GitHub pipeline when Gemini tokens refresh*
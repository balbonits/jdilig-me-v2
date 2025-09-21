# Professional Development Team & Git Worktrees Setup

## Overview
This document outlines the professional development team configuration and git worktree setup for the jdilig.me portfolio project. The team consists of specialized agents representing real-world development roles, enabling collaborative workflows and expert task automation with the primary goal of landing a job.

## Git Worktrees

### Current Worktree Structure
```
/Users/johndilig/Projects/
├── jdilig-me-v2/                 # Main repository (master branch)
└── jdilig-worktrees/
    ├── development/               # Development branch
    ├── feature/                   # Feature branch (tech-debt-cleanup)
    └── hotfix/                    # Hotfix branch
```

### Worktree Commands
```bash
# List all worktrees
git worktree list

# Add new worktree
git worktree add ~/Projects/jdilig-worktrees/[name] [branch]

# Remove worktree
git worktree remove ~/Projects/jdilig-worktrees/[name]

# Prune stale worktrees
git worktree prune
```

### Worktree Workflow
1. **Main Repository** (`master`): Production code, stable releases
2. **Development** (`development`): Active development, feature integration
3. **Feature** (`feature/*`): Specific feature development
4. **Hotfix** (`hotfix`): Emergency production fixes

### Benefits
- Parallel development without stashing
- Quick context switching between branches
- Isolated build artifacts and node_modules
- Simultaneous testing across branches

## Professional Development Team

### Team Structure & Roles

#### 🎯 Project Manager (`project-manager`) - **TEAM LEAD**
**Purpose**: Virtual assistant, team orchestrator, and strategic manager
**Tools**: Task, WebSearch, WebFetch, Read, Write, Edit, TodoWrite, Bash
**Key Responsibilities**:
- Manage and delegate to all other agents
- Conduct market research and competitive analysis
- High-level project strategy and planning
- Virtual assistant capabilities
- Career strategy coordination

**Role**: Primary interface for complex tasks requiring team coordination

#### 🚀 Job Placement Specialist (`job-placement-specialist`)
**Purpose**: Career strategist focused on landing a job
**Tools**: WebSearch, WebFetch, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite
**Key Responsibilities**:
- Job market analysis and positioning
- ATS optimization and keyword strategy
- LinkedIn content creation and posting
- Portfolio optimization for recruiters
- Project recommendations for skill development

**Role**: Primary driver for career advancement objectives

#### 🎨 Frontend Engineer (`frontend-engineer`)
**Purpose**: React/TypeScript UI/UX implementation specialist
**Tools**: Read, Write, Edit, MultiEdit, Grep, Glob, Bash, mcp__ide__getDiagnostics, mcp__ide__executeCode
**Key Responsibilities**:
- Component development and UI implementation
- TypeScript excellence (zero `any` types)
- Performance optimization and accessibility
- Mobile-first responsive design

#### ⚙️ Backend Engineer (`backend-engineer`)
**Purpose**: API and server-side logic specialist
**Tools**: Read, Write, Edit, Bash, Grep, Glob, WebFetch, mcp__ide__executeCode
**Key Responsibilities**:
- Next.js API routes and data processing
- Build-time data generation systems
- Server-side rendering optimization
- System integration and performance

#### 🎨 UX Designer (`ux-designer`)
**Purpose**: User experience and design systems specialist
**Tools**: Read, Edit, Grep, Glob, WebFetch, WebSearch
**Key Responsibilities**:
- Design system management and consistency
- Accessibility compliance (WCAG 2.1 AA)
- User experience optimization
- Responsive design strategy

#### 🧪 QA Engineer (`qa-engineer`)
**Purpose**: Quality assurance and testing specialist
**Tools**: Bash, Read, Grep, Glob, BashOutput, KillShell, mcp__ide__getDiagnostics
**Key Responsibilities**:
- Jest unit testing (327+ tests)
- Playwright E2E testing (160+ scenarios)
- Quality metrics and coverage reporting
- Bug tracking and validation

#### 🚀 Release Manager (`release-manager`)
**Purpose**: Deployment and release orchestration specialist
**Tools**: Bash, Read, Edit, Grep, WebFetch, KillShell
**Key Responsibilities**:
- Semantic versioning and automated releases
- GitHub Actions and CI/CD pipelines
- Deployment management and rollback procedures
- Release communication and documentation

#### 📊 Product Owner (`product-owner`)
**Purpose**: Product vision and feature prioritization specialist
**Tools**: Read, Write, Edit, WebSearch, WebFetch, TodoWrite
**Key Responsibilities**:
- Feature prioritization and roadmap planning
- User persona and market analysis
- Success metrics and KPI tracking
- Stakeholder management and communication

#### 🔧 DevOps Engineer (`devops-engineer`)
**Purpose**: Infrastructure and automation specialist
**Tools**: Bash, Read, Edit, Grep, WebFetch, BashOutput, KillShell
**Key Responsibilities**:
- CI/CD pipeline optimization
- Vercel deployment configuration
- Performance monitoring and security
- Infrastructure automation

#### 🗃️ Database Manager (`database-manager`)
**Purpose**: Data architecture and optimization specialist
**Tools**: Read, Write, Edit, Bash, Grep, Glob, mcp__ide__executeCode
**Key Responsibilities**:
- JSON data management and schema design
- Build-time data generation optimization
- Data validation and integrity
- Query optimization and indexing

### Team File Structure
```
.claude/
├── settings.local.json       # Tool permissions
└── agents/
    ├── project-manager.md           # 🎯 Team Lead & Virtual Assistant
    ├── job-placement-specialist.md  # 🚀 Career Strategy & Job Search
    ├── frontend-engineer.md         # 🎨 React/TypeScript UI
    ├── backend-engineer.md          # ⚙️ API & Server-side
    ├── ux-designer.md              # 🎨 UX/UI Design & Accessibility
    ├── qa-engineer.md              # 🧪 Testing & Quality
    ├── release-manager.md          # 🚀 Deployment & Releases
    ├── product-owner.md            # 📊 Product Strategy & Features
    ├── devops-engineer.md          # 🔧 Infrastructure & Automation
    └── database-manager.md         # 🗃️ Data Architecture
```

## Team Collaboration Workflow

### Team-Based Development Scenarios

#### Scenario 1: New Feature Implementation
```bash
# Switch to development worktree
cd ~/Projects/jdilig-worktrees/development

# Team workflow:
1. Project Manager: Coordinate requirements gathering
2. Product Owner: Define user stories and acceptance criteria
3. UX Designer: Create designs and interaction patterns
4. Frontend Engineer + Backend Engineer: Parallel implementation
5. QA Engineer: Comprehensive testing validation
6. Release Manager: Deploy and monitor
```

#### Scenario 2: Job Search Optimization
```bash
# Career advancement workflow:
1. Job Placement Specialist: Research market demands
2. Project Manager: Coordinate content strategy
3. UX Designer: Optimize portfolio user experience
4. Frontend Engineer: Implement ATS-friendly features
5. Backend Engineer: Add analytics and tracking
6. QA Engineer: Validate across devices/browsers
```

#### Scenario 3: Production Issue Resolution
```bash
# Emergency response workflow:
1. DevOps Engineer: Identify and assess issue
2. Project Manager: Coordinate emergency response
3. Backend Engineer/Frontend Engineer: Implement fix
4. QA Engineer: Rapid testing validation
5. Release Manager: Emergency deployment with rollback plan
```

#### Scenario 4: Portfolio Content Strategy
```bash
# Content development workflow:
1. Job Placement Specialist: Market research and keyword analysis
2. Product Owner: Prioritize content based on recruiter needs
3. UX Designer: Design content presentation
4. Database Manager: Structure content data efficiently
5. Frontend Engineer: Implement content display
6. QA Engineer: Validate SEO and accessibility
```

## Best Practices

### Worktree Management
1. Keep worktrees clean - commit or stash changes
2. Regularly prune stale worktrees
3. Use descriptive branch names
4. Don't share node_modules between worktrees

### Team Management
1. **Project Manager First**: Always start with project-manager for complex tasks
2. **Delegate Appropriately**: Use specialists for their expertise areas
3. **Parallel Execution**: Leverage team members for concurrent work
4. **Clear Communication**: Provide context and expected outcomes
5. **Context Building**: Each agent scans project for role-specific insights

### Job-Focused Strategy
1. **Primary Goal**: Every team action should support job placement
2. **Market-Driven**: Regular research and adaptation to job market demands
3. **Portfolio Optimization**: Continuous improvement for recruiter appeal
4. **Professional Branding**: Consistent career positioning across all content

## Common Commands Reference

### Git Worktree Operations
```bash
# Create feature worktree
git worktree add -b feature/new-feature ~/Projects/jdilig-worktrees/new-feature master

# Switch between worktrees
cd ~/Projects/jdilig-worktrees/[worktree-name]

# Clean up worktree
git worktree remove [worktree-name]
git worktree prune
```

### Team Member Invocation
```
# Project Manager (for complex/strategic tasks)
Use the project-manager to coordinate a new feature implementation
Use the project-manager to research current job market trends

# Job Placement Specialist (for career advancement)
Use the job-placement-specialist to optimize my portfolio for ATS
Use the job-placement-specialist to write LinkedIn posts about my projects

# Technical Specialists (for specific expertise)
Use the frontend-engineer to implement a new React component
Use the qa-engineer to run the full test suite
Use the devops-engineer to optimize the deployment pipeline

# Cross-functional collaboration
Have the project-manager coordinate with the ux-designer and frontend-engineer for the new portfolio section
```

## Troubleshooting

### Worktree Issues
- **"worktree is dirty"**: Commit or stash changes first
- **"branch already checked out"**: Can't have same branch in multiple worktrees
- **Build artifacts conflict**: Each worktree needs its own node_modules

### Team Member Issues
- **Tool permission denied**: Update `.claude/settings.local.json`
- **Agent not found**: Check `.claude/agents/` directory
- **Agent context missing**: Each agent builds context on first engagement
- **Task delegation unclear**: Use project-manager for coordination

## Maintenance

### Regular Tasks
1. **Weekly**: Prune stale worktrees and review team performance
2. **Per Sprint**: Update team configurations based on project needs
3. **Monthly**: Review and optimize team member prompts and capabilities
4. **Quarterly**: Assess team structure and add specialists as needed
5. **Continuous**: Market research via job-placement-specialist

### Team Evolution
- Add new specialists as project needs grow
- Refine agent expertise based on real-world feedback
- Optimize delegation patterns and workflows
- Maintain alignment with career objectives

---

*Last Updated: September 2024*
*Configuration Version: 2.0 - Professional Development Team*
*Primary Objective: Landing a High-Quality Developer Position*
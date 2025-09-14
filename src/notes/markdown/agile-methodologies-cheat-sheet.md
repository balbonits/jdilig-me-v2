---
id: agile-methodologies-cheat-sheet
slug: agile-methodologies-cheat-sheet
title: Agile Methodologies Cheat Sheet
description: Complete guide to Agile frameworks including Scrum, Kanban, ceremonies, roles, and best practices.
detailedDescription: Comprehensive Agile methodologies guide covering Scrum framework, Kanban principles, SAFe, ceremonies, roles & responsibilities, estimation techniques, and modern Agile practices with practical examples.
category: cheat-sheet
tags: [Agile, Scrum, Kanban, Project Management, Ceremonies, Sprint]
difficulty: intermediate
lastUpdated: 2025-01-10
searchKeywords: [agile, scrum, kanban, sprint, ceremonies, product owner, scrum master]
---

# Agile Methodologies Cheat Sheet

## Agile Principles & Values¹

### The Agile Manifesto
```
We value:
• Individuals and interactions over processes and tools
• Working software over comprehensive documentation  
• Customer collaboration over contract negotiation
• Responding to change over following a plan
```

### 12 Agile Principles
1. **Customer satisfaction** through early and continuous delivery
2. **Welcome changing requirements**, even late in development
3. **Deliver working software frequently** (weeks rather than months)
4. **Business people and developers** must work together daily
5. **Build projects around motivated individuals** - give them support
6. **Face-to-face conversation** is the most efficient communication
7. **Working software** is the primary measure of progress
8. **Sustainable development** - maintain constant pace indefinitely
9. **Technical excellence** and good design enhances agility
10. **Simplicity** - maximize the work not done
11. **Self-organizing teams** produce the best results
12. **Regular reflection** and adjustment for effectiveness

## Scrum Framework²

### Scrum Roles

#### Product Owner
**Responsibilities:**
- Owns and manages the Product Backlog
- Defines user stories and acceptance criteria
- Prioritizes features based on business value
- Acts as voice of the customer/stakeholder
- Makes decisions on scope and release dates

**Key Activities:**
```
• Write and prioritize user stories
• Define Definition of Done
• Accept or reject completed work
• Participate in Sprint Planning
• Answer team questions about requirements
```

#### Scrum Master
**Responsibilities:**
- Facilitates Scrum ceremonies
- Removes impediments and blockers
- Coaches team on Agile practices
- Protects team from external distractions
- Ensures process adherence

**Key Activities:**
```
• Facilitate Sprint Planning, Daily Standups, Reviews, Retrospectives
• Coach team members on Scrum practices
• Help resolve conflicts and impediments
• Track and report on team metrics
• Continuously improve team processes
```

#### Development Team
**Responsibilities:**
- Self-organizing and cross-functional
- Estimates effort for user stories
- Commits to Sprint Goals
- Delivers potentially shippable increments
- Participates in all Scrum ceremonies

**Characteristics:**
```
• 3-9 team members (optimal: 5-7)
• Cross-functional skills
• Full-time commitment to one team
• Collectively responsible for delivery
• No sub-teams or hierarchies
```

### Scrum Artifacts

#### Product Backlog
```
Epic: User Authentication System
├── Story: As a user, I can create an account
│   ├── Task: Design registration form UI
│   ├── Task: Implement email validation
│   └── Task: Set up user database table
├── Story: As a user, I can log into my account
└── Story: As a user, I can reset my password

Priority: High → Medium → Low
Estimation: Story Points or T-shirt sizes
```

#### Sprint Backlog
```
Sprint Goal: "Users can register and log in"

Selected Stories:
• Create user account (8 pts) - IN PROGRESS
• User login functionality (5 pts) - TODO
• Password reset flow (3 pts) - TODO

Tasks Breakdown:
• UI mockups (2h) - DONE
• API endpoints (8h) - IN PROGRESS  
• Unit tests (4h) - TODO
• Integration tests (3h) - TODO
```

#### Definition of Done (DoD)
```
✅ Code written and reviewed
✅ Unit tests pass (>90% coverage)
✅ Integration tests pass
✅ No critical bugs
✅ Documentation updated
✅ Deployed to staging environment
✅ Product Owner acceptance
✅ Meets accessibility standards
```

### Scrum Ceremonies

#### Sprint Planning
**Duration:** 2-4 hours (2-week sprint)
**Participants:** Product Owner, Scrum Master, Development Team

**Agenda:**
```
Part 1: What will we build?
• Review Product Backlog priorities
• Discuss and clarify user stories
• Define Sprint Goal

Part 2: How will we build it?
• Break down stories into tasks
• Estimate effort and capacity
• Commit to Sprint Backlog
```

**Artifacts:**
- Sprint Goal
- Sprint Backlog
- Task breakdown

#### Daily Scrum/Standup
**Duration:** 15 minutes
**Participants:** Development Team (+ Scrum Master)

**Format:**
```
Each team member answers:
1. What did I complete yesterday?
2. What will I work on today?  
3. What impediments do I face?

Focus: Synchronization, not status reporting
Goal: Inspect progress toward Sprint Goal
```

#### Sprint Review/Demo
**Duration:** 1-2 hours
**Participants:** All Stakeholders + Scrum Team

**Agenda:**
```
• Demo completed user stories
• Get feedback from stakeholders
• Discuss what went well/didn't go well
• Review Product Backlog priorities
• Discuss next steps and upcoming features
```

#### Sprint Retrospective
**Duration:** 1-1.5 hours
**Participants:** Scrum Team only

**Common Formats:**
```
Start-Stop-Continue:
• Start: What should we begin doing?
• Stop: What should we stop doing?
• Continue: What's working well?

What Went Well / What Could Improve / Action Items:
• Celebrate successes
• Identify improvement opportunities  
• Create concrete action items

4 Ls: Liked, Learned, Lacked, Longed For
```

### User Story Writing

#### Story Format
```
As a [type of user]
I want [some goal/functionality]
So that [benefit/value]

Example:
As a registered user
I want to save my favorite products
So that I can easily find them later
```

#### INVEST Criteria
```
✅ Independent - Can be developed in any order
✅ Negotiable - Details can be discussed
✅ Valuable - Provides business value
✅ Estimable - Team can estimate effort
✅ Small - Can be completed in one sprint
✅ Testable - Clear acceptance criteria
```

#### Acceptance Criteria
```
Story: User Login

Acceptance Criteria:
• Given I'm on the login page
  When I enter valid credentials
  Then I should be logged into my account

• Given I enter invalid credentials  
  When I click login
  Then I should see an error message

• Given I haven't logged in for 30 days
  When I try to log in
  Then I should be prompted to reset my password
```

## Kanban Method³

### Core Principles
1. **Start with what you do now** - Don't disrupt existing process
2. **Agree to pursue incremental change** - Evolution, not revolution  
3. **Respect current process, roles & responsibilities** 
4. **Encourage leadership at all levels**

### Core Properties
1. **Visualize workflow** - Make work visible
2. **Limit Work in Progress (WIP)** - Focus on flow
3. **Manage flow** - Optimize for speed and quality
4. **Make policies explicit** - Clear rules and guidelines
5. **Implement feedback loops** - Continuous improvement
6. **Improve collaboratively** - Evolve experimentally

### Kanban Board Structure
```
Backlog → To Do → In Progress → Code Review → Testing → Done
  ∞        5        3           2           2        ∞

WIP Limits prevent bottlenecks:
• To Do: 5 items maximum
• In Progress: 3 items maximum  
• Code Review: 2 items maximum
• Testing: 2 items maximum
```

### Metrics & Analytics

#### Lead Time vs Cycle Time
```
Lead Time: Request → Delivery (customer perspective)
Cycle Time: Start Work → Completion (team perspective)

Example:
Request Made → Backlog → In Progress → Done
     |←---- Lead Time ---->|
                   |←-Cycle Time->|
```

#### Cumulative Flow Diagram (CFD)
```
Work Items ↑
           │    ┌─ Done
           │   ┌┴─ Testing  
           │  ┌┴─ In Progress
           │ ┌┴─ To Do
           │┌┴─ Backlog
           └────────────────→ Time

Insights:
• Growing gaps = bottlenecks
• Parallel lines = steady flow
• Expanding bands = accumulating work
```

## Estimation Techniques

### Story Points
```
Fibonacci Sequence: 1, 2, 3, 5, 8, 13, 21

Reference Stories:
• 1 point: Fix typo in button text
• 2 points: Add validation to form field  
• 3 points: Create new API endpoint
• 5 points: Design and implement login page
• 8 points: Build user dashboard with charts
• 13 points: Integrate third-party payment system

Velocity: Average points completed per sprint
```

### T-Shirt Sizing
```
XS: Trivial changes (< 1 hour)
S:  Simple features (1-4 hours)  
M:  Standard features (1-3 days)
L:  Complex features (1 week)
XL: Major initiatives (> 1 week)
XXL: Epics requiring breakdown
```

### Planning Poker
```
Process:
1. Product Owner reads user story
2. Team members ask clarifying questions
3. Each member selects estimate privately
4. Everyone reveals simultaneously
5. Discuss differences and re-estimate
6. Repeat until consensus

Benefits:
• Reduces anchoring bias
• Encourages discussion
• Leverages team expertise
```

## Scaled Agile Framework (SAFe)⁴

### SAFe Levels
```
Portfolio Level
├── Large Solution Level  
├── Program Level (ART - Agile Release Train)
└── Team Level (Scrum/Kanban Teams)
```

### Program Increment (PI) Planning
```
PI Planning (2-day event):
Day 1:
• Business context and vision
• Team breakouts and planning
• Draft PI objectives

Day 2:  
• Team planning continues
• Risk identification (ROAM board)
• Final PI objectives and confidence vote
• PI planning retrospective

Outcomes:
• PI Objectives for each team
• Risk mitigation plans  
• Dependencies identified
• Confidence level (1-5 scale)
```

### Innovation & Planning (IP) Iteration
```
Purpose:
• Buffer for meeting PI objectives
• Innovation and exploration time
• System integration and testing
• PI System Demo preparation
• Inspect & Adapt workshop preparation
```

## Modern Agile Practices

### DevOps Integration
```
Development → Continuous Integration → Continuous Deployment → Monitoring

Practices:
• Automated testing pipelines
• Infrastructure as Code
• Feature flags and A/B testing
• Monitoring and observability
• Rapid feedback loops
```

### Lean Startup Integration
```
Build → Measure → Learn

Techniques:
• Minimum Viable Product (MVP)
• A/B testing and experiments
• Validated learning
• Pivot or persevere decisions
• Innovation accounting
```

### OKRs (Objectives and Key Results)
```
Objective: Improve user engagement
├── KR1: Increase daily active users by 25%
├── KR2: Reduce churn rate to under 5%
└── KR3: Achieve NPS score of 50+

Quarterly planning:
• Set ambitious but achievable objectives
• Define measurable key results  
• Review progress weekly
• Adjust tactics based on data
```

## Common Anti-Patterns & Solutions

### Anti-Patterns
```
❌ Scrum-fall: Waterfall disguised as Agile
❌ Story points as productivity measure
❌ Skipping retrospectives
❌ Product Owner unavailable
❌ No clear Definition of Done
❌ Scrum Master as project manager
❌ No stakeholder involvement
❌ Technical debt accumulation
```

### Solutions
```
✅ Focus on working software and customer value
✅ Use velocity for planning, not performance evaluation
✅ Regular retrospectives with action items
✅ Dedicated, available Product Owner
✅ Clear, shared Definition of Done
✅ Servant-leader Scrum Master
✅ Regular stakeholder engagement
✅ Allocate time for technical debt
```

## Team Dynamics & Culture

### High-Performing Team Characteristics
```
• Psychological safety - safe to take risks
• Dependability - reliable execution
• Structure & clarity - clear goals and roles
• Meaning - work has personal significance  
• Impact - work matters and creates change
```

### Conflict Resolution
```
Types of Conflict:
• Task conflict - what needs to be done
• Process conflict - how to do the work
• Relationship conflict - personal tensions

Resolution Strategies:
• Address early before escalation
• Focus on interests, not positions
• Seek win-win solutions
• Use neutral facilitation when needed
```

### Remote/Distributed Teams
```
Adaptations:
• Longer ceremonies with breaks
• Async communication tools
• Digital whiteboards and collaboration
• Time zone considerations
• More structured documentation
• Virtual team building activities
```

## Metrics & Measurement

### Team Metrics
```
Velocity: Story points completed per sprint
Burndown: Work remaining over time
Lead Time: Idea to customer delivery
Cycle Time: Development start to completion
Throughput: Items completed per time period
```

### Quality Metrics
```
Defect Rate: Bugs per feature/story point
Escaped Defects: Bugs found in production  
Technical Debt: Code complexity/maintainability
Test Coverage: Automated test coverage %
Mean Time to Recovery (MTTR): Fix time for issues
```

### Business Metrics
```
Customer Satisfaction: NPS, CSAT scores
Business Value: Revenue, cost savings
Time to Market: Idea to customer delivery
Market Share: Competitive positioning
Customer Retention: Churn and engagement rates
```

## Tools & Technology

### Project Management Tools
```
• Jira - Comprehensive Agile project management
• Azure DevOps - Microsoft ecosystem integration
• Trello - Simple Kanban boards
• Asana - Task and project management
• Monday.com - Customizable workflows
• Linear - Modern issue tracking
```

### Collaboration Tools
```
• Miro/Mural - Digital whiteboards
• Confluence - Documentation and wikis
• Slack/Teams - Communication and integration
• Zoom/Meet - Video conferencing
• Figma - Design collaboration
• GitHub/GitLab - Code collaboration
```

### Metrics & Analytics
```
• Tableau/Power BI - Data visualization
• Google Analytics - User behavior
• New Relic/DataDog - Application monitoring
• SonarQube - Code quality analysis
• JIRA reports - Sprint and velocity tracking
```

## Best Practices Summary

### For Scrum Teams
- ✅ Maintain consistent sprint length (2 weeks recommended)
- ✅ Keep team size between 5-7 members
- ✅ Ensure Product Owner availability and engagement
- ✅ Focus on Sprint Goal throughout the sprint
- ✅ Address impediments quickly
- ✅ Regularly refine the Product Backlog
- ✅ Celebrate achievements and learn from failures

### For Kanban Teams
- ✅ Start with current process, then evolve
- ✅ Visualize all work types and states
- ✅ Set appropriate WIP limits
- ✅ Measure and optimize flow metrics
- ✅ Make policies explicit and visible
- ✅ Regular review and adjustment of system

### For Scaled Environments
- ✅ Align teams around common objectives
- ✅ Minimize dependencies between teams
- ✅ Establish clear communication protocols
- ✅ Regular synchronization and integration
- ✅ Invest in automation and tooling
- ✅ Maintain architectural runway

## References

1. **Agile Manifesto**: [https://agilemanifesto.org/](https://agilemanifesto.org/)
2. **Scrum Guide**: [https://scrumguides.org/](https://scrumguides.org/)
3. **Kanban Method**: [https://kanban.university/](https://kanban.university/)
4. **Scaled Agile Framework (SAFe)**: [https://scaledagileframework.com/](https://scaledagileframework.com/)
5. **Agile Alliance**: [https://www.agilealliance.org/](https://www.agilealliance.org/)
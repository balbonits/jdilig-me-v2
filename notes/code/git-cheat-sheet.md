---
id: git-cheat-sheet
slug: git-cheat-sheet
title: Git Commands & Workflows Cheat Sheet
description: Complete Git reference covering commands, branching strategies, workflows, and troubleshooting scenarios.
detailedDescription: Comprehensive Git cheat sheet covering essential commands, branching strategies, merge vs rebase, workflow patterns, and common troubleshooting scenarios with visual diagrams and practical examples.
category: cheat-sheet
tags: [Git, Version Control, Branching, Workflow, Commands]
difficulty: intermediate
lastUpdated: 2025-01-10
searchKeywords: [git, version control, branch, merge, rebase, workflow, commands]
---

# Git Commands & Workflows Cheat Sheet

## Basic Git Commands

### Repository Setup
```bash
# Initialize a new repository
git init

# Clone existing repository
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder

# Add remote origin
git remote add origin https://github.com/user/repo.git

# View remotes
git remote -v

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git
```

### Basic Workflow
```bash
# Check repository status
git status
git status --short  # Abbreviated output

# Add files to staging area
git add file.txt
git add .           # Add all files
git add *.js        # Add all JS files
git add --all       # Add all files including deleted

# Commit changes
git commit -m "Add new feature"
git commit -am "Add and commit all tracked files"

# Push to remote
git push origin main
git push -u origin main  # Set upstream and push

# Pull from remote
git pull origin main
git pull  # Pull from current branch's upstream

# Fetch changes without merging
git fetch origin
git fetch --all
```

### File Operations
```bash
# Remove files
git rm file.txt                    # Remove from working tree and index
git rm --cached file.txt           # Remove from index only
git rm -r directory/               # Remove directory recursively

# Move/rename files
git mv old-name.txt new-name.txt

# Restore files
git restore file.txt               # Restore working tree file
git restore --staged file.txt      # Unstage file
git restore --source=HEAD~1 file.txt  # Restore from specific commit

# Show file differences
git diff                           # Working tree vs staging area
git diff --staged                  # Staging area vs last commit
git diff HEAD                      # Working tree vs last commit
git diff commit1 commit2           # Between commits
```

## Branching & Merging

### Branch Management
```bash
# List branches
git branch                         # Local branches
git branch -r                      # Remote branches
git branch -a                      # All branches

# Create and switch branches
git branch feature-branch          # Create branch
git checkout feature-branch        # Switch to branch
git checkout -b feature-branch     # Create and switch
git switch feature-branch          # Modern way to switch
git switch -c feature-branch       # Create and switch (modern)

# Delete branches
git branch -d feature-branch       # Delete merged branch
git branch -D feature-branch       # Force delete unmerged branch
git push origin --delete feature-branch  # Delete remote branch

# Rename branches
git branch -m old-name new-name    # Rename current branch
git branch -m old-name new-name    # Rename any branch
```

### Merging Strategies
```bash
# Merge branch into current branch
git merge feature-branch

# Merge with no fast-forward (always create merge commit)
git merge --no-ff feature-branch

# Squash merge (combine all commits into one)
git merge --squash feature-branch
git commit -m "Add feature X"

# Abort merge if conflicts
git merge --abort
```

### Rebasing
```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (edit commit history)
git rebase -i HEAD~3               # Last 3 commits
git rebase -i main                 # All commits since main

# Continue rebase after resolving conflicts
git rebase --continue

# Skip current commit during rebase
git rebase --skip

# Abort rebase
git rebase --abort

# Rebase and push (force push required)
git push --force-with-lease origin feature-branch
```

### Merge vs Rebase Visual

```
Before Merge:
main:     A---B---C
               \
feature:        D---E---F

After Merge:
main:     A---B---C-------M
               \         /
feature:        D---E---F

After Rebase:
main:     A---B---C---D'---E'---F'
```

## Advanced Git Commands

### Commit History
```bash
# View commit history
git log                           # Full log
git log --oneline                 # Condensed log
git log --graph                   # Graph view
git log --author="John Doe"       # Filter by author
git log --since="2023-01-01"      # Filter by date
git log --grep="bug"              # Search commit messages

# Show specific commit
git show commit-hash
git show HEAD                     # Latest commit
git show HEAD~1                   # Previous commit

# Find commits that changed a file
git log --follow -- file.txt
git blame file.txt                # Line-by-line commit history
```

### Stashing Changes
```bash
# Stash current changes
git stash                         # Stash with default message
git stash save "Work in progress" # Stash with message
git stash -u                      # Include untracked files

# List stashes
git stash list

# Apply stashes
git stash apply                   # Apply latest stash
git stash apply stash@{2}         # Apply specific stash
git stash pop                     # Apply and remove latest stash

# Drop stashes
git stash drop stash@{1}          # Drop specific stash
git stash clear                   # Clear all stashes

# Create branch from stash
git stash branch new-branch-name stash@{1}
```

### Reset & Revert
```bash
# Reset to previous commit
git reset --soft HEAD~1           # Keep changes staged
git reset --mixed HEAD~1          # Keep changes unstaged (default)
git reset --hard HEAD~1           # Discard all changes

# Revert commits (safe for shared branches)
git revert commit-hash            # Revert specific commit
git revert HEAD                   # Revert latest commit
git revert --no-commit HEAD~3..HEAD  # Revert range without committing

# Reset to specific commit
git reset --hard commit-hash
git reset --hard origin/main      # Reset to remote branch
```

## Branching Strategies

### Git Flow
```
main (production-ready)
│
├── develop (integration)
│   │
│   ├── feature/user-auth
│   ├── feature/payment
│   │
│   └── release/v1.2.0
│       │
│       └── hotfix/critical-bug
│
└── hotfix/security-patch (from main)
```

```bash
# Git Flow commands
git flow init                     # Initialize git flow
git flow feature start feature-name
git flow feature finish feature-name
git flow release start v1.0.0
git flow release finish v1.0.0
git flow hotfix start hotfix-name
git flow hotfix finish hotfix-name
```

### GitHub Flow (Simplified)
```
main (always deployable)
│
├── feature-branch-1
├── feature-branch-2
└── hotfix-branch
```

```bash
# GitHub Flow workflow
git checkout main
git pull origin main
git checkout -b feature/new-feature
# ... make changes and commit
git push -u origin feature/new-feature
# Create Pull Request on GitHub
# After review and merge, delete branch
git checkout main
git pull origin main
git branch -d feature/new-feature
```

### GitLab Flow
```
main (production)
│
├── pre-production (staging)
│   │
│   └── feature-branches
│
└── production (stable releases)
```

## Collaboration Workflows

### Fork & Pull Request
```bash
# 1. Fork repository on GitHub/GitLab
# 2. Clone your fork
git clone https://github.com/yourusername/repo.git
cd repo

# 3. Add upstream remote
git remote add upstream https://github.com/originalowner/repo.git

# 4. Keep fork synced
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# 5. Create feature branch
git checkout -b feature-branch

# 6. Make changes and push
git push -u origin feature-branch

# 7. Create Pull Request on platform
```

### Code Review Process
```bash
# Fetch PR branch for local review
git fetch origin pull/123/head:pr-123
git checkout pr-123

# Or add as remote branch
git fetch origin
git checkout -b review-branch origin/feature-branch

# Make suggestions
git checkout -b suggestion-branch review-branch
# ... make changes
git push -u origin suggestion-branch
```

## Troubleshooting Common Issues

### Merge Conflicts
```bash
# When conflict occurs during merge
git status                        # See conflicted files

# Edit files to resolve conflicts, then:
git add resolved-file.txt
git commit                        # Complete the merge

# Or abort merge
git merge --abort
```

### Undo Recent Changes
```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and unstage changes
git reset HEAD~1

# Completely undo last commit
git reset --hard HEAD~1

# Undo changes to specific file
git checkout HEAD -- file.txt
git restore file.txt              # Modern command

# Undo all uncommitted changes
git reset --hard HEAD
```

### Recover Lost Commits
```bash
# Find lost commits
git reflog                        # Show recent HEAD movements
git reflog --all                  # Show all refs

# Recover lost commit
git checkout commit-hash
git branch recovery-branch        # Create branch from lost commit

# Find deleted branches
git reflog --grep="checkout"
```

### Remote Issues
```bash
# Force push (dangerous - use with caution)
git push --force origin branch-name

# Safer force push (checks remote hasn't changed)
git push --force-with-lease origin branch-name

# Fix diverged branches
git pull --rebase origin main     # Rebase local commits on top of remote

# Update remote tracking
git remote prune origin           # Remove stale remote references
git fetch --prune                 # Fetch and prune in one command
```

### Large File Issues
```bash
# Remove file from history (dangerous)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch large-file.zip' \
  --prune-empty --tag-name-filter cat -- --all

# Modern way with git-filter-repo
git filter-repo --path large-file.zip --invert-paths

# Use Git LFS for large files
git lfs install
git lfs track "*.zip"
git add .gitattributes
git add large-file.zip
git commit -m "Add large file with LFS"
```

## Configuration & Aliases

### Git Configuration
```bash
# Global configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main

# Local repository configuration
git config user.name "Project Specific Name"
git config user.email "project@example.com"

# Other useful configs
git config --global core.editor "code --wait"
git config --global merge.tool vimdiff
git config --global pull.rebase true
git config --global push.default simple

# View configuration
git config --list
git config --global --list
```

### Useful Aliases
```bash
# Add aliases to ~/.gitconfig or via command line
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# Advanced aliases
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
git config --global alias.graph 'log --graph --oneline --decorate --all'
git config --global alias.conflicts 'diff --name-only --diff-filter=U'

# Use aliases
git co feature-branch
git st
git graph
```

## Git Hooks

### Pre-commit Hook Example
```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run tests before commit
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed. Commit aborted."
  exit 1
fi

# Check code style
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Commit aborted."
  exit 1
fi

echo "All checks passed. Proceeding with commit."
exit 0
```

### Commit Message Hook
```bash
#!/bin/sh
# .git/hooks/commit-msg

commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format!"
    echo "Format: type(scope): description"
    echo "Example: feat(auth): add login functionality"
    exit 1
fi
```

## Advanced Techniques

### Cherry-picking Commits
```bash
# Apply commit from another branch
git cherry-pick commit-hash

# Cherry-pick range
git cherry-pick start-commit..end-commit

# Cherry-pick without committing
git cherry-pick --no-commit commit-hash
```

### Submodules
```bash
# Add submodule
git submodule add https://github.com/user/repo.git path/to/submodule

# Clone with submodules
git clone --recurse-submodules https://github.com/user/main-repo.git

# Update submodules
git submodule update --init --recursive
git submodule update --remote

# Remove submodule
git submodule deinit path/to/submodule
git rm path/to/submodule
```

### Bisect for Bug Hunting
```bash
# Start bisect session
git bisect start
git bisect bad HEAD              # Current commit is bad
git bisect good v1.0.0           # Known good commit

# Git will checkout middle commit
# Test and mark as good or bad
git bisect good                  # If current commit is good
git bisect bad                   # If current commit is bad

# Git continues until it finds the first bad commit
git bisect reset                 # End bisect session
```

## Performance & Optimization

### Repository Maintenance
```bash
# Garbage collection
git gc                           # Basic cleanup
git gc --aggressive              # Thorough cleanup (slow)

# Optimize repository
git repack -ad                   # Repack all objects
git prune                        # Remove unreachable objects

# Check repository integrity
git fsck                         # Check filesystem consistency
git fsck --full                  # Full check

# Repository statistics
git count-objects -vH            # Object count and size
```

### .gitignore Patterns
```gitignore
# Comments start with #

# Ignore specific files
secrets.txt
config.local.json

# Ignore file types
*.log
*.tmp
*.swp

# Ignore directories
node_modules/
dist/
build/

# Ignore but track empty directory
logs/
!logs/.gitkeep

# Ignore everything in directory except specific files
temp/*
!temp/important.txt

# Ignore nested patterns
**/*.pyc
**/node_modules/

# Ignore based on path
src/config/local.json
!src/config/example.json
```

## Best Practices

### Commit Message Conventions
```
Type(Scope): Description

feat: add user authentication
fix: resolve memory leak in parser
docs: update API documentation
style: format code with prettier
refactor: simplify user validation
test: add unit tests for auth service
chore: update dependencies

# Body (optional)
More detailed explanation of the change

# Footer (optional)
Fixes #123
Breaking change: API endpoint changed
```

### Branch Naming Conventions
```
feature/user-authentication
bugfix/login-error-handling
hotfix/security-vulnerability
release/v1.2.0
experiment/new-algorithm
```

### Workflow Best Practices
- ✅ Commit early and often
- ✅ Write meaningful commit messages
- ✅ Keep commits focused and atomic
- ✅ Use branches for features and experiments
- ✅ Review code before merging
- ✅ Keep main branch stable and deployable
- ✅ Use tags for releases
- ✅ Document workflows in README
- ✅ Set up CI/CD pipelines
- ✅ Regularly sync with upstream

### Security Considerations
- ❌ Never commit passwords or API keys
- ❌ Don't commit large binary files
- ❌ Avoid force pushing to shared branches
- ✅ Use .gitignore for sensitive files
- ✅ Use Git LFS for large files
- ✅ Sign commits with GPG keys
- ✅ Use branch protection rules
- ✅ Enable two-factor authentication
---
name: git-workflow
description: >-
  Use this skill when managing git branches, creating features, preparing releases,
  applying hotfixes, or generating conventional commit messages according to the
  project's Gitflow strategy.
---

# Git Workflow & Branching Runbook

Follow these procedures for all version control operations.

## 1. Feature Development Lifecycle

### Step 1: Create Feature Branch

Always branch from the latest `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<feature-name>
```

_Example:_ `git checkout -b feature/product-filtering develop`

### Step 2: Make Commits (Conventional Commits)

Format: `<type>(<scope>): <short description>`

```bash
git add .
git commit -m "feat(product-filter): add multi-category selection filter"
```

### Step 3: Integrate Feature into `develop`

```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/<feature-name>
git branch -d feature/<feature-name>
git push origin develop
```

---

## 2. Release Lifecycle

### Step 1: Create Release Branch

```bash
git checkout -b release/<version> develop
```

_Example:_ `git checkout -b release/1.0.0 develop`

### Step 2: Finalize & Tag on `main`

```bash
git checkout main
git pull origin main
git merge --no-ff release/<version>
git tag -a <version> -m "Release version <version>"
git push origin main --tags
```

### Step 3: Backmerge into `develop`

```bash
git checkout develop
git merge --no-ff release/<version>
git push origin develop
git branch -d release/<version>
```

---

## 3. Hotfix Lifecycle

### Step 1: Branch from `main`

```bash
git checkout -b hotfix/<issue-name> main
```

### Step 2: Commit Fix & Merge into Both `main` and `develop`

```bash
# Merge into main
git checkout main
git merge --no-ff hotfix/<issue-name>
git tag -a <patch-version> -m "Hotfix for <issue-name>"
git push origin main --tags

# Merge into develop
git checkout develop
git merge --no-ff hotfix/<issue-name>
git push origin develop

# Clean up branch
git branch -d hotfix/<issue-name>
```

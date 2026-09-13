# Git Branching Strategy & Conventional Commits

This rule defines the Gitflow workflow and commit message formatting rules.

## 1. Branch Strategy (Gitflow)

- **`main` (or `master`):**
  - Production-ready code ONLY.
  - Merges into `main` come strictly from `release/*` or `hotfix/*` branches.
  - Every merge into `main` must be tagged with a semantic version (e.g., `v1.0.0`).

- **`develop`:**
  - Main integration branch for ongoing development.
  - All feature branches branch off of and merge back into `develop`.

- **`feature/<feature-name>`:**
  - Created from: `develop`
  - Merge into: `develop` (using `--no-ff` merge commits)
  - Naming: `feature/user-authentication`, `feature/product-filtering`

- **`release/<version>`:**
  - Created from: `develop`
  - Merge into: `main` AND `develop` (using `--no-ff`)
  - Naming: `release/1.0.0`, `release/1.1.0`

- **`hotfix/<issue-name>`:**
  - Created from: `main`
  - Merge into: `main` AND `develop` (using `--no-ff`)
  - Naming: `hotfix/fix-login-auth`, `hotfix/security-patch-jwt`

---

## 2. Commit Message Convention

Format:

```text
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation changes only.
- `style`: Formatting, missing semicolons, CSS tweaks (no code logic changes).
- `refactor`: Code restructuring without fixing a bug or adding a feature.
- `perf`: Code change that improves performance.
- `test`: Adding or correcting tests.
- `chore`: Build process, package updates, configuration adjustments.

### Examples

- `feat(auth): implement oauth login provider with google`
- `fix(button): prevent multiple clicks while in loading state`
- `refactor(user-profile): extract header section to molecule component`
- `test(product-search): add unit tests for debounce filtering hook`

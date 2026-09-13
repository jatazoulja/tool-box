---
name: code-review-standards
description: >-
  Use this skill when auditing, refactoring, or reviewing React code against
  the project's SOLID principles, Atomic Fractal architectural rules, naming
  conventions, and performance standards.
---

# Code Review & Architectural Audit Skill

Execute this systematic checklist when inspecting or refactoring components, features, or pages.

## Audit Checklist

### 1. SOLID & Architectural Layer Compliance

- [ ] **Layer Integrity:** Is the component placed in the correct directory (`atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`, `features/`)?
- [ ] **Single Responsibility Principle:** Does each component/function do exactly one thing? Is data fetching separated into hooks/services?
- [ ] **Feature Modularity:** Are internal feature files encapsulated behind `src/features/<feature>/index.js`? Are cross-feature direct imports avoided?

### 2. State & Immutability

- [ ] **No In-Place Mutation:** Are arrays/objects cloned properly (`[...arr]`, `{...obj}`, `.map()`, `.filter()`) instead of mutating state references?
- [ ] **Controlled Form Elements:** Are form inputs controlled with React state?
- [ ] **Key Prop:** Are list elements given unique, stable IDs as keys (and not dynamic array indexes)?

### 3. Naming & Style

- [ ] **Components & Folders:** PascalCase (e.g., `UserProfile/UserProfile.jsx`).
- [ ] **Hooks:** `use<HookName>` prefix.
- [ ] **Event Handlers:** Prefix `handle<Action>` internally, `on<Action>` for callback props.
- [ ] **CSS Modules:** `kebab-case` classes in `.module.css`, camelCase when referenced in JSX.
- [ ] **Constants:** `UPPER_SNAKE_CASE`.

### 4. Performance & Error Handling

- [ ] **Memoization:** Are pure presentational components wrapped in `React.memo` where appropriate?
- [ ] **Stable Callbacks:** Are callbacks passed to memoized children wrapped in `useCallback`?
- [ ] **Lazy Loading:** Are page/screen routes code-split via `React.lazy()` and `<Suspense>`?
- [ ] **Error Boundaries:** Are critical UI segments wrapped in error boundaries or handling async errors with try-catch?

---

## Remediation Workflow

1. Identify any violation from the checklist.
2. Formulate a refactoring plan to decouple or relocate the code to its proper layer.
3. Verify test coverage and linting.

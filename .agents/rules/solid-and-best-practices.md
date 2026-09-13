# SOLID Principles & React Coding Best Practices

This rule outlines the engineering standards and SOLID principles enforced across this codebase.

## 1. SOLID Principles in React

### Single Responsibility Principle (SRP)

- **One Component, One Job:** Every component must have a single, well-defined responsibility.
  - Separate UI presentation from data fetching and business logic.
  - Move data fetching and state orchestration to custom hooks (`src/hooks/` or `src/features/<feature>/hooks/`).
  - Move network calls to dedicated service modules (`src/services/` or `src/features/<feature>/services/`).
- **Decomposition:** Break large/monolithic components into smaller, focused sub-components. If a component exceeds ~150-200 lines, extract sub-molecules or sub-organisms.

### Open/Closed Principle (OCP)

- Components should be open for extension but closed for modification.
- Use composition (`children`, render props, compound components) to extend component behavior rather than bloated boolean prop flags.

### Liskov Substitution Principle (LSP)

- Derived/specialized components (e.g., `IconButton`) must be substitutable for their base components (e.g., `Button`) without breaking consumer expectations or DOM props.

### Interface Segregation Principle (ISP)

- Components and hooks should not depend on props or interfaces they do not use.
- Avoid passing massive monolithic objects (e.g., passing whole `user` entity when the component only needs `avatarUrl` and `username`).

### Dependency Inversion Principle (DIP)

- High-level UI components should depend on abstractions (custom hooks, context interfaces, service layers) rather than low-level implementation details (direct `fetch`/`axios` calls inside UI components).

---

## 2. Core React Best Practices

### Declarative Programming

- Describe _what_ the UI should look like for a given state, never manually manipulate the DOM or virtual DOM references directly.

### Immutability & State Management

- Never mutate state objects or arrays in-place.
- Always create new references using object spread `{ ...prev }`, array spread `[ ...items ]`, or pure array methods (`.map()`, `.filter()`, `.concat()`, `.slice()`).
- Keep state local to where it is used. Elevate state to common ancestors only when multiple components need to synchronize.

### Controlled Components

- All form inputs (`<input>`, `<select>`, `<textarea>`) must be controlled via React state unless explicitly building an unmanaged performance-critical canvas or file input with `useRef`.

### Unique List Keys

- Always provide a stable, unique `key` prop when rendering lists (`item.id`).
- **Never** use array index as a key for dynamic lists that can be reordered, filtered, added, or deleted.

### Conditional Rendering & Early Returns

- Prefer early returns for guard clauses, loading states, and error states to keep JSX nesting shallow.
- Use explicit ternaries `condition ? <A /> : <B />` or null checks `condition ? <A /> : null` when falsy values like `0` or `NaN` might inadvertently render.

### Performance & Optimization

- Use `React.memo` for pure presentational atoms/molecules that re-render frequently with identical props.
- Use `useCallback` for event handler callbacks passed down to memoized child components.
- Use `useMemo` for computationally expensive derivations.
- Use code splitting via `React.lazy()` and `<Suspense>` for screen/page-level routing boundaries.

### Error Boundaries & Resilience

- Wrap major screen regions and feature organisms in React Error Boundaries to prevent full-app crashes.
- Handle async errors in services/hooks gracefully with `try...catch` and structured error state objects `{ error, isError }`.

### Testing

- Every component, custom hook, and service should be verifiable with unit and integration tests (Jest, React Testing Library).
- Test user behavior and accessibility roles, not implementation details.

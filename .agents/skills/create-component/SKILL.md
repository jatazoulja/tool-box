---
name: create-component
description: >-
  Use this skill when creating a new component within a screen or parent component.
  Enforces Fractal sub-node architecture with index.tsx, index.css, and optional
  nested components/, dto/, services/, stores/, and utils/.
---

# Create Component Workflow (Fractal Architecture)

Follow this procedure when creating a new child component inside any parent (Screen or Component).

## 1. The Fractal Concept

Every component is a sub-node that mirrors the architecture of its parent:

```text
parent/components/<ComponentName>/
├── index.tsx              # Component entry point & render logic
├── index.css              # Component-scoped styling
├── components/            # (Optional) Nested sub-molecules / atoms
├── dto/                   # (Optional) Component-specific DTOs/types
├── services/              # (Optional) Component-specific API logic
├── stores/                # (Optional) Component-specific state / hooks
└── utils/                 # (Optional) Component-specific helpers
```

---

## 2. Step-by-Step Procedure

### Step 1: Create Component Directory

Create `components/<ComponentName>/` inside the parent's directory.

### Step 2: Write `<ComponentName>/index.tsx`

```tsx
// components/<ComponentName>/index.tsx
import React from 'react';
import './index.css';

export interface ComponentNameProps {
  title: string;
  onAction?: () => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onAction,
}) => {
  return (
    <div className="component-name">
      <h3>{title}</h3>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="component-name__btn"
        >
          Action
        </button>
      )}
    </div>
  );
};

export default ComponentName;
```

### Step 3: Write `<ComponentName>/index.css`

```css
.component-name {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.component-name__btn {
  padding: 6px 12px;
  cursor: pointer;
}
```

---

## 3. Strict Boundary Rules

1. **Sibling Agnostic:** This component CANNOT import from any other sibling component in `parent/components/`.
2. **Upward Visibility:** This component can import from its direct `parent/` (e.g., `parent/dto`, `parent/stores`, `parent/utils`) or global `src/utils`.
3. **Public Interface:** The parent imports this component ONLY via `./components/<ComponentName>`.

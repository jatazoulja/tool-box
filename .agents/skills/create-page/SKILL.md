---
name: create-page
description: >-
  Use this skill when creating a new screen or page in the application.
  Scaffolds a self-contained fractal node under `src/screen/<ScreenName>/`
  with index.tsx, index.css, components/, dto/, services/, stores/, and utils/.
---

# Create Screen / Page Workflow (Fractal Architecture)

Follow this procedure when creating a new Screen in the application.

## 1. Directory Structure

Every screen in `src/screen/` is a top-level fractal node:

```text
src/screen/<ScreenName>/
├── index.tsx              # Screen entry point & layout orchestrator
├── index.css              # Screen-scoped styling
├── components/            # Sub-components private to this screen
│   └── <SubComponent>/    # Nested fractal nodes
├── dto/                   # Screen-level TypeScript DTOs, interfaces & models
├── services/              # Screen-level API calls & HTTP operations
├── stores/                # Screen-level state management, custom hooks, or context
└── utils/                 # Screen-level pure helper functions
```

---

## 2. Step-by-Step Scaffolding

### Step 1: Scaffold Folder Structure

Create the directory `src/screen/<ScreenName>/` and the required subdirectories:

- `components/`
- `dto/`
- `services/`
- `stores/`
- `utils/`
- `index.tsx`
- `index.css`

### Step 2: Define Data Contracts (`dto/`)

Create type definitions in `dto/` for this screen:

```typescript
// src/screen/<ScreenName>/dto/index.ts
export interface SampleItemDto {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}
```

### Step 3: Implement Services (`services/`)

Encapsulate screen API interactions in `services/`:

```typescript
// src/screen/<ScreenName>/services/sample-service.ts
import { SampleItemDto } from '../dto';

export const sampleService = {
  fetchItems: async (): Promise<SampleItemDto[]> => {
    // API network logic
    return [];
  },
};
```

### Step 4: Implement State Management / Hooks (`stores/`)

```typescript
// src/screen/<ScreenName>/stores/use-sample-store.ts
import { useState, useEffect, useCallback } from 'react';
import { SampleItemDto } from '../dto';
import { sampleService } from '../services/sample-service';

export const useSampleStore = () => {
  const [items, setItems] = useState<SampleItemDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await sampleService.fetchItems();
      setItems(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return { items, isLoading, loadItems };
};
```

### Step 5: Implement Entry Point (`index.tsx`)

```tsx
// src/screen/<ScreenName>/index.tsx
import React from 'react';
import { useSampleStore } from './stores/use-sample-store';
import './index.css';

export const SampleScreen: React.FC = () => {
  const { items, isLoading } = useSampleStore();

  if (isLoading)
    return <div className="sample-screen__loading">Loading...</div>;

  return (
    <div className="sample-screen">
      <h1>Sample Screen</h1>
      {/* Compose child components from ./components/ */}
    </div>
  );
};

export default SampleScreen;
```

---

## 3. Boundary Verification

- [ ] No cross-imports from sibling screens.
- [ ] Child components inside `components/` are isolated from each other.
- [ ] Only global utilities (`src/utils`, `src/services`) or direct ancestor data are imported from outside.

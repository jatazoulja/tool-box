---
name: create-feature
description: >-
  Use this skill when scaffolding a new business feature or domain module
  (e.g., auth, products, checkout). Enforces modularity, separation of concerns,
  encapsulated hooks, service clients, and clean public barrel exports.
---

# Create Feature Module Workflow

Use this workflow to implement self-contained, modular feature packages inside `src/features/<feature-name>/`.

## 1. Feature Directory Structure

```text
src/features/<feature-name>/
├── components/          # Feature-specific UI components
│   ├── <FeatureComponent>.jsx
│   └── ...
├── hooks/               # Custom hooks encapsulating state & feature logic
│   ├── use<FeatureName>.js
│   └── ...
├── services/            # API clients & network transport for this feature
│   ├── <feature-name>-api.js
│   └── ...
├── utils/               # Feature-specific data transformations/helpers
│   ├── <feature-name>-helpers.js
│   └── ...
└── index.js             # Public API surface (Barrel Export)
```

---

## 2. Step-by-Step Scaffolding

### Step 1: Create Feature API Service

Create `src/features/<feature-name>/services/<feature-name>-api.js` using pure functions:

```javascript
// src/features/auth/services/auth-api.js
import { apiClient } from '../../../services/api-client';

export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  fetchCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
```

### Step 2: Create Custom Hook for State & Business Logic

Create `src/features/<feature-name>/hooks/use<FeatureName>.js`:

```javascript
// src/features/auth/hooks/useAuth.js
import { useState, useCallback, useEffect } from 'react';
import { authApi } from '../services/auth-api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { user, isLoading, error, login };
};
```

### Step 3: Create Feature Components

Create specific components under `src/features/<feature-name>/components/`. Components should consume feature hooks and compose design system atoms/molecules.

### Step 4: Expose Public API in `index.js`

Only export what external consumers (pages, router) need:

```javascript
// src/features/auth/index.js
export { useAuth } from './hooks/useAuth';
export { LoginForm } from './components/LoginForm';
export { SignupForm } from './components/SignupForm';
```

---

## 3. Modularity Rules

- **Encapsulation:** External modules must NOT import from `src/features/auth/hooks/useAuth.js` directly; always import from `src/features/auth`.
- **Decoupling:** Features must not depend on or import sibling features directly. If two features share logic, extract it to global `src/hooks/`, `src/services/`, or `src/utils/`.

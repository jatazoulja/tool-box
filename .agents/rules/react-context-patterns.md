# React Context State Management Pattern

This rule standardizes state management across the application using **Pure React Context API and Custom Hooks**. External store libraries (Redux, Zustand, MobX) are strictly prohibited.

---

## 1. Core State Principles

1. **Context for Domain, Business & Screen Data:**
   - All server data, business logic, global state, user session, and multi-component screen state MUST be managed via React Context providers located in `<Node>/stores/`.
2. **Component State for Local UI Only:**
   - Standard `useState` inside a component is reserved strictly for local, non-shared UI state (e.g., input text before submission, modal open/close, dropdown toggle, hover state).
3. **No Sibling Leakage:**
   - Context is localized to the fractal node that owns it. Child components consume the context upward; sibling screens never share internal contexts directly.

---

## 2. Standard Context & Reducer Blueprint

Every context in `<Node>/stores/<Name>Context.tsx` must follow this exact typed architecture:

```tsx
// src/screen/<ScreenName>/stores/<Entity>Context.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import type { EntityDTO } from '../dto/<Entity>DTO';
import { fetchEntitiesApi } from '../services/<entity>.services';

// 1. State Contract
type State = {
  data: EntityDTO[];
  loading: boolean;
  error: string | null;
};

// 2. Action Union
type Action =
  | { type: 'FETCH_DATA_START' }
  | { type: 'FETCH_DATA_SUCCESS'; payload: EntityDTO[] }
  | { type: 'FETCH_DATA_ERROR'; payload: string };

// 3. Initial State
const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

// 4. Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_DATA_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_DATA_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_DATA_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// 5. Context Interface
interface ContextValue {
  state: State;
  fetchData: () => Promise<void>;
}

const EntityContext = createContext<ContextValue | null>(null);

// 6. Provider Component
export const EntityProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      dispatch({ type: 'FETCH_DATA_START' });
      const response = await fetchEntitiesApi();
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'FETCH_DATA_ERROR',
        payload:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    }
  }, []);

  return (
    <EntityContext.Provider value={{ state, fetchData }}>
      {children}
    </EntityContext.Provider>
  );
};

// 7. Guarded Consumer Hook
export const useEntity = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('useEntity must be used within an EntityProvider');
  }
  return context;
};
```

---

## 3. Provider Wrapping Pattern in Screens

The Screen orchestrator (`index.tsx`) wraps its content inside its dedicated Provider:

```tsx
// src/screen/<ScreenName>/index.tsx
import React from 'react';
import { EntityProvider } from './stores/<Entity>Context';
import { ScreenContent } from './components/ScreenContent';

export const ScreenName: React.FC = () => {
  return (
    <EntityProvider>
      <ScreenContent />
    </EntityProvider>
  );
};

export default ScreenName;
```

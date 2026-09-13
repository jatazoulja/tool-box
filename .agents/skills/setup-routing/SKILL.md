---
name: setup-routing
description: >-
  Use this skill when configuring or adding routes in react-router-dom.
  Enforces 1:1 mapping between `src/screen/<ScreenName>/<SubScreen>` directory
  structure and kebab-case URL paths, React.lazy code splitting, and Chakra UI loaders.
---

# Setup Routing Workflow (React Router + Fractal Screens)

Follow this procedure when creating or updating route definitions in `react-router-dom`.

---

## 1. Directory to URL Mapping Formula

Convert `PascalCase` screen folders to `kebab-case` URL paths:

- `src/screen/SamplePage` $\rightarrow$ `/sample-page`
- `src/screen/SamplePage/SampleSubPage` $\rightarrow$ `/sample-page/sample-subpage`

---

## 2. Step-by-Step Procedure

### Step 1: Scaffold Screen Node

Ensure the target screen exists at `src/screen/<ScreenName>/index.tsx` (or nested `src/screen/<Parent>/<Child>/index.tsx`).

### Step 2: Register Route with Lazy Loading

Add the route to the central router (`src/routes/index.tsx` or `src/App.tsx`):

```tsx
import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';

const FallbackLoader = () => (
  <Center minH="400px" w="full">
    <Spinner size="lg" />
  </Center>
);

const ScreenComponent = React.lazy(() => import('@/screen/<ScreenName>'));
const SubScreenComponent = React.lazy(
  () => import('@/screen/<ScreenName>/<SubScreen>'),
);

export const router = createBrowserRouter([
  {
    path: '/<screen-name>',
    element: (
      <Suspense fallback={<FallbackLoader />}>
        <ScreenComponent />
      </Suspense>
    ),
    children: [
      {
        path: '<sub-screen>',
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <SubScreenComponent />
          </Suspense>
        ),
      },
    ],
  },
]);
```

### Step 3: Handle Nested Outlets (If Applicable)

If the parent screen contains layout elements (e.g. sub-navigation, tabs, sidebars) shared across sub-screens, render `<Outlet />` inside `src/screen/<ScreenName>/index.tsx`:

```tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export const ParentScreen: React.FC = () => {
  return (
    <Box>
      {/* Shared Parent Layout & Navigation */}
      <Outlet />
    </Box>
  );
};
```

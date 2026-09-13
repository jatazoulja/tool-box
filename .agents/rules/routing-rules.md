# Fractal Screen Routing Rules

In this application, **file paths in `src/screen/` map 1:1 to browser URL routes**.

---

## 1. Directory-to-URL Mapping Convention

Every screen folder name is written in `PascalCase`, and maps directly to a `kebab-case` URL path segment:

| Screen File Path                                     | Browser URL Route                 |
| :--------------------------------------------------- | :-------------------------------- |
| `src/screen/SamplePage/index.tsx`                    | `/sample-page`                    |
| `src/screen/SamplePage/SampleSubPage/index.tsx`      | `/sample-page/sample-subpage`     |
| `src/screen/UserProfile/Settings/Security/index.tsx` | `/user-profile/settings/security` |
| `src/screen/Dashboard/index.tsx`                     | `/dashboard` (or `/`)             |

---

## 2. Nested Sub-Screen Architecture

When a screen has sub-screens (e.g. `SampleSubPage` inside `SamplePage`):

1. Place the sub-screen in `src/screen/<ParentScreen>/<ChildSubScreen>/`.
2. The sub-screen is a self-contained fractal node (`index.tsx`, `index.css`, `stores/`, `dto/`, `services/`, `components/`).
3. The parent screen (`SamplePage/index.tsx`) can render an `<Outlet />` from `react-router-dom` to embed child routes, or the child screen can be rendered as a standalone nested route.

---

## 3. Dynamic sub-screen exception

Use a dynamic child route only when a set of pages shares one genuinely common
screen implementation. Keep the implementation as a real child screen, then
document the exception in the route configuration. For example:

```text
src/screen/Converter/Category/index.tsx -> /converter/:categoryId
```

`Converter` owns the `/converter` catalog. `Category` owns resolution and all
category-specific UI, state, utilities, services, and nested components. This
preserves DRY behavior without placing child-screen responsibilities in the
parent screen.

---

## 4. Route Configuration & Lazy Loading

All screen routes MUST be code-split using `React.lazy()` with `<Suspense>` fallbacks:

```tsx
// src/routes/index.tsx
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

const PageLoader = () => (
  <Center h="100vh">
    <Spinner size="xl" color="colorPalette.solid" />
  </Center>
);

const SamplePage = React.lazy(() => import("@/screen/SamplePage"));
const SampleSubPage = React.lazy(
  () => import("@/screen/SamplePage/SampleSubPage"),
);

export const router = createBrowserRouter([
  {
    path: "/sample-page",
    element: (
      <Suspense fallback={<PageLoader />}>
        <SamplePage />
      </Suspense>
    ),
    children: [
      {
        path: "sample-subpage",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SampleSubPage />
          </Suspense>
        ),
      },
    ],
  },
]);
```

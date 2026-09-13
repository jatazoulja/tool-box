# True Atomic Fractal Architecture & Global Layer Rules

The codebase is organized using a **Pure Fractal Modular Architecture** for screens alongside a **Central Global Utilities Infrastructure** (`src/utils/`).

---

## 1. Complete Directory Hierarchy

```text
src/
├── config/                        # Global environment & runtime configuration
│   └── global-config.ts
├── utils/                         # Global Shared Agnostic Infrastructure
│   ├── components/                # Global agnostic UI primitives (buttons, inputs, modals)
│   ├── functions/                 # Global pure algorithmic & calculation functions
│   ├── helpers/                   # Global data formatting, parsing & sanitization helpers
│   ├── hocs/                      # Global Higher-Order Components (withAuth, withErrorBoundary)
│   ├── hooks/                     # Global custom React hooks (useDebounce, useMediaQuery)
│   ├── interface/                 # Global shared interfaces, contracts & base DTOs
│   └── services/                  # Global base HTTP client, interceptors & network utilities
└── screen/
    └── <ScreenName>/              # Level 1 Fractal Node (Screen)
        ├── index.tsx              # Entry point & Orchestrator
        ├── index.css              # Node-scoped styling (or Chakra props)
        ├── components/            # Child sub-components (recursive fractal nodes)
        │   └── <ChildComponent>/
        │       ├── index.tsx
        │       ├── index.css
        │       ├── components/
        │       ├── dto/
        │       ├── services/
        │       ├── stores/
        │       └── utils/
        ├── dto/                   # Screen-specific TypeScript types & interfaces
        ├── services/              # Screen-specific API / network transport
        ├── stores/                # Screen-specific React Context providers & hooks
        └── utils/                 # Screen-specific pure helper functions
```

---

## 2. Responsibilities of `src/utils/` Subdirectories

- **`src/utils/components/`**: Pure UI primitive building blocks shared across screens (e.g. specialized loading overlays, brand icons, base dialog wrappers).
- **`src/utils/functions/`**: Pure calculation and algorithmic logic (e.g., currency math, sorting algorithms, matrix transforms).
- **`src/utils/helpers/`**: Data formatting, string manipulation, date parsing, regex validation.
- **`src/utils/hocs/`**: Reusable Higher-Order Components that inject behavior across screens (e.g., `withAuth`, `withTelemetry`).
- **`src/utils/hooks/`**: Global utility hooks that are independent of any single business domain (e.g., `useDebounce`, `useLocalStorage`, `useEventListener`, `useIsMobile`).
- **`src/utils/interface/`**: Global shared types, base API response types, pagination types, user identity contracts.
- **`src/utils/services/`**: Base Axios/Fetch HTTP client instance, request/response interceptors, auth token refresh logic, error normalization.

---

## 3. Ownership guardrails

1. **Screen ownership:** A screen owns only its landing view and components
   that serve that landing view. A sub-screen owns its route-specific views,
   state, utilities, services, and nested components.
2. **Single component per node:** Do not place multiple independently useful
   React components in one `index.tsx`. Extract each child into
   `components/<ChildName>/index.tsx`; recursively apply the same rule to
   nested controls.
3. **Nearest shared ancestor:** Put a contract, catalog, utility, or service at
   the lowest ancestor that needs it. Do not leave category-specific behavior
   in a parent screen merely because its child can import it.
4. **Move hygiene:** When responsibilities move, remove the old implementation
   and any empty legacy directories after verifying they contain no files.

---

## 4. Boundary & Visibility Rules

1. **🚫 Zero Sibling Leaks:** Sibling components inside the same parent `components/` CANNOT import from each other.
2. **⬆️ Upward Visibility:** Child nodes can consume stores, services, and DTOs from their parent/ancestor nodes or the global `src/utils/` submodules.
3. **⬇️ Downward Encapsulation:** Parents interact with child components solely via `components/<ChildName>/index.tsx`.
4. **🌐 Global Consumption:** Any screen or subcomponent in `src/screen/` can import from `src/utils/*` or `src/config/*`.
5. **🚫 No Upward Reverse Dependency:** Files in `src/utils/*` and `src/config/*` **must NEVER import** from `src/screen/*`.

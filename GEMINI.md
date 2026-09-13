# Converter: Canonical Agent Instructions

This is the canonical instruction set for every AI agent working in this repository, including Gemini, Codex, and editor-integrated agents. Read it before making changes. It defines the core tech stack, fractal architecture, global shared layers, state-management patterns, and engineering principles for this application.

## Instruction precedence

1. Explicit user request and repository safety requirements.
2. This file (`GEMINI.md`).
3. The task-specific rule in `.agents/rules/` or workflow in `.agents/skills/`.
4. Existing local conventions, when they do not conflict with the above.

`AGENTS.md` is deliberately a short compatibility entry point for tools that discover only that filename; it directs agents back to this document. Keep both files aligned when changing instruction discovery.

---

## Mandatory agent preflight

Before creating, moving, or changing any component, module, or screen, agents
must read these rules in full for the current turn:

1. `.agents/rules/atomic-fractal-architecture.md`
2. `.agents/rules/solid-and-best-practices.md`
3. `.agents/rules/routing-rules.md` when the work creates or changes a screen
   or route.

Do not define several independently meaningful components in one file. A
screen's `index.tsx` orchestrates only; each owned view or control is a child
fractal node under that screen's `components/` directory. A child screen owns
all category-, route-, or state-specific components, utilities, and services.
Place shared data or behavior at the nearest common ancestor only when both
that ancestor and its children genuinely consume it.

After a move, delete obsolete files and verified-empty directories. Do not
leave stale component folders that imply the wrong ownership boundary.

---

## 1. Locked-In Technology Stack

- **Package Manager:** **Yarn** (`yarn`, `yarn add`, `yarn dev`, `yarn build`)
- **Language:** TypeScript (Strict mode enabled, full type safety via `dto/` and `src/utils/interface/`)
- **Core Library:** React (Functional components, custom hooks)
- **Build Tool & Bundler:** Vite
- **Routing:** `react-router-dom` (URL paths map 1:1 to `src/screen/<ScreenName>/<SubScreen>` in kebab-case)
- **State Management:** **Pure React Context API & Custom Hooks ONLY.**
  - 🚫 **No external store libraries** (No Redux, Zustand, MobX, Recoil). Keep the architecture lean, native, and unbloated.
  - Global, user, business, and screen-wide data live in Context providers inside `<Node>/stores/`.
  - Component `useState` is strictly reserved for local UI state.
- **UI Framework:** **Chakra UI (v3)** (`@chakra-ui/react`, `@emotion/react`, snippets via `@chakra-ui/cli`).
- **AI MCP Server:** `@chakra-ui/react-mcp` configured in `.agents/mcp_config.json` and `.vscode/mcp.json`.

---

## 2. Directory Architecture & Layer Breakdown

The project combines a **Central Global Infrastructure (`src/utils/`, `src/config/`)** with an **Autonomous Fractal Screen Layer (`src/screen/`)**:

```text
src/
├── config/                        # Global environment & runtime configuration
│   └── global-config.ts
├── utils/                         # Global Agnostic Shared Layer
│   ├── components/                # Global agnostic UI primitives (shared buttons, inputs, icons)
│   ├── functions/                 # Global pure algorithmic & calculation functions
│   ├── helpers/                   # Global data formatting & parsing helpers
│   ├── hocs/                      # Global Higher-Order Components (withAuth, withErrorBoundary)
│   ├── hooks/                     # Global custom React hooks (useDebounce, useMediaQuery, useWindowSize)
│   ├── interface/                 # Global shared interfaces, contracts & base DTOs
│   └── services/                  # Global base HTTP client, interceptors & network utilities
└── screen/
    └── <ScreenName>/              # Level 1 Fractal Node (Screen)
        ├── index.tsx              # Entry point & Orchestrator (Single Responsibility)
        ├── index.css              # Node-scoped styling (or Chakra sx/props)
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

## 3. Strict Boundary & Visibility Rules

1. **🚫 Zero Sibling Leaks:** Sibling components inside the same parent `components/` CANNOT import from each other. They are 100% agnostic.
2. **⬆️ Upward Visibility:** Child nodes can consume stores (React Context), services, and DTOs from their parent/ancestor nodes or the global `src/utils/` submodules.
3. **⬇️ Downward Encapsulation:** Parents interact with child components solely via `components/<ChildName>/index.tsx`.
4. **🌐 Global Consumption:** All nodes in `src/screen/` can import from `src/utils/*` (e.g. `@/utils/hooks`, `@/utils/services`, `@/utils/components`).
5. **📦 Self-Contained:** Moving or deleting a screen folder deletes its entire functional slice without leaving dead code behind.

---

## 4. SOLID & State Engineering Rules

- **Single Responsibility (SRP):** `index.tsx` orchestrates UI; `services/` handles network; `stores/` provides React Context / hooks; `dto/` defines contracts; `utils/` handles data transformations.
- **State via React Context:** Create lightweight React Context providers inside `<Node>/stores/` when multiple child components within that node need shared state.
- **Immutability:** State is strictly immutable. Use object spread `{...state}` and pure array operations (`map`, `filter`, `reduce`).
- **Controlled Inputs:** All form controls must use React state.
- **Chakra UI Layouts:** Use `Box`, `Flex`, `HStack`, `VStack`, `Grid`, and `Stack` layout primitives.

---

## 5. AI workflow resources

These resources are available to compatible agents. They are guidance, not a requirement to invoke a named subagent or a tool that is unavailable in the current environment.

- **Review profile:**
  - **`fractal_architect_agent`**: Automated code auditor for verifying zero sibling leaks, Context patterns, global utils usage, and fractal compliance.
- **Task workflows:**
  - **`chakra-ui`**: Guide for Chakra UI v3 primitives, snippets, tokens, and MCP tools.
  - **`setup-routing`**: Runbook for mapping fractal screen folders 1:1 to kebab-case URL routes with `React.lazy()`.
  - **`create-page`**: Scaffolding runbook for new screens under `src/screen/<ScreenName>/`.
  - **`create-component`**: Scaffolding runbook for fractal sub-components.
  - **`create-feature`**: Feature package scaffolding guide.
  - **`code-review-standards`**: Audit checklist for SOLID principles, global utils segregation, and sibling isolation.
  - **`git-workflow`**: Gitflow branch management and conventional commits.
- **Detailed rules (`.agents/rules/`):**
  - `atomic-fractal-architecture.md`
  - `react-context-patterns.md`
  - `routing-rules.md`
  - `solid-and-best-practices.md`
  - `naming-conventions.md`
  - `git-strategy.md`

## 6. Required completion checks

- Run `yarn build` after changing application code, routes, dependencies, TypeScript configuration, or Vite configuration.
- Format changed source and configuration files with Prettier before completing work. Do not hand-format around Prettier output.
- Keep every source, style, configuration, and documentation file at **500 lines or fewer**. Split a file by responsibility before it exceeds this limit; generated build artifacts are exempt.
- Use an **80-character print width** for source and documentation. Prettier is authoritative for unavoidable exceptions, such as long URLs, import paths, or string literals that cannot be safely split.
- Do not add an external state library; shared state remains React Context plus custom hooks.
- Do not create sibling-component imports. Move shared state or behavior to the owning parent node or a permitted ancestor/global layer.
- Preserve `React.lazy()` and `Suspense` route loading for every screen route.
- Do not assume this workspace has Git metadata. If it is not a Git repository, report that limitation instead of running branching or commit workflows.

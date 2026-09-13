# Naming Conventions & Code Style

Strict naming conventions ensure clarity, predictability, and uniform searchability across the codebase.

## 1. Components & Folders

- **React Components:** `PascalCase` (e.g., `UserProfile`, `ProductCard`, `Button`, `FormField`).
- **Component Folders:** `PascalCase` matching component name (e.g., `src/atoms/Button/`, `src/pages/UserProfilePage/`).
- **Component Files:** `PascalCase.js` / `.jsx` / `.tsx` (e.g., `Button.js`, `Button.module.css`, `index.js`).

## 2. Functions & Event Handlers

- **General Functions:** `camelCase` (e.g., `formatCurrency`, `calculateTotal`, `fetchUserData`).
- **React Event Handlers:** Prefix with `handle` (e.g., `handleClick`, `handleInputChange`, `handleFormSubmit`).
- **Callback Props:** Prefix with `on` (e.g., `onClick`, `onChange`, `onSaveSuccess`).

## 3. Variables, Props & State

- **Variables & Props:** `camelCase` (e.g., `userName`, `isLoading`, `userData`, `isActive`).
- **State Variables & Setters:** `const [isOpen, setIsOpen] = useState(false);` (use boolean prefixes `is`, `has`, `should`).
- **Global Constants:** `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`, `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`).

## 4. Custom Hooks

- **Prefix:** Must start with `use` followed by `PascalCase` (e.g., `useDebounce`, `useAuth`, `useProductSearch`, `useLocalStorage`).

## 5. CSS & Styling

- **CSS Class Names:** `kebab-case` (e.g., `user-profile`, `product-card__title`, `is-active`).
- **CSS Module Imports in JS:** `camelCase` (e.g., `import styles from './Button.module.css'`, referenced as `styles.primaryButton`).

## 6. Utilities, Services & General Files

- **Utility / Service Folders & Files:** `kebab-case` (e.g., `src/utils/date-helpers.js`, `src/services/api-client.js`, `src/features/auth/services/auth-api.js`).

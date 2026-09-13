/**
 * Global Application Configuration
 * Dynamically loads and validates environment variables per mode (local, dev, prod).
 */

export const GLOBAL_CONFIG = {
  APP_ENV: import.meta.env.VITE_APP_ENV || 'local',
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Converter App',
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  ENABLE_MOCKS: import.meta.env.VITE_ENABLE_MOCKS === 'true',
  DEFAULT_TIMEOUT_MS: 15000,
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
  },
  IS_LOCAL: (import.meta.env.VITE_APP_ENV || 'local') === 'local',
  IS_DEV: import.meta.env.VITE_APP_ENV === 'dev',
  IS_PROD: import.meta.env.VITE_APP_ENV === 'prod',
} as const;

export type GlobalConfig = typeof GLOBAL_CONFIG;

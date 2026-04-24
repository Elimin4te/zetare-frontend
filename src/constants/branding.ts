import { appConfig } from 'config/appConfig';

/**
 * Default branding for ZetaRe (frontend) deployed for Flor de Aragua C.A.
 * Override in `.env` — variable names are listed in `src/vite-env.d.ts` and read in `src/config/appConfig.ts`.
 */
export const DEFAULT_APP_TITLE = 'ZetaRe';

export const DEFAULT_COMPANY_NAME = 'Flor de Aragua C.A';

export function getAppTitle(): string {
  return appConfig.appTitle;
}

export function getCompanyName(): string {
  return appConfig.companyName;
}

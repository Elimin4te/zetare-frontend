import { useMemo } from 'react';

import { LANDING_PATH } from 'constants/groups';

/**
 * First route in the “primary” app section (e.g. mobile back targets). Single-landing → `/landing`.
 */
export function useFirstAvailableRoute(): string {
  return useMemo(() => LANDING_PATH, []);
}

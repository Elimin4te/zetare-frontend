import { useEffect, useRef } from 'react';

import { trackDashboardLoadTime, trackDashboardViewed } from 'analytics/mixpanel';

const DEFAULT_DEBOUNCE_MS = 500;

export interface DashboardTrackingState {
  applied_filters?: Record<string, unknown> | null;
  viewed_tab?: string | null;
  comparison_point?: string | null;
}

/**
 * Debounced `dashboard_viewed` when filter/tab/comparison metadata changes.
 * Optionally records `dashboard_load_time` once when loading finishes successfully.
 */
export function useDashboardTracking(
  dashboardName: string,
  state: DashboardTrackingState,
  options?: {
    debounceMs?: number;
    enabled?: boolean;
    /** When provided, fires load time once when transitioning from loading to ready. */
    isLoading?: boolean;
    hasError?: boolean;
  }
): void {
  const { debounceMs = DEFAULT_DEBOUNCE_MS, enabled = true, isLoading, hasError } = options ?? {};
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const serialized = JSON.stringify(state);
  const loadStartedAtRef = useRef<number | null>(null);
  const loadTimeSentRef = useRef(false);

  useEffect(() => {
    if (!enabled || typeof isLoading !== 'boolean') {
      return;
    }
    if (isLoading) {
      loadStartedAtRef.current = performance.now();
      return;
    }
    if (loadTimeSentRef.current || loadStartedAtRef.current === null) {
      return;
    }
    loadTimeSentRef.current = true;
    const loadTimeS = (performance.now() - loadStartedAtRef.current) / 1000;
    trackDashboardLoadTime({
      dashboard_name: dashboardName,
      load_time_s: loadTimeS,
      success: !hasError
    });
  }, [dashboardName, enabled, isLoading, hasError]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const parsed = JSON.parse(serialized) as DashboardTrackingState;
      trackDashboardViewed({
        dashboard_name: dashboardName,
        applied_filters: parsed.applied_filters ?? undefined,
        viewed_tab: parsed.viewed_tab ?? undefined,
        comparison_point: parsed.comparison_point ?? undefined
      });
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dashboardName, serialized, debounceMs, enabled]);
}

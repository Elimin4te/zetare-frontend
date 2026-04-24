import mixpanel from 'mixpanel-browser';

import type { UserProfile } from 'types/auth';
import { getAppEnvironment } from './config';
import { ANALYTICS_EVENTS } from './events';

let initialized = false;

function getToken(): string | undefined {
  const t = import.meta.env.VITE_MIXPANEL_TOKEN;
  return typeof t === 'string' && t.trim() !== '' ? t.trim() : undefined;
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(getToken());
}

export function initAnalytics(): void {
  const token = getToken();
  if (!token || initialized) {
    return;
  }

  mixpanel.init(token, {
    persistence: 'localStorage',
    track_pageview: true
  });

  mixpanel.register({
    environment: getAppEnvironment(),
    app: 'zeta-re-frontend'
  });

  initialized = true;
}

export function identifyUser(user: UserProfile): void {
  if (!initialized) {
    return;
  }
  const id = user.id ?? user.username ?? user.email;
  if (!id) {
    return;
  }
  mixpanel.identify(String(id));
  mixpanel.people.set({
    $name: user.displayName ?? user.name,
    $email: user.email ?? undefined,
    groups: user.groups,
    environment: getAppEnvironment()
  });
}

export function resetAnalytics(): void {
  if (!initialized) {
    return;
  }
  mixpanel.reset();
}

export function track(event: string, properties?: Record<string, unknown>): void {
  if (!initialized) {
    return;
  }
  mixpanel.track(event, {
    environment: getAppEnvironment(),
    ...properties
  });
}

export function trackDashboardViewed(payload: {
  dashboard_name: string;
  applied_filters?: Record<string, unknown> | null;
  viewed_tab?: string | null;
  comparison_point?: string | null;
}): void {
  track(ANALYTICS_EVENTS.DASHBOARD_VIEWED, payload);
}

export function trackViewEvent(payload: {
  view_name: string;
  action: string;
  action_metadata?: Record<string, unknown>;
  action_time_s?: number;
  success: boolean;
}): void {
  track(ANALYTICS_EVENTS.VIEW_EVENT, payload);
}

export function trackUserLogin(payload: { method: string }): void {
  track(ANALYTICS_EVENTS.USER_LOGIN, payload);
}

export function trackUserLogout(): void {
  track(ANALYTICS_EVENTS.USER_LOGOUT, {});
}

export function trackApiError(payload: { status?: number; method?: string; url?: string; message?: string }): void {
  track(ANALYTICS_EVENTS.API_ERROR, payload);
}

export function trackAppError(payload: { message: string; stack?: string }): void {
  track(ANALYTICS_EVENTS.APP_ERROR, payload);
}

export function trackDashboardLoadTime(payload: { dashboard_name: string; load_time_s: number; success: boolean }): void {
  track(ANALYTICS_EVENTS.DASHBOARD_LOAD_TIME, payload);
}

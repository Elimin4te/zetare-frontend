import { useEffect } from 'react';

import { initAnalytics } from 'analytics/mixpanel';

/** One-time Mixpanel bootstrap (token-gated). */
export default function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}

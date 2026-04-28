/**
 * Offline mode scaffolding (future).
 *
 * This is intentionally minimal for now; the UI can begin reacting to connectivity state
 * while we add IndexedDB-backed persistence later.
 */

export type OfflineModeStatus = 'not-initialized' | 'ready';

export function getOfflineModeStatus(): OfflineModeStatus {
  return 'not-initialized';
}


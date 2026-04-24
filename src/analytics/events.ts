export const ANALYTICS_EVENTS = {
  DASHBOARD_VIEWED: 'dashboard_viewed',
  VIEW_EVENT: 'view_event',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  API_ERROR: 'api_error',
  APP_ERROR: 'app_error',
  DASHBOARD_LOAD_TIME: 'dashboard_load_time'
} as const;

export type ViewEventAction = 'excel_export' | 'search' | 'sub_navigation' | 'filter_change' | 'page_change';

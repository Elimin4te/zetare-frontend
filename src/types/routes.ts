/**
 * Route handle for layout options.
 * Used by MainLayout. Options only affect mobile (sales layout with bottom navbar).
 * Desktop drawer/behavior is unchanged.
 */
export interface RouteLayoutHandle {
  /** On mobile only: show bottom navbar. Default: true. Desktop drawer always shown. */
  showDrawerOrNavbar?: boolean;
  /** On mobile with navbar: show back button in header (replaces hamburger area). Default: false */
  showMobileBackButton?: boolean;
  /** Path to navigate when back button is clicked. When set, overrides the default first-available-route. */
  mobileBackTo?: string;
  /** Show layout footer. Default: true. Set to false for full-height views (e.g. AI chat). */
  showFooter?: boolean;
  /** Hide the auto layout breadcrumbs (e.g. when the page renders its own BreadcrumbsAfterContent). Default: false. */
  hideLayoutBreadcrumbs?: boolean;
}

export interface RouteHandle {
  layout?: RouteLayoutHandle;
}

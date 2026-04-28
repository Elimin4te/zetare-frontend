import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { getAppTitle } from 'constants/branding';

// ==============================|| PAGE TITLE HOOK ||============================== //

/**
 * Maps route paths to their corresponding internationalized title keys
 */
const routeTitleMap: Record<string, string> = {
  '/': 'page-title-flows',
  '/landing': 'page-title-flows',
  '/login': 'page-title-login'
};

/**
 * Hook to manage dynamic page titles based on current route
 */
export default function usePageTitle() {
  const location = useLocation();
  const intl = useIntl();
  const appTitle = getAppTitle();

  useEffect(() => {
    // Get the title key for the current route
    const titleKey = routeTitleMap[location.pathname];

    // Get the base app title
    let pageTitle = appTitle;

    if (titleKey) {
      try {
        // Try to get internationalized title
        const translatedTitle = intl.formatMessage({ id: titleKey });
        // Combine with app title: "Page Name - App Title"
        pageTitle = `${translatedTitle} - ${appTitle}`;
      } catch {
        // If translation fails, just use the app title
        pageTitle = appTitle;
      }
    }

    // Update document title
    document.title = pageTitle;
  }, [location.pathname, intl, appTitle]);
}

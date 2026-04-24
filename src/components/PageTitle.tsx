import usePageTitle from 'hooks/usePageTitle';

// ==============================|| PAGE TITLE COMPONENT ||============================== //

/**
 * Component that manages dynamic page titles based on current route
 * This component doesn't render anything, it just updates the document title
 */
export default function PageTitle() {
  usePageTitle();
  return null;
}

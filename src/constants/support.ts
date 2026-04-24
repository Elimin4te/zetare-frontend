import { useIntl } from 'react-intl';

import { appConfig } from 'config/appConfig';

// ==============================|| SUPPORT CONSTANTS ||============================== //

/**
 * Support email address from environment variable
 */
export const SUPPORT_EMAIL = appConfig.supportEmail;

/**
 * Support email message variants
 */
export type SupportEmailVariant = 'password-reset' | 'common-issue' | 'contact';

/**
 * Builds a mailto link for support contact
 * @param subject - Email subject
 * @param body - Email body
 * @returns Formatted mailto URL string
 */
const buildSupportMailtoLink = (subject: string, body: string): string => {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Hook to get internationalized support mailto link
 *
 * @param variant - Message variant type:
 *   - 'password-reset': For password reset requests (from login)
 *   - 'common-issue': For reporting issues from other views
 *   - 'contact': For general contact, not necessarily reporting an issue
 *
 * @returns Function that returns the mailto link string
 *
 * @example
 * ```tsx
 * const getSupportLink = useSupportMailtoLink('password-reset');
 * const mailtoLink = getSupportLink();
 * ```
 */
export const useSupportMailtoLink = (variant: SupportEmailVariant = 'password-reset') => {
  const intl = useIntl();

  return () => {
    const subjectKey = `support-email-${variant}-subject`;
    const bodyKey = `support-email-${variant}-body`;

    const subject = intl.formatMessage({ id: subjectKey });
    const body = intl.formatMessage({ id: bodyKey });
    return buildSupportMailtoLink(subject, body);
  };
};

/**
 * Function for building mailto link with custom subject and body
 * @param subject - Email subject (should come from intl.formatMessage)
 * @param body - Email body (should come from intl.formatMessage)
 * @returns Formatted mailto URL string
 */
export const getSupportMailtoLink = (subject: string, body: string): string => {
  return buildSupportMailtoLink(subject, body);
};

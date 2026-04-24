/**
 * Get user initials from firstName and lastName
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Initials string (e.g., "RM" for "Ricardo Marin")
 */
export function getUserInitials(firstName?: string, lastName?: string): string {
  const firstInitial = firstName?.charAt(0)?.toUpperCase() || '';
  const lastInitial = lastName?.charAt(0)?.toUpperCase() || '';

  if (firstInitial && lastInitial) {
    return `${firstInitial}${lastInitial}`;
  }

  // Fallback: if only one name is provided, use first two characters
  if (firstInitial) {
    return firstInitial;
  }
  if (lastInitial) {
    return lastInitial;
  }

  // Final fallback: return empty string (will show default)
  return '';
}

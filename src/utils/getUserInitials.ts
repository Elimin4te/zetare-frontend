/**
 * Initials from `displayName`: first letter of the first two whitespace-separated parts.
 */
export function getInitialsFromDisplayName(displayName?: string | null): string {
  const trimmed = displayName?.trim();
  if (!trimmed) return '';

  const parts = trimmed.split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return '';
  if (parts.length === 1) {
    const w = parts[0];
    return w.length >= 2 ? w.slice(0, 2).toUpperCase() : w.charAt(0).toUpperCase();
  }
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

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

import { addDays, addMonths, differenceInDays } from 'date-fns';

/**
 * Calculates the expiration date from now based on a preset string.
 * @param duration The duration preset ('1d', '3d', '1w', '2w', '1m', 'never').
 * @returns A Date object for the calculated expiration, or null if 'never'.
 */
export function getExpirationDate(duration?: string): Date | null {
  if (!duration || duration === 'never') {
    return null;
  }
  
  const now = new Date();
  
  switch (duration) {
    case '1d':
      return addDays(now, 1);
    case '3d':
      return addDays(now, 3);
    case '1w':
      return addDays(now, 7);
    case '2w':
      return addDays(now, 14);
    case '1m':
      return addMonths(now, 1);
    default:
      return null;
  }
}

/**
 * Finds the closest matching duration preset for a given expiration date.
 * This is an approximation and might not be perfect for all cases (e.g., month duration).
 * @param expiresAt The ISO date string or Date object.
 * @returns A duration preset string.
 */
export function getExpirationPreset(expiresAt?: string | Date | null): string {
    if (!expiresAt) {
        return 'never';
    }

    const expirationDate = new Date(expiresAt);
    const now = new Date();
    const daysUntilExpiry = differenceInDays(expirationDate, now);

    if (daysUntilExpiry <= 0) return 'never';
    if (daysUntilExpiry <= 1) return '1d';
    if (daysUntilExpiry <= 3) return '3d';
    if (daysUntilExpiry <= 7) return '1w';
    if (daysUntilExpiry <= 14) return '2w';

    // Approximate a month
    if (daysUntilExpiry > 14) return '1m'; 
    
    return 'never';
}

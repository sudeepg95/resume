// src/utils/helpers/date-helpers.ts

/**
 * Format a date string to readable format
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Present';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  } catch (error) {
    console.warn('Invalid date format:', dateString);
    return dateString || 'Present';
  }
}

/**
 * Format a date range
 */
export function formatDateRange(
  startDate: string,
  endDate?: string | null
): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

/**
 * Calculate duration between two dates
 */
export function calculateDuration(
  startDate: string,
  endDate?: string | null
): string {
  try {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0 && months > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} mo${months > 1 ? 's' : ''}`;
    } else {
      return 'Less than 1 month';
    }
  } catch (error) {
    console.warn('Error calculating duration:', error);
    return '';
  }
}

/**
 * Check if a date is current (no end date or end date is in the future)
 */
export function isCurrentPosition(endDate?: string | null): boolean {
  if (!endDate) return true;

  try {
    const end = new Date(endDate);
    const now = new Date();
    return end > now;
  } catch (error) {
    return false;
  }
}

/**
 * Sort items by start date (newest first)
 */
export function sortByStartDate<T extends { start_date: string }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    try {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return dateB.getTime() - dateA.getTime();
    } catch (error) {
      return 0;
    }
  });
}

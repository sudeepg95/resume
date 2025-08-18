export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Present';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  } catch {
    return dateString || 'Present';
  }
}

export function formatDateRange(
  startDate: string,
  endDate?: string | null
): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

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
  } catch {
    return '';
  }
}

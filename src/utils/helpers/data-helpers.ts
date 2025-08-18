// src/utils/helpers/data-helpers.ts

/**
 * Get network icon identifier
 */
export function getNetworkIcon(network: string): string {
  const iconMap: Record<string, string> = {
    LinkedIn: 'linkedin',
    GitHub: 'github',
    Twitter: 'twitter',
    Instagram: 'instagram',
    Facebook: 'facebook',
    YouTube: 'youtube',
    Website: 'website',
    Portfolio: 'portfolio',
    Email: 'email',
    Phone: 'phone',
    Dribbble: 'dribbble',
    Behance: 'behance',
    Medium: 'medium',
    'Dev.to': 'devto',
    'Stack Overflow': 'stackoverflow',
  };

  return iconMap[network] || 'link';
}

/**
 * Format location string
 */
export function formatLocation(location?: {
  city: string;
  region?: string | null;
  country?: string;
}): string {
  if (!location) return '';

  const parts = [location.city, location.region, location.country].filter(
    Boolean
  );

  return parts.join(', ');
}

/**
 * Generate initials from name
 */
export function generateInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Sanitize and validate URL
 */
export function sanitizeUrl(url?: string | null): string | null {
  if (!url) return null;

  try {
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    const validUrl = new URL(url);
    return validUrl.href;
  } catch (error) {
    console.warn('Invalid URL:', url);
    return null;
  }
}

/**
 * Extract domain from URL for display
 */
export function extractDomain(url?: string | null): string {
  if (!url) return '';

  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch (error) {
    return url || '';
  }
}

/**
 * Group skills by category
 */
export function groupSkillsByCategory(
  skills: Array<{ name: string; keywords: string[]; level?: string }>
): Array<{ name: string; keywords: string[]; level?: string }> {
  // Return skills as-is since they're already categorized
  return skills;
}

/**
 * Get skill level color
 */
export function getSkillLevelColor(level?: string): string {
  const levelColors: Record<string, string> = {
    Expert: 'var(--color-success)',
    Advanced: 'var(--color-primary)',
    Intermediate: 'var(--color-warning)',
    Beginner: 'var(--color-text-secondary)',
    Novice: 'var(--color-text-secondary)',
  };

  return levelColors[level || ''] || 'var(--color-primary)';
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generate SEO-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

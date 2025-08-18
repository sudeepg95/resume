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

export function sanitizeUrl(url?: string | null): string | null {
  if (!url) return null;

  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    const validUrl = new URL(url);
    return validUrl.href;
  } catch {
    console.warn('Invalid URL:', url);
    return null;
  }
}



interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  loadTime?: number;
}

class AnalyticsManager {
  private startTime: number;
  private events: AnalyticsEvent[] = [];
  private metrics: PerformanceMetrics = {};

  constructor() {
    this.startTime = performance.now();
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    this.trackPageLoad();
    this.trackUserInteractions();
    this.trackPerformanceMetrics();
    this.trackVisibility();
  }

  private trackPageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.now() - this.startTime;
      this.metrics.loadTime = Math.round(loadTime);

      this.trackEvent('page_load', {
        load_time: this.metrics.loadTime,
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      });
    });
  }

  private trackUserInteractions() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = this.getSectionName(entry.target);
            this.trackEvent('section_view', {
              section: sectionName,
              visibility_ratio: entry.intersectionRatio,
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll('.section, .work-item, .skill-category')
      .forEach((section) => {
        observer.observe(section);
      });

    document.querySelectorAll('a[href^="http"]').forEach((link) => {
      link.addEventListener('click', () => {
        this.trackEvent('external_link_click', {
          url: (link as HTMLElement).getAttribute('href'),
          type: this.getLinkType(link as HTMLElement),
          text: (link as HTMLElement).textContent?.trim(),
        });
      });

      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('#export-pdf')) {
          this.trackEvent('pdf_export_attempt');
        }
      });
    });
  }

  private trackPerformanceMetrics() {
    this.trackLCP();
    this.trackFID();
    this.trackCLS();
  }

  private trackLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        this.metrics.lcp = lcp.startTime;

        this.trackEvent('performance_lcp', {
          value: this.metrics.lcp,
          rating: this.getRating('lcp', this.metrics.lcp),
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      console.warn('LCP tracking not supported');
    }
  }

  private trackFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;

          this.trackEvent('performance_fid', {
            value: this.metrics.fid,
            rating: this.getRating('fid', this.metrics.fid),
          });
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    } catch {
      console.warn('FID tracking not supported');
    }
  }

  private trackCLS() {
    try {
      let clsValue = 0;

      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        this.metrics.cls = clsValue;

        this.trackEvent('performance_cls', {
          value: this.metrics.cls,
          rating: this.getRating('cls', this.metrics.cls),
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    } catch {
      console.warn('CLS tracking not supported');
    }
  }

  private trackVisibility() {
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('visibility_change', {
        hidden: document.hidden,
        visibility_state: document.visibilityState,
      });
    });
  }

  private getSectionName(element: Element): string {
    const section = element.closest('.section');
    const title = section?.querySelector('.section-title')?.textContent;
    return title || element.className.split(' ')[0] || 'unknown';
  }

  private getLinkType(element: HTMLElement): string {
    if (element.closest('.social-links')) return 'social';
    if (element.closest('.work-item')) return 'company';
    if (element.closest('.project-item')) return 'project';
    if (element.closest('.education-item')) return 'education';
    return 'other';
  }

  private getRating(metric: string, value: number): string {
    const thresholds = {
      lcp: { good: 2500, needs_improvement: 4000 },
      fid: { good: 100, needs_improvement: 300 },
      cls: { good: 0.1, needs_improvement: 0.25 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needs_improvement) return 'needs_improvement';
    return 'poor';
  }

  trackEvent(name: string, properties: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name,
      properties: {
        ...properties,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
    };

    this.events.push(event);

    this.sendToAnalytics(event);

    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', event);
    }
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', event.name, event.properties);
    }

    if (typeof window !== 'undefined' && 'plausible' in window) {
      (window as any).plausible(event.name, { props: event.properties });
    }

    if (import.meta.env.PROD) {
      this.sendToCustomEndpoint(event);
    }
  }

  private async sendToCustomEndpoint(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }
}

export const analytics = new AnalyticsManager();

interface OptimizationConfig {
  enablePreloading: boolean;
  enableServiceWorker: boolean;
  enableImageOptimization: boolean;
  enableBundleAnalysis: boolean;
}

class ProductionOptimizer {
  private config: OptimizationConfig;

  constructor(config: OptimizationConfig) {
    this.config = config;
  }

  async optimize() {
    if (typeof window === 'undefined') return;

    if (this.config.enablePreloading) {
      this.setupResourcePreloading();
    }

    if (this.config.enableServiceWorker) {
      await this.registerServiceWorker();
    }

    if (this.config.enableImageOptimization) {
      this.optimizeImages();
    }

    this.setupPerformanceMonitoring();
  }

  private setupResourcePreloading() {
    const criticalResources = [
      { href: '/fonts/inter-variable.woff2', as: 'font', type: 'font/woff2' },
      { href: '/api/cv-data', as: 'fetch' },
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.as === 'font') link.crossOrigin = 'anonymous';

      document.head.appendChild(link);
    });
  }

  private async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  private optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      images.forEach((img) => {
        const image = img as HTMLImageElement;
        image.src = image.dataset.src!;
        image.removeAttribute('data-src');
      });
    }
  }

  private setupPerformanceMonitoring() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navigation = entry as PerformanceNavigationTiming;

          if (navigation.loadEventEnd - navigation.fetchStart > 3000) {
            console.warn('Slow page load detected:', {
              totalTime: navigation.loadEventEnd - navigation.fetchStart,
              domContentLoaded:
                navigation.domContentLoadedEventEnd - navigation.fetchStart,
              firstByte: navigation.responseStart - navigation.fetchStart,
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ['navigation'] });
  }
}

export function initProductionOptimizations() {
  if (import.meta.env.PROD) {
    const optimizer = new ProductionOptimizer({
      enablePreloading: true,
      enableServiceWorker: true,
      enableImageOptimization: true,
      enableBundleAnalysis: false,
    });

    optimizer.optimize();
  }
}

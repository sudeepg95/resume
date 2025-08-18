# Phase 4: Advanced Features Implementation

## Overview

This phase adds professional-grade features that distinguish your CV website from basic templates: theme switching, PDF export, animations, analytics, and performance optimizations.

## Prerequisites

- Phase 3 completed successfully
- Dynamic data integration working
- Basic understanding of browser APIs and client-side JavaScript

## Implementation Steps

### Step 1: Theme System Implementation

Create `src/utils/theme-manager.ts`:

```typescript
// src/utils/theme-manager.ts
export type Theme = 'professional' | 'modern' | 'creative' | 'minimal';

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  name: string;
  description: string;
}

export const THEME_CONFIGS: Record<Theme, ThemeConfig> = {
  professional: {
    primaryColor: '#1e40af',
    accentColor: '#3b82f6',
    fontFamily: 'Inter',
    borderRadius: '0.375rem',
    name: 'Professional',
    description: 'Clean and corporate design',
  },
  modern: {
    primaryColor: '#059669',
    accentColor: '#10b981',
    fontFamily: 'Poppins',
    borderRadius: '0.5rem',
    name: 'Modern',
    description: 'Contemporary and fresh styling',
  },
  creative: {
    primaryColor: '#7c3aed',
    accentColor: '#8b5cf6',
    fontFamily: 'Montserrat',
    borderRadius: '0.75rem',
    name: 'Creative',
    description: 'Bold and artistic approach',
  },
  minimal: {
    primaryColor: '#374151',
    accentColor: '#6b7280',
    fontFamily: 'Source Sans Pro',
    borderRadius: '0.25rem',
    name: 'Minimal',
    description: 'Simple and understated elegance',
  },
};

class ThemeManager {
  private currentTheme: Theme = 'professional';
  private initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;

    this.loadSavedTheme();
    this.applyTheme(this.currentTheme);
    this.setupSystemThemeListener();
    this.initialized = true;
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
    this.broadcastThemeChange(theme);
  }

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  getThemeConfig(theme?: Theme): ThemeConfig {
    return THEME_CONFIGS[theme || this.currentTheme];
  }

  private applyTheme(theme: Theme) {
    if (typeof document === 'undefined') return;

    const config = THEME_CONFIGS[theme];
    const root = document.documentElement;

    // Update data attribute
    root.setAttribute('data-theme', theme);

    // Update CSS custom properties
    root.style.setProperty('--color-primary', config.primaryColor);
    root.style.setProperty('--color-accent', config.accentColor);
    root.style.setProperty('--font-family-primary', config.fontFamily);
    root.style.setProperty('--border-radius', config.borderRadius);

    // Update font family if Google Fonts
    this.loadFont(config.fontFamily);
  }

  private loadFont(fontFamily: string) {
    if (typeof document === 'undefined') return;

    const fontMap: Record<string, string> = {
      Inter: 'Inter:wght@300;400;500;600;700',
      Poppins: 'Poppins:wght@300;400;500;600;700',
      Montserrat: 'Montserrat:wght@300;400;500;600;700',
      'Source Sans Pro': 'Source+Sans+Pro:wght@300;400;600;700',
    };

    const fontQuery = fontMap[fontFamily];
    if (fontQuery) {
      const linkId = `font-${fontFamily.replace(/\s+/g, '-').toLowerCase()}`;

      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.href = `https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    }
  }

  private loadSavedTheme() {
    try {
      const saved = localStorage.getItem('cv-theme') as Theme;
      if (saved && Object.keys(THEME_CONFIGS).includes(saved)) {
        this.currentTheme = saved;
      }
    } catch (error) {
      console.warn('Failed to load saved theme:', error);
    }
  }

  private saveTheme(theme: Theme) {
    try {
      localStorage.setItem('cv-theme', theme);
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  }

  private setupSystemThemeListener() {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      // Could implement automatic theme switching based on system preference
      this.broadcastThemeChange(this.currentTheme);
    });
  }

  private broadcastThemeChange(theme: Theme) {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(
      new CustomEvent('themeChange', {
        detail: { theme, config: THEME_CONFIGS[theme] },
      })
    );
  }
}

export const themeManager = new ThemeManager();
```

Create `src/components/ui/ThemeSwitcher.astro`:

```astro
---
// src/components/ui/ThemeSwitcher.astro
import { THEME_CONFIGS } from '../../utils/theme-manager';

const themes = Object.entries(THEME_CONFIGS);
---

<div class="theme-switcher no-print" id="theme-switcher">
  <button class="theme-toggle" id="theme-toggle" aria-label="Change theme">
    <svg class="theme-icon" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
      ></path>
    </svg>
  </button>

  <div class="theme-dropdown" id="theme-dropdown">
    <div class="theme-grid">
      {
        themes.map(([themeKey, config]) => (
          <button
            class="theme-option"
            data-theme={themeKey}
            title={config.description}
          >
            <div
              class="theme-preview"
              style={`background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.accentColor} 100%)`}
            />
            <span class="theme-name">{config.name}</span>
          </button>
        ))
      }
    </div>
  </div>
</div>

<script>
  import { themeManager } from '../../utils/theme-manager';

  class ThemeSwitcherComponent {
    private toggle: HTMLElement | null = null;
    private dropdown: HTMLElement | null = null;
    private isOpen = false;

    constructor() {
      this.init();
    }

    private init() {
      this.toggle = document.getElementById('theme-toggle');
      this.dropdown = document.getElementById('theme-dropdown');

      if (!this.toggle || !this.dropdown) return;

      this.setupEventListeners();
      this.updateActiveTheme();
    }

    private setupEventListeners() {
      if (!this.toggle || !this.dropdown) return;

      // Toggle dropdown
      this.toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown();
      });

      // Theme selection
      this.dropdown.querySelectorAll('.theme-option').forEach((button) => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const theme = (e.currentTarget as HTMLElement).dataset.theme;
          if (theme) {
            themeManager.setTheme(theme as any);
            this.updateActiveTheme();
            this.closeDropdown();
          }
        });
      });

      // Close on outside click
      document.addEventListener('click', () => {
        this.closeDropdown();
      });

      // Listen for theme changes
      window.addEventListener('themeChange', () => {
        this.updateActiveTheme();
      });

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeDropdown();
        }
      });
    }

    private toggleDropdown() {
      this.isOpen ? this.closeDropdown() : this.openDropdown();
    }

    private openDropdown() {
      if (!this.dropdown) return;
      this.dropdown.classList.add('open');
      this.isOpen = true;
    }

    private closeDropdown() {
      if (!this.dropdown) return;
      this.dropdown.classList.remove('open');
      this.isOpen = false;
    }

    private updateActiveTheme() {
      const currentTheme = themeManager.getCurrentTheme();

      // Update active state
      this.dropdown?.querySelectorAll('.theme-option').forEach((button) => {
        button.classList.toggle(
          'active',
          button.dataset.theme === currentTheme
        );
      });
    }
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => new ThemeSwitcherComponent()
    );
  } else {
    new ThemeSwitcherComponent();
  }
</script>

<style>
  .theme-switcher {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: var(--z-dropdown);
  }

  .theme-toggle {
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 50%;
    background: var(--color-background);
    color: var(--color-text);
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    transition: all var(--transition-normal);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-xl);
  }

  .theme-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .theme-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 200px;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-xl);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all var(--transition-normal);
    padding: 0.75rem;
  }

  .theme-dropdown.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .theme-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .theme-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 2px solid transparent;
    border-radius: var(--border-radius);
    background: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .theme-option:hover {
    border-color: var(--color-border);
    background: var(--color-background-secondary);
  }

  .theme-option.active {
    border-color: var(--color-primary);
    background: var(--color-background-secondary);
  }

  .theme-preview {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .theme-name {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text);
  }

  @media (max-width: 768px) {
    .theme-switcher {
      top: 0.5rem;
      right: 0.5rem;
    }

    .theme-toggle {
      width: 2.5rem;
      height: 2.5rem;
    }

    .theme-dropdown {
      min-width: 160px;
    }
  }
</style>
```

### Step 2: PDF Export Implementation

Create `src/utils/pdf-export.ts`:

```typescript
// src/utils/pdf-export.ts

interface PDFOptions {
  filename?: string;
  margin?: number;
  format?: 'a4' | 'letter';
  quality?: number;
}

class PDFExporter {
  private isExporting = false;

  async generatePDF(options: PDFOptions = {}) {
    if (this.isExporting) {
      console.warn('PDF export already in progress');
      return;
    }

    const {
      filename = 'resume.pdf',
      margin = 0.5,
      format = 'letter',
      quality = 0.98,
    } = options;

    this.isExporting = true;

    try {
      // Hide interactive elements
      this.hideInteractiveElements();

      // Apply print mode
      document.body.classList.add('print-mode');

      // Try browser print first (better quality)
      if (this.canUseBrowserPrint()) {
        this.triggerBrowserPrint();
      } else {
        // Fallback to html2pdf
        await this.generateWithHtml2Pdf(filename, margin, format, quality);
      }
    } catch (error) {
      console.error('PDF export failed:', error);
      this.showError('Failed to export PDF. Please try again.');
    } finally {
      // Restore UI
      this.showInteractiveElements();
      document.body.classList.remove('print-mode');
      this.isExporting = false;
    }
  }

  private canUseBrowserPrint(): boolean {
    return typeof window !== 'undefined' && 'print' in window;
  }

  private triggerBrowserPrint() {
    // Use timeout to ensure styles are applied
    setTimeout(() => {
      window.print();
    }, 100);
  }

  private async generateWithHtml2Pdf(
    filename: string,
    margin: number,
    format: string,
    quality: number
  ) {
    try {
      // Dynamic import to avoid loading html2pdf unless needed
      const html2pdf = await import('html2pdf.js');

      const element = document.querySelector('.cv-container');
      if (!element) {
        throw new Error('CV container not found');
      }

      const opt = {
        margin: margin,
        filename: filename,
        image: { type: 'jpeg', quality: quality },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: 'in',
          format: format,
          orientation: 'portrait',
        },
      };

      await html2pdf.default().set(opt).from(element).save();
    } catch (error) {
      console.error('html2pdf export failed:', error);
      throw new Error('PDF library not available');
    }
  }

  private hideInteractiveElements() {
    document.querySelectorAll('.no-print').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
  }

  private showInteractiveElements() {
    document.querySelectorAll('.no-print').forEach((el) => {
      (el as HTMLElement).style.display = '';
    });
  }

  private showError(message: string) {
    // Simple error notification
    const notification = document.createElement('div');
    notification.className = 'pdf-error-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-error);
      color: white;
      padding: 1rem 2rem;
      border-radius: var(--border-radius);
      z-index: 9999;
      font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
}

export const pdfExporter = new PDFExporter();
```

Create `src/components/ui/ExportButton.astro`:

```astro
---
// src/components/ui/ExportButton.astro
---

<button
  class="export-button no-print"
  id="export-pdf"
  aria-label="Export as PDF"
>
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
    ></path>
  </svg>
  <span class="button-text">Export PDF</span>
  <div class="loading-spinner" id="loading-spinner">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12,1A11,11 0 1,0 23,12A11,11 0 0,0 12,1M12,3A9,9 0 1,1 3,12A9,9 0 0,1 12,3"
      ></path>
      <path d="M12,3A9,9 0 0,1 21,12H12V3Z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"></animateTransform>
      </path>
    </svg>
  </div>
</button>

<script>
  import { pdfExporter } from '../../utils/pdf-export';

  class ExportButtonComponent {
    private button: HTMLElement | null = null;
    private buttonText: HTMLElement | null = null;
    private spinner: HTMLElement | null = null;

    constructor() {
      this.init();
    }

    private init() {
      this.button = document.getElementById('export-pdf');
      this.buttonText = this.button?.querySelector('.button-text') || null;
      this.spinner = document.getElementById('loading-spinner');

      if (!this.button) return;

      this.button.addEventListener('click', this.handleExport.bind(this));
    }

    private async handleExport() {
      if (!this.button || !this.buttonText || !this.spinner) return;

      // Show loading state
      this.button.disabled = true;
      this.buttonText.textContent = 'Exporting...';
      this.spinner.style.display = 'block';

      try {
        // Get CV data for filename
        const nameElement = document.querySelector('.name');
        const name = nameElement?.textContent || 'resume';
        const filename = `${name.replace(/\s+/g, '-').toLowerCase()}-cv.pdf`;

        await pdfExporter.generatePDF({ filename });

        // Show success state briefly
        this.buttonText.textContent = 'Exported!';
        setTimeout(() => {
          this.resetButton();
        }, 2000);
      } catch (error) {
        console.error('Export failed:', error);
        this.buttonText.textContent = 'Export Failed';
        setTimeout(() => {
          this.resetButton();
        }, 3000);
      }
    }

    private resetButton() {
      if (!this.button || !this.buttonText || !this.spinner) return;

      this.button.disabled = false;
      this.buttonText.textContent = 'Export PDF';
      this.spinner.style.display = 'none';
    }
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => new ExportButtonComponent()
    );
  } else {
    new ExportButtonComponent();
  }
</script>

<style>
  .export-button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: var(--z-fixed);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 2rem;
    padding: 0.875rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-normal);
    font-family: var(--font-family-primary);
  }

  .export-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
    background: var(--color-accent);
  }

  .export-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .button-text {
    font-size: 0.875rem;
  }

  .loading-spinner {
    width: 1rem;
    height: 1rem;
    display: none;
  }

  @media (max-width: 768px) {
    .export-button {
      bottom: 0.5rem;
      right: 0.5rem;
      padding: 0.75rem 1.25rem;
    }

    .button-text {
      display: none;
    }
  }
</style>
```

### Step 3: Scroll Animations

Create `src/utils/animations.ts`:

```typescript
// src/utils/animations.ts

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  stagger?: number;
}

class AnimationManager {
  private observer: IntersectionObserver | null = null;
  private initialized = false;

  init(options: AnimationOptions = {}) {
    if (this.initialized || typeof window === 'undefined') return;

    const {
      threshold = 0.1,
      rootMargin = '0px 0px -50px 0px',
      stagger = 100,
    } = options;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * stagger);

            // Stop observing once animated
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    this.observeElements();
    this.setupOtherAnimations();
    this.initialized = true;
  }

  private observeElements() {
    if (!this.observer) return;

    // Animate sections
    document
      .querySelectorAll(
        '.section, .work-item, .skill-category, .education-item'
      )
      .forEach((el) => {
        el.classList.add('animate-prepare');
        this.observer?.observe(el);
      });

    // Animate skill tags with stagger
    document.querySelectorAll('.skill-tag').forEach((el, index) => {
      el.classList.add('animate-prepare-fade');
      (el as HTMLElement).style.animationDelay = `${index * 0.05}s`;
    });
  }

  private setupOtherAnimations() {
    // Smooth scrolling for anchor links
    this.initSmoothScrolling();

    // Hover animations
    this.initHoverAnimations();

    // Typing animation for name (if desired)
    this.initTypingAnimation();
  }

  private initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (anchor as HTMLElement).getAttribute('href')?.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  private initHoverAnimations() {
    // Add hover lift effect to cards
    document
      .querySelectorAll('.work-item, .skill-category, .education-item')
      .forEach((el) => {
        el.classList.add('hover-lift');
      });
  }

  private initTypingAnimation() {
    const nameElement = document.querySelector('.name');
    if (!nameElement) return;

    const text = nameElement.textContent || '';
    nameElement.textContent = '';
    nameElement.classList.add('typing');

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        nameElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        nameElement.classList.remove('typing');
      }
    };

    // Start typing animation after a delay
    setTimeout(typeWriter, 500);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.initialized = false;
  }
}

export const animationManager = new AnimationManager();
```

Create `src/styles/animations.css`:

```css
/* src/styles/animations.css */

/* Prepare elements for animation */
.animate-prepare {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.animate-prepare-fade {
  opacity: 0;
  transform: scale(0.95);
  animation: fadeInScale 0.4s ease-out forwards;
}

/* Animate in when visible */
.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Keyframe animations */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Hover animations */
.hover-lift {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Typing animation */
.typing::after {
  content: '|';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* Stagger animations for skill tags */
.skill-tag {
  animation-delay: 0.1s;
  animation-fill-mode: both;
}

.skill-tag:nth-child(1) {
  animation-delay: 0.1s;
}
.skill-tag:nth-child(2) {
  animation-delay: 0.15s;
}
.skill-tag:nth-child(3) {
  animation-delay: 0.2s;
}
.skill-tag:nth-child(4) {
  animation-delay: 0.25s;
}
.skill-tag:nth-child(5) {
  animation-delay: 0.3s;
}
.skill-tag:nth-child(6) {
  animation-delay: 0.35s;
}
.skill-tag:nth-child(7) {
  animation-delay: 0.4s;
}
.skill-tag:nth-child(8) {
  animation-delay: 0.45s;
}

/* Loading animations */
.loading-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Progress bar animation */
.progress-bar {
  overflow: hidden;
  position: relative;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .animate-prepare {
    opacity: 1;
    transform: none;
  }

  .hover-lift:hover {
    transform: none;
  }

  .typing::after {
    animation: none;
  }
}

/* Print styles - disable all animations */
@media print {
  *,
  *::before,
  *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }

  .animate-prepare,
  .animate-prepare-fade {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### Step 4: Performance Analytics

Create `src/utils/analytics.ts`:

```typescript
// src/utils/analytics.ts

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
    // Track section views
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

    // Track external link clicks
    document.querySelectorAll('a[href^="http"]').forEach((link) => {
      link.addEventListener('click', () => {
        this.trackEvent('external_link_click', {
          url: (link as HTMLElement).getAttribute('href'),
          type: this.getLinkType(link as HTMLElement),
          text: (link as HTMLElement).textContent?.trim(),
        });
      });
    });

    // Track PDF export
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#export-pdf')) {
        this.trackEvent('pdf_export_attempt');
      }
    });

    // Track theme changes
    window.addEventListener('themeChange', (e: any) => {
      this.trackEvent('theme_change', {
        theme: e.detail.theme,
        previous_theme: this.getCurrentTheme(),
      });
    });
  }

  private trackPerformanceMetrics() {
    // Track Core Web Vitals
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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

  private getCurrentTheme(): string {
    return (
      document.documentElement.getAttribute('data-theme') || 'professional'
    );
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

    // Send to analytics service
    this.sendToAnalytics(event);

    // Log in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', event);
    }
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', event.name, event.properties);
    }

    // Plausible Analytics
    if (typeof plausible !== 'undefined') {
      plausible(event.name, { props: event.properties });
    }

    // Custom analytics endpoint
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
```

### Step 5: Update Layout with New Features

Update `src/layouts/CVLayout.astro`:

```astro
---
// src/layouts/CVLayout.astro
import type { CVData } from '../utils/schemas/cv-schema';

interface Props {
  title: string;
  description?: string;
  theme?: 'professional' | 'modern' | 'creative' | 'minimal';
  cvData?: CVData;
}

const {
  title,
  description = 'Professional CV Website',
  theme = 'professional',
  cvData,
} = Astro.props;

// Generate structured data for SEO
const structuredData = cvData
  ? {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: cvData.basics.name,
      jobTitle: cvData.basics.label,
      email: cvData.basics.email,
      telephone: cvData.basics.phone,
      url: cvData.basics.url,
      address: cvData.basics.location
        ? {
            '@type': 'PostalAddress',
            addressLocality: cvData.basics.location.city,
            addressCountry: cvData.basics.location.country_code,
          }
        : undefined,
    }
  : null;
---

<!doctype html>
<html lang="en" data-theme={theme}>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content={cvData?.basics.name} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta
      property="og:image"
      content={cvData?.basics.image || '/og-image.jpg'}
    />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={Astro.url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta
      property="twitter:image"
      content={cvData?.basics.image || '/og-image.jpg'}
    />

    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={Astro.url} />

    <!-- Structured Data -->
    {
      structuredData && (
        <script
          type="application/ld+json"
          set:html={JSON.stringify(structuredData)}
        />
      )
    }

    <!-- Preload critical resources -->
    <link
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      as="style"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Styles -->
    <link rel="stylesheet" href="/src/styles/animations.css" />

    <!-- Print Styles -->
    <style media="print">
      @page {
        margin: 0.5in;
        size: letter;
      }
      .no-print {
        display: none !important;
      }
      body {
        font-size: 12pt;
        line-height: 1.4;
      }
      .cv-container {
        box-shadow: none;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <!-- Theme Switcher -->
    <div id="theme-switcher-mount"></div>

    <!-- Export Button -->
    <div id="export-button-mount"></div>

    <main class="cv-container">
      <slot />
    </main>

    <!-- Scripts -->
    <script>
      // Initialize features when DOM is ready
      import { themeManager } from '../utils/theme-manager';
      import { animationManager } from '../utils/animations';
      import { analytics } from '../utils/analytics';

      document.addEventListener('DOMContentLoaded', () => {
        // Initialize theme system
        themeManager.init();

        // Initialize animations
        animationManager.init({
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
          stagger: 100,
        });

        // Track page view
        analytics.trackEvent('page_view', {
          page_title: document.title,
          page_url: window.location.href,
        });
      });
    </script>
  </body>
</html>

<style>
  .cv-container {
    max-width: 8.5in;
    margin: 2rem auto;
    padding: 2rem;
    background: var(--color-white);
    box-shadow: var(--shadow-lg);
    border-radius: var(--border-radius-lg);
    min-height: 11in;
  }

  @media (max-width: 768px) {
    .cv-container {
      margin: 1rem;
      padding: 1rem;
      border-radius: var(--border-radius);
    }
  }

  @media print {
    .cv-container {
      max-width: none;
      margin: 0;
      padding: 0;
      box-shadow: none;
      border-radius: 0;
    }
  }
</style>
```

## TODO List for Phase 4

### ✅ Theme System

- [ ] Create theme manager with localStorage persistence
- [ ] Implement theme switcher component with dropdown
- [ ] Add 4 professional themes (professional, modern, creative, minimal)
- [ ] Test theme switching and persistence across sessions
- [ ] Ensure themes work with all components
- [ ] Add smooth transitions between themes

### ✅ PDF Export

- [ ] Implement PDF export utility with fallback options
- [ ] Create export button with loading states
- [ ] Test browser print functionality
- [ ] Add html2pdf.js fallback for unsupported browsers
- [ ] Handle interactive element hiding during export
- [ ] Test PDF quality and formatting

### ✅ Scroll Animations

- [ ] Create animation manager for intersection observer
- [ ] Implement slide-in animations for sections
- [ ] Add staggered animations for skill tags
- [ ] Create hover effects for interactive elements
- [ ] Add smooth scrolling for navigation
- [ ] Test animations on different devices

### ✅ Performance Analytics

- [ ] Implement Core Web Vitals tracking (LCP, FID, CLS)
- [ ] Track user interactions and section views
- [ ] Monitor link clicks and PDF exports
- [ ] Add performance metrics collection
- [ ] Implement analytics event system
- [ ] Test analytics in development and production

### ✅ Component Integration

- [ ] Add ThemeSwitcher to layout
- [ ] Integrate ExportButton component
- [ ] Update existing components for animations
- [ ] Add proper CSS classes for animations
- [ ] Test all components with new features
- [ ] Ensure backward compatibility

### ✅ Performance Optimization

- [ ] Optimize JavaScript bundle size
- [ ] Implement lazy loading for non-critical features
- [ ] Add service worker for caching (optional)
- [ ] Test performance impact of new features
- [ ] Optimize CSS delivery
- [ ] Monitor Core Web Vitals scores

### ✅ Accessibility & UX

- [ ] Ensure theme switcher is keyboard accessible
- [ ] Add proper ARIA labels to interactive elements
- [ ] Test with screen readers
- [ ] Add focus management for dropdowns
- [ ] Implement reduced motion preferences
- [ ] Test color contrast for all themes

### ✅ Cross-browser Testing

- [ ] Test theme switching in all major browsers
- [ ] Verify PDF export functionality
- [ ] Test animations across different devices
- [ ] Check performance analytics tracking
- [ ] Validate responsive behavior
- [ ] Test print functionality

### ✅ Error Handling

- [ ] Add error boundaries for component failures
- [ ] Implement graceful degradation for unsupported features
- [ ] Add user feedback for failed operations
- [ ] Test with JavaScript disabled
- [ ] Handle network failures gracefully
- [ ] Add console warnings for development

### ✅ Documentation & Testing

- [ ] Document new APIs and utilities
- [ ] Add comments for complex functions
- [ ] Test edge cases and error scenarios
- [ ] Create user guide for advanced features
- [ ] Document performance considerations
- [ ] Add troubleshooting guide

## Verification Checklist

Before proceeding to Phase 5, ensure:

1. **Theme switching works flawlessly**: All 4 themes apply correctly and persist
2. **PDF export functions properly**: Both browser print and fallback work
3. **Animations enhance UX**: Smooth, performant, and respect user preferences
4. **Analytics track correctly**: Events and metrics are captured accurately
5. **Performance is maintained**: No significant impact on load times
6. **Cross-browser compatibility**: Works in Chrome, Firefox, Safari, Edge
7. **Mobile experience is smooth**: Touch interactions and responsive design
8. **Accessibility is preserved**: Screen readers and keyboard navigation work

## Next Steps

Once Phase 4 is complete, proceed to **Phase 5: Parity Check & Final Polish** where you'll:

1. Compare with the hello.cv reference site
2. Identify and implement missing features
3. Optimize for production deployment
4. Conduct final testing and bug fixes

## Performance Tips

### Bundle Size Optimization

- Use dynamic imports for large libraries
- Tree-shake unused code
- Compress and minify assets

### Animation Performance

- Use CSS transforms over position changes
- Avoid animating layout properties
- Use `will-change` sparingly and remove after animation

### Memory Management

- Clean up event listeners
- Disconnect observers when not needed
- Avoid memory leaks in long-running sessions

## Resources

- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Intersection Observer Guide](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Core Web Vitals](https://web.dev/vitals/)
- [Print CSS Tutorial](https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/)

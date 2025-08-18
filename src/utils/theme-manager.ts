export type ThemeVariant = 'professional' | 'modern' | 'creative' | 'minimal';
export type ColorMode = 'light' | 'dark';

export interface ThemeConfig {
  name: string;
  description: string;
  fontFamily: string;
}

export const THEME_CONFIGS: Record<ThemeVariant, ThemeConfig> = {
  professional: {
    name: 'Professional',
    description: 'Clean and corporate design',
    fontFamily: 'Inter',
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary and fresh styling',
    fontFamily: 'Poppins',
  },
  creative: {
    name: 'Creative',
    description: 'Bold and artistic approach',
    fontFamily: 'Montserrat',
  },
  minimal: {
    name: 'Minimal',
    description: 'Simple and understated elegance',
    fontFamily: 'Source Sans Pro',
  },
};

class ThemeManager {
  private currentVariant: ThemeVariant = 'professional';
  private currentMode: ColorMode = 'light';
  private initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    if (this.initialized) return;

    this.loadSavedSettings();
    this.detectSystemMode();
    this.applyTheme();
    this.setupSystemThemeListener();
    this.initialized = true;
  }

  setTheme(variant: ThemeVariant, mode?: ColorMode) {
    this.currentVariant = variant;
    if (mode !== undefined) {
      this.currentMode = mode;
    }
    this.applyTheme();
    this.saveSettings();
    this.broadcastThemeChange();
  }

  setColorMode(mode: ColorMode) {
    this.currentMode = mode;
    this.applyTheme();
    this.saveSettings();
    this.broadcastThemeChange();
  }

  toggleColorMode() {
    this.setColorMode(this.currentMode === 'light' ? 'dark' : 'light');
  }

  getCurrentVariant(): ThemeVariant {
    return this.currentVariant;
  }

  getCurrentMode(): ColorMode {
    return this.currentMode;
  }

  getThemeConfig(variant?: ThemeVariant): ThemeConfig {
    return THEME_CONFIGS[variant || this.currentVariant];
  }

  private applyTheme() {
    if (typeof document === 'undefined') return;

    const config = this.getThemeConfig();
    const root = document.documentElement;

    root.setAttribute('data-theme', this.currentVariant);
    root.setAttribute('data-mode', this.currentMode);

    if (this.currentMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${this.currentVariant}`);

    root.style.setProperty('--font-family-primary', config.fontFamily);

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

  private loadSavedSettings() {
    try {
      const savedVariant = localStorage.getItem(
        'cv-theme-variant'
      ) as ThemeVariant;
      const savedMode = localStorage.getItem('cv-color-mode') as ColorMode;

      if (savedVariant && Object.keys(THEME_CONFIGS).includes(savedVariant)) {
        this.currentVariant = savedVariant;
      }

      if (savedMode && ['light', 'dark'].includes(savedMode)) {
        this.currentMode = savedMode;
      }
    } catch (error) {
      console.warn('Failed to load saved theme settings:', error);
    }
  }

  private saveSettings() {
    try {
      localStorage.setItem('cv-theme-variant', this.currentVariant);
      localStorage.setItem('cv-color-mode', this.currentMode);
    } catch (error) {
      console.warn('Failed to save theme settings:', error);
    }
  }

  private detectSystemMode() {
    if (typeof window === 'undefined') return;

    const savedMode = localStorage.getItem('cv-color-mode');
    if (!savedMode) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.currentMode = prefersDark ? 'dark' : 'light';
    }
  }

  private setupSystemThemeListener() {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      const savedMode = localStorage.getItem('cv-color-mode');
      if (!savedMode) {
        this.currentMode = e.matches ? 'dark' : 'light';
        this.applyTheme();
        this.broadcastThemeChange();
      }
    });
  }

  private broadcastThemeChange() {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(
      new CustomEvent('themeChange', {
        detail: {
          variant: this.currentVariant,
          mode: this.currentMode,
          config: this.getThemeConfig(),
        },
      })
    );
  }
}

export const themeManager = new ThemeManager();

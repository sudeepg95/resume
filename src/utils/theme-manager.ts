export type ThemeVariant = 'professional' | 'modern' | 'creative' | 'minimal';
export type ColorMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  border: string;
  surface: string;
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  name: string;
  description: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

export const THEME_CONFIGS: Record<ThemeVariant, ThemeConfig> = {
  professional: {
    primaryColor: '#1e40af',
    accentColor: '#60a5fa',
    fontFamily: 'Inter',
    borderRadius: '0.375rem',
    name: 'Professional',
    description: 'Clean and corporate design',
    colors: {
      light: {
        background: '#ffffff',
        backgroundSecondary: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb',
        surface: '#ffffff'
      },
      dark: {
        background: '#0f172a',
        backgroundSecondary: '#1e293b',
        text: '#f1f5f9',
        textSecondary: '#94a3b8',
        border: '#334155',
        surface: '#1e293b'
      }
    }
  },
  modern: {
    primaryColor: '#059669',
    accentColor: '#34d399',
    fontFamily: 'Poppins',
    borderRadius: '0.5rem',
    name: 'Modern',
    description: 'Contemporary and fresh styling',
    colors: {
      light: {
        background: '#ffffff',
        backgroundSecondary: '#f0fdf4',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#d1fae5',
        surface: '#ffffff'
      },
      dark: {
        background: '#0a0a0a',
        backgroundSecondary: '#052e16',
        text: '#ecfdf5',
        textSecondary: '#a7f3d0',
        border: '#166534',
        surface: '#052e16'
      }
    }
  },
  creative: {
    primaryColor: '#7c3aed',
    accentColor: '#a78bfa',
    fontFamily: 'Montserrat',
    borderRadius: '0.75rem',
    name: 'Creative',
    description: 'Bold and artistic approach',
    colors: {
      light: {
        background: '#ffffff',
        backgroundSecondary: '#faf5ff',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e9d5ff',
        surface: '#ffffff'
      },
      dark: {
        background: '#0c0a09',
        backgroundSecondary: '#2e1065',
        text: '#faf5ff',
        textSecondary: '#c4b5fd',
        border: '#5b21b6',
        surface: '#2e1065'
      }
    }
  },
  minimal: {
    primaryColor: '#374151',
    accentColor: '#9ca3af',
    fontFamily: 'Source Sans Pro',
    borderRadius: '0.25rem',
    name: 'Minimal',
    description: 'Simple and understated elegance',
    colors: {
      light: {
        background: '#ffffff',
        backgroundSecondary: '#f9fafb',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb',
        surface: '#ffffff'
      },
      dark: {
        background: '#111827',
        backgroundSecondary: '#1f2937',
        text: '#f9fafb',
        textSecondary: '#9ca3af',
        border: '#374151',
        surface: '#1f2937'
      }
    }
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

  getCurrentColors(): ThemeColors {
    const config = this.getThemeConfig();
    return config.colors[this.currentMode];
  }

  private applyTheme() {
    if (typeof document === 'undefined') return;

    const config = this.getThemeConfig();
    const colors = this.getCurrentColors();
    const root = document.documentElement;

    // Set theme attributes
    root.setAttribute('data-theme', this.currentVariant);
    root.setAttribute('data-mode', this.currentMode);

    // Apply theme colors
    root.style.setProperty('--color-primary', config.primaryColor);
    root.style.setProperty('--color-accent', config.accentColor);
    root.style.setProperty('--font-family-primary', config.fontFamily);
    root.style.setProperty('--border-radius', config.borderRadius);

    // Apply mode-specific colors
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-background-secondary', colors.backgroundSecondary);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-surface', colors.surface);

    // Force update body styles to ensure immediate color application
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;

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
      const savedVariant = localStorage.getItem('cv-theme-variant') as ThemeVariant;
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
    
    // Only auto-detect if no saved preference exists
    const savedMode = localStorage.getItem('cv-color-mode');
    if (!savedMode) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentMode = prefersDark ? 'dark' : 'light';
    }
  }

  private setupSystemThemeListener() {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
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
          colors: this.getCurrentColors()
        },
      })
    );
  }
}

export const themeManager = new ThemeManager();

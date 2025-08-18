/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        primary: {
          DEFAULT: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e40af',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e293b',
        },
        accent: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e293b',
        },
        text: {
          DEFAULT: '#1f2937',
          secondary: '#6b7280',
        },
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f8fafc',
        },
        border: {
          DEFAULT: '#e5e7eb',
          overlay: 'rgba(255, 255, 255, 0.2)',
        },

        overlay: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.15)',
          heavy: 'rgba(255, 255, 255, 0.2)',
          subtle: 'rgba(255, 255, 255, 0.05)',
          gradient: 'rgba(255, 255, 255, 0.4)',
        },
        shadow: {
          light: 'rgba(0, 0, 0, 0.05)',
          medium: 'rgba(0, 0, 0, 0.1)',
          heavy: 'rgba(0, 0, 0, 0.15)',
          extra: 'rgba(0, 0, 0, 0.3)',
          subtle: 'rgba(0, 0, 0, 0.06)',
          minimal: 'rgba(0, 0, 0, 0.04)',
          dark: 'rgba(0, 0, 0, 0.2)',
          'dark-heavy': 'rgba(0, 0, 0, 0.4)',
        },
      },

      spacing: {
        '30': '7.5rem',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'profile': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
      backdropFilter: {
        'blur-10': 'blur(10px)',
      },
      textShadow: {
        'header': '0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      maxWidth: {
        'letter': '8.5in',
      },
      minHeight: {
        'letter': '11in',
      },
      backgroundImage: {
        'pattern-professional': `linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)`,
        'pattern-modern': `linear-gradient(135deg, #059669 0%, #34d399 100%), 
                          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)`,
        'pattern-creative': `linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%),
                            conic-gradient(from 0deg at 50% 50%, rgba(124, 58, 237, 0.1) 0deg, transparent 60deg, rgba(167, 139, 250, 0.1) 120deg, transparent 180deg)`,
        'pattern-minimal': `linear-gradient(135deg, #374151 0%, #6b7280 100%),
                           linear-gradient(45deg, transparent 40%, rgba(107, 114, 128, 0.05) 50%, transparent 60%)`,
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-header': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.backdrop-blur-10': {
          backdropFilter: 'blur(10px)',
        },
        '[data-theme="professional"] .theme-bg': {
          backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        },
        '[data-theme="modern"] .theme-bg': {
          backgroundImage: `linear-gradient(135deg, #059669 0%, #34d399 100%), 
                            radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(52, 211, 153, 0.1) 0%, transparent 50%)`,
        },
        '[data-theme="creative"] .theme-bg': {
          backgroundImage: `linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%),
                            conic-gradient(from 0deg at 50% 50%, rgba(124, 58, 237, 0.1) 0deg, transparent 60deg, rgba(167, 139, 250, 0.1) 120deg, transparent 180deg)`,
        },
        '[data-theme="minimal"] .theme-bg': {
          backgroundImage: `linear-gradient(135deg, #374151 0%, #6b7280 100%),
                            linear-gradient(45deg, transparent 40%, rgba(107, 114, 128, 0.05) 50%, transparent 60%)`,
        },
        '[data-theme="professional"].dark .theme-bg': {
          backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        },
        '[data-theme="modern"].dark .theme-bg': {
          backgroundImage: `linear-gradient(135deg, #047857 0%, #059669 100%), 
                            radial-gradient(circle at 20% 80%, rgba(4, 120, 87, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.15) 0%, transparent 50%)`,
        },
        '[data-theme="creative"].dark .theme-bg': {
          backgroundImage: `linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%),
                            conic-gradient(from 0deg at 50% 50%, rgba(109, 40, 217, 0.15) 0deg, transparent 60deg, rgba(124, 58, 237, 0.15) 120deg, transparent 180deg)`,
        },
        '[data-theme="minimal"].dark .theme-bg': {
          backgroundImage: `linear-gradient(135deg, #1f2937 0%, #374151 100%),
                            linear-gradient(45deg, transparent 40%, rgba(55, 65, 81, 0.1) 50%, transparent 60%)`,
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

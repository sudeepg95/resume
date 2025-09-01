/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        serif: ['Lora', ...fontFamily.serif],
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
        charcoal: {
          DEFAULT: '#1E293B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        blue: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
      spacing: {
        30: '7.5rem',
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
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        profile: '0 8px 32px rgba(0, 0, 0, 0.3)',
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
        header: '0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      maxWidth: {
        letter: '8.5in',
      },
      minHeight: {
        letter: '11in',
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
  plugins: [],
};

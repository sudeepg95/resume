# Phase 1: Repository Setup & Configuration

## Overview

This phase establishes the foundation for "Sudeep's Resume" by setting up the Astro.js project, installing dependencies, and configuring the development environment.

## Prerequisites

- Node.js 18+ installed (use asdf and .tool-versions)
- npm package manager
- Git for version control

## Implementation Steps

### Step 1: Initialize Astro Project

```bash
# Create new Astro project
npm create astro@latest cv-generator -- --template minimal --typescript

# Use existing folder as root for repository

# Initialize git repository in case already not done
git init
```

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install @astrojs/tailwind @astrojs/sitemap @astrojs/compress zod gray-matter

# Development dependencies
npm install -D @types/node prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Optional: Testing dependencies (for later phases)
npm install -D vitest @astrojs/check
# npm install -D @playwright/test - SKIP for now

# Optional: PDF export (for later phases)
npm install html2pdf.js

# Optional: Performance monitoring - SKIP for now
npm install web-vitals
```

### Step 3: Configure Astro

Create or update `astro.config.mjs`:

```typescript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from '@astrojs/compress';

export default defineConfig({
  site: 'https://sudeepg95.github.io/resume',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap(),
    compress({
      css: true,
      html: true,
      img: true,
      js: true,
      svg: true,
    }),
  ],
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
    minify: true,
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'pdf-export': ['html2pdf.js'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['html2pdf.js'],
    },
  },
});
```

### Step 4: Configure TypeScript

Update `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/layouts/*": ["src/layouts/*"],
      "@/utils/*": ["src/utils/*"],
      "@/styles/*": ["src/styles/*"],
      "@/data/*": ["src/data/*"]
    },
    "allowJs": true,
    "checkJs": false,
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*", ".astro/**/*"]
}
```

### Step 5: Setup Project Structure

Create the following directory structure:

```
<existing-folder>/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI components
│   │   └── sections/       # CV section components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── utils/              # Utility functions
│   │   ├── schemas/        # Zod schemas
│   │   ├── helpers/        # Helper functions
│   │   └── constants/      # Constants and configs
│   ├── styles/             # Global styles
│   │   ├── globals.css     # Global CSS
│   │   ├── components.css  # Component styles
│   │   └── themes.css      # Theme variables
│   ├── data/               # Resume data files
│   └── assets/             # Static assets
│       ├── images/         # Images
│       ├── icons/          # SVG icons
│       └── fonts/          # Custom fonts
├── public/                 # Public static files
│   ├── favicon.svg
│   ├── og-image.jpg
│   └── robots.txt
├── tests/                  # Test files (for later phases)
├── .gitignore
├── .prettierrc
├── .eslintrc.js
├── package.json
├── astro.config.mjs
└── tsconfig.json
```

### Step 6: Configure Development Tools

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

Create `.eslintrc.js`:

```javascript
module.exports = {
  extends: ['eslint:recommended', '@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  ],
};
```

Create `.gitignore`:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
.astro/

# Environment variables
.env
.env.local
.env.production

# Logs
npm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# IDEs and editors
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Temporary folders
tmp/
temp/

# Test outputs
test-results/
```

### Step 7: Setup Package Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "eslint . --ext .js,.ts,.astro",
    "lint:fix": "eslint . --ext .js,.ts,.astro --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "astro check",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "build:analyze": "astro build --analyze",
    "optimize": "npm run build && npm run compress",
    "compress": "npx imagemin 'dist/**/*.{jpg,png,svg}' --out-dir=dist"
  }
}
```

### Step 8: Create Basic Global Styles

Create `src/styles/globals.css`:

```css
/* CSS Reset and Global Styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Base Colors */
  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Theme Colors (Professional) */
  --color-primary: #1e40af;
  --color-accent: #3b82f6;
  --color-text: #1f2937;
  --color-text-secondary: #6b7280;
  --color-background: #ffffff;
  --color-background-secondary: #f8fafc;
  --color-border: #e5e7eb;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Typography */
  --font-family-primary:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-heading: var(--font-family-primary);
  --font-family-mono:
    'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;

  /* Spacing Scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Border Radius */
  --border-radius-sm: 0.25rem;
  --border-radius: 0.375rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
  --border-radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md:
    0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl:
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;

  /* Z-index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

html {
  font-family: var(--font-family-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  color: var(--color-text);
  background-color: var(--color-background);
  font-size: 1rem;
  line-height: 1.6;
}

/* Typography */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-heading);
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text);
}

h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.5rem;
}
h4 {
  font-size: 1.25rem;
}
h5 {
  font-size: 1.125rem;
}
h6 {
  font-size: 1rem;
}

p {
  margin-bottom: 1rem;
  color: var(--color-text);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-accent);
}

/* Utility Classes */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.no-print {
  @media print {
    display: none !important;
  }
}

/* Print Styles */
@media print {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  @page {
    margin: 0.5in;
    size: letter;
  }

  body {
    font-size: 12pt;
    line-height: 1.4;
  }

  h1 {
    font-size: 18pt;
  }
  h2 {
    font-size: 16pt;
  }
  h3 {
    font-size: 14pt;
  }
  h4 {
    font-size: 13pt;
  }
  h5 {
    font-size: 12pt;
  }
  h6 {
    font-size: 11pt;
  }
}

/* Responsive Typography */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.25rem;
  }
}
```

### Step 9: Create Development Environment File

Create `.env.example`:

```env
# Site Configuration
SITE_URL=http://localhost:3000
SITE_NAME="Sudeep's Resume"

# Build Configuration
NODE_ENV=development
```

## TODO List for Phase 1

### ✅ Project Initialization

- [ ] Run `npm create astro@latest cv-generator`
- [ ] Navigate to project directory
- [ ] Initialize git repository
- [ ] Create initial commit

### ✅ Dependencies Installation

- [ ] Install core Astro integrations (`@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/compress`)
- [ ] Install schema validation (`zod`)
- [ ] Install development tools (`@types/node`, `prettier`, `eslint`)
- [ ] Install optional dependencies for later phases
- [ ] Verify all packages installed correctly

### ✅ Configuration Setup

- [ ] Update `astro.config.mjs` with integrations and build settings
- [ ] Configure TypeScript with path aliases in `tsconfig.json`
- [ ] Setup Prettier configuration in `.prettierrc`
- [ ] Setup ESLint configuration in `.eslintrc.js`
- [ ] Create comprehensive `.gitignore`

### ✅ Project Structure

- [ ] Create `src/components/` directory structure
- [ ] Create `src/layouts/` directory
- [ ] Create `src/utils/` with subdirectories
- [ ] Create `src/styles/` directory
- [ ] Create `src/data/` directory for resume data
- [ ] Create `src/assets/` directory structure
- [ ] Create `tests/` directory for later phases

### ✅ Global Styles & Configuration

- [ ] Create `src/styles/globals.css` with CSS variables and base styles
- [ ] Setup CSS custom properties for theming
- [ ] Configure responsive typography
- [ ] Add print-specific styles
- [ ] Create utility classes

### ✅ Development Environment

- [ ] Update package.json scripts for development workflow
- [ ] Create `.env.example` for environment variables
- [ ] Test development server with `npm run dev`
- [ ] Verify hot reloading works
- [ ] Test build process with `npm run build`

### ✅ Version Control

- [ ] Stage all initial files
- [ ] Create meaningful commit message
- [ ] Push to remote repository (GitHub/GitLab)
- [ ] Verify all files are tracked correctly

### ✅ Quality Assurance

- [ ] Run `npm run lint` to check for linting errors
- [ ] Run `npm run format:check` to verify formatting
- [ ] Run `npm run type-check` to verify TypeScript
- [ ] Test that all npm scripts work correctly

## Verification Checklist

Before proceeding to Phase 2, ensure:

1. **Development server starts without errors**: `npm run dev`
2. **Build completes successfully**: `npm run build`
3. **All linting passes**: `npm run lint`
4. **TypeScript compiles without errors**: `npm run type-check`
5. **Project structure matches specification**: All directories created
6. **Git repository is properly initialized**: Commits work, remote connected
7. **Environment configuration is correct**: Variables loaded properly

## Next Steps

Once Phase 1 is complete, proceed to **Phase 2: Template Implementation with Lorem Ipsum** where you'll:

1. Create basic layout components
2. Build static CV sections with placeholder content
3. Implement responsive design
4. Add basic theming system

## Troubleshooting

### Common Issues

**Node version errors**: Ensure Node.js 18+ is installed

```bash
node --version  # Should be 18.0.0 or higher
```

**Dependency conflicts**: Clear cache and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript path errors**: Verify `tsconfig.json` paths configuration

```bash
npm run type-check
```

**Build errors**: Check Astro configuration syntax

```bash
npm run build -- --verbose
```

## Resources

- [Astro.js Documentation](https://docs.astro.build/)
- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)
- [Tailwind CSS with Astro](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
- [Zod Schema Validation](https://zod.dev/)

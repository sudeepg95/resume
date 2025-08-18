import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://sudeepg95.github.io/resume',
  output: 'static',
  integrations: [tailwind(), sitemap(), icon()],
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
            vendor: ['zod'],
            analytics: ['../utils/analytics.ts'],
          },
        },
      },
    },
  },
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sudeepg95.github.io/resume',
  output: 'static',
  integrations: [tailwind(), sitemap()],
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

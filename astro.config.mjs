import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://sudeepg95.github.io',
  base: '/resume',
  integrations: [tailwind(), sitemap(), icon()],
});

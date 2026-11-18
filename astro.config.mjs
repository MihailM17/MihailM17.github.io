// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://MihailM17.github.io',
  base: '/',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
  redirects: {
    '/projects/tdb-play': '/companies/tdb-play',
    '/projects/good-game-festival': '/companies/tdb-play',
    '/projects/vivacom-game-on': '/companies/tdb-play',
  },
});

// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://MihailM17.github.io',
  base: '/Astro-Website/',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});

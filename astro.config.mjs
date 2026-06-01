import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://fvergarap.github.io',
  base: '/front-elinad-cuerdas',
});

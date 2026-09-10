// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.emmastephensonmusic.com',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
});

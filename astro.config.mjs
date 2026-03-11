import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jdilig.me',
  output: 'static',
  adapter: vercel(),
  integrations: [mdx(), sitemap(), preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});

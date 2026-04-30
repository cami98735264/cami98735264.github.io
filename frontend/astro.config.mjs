// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import react from '@astrojs/react';

/** @param {string} p */
const r = (p) => fileURLToPath(new URL(p, import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://cami98735264.github.io",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  output: "static",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    icon(),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-ES", en: "en-US" },
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@layouts': r('./src/layouts'),
        '@features': r('./src/features'),
        '@ui': r('./src/shared/ui'),
        '@layout': r('./src/shared/layout'),
        '@motion': r('./src/shared/motion'),
        '@i18n': r('./src/shared/i18n'),
        '@config': r('./src/shared/config'),
        '@lib': r('./src/shared/lib'),
        '@styles': r('./src/styles'),
        '@assets': r('./src/assets'),
      },
    },
  },
});

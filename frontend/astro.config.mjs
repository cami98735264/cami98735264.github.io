// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import react from '@astrojs/react';

const defaultLocale = "es";
const locales = {
  es: "es-ES",
  en: "en-US",
};

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    icon(),
    i18n({
      locales,
      defaultLocale,
      redirectDefaultLocale: true,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  site: "https://cami98735264.github.io",
  base: "/portfolio-v3",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  output: "static",
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

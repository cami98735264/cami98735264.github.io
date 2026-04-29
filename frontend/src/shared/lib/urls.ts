import { getLocale } from "astro-i18n-aut";

/**
 * True when the current path is the root landing page for any locale.
 * Used to decide between in-page anchors (`#projects`) and full URLs
 * (`/es/#proyectos`).
 */
export function isLandingPage(url: URL): boolean {
  const locale = getLocale(url);
  const pathname = url.pathname;
  return (
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`
  );
}

import { getLocale } from "astro-i18n-aut";

/**
 * Astro normalises this to "/" when no `base` is configured, or to
 * "/<base>/" (with trailing slash) when one is — see Vite's BASE_URL.
 * Every helper here treats it as the canonical prefix.
 */
const BASE = import.meta.env.BASE_URL;

/** Strip the configured base prefix from a pathname so we can compare
 *  routes the way the source files declare them. */
function stripBase(pathname: string): string {
  if (BASE === "/" || !pathname.startsWith(BASE)) return pathname;
  const rest = pathname.slice(BASE.length);
  return rest.startsWith("/") ? rest : `/${rest}`;
}

/**
 * Prefix an internal absolute path with the deploy base. Pass paths
 * starting with "/" (e.g. "/en/", "/projects/3/") — the base is added
 * automatically and trailing slashes from BASE are not duplicated.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return `${BASE}${path}`;
  return `${BASE.replace(/\/$/, "")}${path}`;
}

/**
 * True when the current path is the root landing page for any locale.
 * Used to decide between in-page anchors (`#projects`) and full URLs
 * (`/es/#proyectos`).
 */
export function isLandingPage(url: URL): boolean {
  const locale = getLocale(url);
  const pathname = stripBase(url.pathname);
  return (
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`
  );
}

import { getRelativeLocaleUrl } from "astro:i18n";

export const localeTags = { es: "es-ES", en: "en-US" } as const;
export type Locale = keyof typeof localeTags;
export const locales = Object.keys(localeTags) as Locale[];
export const defaultLocale: Locale = "es";

export function currentLocale(astroLocale: string | undefined): Locale {
  return astroLocale === "en" || astroLocale === "es"
    ? astroLocale
    : defaultLocale;
}

export function localeFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(en|es)(?=\/|$)/);
  return (match?.[1] as Locale) ?? defaultLocale;
}

function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

export function localeUrl(locale: Locale, path: string): string {
  const [pathname, hashAndQuery = ""] = splitHash(path);
  return getRelativeLocaleUrl(locale, pathname) + hashAndQuery;
}

export function getAllLocaleUrls(pathname: string): Record<Locale, string> {
  const stripped = stripLocalePrefix(pathname);
  return Object.fromEntries(
    locales.map((loc) => [loc, getRelativeLocaleUrl(loc, stripped)]),
  ) as Record<Locale, string>;
}

export function switchUrl(currentPathname: string, target: Locale): string {
  return getRelativeLocaleUrl(target, stripLocalePrefix(currentPathname));
}

function splitHash(path: string): [string, string] {
  const hashIdx = path.indexOf("#");
  const queryIdx = path.indexOf("?");
  const splitIdx =
    hashIdx === -1 ? queryIdx : queryIdx === -1 ? hashIdx : Math.min(hashIdx, queryIdx);
  if (splitIdx === -1) return [path, ""];
  return [path.slice(0, splitIdx), path.slice(splitIdx)];
}

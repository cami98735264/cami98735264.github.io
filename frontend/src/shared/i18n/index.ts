import { translationsSchema, type Translations } from "./schema";

export type Locale = "en" | "es";

const cache = new Map<Locale, Translations>();

export async function loadTranslations(locale: string): Promise<Translations> {
  const key = (locale === "en" || locale === "es" ? locale : "es") as Locale;
  const cached = cache.get(key);
  if (cached) return cached;

  const raw = (await import(`../../../locales/${key}.json`)).default;
  const result = translationsSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      `[i18n] ${key}.json failed schema validation: ${result.error.message}`,
    );
  }
  cache.set(key, result.data);
  return result.data;
}

export type {
  Translations,
  Project,
  Experience,
  Technology,
  Education,
  Language,
} from "./schema";

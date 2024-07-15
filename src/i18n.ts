import { translations as enTranslations } from "./locales/en";
import type { BaseTranslations } from "./locales/fr";
import { translations as frTranslations } from "./locales/fr";

export type Lang = "fr" | "en";

export const langs: Lang[] = ["fr", "en"];
export const defaultLangKey: Lang = "fr";

export const getCurrentLangKey = (): Lang => {
  if (typeof window === "undefined") return defaultLangKey;
  const lang = location.pathname.split("/")[1];
  if ((langs as string[]).includes(lang)) {
    return lang as Lang;
  }
  return defaultLangKey;
};

export interface ContentProps<T> {
  content: T;
}

// Tried dynamic import but could not make it work (module not found error)
type TranslationsLangMapping = {
  [K in Lang]: BaseTranslations;
};
const translationsLangMapping: TranslationsLangMapping = {
  fr: frTranslations,
  en: enTranslations,
};

/**
 * Translates a given path for a specified language.
 *
 * @param path - The path to be translated. This should be a string containing path parts separated by "/".
 * @param lang - The target language for the translation. This should be a value from the Lang enum.
 * @param currentLang - Optional. The current language of the path. This is optional and if not provided, "project" and "object" are used as default values.
 *
 * @returns The translated path. If the current language is the same as the target language, the original path is returned.
 *
 * The function works by splitting the path into parts, translating the parts that match "project" or "object" in the current language to their equivalents in the target language, and then reassembling the path.
 *
 * Note: The function assumes that the last part of the path (or the second last part if the path ends with "/") is a "slug" that should not be translated. This is determined by the `slugIndex` variable.
 */
const translatePrefixPath = (
  path: string,
  lang: Lang,
  currentLang?: Lang,
): string => {
  if (currentLang && lang === currentLang) return path;
  const translations: BaseTranslations = translationsLangMapping[lang],
    slugIndex = path.endsWith("/") ? -2 : -1, // if path is object or project page, slug wil be at this index
    pathParts = path.split("/");

  const projectInCurrentLang = currentLang
      ? translationsLangMapping[currentLang].project.toLowerCase()
      : "project",
    objectInCurrentLang = currentLang
      ? translationsLangMapping[currentLang].object.toLowerCase()
      : "object";

  const localizedInitialPath = pathParts
    .slice(0, slugIndex)
    .map((part) => {
      if (part === objectInCurrentLang) {
        return translations.object.toLowerCase();
      } else if (part === projectInCurrentLang) {
        return translations.project.toLowerCase();
      }
      return part;
    })
    .join("/");
  return `${localizedInitialPath}/${pathParts.slice(slugIndex).join("/")}`;
};

export const localizePathToCurrenLange = (path: string): string => {
  const lang = getCurrentLangKey();
  return localizePath(path, lang);
};

export const localizePath = (path: string, lang: Lang): string => {
  let translatedPath = translatePrefixPath(path, lang);
  if (!translatedPath.startsWith(`/${lang}`)) {
    return (translatedPath = `/${lang}` + translatedPath);
  }
  return translatedPath.replaceAll("//", "/");
};

export const changePathLocale = (
  path: string,
  newLang: Lang,
  oldLang: Lang,
): string => {
  return translatePrefixPath(path, newLang, oldLang).replace(
    `${oldLang}/`,
    `${newLang}/`,
  );
};

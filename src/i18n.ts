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

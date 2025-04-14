import { useEffect, useState } from "react";

import { Lang } from "../i18n";
import defaultTranslations from "../locales/fr";
import { LangContext as ILangContext } from "../types/context";

export default function useTranslations(lang: Lang) {
  const [translations, setCurrentTranslations] =
    useState<ILangContext["translations"]>(defaultTranslations);

  useEffect(() => {
    if (lang) {
      import(`../locales/${lang}.ts`).then((t) => {
        setCurrentTranslations(t.default as typeof defaultTranslations);
      });
    }
  }, [lang]);

  return translations;
}

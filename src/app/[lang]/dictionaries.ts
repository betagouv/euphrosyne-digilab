import { Lang } from "@/i18n";

import en from "../../locales/en";
import fr from "../../locales/fr";

const dictionaries = {
  fr,
  en,
};

export const getTranslations = (locale: Lang) => dictionaries[locale];

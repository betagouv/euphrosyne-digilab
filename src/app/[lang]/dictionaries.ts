import fr from "../../dictionaries/fr";
import en from "../../dictionaries/en";
import { Lang } from "@/i18n";

const dictionaries = {
  fr,
  en,
};

export const getTranslations = (locale: Lang) => dictionaries[locale];

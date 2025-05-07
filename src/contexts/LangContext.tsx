import { createContext } from "react";

import { getTranslations } from "@/app/[lang]/dictionaries";

import { LangContext as ILangContext } from "../types/context";

const defaultTranslations = getTranslations("fr");

export const LangContext = createContext<ILangContext>({
  translations: defaultTranslations,
});

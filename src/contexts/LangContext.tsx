import { createContext } from "react";

import { LangContext as ILangContext } from "../types/context";
import { getTranslations } from "@/app/[lang]/dictionaries";

const defaultTranslations = getTranslations("fr");

export const LangContext = createContext<ILangContext>({
  translations: defaultTranslations,
});

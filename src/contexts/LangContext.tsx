import { createContext } from "react";

import defaultTranslations from "../locales/fr";
import { LangContext as ILangContext } from "../types/context";

export const LangContext = createContext<ILangContext>({
  translations: defaultTranslations,
});

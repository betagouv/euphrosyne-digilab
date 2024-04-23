import { SetStateAction } from "react";

import defaultTranslations from "../locales/fr";

export interface PageContext {
  currentProject: {
    name: string;
    slug: string;
  } | null;
  setCurrentProject: React.Dispatch<
    SetStateAction<PageContext["currentProject"]>
  > | null;
}

export interface LangContext {
  translations: typeof defaultTranslations;
}

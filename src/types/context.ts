import { SetStateAction } from "react";

import defaultTranslations from "../locales/fr";

export interface IPageContext {
  currentProject: {
    name: string;
    slug: string;
  } | null;
  setCurrentProject: React.Dispatch<
    SetStateAction<IPageContext["currentProject"]>
  > | null;
}

export interface LangContext {
  translations: typeof defaultTranslations;
}

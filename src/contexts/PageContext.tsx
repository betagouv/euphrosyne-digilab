import { createContext } from "react";

import { PageContext as IPageContext } from "../types/context";

export const PageContext = createContext<IPageContext>({
  currentProject: null,
  setCurrentProject: null,
});

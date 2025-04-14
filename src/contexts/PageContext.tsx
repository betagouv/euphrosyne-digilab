import { createContext } from "react";

import { IPageContext } from "../types/context";

export const PageContext = createContext<IPageContext>({
  currentProject: null,
  setCurrentProject: null,
});

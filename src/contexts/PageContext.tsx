import { createContext } from "react";

export const PageContext = createContext<PageContext>({
  currentProject: null,
  setCurrentProject: null,
});

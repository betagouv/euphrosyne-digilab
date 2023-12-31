import { SetStateAction } from "react";

export interface PageContext {
  currentProject: {
    name: string;
    slug: string;
  } | null;
  setCurrentProject: React.Dispatch<
    SetStateAction<PageContext["currentProject"]>
  > | null;
}

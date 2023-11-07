type PageContext = {
  currentProject: {
    name: string;
    slug: string;
  } | null;
  setCurrentProject: React.Dispatch<
    SetStateAction<PageContext["currentProject"]>
  > | null;
};

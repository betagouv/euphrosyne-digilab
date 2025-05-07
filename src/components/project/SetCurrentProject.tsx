"use client";

import { useContext, useEffect } from "react";

import { PageContext } from "@/contexts/PageContext";
import { IProjectItem } from "@/types/ICatalog";

export default function SetCurrentProject({
  project,
}: {
  project: IProjectItem;
}) {
  const { setCurrentProject } = useContext(PageContext);

  useEffect(() => {
    if (setCurrentProject) {
      setCurrentProject({
        name: project.name,
        slug: project.slug,
      });
    }
  }, [project, setCurrentProject]);
  return <></>;
}

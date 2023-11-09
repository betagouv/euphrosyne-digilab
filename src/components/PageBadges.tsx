import Badge from "@codegouvfr/react-dsfr/Badge";
import { css } from "@emotion/react";
import React from "react";

import { ProjectStatus } from "../types/project";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

export const PageBadges = ({
  pageType,
  projectStatus,
  className,
}: {
  pageType: "project" | "objectGroup";
  projectStatus?: ProjectStatus;
  className?: string;
}) => {
  return (
    <div
      css={css`
        display: flex;
      `}
      className={className}
    >
      {pageType === "project" && <Badge severity="info">Projet</Badge>}
      {pageType === "objectGroup" && (
        <Badge severity="new">Groupe d'objets</Badge>
      )}
      {projectStatus && (
        <ProjectStatusBadge status={projectStatus} className="fr-ml-1w" />
      )}
    </div>
  );
};

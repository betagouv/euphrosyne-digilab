import React from "react";
import { css } from "@emotion/react";

import { ProjectStatusBadge } from "./ProjectStatusBadge";
import Badge from "@codegouvfr/react-dsfr/Badge";

export const PageBadges = ({
  pageType,
  projectStatus,
  className,
}: {
  pageType: "project" | "object";
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
      {pageType === "project" && (
        <>
          {<Badge severity="info">Projet</Badge>}
          {projectStatus && (
            <ProjectStatusBadge status={projectStatus} className="fr-ml-1w" />
          )}
        </>
      )}
    </div>
  );
};

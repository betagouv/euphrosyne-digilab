import Badge from "@codegouvfr/react-dsfr/Badge";
import { css } from "@emotion/react";
import React from "react";

import { ContentProps } from "../i18n";
import { ProjectStatus } from "../types/project";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

export interface PageBadgesContent {
  project: string;
  objectGroup: string;
}

export const PageBadges = ({
  pageType,
  projectStatus,
  className,
  content,
}: {
  pageType: "project" | "objectGroup";
  projectStatus?: ProjectStatus;
  className?: string;
} & ContentProps<PageBadgesContent>) => {
  return (
    <div
      css={css`
        display: flex;
      `}
      className={className}
    >
      {pageType === "project" && (
        <Badge severity="info">{content.project}</Badge>
      )}
      {pageType === "objectGroup" && (
        <Badge severity="new">{content.objectGroup}</Badge>
      )}
      {projectStatus && (
        <ProjectStatusBadge status={projectStatus} className="fr-ml-1w" />
      )}
    </div>
  );
};

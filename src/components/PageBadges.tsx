"use client";

import Badge from "@codegouvfr/react-dsfr/Badge";
import { useStyles } from "tss-react";
import { useContext } from "react";

import { LangContext } from "../contexts/LangContext";
import { ProjectStatus } from "../types/project";
import {
  ProjectStatusBadge,
  ProjectStatusBadgeContent,
} from "./ProjectStatusBadge";

export type PageBadgeType = "project" | "objectGroup";

export interface PageBadgesContent {
  project: string;
  objectGroup: string;

  projectStatusBadge: ProjectStatusBadgeContent;
}

export const PageBadges = ({
  pageType,
  projectStatus,
  className,
}: {
  pageType: PageBadgeType;
  projectStatus?: ProjectStatus;
  className?: string;
}) => {
  const { css } = useStyles();
  const content = useContext(LangContext).translations.pageBadges;
  return (
    <div className={`${css({ display: "flex" })} ${className}`}>
      {pageType === "project" && (
        <Badge severity="info">{content.project}</Badge>
      )}
      {pageType === "objectGroup" && (
        <Badge severity="new">{content.objectGroup}</Badge>
      )}
      {projectStatus && (
        <ProjectStatusBadge
          status={projectStatus}
          content={content.projectStatusBadge}
          className="fr-ml-1w"
        />
      )}
    </div>
  );
};

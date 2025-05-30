"use client";

import Badge from "@codegouvfr/react-dsfr/Badge";
import { useContext } from "react";
import { useStyles } from "tss-react";

import {
  ProjectStatusBadge,
  ProjectStatusBadgeContent,
} from "./ProjectStatusBadge";
import { LangContext } from "../contexts/LangContext";

export type PageBadgeType = "project" | "objectGroup";

export interface PageBadgesContent {
  project: string;
  objectGroup: string;

  projectStatusBadge: ProjectStatusBadgeContent;
}

export const PageBadges = ({
  pageType,
  dataAvailable,
  className,
}: {
  pageType: PageBadgeType;
  dataAvailable?: boolean;
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
      {dataAvailable != null && (
        <ProjectStatusBadge
          dataAvailable={dataAvailable}
          content={content.projectStatusBadge}
          className="fr-ml-1w"
        />
      )}
    </div>
  );
};

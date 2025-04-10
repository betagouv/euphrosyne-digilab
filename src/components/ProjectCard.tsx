import { Card } from "@codegouvfr/react-dsfr/Card";
import { css } from "@emotion/react";

import { ContentProps } from "../i18n";
import { ProjectStatus } from "../types/project";
import { ellipse } from "../utils";
import {
  ProjectStatusBadge,
  ProjectStatusBadgeContent,
} from "./ProjectStatusBadge";
import ObjectGroupMaterialTags from "./object-group/ObjectGroupMaterialTags";

export interface ProjectCardContent {
  project: string;
  objectGroup: string;

  projectImage: string;

  projectStatusBadge: ProjectStatusBadgeContent;
}

interface Project {
  status: string;
  comments: string | null;
  name: string;
  slug: string;
  materials: readonly string[] | null;
  pagePath: string;
  thumbnail: { url: string; copyright: string } | null;
  placeholderImage: { publicURL: string } | null;
}

export const ProjectCard = ({
  project,
  content,
}: { project: Project } & ContentProps<ProjectCardContent>) => {
  const thumbnail =
    project.thumbnail?.url ||
    project.placeholderImage?.publicURL ||
    "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png";

  return (
    <Card
      background
      badge={
        <ProjectStatusBadge
          status={project.status as ProjectStatus}
          content={content.projectStatusBadge}
        />
      }
      border
      desc={ellipse(project.comments, 100)}
      enlargeLink
      imageAlt={content.projectImage.replace("{}", project.name)}
      imageUrl={thumbnail}
      linkProps={{
        to: project.pagePath,
      }}
      size="medium"
      start={
        <ObjectGroupMaterialTags
          materials={(project.materials || []).slice(0, 3)}
        ></ObjectGroupMaterialTags>
      }
      title={project.name}
      titleAs="h3"
      css={css`
        min-height: 470px;
      `}
    />
  );
};

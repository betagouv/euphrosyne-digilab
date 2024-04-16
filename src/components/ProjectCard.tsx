import { Card } from "@codegouvfr/react-dsfr/Card";
import { css } from "@emotion/react";

import { ContentProps } from "../i18n";
import placeHolderImage from "../images/card-placeholder-16x9.png";
import { Project } from "../types/project";
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

export const ProjectCard = ({
  project,
  content,
}: { project: Project } & ContentProps<ProjectCardContent>) => {
  return (
    <Card
      background
      badge={
        <ProjectStatusBadge
          status={project.status}
          content={content.projectStatusBadge}
        />
      }
      border
      desc={ellipse(project.comments, 100)}
      enlargeLink
      imageAlt={content.projectImage.replace("{}", project.name)}
      imageUrl={placeHolderImage}
      linkProps={{
        to: `/project/${project.slug}`,
      }}
      size="medium"
      start={
        <ObjectGroupMaterialTags
          materials={project.objectGroupMaterials.slice(0, 3)}
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

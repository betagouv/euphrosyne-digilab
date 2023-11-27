import { Card } from "@codegouvfr/react-dsfr/Card";
import { css } from "@emotion/react";

import placeHolderImage from "../images/card-placeholder-16x9.png";
import { Project } from "../types/project";
import { ellipse } from "../utils";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import ObjectGroupMaterialTags from "./object-group/ObjectGroupMaterialTags";

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card
      background
      badge={<ProjectStatusBadge status={project.status} />}
      border
      desc={ellipse(project.comments, 100)}
      enlargeLink
      imageAlt={`Image du projet ${project.name}`}
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

import { css } from "@emotion/react";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";

import placeHolderImage from "../images/card-placeholder-16x9.png";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ellipse } from "../utils";

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
        href: `/project/${project.slug}`,
      }}
      size="medium"
      start={
        <ul className="fr-tags-group">
          {project.objectGroupLabels.slice(0, 3).map((label) => (
            <li key={label}>
              <Tag>{ellipse(label, 15)}</Tag>
            </li>
          ))}
        </ul>
      }
      title={project.name}
      titleAs="h3"
      css={css`
        min-height: 470px;
      `}
    />
  );
};

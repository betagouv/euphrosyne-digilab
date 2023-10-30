import { css } from "@emotion/react";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";

import { Project } from "../types/project";
import placeHolderImage from "../images/card-placeholder-16x9.png";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card
      background
      badge={<ProjectStatusBadge project={project} />}
      border
      desc={
        project.comments.slice(0, 100).trim() +
        (project.comments.length > 100 ? "..." : "")
      }
      enlargeLink
      imageAlt={`Image du projet ${project.name}`}
      imageUrl={placeHolderImage}
      linkProps={{
        href: "#",
      }}
      size="medium"
      start={
        <ul className="fr-tags-group">
          {project.objectGroupLabels.slice(0, 3).map((label) => (
            <li key={label}>
              <Tag>
                {label.slice(0, 15)}
                {label.length > 15 && "..."}
              </Tag>
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

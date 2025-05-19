import { Card } from "@codegouvfr/react-dsfr/Card";

import { buildCatalogItemPath } from "@/catalog/utils";
import { getDeterministicPlaceholderImage } from "@/placeholder";
import { IProjectItem } from "@/types/ICatalog";

import { ContentProps, WithCurrentLang, localizePath } from "../i18n";
import { ProjectStatus } from "../types/project";
import { ellipse } from "../utils";
import ObjectGroupMaterialTags from "./object-group/ObjectGroupMaterialTags";
import {
  ProjectStatusBadge,
  ProjectStatusBadgeContent,
} from "./ProjectStatusBadge";

export interface ProjectCardContent {
  project: string;
  objectGroup: string;

  projectImage: string;

  projectStatusBadge: ProjectStatusBadgeContent;
}

export const ProjectCard = ({
  project,
  content,
  currentLang,
}: {
  project: IProjectItem;
} & WithCurrentLang &
  ContentProps<ProjectCardContent>) => {
  const thumbnail =
    project.thumbnail?.url ||
    getDeterministicPlaceholderImage(project.slug) ||
    "/images/default-placeholder-16x9.png";

  const link = localizePath(buildCatalogItemPath(project), currentLang);

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
        href: link,
      }}
      size="medium"
      start={
        <ObjectGroupMaterialTags
          materials={(project.materials || []).slice(0, 3)}
        ></ObjectGroupMaterialTags>
      }
      title={project.name}
      titleAs="h3"
      style={{
        minHeight: "470px",
      }}
    />
  );
};

import { ContentProps } from "../../i18n";
import type { Project } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { ProjectCard, ProjectCardContent } from "../ProjectCard";

export interface ProjectListSectionContent {
  title: string;
  projectCard: ProjectCardContent;
}

export const ProjectListSection = ({
  projects,
  content,
}: {
  projects: Queries.HomePageQuery["allProject"]["nodes"];
} & ContentProps<ProjectListSectionContent>) => {
  return (
    <BaseSection>
      <div>
        <h3>{content.title}</h3>
      </div>
      <div className="fr-grid-row fr-grid-row--gutters">
        {projects.map((project) => (
          <div
            className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-p-7w"
            key={project.name}
          >
            <ProjectCard
              project={project as Project}
              content={content.projectCard}
            />
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

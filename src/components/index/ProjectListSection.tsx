import { ContentProps } from "../../i18n";
import { Project } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { ProjectCard } from "../ProjectCard";

export interface ProjectListSectionContent {
  title: string;
}

export const ProjectListSection = ({
  projects,
  content,
}: { projects: Project[] } & ContentProps<ProjectListSectionContent>) => {
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
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

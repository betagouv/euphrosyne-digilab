import { ContentProps, WithCurrentLang } from "@/i18n";
import { IProjectItem } from "@/types/ICatalog";

import { BaseSection } from "../BaseSection";
import { ProjectCard, ProjectCardContent } from "../ProjectCard";

export interface ProjectListSectionContent {
  title: string;
  projectCard: ProjectCardContent;
}

export const ProjectListSection = ({
  projects,
  currentLang,
  content,
}: {
  projects: IProjectItem[];
} & WithCurrentLang &
  ContentProps<ProjectListSectionContent>) => {
  return (
    <BaseSection>
      <div>
        <h3>{content.title}</h3>
      </div>
      <div className="fr-grid-row fr-grid-row--gutters">
        {projects.map((project) => (
          <div
            className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-p-4w"
            key={project.name}
          >
            <ProjectCard
              project={project}
              content={content.projectCard}
              currentLang={currentLang}
            />
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

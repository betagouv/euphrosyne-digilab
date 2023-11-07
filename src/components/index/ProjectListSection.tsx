import { Project } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { ProjectCard } from "../ProjectCard";

export const ProjectListSection = ({ projects }: { projects: Project[] }) => {
  return (
    <BaseSection>
      <div>
        <h3>Les dernières recherches Euphrosyne</h3>
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

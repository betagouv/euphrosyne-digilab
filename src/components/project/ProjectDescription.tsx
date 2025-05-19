import { ContentProps } from "@/i18n";
import sharedStyles from "@/styles/shared.module.css";

import { ProjectStatus } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { PageBadges, PageBadgesContent } from "../PageBadges";

export interface ProjectDescriptionContent {
  pageBadges: PageBadgesContent;
  noDescription: string;
}

type ProjectDescriptionProps = {
  projectName: string;
  projectDescription: string | null;
  projectStatus: ProjectStatus;
};

export const ProjectDescription = ({
  projectName,
  projectDescription,
  projectStatus,
  content,
}: ProjectDescriptionProps & ContentProps<ProjectDescriptionContent>) => {
  return (
    <BaseSection className={`fr-mb-5w ${sharedStyles.paddedUpToLg}`}>
      <PageBadges
        pageType="project"
        projectStatus={projectStatus}
        className="fr-mb-2w"
      />
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h1 className="fr-mb-2w">{projectName}</h1>
          <p className="fr-mb-2w">
            {projectDescription || <i>{content.noDescription}</i>}
          </p>
        </div>
      </div>
    </BaseSection>
  );
};

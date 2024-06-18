import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@emotion/react";

import { ContentProps } from "../../i18n";
import { paddedUpToLg } from "../../styles";
import { ProjectStatus } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { PageBadges, PageBadgesContent } from "../PageBadges";

export interface ProjectDescriptionContent {
  pageBadges: PageBadgesContent;
  noDescription: string;
  addDataToCart: string;
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
    <BaseSection
      css={css`
        ${paddedUpToLg}
      `}
      className="fr-mb-5w"
    >
      <PageBadges
        pageType="project"
        projectStatus={projectStatus}
        className="fr-mb-2w"
        content={content.pageBadges}
      />
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h1 className="fr-mb-2w">{projectName}</h1>
          <p className="fr-mb-2w">
            {projectDescription || <i>{content.noDescription}</i>}
          </p>
          <Button className="fr-mb-2w" disabled>
            {content.addDataToCart}
          </Button>
        </div>
      </div>
    </BaseSection>
  );
};

import { Button } from "@codegouvfr/react-dsfr/Button";
import { PageBadges } from "../PageBadges";
import { BaseSection } from "../BaseSection";
import { css } from "@emotion/react";
import { paddedUpToLg } from "../../styles";

type ProjectDescriptionProps = {
  projectName: string;
  projectDescription: string;
  projectStatus: ProjectStatus;
};

export const ProjectDescription = ({
  projectName,
  projectDescription,
  projectStatus,
}: ProjectDescriptionProps) => {
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
      />
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h1 className="fr-mb-2w">{projectName}</h1>
          <p className="fr-mb-2w">
            {projectDescription || <i>Pas de description pour ce projet.</i>}
          </p>
          <Button className="fr-mb-2w" disabled>
            Ajouter toutes les données au panier
          </Button>
        </div>
      </div>
    </BaseSection>
  );
};

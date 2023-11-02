import { BaseSection } from "../BaseSection";
import * as React from "react";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@emotion/react";

interface ProjectObjectsProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  objectGroups: ObjectGroup[];
}

export const ProjectObjects = ({
  objectGroups,
  ...props
}: ProjectObjectsProps) => {
  const excerptLength = 3;
  const [showAll, setShowAll] = React.useState(false);

  const visibleObjectGroups = showAll
    ? objectGroups
    : objectGroups.slice(0, excerptLength);

  return (
    <BaseSection {...props}>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h2 className="fr-mb-2w">Objets du projet</h2>
        </div>
      </div>
      {objectGroups.length === 0 ? (
        <p>
          <i>Ce projet n'a pas d'objet enregistré.</i>
        </p>
      ) : (
        <>
          <div className="fr-grid-row fr-grid-row--gutters">
            {visibleObjectGroups.map((objectGroup) => (
              <div className="fr-col-6 fr-col-lg-4">
                <h3>{objectGroup.label}</h3>
                <p>
                  {objectGroup.c2rmfId ? (
                    <a
                      href={`https://data.culture.gouv.fr/explore/dataset/notices-d-oeuvres-du-c2rmf/table/?disjunctive.collection_patrimoniale&disjunctive.domaine&sort=numero_de_reference_c2rmf&q=${objectGroup.c2rmfId}`}
                      target="_blank"
                    >
                      Fiche objet Eros
                    </a>
                  ) : (
                    "\x00"
                  )}
                </p>
                <p>
                  <strong>Époque: </strong>
                  {objectGroup.dating}
                </p>
                <p>
                  <strong>Aire géographique: </strong>
                  {objectGroup.discoveryPlace}
                </p>
                <p>
                  <strong>Matériaux: </strong>
                  {objectGroup.materials.map((material) => (
                    <Tag>{material}</Tag>
                  ))}
                </p>
              </div>
            ))}
          </div>
          <div
            css={css`
              text-align: center;
            `}
          >
            {objectGroups.length > excerptLength && (
              <Button
                onClick={() => setShowAll(!showAll)}
                priority="tertiary no outline"
              >
                {!showAll
                  ? `Voir plus d'objets liés (${
                      objectGroups.length - excerptLength
                    } restants) +`
                  : "Voir moins -"}
              </Button>
            )}
          </div>
        </>
      )}
    </BaseSection>
  );
};

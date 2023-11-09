import Button from "@codegouvfr/react-dsfr/Button";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import * as React from "react";
import slugify from "slugify";

import { ObjectGroup } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { ErosLink } from "../object-group/ErosLink";

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
              <div
                className="fr-col-6 fr-col-lg-4"
                key={`object-group-item-${objectGroup.id}`}
              >
                <h3>{objectGroup.label}</h3>
                <p>
                  {objectGroup.c2rmfId ? (
                    <ErosLink c2rmfId={objectGroup.c2rmfId} />
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
                    <Tag
                      key={`object-group-item-${objectGroup.id}-material-${material}`}
                    >
                      {material}
                    </Tag>
                  ))}
                </p>
                <p>
                  <Link
                    to={`/object/${slugify(objectGroup.label)}/${
                      objectGroup.id
                    }`}
                  >
                    Voir le détail de l'objet
                  </Link>
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

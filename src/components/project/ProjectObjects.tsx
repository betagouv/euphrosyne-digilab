import Button from "@codegouvfr/react-dsfr/Button";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { css } from "@emotion/react";
import * as React from "react";
import slugify from "slugify";

import { ContentProps } from "../../i18n";
import { ObjectGroup } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { I18nLink as Link } from "../I18nLink";
import { ErosLink } from "../object-group/ErosLink";

export interface ProjectObjectsContent {
  projectObjects: string;
  noObjects: string;
  seeObjectDetails: string;
  seeMore: string;
  seeLess: string;
  erosLinkText: string;
  inventory: string;
  period: string;
  materials: string;
  geographicArea: string;
}

interface ProjectObjectsProps
  extends Omit<React.InputHTMLAttributes<HTMLDivElement>, "content"> {
  objectGroups: ObjectGroup[];
}

export const ProjectObjects = ({
  objectGroups,
  content,
  ...props
}: ProjectObjectsProps & ContentProps<ProjectObjectsContent>) => {
  const excerptLength = 3;
  const [showAll, setShowAll] = React.useState(false);

  const visibleObjectGroups = showAll
    ? objectGroups
    : objectGroups.slice(0, excerptLength);

  return (
    <BaseSection {...props}>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h2 className="fr-mb-2w">{content.projectObjects}</h2>
        </div>
      </div>
      {objectGroups.length === 0 ? (
        <p>
          <i>{content.noObjects}</i>
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
                    <ErosLink
                      c2rmfId={objectGroup.c2rmfId}
                      text={content.erosLinkText}
                    />
                  ) : (
                    "\x00"
                  )}
                </p>
                <p>
                  <strong>{content.period}: </strong>
                  {objectGroup.dating}
                </p>
                <p>
                  <strong>{content.geographicArea}: </strong>
                  {objectGroup.discoveryPlace}
                </p>
                <p>
                  <strong>{content.materials}: </strong>
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
                    {content.seeObjectDetails}
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
                  ? content.seeMore.replace(
                      "{}",
                      (objectGroups.length - excerptLength).toString(),
                    )
                  : content.seeLess}
              </Button>
            )}
          </div>
        </>
      )}
    </BaseSection>
  );
};

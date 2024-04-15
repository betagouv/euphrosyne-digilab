import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@emotion/react";

import { ContentProps } from "../../i18n";
import { PageBadges, PageBadgesContent } from "../PageBadges";
import { ErosLink } from "./ErosLink";
import ObjectGroupMaterialTags from "./ObjectGroupMaterialTags";

export interface ObjectGroupDescriptionContent {
  inventory: string;
  period: string;
  geographicArea: string;
  materials: string;
  addObjectDataToCart: string;
  erosLinkText: string;

  pageBadges: PageBadgesContent;
}

type ObjectGroupDescriptionProps = Omit<
  React.InputHTMLAttributes<HTMLDivElement>,
  "content"
> & {
  collection?: string;
  dating: string | null;
  discoveryPlace: string | null;
  materials?: string[];
  dataAvailable?: boolean;
  label: string;
  c2rmfId: string | null;
};

export const ObjectGroupDescription = ({
  collection,
  dating,
  discoveryPlace,
  materials,
  dataAvailable,
  label,
  c2rmfId,
  content,
  ...props
}: ObjectGroupDescriptionProps &
  ContentProps<ObjectGroupDescriptionContent>) => {
  const descriptionItems: {
    label: string;
    value: string | React.ReactElement;
    icon: string;
  }[] = [
    {
      label: content.inventory,
      value: collection || "",
      icon: fr.cx("fr-icon-clipboard-line"),
    },
    {
      label: content.period,
      value: dating || "",
      icon: fr.cx("fr-icon-calendar-line"),
    },
    {
      label: content.geographicArea,
      value: discoveryPlace || "",
      icon: fr.cx("fr-icon-road-map-line"),
    },
    {
      label: content.materials,
      value: materials ? ObjectGroupMaterialTags({ materials }) : "",
      icon: fr.cx("fr-icon-seedling-line"),
    },
  ];

  return (
    <div {...props}>
      <PageBadges
        pageType="objectGroup"
        projectStatus={
          dataAvailable ? "Status.DATA_AVAILABLE" : "Status.FINISHED"
        }
        content={content.pageBadges}
        className="fr-mb-2w"
      />
      <h1 className="fr-mb-6w">{label}</h1>

      <div>
        {descriptionItems.map((item) => (
          <div
            key={`object-${label}-desc-item-${item.label}`}
            className="fr-mb-2w"
            css={css`
              display: flex;
            `}
          >
            <span
              className={`${item.icon} fr-pr-2v`}
              aria-hidden={true}
              css={css`
                color: ${fr.colors.decisions.text.actionHigh.blueFrance
                  .default};
              `}
            />
            <strong className="fr-pr-2v">{item.label}</strong>
            {item.value}
          </div>
        ))}
      </div>

      <Button className="fr-mb-2w" disabled>
        {content.addObjectDataToCart}
      </Button>
      {c2rmfId && (
        <p>
          <ErosLink c2rmfId={c2rmfId} text={content.erosLinkText} />
        </p>
      )}
    </div>
  );
};

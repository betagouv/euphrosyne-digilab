import { fr } from "@codegouvfr/react-dsfr";

import { ContentProps } from "@/i18n";

import { formatDatingLabel } from "../../utils";
import { PageBadges, PageBadgesContent } from "../PageBadges";

import { ErosLink } from "./ErosLink";
import ObjectGroupMaterialTags from "./ObjectGroupMaterialTags";

export interface ObjectGroupDescriptionContent {
  collection: string;
  inventory: string;
  period: string;
  era: string;
  geographicArea: string;
  materials: string;
  erosLinkText: string;

  pageBadges: PageBadgesContent;
}

type ObjectGroupDescriptionProps = Omit<
  React.InputHTMLAttributes<HTMLDivElement>,
  "content"
> & {
  inventory?: string;
  collection?: string;
  datingPeriodLabel?: string | null;
  datingEraLabel?: string | null;
  discoveryPlace: string | null;
  materials?: string[];
  dataAvailable?: boolean;
  label: string;
  c2rmfId: string | null;
};

export default function ObjectGroupDescription({
  inventory,
  collection,
  datingPeriodLabel,
  datingEraLabel,
  discoveryPlace,
  materials,
  dataAvailable,
  label,
  c2rmfId,
  content,
  ...props
}: ObjectGroupDescriptionProps & ContentProps<ObjectGroupDescriptionContent>) {
  const descriptionItems: {
    label: string;
    value: string | React.ReactElement;
    icon: string;
  }[] = [
    {
      label: content.collection,
      value: collection || "",
      icon: fr.cx("fr-icon-clipboard-line"),
    },
    {
      label: content.inventory,
      value: inventory || "",
      icon: fr.cx("fr-icon-image-line"),
    },
    {
      label: content.period,
      value: formatDatingLabel(datingPeriodLabel || ""),
      icon: fr.cx("fr-icon-calendar-line"),
    },
    {
      label: content.era,
      value: formatDatingLabel(datingEraLabel || ""),
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
        className="fr-mb-2w"
      />
      <h1 className="fr-mb-6w">{label}</h1>

      <div>
        {descriptionItems.map((item) => (
          <div
            key={`object-${label}-desc-item-${item.label}`}
            className="fr-mb-2w"
            style={{ display: "flex" }}
          >
            <span
              aria-hidden={true}
              className={`${item.icon} fr-pr-2v`}
              style={{ color: "var(--text-action-high-blue-france)" }}
            />
            <strong className="fr-pr-2v">{item.label}</strong>
            {item.value}
          </div>
        ))}
      </div>
      {c2rmfId && (
        <p>
          <ErosLink c2rmfId={c2rmfId} text={content.erosLinkText} />
        </p>
      )}
    </div>
  );
}

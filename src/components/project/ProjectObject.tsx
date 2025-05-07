import Tag from "@codegouvfr/react-dsfr/Tag";

import { buildObjectPath } from "@/catalog/utils";
import { ContentProps } from "@/i18n";
import { ObjectGroup } from "@/types/project";
import { formatDatingLabel } from "@/utils";

import { I18nLink as Link } from "../I18nLink";
import { ErosLink } from "../object-group/ErosLink";

export interface ProjectObjectContent {
  erosLinkText: string;
  era: string;
  period: string;
  geographicArea: string;
  materials: string;
  seeObjectDetails: string;
}

interface IProjectProps {
  objectGroup: ObjectGroup;
}

export default function ProjectObject({
  objectGroup,
  content,
  ...props
}: IProjectProps &
  ContentProps<ProjectObjectContent> &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">) {
  return (
    <div {...props}>
      <h3>{objectGroup.label}</h3>
      <p>
        {objectGroup.c2rmfId ? (
          <ErosLink c2rmfId={objectGroup.c2rmfId} text={content.erosLinkText} />
        ) : (
          "\x00"
        )}
      </p>
      <p>
        <strong>{content.era}: </strong>
        {formatDatingLabel(objectGroup.datingEraLabel || "")}
      </p>
      <p>
        <strong>{content.period}: </strong>
        {formatDatingLabel(objectGroup.datingPeriodLabel || "")}
      </p>
      <p>
        <strong>{content.geographicArea}: </strong>
        {objectGroup.discoveryPlaceLabel}
      </p>
      <p>
        <strong>{content.materials}: </strong>
        {(objectGroup.materials || []).map((material: string) => (
          <Tag key={`object-group-item-${objectGroup.id}-material-${material}`}>
            {material}
          </Tag>
        ))}
      </p>
      <p>
        <Link href={buildObjectPath(objectGroup)}>
          {content.seeObjectDetails}
        </Link>
      </p>
    </div>
  );
}

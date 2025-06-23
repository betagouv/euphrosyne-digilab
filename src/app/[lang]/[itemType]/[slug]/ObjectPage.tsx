import { notFound } from "next/navigation";

import { BaseSection } from "@/components/BaseSection";
import BreadcrumbInCatalog from "@/components/BreadcrumbInCatalog";
import ObjectGroupDescription, {
  ObjectGroupDescriptionContent,
} from "@/components/object-group/ObjectGroupDescription";
import ObjectGroupThumbnail, {
  ObjectGroupThumbnailContent,
} from "@/components/object-group/ObjectGroupThumbnail";
import ProjectSelect from "@/components/object-group/ProjectSelect";
import { StartDsfrOnHydration } from "@/dsfr-bootstrap";
import { parseObjectDocument } from "@/opensearch/parsers";
import sharedStyles from "@/styles/shared.module.css";
import { IOpenSearchDocument } from "@/types/IOpenSearch";

import styles from "./ObjectPage.module.css";
import pageStyles from "./page.module.css";
import { getTranslations } from "../../dictionaries";
import { IPageParam } from "../../types";

interface IObjectPageParams extends IPageParam {
  item: IOpenSearchDocument;
}

export interface ObjectTemplateContent {
  catalog: string;
  projectWithName: string;

  objectData: string;

  objectGroupDescription: ObjectGroupDescriptionContent;
  objectGroupThumbnailContent: ObjectGroupThumbnailContent;
}

export default async function ObjectPage({ item, lang }: IObjectPageParams) {
  const objectGroup = parseObjectDocument(item);

  if (!objectGroup) {
    return notFound();
  }

  const translations = getTranslations(lang),
    content = translations.objectPageContent;

  const thumbnail = objectGroup.thumbnail?.url;

  const thumbnailCopyright = objectGroup?.thumbnail?.copyright;
  //objectGroup?.fields?.erosImage?.copyright;

  return (
    <div>
      <StartDsfrOnHydration />
      {objectGroup && (
        <div>
          <div className="fr-container fr-container--fluid">
            <BreadcrumbInCatalog
              currentPageLabel={objectGroup.name}
              currentLang={lang}
              className="fr-container"
            />
          </div>
          <BaseSection>
            <div className={`fr-grid-row ${styles.mainSectionContainer}`}>
              <ObjectGroupDescription
                className={`fr-col-12 fr-col-lg-6 ${sharedStyles.paddedUpToLg}`}
                inventory={objectGroup.inventoryNumber || ""}
                collection={objectGroup.collection || ""}
                datingEraLabel={objectGroup.datingEra?.label}
                datingPeriodLabel={objectGroup.datingPeriod?.label}
                discoveryPlace={objectGroup.discoveryPlaceLabel}
                materials={objectGroup.materials as string[]}
                dataAvailable={objectGroup.dataAvailable}
                label={objectGroup.name}
                c2rmfId={objectGroup.c2rmfId}
                content={content.objectGroupDescription}
              />
              <div className="fr-col-12 fr-col-lg-6">
                {thumbnail && (
                  <ObjectGroupThumbnail
                    src={thumbnail}
                    copyright={thumbnailCopyright}
                    content={content.objectGroupThumbnailContent}
                    objectGroupLabel={objectGroup.name}
                  />
                )}
              </div>
            </div>
          </BaseSection>
          <BaseSection
            className={`${pageStyles.detailPageSection} ${sharedStyles.paddedUpToLg} fr-pt-3w`}
          >
            <h2>{content.objectData}</h2>
            <ProjectSelect objectGroup={objectGroup} />
          </BaseSection>
        </div>
      )}
    </div>
  );
}

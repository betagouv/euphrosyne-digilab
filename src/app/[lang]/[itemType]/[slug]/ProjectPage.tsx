import { BaseSection } from "@/components/BaseSection";
import BreadcrumbInCatalog from "@/components/BreadcrumbInCatalog";
import { ProjectData } from "@/components/project/ProjectData";
import {
  ProjectDescription,
  ProjectDescriptionContent,
} from "@/components/project/ProjectDescription";
import {
  ProjectObjects,
  ProjectObjectsContent,
} from "@/components/project/ProjectObjects";
import SetCurrentProject from "@/components/project/SetCurrentProject";
import { RunCardContent } from "@/components/run/RunCard";
import { StartDsfrOnHydration } from "@/dsfr-bootstrap";
import { parseProjectDocument } from "@/opensearch/parsers";
import sharedStyles from "@/styles/shared.module.css";
import { IObjectGroup } from "@/types/ICatalog";
import { IOpenSearchDocument } from "@/types/IOpenSearch";
import { Leader, ProjectStatus } from "@/types/project";

import { getTranslations } from "../../dictionaries";
import { IPageParam } from "../../types";

import styles from "./page.module.css";

interface IProjectPageParams extends IPageParam {
  item: IOpenSearchDocument;
}

export interface ProjectTemplateContent {
  catalog: string;
  projectData: string;

  projectDescription: ProjectDescriptionContent;
  projectObjects: ProjectObjectsContent;
  runCard: RunCardContent;
}

export default async function ProjectPage({ item, lang }: IProjectPageParams) {
  const project = parseProjectDocument(item);

  const translations = getTranslations(lang),
    content = translations.projectPageContent;

  return (
    <div>
      <StartDsfrOnHydration />
      {project && (
        <div>
          <SetCurrentProject project={project} />
          <div className="fr-container fr-container--fluid">
            <BreadcrumbInCatalog
              currentPageLabel={project.name}
              currentLang={lang}
              className="fr-container"
            />
          </div>
          <ProjectDescription
            projectName={project.name}
            projectStatus={project.status as ProjectStatus}
            projectDescription={project.comments}
            content={content.projectDescription}
          />
          <BaseSection
            className={`fr-pt-5w fr-pb-4w ${sharedStyles.paddedUpToLg} ${styles.detailPageSection}`}
          >
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12 fr-col-md-6">
                <h2 className="fr-mb-2w">{content.projectData}</h2>
              </div>
            </div>
            <ProjectData
              runs={project.projectPageData.runs}
              projectLeader={project.projectPageData.leader as Leader}
              content={content.runCard}
            />
          </BaseSection>
          <ProjectObjects
            objectGroups={
              (project.projectPageData.objectGroups as IObjectGroup[] | null) ||
              []
            }
            className={`fr-pt-5w ${sharedStyles.detailPageSection}`}
            content={content.projectObjects}
          />
        </div>
      )}
    </div>
  );
}

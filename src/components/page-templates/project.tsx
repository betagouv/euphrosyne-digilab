import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { PageProps } from "gatsby";
import { useContext, useEffect } from "react";

import { PageContext } from "../../contexts/PageContext";
import { ContentProps } from "../../i18n";
import { detailPageSection } from "../../styles";
import { ObjectGroup, Participation, ProjectStatus } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { ProjectData, ProjectDataContent } from "../project/ProjectData";
import {
  ProjectDescription,
  ProjectDescriptionContent,
} from "../project/ProjectDescription";
import {
  ProjectObjects,
  ProjectObjectsContent,
} from "../project/ProjectObjects";

export interface ProjectTemplateContent {
  catalog: string;
  projectData: string;

  projectDataContent: ProjectDataContent;
  projectDescription: ProjectDescriptionContent;
  projectObjects: ProjectObjectsContent;
}

export default function ProjectTemplate({
  data,
  content,
}: PageProps<Queries.ProjectTemplateQuery> &
  ContentProps<ProjectTemplateContent>) {
  const { setCurrentProject } = useContext(PageContext);
  const project = data.euphrosyneAPI.projectDetail;

  useEffect(() => {
    if (project && setCurrentProject) {
      setCurrentProject({
        name: project.name,
        slug: project.slug,
      });
    }
  }, [project, setCurrentProject]);

  return (
    <div>
      {project && (
        <div>
          <div className="fr-container fr-container--fluid">
            <Breadcrumb
              currentPageLabel={project.name}
              homeLinkProps={{
                to: "/",
              }}
              segments={[
                {
                  label: content.catalog,
                  linkProps: { to: "/catalog" },
                },
              ]}
              className="fr-container"
            />
          </div>
          <ProjectDescription
            projectName={project.name}
            projectStatus={project.status as ProjectStatus}
            projectDescription={project.comments}
            content={content.projectDescription}
          />
          <BaseSection className="fr-pt-5w fr-pb-4w" css={detailPageSection}>
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12 fr-col-md-6">
                <h2 className="fr-mb-2w">{content.projectData}</h2>
              </div>
            </div>
            <ProjectData
              runs={project.runs}
              projectLeader={project.leader as Participation}
              content={content.projectDataContent}
            />
          </BaseSection>
          <ProjectObjects
            objectGroups={project.objectGroups as ObjectGroup[]}
            className="fr-pt-5w"
            css={detailPageSection}
            content={content.projectObjects}
          />
        </div>
      )}
    </div>
  );
}

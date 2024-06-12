import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { HeadFC, PageProps, graphql } from "gatsby";
import { useContext, useEffect } from "react";

import { IObjectGroup } from "../../../types/ICatalog";
import { BaseHead } from "../../components/BaseHead";
import { BaseSection } from "../../components/BaseSection";
import {
  ProjectData,
  ProjectDataContent,
} from "../../components/project/ProjectData";
import {
  ProjectDescription,
  ProjectDescriptionContent,
} from "../../components/project/ProjectDescription";
import {
  ProjectObjects,
  ProjectObjectsContent,
} from "../../components/project/ProjectObjects";
import { LangContext } from "../../contexts/LangContext";
import { PageContext } from "../../contexts/PageContext";
import { detailPageSection } from "../../styles";
import type { Leader, ProjectStatus } from "../../types/project";
import type { Run } from "../../types/run";

export interface ProjectTemplateContent {
  catalog: string;
  projectData: string;

  projectDataContent: ProjectDataContent;
  projectDescription: ProjectDescriptionContent;
  projectObjects: ProjectObjectsContent;
}

export default function ProjectTemplate({
  data,
}: PageProps<Queries.ProjectPageQuery>) {
  const { translations } = useContext(LangContext);
  const content = translations.projectPageContent;

  const { setCurrentProject } = useContext(PageContext);
  const { project } = data;

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
              runs={project.projectPageData.runs as Run[]}
              projectLeader={project.projectPageData.leader as Leader}
              content={content.projectDataContent}
            />
          </BaseSection>
          <ProjectObjects
            objectGroups={
              (project.projectPageData.objectGroups as IObjectGroup[] | null) ||
              []
            }
            className="fr-pt-5w"
            css={detailPageSection}
            content={content.projectObjects}
          />
        </div>
      )}
    </div>
  );
}

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query ProjectPage($slug: String!) {
    project(slug: { eq: $slug }) {
      name
      slug
      materials
      comments
      status
      projectPageData {
        leader {
          firstName
          lastName
          institutionName
          institutionCountry
        }
        runs {
          label
          startDate
          particleType
          energyInKev
          beamline
          methods {
            name
            detectors {
              name
              filters
            }
          }
        }
        objectGroups {
          id
          c2rmfId
          label
          materials
          discoveryPlaceLabel
          collection
          datingLabel
          objects {
            label
            collection
            inventory
          }
        }
      }
    }
  }
`;

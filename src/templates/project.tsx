import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { HeadFC, PageProps, graphql } from "gatsby";
import { useContext, useEffect } from "react";

import { BaseHead } from "../components/BaseHead";
import { BaseSection } from "../components/BaseSection";
import {
  ProjectData,
  ProjectDataContent,
} from "../components/project/ProjectData";
import {
  ProjectDescription,
  ProjectDescriptionContent,
} from "../components/project/ProjectDescription";
import {
  ProjectObjects,
  ProjectObjectsContent,
} from "../components/project/ProjectObjects";
import { LangContext } from "../contexts/LangContext";
import { PageContext } from "../contexts/PageContext";
import { detailPageSection } from "../styles";
import { ObjectGroup, Participation, ProjectStatus } from "../types/project";

export interface ProjectTemplateContent {
  catalog: string;
  projectData: string;

  projectDataContent: ProjectDataContent;
  projectDescription: ProjectDescriptionContent;
  projectObjects: ProjectObjectsContent;
}

export default function ProjectTemplate({
  data,
}: PageProps<Queries.ProjectTemplateQuery>) {
  const { translations } = useContext(LangContext);
  const content = translations.projectPageContent;

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

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query ProjectTemplate($slug: String!) {
    euphrosyneAPI {
      projectDetail(slug: $slug) {
        name
        slug
        objectGroupMaterials
        comments
        status
        leader {
          user {
            firstName
            lastName
          }
          institution {
            name
            country
          }
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
          discoveryPlace
          collection
          dating
          objectSet {
            label
            collection
          }
        }
      }
    }
  }
`;

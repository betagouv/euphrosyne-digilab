import { useContext, useEffect } from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";

import { PageContext } from "../contexts/PageContext";
import { BaseHead } from "../components/BaseHead";
import { ProjectDescription } from "../components/project/ProjectDescription";
import { ProjectData } from "../components/project/ProjectData";
import { ProjectObjects } from "../components/project/ProjectObjects";
import { detailPageSection } from "../styles";
import { BaseSection } from "../components/BaseSection";

export default function ProjectTemplate({
  data,
}: PageProps<Queries.ProjectTemplateQuery>) {
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
                href: "/",
              }}
              segments={[
                {
                  label: "Catalogue",
                  linkProps: { href: "/catalog" },
                },
              ]}
              className="fr-container"
            />
          </div>
          <ProjectDescription
            projectName={project.name}
            projectStatus={project.status as ProjectStatus}
            projectDescription={project.comments}
          />
          <BaseSection className="fr-pt-5w fr-pb-4w" css={detailPageSection}>
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12 fr-col-md-6">
                <h2 className="fr-mb-2w">Données du projet</h2>
              </div>
            </div>
            <ProjectData
              runs={project.runs}
              projectLeader={project.leader as Participation}
            />
          </BaseSection>
          <ProjectObjects
            objectGroups={project.objectGroups as ObjectGroup[]}
            className="fr-pt-5w"
            css={detailPageSection}
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

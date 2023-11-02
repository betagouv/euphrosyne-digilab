import { HeadFC, PageProps, graphql } from "gatsby";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";

import BasePage from "../components/BasePage";
import { BaseHead } from "../components/BaseHead";
import { ProjectDescription } from "../components/project/ProjectDescription";
import { ProjectData } from "../components/project/ProjectData";
import { css } from "@emotion/react";
import { paddedUpToLg } from "../styles";
import { ProjectObjects } from "../components/project/ProjectObjects";

const baseSectionStyle = css`
  box-shadow: inset 0 2px 0 0 var(--border-plain-blue-france),
    inset 0 -1px 0 0 var(--border-default-grey);
  ${paddedUpToLg};
`;

export default function ProjectTemplate({
  data,
  path,
}: PageProps<Queries.ProjectTemplateQuery>) {
  const project = data.euphrosyneAPI.projectDetail;
  return (
    <BasePage currentPath={path}>
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
                  linkProps: {},
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
          <ProjectData
            runs={project.runs as Run[]}
            projectLeader={project.leader as Participation}
            className="fr-pt-5w fr-pb-4w"
            css={baseSectionStyle}
          />
          <ProjectObjects
            objectGroups={project.objectGroups as ObjectGroup[]}
            className="fr-pt-5w"
            css={baseSectionStyle}
          />
        </div>
      )}
    </BasePage>
  );
}

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query ProjectTemplate($slug: String!) {
    euphrosyneAPI {
      projectDetail(slug: $slug) {
        name
        slug
        comments
        objectGroupLabels
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

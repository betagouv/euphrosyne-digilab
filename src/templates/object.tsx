import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { Select } from "@codegouvfr/react-dsfr/SelectNext";
import { css } from "@emotion/react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useContext, useEffect, useState } from "react";

import { BaseHead } from "../components/BaseHead";
import { BaseSection } from "../components/BaseSection";
import {
  ObjectGroupDescription,
  ObjectGroupDescriptionContent,
} from "../components/object-group/ObjectGroupDescription";
import {
  ProjectData,
  ProjectDataContent,
} from "../components/project/ProjectData";
import { LangContext } from "../contexts/LangContext";
import { PageContext } from "../contexts/PageContext";
import { ContentProps } from "../i18n";
import { detailPageSection, paddedUpToLg } from "../styles";
import { Participation } from "../types/project";
import { Run } from "../types/run";

export interface ObjectTemplateContent {
  catalog: string;
  projectWithName: string;
  altImageWithObjectName: string;

  noProject: string;
  objectData: string;
  project: string;

  objectGroupDescription: ObjectGroupDescriptionContent;
  projectDataContent: ProjectDataContent;
}

interface Project {
  name: string;
  slug: string;
  leader: Participation;
}

export default function ObjectTemplate({
  data,
}: PageProps<Queries.ObjectTemplateQuery> &
  ContentProps<ObjectTemplateContent>) {
  const { translations } = useContext(LangContext);
  const content = translations.objectPageContent;

  const { currentProject } = useContext(PageContext);
  const objectGroup = data.euphrosyneAPI.objectGroupDetail;
  const projects = objectGroup?.runs
    .map((run) => run.project)
    .filter((value, index, array) => array.indexOf(value) === index);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectedProjectRuns = objectGroup?.runs.filter(
    (run) => run.project.slug === selectedProject?.slug,
  );

  const breadcrumbSegments = [
    {
      label: content.catalog,
      linkProps: { to: "/catalog" },
    },
  ];
  if (currentProject) {
    breadcrumbSegments.push({
      label: content.projectWithName.replace("{}", currentProject.name),
      linkProps: { to: `/project/${currentProject.slug}` },
    });
  }

  useEffect(() => {
    if (projects && projects.length) {
      setSelectedProject(projects[0] as Project);
    }
  }, [projects]);

  return (
    <div>
      {objectGroup && (
        <div>
          <div className="fr-container fr-container--fluid">
            <Breadcrumb
              currentPageLabel={objectGroup.label}
              homeLinkProps={{
                to: "/",
              }}
              segments={breadcrumbSegments}
              className="fr-container"
            />
          </div>
          <BaseSection>
            <div
              className="fr-grid-row"
              css={css`
                ${fr.breakpoints.down("lg")} {
                  flex-direction: column-reverse;
                }
              `}
            >
              <ObjectGroupDescription
                className="fr-col-12 fr-col-lg-6"
                css={css`
                  ${paddedUpToLg}
                `}
                collection={objectGroup.collection}
                dating={objectGroup.dating}
                discoveryPlace={objectGroup.discoveryPlace}
                materials={objectGroup.materials as string[]}
                dataAvailable={objectGroup.dataAvailable}
                label={objectGroup.label}
                c2rmfId={objectGroup.c2rmfId}
                content={content.objectGroupDescription}
              />
              <div className="fr-col-12 fr-col-lg-6">
                <StaticImage
                  src="../images/objectgroup-placeholder.svg"
                  alt={content.altImageWithObjectName.replace(
                    "{}",
                    objectGroup.label,
                  )}
                  placeholder="blurred"
                  css={css`
                    ${fr.breakpoints.down("lg")} {
                      max-height: 200px;
                      width: 100%;
                      margin-bottom: ${fr.spacing("3w")};
                    }
                  `}
                />
              </div>
            </div>
          </BaseSection>
          <BaseSection
            css={css`
              ${detailPageSection}
            `}
          >
            <h2>{content.objectData}</h2>
            <Select
              label={content.project}
              disabled={!(projects && projects.length > 0)}
              options={
                projects?.map((project) => ({
                  label: project.name,
                  value: project.slug,
                })) || [{ label: content.noProject, value: "" }]
              }
              nativeSelectProps={{ value: selectedProject?.slug }}
            />
            {selectedProject &&
              selectedProjectRuns &&
              selectedProjectRuns.length > 0 && (
                <ProjectData
                  runs={selectedProjectRuns as Run[]}
                  projectLeader={selectedProject.leader}
                  content={content.projectDataContent}
                />
              )}
          </BaseSection>
        </div>
      )}
    </div>
  );
}

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query ObjectTemplate($id: String!) {
    euphrosyneAPI {
      objectGroupDetail(pk: $id) {
        id
        c2rmfId
        label
        materials
        discoveryPlace
        collection
        dating
        dataAvailable
        objectSet {
          label
          collection
        }
        runs {
          label
          startDate
          particleType
          energyInKev
          beamline
          project {
            name
            slug
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
          }
          methods {
            name
            detectors {
              name
              filters
            }
          }
        }
      }
    }
  }
`;

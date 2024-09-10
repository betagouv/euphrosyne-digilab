import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { Select } from "@codegouvfr/react-dsfr/SelectNext";
import { css } from "@emotion/react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";

import { buildProjectPath } from "../../catalog/utils";
import { BaseHead } from "../../components/BaseHead";
import { BaseSection } from "../../components/BaseSection";
import { I18nLink as Link } from "../../components/I18nLink";
import ObjectGroupDescription, {
  ObjectGroupDescriptionContent,
} from "../../components/object-group/ObjectGroupDescription";
import {
  ProjectData,
  ProjectDataContent,
} from "../../components/project/ProjectData";
import { LangContext } from "../../contexts/LangContext";
import { PageContext } from "../../contexts/PageContext";
import { ContentProps } from "../../i18n";
import { detailPageSection, paddedUpToLg } from "../../styles";
import { Leader } from "../../types/project";
import { Run } from "../../types/run";

export interface ObjectTemplateContent {
  catalog: string;
  projectWithName: string;
  altImageWithObjectName: string;

  noProject: string;
  objectData: string;
  project: string;
  viewProject: string;

  objectGroupDescription: ObjectGroupDescriptionContent;
  projectDataContent: ProjectDataContent;
}

interface Project {
  name: string;
  slug: string;
  leader: Leader;
}

export default function ObjectTemplate({
  data,
  location,
}: PageProps<Queries.ObjectGroupPageQuery> &
  ContentProps<ObjectTemplateContent>) {
  const { translations } = useContext(LangContext);
  const content = translations.objectPageContent;

  const { currentProject } = useContext(PageContext);
  const { objectGroup } = data;
  const projects = objectGroup?.objectPageData?.projects || [];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const runs = objectGroup?.objectPageData?.runs;
  const selectedProjectRuns = runs?.filter(
    (run) => run?.projectSlug === selectedProject?.slug,
  );
  const onProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const project = projects?.find(
      (project) => project?.slug === event.target.value,
    );
    if (project) {
      setSelectedProject(project as Project);
    }
  };

  const breadcrumbSegments = [
    {
      label: content.catalog,
      linkProps: { to: "/catalog" },
    },
  ];
  let selectOptions = [{ label: content.noProject, value: "" }];
  if (projects && projects.length > 0) {
    selectOptions = (projects as readonly Project[]).map((project) => ({
      label: project.name,
      value: project.slug,
    }));

    // Add current project to breadcrumb if any and related to object
    if (
      currentProject &&
      projects.map((p) => p.slug).indexOf(currentProject.slug) !== -1
    ) {
      console.log(currentProject, projects);
      breadcrumbSegments.push({
        label: content.projectWithName.replace("{}", currentProject.name),
        linkProps: { to: buildProjectPath(currentProject) },
      });
    }
  }

  useEffect(() => {
    if (projects && projects.length) {
      setSelectedProject(projects[0] as Project);
    }
  }, []);

  return (
    <div>
      {objectGroup && (
        <div>
          <div className="fr-container fr-container--fluid">
            <Breadcrumb
              currentPageLabel={objectGroup.name}
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
                <StaticImage
                  src="../../images/objectgroup-placeholder.svg"
                  alt={content.altImageWithObjectName.replace(
                    "{}",
                    objectGroup.name,
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
              options={selectOptions}
              nativeSelectProps={{
                value: selectedProject?.slug,
                onChange: onProjectSelect,
              }}
              css={css`
                max-width: 400px;
              `}
            />
            {selectedProject && (
              <React.Fragment>
                <div className="fr-mb-1w">
                  <Link to={buildProjectPath(selectedProject)}>
                    {content.viewProject}
                  </Link>
                </div>
                {selectedProjectRuns && selectedProjectRuns.length > 0 && (
                  <ProjectData
                    runs={selectedProjectRuns as Run[]}
                    projectLeader={selectedProject.leader}
                    content={content.projectDataContent}
                    location={location}
                    className="fr-mb-2w"
                    pageType="objectGroup"
                  />
                )}
              </React.Fragment>
            )}
          </BaseSection>
        </div>
      )}
    </div>
  );
}

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query ObjectGroupPage($slug: String!) {
    objectGroup(slug: { eq: $slug }) {
      id
      name
      materials
      dataAvailable
      c2rmfId
      discoveryPlaceLabel
      collection
      inventoryNumber
      datingPeriod {
        label
      }
      datingEra {
        label
      }
      objects {
        label
        collection
        inventory
      }
      objectPageData {
        projects {
          name
          slug
          leader {
            firstName
            lastName
            institutionName
            institutionCountry
          }
        }
        runs {
          id
          label
          startDate
          isDataEmbargoed
          particleType
          energyInKev
          beamline
          projectSlug
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

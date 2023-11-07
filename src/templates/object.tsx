import { useContext, useEffect, useState } from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { css } from "@emotion/react";
import { Select } from "@codegouvfr/react-dsfr/SelectNext";

import { PageContext } from "../contexts/PageContext";
import { BaseHead } from "../components/BaseHead";
import { detailPageSection, paddedUpToLg } from "../styles";
import { BaseSection } from "../components/BaseSection";
import { ObjectGroupDescription } from "../components/object-group/ObjectGroupDescription";
import { StaticImage } from "gatsby-plugin-image";
import { fr } from "@codegouvfr/react-dsfr";
import { ProjectData } from "../components/project/ProjectData";
import { Participation } from "../types/project";

interface Project {
  name: string;
  slug: string;
  leader: Participation;
}

export default function ObjectTemplate({
  data,
}: PageProps<Queries.ObjectTemplateQuery>) {
  const { currentProject } = useContext(PageContext);
  const objectGroup = data.euphrosyneAPI.objectGroupDetail;
  const projects = objectGroup?.runs
    .map((run) => run.project)
    .filter((value, index, array) => array.indexOf(value) === index);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectedProjectRuns = objectGroup?.runs.filter(
    (run) => run.project.slug === selectedProject?.slug
  );

  let breadcrumbSegments = [
    {
      label: "Catalogue",
      linkProps: {},
    },
  ];
  if (currentProject) {
    breadcrumbSegments.push({
      label: `Projet ${currentProject.name}`,
      linkProps: { href: `/project/${currentProject.slug}` },
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
                href: "/",
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
              />
              <div className="fr-col-12 fr-col-lg-6">
                <StaticImage
                  src="../images/objectgroup-placeholder.svg"
                  alt={`Image de l'objet ${objectGroup.label}`}
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
            <h2>Object data</h2>
            <Select
              label="Projet"
              disabled={!(projects && projects.length > 0)}
              options={
                projects?.map((project) => ({
                  label: project.name,
                  value: project.slug,
                })) || [{ label: "Aucun projet", value: "" }]
              }
              nativeSelectProps={{ value: selectedProject?.slug }}
            />
            {selectedProject &&
              selectedProjectRuns &&
              selectedProjectRuns.length > 0 && (
                <ProjectData
                  runs={selectedProjectRuns as Run[]}
                  projectLeader={selectedProject.leader}
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

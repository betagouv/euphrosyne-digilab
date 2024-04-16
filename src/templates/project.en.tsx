import { HeadFC, PageProps, graphql } from "gatsby";

import { BaseHead } from "../components/BaseHead";
import ProjectTemplate, {
  ProjectTemplateContent,
} from "../components/page-templates/project";
import {
  erosLinkText,
  pageBadges,
  projectDataContent,
  translations,
} from "../locales/en";

const content: ProjectTemplateContent = {
  catalog: "Catalog",
  projectData: "Project data",

  projectDataContent,
  projectDescription: {
    pageBadges: pageBadges,
    noDescription: "No description for this project.",
    addDataToCart: "Add all data to the cart",
  },
  projectObjects: {
    projectObjects: "Project objects",
    noObjects: "This project has no registered object.",
    seeObjectDetails: "See object details",
    seeMore: "See more related objects ({} remaining) +",
    seeLess: "See less -",
    erosLinkText,
    inventory: translations.inventory,
    period: translations.period,
    geographicArea: translations.geographicArea,
    materials: translations.materials,
  },
};

export default function ProjectTemplateFr(
  props: PageProps<Queries.ProjectTemplateQuery>,
) {
  return <ProjectTemplate content={content} {...props} />;
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
